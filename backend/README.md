---
title: DeepTrust Backend
emoji: 🔍
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
pinned: false
---

# DeepTrust - Deepfake Detection API

Deepfake Detection API with Explainability using EfficientNet and Grad-CAM.

## Features
- Image analysis for deepfake detection
- Video analysis support
- Grad-CAM heatmap visualization
- RESTful API built with FastAPI

## Endpoints
- GET / - API status
- GET /health - Health check
- POST /api/analyze/image - Analyze image for deepfakes
- POST /api/analyze/video - Analyze video for deepfakes