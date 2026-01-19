---
name: stock-capture
description: Robustly captures stock charts from Toss Securities using Puppeteer.
---

# Stock Chart Capture

This skill navigates to Toss Securities and captures the chart image for a given stock.
It includes error handling for timeouts and network issues.

## Usage

```bash
node skills/stock-capture/scripts/capture.js <stock_code>
```

Example: `node skills/stock-capture/scripts/capture.js 005930`

- **Input**: Stock code (e.g., `005930` or `A005930`)
- **Output**: JSON string to stdout with `status` and `image_path` (on success) or `message` (on error).
- **Files**: Images are saved to `report/YYYY-MM-DD/images/<code_chart>.png`.

## Installation

```bash
npm install puppeteer
```

## Troubleshooting
- If capture fails or times out, check your internet connection.
- Ensure `npm install` completed successfully.
