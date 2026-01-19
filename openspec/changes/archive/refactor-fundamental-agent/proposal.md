# Proposal: Refactor to Agent-Driven Analysis

## Why
The user requested to stop programmatic scraping (which is fragile) and instead rely on the Agent's reasoning capabilities by providing the checklist as a prompt.

## What Changes
Refactor the `stock-fundamental` skill to:
1.  **Stop Scraping**: Remove Puppeteer/Requests scripts entirely.
2.  **Agent Logic**: `SKILL.md` defines the prompt and checklist. The Agent performs research using **Korean Search Queries** for domestic stocks.
3.  **Output**: Agent generates JSON report directly.

## Impact
- `analyze.py`, `fetch_metrics.js` deleted.
- Zero maintenance for scraping scripts (`check_naver.py` etc).
- High adaptability to website changes.
