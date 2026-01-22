# Change: add-webapp-port-configuration

## Why
The current web application (Frontend/Backend) has hardcoded port and host settings. To improve flexibility, enable external access (via 0.0.0.0), and allow automated tools (Skills) to discover the service addresses, we need a standardized configuration mechanism.

## What Changes
- [NEW] `config.py`: Centralized configuration file at the project root for WEB_HOST, FRONTEND_PORT, BACKEND_PORT, and UPLOAD_URL.
- [MODIFY] `webapp/backend/main.py`: Uses root `config.py` for server startup.
- [MODIFY] `webapp/frontend/next.config.mjs`: Uses environment variables (set via `run_webapp.py`) for API proxying.
- [MODIFY] `run_webapp.py`: Orchestrates startup by reading the root configuration file.
- [MODIFY] `skills/stock-report/scripts/analyze.py`: Integration points for using `UPLOAD_URL` from the central config.

## Impact
- Affected specs: `app-config` (new capability)
- Affected code: `webapp/backend/main.py`, `webapp/frontend/next.config.mjs`, `run_webapp.py`
