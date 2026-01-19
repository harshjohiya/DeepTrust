# ✅ DeepTrust Setup Checklist

Follow this checklist to get DeepTrust up and running quickly!

---

## 📋 Pre-Setup Checklist

### Required Software
- [ ] Node.js 18+ installed
  ```bash
  node --version  # Should be v18 or higher
  ```
- [ ] npm installed
  ```bash
  npm --version
  ```
- [ ] Python 3.8+ installed
  ```bash
  python --version
  ```
- [ ] pip installed
  ```bash
  pip --version
  ```

### Required Files
- [ ] Trained model file exists at `models/best_efficientnet_b0.pth`
- [ ] All source files in `src/` directory intact

---

## 🔧 Backend Setup

### Step 1: Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

**Expected packages:**
- [ ] fastapi
- [ ] uvicorn
- [ ] python-multipart
- [ ] torch
- [ ] torchvision
- [ ] timm
- [ ] opencv-python
- [ ] pillow
- [ ] mediapipe
- [ ] pytorch-grad-cam

### Step 2: Verify Installation
```bash
python -c "import fastapi; import torch; import timm; print('All imports successful!')"
```

Expected output: `All imports successful!`

### Step 3: Test Backend
```bash
python app.py
```

**Verify:**
- [ ] Server starts without errors
- [ ] See message: "Loading model..."
- [ ] See message: "✅ Model loaded successfully on CPU/GPU"
- [ ] Server accessible at http://localhost:8000
- [ ] Visit http://localhost:8000/docs for API documentation

---

## 🎨 Frontend Setup

### Step 1: Install Node Dependencies
```bash
cd frontend
npm install
```

**Expected packages:**
- [ ] react
- [ ] react-dom
- [ ] framer-motion
- [ ] axios
- [ ] lucide-react
- [ ] react-dropzone
- [ ] recharts
- [ ] tailwindcss
- [ ] vite

### Step 2: Create Environment File
```bash
# Copy example env file
copy .env.example .env  # Windows
# cp .env.example .env  # Linux/Mac
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000
```

### Step 3: Test Frontend
```bash
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] See message with local URL (usually http://localhost:3000)
- [ ] No compilation errors
- [ ] Frontend accessible in browser

---

## 🧪 Testing Checklist

### Backend Tests

#### 1. Health Check
```bash
# In browser or curl:
curl http://localhost:8000/health
```
Expected response:
```json
{
  "status": "healthy",
  "device": "cpu"  # or "cuda" if GPU available
}
```
- [ ] Health endpoint responds
- [ ] Status is "healthy"

#### 2. API Documentation
- [ ] Visit http://localhost:8000/docs
- [ ] See Swagger UI
- [ ] Two endpoints visible: `/api/predict/image` and `/api/predict/video`

### Frontend Tests

#### 1. Initial Load
- [ ] Open http://localhost:3000
- [ ] Page loads without console errors
- [ ] Header displays correctly
- [ ] DeepTrust logo visible
- [ ] Dark mode toggle works
- [ ] API status shows "Online" (green)

#### 2. Mode Selection
- [ ] "Image Analysis" button exists
- [ ] "Video Analysis" button exists
- [ ] Clicking switches between modes
- [ ] Upload area updates based on mode

#### 3. File Upload (Image)
- [ ] Drag & drop zone visible
- [ ] Can click to browse files
- [ ] Upload a test image
- [ ] Preview displays correctly
- [ ] File info shows (name, size)
- [ ] "Analyze Image" button appears
- [ ] Can clear uploaded file with X button

#### 4. Analysis (Image)
- [ ] Click "Analyze Image"
- [ ] Loading animation appears
- [ ] Multiple loading stages show
- [ ] Results appear after processing
- [ ] Prediction shows (REAL or FAKE)
- [ ] Confidence score displays
- [ ] Probability chart renders
- [ ] Grad-CAM visualization shows (3 images)

#### 5. Video Upload
- [ ] Switch to "Video Analysis" mode
- [ ] Upload a test video
- [ ] Video preview with controls
- [ ] Can play video in preview
- [ ] "Analyze Video" button appears

#### 6. Video Analysis
- [ ] Click "Analyze Video"
- [ ] Loading animation appears
- [ ] Results show after processing
- [ ] Frame-by-frame chart displays
- [ ] Summary statistics show (fake/real counts)
- [ ] Detailed frame predictions list

#### 7. Animations
- [ ] Header slides in from top on load
- [ ] Cards fade in smoothly
- [ ] Buttons scale on hover
- [ ] Results animate into view
- [ ] Progress bars animate
- [ ] No janky or stuttering animations

#### 8. Dark Mode
- [ ] Toggle dark mode with button
- [ ] All elements adapt to dark theme
- [ ] Text remains readable
- [ ] Colors change appropriately
- [ ] Toggle back to light mode works

---

## 🐛 Troubleshooting Checklist

### Backend Issues

#### Model Not Loading
- [ ] Check file path: `models/best_efficientnet_b0.pth`
- [ ] Verify file exists and is not corrupted
- [ ] Check file size (should be ~16-20 MB)
- [ ] Ensure proper file permissions

#### Import Errors
```bash
# Try installing missing packages individually:
pip install <package-name>
```
- [ ] All packages from requirements.txt installed
- [ ] Compatible versions installed

#### Port Already in Use
```bash
# Find process using port 8000 (Windows):
netstat -ano | findstr :8000
# Kill process if needed
```
- [ ] Port 8000 is free
- [ ] Or change port in `app.py`

### Frontend Issues

#### npm install Fails
```bash
# Clear cache and retry:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```
- [ ] No errors during installation
- [ ] All packages installed successfully

#### API Connection Failed
- [ ] Backend is running
- [ ] Backend is on port 8000
- [ ] No CORS errors in browser console
- [ ] `.env` file configured correctly

#### Build Errors
```bash
# Try:
npm run build
```
- [ ] Build completes without errors
- [ ] `dist/` folder created

#### Styling Not Applied
- [ ] Tailwind CSS installed
- [ ] `index.css` imported in `main.jsx`
- [ ] PostCSS configured
- [ ] Clear browser cache

---

## 🚀 Production Deployment Checklist

### Backend Deployment
- [ ] Update CORS origins to production domain
- [ ] Set up environment variables
- [ ] Configure production ASGI server (gunicorn)
- [ ] Set up SSL/TLS certificate
- [ ] Configure firewall rules
- [ ] Set up monitoring/logging

### Frontend Deployment
- [ ] Update `VITE_API_URL` to production API
- [ ] Run production build: `npm run build`
- [ ] Test build locally: `npm run preview`
- [ ] Upload `dist/` folder to hosting
- [ ] Configure redirects for SPA routing
- [ ] Set up CDN (optional)
- [ ] Configure custom domain

---

## 📊 Performance Checklist

### Backend Performance
- [ ] Model loads on startup (not per request)
- [ ] GPU acceleration enabled (if available)
- [ ] Response times < 3 seconds for images
- [ ] Response times < 5 seconds for videos
- [ ] No memory leaks during extended use

### Frontend Performance
- [ ] Initial load < 2 seconds
- [ ] Smooth 60 FPS animations
- [ ] No console errors or warnings
- [ ] Images optimized
- [ ] Code splitting working (check Network tab)

---

## 📱 Browser Compatibility Checklist

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers (responsive design)

---

## ✅ Final Verification

### Functionality
- [ ] Can upload images
- [ ] Can upload videos
- [ ] Can analyze images
- [ ] Can analyze videos
- [ ] Results display correctly
- [ ] Grad-CAM works
- [ ] Can reset and analyze another file
- [ ] Dark mode toggle works

### Visual Quality
- [ ] Animations smooth
- [ ] Layout responsive
- [ ] Colors appropriate
- [ ] Text readable
- [ ] No visual glitches

### Code Quality
- [ ] No console errors
- [ ] No console warnings (except dev mode warnings)
- [ ] Code follows best practices
- [ ] Components modular and reusable

---

## 🎉 Success!

If all items are checked, congratulations! Your DeepTrust application is ready to:
- ✨ Demo at hackathons
- 📝 Add to your portfolio
- 🎓 Use for learning
- 🚀 Deploy to production

---

## 📞 Quick Commands Reference

```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Production Build
cd frontend
npm run build
npm run preview  # Test production build

# Automated (Windows)
.\start.bat
```

---

## 🆘 Need Help?

1. Check [REACT_SETUP.md](REACT_SETUP.md) for detailed instructions
2. Review [CONVERSION_GUIDE.md](CONVERSION_GUIDE.md) for reference
3. Check browser console for errors
4. Check terminal for backend errors
5. Verify all dependencies installed

---

<div align="center">

**Happy Coding!** 🚀

</div>
