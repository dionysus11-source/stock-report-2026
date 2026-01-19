import argparse
import json
import os
from datetime import datetime
import glob

def load_json(filepath):
    if not os.path.exists(filepath):
        return None
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Aggregate stock analysis reports.')
    parser.add_argument('--code', type=str, required=True, help='Stock code')
    parser.add_argument('--date', type=str, help='Analysis date (YYYY-MM-DD). Defaults to today.')
    
    args = parser.parse_args()
    
    stock_code = args.code
    date_str = args.date if args.date else datetime.now().strftime('%Y-%m-%d')
    
    # Path to report directory
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    report_dir = os.path.join(base_dir, 'report', date_str)
    
    if not os.path.exists(report_dir):
        print(f"Report directory not found: {report_dir}")
        return

    # 1. Capture Images
    # Images are in 'images' subdirectory and might have 'A' prefix
    images_dir = os.path.join(report_dir, 'images')
    image_files = []
    
    if os.path.exists(images_dir):
        # search for 005930*.png and A005930*.png
        patterns = [f"{stock_code}*.png", f"A{stock_code}*.png"]
        for pattern in patterns:
            found = glob.glob(os.path.join(images_dir, pattern))
            for img_path in found:
                # relative path from report_dir for frontend convenience? 
                # Or just filename if frontend knows about images/ folder.
                # Let's return path relative to report_dir e.g. "images/A005930_chart.png"
                rel_path = os.path.relpath(img_path, report_dir)
                image_files.append(rel_path)
    
    # Remove duplicates if any (though glob shouldn't overlap with these specific patterns unless files duplicate)
    image_files = list(set(image_files))

    # 2. Fundamental Data
    fundamental_file = os.path.join(report_dir, f"{stock_code}_fundamental.json")
    fundamental_data = load_json(fundamental_file)

    # 3. News Data
    # News might be saved as CODE_news.json or CODE_news_raw.json
    news_file = os.path.join(report_dir, f"{stock_code}_news.json")
    if not os.path.exists(news_file):
        news_file = os.path.join(report_dir, f"{stock_code}_news_raw.json")
    news_data = load_json(news_file)

    # 4. Technical Data
    technical_file = os.path.join(report_dir, f"{stock_code}_technical.json")
    technical_data = load_json(technical_file)

    # Aggregate
    report = {
        "stock_code": stock_code,
        "date": date_str,
        "timestamp": datetime.now().isoformat(),
        "summary": {
            "name": fundamental_data.get("name") if fundamental_data else None,
            "has_fundamental": fundamental_data is not None,
            "has_technical": technical_data is not None,
            "has_news": news_data is not None,
            "chart_count": len(image_files)
        },
        "data": {
            "fundamental": fundamental_data,
            "technical": technical_data,
            "news": news_data,
            "images": image_files
        }
    }

    # Save aggregated report
    output_file = os.path.join(report_dir, f"{stock_code}_report.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=4)
    
    print(f"Successfully generated aggregated report: {output_file}")

if __name__ == '__main__':
    main()
