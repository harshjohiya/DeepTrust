# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Setup
Run the setup script to install all dependencies:
```bash
setup.bat
```

### Step 2: Add Your Model
Place your trained model file in:
```
backend/models/best_efficientnet_b0.pth
```

**Don't have a model?** Train one using the Jupyter notebook at `notebook/deepfake1.ipynb`

### Step 3: Run the Application
Start both backend and frontend:
```bash
run-all.bat
```

Or start them separately:
```bash
# Terminal 1 - Backend
run-backend.bat

# Terminal 2 - Frontend  
run-frontend.bat
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📝 What You Can Do

1. **Upload an Image**: Detect if it's a deepfake
2. **Upload a Video**: Get frame-by-frame analysis
3. **View Heatmaps**: See which parts influenced the AI decision

## 🔍 Supported Formats

- **Images**: JPG, JPEG, PNG
- **Videos**: MP4

## ⚡ Features

- Real-time deepfake detection
- Confidence scores (0-100%)
- Explainability heatmaps (Grad-CAM)
- Face detection and extraction
- Video frame analysis
- Beautiful modern UI

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed
- Check if model file exists at `backend/models/best_efficientnet_b0.pth`
- Install requirements: `cd backend && pip install -r requirements.txt`

### Frontend won't start
- Make sure Node.js 16+ is installed
- Install dependencies: `npm install`

### "Model not found" warning
- The backend will still run but predictions won't be accurate
- Train a model using the Jupyter notebook or place a pre-trained model

### Analysis taking too long
- Video processing can be CPU-intensive
- First-time model loading takes a few seconds
- GPU acceleration helps (CUDA-enabled PyTorch)

## 📚 More Information

See `SETUP_GUIDE.md` for detailed setup instructions and API documentation.

## 🎓 Training Your Own Model

1. Open `notebook/deepfake1.ipynb` in Jupyter or Google Colab
2. Follow the step-by-step training process
3. Save the trained model to `backend/models/`

---

**Need Help?** Check the full documentation in `SETUP_GUIDE.md`
