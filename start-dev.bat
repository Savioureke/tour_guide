@echo off
REM Start the dev server from repo root (Windows CMD)
cd /d %~dp0react
echo Installing dependencies (if needed)...
npm install
echo Starting Vite dev server...
npm run dev
