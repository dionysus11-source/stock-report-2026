---
name: stock-fundamental
description: Analyzes stock safety based on a fundamental checklist logic.
---

# Stock Fundamental Analysis

This skill calculates a safety score for a given stock based on predefined check items (e.g., market cap, PER, PBR, etc.).

## Usage

```bash
python skills/stock-fundamental/scripts/analyze.py --code 005930
```

- Returns a JSON result with `score_label`, `safety_probability`, and `action_guidance`.
- Currently uses a default checklist simulation. Customize `DEFAULT_CHECKLIST_ITEMS` in `scripts/analyze.py` for real data integration.
