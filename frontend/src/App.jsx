import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ImageAnalysis from './components/ImageAnalysis';
import VideoAnalysis from './components/VideoAnalysis';
import LoadingAnimation from './components/LoadingAnimation';
import About from './components/About';
import { apiService } from './services/api';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [analysisType, setAnalysisType] = useState('image'); // 'image' or 'video'
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  // Check API health on mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await apiService.healthCheck();
      setApiStatus('healthy');
    } catch (err) {
      setApiStatus('offline');
      console.error('API health check failed:', err);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      let data;
      if (analysisType === 'image') {
        data = await apiService.predictImage(file, true);
      } else {
        data = await apiService.predictVideo(file, 5);
      }
      
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze file. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 transition-colors duration-300">
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          apiStatus={apiStatus}
        />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Mode Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setAnalysisType('image');
                  handleReset();
                }}
                className={`btn ${
                  analysisType === 'image' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                📷 Image Analysis
              </button>
              <button
                onClick={() => {
                  setAnalysisType('video');
                  handleReset();
                }}
                className={`btn ${
                  analysisType === 'video' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                🎥 Video Analysis
              </button>
            </div>
          </motion.div>

          {/* File Upload */}
          <AnimatePresence mode="wait">
            {!result && !isAnalyzing && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FileUpload
                  onFileSelect={handleFileSelect}
                  file={file}
                  analysisType={analysisType}
                  onAnalyze={handleAnalyze}
                  disabled={apiStatus !== 'healthy'}
                />
              </motion.div>
            )}

            {/* Loading Animation */}
            {isAnalyzing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingAnimation analysisType={analysisType} />
              </motion.div>
            )}

            {/* Results */}
            {result && !isAnalyzing && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {analysisType === 'image' ? (
                  <ImageAnalysis result={result} file={file} onReset={handleReset} />
                ) : (
                  <VideoAnalysis result={result} file={file} onReset={handleReset} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6"
              >
                <div className="card p-6 border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">
                        Analysis Failed
                      </h3>
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                      <button
                        onClick={handleReset}
                        className="mt-4 btn btn-secondary text-sm"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* About Section */}
          {!file && !result && !isAnalyzing && <About />}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
          <p>DeepTrust © 2026 - AI-Powered Deepfake Detection</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
