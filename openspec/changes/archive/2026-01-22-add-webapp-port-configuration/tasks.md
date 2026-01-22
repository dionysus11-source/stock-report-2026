## 1. Implementation
- [x] 1.1 Create root `config.py` with WEB_HOST, FRONTEND_PORT, BACKEND_PORT, and UPLOAD_URL
- [x] 1.2 Update `webapp/backend/main.py` to use root config
- [x] 1.3 Update `webapp/frontend/next.config.mjs` to use environment variables for proxy
- [x] 1.4 Update `run_webapp.py` to read root config and orchestrate startup
- [x] 1.5 Update `skills/stock-report/scripts/analyze.py` to use `config.py` for `UPLOAD_URL`

## 2. Verification
- [x] 2.1 Verify both servers start on correct ports and listen on 0.0.0.0
- [x] 2.2 Verify frontend-backend communication
- [x] 2.3 Verify `tests/test_upload.py` works with root config
- [x] 2.4 Verify `stock-report` skill correctly identifies `UPLOAD_URL`
