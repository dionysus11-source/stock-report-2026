# app-config Specification

## Purpose
TBD - created by archiving change add-webapp-port-configuration. Update Purpose after archive.
## Requirements
### Requirement: Centralized Web Application Configuration
The system SHALL provide a centralized `config.py` file at the project root to configure ports, hosts, and service addresses for the entire application.

#### Scenario: Unified Startup Configuration
- **WHEN** the system is started via `run_webapp.py`
- **THEN** it MUST read the root `config.py` to determine ports and hosts for both frontend and backend.

#### Scenario: Backend Port Discovery
- **WHEN** the backend port is configured in the root `config.py`
- **THEN** the frontend MUST automatically proxy API requests to that specific port.

#### Scenario: Skill Upload Address Discovery
- **WHEN** a skill (e.g., `stock-report`) needs to upload a report
- **THEN** it MUST use the `UPLOAD_URL` defined in the root `config.py`.

#### Scenario: External Network Access
- **WHEN** `WEB_HOST` is set to `0.0.0.0` in the root `config.py`
- **THEN** all web services MUST be accessible from external network interfaces.

