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
    *   This JSON file is the final output for the web interface.
4.  **Confirm**: Inform the user that the report has been generated and provide the path to the `report.json` or the web view link.

## Script Usage

```bash
python skills/stock-report/scripts/analyze.py --code <STOCK_CODE> [--date <YYYY-MM-DD>]
```

## Output

-   `report/<DATE>/<CODE>_report.json`: Consolidated report data.
