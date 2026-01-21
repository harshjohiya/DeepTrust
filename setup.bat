@echo off
echo ========================================
echo DeepTrust - Deepfake Detection System
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Installing Backend Dependencies...
cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
cd ..

echo.
echo [2/4] Installing Frontend Dependencies...
call npm install

echo.
echo [3/4] Checking Model File...
if not exist "backend\models\best_efficientnet_b0.pth" (
    echo [WARNING] Model file not found!
    echo Please place your trained model at: backend\models\best_efficientnet_b0.pth
    echo.
)

echo.
echo [4/4] Setup Complete!
echo.
echo ========================================
echo To run the application:
echo ========================================
echo 1. Start Backend:  run-backend.bat
echo 2. Start Frontend: run-frontend.bat
echo.
echo Or use: run-all.bat to start both
echo ========================================
echo.
pause
