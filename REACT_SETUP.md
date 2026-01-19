# DeepTrust - React Frontend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- The trained model file (`best_efficientnet_b0.pth`) in the `models/` directory

### Installation

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python app.py
```

The backend will be available at `http://localhost:8000`

#### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
DeepTrust/
├── backend/
│   ├── app.py                 # FastAPI application
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── LoadingAnimation.jsx
│   │   │   ├── ImageAnalysis.jsx
│   │   │   ├── VideoAnalysis.jsx
│   │   │   └── About.jsx
│   │   ├── services/
│   │   │   └── api.js        # API service
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── src/                      # Python source code
│   ├── models/
│   ├── data/
│   └── explainability/
│
└── models/                   # Trained models
    └── best_efficientnet_b0.pth
```

## 🎨 Features

### Animations (Framer Motion)
- **Page Transitions**: Smooth fade-in and slide animations
- **Loading States**: Rotating spinners with staged progress indicators
- **Result Animations**: Scale and fade effects for result cards
- **Interactive Elements**: Hover and tap animations on buttons

### UI Components

#### Header
- Dark/light mode toggle
- API status indicator
- Responsive gradient logo

#### File Upload
- Drag & drop interface
- File preview (image/video)
- Animated upload states

#### Loading Animation
- Multi-stage progress indicators
- Rotating spinner with pulsing dots
- Contextual messages based on analysis type

#### Image Analysis
- Confidence score visualization
- Probability distribution pie chart
- Grad-CAM heatmap display (3-panel view)
- Animated result cards with color coding

#### Video Analysis
- Frame-by-frame confidence chart
- Majority voting results
- Detailed frame predictions list
- Summary statistics

### Styling
- **Tailwind CSS**: Utility-first styling
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first design
- **Glass Effect**: Modern glassmorphism UI elements
- **Custom Animations**: Tailwind-based keyframe animations

## 🔌 API Integration

### Endpoints

#### Health Check
```javascript
GET /health
Response: { status: "healthy", device: "cpu" }
```

#### Image Prediction
```javascript
POST /api/predict/image
FormData: { file: File, generate_gradcam: boolean }
Response: {
  prediction: "FAKE" | "REAL",
  prediction_class: 0 | 1,
  confidence: number,
  probabilities: { fake: number, real: number },
  gradcam?: { heatmap: base64, overlay: base64 }
}
```

#### Video Prediction
```javascript
POST /api/predict/video
FormData: { file: File, num_frames: number }
Response: {
  prediction: "FAKE" | "REAL",
  prediction_class: 0 | 1,
  confidence: number,
  frames_analyzed: number,
  frame_predictions: Array<{
    frame: number,
    prediction: string,
    confidence: number
  }>,
  summary: { fake_frames: number, real_frames: number }
}
```

## 🎯 Performance Optimizations

### Frontend
1. **Code Splitting**: Vite automatically splits code
2. **Lazy Loading**: Components loaded on demand
3. **Image Optimization**: Base64 encoding for efficient transfer
4. **Debouncing**: Prevent multiple rapid API calls

### Backend
1. **Model Caching**: Model loaded once on startup
2. **GPU Support**: Automatic CUDA detection
3. **Async Processing**: FastAPI async endpoints
4. **CORS Configuration**: Optimized for frontend requests

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* custom colors */ },
      dark: { /* dark mode colors */ }
    }
  }
}
```

### Animations
Modify animation durations in component files:

```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }} // Adjust here
>
```

## 🐛 Troubleshooting

### Backend Issues
- **Model not loading**: Ensure `best_efficientnet_b0.pth` exists in `models/`
- **Port already in use**: Change port in `app.py`: `uvicorn.run(app, port=8001)`
- **Import errors**: Verify all dependencies are installed

### Frontend Issues
- **API connection failed**: Check backend is running on port 8000
- **Module not found**: Run `npm install` again
- **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend
```bash
# Use production ASGI server
pip install gunicorn
gunicorn backend.app:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🚢 Deployment

### Docker Option
Create `Dockerfile` for containerized deployment:

```dockerfile
# Backend
FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "backend/app.py"]
```

### Cloud Platforms
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: AWS EC2, Google Cloud Run, or Heroku

## 📝 Notes

- Grad-CAM generation adds ~1-2s to processing time
- Video analysis time scales with `num_frames` parameter
- Large video files may require increased upload limits
- Dark mode preference is stored in component state (add localStorage for persistence)

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Docs](https://react.dev/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)

---

**Built for AI demos, hackathons, and portfolio projects** 🚀
