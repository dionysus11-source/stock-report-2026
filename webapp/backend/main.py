from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import json
from pathlib import Path
from typing import List, Dict, Any

app = FastAPI(title="Stock Report Viewer")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base paths - assuming running from root or webapp/backend
# We need to find the project root.
# If this file is in webapp/backend/main.py, root is ../../
BASE_DIR = Path(__file__).resolve().parent.parent.parent
REPORT_DIR = BASE_DIR / "report"

# Mount static files for images
# Access via /images/YYYY-MM-DD/filename.png
# We mount the REPORT_DIR directly to /images/
app.mount("/images", StaticFiles(directory=str(REPORT_DIR)), name="images")

@app.get("/api/dates")
def get_dates() -> List[str]:
    """List all available date directories in report/"""
    if not REPORT_DIR.exists():
        return []
    
    dates = []
    for entry in os.scandir(REPORT_DIR):
        if entry.is_dir() and entry.name != "images": # exclude explicit images dir if any, usually dates look like YYYY-MM-DD
            # Simple validation for date format could be added here
            if entry.name[0].isdigit(): 
                dates.append(entry.name)
    
    return sorted(dates, reverse=True)

@app.get("/api/reports/{date}")
def get_reports_by_date(date: str) -> List[Dict[str, Any]]:
    """List all stock reports for a given date"""
    date_dir = REPORT_DIR / date
    if not date_dir.exists():
        raise HTTPException(status_code=404, detail="Date not found")
    
    reports = []
    for entry in os.scandir(date_dir):
        if entry.is_file() and entry.name.endswith("_report.json"):
            # We can return just summary info or read the file
            # Let's peek into the file to get the stock code and summary
            try:
                with open(entry.path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    # Extract minimal info for list view
                    reports.append({
                        "stock_code": data.get("stock_code"),
                        "summary": data.get("summary", {}),
                        "filename": entry.name
                    })
            except Exception as e:
                print(f"Error reading {entry.name}: {e}")
                continue
    
    return reports

@app.get("/api/reports/{date}/{stock_code}")
def get_report_detail(date: str, stock_code: str) -> Dict[str, Any]:
    """Get full report for a specific stock"""
    date_dir = REPORT_DIR / date
    # Try finding the file
    report_file = date_dir / f"{stock_code}_report.json"
    
    if not report_file.exists():
        # Fallback search if filename pattern differs
        found = False
        for entry in os.scandir(date_dir):
            if entry.name.endswith("_report.json") and stock_code in entry.name:
                report_file = Path(entry.path)
                found = True
                break
        if not found:
            raise HTTPException(status_code=404, detail="Report not found")
            
    try:
        with open(report_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Normalize image paths to use forward slashes
            if "data" in data and "images" in data["data"]:
                data["data"]["images"] = [img.replace("\\", "/") for img in data["data"]["images"]]
            return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading report: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Stock Report Viewer API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
