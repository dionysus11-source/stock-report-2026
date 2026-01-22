---
name: stock-report
description: Orchestrates stock analysis by running sub-skills (capture, fundamental, news, technical) and generating a consolidated report.
---

# Stock Report Skill

This skill acts as an orchestrator to generate a comprehensive stock analysis report. It does not perform analysis itself but coordinates other skills.

## Usage

When a user asks for a stock analysis (e.g., "Analyze Samsung Electronics", "Report for TSLA"), use this skill.

## Steps

1.  **Identify Stock Code**: Determine the stock ticker/code from the user's request.
2.  **Run Sub-Skills**: Execute the following skills for the target stock:
    *   `stock-capture`: To get chart screenshots.
    *   `stock-fundamental`: To get financial data (PBR, PER, ROE, etc.).
    *   `stock-news`: To get recent news articles.
    *   `stock-technical`: To get technical indicators (MA, RSI, etc.).
3.  **Aggregate Results**: Run the `scripts/analyze.py` script. This script will:
    *   Collect outputs from the sub-skills (which should be in `report/YYYY-MM-DD/`).
    *   Generate a `report.json` file in the same report directory.
4.  **Upload Results**: Run the `scripts/upload.py` script to synchronize the report with the backend server.
    ```bash
    python skills/stock-report/scripts/upload.py --code <STOCK_CODE> [--date <YYYY-MM-DD>]
    ```
5.  **Confirm**: Inform the user that the report has been generated and uploaded. Provide the web view link:
    `http://localhost:3002/reports/<DATE>/<CODE>`

## Script Usage

### Aggregate
```bash
python skills/stock-report/scripts/analyze.py --code <STOCK_CODE> [--date <YYYY-MM-DD>]
```

### Upload
```bash
python skills/stock-report/scripts/upload.py --code <STOCK_CODE> [--date <YYYY-MM-DD>]
```

## Output

-   `report/<DATE>/<CODE>_report.json`: Consolidated report data.
