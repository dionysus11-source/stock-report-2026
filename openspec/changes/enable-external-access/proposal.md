# Change: Enable External Access and Fix Port Connectivity

## Why
The user wants to access the web application externally via `dionysus11.store:3000`. Additionally, a connectivity issue (`ECONNREFUSED`) was observed between the frontend proxy and backend on port 3001.

## What Changes
- Modify frontend `package.json` to bind the dev server to `0.0.0.0`.
- Update `next.config.mjs` to use `127.0.0.1:3001` for proxying, improving reliability.
- Update `run_webapp.py` to ensure robust startup sequence and better logging.

## Impact
- Affected code: `package.json`, `next.config.mjs`, `run_webapp.py`
- Networking: Frontend exposed on `0.0.0.0:3000`, Backend on `0.0.0.0:3001`.
