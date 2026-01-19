# stock-fundamental Specification

## Requirements
### Requirement: Fundamental Analysis Automation
The system SHALL evaluate the stock based on a predefined checklist using **Agent-Driven Research**.
- Source: Search Engine / LLM Knowledge (Agent).
- Mechanism: `analyze.py` generates a prompt with the checklist. Agent executes the research.
- Logic: Agent compares found values against checklist thresholds.

#### Scenario: Agent Analysis
- **WHEN** user requests analysis for `005930`
- **THEN** the Agent reads `SKILL.md`.
- **AND** the Agent performs web search for financial data using **Korean queries** (e.g., "삼성전자 재무제표...").
- **AND** the Agent evaluates the checklist manually.
- **AND** the Agent saves the result to `005930_fundamental.json`.
