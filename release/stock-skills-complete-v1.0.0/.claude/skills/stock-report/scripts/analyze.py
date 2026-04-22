import argparse
import json
import os
from datetime import datetime
import glob
import sys

# Add project root to path to import config
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(base_dir)
try:
    import config
except ImportError:
    config = None

# Import HTML generator
try:
    from generate_html import generate_static_html
except ImportError:
    generate_static_html = None
    print("Warning: HTML generator not available. Install Jinja2: pip install jinja2")

# Import stock search
def search_stock_code(keyword):
    """종목명으로 종목코드 검색"""
    try:
        # From skills/stock-report/scripts/analyze.py to skills/stock-search/scripts/search.py
        current_dir = os.path.dirname(os.path.abspath(__file__))
        search_script = os.path.join(current_dir, '..', '..', 'stock-search', 'scripts', 'search.py')
        search_script = os.path.normpath(search_script)

        if not os.path.exists(search_script):
            return None

        import subprocess
        result = subprocess.run(
            [sys.executable, search_script, keyword, '--format', 'json'],
            capture_output=True,
            timeout=30,
            encoding='utf-8',
            errors='replace'
        )

        if result.returncode == 0:
            data = json.loads(result.stdout)
            return data
        return None
    except Exception:
        return None

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
    parser.add_argument('--code', type=str, help='Stock code (use --name for search)')
    parser.add_argument('--name', type=str, help='Stock name to search code (e.g., "삼성전자")')
    parser.add_argument('--date', type=str, help='Analysis date (YYYY-MM-DD). Defaults to today.')
    parser.add_argument('--skip-html', action='store_true', help='Skip HTML generation')
    parser.add_argument('--upload', action='store_true', help='Upload report to server after generation')

    args = parser.parse_args()

    # 종목명 검색 (--name 파라미터)
    stock_code = args.code
    if args.name and not args.code:
        print(f"종목명 '{args.name}'으로 검색 중...")
        search_results = search_stock_code(args.name)

        if search_results and len(search_results) > 0:
            if len(search_results) == 1:
                # 단일 결과
                stock_code = search_results[0]['code']
                name = search_results[0]['name']
                # Handle encoding for Windows
                try:
                    print(f"[OK] 종목코드 찾음: {name} ({stock_code})")
                except UnicodeEncodeError:
                    print(f"[OK] 종목코드 찾음: {stock_code}")
            else:
                # 여러 결과
                print(f"\n[INFO] '{args.name}' 검색 결과가 {len(search_results)}건 있습니다:")
                for i, r in enumerate(search_results, 1):
                    try:
                        print(f"  {i}. {r['code']} - {r['name']} ({r['market']})")
                    except UnicodeEncodeError:
                        print(f"  {i}. {r['code']} - ({r['market']})")

                # 첫번째 결과 사용
                stock_code = search_results[0]['code']
                print(f"\n[INFO] 첫번째 결과 사용: {stock_code}")
        else:
            print(f"[ERROR] '{args.name}'에 대한 검색 결과가 없습니다.")
            print("종목명을 정확히 입력했는지 확인해주세요.")
            return 1

    if not stock_code:
        print("[ERROR] --code 또는 --name 파라미터가 필요합니다.")
        print("사용법:")
        print("  python analyze.py --code 005930")
        print("  python analyze.py --name 삼성전자")
        return 1

    # stock_code is already set (either from args.code or from search results)
    # Don't overwrite it here
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

    # Generate HTML report
    if not args.skip_html and generate_static_html:
        try:
            html_path = generate_static_html(report_dir, stock_code, date_str)
            if html_path:
                print(f"[OK] HTML Report: {html_path}")
        except Exception as e:
            print(f"Warning: HTML generation failed: {e}")

    # Optional upload
    if args.upload:
        try:
            from upload import upload_report
            upload_report(stock_code, date_str)
        except Exception as e:
            print(f"Warning: Upload failed: {e}")

if __name__ == '__main__':
    main()
