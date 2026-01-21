# DeepTrust - Deepfake Detection System

A full-stack deepfake detection application with AI-powered analysis, explainability features, and a modern React frontend.

## 🌟 Features

- **Image Analysis**: Upload images to detect deepfake manipulation with confidence scores
- **Video Analysis**: Frame-by-frame video analysis with detailed timeline
- **Explainability**: Grad-CAM heatmaps showing which regions influenced the AI decision
- **Face Detection**: Automatic face extraction using MediaPipe
- **Modern UI**: Beautiful, responsive interface built with React, TypeScript, and Tailwind CSS
- **RESTful API**: FastAPI backend with comprehensive endpoints

## 🏗️ Architecture

### Backend
- **Framework**: FastAPI
- **Model**: EfficientNet-B0 trained on deepfake detection
- **Face Detection**: MediaPipe Face Detection
- **Explainability**: Grad-CAM (Gradient-weighted Class Activation Mapping)
- **Video Processing**: OpenCV with frame sampling

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Build Tool**: Vite
- **Router**: React Router v6

## 📋 Prerequisites

- **Python** 3.8 or higher
- **Node.js** 16 or higher
- **npm** or **yarn**
- **(Optional)** CUDA-capable GPU for faster processing

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)

1. **Run the setup script**:
   ```bash
   setup.bat
   ```

2. **Place your trained model**:
   - Put `best_efficientnet_b0.pth` in `backend/models/`

3. **Start the application**:
   ```bash
   run-all.bat
   ```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Add your trained model**:
   - Place your `best_efficientnet_b0.pth` model file in `backend/models/`
   - The model should be an EfficientNet-B0 trained on deepfake detection

5. **Run the backend**:
   ```bash
   python app.py
   ```
   Backend will run on `http://localhost:8000`

#### Frontend Setup

1. **Navigate to project root**:
   ```bash
   cd ..
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
DeepTrust/
├── backend/
│   ├── app.py                 # Main FastAPI application
│   ├── config.py             # Configuration settings
│   ├── model.py              # Model loading and inference
│   ├── gradcam.py            # Grad-CAM explainability
│   ├── video_processor.py    # Video processing
│   ├── requirements.txt      # Python dependencies
│   ├── models/               # Model weights
│   │   └── best_efficientnet_b0.pth
│   ├── uploads/              # Temporary uploads
│   ├── temp/                 # Processing temp files
│   └── results/              # Generated heatmaps
├── src/
│   ├── components/           # React components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   └── lib/                 # Utilities
├── notebook/
│   └── deepfake1.ipynb      # Training notebook
├── setup.bat                # Setup script
├── run-all.bat             # Run both servers
└── README.md               # This file
```

## 🔧 Configuration

### Backend Configuration

Edit `backend/config.py` to customize:
- Model paths
- Image processing settings
- Video frame sampling
- CORS origins
- Upload directories

### Frontend Configuration

Edit `.env` or `.env.local`:
```env
VITE_API_URL=http://localhost:8000
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Image Analysis
```
POST /api/analyze/image
Content-Type: multipart/form-data
Body: file (image)

Response:
{
  "success": true,
  "verdict": "FAKE" | "REAL" | "UNCERTAIN",
  "confidence": 87.5,
  "explanation": "...",
  "probabilities": { "fake": 87.5, "real": 12.5 },
  "heatmap_url": "/results/xxx_heatmap.jpg"
}
```

### Video Analysis
```
POST /api/analyze/video
Content-Type: multipart/form-data
Body: file (video)

Response:
{
  "success": true,
  "verdict": "FAKE",
  "confidence": 85.3,
  "explanation": "...",
  "frames": [
    {
      "frameNumber": 1,
      "timestamp": "0:02",
      "verdict": "FAKE",
      "confidence": 82.5,
      "thumbnail": "data:image/jpeg;base64,..."
    }
  ]
}
```

## 🎯 Model Training

The included Jupyter notebook (`notebook/deepfake1.ipynb`) contains the complete training pipeline:

1. **Data Preprocessing**
   - Face extraction using MediaPipe
   - Frame sampling from videos
   - Train/Val/Test splitting

2. **Model Training**
   - EfficientNet-B0 architecture
   - Class balancing with weighted loss
   - Adam optimizer with learning rate 1e-4

3. **Evaluation**
   - Accuracy, precision, recall
   - Confusion matrix
   - Grad-CAM visualization

## 🧪 Testing

### Frontend Tests
```bash
npm run test
```

### Backend Testing
```bash
cd backend
pytest  # (if you add tests)
```

## 🐛 Troubleshooting

### Model Not Found
- Ensure `best_efficientnet_b0.pth` is in `backend/models/`
- Check file permissions

### CORS Errors
- Verify backend is running on `http://localhost:8000`
- Check `config.py` CORS_ORIGINS includes your frontend URL

### Video Processing Slow
- Video processing is CPU-intensive
- Consider using a GPU-enabled PyTorch installation
- Reduce `MAX_FRAMES` in `config.py` for faster processing

### MediaPipe Installation Issues
- MediaPipe requires Visual C++ Redistributable on Windows
- Download from: https://aka.ms/vs/17/release/vc_redist.x64.exe

## 📝 Development

### Adding New Features

1. **Backend**: Add endpoints in `app.py`
2. **Frontend**: Create components in `src/components/`
3. **API Service**: Update `src/services/api.ts`

### Code Style
- Backend: Follow PEP 8
- Frontend: ESLint + Prettier configured

## 🚢 Deployment

### Backend Deployment
```bash
# Using Gunicorn
pip install gunicorn
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend Deployment
```bash
npm run build
# Deploy 'dist' folder to your hosting service
```

## 📄 License

This project is for educational and research purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review the Jupyter notebook for training details

## 🙏 Acknowledgments

- **EfficientNet**: Tan & Le (Google Research)
- **MediaPipe**: Google MediaPipe Team
- **Grad-CAM**: Selvaraju et al.
- **FastAPI**: Sebastián Ramírez
- **React**: Meta/Facebook Team

## ⚠️ Disclaimer

This tool is designed for research and educational purposes. Always verify results with multiple sources and human expertise for critical applications.

---

Made with ❤️ for deepfake detection research
