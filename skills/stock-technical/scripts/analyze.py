import argparse
import json
import sys
import FinanceDataReader as fdr
import pandas as pd

def analyze_technical(usage_code):
    """
    Performs technical analysis for weekly and daily charts.
    """
    try:
        # Assuming standard Korean stock code
        df_daily = fdr.DataReader(usage_code)
        
        if df_daily.empty:
            return {"error": "No data found"}
        
        # Calculate Moving Averages
        df_daily['MA5'] = df_daily['Close'].rolling(window=5).mean()
        df_daily['MA20'] = df_daily['Close'].rolling(window=20).mean()
        
        # Get latest data
        latest = df_daily.iloc[-1]
        prev = df_daily.iloc[-2]
        
        # 2. Daily Analysis
        price = float(latest['Close'])
        ma5 = float(latest['MA5']) if not pd.isna(latest['MA5']) else 0
        ma20 = float(latest['MA20']) if not pd.isna(latest['MA20']) else 0
        prev_ma5 = float(prev['MA5']) if not pd.isna(prev['MA5']) else 0
        prev_ma20 = float(prev['MA20']) if not pd.isna(prev['MA20']) else 0
        
        daily_checklist = {
            "price_above_ma20": price > ma20,
            "golden_cross": (ma5 > ma20) and (prev_ma5 <= prev_ma20),
            "is_red_candle": latest['Close'] > latest['Open']
        }
        
        # 1. Weekly Analysis (Approximate by resampling)
        df_weekly = df_daily.resample('W').agg({'Open': 'first', 'High': 'max', 'Low': 'min', 'Close': 'last'})
        df_weekly['MA20'] = df_weekly['Close'].rolling(window=20).mean()
        
        weekly_checklist = {}
        if not df_weekly.empty:
            latest_weekly = df_weekly.iloc[-1]
            weekly_ma20 = float(latest_weekly['MA20']) if not pd.isna(latest_weekly['MA20']) else 0
            
            # Check slope (current MA20 >= previous MA20)
            ma20_slope_up = False
            if len(df_weekly) >= 2:
                prev_weekly_ma20 = float(df_weekly.iloc[-2]['MA20']) if not pd.isna(df_weekly.iloc[-2]['MA20']) else 0
                ma20_slope_up = weekly_ma20 >= prev_weekly_ma20
            
            weekly_checklist = {
                "price_above_ma20": latest_weekly['Close'] > weekly_ma20,
                "ma20_slope_up": ma20_slope_up
            }
        
        return {
            "code": usage_code,
            "daily": daily_checklist,
            "weekly": weekly_checklist,
            "current_price": int(price)
        }
    except Exception as e:
        return {"error": str(e)}

def main():
    parser = argparse.ArgumentParser(description="Stock Technical Analysis")
    parser.add_argument("--code", required=True, help="Stock symbol code")
    args = parser.parse_args()
    
    result = analyze_technical(args.code)
    print(json.dumps(result, ensure_ascii=False, indent=4))

if __name__ == "__main__":
    main()
