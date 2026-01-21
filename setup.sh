#!/bin/bash
# Setup script for Linux/Mac

echo "========================================"
echo "DeepTrust - Deepfake Detection System"
echo "========================================"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Installing Backend Dependencies..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
cd ..

echo ""
echo "[2/4] Installing Frontend Dependencies..."
npm install

echo ""
echo "[3/4] Checking Model File..."
if [ ! -f "backend/models/best_efficientnet_b0.pth" ]; then
    echo "[WARNING] Model file not found!"
    echo "Please place your trained model at: backend/models/best_efficientnet_b0.pth"
    echo ""
fi

echo ""
echo "[4/4] Setup Complete!"
echo ""
echo "========================================"
echo "To run the application:"
echo "========================================"
echo "1. Start Backend:  cd backend && source venv/bin/activate && python app.py"
echo "2. Start Frontend: npm run dev"
echo "========================================"
echo ""
