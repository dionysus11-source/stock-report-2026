#!/usr/bin/env python3
"""
Static HTML Report Generator for Stock Analysis

Generates a standalone HTML report from JSON analysis data.
"""

import os
import sys
import json
from datetime import datetime
from pathlib import Path

# Try to import Jinja2, install if not available
try:
    from jinja2 import Environment, FileSystemLoader, select_autoescape
except ImportError:
    print("Installing Jinja2...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "jinja2"])
    from jinja2 import Environment, FileSystemLoader, select_autoescape


def load_json_data(report_dir, stock_code):
    """Load all JSON data for the stock report."""
    report_file = os.path.join(report_dir, f"{stock_code}_report.json")

    if not os.path.exists(report_file):
        raise FileNotFoundError(f"Report file not found: {report_file}")

    with open(report_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    return data


def generate_static_html(report_dir, stock_code, date_str=None):
    """
    Generate static HTML report from JSON data.

    Args:
        report_dir: Path to the report directory (e.g., 'report/2026-01-22')
        stock_code: Stock code (e.g., '005930')
        date_str: Date string (YYYY-MM-DD). If None, uses today.

    Returns:
        Path to the generated HTML file.
    """
    if date_str is None:
        date_str = datetime.now().strftime('%Y-%m-%d')

    print(f"Generating HTML report for {stock_code} on {date_str}...")

    # Load JSON data
    try:
        report_data = load_json_data(report_dir, stock_code)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return None

    # Extract data for template
    fundamental = report_data.get('data', {}).get('fundamental')
    technical = report_data.get('data', {}).get('technical')
    news = report_data.get('data', {}).get('news')
    images = report_data.get('data', {}).get('images', [])

    # Get stock name from summary or fundamental
    stock_name = (report_data.get('summary', {}).get('name') or
                  (fundamental.get('name') if fundamental else None) or
                  stock_code)

    # Convert Windows backslashes to forward slashes for web compatibility
    images = [img.replace('\\', '/') for img in images]

    # Setup Jinja2 environment
    templates_dir = os.path.join(os.path.dirname(__file__), 'templates')

    if not os.path.exists(templates_dir):
        raise FileNotFoundError(f"Templates directory not found: {templates_dir}")

    env = Environment(
        loader=FileSystemLoader(templates_dir),
        autoescape=select_autoescape(['html', 'xml']),
        trim_blocks=True,
        lstrip_blocks=True
    )

    # Load and render template
    try:
        template = env.get_template('report.html')
    except Exception as e:
        print(f"Error loading template: {e}")
        return None

    html_content = template.render(
        code=stock_code,
        name=stock_name,
        date=date_str,
        fundamental=fundamental,
        technical=technical,
        news=news,
        images=images
    )

    # Save HTML file
    output_file = os.path.join(report_dir, f"{stock_code}_report.html")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"[OK] HTML Report generated: {output_file}")
    return output_file


def main():
    """CLI entry point."""
    import argparse

    parser = argparse.ArgumentParser(
        description='Generate static HTML report from stock analysis JSON.'
    )
    parser.add_argument(
        '--code',
        type=str,
        required=True,
        help='Stock code (e.g., 005930)'
    )
    parser.add_argument(
        '--date',
        type=str,
        help='Analysis date (YYYY-MM-DD). Defaults to today.'
    )
    parser.add_argument(
        '--report-dir',
        type=str,
        help='Path to report directory. Defaults to report/<date>/'
    )

    args = parser.parse_args()

    # Determine date
    date_str = args.date if args.date else datetime.now().strftime('%Y-%m-%d')

    # Determine report directory
    if args.report_dir:
        report_dir = args.report_dir
    else:
        # Get project root
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
        report_dir = os.path.join(base_dir, 'report', date_str)

    # Generate HTML
    try:
        html_path = generate_static_html(report_dir, args.code, date_str)
        if html_path:
            print(f"\n[SUCCESS] Report ready!")
            print(f"   File: {html_path}")
            print(f"   Open in browser: file://{os.path.abspath(html_path)}")
            return 0
        else:
            print("[ERROR] Failed to generate HTML report")
            return 1
    except Exception as e:
        print(f"[ERROR] {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == '__main__':
    sys.exit(main())
