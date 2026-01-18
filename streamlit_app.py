"""Streamlit web application for deepfake detection - based on deepfake1.ipynb."""
import streamlit as st
import torch
import numpy as np
from PIL import Image
import cv2
import sys
from pathlib import Path
from torchvision import transforms
import tempfile
import os

# Add src to path
sys.path.append('src')

from src.models.efficientnet import load_model_from_checkpoint, get_target_layer
from src.data.face_extractor import FaceExtractor
from src.explainability.gradcam import GradCAM


# Exact transforms from notebook
def get_transforms():
    """Get preprocessing transforms - exact from notebook."""
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                           std=[0.229, 0.224, 0.225])
    ])


@st.cache_resource
def load_model():
    """Load model (cached) - uses best model from notebook."""
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model_path = "models/best_efficientnet_b0.pth"
    
    if not Path(model_path).exists():
        st.error(f"❌ Model not found at {model_path}")
        st.info("Please ensure the trained model is in the models/ directory")
        return None, None, None
    
    with st.spinner("Loading model..."):
        model = load_model_from_checkpoint(model_path, num_classes=2, device=device)
        face_extractor = FaceExtractor(min_detection_confidence=0.5)
        
    return model, face_extractor, device


def predict_image(model, image_pil, transform, device):
    """Predict on image - exact notebook logic.
    
    Returns:
        pred_class (0=fake, 1=real), confidence
    """
    input_tensor = transform(image_pil).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)
        pred_class = outputs.argmax(dim=1).item()
        confidence = probs[0, pred_class].item()
    
    return pred_class, confidence, input_tensor


def predict_video(model, face_extractor, video_path, transform, device, num_frames=5):
    """Predict on video with majority voting - exact notebook logic."""
    # Extract faces from video
    faces = face_extractor.extract_faces_from_video(video_path, num_frames=num_frames)
    
    if len(faces) == 0:
        return None, None, []
    
    predictions = []
    
    # Predict on each face
    for face_bgr in faces:
        # Convert BGR to RGB
        face_rgb = cv2.cvtColor(face_bgr, cv2.COLOR_BGR2RGB)
        face_pil = Image.fromarray(face_rgb)
        
        input_tensor = transform(face_pil).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = model(input_tensor)
            pred_class = outputs.argmax(dim=1).item()
            probs = torch.softmax(outputs, dim=1)
            confidence = probs[0, pred_class].item()
        
        predictions.append((pred_class, confidence))
    
    # Majority voting
    pred_classes = [p[0] for p in predictions]
    final_pred = max(set(pred_classes), key=pred_classes.count)
    
    # Average confidence for final prediction
    final_confidences = [c for p, c in predictions if p == final_pred]
    avg_confidence = np.mean(final_confidences)
    
    return final_pred, avg_confidence, predictions


def main():
    """Main Streamlit app."""
    st.set_page_config(
        page_title="DeepTrust - Deepfake Detection",
        page_icon="🔍",
        layout="wide"
    )
    
    # Header
    st.title("🔍 DeepTrust - Deepfake Detection System")
    st.markdown("**Based on EfficientNet-B0 trained on Celeb-DF dataset**")
    st.markdown("---")
    
    # Load model
    model, face_extractor, device = load_model()
    
    if model is None:
        st.stop()
    
    st.success(f"✅ Model loaded successfully on {device.upper()}")
    
    # Sidebar
    st.sidebar.header("⚙️ Settings")
    input_type = st.sidebar.radio(
        "Input Type",
        ["📷 Image", "🎥 Video"],
        index=0
    )
    
    if input_type == "📷 Image":
        show_gradcam = st.sidebar.checkbox("Show Grad-CAM Heatmap", value=True)
    else:
        num_frames = st.sidebar.slider("Frames to Sample", 3, 10, 5)
    
    st.sidebar.markdown("---")
    st.sidebar.info("**Class Mapping:**\n- 0 = FAKE\n- 1 = REAL")
    
    # Main content
    transform = get_transforms()
    
    if input_type == "📷 Image":
        # Image upload
        st.subheader("📷 Image Analysis")
        uploaded_file = st.file_uploader(
            "Upload a face image",
            type=['jpg', 'jpeg', 'png'],
            help="Upload a clear face image for analysis"
        )
        
        if uploaded_file is not None:
            # Display image
            image = Image.open(uploaded_file).convert('RGB')
            
            col1, col2 = st.columns([1, 1])
            
            with col1:
                st.image(image, caption="Uploaded Image", use_container_width=True)
            
            # Predict
            with st.spinner("🔍 Analyzing image..."):
                pred_class, confidence, input_tensor = predict_image(
                    model, image, transform, device
                )
            
            with col2:
                st.subheader("📊 Analysis Results")
                
                # Display prediction with color coding
                label = "REAL" if pred_class == 1 else "FAKE"
                
                if label == "FAKE":
                    st.error(f"### 🚨 {label}")
                    st.metric("Confidence", f"{confidence:.2%}")
                else:
                    st.success(f"### ✅ {label}")
                    st.metric("Confidence", f"{confidence:.2%}")
                
                # Probability bars
                with st.expander("📈 Detailed Probabilities", expanded=True):
                    with torch.no_grad():
                        probs = torch.softmax(model(input_tensor), dim=1)[0]
                        fake_prob = probs[0].item()
                        real_prob = probs[1].item()
                    
                    st.write(f"**Fake Probability:** {fake_prob:.2%}")
                    st.progress(fake_prob)
                    
                    st.write(f"**Real Probability:** {real_prob:.2%}")
                    st.progress(real_prob)
            
            # Grad-CAM visualization
            if show_gradcam:
                st.markdown("---")
                st.subheader("🔥 Grad-CAM Visualization")
                st.caption("Heatmap showing which regions the model focuses on for its decision")
                
                with st.spinner("Generating Grad-CAM..."):
                    try:
                        # Initialize Grad-CAM
                        gradcam = GradCAM(model, target_layers=[get_target_layer(model)])
                        
                        # Generate visualization
                        cam, visualization, _ = gradcam.generate_and_overlay(
                            image, input_tensor, target_class=pred_class
                        )
                        
                        # Display
                        col1, col2, col3 = st.columns(3)
                        
                        with col1:
                            st.image(image, caption="Original", use_container_width=True)
                        
                        with col2:
                            st.image(cam, caption="Heatmap", use_container_width=True, clamp=True)
                        
                        with col3:
                            st.image(visualization, caption="Overlay", use_container_width=True)
                    
                    except Exception as e:
                        st.error(f"Error generating Grad-CAM: {str(e)}")
    
    else:  # Video
        st.subheader("🎥 Video Analysis")
        uploaded_file = st.file_uploader(
            "Upload a video",
            type=['mp4', 'avi', 'mov'],
            help="Upload a video containing faces for analysis"
        )
        
        if uploaded_file is not None:
            # Save temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
                tmp_file.write(uploaded_file.read())
                video_path = tmp_file.name
            
            # Display video
            st.video(video_path)
            
            # Predict
            with st.spinner(f"🔍 Analyzing video (sampling {num_frames} frames)..."):
                progress_bar = st.progress(0)
                
                pred_class, confidence, frame_predictions = predict_video(
                    model, face_extractor, video_path, transform, device, num_frames
                )
                
                progress_bar.progress(100)
            
            if pred_class is None:
                st.error("❌ No faces detected in the video!")
            else:
                # Results
                col1, col2 = st.columns([1, 1])
                
                with col1:
                    label = "REAL" if pred_class == 1 else "FAKE"
                    
                    if label == "FAKE":
                        st.error(f"### 🚨 {label}")
                    else:
                        st.success(f"### ✅ {label}")
                    
                    st.metric("Average Confidence", f"{confidence:.2%}")
                    st.info(f"📊 Analyzed {len(frame_predictions)} frames")
                
                with col2:
                    st.subheader("Frame-by-Frame Results")
                    
                    # Show predictions for each frame
                    fake_count = sum(1 for p, _ in frame_predictions if p == 0)
                    real_count = sum(1 for p, _ in frame_predictions if p == 1)
                    
                    st.write(f"**FAKE frames:** {fake_count}")
                    st.write(f"**REAL frames:** {real_count}")
                    
                    # Show detailed breakdown
                    with st.expander("See detailed frame predictions"):
                        for i, (p, c) in enumerate(frame_predictions, 1):
                            label = "FAKE" if p == 0 else "REAL"
                            st.write(f"Frame {i}: **{label}** ({c:.2%} confidence)")
            
            # Cleanup
            os.unlink(video_path)
    
    # Footer
    st.markdown("---")
    with st.expander("ℹ️ About this system"):
        st.markdown("""
        ### About DeepTrust
        
        This deepfake detection system is based on:
        - **Model:** EfficientNet-B0 (timm)
        - **Training:** Celeb-DF dataset
        - **Face Detection:** MediaPipe
        - **Explainability:** Grad-CAM (pytorch-grad-cam)
        
        **How it works:**
        1. Detects faces using MediaPipe
        2. Resizes to 224x224 pixels
        3. Normalizes with ImageNet statistics
        4. Classifies as REAL (1) or FAKE (0)
        5. For videos: uses majority voting across sampled frames
        
        **Note:** No detection system is 100% accurate. Results should be interpreted carefully.
        """)


if __name__ == "__main__":
    main()
