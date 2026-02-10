import { useState, useCallback } from 'react';
import { Upload, Image, Video, X } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export const UploadZone = ({ onFileSelect, isProcessing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) return;

    setFileType(isImage ? 'image' : 'video');
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isProcessing) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [isProcessing, processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return;
    
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [isProcessing, processFile]);

  const clearPreview = () => {
    setPreview(null);
    setFileType(null);
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-soft">
          <button
            onClick={clearPreview}
            disabled={isProcessing}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/90 backdrop-blur-sm border border-border hover:bg-secondary transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
          
          {fileType === 'image' ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-contain bg-muted"
            />
          ) : (
            <video 
              src={preview} 
              controls 
              className="w-full h-64 object-contain bg-muted"
            />
          )}
          
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {fileType === 'image' ? (
                <Image className="w-4 h-4" />
              ) : (
                <Video className="w-4 h-4" />
              )}
              <span className="capitalize">{fileType} uploaded</span>
            </div>
          </div>
        </div>
      ) : (
        <label
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center w-full h-64
            rounded-2xl border-2 border-dashed cursor-pointer
            transition-all duration-300 ease-out
            ${isDragging 
              ? 'border-primary bg-accent scale-[1.02]' 
              : 'border-border bg-card hover:border-primary/50 hover:bg-accent/50'
            }
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,video/mp4"
            onChange={handleFileInput}
            disabled={isProcessing}
            className="hidden"
          />
          
          <div className={`
            p-4 rounded-2xl bg-accent mb-4
            transition-transform duration-300
            ${isDragging ? 'scale-110' : ''}
          `}>
            <Upload className="w-8 h-8 text-primary" />
          </div>
          
          <p className="text-lg font-medium text-foreground mb-1">
            Drop your file here
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            or click to browse
          </p>
          <p className="text-xs text-muted-foreground/80 mb-4 max-w-md text-center">
            Upload face crop images or videos for deepfake detection analysis
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Image className="w-3.5 h-3.5" />
              JPG, PNG
            </span>
            <span className="flex items-center gap-1">
              <Video className="w-3.5 h-3.5" />
              MP4
            </span>
          </div>
        </label>
      )}
    </div>
  );
};
