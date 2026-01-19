import argparse
import json
import sys

# Checklist items derived from user's analyze_1단계.md update
DEFAULT_CHECKLIST_ITEMS = [
    "시가총액 3,000억 원 이상",
    "증거금률 40% 이하",
    "52주 최저가 대비율 10% 이하",
    "52주 최고가 대비율 30% 이상",
    "PER 업종 평균 이하 (또는 5 이하)",
    "PBR 2 이하",
    "PSR 5 이하",
    "PCR 10 이하",
    "PEG 1 이하",
    "ROE 5% 이상",
    "ROA 3% 이상",
    "영업이익률 5% 이상",
    "순이익률 3% 이상",
    "매출액 증가율 1% 이상",
    "순이익 증가율 1% 이상",
    "부채 비율 100% 이하",
    "유동 비율 200% 이상",
    "유보율 200% 이상",
    "현금 배당 수익률 3% 이상",
    "외국인 지분율 30% 이상",
    "사업보고서 확인"
]

def calculate_fundamental_score(checklist_data):
    """
    Calculates safety score based on checklist items.
    """
    checked_count = sum(1 for v in checklist_data.values() if v)
    
    result = {
        "checked_count": checked_count,
        "total_items": len(checklist_data),
        "score_label": "",
        "safety_probability": "",
        "action_guidance": ""
    }

    if checked_count > 15:
        result["safety_probability"] = "> 90%"
        result["score_label"] = "Best"
        result["action_guidance"] = "1차 매수 최적기. 수익이 날 확률이 매우 높습니다."
    elif 12 <= checked_count <= 15:
        result["safety_probability"] = "> 70%"
        result["score_label"] = "Good"
        result["action_guidance"] = "큰 무리 없는 진입 시점입니다. 전략대로 실행하세요."
    elif 9 <= checked_count <= 11:
        result["safety_probability"] = "> 50%"
        result["score_label"] = "Normal"
        result["action_guidance"] = "평범한 수준입니다."
    elif 5 <= checked_count <= 8:
        result["safety_probability"] = "> 30%"
        result["score_label"] = "Caution"
        result["action_guidance"] = "주봉이나 일봉 중 하나가 꺾여 있습니다. 소액만 진입하거나 관망하세요."
    else: # < 5
        result["safety_probability"] = "Low"
        result["score_label"] = "Danger"
        result["action_guidance"] = "절대 금지. 1차 매수하자마자 지하실로 끌려갈 위험이 큽니다."

    return result

def main():
    parser = argparse.ArgumentParser(description="Stock Fundamental Analysis")
    parser.add_argument("--code", required=True, help="Stock symbol code")
    args = parser.parse_args()
    
    # In a real scenario, this would likely fetch data or ask user interactively.
    # For now, we assume a simulation where we check first 16 items to verify 'Best' case logic,
    # or returning a structure that can be filled by an UI.
    
    # For demonstration purposes, let's simulate checking random items or just 16 items.
    simulated_checks = {item: True for item in DEFAULT_CHECKLIST_ITEMS[:16]} 
    
    result = calculate_fundamental_score(simulated_checks)
    result["code"] = args.code
    
    print(json.dumps(result, ensure_ascii=False, indent=4))

if __name__ == "__main__":
    main()
