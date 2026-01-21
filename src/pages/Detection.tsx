import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { UploadZone } from '@/components/UploadZone';
import { ProcessingState } from '@/components/ProcessingState';
import { ResultCard, Verdict } from '@/components/ResultCard';
import { ExplainabilityView } from '@/components/ExplainabilityView';
import { FrameAnalysis } from '@/components/FrameAnalysis';
import { RefreshCw, Shield } from 'lucide-react';

// Mock data for demo purposes
const mockImageResult = {
  verdict: 'FAKE' as Verdict,
  confidence: 87,
  explanation: 'The model detected subtle inconsistencies in facial texture around the eyes and mouth region. Lighting artifacts and unnatural skin smoothing patterns suggest AI-based generation or manipulation.',
};

const mockVideoFrames = [
  { frameNumber: 1, timestamp: '0:02', verdict: 'FAKE' as Verdict, confidence: 82, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { frameNumber: 2, timestamp: '0:05', verdict: 'FAKE' as Verdict, confidence: 79, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { frameNumber: 3, timestamp: '0:08', verdict: 'UNCERTAIN' as Verdict, confidence: 54, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { frameNumber: 4, timestamp: '0:11', verdict: 'FAKE' as Verdict, confidence: 88, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { frameNumber: 5, timestamp: '0:14', verdict: 'FAKE' as Verdict, confidence: 91, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { frameNumber: 6, timestamp: '0:17', verdict: 'FAKE' as Verdict, confidence: 85, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
];

// Mock heatmap gradient overlay
const mockHeatmapUrl = 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop';

type AnalysisState = 'idle' | 'processing' | 'complete';
type FileType = 'image' | 'video' | null;

const Detection = () => {
  const [state, setState] = useState<AnalysisState>('idle');
  const [fileType, setFileType] = useState<FileType>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const handleFileSelect = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    setFileType(isVideo ? 'video' : 'image');
    setUploadedUrl(URL.createObjectURL(file));
    setState('processing');
  };

  // Simulate processing
  useEffect(() => {
    if (state === 'processing') {
      const timer = setTimeout(() => {
        setState('complete');
      }, 6000); // 6 seconds for demo
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleReset = () => {
    setState('idle');
    setFileType(null);
    setUploadedUrl('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Media Analysis</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Deepfake Detection
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload an image or video to analyze for AI-generated or manipulated content.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="glass-card rounded-3xl p-6 md:p-10">
            {state === 'idle' && (
              <UploadZone onFileSelect={handleFileSelect} isProcessing={false} />
            )}

            {state === 'processing' && (
              <div className="py-8">
                <UploadZone onFileSelect={() => {}} isProcessing={true} />
                <ProcessingState />
              </div>
            )}

            {state === 'complete' && (
              <div className="space-y-8">
                {/* Reset button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors text-sm font-medium text-foreground"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Analyze Another
                  </button>
                </div>

                {/* Results */}
                <ResultCard {...mockImageResult} />

                {/* Explainability */}
                {fileType === 'image' && (
                  <ExplainabilityView
                    originalImage={uploadedUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'}
                    heatmapImage={mockHeatmapUrl}
                  />
                )}

                {/* Video frame analysis */}
                {fileType === 'video' && (
                  <FrameAnalysis
                    frames={mockVideoFrames}
                    finalVerdict="FAKE"
                  />
                )}
              </div>
            )}
          </div>

          {/* Info footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Results are for demonstration purposes. Always verify with multiple sources.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detection;
