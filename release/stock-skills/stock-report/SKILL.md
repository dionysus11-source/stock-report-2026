---
name: stock-report
description: Orchestrates stock analysis by running sub-skills (capture, fundamental, news, technical) and generating a consolidated report.
---

# Stock Report Skill

This skill acts as an orchestrator to generate a comprehensive stock analysis report. It does not perform analysis itself but coordinates other skills and creates both JSON and static HTML reports.

## Usage

When a user asks for a stock analysis (e.g., "Analyze Samsung Electronics", "Report for TSLA"), use this skill.

## Steps

1.  **Identify Stock**:
    *   Use `--code` if you know the stock code (e.g., `005930` for Samsung)
    *   Use `--name` to auto-search by company name (e.g., `삼성전자`)
2.  **Run Sub-Skills**: Execute the following skills for the target stock:
    *   `stock-capture`: To get chart screenshots.
    *   `stock-fundamental`: To get financial data (PBR, PER, ROE, etc.).
    *   `stock-news`: To get recent news articles.
    *   `stock-technical`: To get technical indicators (MA, RSI, etc.).
3.  **Aggregate Results & Generate HTML**: Run the `scripts/analyze.py` script. This script will:
    *   Collect outputs from the sub-skills (which should be in `report/YYYY-MM-DD/`).
    *   Generate a `report.json` file in the same report directory.
    *   **Automatically generate a static HTML report** (`{code}_report.html`) that can be opened directly in a browser.
4.  **Optional Upload**: If server upload is needed, use the `--upload` flag:
    ```bash
    python skills/stock-report/scripts/analyze.py --code <STOCK_CODE> --upload
    ```
5.  **Confirm**: Inform the user that the report has been generated. Provide the HTML file path for immediate viewing:
    *   **HTML Report**: `report/<DATE>/<CODE>_report.html` (open directly in browser)
    *   **Web View** (if uploaded): `http://localhost:3002/reports/<DATE>/<CODE>`

## Script Usage

### Aggregate & Generate HTML

```bash
# Using stock code (direct)
python skills/stock-report/scripts/analyze.py --code 005930

# Using company name (auto-search)
python skills/stock-report/scripts/analyze.py --name 삼성전자

# With date
python skills/stock-report/scripts/analyze.py --code 005930 --date 2026-01-20
```

**Options:**
- `--code <CODE>`: Stock code (e.g., 005930)
- `--name <NAME>`: Company name for auto-search (e.g., 삼성전자)
- `--date <YYYY-MM-DD>`: Analysis date (defaults to today)
- `--skip-html`: Skip HTML generation (JSON only)
- `--upload`: Upload to server after generation

**Note**: Either `--code` or `--name` must be provided. If both are provided, `--code` takes precedence.

### Upload Only
```bash
python skills/stock-report/scripts/upload.py --code <STOCK_CODE> [--date <YYYY-MM-DD>]
```

### Generate HTML Only
```bash
python skills/stock-report/scripts/generate_html.py --code <STOCK_CODE> [--date <YYYY-MM-DD>]
```

## Output

-   `report/<DATE>/<CODE>_report.json`: Consolidated report data.
-   `report/<DATE>/<CODE>_report.html`: **Static HTML report** (opens directly in browser).
-   `report/<DATE>/images/*.png`: Chart images (referenced by HTML).
