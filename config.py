# Centralized Configuration for Stock Analyzer 2026

# Network Settings
WEB_HOST = "0.0.0.0"
FRONTEND_PORT = 3002
BACKEND_PORT = 3001

# API Settings
# This is the address where reports are uploaded. 
# Skills will use this to send final analysis results to the web server.
UPLOAD_URL = f"http://n100-mini-pc:{BACKEND_PORT}/api/upload-report"
