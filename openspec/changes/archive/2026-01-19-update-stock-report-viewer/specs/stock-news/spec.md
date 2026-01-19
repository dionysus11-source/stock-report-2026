## MODIFIED Requirements
### Requirement: Agent-Assisted Sentiment Analysis
The system relying on the AI Agent SHALL update the raw news file with valid sentiment tags.
- Input: `{code}_news_raw.json` (containing only title/link/date)
- Process: Agent reads the file, judges sentiment (Positive/Negative/Neutral) based on titles.
- Output: Update the file (or save as `{code}_news_analyzed.json`) adding `sentiment` field.

#### Scenario: Workflow
- **WHEN** `fetch.py` completes
- **THEN** a raw JSON file is created with sentiment initialized as "Unknown".
- **WHEN** the Agent is asked to analyze
- **THEN** the Agent reads the JSON and MUST update the `sentiment` field for each item to one of: "Positive", "Negative", "Neutral".
- **AND** saves the updated file.
