# Change: Configure Backend Port

## Why
The user requested the backend port to be changed to 3001 for better environment consistency or preference.

## What Changes
- Change backend port from 8000 to 3001.
- Update frontend rewrites to match the new backend port.
- Normalize backend image paths to consistently use forward slashes.

## Impact
- Affected specs: `app-config` (Update port), `documentation` (Update README)
- Affected code: `main.py`, `next.config.mjs`, `README.md`
