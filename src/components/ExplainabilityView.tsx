import { useState } from 'react';
import { Eye, EyeOff, Info } from 'lucide-react';

interface ExplainabilityViewProps {
  originalImage: string;
  heatmapImage: string;
}

export const ExplainabilityView = ({ originalImage, heatmapImage }: ExplainabilityViewProps) => {
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Visual Explanation (Grad-CAM)</h3>
        </div>
        
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors text-sm font-medium"
        >
          {showHeatmap ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Overlay
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show Overlay
            </>
          )}
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Original Image */}
          <div className="relative">
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground border border-border">
              Original
            </div>
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Heatmap */}
          <div className="relative border-l border-border">
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground border border-border z-10">
              Attention Map
            </div>
            <div className="relative w-full h-64 overflow-hidden">
              <img 
                src={originalImage} 
                alt="Base" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img 
                src={heatmapImage} 
                alt="Heatmap overlay" 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showHeatmap ? 'opacity-70' : 'opacity-0'}`}
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="p-4 border-t border-border bg-muted/50">
          <p className="text-sm text-muted-foreground text-center">
            Highlighted regions influenced the model's decision. Warmer colors indicate higher attention.
          </p>
        </div>
      </div>
    </div>
  );
};
