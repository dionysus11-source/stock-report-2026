---
name: stock-report
description: Aggregates analysis results and serves a web dashboard.
---

# Stock Report

This skill aggregates results from fundamental, technical, capture, and news skills, generating a comprehensive JSON report and serving it via a web dashboard.

## Usage

### 1. Generate Report
Runs all analysis skills for a stock and saves the result to `report/YYYY-MM-DD/`.

```bash
python skills/stock-report/scripts/generate_json.py --code 005930
```

### 2. View Dashboard
Starts a local web server to view the reports.

```bash
python skills/stock-report/scripts/server.py
```

Access at `http://localhost:8000`.
