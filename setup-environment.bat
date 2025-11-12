@echo off
echo ========================================
echo Orthodox Church Document Search
echo Environment Setup Script
echo ========================================
echo.

:: Check if environment.ts exists
if exist "src\environments\environment.ts" (
    echo [SKIP] environment.ts already exists
) else (
    echo [COPY] Creating environment.ts from template...
    copy "src\environments\environment.template.ts" "src\environments\environment.ts"
    echo [INFO] Please edit src\environments\environment.ts with your API keys
)

echo.

:: Check if environment.prod.ts exists
if exist "src\environments\environment.prod.ts" (
    echo [SKIP] environment.prod.ts already exists
) else (
    echo [COPY] Creating environment.prod.ts from template...
    copy "src\environments\environment.prod.template.ts" "src\environments\environment.prod.ts"
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit src\environments\environment.ts
echo 2. Add your API keys (or use Ollama - no keys needed)
echo 3. Run: npm install
echo 4. Run: npm start
echo.
pause
