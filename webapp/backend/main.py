from pathlib import Path
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import datetime
import os
import json

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

@app.post("/api/upload-report")
async def upload_report(
    report_file: UploadFile = File(...),
    image_files: List[UploadFile] = File(None)
):
    """
    Upload a stock report JSON and optional images.
    Saves to report/YYYY-MM-DD/ based on the report's internal date or today's date.
    """
    try:
        # Read the report content to determine the date and stock code
        content = await report_file.read()
        data = json.loads(content)
        
        # Get date from report or use today
        # Typical report structure might have 'date' or we use today
        report_date = data.get("date") or datetime.datetime.now().strftime("%Y-%m-%d")
        stock_code = data.get("stock_code") or "unknown"
        
        # Target directory
        date_dir = REPORT_DIR / report_date
        date_dir.mkdir(parents=True, exist_ok=True)
        
        # Save JSON file
        # Standard filename: {stock_code}_report.json
        filename = f"{stock_code}_report.json"
        target_path = date_dir / filename
        
        with open(target_path, "wb") as f:
            f.write(content)
            
        # Save images if any
        saved_images = []
        if image_files:
            for img in image_files:
                img_path = date_dir / img.filename
                with open(img_path, "wb") as f:
                    shutil.copyfileobj(img.file, f)
                saved_images.append(img.filename)
                
        return {
            "status": "success",
            "message": f"Report for {stock_code} saved to {report_date}",
            "path": str(target_path),
            "images_saved": saved_images
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
