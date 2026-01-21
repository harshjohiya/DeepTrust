from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import aiofiles
from pathlib import Path
import shutil
import uuid
from datetime import datetime

import config
from model import get_detector
from gradcam import GradCAMExplainer
from video_processor import VideoProcessor

# Initialize FastAPI app
app = FastAPI(
    title="DeepTrust API",
    description="Deepfake Detection API with Explainability",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for serving heatmaps
app.mount("/results", StaticFiles(directory=str(config.RESULTS_DIR)), name="results")

# Global instances
detector = None
gradcam_explainer = None
video_processor = None

@app.on_event("startup")
async def startup_event():
    """Initialize models on startup"""
    global detector, gradcam_explainer, video_processor
    
    print("🚀 Starting DeepTrust API...")
    
    # Load detector
    detector = get_detector()
    
    # Initialize Grad-CAM
    gradcam_explainer = GradCAMExplainer(detector.model, detector.device)
    
    # Initialize video processor
    video_processor = VideoProcessor()
    
    print("✅ All models loaded successfully!")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "message": "DeepTrust API is running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model_loaded": detector is not None,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/analyze/image")
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyze a single image for deepfake detection
    Returns: prediction, confidence, and explainability heatmap
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Generate unique filename
    file_id = str(uuid.uuid4())
    file_extension = Path(file.filename).suffix
    temp_path = config.TEMP_DIR / f"{file_id}{file_extension}"
    heatmap_path = config.RESULTS_DIR / f"{file_id}_heatmap.jpg"
    
    try:
        # Save uploaded file
        async with aiofiles.open(temp_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
        
        # Run detection
        result = detector.predict_from_file(str(temp_path))
        
        # Generate Grad-CAM heatmap
        heatmap_result = gradcam_explainer.generate_heatmap(
            str(temp_path),
            str(heatmap_path)
        )
        
        # Determine verdict and explanation
        prediction = result["prediction"]
        confidence = result["confidence"]
        
        if prediction == "fake":
            verdict = "FAKE"
            if confidence > 80:
                explanation = f"High confidence ({confidence}%) deepfake detected. The model identified strong synthetic patterns in facial features, lighting inconsistencies, and unnatural texture artifacts commonly associated with AI-generated or manipulated content."
            else:
                explanation = f"Moderate confidence ({confidence}%) deepfake detected. The model found subtle inconsistencies in facial texture and lighting that suggest potential manipulation or AI generation."
        else:
            verdict = "REAL"
            if confidence > 80:
                explanation = f"High confidence ({confidence}%) authentic content. The image shows consistent natural features with no significant manipulation artifacts detected."
            else:
                explanation = f"Moderate confidence ({confidence}%) authentic content. While the image appears genuine, some ambiguous features prevent higher certainty."
        
        # Handle uncertain cases
        if 45 <= confidence <= 65:
            verdict = "UNCERTAIN"
            explanation = f"Inconclusive result ({confidence}% confidence). The model detected mixed indicators, making it difficult to determine authenticity with certainty. Manual verification recommended."
        
        response = {
            "success": True,
            "verdict": verdict,
            "confidence": confidence,
            "explanation": explanation,
            "probabilities": result["probabilities"],
            "heatmap_url": f"/results/{file_id}_heatmap.jpg" if heatmap_result["success"] else None,
            "file_id": file_id
        }
        
        # Clean up temp file
        temp_path.unlink(missing_ok=True)
        
        return JSONResponse(content=response)
        
    except Exception as e:
        # Clean up files on error
        temp_path.unlink(missing_ok=True)
        heatmap_path.unlink(missing_ok=True)
        
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/api/analyze/video")
async def analyze_video(file: UploadFile = File(...)):
    """
    Analyze a video for deepfake detection
    Returns: frame-by-frame analysis with overall verdict
    """
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    # Generate unique filename
    file_id = str(uuid.uuid4())
    file_extension = Path(file.filename).suffix
    temp_path = config.TEMP_DIR / f"{file_id}{file_extension}"
    
    try:
        # Save uploaded file
        async with aiofiles.open(temp_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
        
        # Process video
        result = video_processor.process_video(
            str(temp_path),
            detector.model,
            gradcam_explainer
        )
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result.get("error", "Video processing failed"))
        
        response = {
            "success": True,
            "verdict": result["verdict"],
            "confidence": result["confidence"],
            "explanation": result["explanation"],
            "frames": result["frames"],
            "total_frames": result["total_frames"],
            "file_id": file_id
        }
        
        # Clean up temp file
        temp_path.unlink(missing_ok=True)
        
        return JSONResponse(content=response)
        
    except Exception as e:
        # Clean up on error
        temp_path.unlink(missing_ok=True)
        
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

@app.delete("/api/cleanup/{file_id}")
async def cleanup_files(file_id: str):
    """Clean up result files for a given file_id"""
    try:
        heatmap_path = config.RESULTS_DIR / f"{file_id}_heatmap.jpg"
        heatmap_path.unlink(missing_ok=True)
        
        return {"success": True, "message": "Files cleaned up"}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
