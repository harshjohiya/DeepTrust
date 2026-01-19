"""FastAPI backend for DeepTrust deepfake detection system."""
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import numpy as np
from PIL import Image
import cv2
import sys
from pathlib import Path
from torchvision import transforms
import tempfile
import os
import io
import base64
from typing import Optional

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from src.models.efficientnet import load_model_from_checkpoint, get_target_layer
from src.data.face_extractor import FaceExtractor
from src.explainability.gradcam import GradCAM

app = FastAPI(title="DeepTrust API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model
model = None
face_extractor = None
device = None
gradcam = None


def get_transforms():
    """Get preprocessing transforms."""
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                           std=[0.229, 0.224, 0.225])
    ])


def numpy_to_base64(img_array: np.ndarray) -> str:
    """Convert numpy array to base64 string."""
    if img_array.dtype != np.uint8:
        img_array = (img_array * 255).astype(np.uint8) if img_array.max() <= 1.0 else img_array.astype(np.uint8)
    
    img = Image.fromarray(img_array)
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode()
    return f"data:image/png;base64,{img_str}"


@app.on_event("startup")
async def load_model_on_startup():
    """Load model on startup."""
    global model, face_extractor, device, gradcam
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model_path = Path(__file__).parent.parent / "models" / "best_efficientnet_b0.pth"
    
    if not model_path.exists():
        print(f"⚠️ Model not found at {model_path}")
        return
    
    print("Loading model...")
    model = load_model_from_checkpoint(str(model_path), num_classes=2, device=device)
    face_extractor = FaceExtractor(min_detection_confidence=0.5)
    
    # Initialize Grad-CAM
    gradcam = GradCAM(model, target_layers=[get_target_layer(model)])
    
    print(f"✅ Model loaded successfully on {device.upper()}")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "DeepTrust API",
        "version": "1.0.0",
        "status": "running",
        "device": device if device else "not loaded"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy" if model is not None else "model not loaded",
        "device": device if device else None
    }


@app.post("/api/predict/image")
async def predict_image(
    file: UploadFile = File(...),
    generate_gradcam: bool = True
):
    """Predict on image with optional Grad-CAM."""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Predict
        transform = get_transforms()
        input_tensor = transform(image).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = model(input_tensor)
            probs = torch.softmax(outputs, dim=1)
            pred_class = outputs.argmax(dim=1).item()
            confidence = probs[0, pred_class].item()
            fake_prob = probs[0, 0].item()
            real_prob = probs[0, 1].item()
        
        result = {
            "prediction": "REAL" if pred_class == 1 else "FAKE",
            "prediction_class": int(pred_class),
            "confidence": float(confidence),
            "probabilities": {
                "fake": float(fake_prob),
                "real": float(real_prob)
            }
        }
        
        # Generate Grad-CAM if requested
        if generate_gradcam and gradcam is not None:
            try:
                cam, visualization, heatmap = gradcam.generate_and_overlay(
                    image, input_tensor, target_class=pred_class
                )
                
                # Convert to base64
                result["gradcam"] = {
                    "heatmap": numpy_to_base64(heatmap),
                    "overlay": numpy_to_base64(visualization)
                }
            except Exception as e:
                result["gradcam_error"] = str(e)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/predict/video")
async def predict_video(
    file: UploadFile = File(...),
    num_frames: int = 5
):
    """Predict on video with frame sampling."""
    if model is None or face_extractor is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Save video temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
            contents = await file.read()
            tmp_file.write(contents)
            video_path = tmp_file.name
        
        # Extract faces from video
        faces = face_extractor.extract_faces_from_video(video_path, num_frames=num_frames)
        
        if len(faces) == 0:
            os.unlink(video_path)
            raise HTTPException(status_code=400, detail="No faces detected in video")
        
        transform = get_transforms()
        predictions = []
        
        # Predict on each face
        for i, face_bgr in enumerate(faces):
            # Convert BGR to RGB
            face_rgb = cv2.cvtColor(face_bgr, cv2.COLOR_BGR2RGB)
            face_pil = Image.fromarray(face_rgb)
            
            input_tensor = transform(face_pil).unsqueeze(0).to(device)
            
            with torch.no_grad():
                outputs = model(input_tensor)
                pred_class = outputs.argmax(dim=1).item()
                probs = torch.softmax(outputs, dim=1)
                confidence = probs[0, pred_class].item()
            
            predictions.append({
                "frame": i + 1,
                "prediction": "REAL" if pred_class == 1 else "FAKE",
                "prediction_class": int(pred_class),
                "confidence": float(confidence)
            })
        
        # Majority voting
        pred_classes = [p["prediction_class"] for p in predictions]
        final_pred = max(set(pred_classes), key=pred_classes.count)
        
        # Average confidence for final prediction
        final_confidences = [p["confidence"] for p in predictions if p["prediction_class"] == final_pred]
        avg_confidence = np.mean(final_confidences)
        
        # Count fake vs real
        fake_count = sum(1 for p in pred_classes if p == 0)
        real_count = sum(1 for p in pred_classes if p == 1)
        
        # Cleanup
        os.unlink(video_path)
        
        result = {
            "prediction": "REAL" if final_pred == 1 else "FAKE",
            "prediction_class": int(final_pred),
            "confidence": float(avg_confidence),
            "frames_analyzed": len(predictions),
            "frame_predictions": predictions,
            "summary": {
                "fake_frames": fake_count,
                "real_frames": real_count
            }
        }
        
        return JSONResponse(content=result)
    
    except HTTPException:
        raise
    except Exception as e:
        # Cleanup on error
        if 'video_path' in locals():
            try:
                os.unlink(video_path)
            except:
                pass
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
