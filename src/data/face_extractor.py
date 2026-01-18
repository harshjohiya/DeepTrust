"""Face extraction from images and videos using MediaPipe - from deepfake1.ipynb."""
import cv2
import numpy as np
import mediapipe as mp
from pathlib import Path
from typing import List, Tuple, Optional


class FaceExtractor:
    """Extract faces from images and videos using MediaPipe."""
    
    def __init__(self, min_detection_confidence: float = 0.5):
        """Initialize face extractor.
        
        Args:
            min_detection_confidence: Minimum confidence for face detection
        """
        # Exact implementation from notebook
        self.mp_face = mp.solutions.face_detection
        self.face_detector = self.mp_face.FaceDetection(
            model_selection=1,
            min_detection_confidence=min_detection_confidence
        )
    
    def extract_face(self, image: np.ndarray) -> Optional[np.ndarray]:
        """Extract face from a single image - exact logic from notebook.
        
        Args:
            image: Input image as numpy array (BGR format)
            
        Returns:
            Cropped and resized face (224x224) or None if no face detected
        """
        # Exact implementation from notebook
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = self.face_detector.process(rgb)
        
        if not results.detections:
            return None
        
        h, w, _ = image.shape
        bbox = results.detections[0].location_data.relative_bounding_box
        
        x1 = int(bbox.xmin * w)
        y1 = int(bbox.ymin * h)
        x2 = int((bbox.xmin + bbox.width) * w)
        y2 = int((bbox.ymin + bbox.height) * h)
        
        x1, y1 = max(0, x1), max(0, y1)
        x2, y2 = min(w, x2), min(h, y2)
        
        face = image[y1:y2, x1:x2]
        if face.size == 0:
            return None
        
        # Resize to 224x224 as in notebook
        return cv2.resize(face, (224, 224))
    
    def sample_frames(self, video_path: str, num_frames: int = 5) -> List[np.ndarray]:
        """Sample frames uniformly from video - exact logic from notebook.
        
        Args:
            video_path: Path to input video file
            num_frames: Number of frames to sample
            
        Returns:
            List of sampled frames
        """
        cap = cv2.VideoCapture(video_path)
        total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        frame_ids = np.linspace(0, total - 1, num_frames, dtype=int) if total > num_frames else range(total)
        frames = []
        
        for fid in frame_ids:
            cap.set(cv2.CAP_PROP_POS_FRAMES, fid)
            ret, frame = cap.read()
            if ret:
                frames.append(frame)
        
        cap.release()
        return frames
    
    def extract_faces_from_video(
        self, 
        video_path: str,
        num_frames: int = 5
    ) -> List[np.ndarray]:
        """Extract faces from video - exact logic from notebook.
        
        Args:
            video_path: Path to input video file
            num_frames: Number of frames to sample
            
        Returns:
            List of extracted face images (224x224)
        """
        frames = self.sample_frames(video_path, num_frames)
        faces = []
        
        for frame in frames:
            face = self.extract_face(frame)
            if face is not None:
                faces.append(face)
        
        return faces
    
    def __del__(self):
        """Cleanup MediaPipe resources."""
        self.face_detector.close()
