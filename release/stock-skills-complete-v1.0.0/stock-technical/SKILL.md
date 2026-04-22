---
name: stock-technical
description: Performs technical analysis (MA, Golden Cross) on stock data.
---

# Stock Technical Analysis

This skill fetches stock data using `finance-datareader` and performs technical analysis.

## Usage

```bash
python skills/stock-technical/scripts/analyze.py --code 005930
```

- Analyzes Daily Chart: Price vs 20MA, Golden Cross (5MA vs 20MA).
- Analyzes Weekly Chart: Price vs 20MA, 20MA slope.

## Dependencies

- `finance-datareader`
- `pandas`
