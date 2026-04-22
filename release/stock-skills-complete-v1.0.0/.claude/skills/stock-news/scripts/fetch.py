import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
import json
import argparse
import os
import sys
from datetime import datetime

def get_company_name(code):
    try:
        url = f"https://finance.naver.com/item/main.naver?code={code}"
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        # Handle encoding properly
        if response.encoding == 'ISO-8859-1':
            response.encoding = response.apparent_encoding
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for the company name in the wrap_company div
        h2 = soup.select_one('.wrap_company h2 a')
        if h2:
            return h2.get_text(strip=True)
            
        return code # Fallback
    except Exception as e:
        print(f"Warning: Could not fetch company name for {code}: {e}", file=sys.stderr)
        return code

def fetch_google_news_rss(code):
    # Get Company Name first
    query = get_company_name(code)
    print(f"DEBUG: Searching news for: {query}", file=sys.stderr)
    
    # Google News RSS Search URL
    url = f"https://news.google.com/rss/search?q={query}&hl=ko&gl=KR&ceid=KR:ko"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        root = ET.fromstring(response.content)
        
        news_list = []
        
        # Items are under channel/item
        items = root.findall('./channel/item')
        
        for item in items:
            title = item.find('title').text
            link = item.find('link').text
            pub_date = item.find('pubDate').text # RFC 822 format usually
            
            # Simple date formatting attempt, or just keep raw
            try:
                # Example: "Mon, 19 Jan 2026 06:30:00 GMT"
                dt = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %Z")
                date_str = dt.strftime("%Y.%m.%d %H:%M")
            except:
                date_str = pub_date

            news_list.append({
                "title": title,
                "link": link,
                "date": date_str,
                "sentiment": "Unknown" 
            })
            
            if len(news_list) >= 5: 
                break
                
        return news_list

    except Exception as e:
        print(f"Error fetching RSS: {e}", file=sys.stderr)
        return []

def main():
    parser = argparse.ArgumentParser(description="Fetch Stock News (Raw)")
    parser.add_argument("--code", required=True, help="Stock code")
    args = parser.parse_args()
    
    # Ensure code is suitable for search. 
    # Google News might work better with "005930" or "005930.KS" or "삼성전자".
    # But let's try strict code first as per requirement.
    news_data = fetch_google_news_rss(args.code)
    
    # Output structure
    result = {
        "code": args.code,
        "news": news_data,
        "fetched_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    # Save to Report Directory
    date_str = datetime.now().strftime("%Y-%m-%d")
    report_dir = os.path.join("report", date_str)
    os.makedirs(report_dir, exist_ok=True)
    
    # Save Raw JSON
    raw_path = os.path.join(report_dir, f"{args.code}_news_raw.json")
    with open(raw_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=4, ensure_ascii=False)
        
    print(json.dumps(result, ensure_ascii=False, indent=4))
    print(f"Saved raw news to: {raw_path}", file=sys.stderr)

if __name__ == "__main__":
    main()
