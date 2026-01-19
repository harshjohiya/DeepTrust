# DeepTrust - React Conversion Quick Reference

## 🎯 Key Changes from Streamlit to React

### Architecture
- **Before**: Streamlit (monolithic, Python-based UI)
- **After**: FastAPI backend + React frontend (separated concerns)

### Technology Stack

#### Backend (Python)
- FastAPI for REST API
- Uvicorn ASGI server
- Same ML model inference logic (unchanged)
- CORS middleware for frontend communication

#### Frontend (React)
- Vite for fast development
- Framer Motion for animations
- Tailwind CSS for styling
- Axios for API calls
- React Dropzone for file uploads
- Recharts for data visualization

## 📋 Component Mapping

| Streamlit Component | React Component | Features |
|---------------------|-----------------|----------|
| `st.file_uploader()` | `FileUpload.jsx` | Drag & drop, preview, animations |
| `st.spinner()` | `LoadingAnimation.jsx` | Multi-stage animated loader |
| `st.columns()` | CSS Grid/Flexbox | Responsive grid layout |
| `st.image()` | `<img>` with Framer Motion | Animated image display |
| `st.video()` | `<video>` element | Native HTML5 video player |
| `st.progress()` | Custom progress bar | Animated confidence bars |
| `st.metric()` | Custom metric cards | Styled stat displays |
| Charts | Recharts library | Pie charts, bar charts |

## 🎨 Animation Examples

### Page Transition
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
```

### Button Interaction
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### Loading Spinner
```javascript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
>
```

### Staggered List Animation
```javascript
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
))}
```

## 🔄 API Flow

### Image Analysis
1. User uploads image via drag & drop
2. Preview displayed with animation
3. Click "Analyze Image" button
4. Loading animation shows
5. API call: `POST /api/predict/image`
6. Result animated into view
7. Grad-CAM visualizations displayed

### Video Analysis
1. User uploads video
2. Video preview with controls
3. Click "Analyze Video" button
4. Loading animation with progress stages
5. API call: `POST /api/predict/video`
6. Frame-by-frame chart animated
7. Detailed predictions list

## 💡 Performance Tips

### Frontend Optimizations
- Use `React.memo()` for expensive components
- Implement virtual scrolling for long lists
- Optimize images with proper formats
- Use lazy loading for components
- Debounce API calls

### Backend Optimizations
- Cache model loading with `@app.on_event("startup")`
- Use async/await for non-blocking operations
- Implement request rate limiting
- Add response compression
- Use GPU when available

## 🎨 Styling Patterns

### Glass Effect
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(to right, #0ea5e9, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Card Shadow
```css
.card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend
```python
# In app.py
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", 8000))
```

## 📊 State Management

### Component State
```javascript
const [file, setFile] = useState(null);
const [result, setResult] = useState(null);
const [isLoading, setIsLoading] = useState(false);
```

### API State
```javascript
const [apiStatus, setApiStatus] = useState('checking');
// checking -> healthy | offline
```

## 🎯 Best Practices

### Component Organization
- Keep components small and focused
- Use meaningful prop names
- Implement prop validation
- Add loading and error states
- Make components reusable

### Animation Guidelines
- Keep animations under 500ms
- Use ease-out for entrances
- Use ease-in for exits
- Add stagger for lists
- Respect prefers-reduced-motion

### API Integration
- Handle all error cases
- Show loading states
- Implement retries
- Add timeout handling
- Display user-friendly errors

## 🚀 Next Steps

### Enhancements to Consider
1. **Add user authentication**
2. **Implement history/recent analyses**
3. **Add batch processing**
4. **Export results to PDF/JSON**
5. **Add model comparison**
6. **Implement A/B testing**
7. **Add analytics dashboard**
8. **Multi-language support**

### Additional Features
- Real-time streaming analysis
- Collaborative analysis sessions
- Advanced filtering options
- Custom model selection
- Result sharing capabilities
- Performance benchmarking

---

**Ready to build!** Start with `npm install` in frontend and `pip install -r requirements.txt` in backend.
