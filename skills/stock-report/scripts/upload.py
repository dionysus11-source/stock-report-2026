import requests
import json
import os
import sys
import glob
from datetime import datetime

# Add project root to path to import config
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(base_dir)
try:
    import config
except ImportError:
    config = None

def upload_report(stock_code, date_str=None):
    if not date_str:
        date_str = datetime.now().strftime('%Y-%m-%d')
    
    url = config.UPLOAD_URL if config else "http://localhost:3001/api/upload-report"
    report_dir = os.path.join(base_dir, 'report', date_str)
    report_file_path = os.path.join(report_dir, f"{stock_code}_report.json")
    
    if not os.path.exists(report_file_path):
        print(f"Error: Report file not found: {report_file_path}")
        return False

    # Collect images
    images_dir = os.path.join(report_dir, 'images')
    image_files = []
    if os.path.exists(images_dir):
        patterns = [f"{stock_code}*.png", f"A{stock_code}*.png"]
        for pattern in patterns:
            image_files.extend(glob.glob(os.path.join(images_dir, pattern)))
    
    # Prepare files for upload
    files = [
        ('report_file', (f"{stock_code}_report.json", open(report_file_path, 'rb'), 'application/json'))
    ]
    
    # We need to keep tracks of opened files to close them later
    opened_files = [files[0][1][1]]
    
    for img_path in image_files:
        f = open(img_path, 'rb')
        opened_files.append(f)
        files.append(('image_files', (os.path.basename(img_path), f, 'image/png')))
    
    try:
        print(f"Uploading report for {stock_code} to {url}...")
        response = requests.post(url, files=files, timeout=30)
        response.raise_for_status()
        
        print(f"Upload Successful: {response.json().get('message')}")
        return True
    except Exception as e:
        print(f"Error during upload: {e}")
        return False
    finally:
        for f in opened_files:
            f.close()

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Upload stock analysis report to backend.')
    parser.add_argument('--code', type=str, required=True, help='Stock code')
    parser.add_argument('--date', type=str, help='Analysis date (YYYY-MM-DD)')
    
    args = parser.parse_args()
    upload_report(args.code, args.date)
