## 1. Networking Config
- [ ] 1.1 Modify `webapp/frontend/package.json`: Update `dev` script to `next dev -H 0.0.0.0`
- [ ] 1.2 Modify `webapp/frontend/next.config.mjs`: Use `127.0.0.1` in rewrites
- [ ] 1.3 Modify `run_webapp.py`: Add startup delay and logging

## 2. Verification
- [ ] 2.1 Run `python run_webapp.py`
- [ ] 2.2 Verify local accessibility at http://localhost:3000
- [ ] 2.3 Verify API connectivity at http://localhost:3000/api/dates
