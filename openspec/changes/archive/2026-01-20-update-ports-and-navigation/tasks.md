## 1. Configuration
- [ ] 1.1 Modify `webapp/backend/main.py`: Set `port=3001` and normalize image paths
- [ ] 1.2 Modify `webapp/frontend/next.config.mjs`: Update port `8000` -> `3001`
- [ ] 1.3 Modify `README.md`: Update backend port reference

## 2. Verification
- [ ] 2.1 Run `openspec validate update-ports-and-navigation --strict`
- [ ] 2.2 Verify application accessibility at http://localhost:3000 and http://localhost:3001/api
