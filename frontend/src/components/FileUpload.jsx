import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Image, Video, X } from 'lucide-react';

const FileUpload = ({ onFileSelect, file, analysisType, onAnalyze, disabled }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
      
      // Create preview for images
      if (analysisType === 'image' && selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(selectedFile);
      } else if (analysisType === 'video') {
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  }, [onFileSelect, analysisType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: analysisType === 'image' 
      ? { 'image/*': ['.jpg', '.jpeg', '.png'] }
      : { 'video/*': ['.mp4', '.avi', '.mov'] },
    multiple: false,
    disabled,
  });

  const handleClear = () => {
    onFileSelect(null);
    setPreview(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        {!file ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : disabled
                ? 'border-gray-300 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 cursor-not-allowed opacity-50'
                : 'border-gray-300 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-dark-800'
            }`}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {analysisType === 'image' ? (
                <Image className="w-16 h-16 mx-auto mb-4 text-primary-500" />
              ) : (
                <Video className="w-16 h-16 mx-auto mb-4 text-primary-500" />
              )}
            </motion.div>
            
            {disabled ? (
              <div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  API Offline
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please start the backend server first
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {isDragActive ? (
                    'Drop it here!'
                  ) : (
                    <>
                      Drop your {analysisType} here or{' '}
                      <span className="text-primary-600 dark:text-primary-400">browse</span>
                    </>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {analysisType === 'image'
                    ? 'Supports: JPG, PNG'
                    : 'Supports: MP4, AVI, MOV'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Preview */}
            <div className="relative mb-6">
              {analysisType === 'image' ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              ) : (
                <video
                  src={preview}
                  controls
                  className="w-full max-h-96 rounded-lg"
                />
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* File Info */}
            <div className="mb-6 p-4 bg-gray-100 dark:bg-dark-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">File:</span> {file.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Size:</span>{' '}
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            {/* Analyze Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAnalyze}
              className="w-full btn btn-primary flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Analyze {analysisType === 'image' ? 'Image' : 'Video'}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FileUpload;
