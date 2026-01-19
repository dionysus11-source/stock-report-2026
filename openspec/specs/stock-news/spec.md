# stock-news Specification

## Purpose
TBD - created by archiving change implement-stock-news. Update Purpose after archive.
## Requirements
### Requirement: Real-time News Fetching
The system SHALL fetch real-time news headlines for a specific stock code from a major financial news portal (e.g., Naver Finance).
- Limit: Recent 5-10 items.
- Fields: Title, Link, Date.
- Output: Save to `{code}_news_raw.json` in the report directory.

#### Scenario: Fetch by Company Name
- **WHEN** a stock code `005930` is provided
- **THEN** the system resolves the company name "삼성전자" and searches for news using the name.

### Requirement: Agent-Assisted Sentiment Analysis
The system relying on the AI Agent SHALL update the raw news file with sentiment tags.
- Input: `{code}_news_raw.json` (containing only title/link/date)
- Process: Agent reads the file, judges sentiment (Positive/Negative/Neutral) based on titles.
- Output: Update the file (or save as `{code}_news_analyzed.json`) adding `sentiment` field.

#### Scenario: Workflow
- **WHEN** `fetch.py` completes
- **THEN** a raw JSON file is created.
- **WHEN** the Agent is asked to analyze
- **THEN** the Agent reads the JSON, adds sentiment tags, and saves the file.

