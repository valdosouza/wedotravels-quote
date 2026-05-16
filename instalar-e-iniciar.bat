@echo off
chcp 65001 > nul
echo.
echo ╔══════════════════════════════════════════════════╗
echo ║     WeDo Travels - Quote System Setup           ║
echo ╚══════════════════════════════════════════════════╝
echo.

:: Check Node.js
node --version > nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js não encontrado!
    echo Por favor instale em: https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
echo.
echo [1/3] Instalando dependências...
call npm install
if errorlevel 1 (
    echo [ERRO] Falha ao instalar dependências
    pause
    exit /b 1
)

echo.
echo [2/3] Iniciando servidor de desenvolvimento...
echo.
echo ══════════════════════════════════════════════════
echo  Acesse: http://localhost:3000
echo  Para parar: pressione Ctrl+C
echo ══════════════════════════════════════════════════
echo.

call npm run dev
pause
