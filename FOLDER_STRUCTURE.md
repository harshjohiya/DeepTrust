# 📂 DeepTrust Folder Structure

Complete visual guide to the project structure.

---

## 🌳 Complete Tree

```
DeepTrust/
│
├── 📂 backend/                          # Backend API Server
│   ├── app.py                          # FastAPI application (main entry)
│   └── requirements.txt                # Python dependencies
│
├── 📂 frontend/                         # React Frontend Application
│   │
│   ├── 📂 src/                         # Source code
│   │   │
│   │   ├── 📂 components/              # React Components
│   │   │   ├── Header.jsx             # App header with dark mode toggle
│   │   │   ├── FileUpload.jsx         # Drag & drop file upload
│   │   │   ├── LoadingAnimation.jsx   # Animated loading state
│   │   │   ├── ImageAnalysis.jsx      # Image result display
│   │   │   ├── VideoAnalysis.jsx      # Video result display
│   │   │   └── About.jsx              # About section
│   │   │
│   │   ├── 📂 services/                # API Integration
│   │   │   └── api.js                 # API service (Axios)
│   │   │
│   │   ├── App.jsx                     # Main application component
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Global styles (Tailwind)
│   │
│   ├── index.html                      # HTML template
│   ├── package.json                    # npm dependencies & scripts
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── .eslintrc.cjs                   # ESLint configuration
│   ├── .gitignore                      # Git ignore rules
│   └── .env.example                    # Environment variables template
│
├── 📂 models/                           # Trained Models
│   ├── best_efficientnet_b0.pth       # Best model checkpoint ⚠️ REQUIRED
│   └── final_efficientnet_b0.pth      # Final model checkpoint
│
├── 📂 src/                              # Python Source Code (ML)
│   │
│   ├── 📂 models/                      # Model Architecture
│   │   ├── __init__.py
│   │   └── efficientnet.py            # EfficientNet model loader
│   │
│   ├── 📂 data/                        # Data Processing
│   │   ├── __init__.py
│   │   └── face_extractor.py          # MediaPipe face detection
│   │
│   ├── 📂 explainability/              # Model Explainability
│   │   ├── __init__.py
│   │   └── gradcam.py                 # Grad-CAM visualization
│   │
│   └── __init__.py
│
├── 📂 notebook/                         # Jupyter Notebooks
│   └── deepfake1.ipynb                # Original training notebook
│
├── 📄 streamlit_app.py                 # Original Streamlit app
├── 📄 test_model.py                    # Model testing script
├── 📄 requirements.txt                 # Python deps (original)
├── 📄 run_app.bat                      # Streamlit launcher
│
├── 📄 start.bat                        # Quick start script (NEW)
├── 📄 README.md                        # Original README
├── 📄 README_REACT.md                  # React version README (NEW)
├── 📄 REACT_SETUP.md                   # Setup guide (NEW)
├── 📄 CONVERSION_GUIDE.md              # Conversion reference (NEW)
├── 📄 STREAMLIT_VS_REACT.md           # Comparison guide (NEW)
├── 📄 SETUP_CHECKLIST.md              # Setup checklist (NEW)
└── 📄 QUICK_REFERENCE.md              # Quick reference (NEW)
```

---

## 🎯 Key Files Explained

### Backend

#### `backend/app.py` (316 lines)
**Purpose**: FastAPI server handling ML inference

**Key Functions:**
```python
load_model_on_startup()      # Loads model on server start
predict_image()               # POST /api/predict/image
predict_video()               # POST /api/predict/video
health_check()                # GET /health
```

**Dependencies:**
- FastAPI, Uvicorn
- PyTorch, timm
- OpenCV, MediaPipe
- pytorch-grad-cam

---

### Frontend

#### `frontend/src/App.jsx` (158 lines)
**Purpose**: Main application logic and state management

**State Variables:**
```javascript
darkMode          // Dark/light mode toggle
analysisType      // 'image' or 'video'
file              // Uploaded file
isAnalyzing       // Loading state
result            // API response
error             // Error message
apiStatus         // Backend health status
```

**Key Functions:**
```javascript
handleFileSelect()   // File upload handler
handleAnalyze()      // Trigger analysis
handleReset()        // Clear state
checkApiHealth()     // Verify backend
```

---

#### `frontend/src/components/Header.jsx`
**Visual**: 
```
┌─────────────────────────────────────────────┐
│ 🔍 DeepTrust        [Status] [🌙/☀️]      │
│    AI Detection                              │
└─────────────────────────────────────────────┘
```

**Features:**
- Animated entrance (slides down)
- Glass morphism effect
- Dark mode toggle
- API status indicator

---

#### `frontend/src/components/FileUpload.jsx`
**Visual**:
```
┌─────────────────────────────────┐
│                                 │
│        📷 or 🎥                │
│                                 │
│   Drop your file or browse     │
│   Supports: JPG, PNG, MP4      │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Drag & drop zone
- File preview (image/video)
- File info display
- Clear button
- Animated transitions

---

#### `frontend/src/components/LoadingAnimation.jsx`
**Visual**:
```
        ⟳ Loading Spinner
        
    Analyzing Image...
    
    🔍 Detecting faces...
    🧠 Analyzing with AI...
    ⚙️ Processing results...
    
        • • •
```

**Features:**
- Rotating spinner
- Multi-stage progress
- Animated icons
- Pulsing dots

---

#### `frontend/src/components/ImageAnalysis.jsx`
**Visual**:
```
┌─────────────────────────────────┐
│ ⚠️  FAKE DETECTED               │
│    Confidence: 95.23%           │
│    ▓▓▓▓▓▓▓▓▓▓░░░░░░            │
└─────────────────────────────────┘

┌──────────────┐  ┌──────────────┐
│ Probability  │  │   Original   │
│   Chart 📊   │  │    Image     │
└──────────────┘  └──────────────┘

┌─────────────────────────────────┐
│   🔥 Grad-CAM Visualization     │
│  Original | Heatmap | Overlay   │
└─────────────────────────────────┘
```

**Features:**
- Animated result card
- Color-coded (red=fake, green=real)
- Confidence bar animation
- Pie chart (Recharts)
- Grad-CAM 3-panel view
- Spring animations

---

#### `frontend/src/components/VideoAnalysis.jsx`
**Visual**:
```
┌─────────────────────────────────┐
│ ⚠️  FAKE DETECTED               │
│    Avg Confidence: 88.45%       │
│    Analyzed 5 frames            │
│                                 │
│  Fake: 4 frames | Real: 1 frame│
└─────────────────────────────────┘

┌──────────────┐  ┌──────────────┐
│    Video     │  │ Frame Chart  │
│   Preview    │  │    📊        │
└──────────────┘  └──────────────┘

┌─────────────────────────────────┐
│   Frame-by-Frame Results        │
│   Frame 1: FAKE (92%)          │
│   Frame 2: FAKE (89%)          │
│   Frame 3: REAL (76%)          │
│   ...                           │
└─────────────────────────────────┘
```

**Features:**
- Video preview with controls
- Bar chart (per-frame confidence)
- Summary statistics
- Detailed predictions list
- Color-coded frames

---

#### `frontend/src/services/api.js`
**Purpose**: Centralized API communication

**Methods:**
```javascript
apiService.healthCheck()
  → GET /health

apiService.predictImage(file, generateGradcam)
  → POST /api/predict/image

apiService.predictVideo(file, numFrames)
  → POST /api/predict/video
```

**Uses**: Axios with FormData

---

### Configuration Files

#### `frontend/vite.config.js`
```javascript
{
  server: { port: 3000 },
  proxy: { '/api': 'http://localhost:8000' }
}
```

#### `frontend/tailwind.config.js`
```javascript
{
  darkMode: 'class',
  colors: {
    primary: { 500: '#0ea5e9', ... },
    dark: { 900: '#0f172a', ... }
  },
  animations: { fade-in, slide-up, ... }
}
```

#### `frontend/package.json`
**Scripts:**
```json
{
  "dev": "vite",              // Development server
  "build": "vite build",      // Production build
  "preview": "vite preview"   // Preview build
}
```

---

## 🔄 Data Flow

### Image Analysis Flow

```
User
  ↓
FileUpload.jsx
  │ (file uploaded)
  ↓
App.jsx (handleAnalyze)
  │
  ├─→ LoadingAnimation.jsx (display)
  │
  └─→ api.js (predictImage)
      │
      └─→ POST /api/predict/image
          │
          ├─→ backend/app.py
          │   │
          │   ├─→ src/models/efficientnet.py
          │   ├─→ src/explainability/gradcam.py
          │   │
          │   └─→ Response
          │
          └─→ ImageAnalysis.jsx (display result)
              │
              ├─→ Confidence chart
              ├─→ Probability pie chart
              └─→ Grad-CAM visualization
```

---

## 📦 Dependencies Map

### Backend Dependencies
```
fastapi ──┬─→ API framework
          └─→ pydantic (validation)

uvicorn ────→ ASGI server

torch ──────→ Deep learning framework
  │
  ├─→ torchvision (transforms)
  └─→ timm (EfficientNet)

opencv-python → Video processing

mediapipe ──→ Face detection

pytorch-grad-cam → Explainability
```

### Frontend Dependencies
```
react ──────→ UI library
  │
  └─→ react-dom (rendering)

vite ───────→ Build tool

framer-motion → Animations

axios ──────→ HTTP client

tailwindcss → Styling
  │
  ├─→ autoprefixer
  └─→ postcss

recharts ───→ Charts/graphs

react-dropzone → File upload

lucide-react → Icons
```

---

## 🎨 Component Hierarchy

```
App.jsx
├─ Header.jsx
│  ├─ Logo
│  ├─ API Status
│  └─ Dark Mode Toggle
│
├─ Mode Selector
│  ├─ Image Button
│  └─ Video Button
│
├─ FileUpload.jsx
│  ├─ Dropzone
│  ├─ File Preview
│  └─ Analyze Button
│
├─ LoadingAnimation.jsx
│  ├─ Spinner
│  ├─ Progress Stages
│  └─ Pulsing Dots
│
├─ ImageAnalysis.jsx
│  ├─ Result Card
│  ├─ Confidence Bar
│  ├─ Probability Chart
│  └─ Grad-CAM Grid
│
├─ VideoAnalysis.jsx
│  ├─ Result Card
│  ├─ Video Preview
│  ├─ Frame Chart
│  └─ Predictions List
│
└─ About.jsx
   ├─ Features Grid
   └─ How It Works
```

---

## 🗂️ File Size Reference

```
backend/app.py                 ~10 KB
frontend/src/App.jsx           ~6 KB
frontend/src/components/       ~30 KB (total)
frontend/package.json          ~1 KB
frontend/node_modules/         ~300 MB
models/best_efficientnet.pth   ~17 MB
```

---

## 🚀 Build Output

### Development
```
frontend/
├── node_modules/      (not tracked)
└── src/              (source files)
```

### Production
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-abc123.js     (bundled JS)
│   └── index-def456.css    (bundled CSS)
└── ...
```

**Size**: ~500 KB (gzipped)

---

## 📝 Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `README_REACT.md` | Main documentation | First time setup |
| `REACT_SETUP.md` | Detailed setup guide | Installation |
| `CONVERSION_GUIDE.md` | Streamlit → React reference | Understanding changes |
| `STREAMLIT_VS_REACT.md` | Comparison & rationale | Decision making |
| `SETUP_CHECKLIST.md` | Step-by-step checklist | During setup |
| `QUICK_REFERENCE.md` | One-page cheat sheet | Daily reference |
| `FOLDER_STRUCTURE.md` | This file | Navigation help |

---

## 🎯 Where to Start

### For Development:
1. **Backend**: `backend/app.py`
2. **Frontend Entry**: `frontend/src/main.jsx` → `App.jsx`
3. **Components**: `frontend/src/components/`
4. **API Calls**: `frontend/src/services/api.js`

### For Styling:
1. **Global Styles**: `frontend/src/index.css`
2. **Tailwind Config**: `frontend/tailwind.config.js`
3. **Component Styles**: Inline Tailwind classes

### For Logic:
1. **Model Loading**: `backend/app.py` (line 56-71)
2. **Image Prediction**: `backend/app.py` (line 98-148)
3. **Video Prediction**: `backend/app.py` (line 151-242)
4. **Frontend State**: `frontend/src/App.jsx` (line 11-18)

---

<div align="center">

**Navigate with confidence!** 🧭

</div>
