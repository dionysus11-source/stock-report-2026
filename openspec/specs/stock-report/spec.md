# stock-report Specification

## Purpose
TBD - created by archiving change add-stock-report-skill. Update Purpose after archive.
## Requirements
### Requirement: Stock Report Orchestration
The system SHALL provide a `stock-report` skill that accepts a natural language request for a specific stock, executes necessary sub-skills, and generates a web-ready JSON report.

#### Scenario: User requests full analysis
- **WHEN** the user requests "Samsung Electronics Analysis" (or similar)
- **THEN** the system identifies the stock code (e.g., 005930)
- **AND** executes `stock-capture` to get charts
- **AND** executes `stock-fundamental` to get financial metrics
- **AND** executes `stock-news` to get relevant news
- **AND** executes `stock-technical` to get technical indicators
- **AND** generates a final `report.json` containing references to all artifacts and summarized data.

