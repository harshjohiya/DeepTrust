# 🔍 DeepTrust - AI Deepfake Detection System

<div align="center">

![DeepTrust](https://img.shields.io/badge/DeepTrust-AI%20Detection-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python)

**Professional AI-powered deepfake detection with modern animated UI**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Roadmap](#-roadmap)

</div>

---

## 📖 Complete Documentation

**New to the project?** Start here:
- 🚀 **[GETTING_STARTED.md](GETTING_STARTED.md)** - Visual setup guide with screenshots
- 📋 **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Step-by-step verification checklist
- 📚 **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Navigate all documentation

**Need quick answers?**
- ⚡ **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - One-page cheat sheet

**Understanding the project:**
- 🔄 **[CONVERSION_GUIDE.md](CONVERSION_GUIDE.md)** - Streamlit to React reference
- ⚖️ **[STREAMLIT_VS_REACT.md](STREAMLIT_VS_REACT.md)** - Detailed comparison
- 📂 **[FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)** - Complete file structure guide
- 📊 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - What was built

**Future development:**
- 🗺️ **[ROADMAP.md](ROADMAP.md)** - Enhancement ideas and development plan

---

## 🎯 Overview

DeepTrust is a production-ready deepfake detection system featuring:
- **React Frontend**: Modern, animated UI with Framer Motion
- **FastAPI Backend**: High-performance Python API
- **EfficientNet-B0**: State-of-the-art deep learning model
- **Grad-CAM**: Explainable AI visualizations
- **Dark Mode**: Professional dark/light themes

Perfect for **AI demos**, **hackathons**, **portfolio projects**, and **resume builders**.

---

## ✨ Features

### 🎨 Modern UI/UX
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support
- ✅ Glass morphism effects
- ✅ Interactive drag & drop file upload
- ✅ Real-time processing indicators

### 🧠 AI Capabilities
- ✅ Image deepfake detection
- ✅ Video deepfake detection (frame-by-frame analysis)
- ✅ Confidence score visualization
- ✅ Grad-CAM heatmap generation
- ✅ Probability distribution charts
- ✅ Majority voting for videos

### 🚀 Technical Features
- ✅ RESTful API architecture
- ✅ Async processing
- ✅ GPU acceleration support
- ✅ CORS-enabled backend
- ✅ TypeScript-ready
- ✅ Production-optimized build

---

## 🏗️ Architecture

```
┌─────────────────┐      HTTP/REST      ┌─────────────────┐
│  React Frontend │ ◄─────────────────► │ FastAPI Backend │
│  (Port 3000)    │                     │  (Port 8000)    │
└─────────────────┘                     └─────────────────┘
        │                                        │
        │                                        │
        ▼                                        ▼
┌─────────────────┐                     ┌─────────────────┐
│   Framer Motion │                     │  EfficientNet   │
│   Tailwind CSS  │                     │    Grad-CAM     │
│   React Dropzone│                     │   MediaPipe     │
└─────────────────┘                     └─────────────────┘
```

---

## 📁 Project Structure

```
DeepTrust/
├── 📂 backend/
│   ├── app.py                    # FastAPI application
│   └── requirements.txt          # Python dependencies
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/       # React components
│   │   │   ├── Header.jsx       # App header with dark mode
│   │   │   ├── FileUpload.jsx   # Drag & drop upload
│   │   │   ├── LoadingAnimation.jsx  # Animated loader
│   │   │   ├── ImageAnalysis.jsx     # Image results
│   │   │   ├── VideoAnalysis.jsx     # Video results
│   │   │   └── About.jsx        # Info section
│   │   ├── 📂 services/
│   │   │   └── api.js           # API client
│   │   ├── App.jsx              # Main app
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── 📂 src/                      # Python ML modules
│   ├── models/                  # Model architecture
│   ├── data/                    # Face extraction
│   └── explainability/          # Grad-CAM
│
├── 📂 models/
│   └── best_efficientnet_b0.pth # Trained model
│
├── REACT_SETUP.md               # Setup instructions
├── CONVERSION_GUIDE.md          # Conversion reference
└── start.bat                    # Quick start script
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Trained model file in `models/` directory

### Installation

#### Option 1: Automated Start (Windows)
```bash
# Double-click or run:
start.bat
```

#### Option 2: Manual Start

**1. Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs at `http://localhost:8000`

**2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`

### First Run
1. Open `http://localhost:3000` in your browser
2. Toggle dark/light mode with the moon/sun icon
3. Upload an image or video
4. Click "Analyze" and watch the magic! ✨

---

## 📸 Screenshots

### Image Analysis
- Original image display
- Real-time confidence scoring
- Probability distribution chart
- Grad-CAM heatmap visualization
- Side-by-side comparison

### Video Analysis
- Frame-by-frame confidence chart
- Majority voting results
- Detailed per-frame predictions
- Fake/Real frame statistics

### Loading States
- Multi-stage animated loader
- Progress indicators
- Smooth transitions

---

## 🎨 Animation Showcase

### Framer Motion Animations

**Page Transitions**
```javascript
// Fade in from bottom
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

**Interactive Buttons**
```javascript
// Scale on hover/tap
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**Loading Spinner**
```javascript
// Continuous rotation
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity }}
```

**Staggered Lists**
```javascript
// Sequential animation
transition={{ delay: index * 0.05 }}
```

---

## 🔌 API Endpoints

### Health Check
```http
GET /health
```

### Image Prediction
```http
POST /api/predict/image
Content-Type: multipart/form-data

file: <image_file>
generate_gradcam: true
```

**Response:**
```json
{
  "prediction": "FAKE",
  "prediction_class": 0,
  "confidence": 0.95,
  "probabilities": {
    "fake": 0.95,
    "real": 0.05
  },
  "gradcam": {
    "heatmap": "data:image/png;base64,...",
    "overlay": "data:image/png;base64,..."
  }
}
```

### Video Prediction
```http
POST /api/predict/video
Content-Type: multipart/form-data

file: <video_file>
num_frames: 5
```

---

## 🎯 Use Cases

### 1. **Portfolio Project**
- Showcase full-stack development skills
- Demonstrate ML/AI integration
- Highlight modern UI/UX design

### 2. **Hackathon Demo**
- Quick setup and deployment
- Professional presentation
- Impressive visual appeal

### 3. **Educational Tool**
- Learn React + FastAPI integration
- Understand deepfake detection
- Study explainable AI concepts

### 4. **Research Platform**
- Test different models
- Compare detection methods
- Analyze model behavior

---

## 🛠️ Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    // ...
  }
}
```

### Adjust Animations
Modify durations in components:
```javascript
transition={{ duration: 0.3 }} // Faster
transition={{ duration: 1.0 }}  // Slower
```

### API Configuration
Create `frontend/.env`:
```env
VITE_API_URL=http://your-api-url:8000
```

---

## 📊 Performance

- **Image Analysis**: ~1-2 seconds
- **Video Analysis**: ~3-5 seconds (5 frames)
- **Grad-CAM Generation**: +1-2 seconds
- **Model Loading**: Once on startup

### Optimizations
- ✅ Model caching on backend
- ✅ GPU acceleration (when available)
- ✅ Async API processing
- ✅ Frontend code splitting
- ✅ Image optimization

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 8000 is available
# On Windows:
netstat -ano | findstr :8000

# Change port in app.py if needed:
uvicorn.run(app, port=8001)
```

### Frontend Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Model Not Found
- Ensure `best_efficientnet_b0.pth` is in `models/` directory
- Check file permissions
- Verify model path in `backend/app.py`

### API Connection Failed
- Verify backend is running
- Check CORS configuration
- Confirm API URL in frontend `.env`

---

## 📚 Documentation

- [REACT_SETUP.md](REACT_SETUP.md) - Detailed setup guide
- [CONVERSION_GUIDE.md](CONVERSION_GUIDE.md) - Streamlit to React conversion reference

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Docker)
```dockerfile
FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "backend/app.py"]
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is open source and available for educational purposes.

---

## 👨‍💻 Tech Stack

**Frontend:**
- React 18.2
- Vite 5.0
- Framer Motion 10.16
- Tailwind CSS 3.4
- Axios
- Recharts
- React Dropzone
- Lucide Icons

**Backend:**
- FastAPI 0.109
- PyTorch
- EfficientNet (timm)
- MediaPipe
- pytorch-grad-cam
- OpenCV
- Uvicorn

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🌟 Acknowledgments

- EfficientNet architecture by Google
- Celeb-DF dataset for training
- MediaPipe for face detection
- pytorch-grad-cam for explainability

---

<div align="center">

**Built with ❤️ for AI enthusiasts**

[⭐ Star this project](https://github.com/yourusername/deeptrust) if you find it helpful!

</div>
