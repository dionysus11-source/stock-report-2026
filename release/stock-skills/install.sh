#!/bin/bash
# Stock Analysis Skills Installation Script

echo "Installing Stock Analysis Skills (Complete Set)..."

# Create skills directory if not exists
mkdir -p skills

# Copy all skills
echo "Copying skills..."
cp -r stock-search skills/
cp -r stock-capture skills/
cp -r stock-fundamental skills/
cp -r stock-news skills/
cp -r stock-technical skills/
cp -r stock-report skills/

# Install Python dependencies
echo "Installing Python dependencies..."
pip install requests beautifulsoup4 jinja2 finance-datareader pandas

# Check Node.js (optional, for stock-capture)
if command -v node &> /dev/null; then
    echo "Installing Node.js dependencies (for stock-capture)..."
    npm install puppeteer 2>/dev/null || echo "Warning: npm install failed. Install manually if needed."
else
    echo "Note: Node.js not found. stock-capture requires Node.js + Puppeteer."
fi

echo ""
echo "Installation complete!"
echo ""
echo "Quick Start:"
echo "  1. Search stock code:"
echo "     python skills/stock-search/scripts/search.py 삼성전자"
echo ""
echo "  2. Run full analysis:"
echo "     node skills/stock-capture/scripts/capture.js 005930"
echo "     python skills/stock-news/scripts/fetch.py --code 005930"
echo "     python skills/stock-technical/scripts/analyze.py --code 005930"
echo "     # Create fundamental.json manually or use Agent"
echo "     python skills/stock-report/scripts/analyze.py --code 005930"
echo ""
echo "See README.md for details."
