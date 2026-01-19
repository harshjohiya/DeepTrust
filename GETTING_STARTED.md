# 🎬 Getting Started - Visual Guide

## Step-by-Step Setup with Screenshots and Commands

---

## 📋 Prerequisites Check

### Before you begin, verify you have:

```bash
# Check Node.js (need 18+)
node --version
# Expected: v18.x.x or higher

# Check npm
npm --version
# Expected: 9.x.x or higher

# Check Python (need 3.8+)
python --version
# Expected: Python 3.8.x or higher

# Check pip
pip --version
# Expected: pip 23.x.x or higher
```

**If missing:**
- Node.js: https://nodejs.org/ (download LTS)
- Python: https://python.org/ (download 3.8+)

---

## 🚀 Setup Process (5 Steps)

### Step 1: Verify Project Structure

```
Your current location:
h:\my project\DeepTrust\

Required structure:
DeepTrust/
├── backend/
│   ├── app.py ✓
│   └── requirements.txt ✓
├── frontend/
│   ├── package.json ✓
│   └── src/ ✓
├── models/
│   └── best_efficientnet_b0.pth ⚠️ IMPORTANT
└── src/ ✓
```

**Check if model exists:**
```powershell
Test-Path "h:\my project\DeepTrust\models\best_efficientnet_b0.pth"
# Should return: True
```

**If False:** You need the trained model file!

---

### Step 2: Setup Backend (5 minutes)

**Open PowerShell/Terminal 1:**

```powershell
# Navigate to backend
cd "h:\my project\DeepTrust\backend"

# Install Python packages
pip install -r requirements.txt

# You'll see:
# Collecting fastapi...
# Collecting uvicorn...
# ...
# Successfully installed fastapi-0.109.0 uvicorn-0.27.0 ...

# Verify installation
python -c "import fastapi; import torch; print('✓ All imports successful!')"

# Expected output:
# ✓ All imports successful!
```

**Installation Progress:**
```
[1/11] Installing fastapi ▓▓▓▓▓▓▓▓░░
[2/11] Installing uvicorn ▓▓▓▓▓▓▓▓░░
...
[11/11] Complete! ▓▓▓▓▓▓▓▓▓▓
```

**Common Issues:**
- "torch not found" → `pip install torch torchvision`
- "Permission denied" → Use `pip install --user -r requirements.txt`
- "Slow download" → Use a mirror: `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt`

---

### Step 3: Start Backend (30 seconds)

**In Terminal 1 (still in backend/):**

```powershell
# Start the server
python app.py

# You'll see:
Loading model...
✅ Model loaded successfully on CPU
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Visual Confirmation:**
```
┌─────────────────────────────────────┐
│ Backend Terminal                    │
├─────────────────────────────────────┤
│ $ python app.py                     │
│ Loading model...                    │
│ ✅ Model loaded on CPU              │
│ Uvicorn running on ...8000 (Press CTRL+C to quit)
│ █                                   │
└─────────────────────────────────────┘
```

**Test Backend:**
Open browser: http://localhost:8000/health

Should show:
```json
{
  "status": "healthy",
  "device": "cpu"
}
```

✅ Backend Ready!

---

### Step 4: Setup Frontend (2 minutes)

**Open NEW PowerShell/Terminal 2:**

```powershell
# Navigate to frontend
cd "h:\my project\DeepTrust\frontend"

# Install npm packages
npm install

# You'll see:
# added 234 packages in 45s
# 
# 23 packages are looking for funding
#   run `npm fund` for details
```

**Installation Progress:**
```
Installing packages...
┌─────────────────────────┐
│ ████████████████░░░░░░░ │ 234/300 packages
└─────────────────────────┘

node_modules/
├── react@18.2.0
├── framer-motion@10.16.16
├── tailwindcss@3.4.1
└── ...
```

**Common Issues:**
- "npm not found" → Install Node.js
- "EACCES permission" → Don't use `sudo`, check Node install
- "Slow install" → Use `npm install --registry=https://registry.npmmirror.com`

---

### Step 5: Start Frontend (10 seconds)

**In Terminal 2 (still in frontend/):**

```powershell
# Start development server
npm run dev

# You'll see:
  VITE v5.0.11  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Visual Confirmation:**
```
┌─────────────────────────────────────┐
│ Frontend Terminal                   │
├─────────────────────────────────────┤
│ $ npm run dev                       │
│                                     │
│ VITE v5.0.11  ready in 234 ms      │
│                                     │
│ ➜  Local:   http://localhost:3000/ │
│ █                                   │
└─────────────────────────────────────┘
```

✅ Frontend Ready!

---

## 🌐 Access the Application

### Open your browser:

**URL:** http://localhost:3000

**You should see:**
```
┌──────────────────────────────────────────┐
│ 🔍 DeepTrust         [●] Online  [🌙]   │
│    AI Deepfake Detection                 │
├──────────────────────────────────────────┤
│                                          │
│    [📷 Image Analysis] [🎥 Video Analysis] │
│                                          │
│   ┌────────────────────────────────┐   │
│   │                                │   │
│   │          📷                    │   │
│   │                                │   │
│   │  Drop your image or browse    │   │
│   │  Supports: JPG, PNG           │   │
│   │                                │   │
│   └────────────────────────────────┘   │
│                                          │
└──────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

Before proceeding, verify:

### Backend Checks:
- [ ] Terminal shows "Model loaded successfully"
- [ ] Terminal shows "Uvicorn running on ...8000"
- [ ] http://localhost:8000/health shows "healthy"
- [ ] http://localhost:8000/docs shows API documentation

### Frontend Checks:
- [ ] Terminal shows "VITE v5.0.11 ready"
- [ ] Browser opens http://localhost:3000
- [ ] Page loads without errors
- [ ] API status shows "Online" (green dot)
- [ ] Dark mode toggle works
- [ ] Can switch between Image/Video modes

**All checked?** You're ready to test! 🎉

---

## 🧪 First Test

### Test Image Analysis:

1. **Switch to Image Analysis mode** (if not already)
   - Click [📷 Image Analysis] button

2. **Upload an image**
   - Drag and drop an image, OR
   - Click the upload area to browse
   - Select a face image (JPG/PNG)

3. **Verify preview**
   ```
   ┌─────────────────┐
   │  [✖]           │  ← Clear button
   │                 │
   │   [Image        │  ← Your image
   │    Preview]     │
   │                 │
   ├─────────────────┤
   │ File: test.jpg  │
   │ Size: 2.4 MB    │
   └─────────────────┘
   
   [   Analyze Image   ]  ← Click here
   ```

4. **Click "Analyze Image"**

5. **Watch the loading animation**
   ```
   ⟳ Loading Spinner
   
   Analyzing Image...
   
   🔍 Detecting faces...
   🧠 Analyzing with AI...
   ⚙️ Processing results...
   
   • • •
   ```

6. **View results** (after 1-2 seconds)
   ```
   ┌─────────────────────────────────┐
   │ ⚠️  FAKE DETECTED   [Analyze Another] │
   │    Confidence: 95.23%           │
   │    ▓▓▓▓▓▓▓▓▓▓░░░░░░            │
   └─────────────────────────────────┘
   ```

✅ **Success!** Your first analysis complete!

---

## 🎥 Test Video Analysis:

1. **Switch to Video Analysis**
   - Click [🎥 Video Analysis]

2. **Upload video**
   - Drag/drop or browse
   - Select MP4/AVI/MOV file

3. **Click "Analyze Video"**

4. **Wait for frame-by-frame analysis** (3-5 seconds)

5. **View detailed results**
   ```
   ┌──────────────────────────┐
   │ FAKE DETECTED            │
   │ Avg Confidence: 88.45%   │
   │ Analyzed 5 frames        │
   ├──────────────────────────┤
   │ Fake frames: 4           │
   │ Real frames: 1           │
   └──────────────────────────┘
   ```

✅ **Video analysis working!**

---

## 🎨 Explore Features:

### Dark Mode
**Click moon icon** → Page darkens  
**Click sun icon** → Page lightens

```
Light Mode:           Dark Mode:
┌──────────┐         ┌──────────┐
│ ☀️ [🌙]  │         │ [☀️] 🌙  │
│ White bg │   →     │ Dark bg  │
│ Black text│        │ White text│
└──────────┘         └──────────┘
```

### Animations
- Watch header slide down on load
- Hover over buttons (they scale up)
- Watch cards fade in
- See progress bars animate

### Charts
- **Image**: Pie chart showing probabilities
- **Video**: Bar chart for each frame

### Grad-CAM
- Shows heatmap of AI focus areas
- Three panels: Original, Heatmap, Overlay

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem:** "Model not found"  
**Solution:**
```powershell
# Check if model exists
Test-Path "h:\my project\DeepTrust\models\best_efficientnet_b0.pth"
# If False, you need to get the model file
```

**Problem:** "Port 8000 already in use"  
**Solution:**
```powershell
# Find process using port
netstat -ano | findstr :8000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in backend/app.py (line 248)
uvicorn.run(app, port=8001)  # Change to 8001
```

**Problem:** "Import errors"  
**Solution:**
```powershell
# Reinstall dependencies
pip uninstall -y -r requirements.txt
pip install -r requirements.txt
```

---

### Frontend Issues:

**Problem:** "API Offline" (red status)  
**Solution:**
1. Check backend is running
2. Visit http://localhost:8000/health
3. Check for CORS errors in browser console

**Problem:** "Blank page"  
**Solution:**
```powershell
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Problem:** "Slow loading"  
**Solution:**
- Check Network tab in browser DevTools
- Verify files are loading
- Check backend isn't slow

---

### Common Errors:

**Browser Console Error:**
```
Failed to fetch
```
→ Backend not running

**Browser Console Error:**
```
CORS error
```
→ Backend CORS not configured (should be fixed already)

**Terminal Error:**
```
ModuleNotFoundError: No module named 'fastapi'
```
→ Run `pip install -r requirements.txt`

**Browser Console Error:**
```
Cannot find module 'react'
```
→ Run `npm install`

---

## 🎯 Quick Reference

### Starting the App:

**Automated (Windows):**
```powershell
.\start.bat
```

**Manual:**
```powershell
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Stopping the App:

**Both terminals:**
```
Press Ctrl+C
```

### Restarting:

**Backend:**
```powershell
# In Terminal 1
Ctrl+C  # Stop
python app.py  # Start
```

**Frontend:**
```powershell
# In Terminal 2
Ctrl+C  # Stop
npm run dev  # Start
```

---

## 📊 Terminal Layout

**Recommended Setup:**

```
┌─────────────────────────────────────────────┐
│ Screen                                      │
├──────────────────────┬──────────────────────┤
│ Terminal 1 (Backend) │ Terminal 2 (Frontend)│
│                      │                      │
│ backend> python app │ frontend> npm run dev│
│                      │                      │
│ Model loaded ✓       │ VITE ready ✓        │
│ Uvicorn running...   │ Local: :3000        │
│                      │                      │
└──────────────────────┴──────────────────────┘
┌─────────────────────────────────────────────┐
│ Browser: http://localhost:3000              │
│ DeepTrust Application                       │
└─────────────────────────────────────────────┘
```

---

## 🎉 Success!

If you can:
1. ✅ See backend "Model loaded"
2. ✅ See frontend Vite server running
3. ✅ Open http://localhost:3000
4. ✅ See "Online" status
5. ✅ Upload and analyze a file
6. ✅ See results display

**You're all set! Start using DeepTrust!** 🚀

---

## 📚 Next Steps

### Learn More:
1. Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
2. Check [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) to understand files
3. Explore [ROADMAP.md](ROADMAP.md) for enhancement ideas

### Customize:
1. Change colors in `frontend/tailwind.config.js`
2. Modify animations in components
3. Add new features from roadmap

### Deploy:
1. Build frontend: `npm run build`
2. Deploy to Vercel/Netlify
3. Deploy backend to Heroku/AWS

---

<div align="center">

## **You're ready to build amazing things with DeepTrust!** 🌟

**Need help?** Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

**Happy coding!** 💻✨

</div>
