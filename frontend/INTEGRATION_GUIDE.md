# DeepTrust Frontend Integration Guide

## ✅ What Was Done

### 1. TypeScript Setup
- Added TypeScript to existing React + Vite project
- Configured `tsconfig.json` with path aliases (`@/*`)
- Updated Vite config for TypeScript support

### 2. Shadcn UI Structure
- Created `/components/ui` directory (shadcn standard)
- Added `lib/utils.ts` with `cn()` utility for class merging
- Installed required dependencies:
  - `class-variance-authority`
  - `clsx`
  - `tailwind-merge`

### 3. Particle Effect Component
- **Location:** `src/components/ui/particle-effect-for-hero.tsx`
- **Features:**
  - Interactive particle physics with mouse repulsion
  - Background ambient particles with twinkling effect
  - Pulsating radial glow
  - Collision detection between particles
  - Spring-back animation
  - FPS counter and performance optimization
  - Fully responsive canvas

### 4. Routing Structure
- Installed `react-router-dom`
- Created two routes:
  - `/` - Hero landing page with particle effect
  - `/analysis` - Main deepfake analysis page
- Updated `main.jsx` with `<BrowserRouter>`

### 5. Hero Page
- **Location:** `src/pages/HeroPage.tsx`
- Displays the particle effect component
- "Start Analysis" button navigates to `/analysis`
- About button for future implementation
- Customized branding: "DeepTrust" instead of "Antigravity"

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── particle-effect-for-hero.tsx  ⭐ New
│   │   ├── Header.jsx
│   │   ├── FileUpload.jsx
│   │   ├── ImageAnalysis.jsx
│   │   └── VideoAnalysis.jsx
│   ├── pages/
│   │   └── HeroPage.tsx  ⭐ New
│   ├── lib/
│   │   └── utils.ts  ⭐ New
│   ├── services/
│   │   └── api.js
│   ├── App.tsx  ⭐ Converted from .jsx
│   ├── main.jsx
│   └── index.css
├── tsconfig.json  ⭐ New
├── tsconfig.node.json  ⭐ New
└── package.json  ✏️ Updated
```

## 🚀 How to Use

### Start Development Server
```bash
cd frontend
npm run dev
```

The app runs at: **http://localhost:3000**

### Navigation Flow
1. **Landing Page** (`/`) - Particle effect hero with "Start Analysis" button
2. **Analysis Page** (`/analysis`) - Your existing upload and analysis UI

### Component Usage

```tsx
import ParticleEffectForHero from '@/components/ui/particle-effect-for-hero';

<ParticleEffectForHero 
  onStartClick={() => navigate('/analysis')}
  onAboutClick={() => setShowAbout(true)}
/>
```

## 🎨 Customization

### Particle Physics Constants
In `particle-effect-for-hero.tsx`:

```typescript
const PARTICLE_DENSITY = 0.00015;      // More = denser
const MOUSE_RADIUS = 180;              // Mouse influence area
const RETURN_SPEED = 0.08;             // Spring-back speed
const DAMPING = 0.90;                  // Friction
const REPULSION_STRENGTH = 1.2;        // Mouse push force
```

### Styling
- Background color: Black (`bg-black`)
- Particle colors: White + Google Blue accent (`#4285F4`)
- All Tailwind classes can be customized

## 📦 Installed Dependencies

```json
{
  "dependencies": {
    "react-router-dom": "^6.x",
    "class-variance-authority": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "lucide-react": "^0.314.0"  // Already installed
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x"
  }
}
```

## 🔧 Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]  // Allows @/components imports
    }
  }
}
```

### vite.config.js
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

## 🎯 Features of Particle Effect

### Interactive Physics
- **Mouse Repulsion:** Particles flee from cursor
- **Spring System:** Particles return to origin
- **Collisions:** Particles bounce off each other
- **Damping:** Smooth friction effect

### Visual Effects
- **Background Stars:** Twinkling ambient particles
- **Radial Glow:** Pulsating center gradient
- **Dynamic Opacity:** Particles fade based on velocity
- **Color Accents:** 10% blue particles for visual interest

### Performance
- **Canvas API:** Hardware-accelerated 2D rendering
- **Device Pixel Ratio:** Crisp on retina displays
- **RequestAnimationFrame:** 60 FPS smooth animation
- **FPS Counter:** Debug overlay (bottom-right)

## 🌐 Backend Integration

The analysis page (`/analysis`) connects to your FastAPI backend at `http://localhost:8000`:

```javascript
// Already configured in vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

## 🎨 Tailwind + Shadcn Ready

The project now follows shadcn conventions:
- ✅ Components in `/components/ui`
- ✅ Utility function in `/lib/utils.ts`
- ✅ Path aliases configured (`@/*`)
- ✅ TypeScript support
- ✅ Tailwind CSS integration

## 🚦 Next Steps

1. **Start Backend:**
   ```bash
   cd backend
   python -m uvicorn app:app --reload
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Visit:** http://localhost:3000

4. **Experience:**
   - Hero page with interactive particles
   - Click "Start Analysis"
   - Upload images/videos for deepfake detection

## 🎉 Success!

Your DeepTrust project now has:
- ✅ Professional hero landing page
- ✅ Interactive particle physics
- ✅ Smooth routing between pages
- ✅ TypeScript support
- ✅ Shadcn UI structure
- ✅ Ready for production deployment

## 📝 Notes

- The particle effect runs entirely on Canvas 2D (no WebGL)
- Compatible with all modern browsers
- Performance optimized for 60 FPS
- Mobile-responsive design
- Dark theme by default
