@echo off
echo Starting DeepTrust Backend and Frontend...
echo.

echo [1/2] Starting FastAPI Backend...
start cmd /k "cd backend && python app.py"

timeout /t 5 /nobreak >nul

echo [2/2] Starting React Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo ===============================================
echo DeepTrust is starting up!
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to open the application...
pause >nul

start http://localhost:3000
