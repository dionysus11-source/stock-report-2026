import json
import argparse
import os
import sys
from datetime import datetime

# This script is intended to be used by an AI Agent to automate the sentiment analysis step.
# It reads the raw news JSON, allows the agent to provide sentiments, and saves the analyzed JSON.

def main():
    parser = argparse.ArgumentParser(description="Analyze News Sentiment")
    parser.add_argument("--code", required=True, help="Stock code")
    parser.add_argument("--date", help="Analysis date (YYYY-MM-DD)")
    parser.add_argument("--sentiments", help="Comma-separated sentiments (e.g. Positive,Neutral,Positive)")
    args = parser.parse_args()
    
    date_str = args.date if args.date else datetime.now().strftime("%Y-%m-%d")
    report_dir = os.path.join("report", date_str)
    raw_path = os.path.join(report_dir, f"{args.code}_news_raw.json")
    output_path = os.path.join(report_dir, f"{args.code}_news.json")
    
    if not os.path.exists(raw_path):
        print(f"Error: Raw news file not found: {raw_path}")
        sys.exit(1)
        
    with open(raw_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    if args.sentiments:
        sentiments = [s.strip() for s in args.sentiments.split(",")]
        if len(sentiments) != len(data['news']):
            print(f"Error: Provided {len(sentiments)} sentiments but found {len(data['news'])} news items.")
            sys.exit(1)
            
        for i, s in enumerate(sentiments):
            if s not in ["Positive", "Negative", "Neutral"]:
                print(f"Warning: Invalid sentiment '{s}'. Expected Positive, Negative, or Neutral.")
            data['news'][i]['sentiment'] = s
            
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Successfully saved analyzed news to {output_path}")
    else:
        print(f"Loaded {len(data['news'])} news items for {args.code}")
        for i, item in enumerate(data['news']):
            print(f"{i+1}. {item['title']} (Current: {item.get('sentiment', 'Unknown')})")
        print("\nUse --sentiments 'S1,S2,S3...' to update.")
    
if __name__ == "__main__":
    main()
