@echo off
REM Stock Analysis Skills Installation Script for Windows

echo Installing Stock Analysis Skills (Complete Set)...

REM Create skills directory if not exists
if not exist skills mkdir skills

REM Copy all skills
echo Copying skills...
xcopy /E /I /Y stock-search skills\stock-search
xcopy /E /I /Y stock-capture skills\stock-capture
xcopy /E /I /Y stock-fundamental skills\stock-fundamental
xcopy /E /I /Y stock-news skills\stock-news
xcopy /E /I /Y stock-technical skills\stock-technical
xcopy /E /I /Y stock-report skills\stock-report

REM Install Python dependencies
echo Installing Python dependencies...
pip install requests beautifulsoup4 jinja2 finance-datareader pandas

REM Check Node.js (optional, for stock-capture)
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Installing Node.js dependencies ^(for stock-capture^)...
    call npm install puppeteer
) else (
    echo Note: Node.js not found. stock-capture requires Node.js + Puppeteer.
)

echo.
echo Installation complete!
echo.
echo Quick Start:
echo   1. Search stock code:
echo      python skills\stock-search\scripts\search.py 삼성전자
echo.
echo   2. Run full analysis:
echo      node skills\stock-capture\scripts\capture.js 005930
echo      python skills\stock-news\scripts\fetch.py --code 005930
echo      python skills\stock-technical\scripts\analyze.py --code 005930
echo      REM Create fundamental.json manually or use Agent
echo      python skills\stock-report\scripts\analyze.py --code 005930
echo.
echo See README.md for details.
echo.
pause
