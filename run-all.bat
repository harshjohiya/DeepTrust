@echo off
echo ========================================
echo Starting DeepTrust Application
echo ========================================
echo.

echo Starting Backend Server...
start "DeepTrust Backend" cmd /k "cd backend && call venv\Scripts\activate && python app.py"

timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "DeepTrust Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to stop all servers...
pause >nul

taskkill /FI "WINDOWTITLE eq DeepTrust Backend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq DeepTrust Frontend*" /F >nul 2>&1
echo Servers stopped.
