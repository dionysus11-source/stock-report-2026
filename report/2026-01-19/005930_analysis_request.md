# Stock Fundamental Analysis Request

**Target**: 005930 (Samsung Electronics or relevant stock)
**Date**: 2026-01-19

## Objective
Please search for the latest financial data for the above stock and evaluate it against the following checklist. 
For each item, determine the value and whether it PASSES (True) or FAILS (False).

## Checklist
- [ ] 시가총액 3,000억 원 이상
- [ ] 증거금률 40% 이하
- [ ] 52주 최저가 대비율 10% 이하
- [ ] 52주 최고가 대비율 30% 이상
- [ ] PER 업종 평균 이하 (또는 10 이하)
- [ ] PBR 2 이하
- [ ] PSR 5 이하
- [ ] PCR 10 이하
- [ ] PEG 1 이하
- [ ] ROE 5% 이상
- [ ] ROA 3% 이상
- [ ] 영업이익률 5% 이상
- [ ] 순이익률 3% 이상
- [ ] 매출액 증가율 1% 이상
- [ ] 순이익 증가율 1% 이상
- [ ] 부채 비율 100% 이하
- [ ] 유동 비율 200% 이상
- [ ] 유보율 200% 이상
- [ ] 배당수익률 2% 이상
- [ ] 외국인 지분율 30% 이상

## Output Format
Please generate a JSON file with the following structure:
```json
{
    "code": "{code}",
    "analysis_date": "{date_str}",
    "metrics_fetched": {
        "market_cap": "...",
        "per": "...",
        ... (include all relevant scraped metrics)
    },
    "checked_count": N,
    "total_items": 20,
    "score_label": "...",
    "action_guidance": "...",
    "checklist_details": {
        "시가총액 3,000억 원 이상": true/false,
        ...
    }
}
```
