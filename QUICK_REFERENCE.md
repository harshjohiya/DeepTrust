# 🚀 DeepTrust Quick Reference

## One-Page Cheat Sheet

---

## 📦 Installation (30 seconds)

```bash
# Backend
cd backend && pip install -r requirements.txt

# Frontend (new terminal)
cd frontend && npm install
```

---

## ▶️ Start (5 seconds)

### Option 1: Automated (Windows)
```bash
.\start.bat
```

### Option 2: Manual
```bash
# Terminal 1 - Backend
cd backend && python app.py

# Terminal 2 - Frontend
cd frontend && npm run dev
```

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 📁 File Structure (Essential)

```
DeepTrust/
├── backend/
│   └── app.py              ← FastAPI server
├── frontend/
│   ├── src/
│   │   ├── App.jsx         ← Main component
│   │   ├── components/     ← React components
│   │   └── services/
│   │       └── api.js      ← API calls
│   └── index.html
├── models/
│   └── best_efficientnet_b0.pth  ← Required!
└── src/                    ← Python ML code
```

---

## 🔌 API Quick Reference

### Image Prediction
```javascript
POST /api/predict/image
FormData { file, generate_gradcam: true }

→ {
  prediction: "FAKE"|"REAL",
  confidence: 0.95,
  probabilities: { fake, real },
  gradcam: { heatmap, overlay }
}
```

### Video Prediction
```javascript
POST /api/predict/video
FormData { file, num_frames: 5 }

→ {
  prediction: "FAKE"|"REAL",
  confidence: 0.88,
  frames_analyzed: 5,
  frame_predictions: [...],
  summary: { fake_frames, real_frames }
}
```

---

## 🎨 Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `App.jsx` | Main app logic | `frontend/src/` |
| `Header.jsx` | Top bar + dark mode | `frontend/src/components/` |
| `FileUpload.jsx` | Drag & drop | `frontend/src/components/` |
| `LoadingAnimation.jsx` | Loading state | `frontend/src/components/` |
| `ImageAnalysis.jsx` | Image results | `frontend/src/components/` |
| `VideoAnalysis.jsx` | Video results | `frontend/src/components/` |

---

## ⚙️ Configuration

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (app.py)
```python
# Line 56-57
device = "cuda" if torch.cuda.is_available() else "cpu"
model_path = "models/best_efficientnet_b0.pth"
```

---

## 🎬 Animation Patterns

### Fade In
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>
```

### Slide Up
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

### Scale
```jsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring' }}
/>
```

### Hover
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

### Stagger
```jsx
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.1 }}
  />
))}
```

---

## 🎨 Styling Classes (Tailwind)

### Common Patterns
```css
/* Card */
class="card p-6"
→ Styled card with padding

/* Button Primary */
class="btn btn-primary"
→ Blue gradient button

/* Button Secondary */
class="btn btn-secondary"
→ Gray button

/* Glass Effect */
class="glass-effect"
→ Glassmorphism background

/* Gradient Text */
class="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"
→ Gradient colored text

/* Dark Mode */
class="bg-white dark:bg-dark-900"
→ Light/dark adaptive
```

---

## 🐛 Quick Fixes

### Backend Won't Start
```bash
# Check port
netstat -ano | findstr :8000

# Use different port
# Edit app.py, line 248:
uvicorn.run(app, port=8001)
```

### Frontend Build Error
```bash
rm -rf node_modules
npm install
```

### Model Not Found
```bash
# Verify path
ls models/best_efficientnet_b0.pth

# Check in app.py, line 57
```

### API Connection Failed
1. ✅ Backend running?
2. ✅ Port 8000 accessible?
3. ✅ CORS enabled? (already configured)
4. ✅ `.env` file correct?

---

## 📊 Performance Tips

### Backend
```python
# Model loads once on startup ✅
@app.on_event("startup")
async def load_model_on_startup():
    global model
    model = load_model_from_checkpoint(...)
```

### Frontend
```javascript
// Lazy load components
const Component = lazy(() => import('./Component'));

// Memoize expensive components
const MemoComponent = React.memo(Component);
```

---

## 🚀 Production Build

```bash
# Frontend
cd frontend
npm run build
# → Creates dist/ folder

# Test locally
npm run preview
# → http://localhost:4173

# Backend (production server)
pip install gunicorn
gunicorn backend.app:app -w 4 -k uvicorn.workers.UvicornWorker
```

---

## 🎯 Common Tasks

### Add New Component
```bash
# Create file
frontend/src/components/NewComponent.jsx

# Import in App.jsx
import NewComponent from './components/NewComponent';
```

### Change Colors
```javascript
// Edit frontend/tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: { 500: '#your-color' }
    }
  }
}
```

### Add API Endpoint
```python
# In backend/app.py
@app.post("/api/new-endpoint")
async def new_endpoint():
    return {"message": "Hello"}
```

```javascript
// In frontend/src/services/api.js
async newEndpoint() {
  const response = await api.post('/api/new-endpoint');
  return response.data;
}
```

---

## 📚 Dependencies

### Backend (Python)
- fastapi, uvicorn - API framework
- torch, torchvision - Deep learning
- timm - EfficientNet model
- opencv-python - Video processing
- mediapipe - Face detection
- pytorch-grad-cam - Explainability

### Frontend (JavaScript)
- react, react-dom - UI framework
- framer-motion - Animations
- axios - HTTP client
- tailwindcss - Styling
- recharts - Charts
- react-dropzone - File upload
- lucide-react - Icons

---

## 🔥 Hot Tips

1. **Use Framer Motion DevTools** - Press Ctrl+Shift+F in browser
2. **Check Network Tab** - See API requests/responses
3. **React DevTools** - Install browser extension
4. **Use Vite HMR** - Changes reflect instantly
5. **Check Console** - All errors visible here
6. **GPU Acceleration** - 3-5x faster with CUDA
7. **File Size Limits** - Default 100MB in FastAPI
8. **CORS Already Set** - `allow_origins=["*"]` for development

---

## 🎓 Learning Path

1. **Basic React** (1-2 days)
   - Components, props, state
   - Hooks (useState, useEffect)
   
2. **Framer Motion** (1 day)
   - Basic animations
   - Variants and transitions
   
3. **Tailwind CSS** (1 day)
   - Utility classes
   - Responsive design
   
4. **FastAPI** (1 day)
   - Route handlers
   - File uploads
   - CORS

**Total**: ~1 week to proficiency

---

## 📞 URLs to Bookmark

- React: https://react.dev/
- Framer Motion: https://www.framer.com/motion/
- Tailwind: https://tailwindcss.com/
- FastAPI: https://fastapi.tiangolo.com/
- Vite: https://vitejs.dev/

---

## ⌨️ VS Code Extensions

- ES7+ React Snippets
- Tailwind CSS IntelliSense
- Python
- Prettier
- ESLint

---

## 🎉 Quick Demo Script

1. Open http://localhost:3000
2. Toggle dark mode (show off animations)
3. Upload sample image (drag & drop)
4. Click "Analyze Image"
5. Show loading animation
6. Present results with Grad-CAM
7. Switch to "Video Analysis"
8. Upload sample video
9. Show frame-by-frame results
10. Reset and repeat!

**Demo Time**: 2-3 minutes

---

<div align="center">

**Print this page for quick reference!** 📄

**Start coding:** `cd frontend && npm run dev` 🚀

</div>
