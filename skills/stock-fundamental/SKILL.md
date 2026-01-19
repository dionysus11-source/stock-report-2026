# Skill: Stock Fundamental Analysis

## Description
Agent-driven analysis of stock fundamentals using a strict checklist. This skill relies on the Agent's ability to search, reason, and structure data, without executing scraping scripts.

## Usage
When requested to analyze a stock (e.g., "Analyze Samsung Electronics"), the Agent MUST:
1.  **Research**: Use `search_web` to find the latest financial data for the stock.
    *   Query: "{Stock Name} 재무제표 {Year} 시가총액 PER PBR ROE 부채비율 영업이익률"
2.  **Evaluate**: Compare the found data against the **Checklist** below.
3.  **Report**: Generate a JSON file at `report/{Date}/{Code}_fundamental.json`.

## Checklist
- [ ] **시가총액 3,000억 원 이상** (Market Cap >= 300B KRW)
- [ ] **증거금률 40% 이하** (Margin Ratio <= 40%)
- [ ] **52주 최저가 대비율 10% 이하** (Current/52W Low - 1 <= 0.1)
- [ ] **52주 최고가 대비율 30% 이상** (52W High/Current - 1 >= 0.3)
- [ ] **PER 업종 평균 이하 (또는 10 이하)** (PER <= Industry Avg OR <= 10)
- [ ] **PBR 2 이하** (PBR <= 2)
- [ ] **PSR 5 이하** (PSR <= 5)
- [ ] **PCR 10 이하** (PCR <= 10)
- [ ] **PEG 1 이하** (PEG <= 1)
- [ ] **ROE 5% 이상** (ROE >= 5%)
- [ ] **ROA 3% 이상** (ROA >= 3%)
- [ ] **영업이익률 5% 이상** (Operating Margin >= 5%)
- [ ] **순이익률 3% 이상** (Net Profit Margin >= 3%)
- [ ] **매출액 증가율 1% 이상** (Sales Growth >= 1%)
- [ ] **순이익 증가율 1% 이상** (Net Income Growth >= 1%)
- [ ] **부채 비율 100% 이하** (Debt Ratio <= 100%)
- [ ] **유동 비율 200% 이상** (Current Ratio >= 200%)
- [ ] **유보율 200% 이상** (Reserve Ratio >= 200%)
- [ ] **배당수익률 2% 이상** (Dividend Yield >= 2%)
- [ ] **외국인 지분율 30% 이상** (Foreigner Ratio >= 30%)

## JSON Output Format
The Agent MUST output the result in this exact JSON structure:

```json
{
    "code": "{Stock Code}",
    "analysis_date": "{YYYY-MM-DD}",
    "metrics_fetched": {
        "market_cap": "e.g., 400조원",
        "per": "e.g., 12.5",
        "pbr": "e.g., 1.2",
        "roe": "e.g., 10.5%",
        "date_used": "e.g., 2024.12 (TTM)"
    },
    "checklist_details": {
        "시가총액 3,000억 원 이상": true,
        "증거금률 40% 이하": false,
        "52주 최저가 대비율 10% 이하": false,
        "52주 최고가 대비율 30% 이상": false,
        "PER 업종 평균 이하 (또는 10 이하)": false,
        "PBR 2 이하": false,
        "PSR 5 이하": false,
        "PCR 10 이하": false,
        "PEG 1 이하": false,
        "ROE 5% 이상": true,
        "ROA 3% 이상": false,
        "영업이익률 5% 이상": false,
        "순이익률 3% 이상": false,
        "매출액 증가율 1% 이상": false,
        "순이익 증가율 1% 이상": false,
        "부채 비율 100% 이하": true,
        "유동 비율 200% 이상": true,
        "유보율 200% 이상": false,
        "배당수익률 2% 이상": false,
        "외국인 지분율 30% 이상": false
    },
    "checked_count": 0, // Total number of true items
    "total_items": 20,
    "score_label": "Weak", // Weak, Good, Excellent, Best
    "action_guidance": "주의 필요" // 매수 적극 추천, 매수 추천, 매수 고려, 주의 필요, 투자 부적합
}
```
