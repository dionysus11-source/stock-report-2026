## MODIFIED Requirements

### Requirement: Fundamental Analysis Automation
The system SHALL evaluate the stock based on a predefined checklist using **real-time financial data**.
- Source: Toss Securities (`tossinvest.com`).
- Metrics: PER, PBR, ROE, Debt Ratio, Reserve Ratio, Foreigner Ratio, etc. (as available on Toss).
- Logic: Compare fetched values against checklist thresholds (e.g., PER < Industry Avg).

#### Scenario: Successful Analysis
- **WHEN** a valid stock code `005930` is provided
- **THEN** system converts it to `A005930` (Toss format).
- **AND** launches browser to fetch financial indicators.
- **AND** calculates the number of passed checklist items.
- **AND** generates a JSON report with the safety score.

#### Scenario: Data Unavailability
- **WHEN** specific metrics are unavailable (e.g., N/A for loss-making companies)
- **THEN** the item is considered "unchecked" or logged as insufficient data, without crashing.
