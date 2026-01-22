# Change: Remote Report Upload Support

## Why
Users need to perform stock analysis on remote machines (e.g., using Antigravity skills) and synchronize the resulting reports with a central server's dashboard for consolidated viewing.

## What Changes
- **Backend**: New POST `/api/upload-report` endpoint to receive and store `report.json` and associated images.
- **Backend**: Logic to auto-create date directories if they don't exist.
- **Frontend**: The existing Viewer already reads from the filesystem, so it will automatically show the new reports once saved.

## Impact
- Affected specs: `stock-report-viewer`
- Affected code: `webapp/backend/main.py`
