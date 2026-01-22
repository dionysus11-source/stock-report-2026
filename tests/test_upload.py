import requests
import json
import os

def test_upload():
    # URL of the backend
    url = "http://localhost:3001/api/upload-report"
    
    # Create a dummy report
    report_data = {
        "stock_code": "TEST001",
        "date": "2026-01-22",
        "summary": {
            "title": "Test Report",
            "overall_sentiment": "Neutral"
        },
        "data": {
            "images": ["test_chart.png"]
        }
    }
    
    # Save dummy report to a file
    with open("test_report.json", "w", encoding="utf-8") as f:
        json.dump(report_data, f)
        
    # Create a dummy image
    with open("test_chart.png", "wb") as f:
        f.write(b"dummy image data")
        
    # Prepare the request
    files = [
        ('report_file', ('test_report.json', open('test_report.json', 'rb'), 'application/json')),
        ('image_files', ('test_chart.png', open('test_chart.png', 'rb'), 'image/png'))
    ]
    
    try:
        print(f"Uploading to {url}...")
        response = requests.post(url, files=files)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("Upload Successful!")
        else:
            print("Upload Failed.")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Clean up local test files
        # os.remove("test_report.json")
        # os.remove("test_chart.png")
        pass

if __name__ == "__main__":
    test_upload()
