import { Film, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Verdict } from './ResultCard';

interface FramePrediction {
  frameNumber: number;
  timestamp: string;
  verdict: Verdict;
  confidence: number;
  thumbnail: string;
}

interface FrameAnalysisProps {
  frames: FramePrediction[];
  finalVerdict: Verdict;
}

const verdictIcons = {
  REAL: CheckCircle2,
  FAKE: XCircle,
  UNCERTAIN: AlertCircle,
};

const verdictColors = {
  REAL: 'text-success border-success/30 bg-success-muted',
  FAKE: 'text-danger border-danger/30 bg-danger-muted',
  UNCERTAIN: 'text-warning border-warning/30 bg-warning-muted',
};

export const FrameAnalysis = ({ frames, finalVerdict }: FrameAnalysisProps) => {
  const verdictCounts = frames.reduce((acc, frame) => {
    acc[frame.verdict] = (acc[frame.verdict] || 0) + 1;
    return acc;
  }, {} as Record<Verdict, number>);

  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <Film className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Frame-by-Frame Analysis</h3>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {(['REAL', 'FAKE', 'UNCERTAIN'] as Verdict[]).map((verdict) => {
          const Icon = verdictIcons[verdict];
          const count = verdictCounts[verdict] || 0;
          return (
            <div 
              key={verdict}
              className={`rounded-xl p-4 border ${verdictColors[verdict]}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">{verdict}</span>
              </div>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs opacity-70">frames</p>
            </div>
          );
        })}
      </div>

      {/* Frame grid */}
      <div className="glass-card rounded-2xl p-4 mb-4">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {frames.map((frame) => {
            const Icon = verdictIcons[frame.verdict];
            return (
              <div 
                key={frame.frameNumber}
                className="relative group cursor-pointer"
              >
                <div className="rounded-lg overflow-hidden border border-border">
                  <img 
                    src={frame.thumbnail} 
                    alt={`Frame ${frame.frameNumber}`}
                    className="w-full h-16 object-cover"
                  />
                </div>
                
                {/* Verdict badge */}
                <div className={`absolute -top-1 -right-1 p-1 rounded-full ${
                  frame.verdict === 'REAL' ? 'bg-success' :
                  frame.verdict === 'FAKE' ? 'bg-danger' : 'bg-warning'
                }`}>
                  <Icon className="w-3 h-3 text-card" />
                </div>

                {/* Hover info */}
                <div className="absolute inset-0 bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center text-xs">
                  <span className="font-medium">{frame.timestamp}</span>
                  <span className="text-muted-foreground">{frame.confidence}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final verdict explanation */}
      <div className="bg-accent/50 rounded-xl p-4 border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Final verdict determined by majority vote: </span>
          Based on {frames.length} sampled frames, the model determined this video is 
          <span className={`font-semibold ${
            finalVerdict === 'REAL' ? 'text-success' :
            finalVerdict === 'FAKE' ? 'text-danger' : 'text-warning'
          }`}> {finalVerdict.toLowerCase()}</span>.
        </p>
      </div>
    </div>
  );
};
