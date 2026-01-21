import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# Model configuration
MODEL_PATH = BASE_DIR / "models" / "best_efficientnet_b0.pth"
MODEL_NAME = "efficientnet_b0"
NUM_CLASSES = 2

# Upload configuration
UPLOAD_DIR = BASE_DIR / "uploads"
TEMP_DIR = BASE_DIR / "temp"
RESULTS_DIR = BASE_DIR / "results"

# Create directories
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

# Image processing
IMAGE_SIZE = (224, 224)
MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]

# Video processing
MAX_FRAMES = 6
VIDEO_SAMPLE_FRAMES = 5

# Class names
CLASS_NAMES = {0: "fake", 1: "real"}

# CORS settings
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8080",
]
