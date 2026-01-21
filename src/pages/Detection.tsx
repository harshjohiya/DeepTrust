import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { UploadZone } from '@/components/UploadZone';
import { ProcessingState } from '@/components/ProcessingState';
import { ResultCard, Verdict } from '@/components/ResultCard';
import { ExplainabilityView } from '@/components/ExplainabilityView';
import { FrameAnalysis } from '@/components/FrameAnalysis';
import { RefreshCw, Shield, AlertCircle } from 'lucide-react';
import { apiService } from '@/services/api';

type AnalysisState = 'idle' | 'processing' | 'complete' | 'error';
type FileType = 'image' | 'video' | null;

interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  explanation: string;
  heatmap_url?: string;
  frames?: Array<{
    frameNumber: number;
    timestamp: string;
    verdict: Verdict;
    confidence: number;
    thumbnail: string;
  }>;
  file_id?: string;
}

const Detection = () => {
  const [state, setState] = useState<AnalysisState>('idle');
  const [fileType, setFileType] = useState<FileType>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    const isVideo = file.type.startsWith('video/');
    setFileType(isVideo ? 'video' : 'image');
    setUploadedUrl(URL.createObjectURL(file));
    setUploadedFile(file);
    setState('processing');
    setError(null);
    
    try {
      let analysisResult;
      
      if (isVideo) {
        analysisResult = await apiService.analyzeVideo(file);
      } else {
        analysisResult = await apiService.analyzeImage(file);
      }
      
      if (analysisResult.success) {
        setResult({
          verdict: analysisResult.verdict as Verdict,
          confidence: analysisResult.confidence,
          explanation: analysisResult.explanation,
          heatmap_url: analysisResult.heatmap_url,
          frames: analysisResult.frames,
          file_id: analysisResult.file_id,
        });
        setState('complete');
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze file. Please ensure the backend server is running.');
      setState('error');
    }
  };

  const handleReset = () => {
    // Cleanup backend files if needed
    if (result?.file_id) {
      apiService.cleanup(result.file_id).catch(console.error);
    }
    
    setState('idle');
    setFileType(null);
    setUploadedUrl('');
    setUploadedFile(null);
    setResult(null);
    setError(null);
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

            {state === 'error' && (
              <div className="py-8 space-y-4">
                <div className="flex items-center justify-center gap-3 text-destructive">
                  <AlertCircle className="w-6 h-6" />
                  <p className="text-lg font-medium">Analysis Failed</p>
                </div>
                <p className="text-center text-muted-foreground">{error}</p>
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-accent transition-colors text-sm font-medium text-foreground"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {state === 'complete' && result && (
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
                <ResultCard 
                  verdict={result.verdict}
                  confidence={result.confidence}
                  explanation={result.explanation}
                />

                {/* Explainability */}
                {fileType === 'image' && result.heatmap_url && (
                  <ExplainabilityView
                    originalImage={uploadedUrl}
                    heatmapImage={result.heatmap_url}
                  />
                )}

                {/* Video frame analysis */}
                {fileType === 'video' && result.frames && (
                  <FrameAnalysis
                    frames={result.frames}
                    finalVerdict={result.verdict}
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
