# Change: Add Stock Report Skill

## Why
Users currently have to run individual skills (`stock-capture`, `stock-fundamental`, `stock-news`, `stock-technical`) separately to get a complete picture of a stock. There is a need for a unified "analyst" skill that takes a natural language request (e.g., "Analyze Samsung Electronics"), orchestrates these underlying skills, and produces a consolidated report suitable for web presentation.

## What Changes
- Add a new skill `stock-report` in `skills/stock-report/`.
- The skill will orchestrate:
    - `stock-capture`: For chart screenshots.
    - `stock-fundamental`: For PBR, PER, ROE, etc.
    - `stock-news`: For recent news.
    - `stock-technical`: For technical indicators.
- It will output a consolidated JSON file designed for frontend rendering.

## Impact
- **New Capability**: `stock-report`
- **Affected Specs**: `stock-report` (new)
- **Dependencies**: Depends on existing `stock-capture`, `stock-fundamental`, `stock-news`, `stock-technical` skills.

## Design Strategy
- **Orchestration Pattern**: The skill will act as a "Conductor". It will not perform direct analysis itself.
- **Hybrid Implementation**:
    - `SKILL.md`: Instructions for the Agent to understand the capability.
    - `scripts/analyze.py`: A robust script to automate the execution of sub-skills and, crucially, **aggregate** their JSON outputs into a single `report.json` for web rendering. This ensures data consistency that purely prompt-based orchestration might miss.
