---
name: stock-news
description: Fetches real-time stock news via Google News RSS. Sentiment analysis is performed by an AI Agent.
---

# Stock News

Fetches recent news from **Google News RSS** and saves it as a raw JSON file.
An AI Agent then reviews the file to add sentiment tags.

## Usage

### 1. Fetch News (System)
```bash
python skills/stock-news/scripts/fetch.py --code <stock_code>
```
- Creates: `report/YYYY-MM-DD/<code_raw>_news_raw.json`

### 2. Analyze Sentiment (Agent)
- **Role**: AI Agent (human-in-the-loop)
- **Action**: Read the raw JSON file, analyze titles, and update `sentiment` field.
- **Constraints**: The `sentiment` field MUST be set to one of "Positive", "Negative", or "Neutral". Never leave it as "Unknown".
- **Save As**: `report/YYYY-MM-DD/<code_raw>_report.json` (merged) or update the raw file.

## Output Format
```json
{
    "code": "005930",
    "news": [
        {
            "title": "Samsung Electronics Share Price Soars",
            "link": "...",
            "date": "2026.01.19 15:30",
            "sentiment": "Positive" 
        }
    ]
}
```
