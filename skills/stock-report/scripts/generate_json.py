import argparse
import json
import subprocess
import sys
import os
from datetime import datetime

def run_skill(script_path, code):
    """
    Runs a skill script via subprocess and returns its stdout as JSON.
    """
    cmd = [sys.executable, script_path, "--code", code]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8')
        if not result.stdout:
            print(f"Warning: {script_path} returned empty output")
            return {}
        # print(f"DEBUG: {script_path} output: {result.stdout.strip()}") 
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error running {script_path}: {e.stderr}")
        return {"error": e.stderr}
    except json.JSONDecodeError:
        print(f"Failed to decode JSON from {script_path}")
        return {"error": "Invalid JSON output"}

def main():
    parser = argparse.ArgumentParser(description="Stock Report Generator")
    parser.add_argument("--code", required=True, help="Stock symbol code")
    args = parser.parse_args()
    
    code = args.code
    print(f"Generating report for {code}...")

    # Paths to other skills (relative to project root)
    base_dir = os.getcwd()
    skills_dir = os.path.join(base_dir, "skills")
    
    # 1. Fundamental
    print("Running Fundamental Analysis...")
    fund_res = run_skill(os.path.join(skills_dir, "stock-fundamental", "scripts", "analyze.py"), code)
    
    # 2. Technical
    print("Running Technical Analysis...")
    tech_res = run_skill(os.path.join(skills_dir, "stock-technical", "scripts", "analyze.py"), code)
    
    # 3. Capture (Node.js)
    print("Capturing Chart...")
    # Node script for capture
    capture_script = os.path.join(skills_dir, "stock-capture", "scripts", "capture.js")
    try:
        # Check if node is available
        subprocess.run(["node", "--version"], check=True, capture_output=True)
        # Assuming args[0] is code (corrected logic in capture.js to take args)
        cap_cmd = ["node", capture_script, code]
        cap_proc = subprocess.run(cap_cmd, capture_output=True, text=True, encoding='utf-8')
        print(cap_proc.stdout) # capture.js logs success json
    except Exception as e:
        print(f"Capture failed: {e}")

    # 4. News
    print("Fetching News...")
    news_res = run_skill(os.path.join(skills_dir, "stock-news", "scripts", "fetch.py"), code)

    # Compile Final Report
    report = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "code": code,
        "fundamental": fund_res,
        "technical": tech_res,
        "news": news_res.get("news", [])
    }
    
    # Save JSON
    date_str = datetime.now().strftime("%Y-%m-%d")
    report_dir = os.path.join(base_dir, "report", date_str)
    os.makedirs(report_dir, exist_ok=True)
    
    report_path = os.path.join(report_dir, f"{code}_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=4, ensure_ascii=False)
        
    print(f"Report generated at: {report_path}")

if __name__ == "__main__":
    main()
