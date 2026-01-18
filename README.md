# DeepTrust - Deepfake Detection System

A production-ready deepfake detection web app based on EfficientNet-B0. Features face extraction, binary classification (Real/Fake), and Grad-CAM explainability.

## 🚀 Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Test model loading
python test_model.py

# 3. Run Streamlit app
streamlit run streamlit_app.py
```

## 🎯 Features

- **Face Detection**: MediaPipe-based face extraction
- **Classification**: EfficientNet-B0 (Class 0=FAKE, 1=REAL)
- **Explainability**: Grad-CAM visualizations
- **Image Mode**: Upload image → Get prediction + heatmap
- **Video Mode**: Upload video → Frame sampling + majority voting

## 📁 Project Structure

```
DeepTrust/
├── streamlit_app.py           # Main Streamlit UI
├── test_model.py             # Model verification script
├── requirements.txt          # Dependencies
├── README.md                 # This file
│
├── models/
│   └── best_efficientnet_b0.pth    # Trained model
│
├── src/                      # Core modules
│   ├── data/
│   │   └── face_extractor.py       # MediaPipe face detection
│   ├── models/
│   │   └── efficientnet.py         # Model loading (timm)
│   └── explainability/
│       └── gradcam.py              # Grad-CAM (pytorch-grad-cam)
│
└── notebook/
    └── deepfake1.ipynb             # Original notebook
```

## 🎨 Streamlit UI

### Image Analysis
- Upload: JPG/PNG/JPEG
- View: Prediction + confidence + Grad-CAM heatmap
- Display: Original | Heatmap | Overlay

### Video Analysis  
- Upload: MP4/AVI/MOV
- Process: Sample frames → Extract faces → Predict
- Result: Majority voting + frame-by-frame breakdown

## 📊 Model Details

- **Architecture**: EfficientNet-B0 (timm)
- **Classes**: 0=FAKE, 1=REAL
- **Input**: 224x224 RGB
- **Normalization**: ImageNet (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
- **Grad-CAM Layer**: model.conv_head

## 🔧 Technical Details

### Preprocessing Pipeline
```python
transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])
```

### Face Extraction
- MediaPipe (model_selection=1, min_confidence=0.5)
- Output: 224x224 BGR → RGB conversion

### Video Processing
1. Sample N frames uniformly (default: 5)
2. Extract face from each frame
3. Predict each face
4. Majority voting for final prediction

## 💡 Usage Example

```python
import sys
sys.path.append('src')

from src.models.efficientnet import load_model_from_checkpoint
from torchvision import transforms
from PIL import Image
import torch

# Load model
device = "cuda" if torch.cuda.is_available() else "cpu"
model = load_model_from_checkpoint(
    "models/best_efficientnet_b0.pth",
    num_classes=2,
    device=device
)

# Prepare transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Predict
image = Image.open("test.jpg").convert('RGB')
input_tensor = transform(image).unsqueeze(0).to(device)

with torch.no_grad():
    outputs = model(input_tensor)
    pred_class = outputs.argmax(1).item()
    probs = torch.softmax(outputs, dim=1)

print(f"Prediction: {'FAKE' if pred_class == 0 else 'REAL'}")
print(f"Confidence: {probs[0][pred_class]:.2%}")
```

## 🐛 Troubleshooting

**Model not found**: Ensure `models/best_efficientnet_b0.pth` exists

**Import errors**: Install dependencies with `pip install -r requirements.txt`

**No faces detected**: Ensure clear, frontal faces in image/video

**GPU issues**: Model automatically falls back to CPU

## 📦 Dependencies

- torch, torchvision
- timm (EfficientNet)
- mediapipe (Face detection)
- pytorch-grad-cam (Explainability)
- streamlit (Web UI)
- opencv-python, pillow, numpy

## 📄 License

MIT License
