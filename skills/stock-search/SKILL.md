---
name: stock-search
description: Searches for stock codes using local database and known stocks when user doesn't know the stock code.
---

# Stock Code Search (종목 코드 검색)

종목명으로 종목코드를 검색하는 스킬입니다.

## When to Use

사용자가 종목명은 알지만 종목코드를 모를 때 사용합니다:

- "삼성전자 종목코드가 뭐야?"
- "유진로봇 코드 알려줘"
- "LG 관련 종목들 검색해줘"

## Usage

### Basic Search
```bash
python skills/stock-search/scripts/search.py <종목명>
```

### Examples
```bash
# 기본 검색
python skills/stock-search/scripts/search.py 삼성전자

# 다양한 형식
python skills/stock-search/scripts/search.py 유진로봇 --format simple
python skills/stock-search/scripts/search.py LG --format json
python skills/stock-search/scripts/search.py 현대차 --save
```

### Options

- `--format`: 출력 형식 선택
  - `table`: 테이블 형식 (기본값)
  - `simple`: 간단한 목록
  - `json`: JSON 형식 (프로그램적으로 파싱할 때 사용)

- `--save`: 검색 결과를 JSON 파일로 저장

## How It Works

이 스킬은 다음 순서로 종목코드를 검색합니다:

1. **로컬 데이터베이스 검색**: 이전 검색 결과가 저장된 `stock_codes.json` 확인
2. **알려진 종목코드**: 주요 한국 종목 20개의 하드코딩된 데이터베이스 활용
3. **대체 방법**: 검색 실패 시 사용자에게 KRX 웹사이트 안내

### Known Stocks Database

주요 종목들이 사전에 등록되어 있습니다:
- KOSPI: 삼성전자(005930), SK하이닉스(000660), NAVER(035420), 카카오(035720), 현대차(005380) 등
- KOSDAQ: 유진로봇(056080), LG에너지솔루션(066975), 삼성SDS(007700) 등

## Output Format

### Table Format (default)
```
No.   종목코드    종목명              시장        현재가
======================================================================
1.    005930     삼성전자           KOSPI      N/A
2.    005935     삼성전자우         KOSPI      N/A
```

### JSON Format
```json
[
  {
    "code": "056080",
    "name": "유진로봇",
    "market": "KOSDAQ",
    "price": "N/A",
    "url": "https://finance.naver.com/item/main.naver?code=056080"
  }
]
```

## Integration with Other Skills

### Workflow Example

1. **사용자 요청**: "삼성전자 분석해줘"
2. **종목코드 검색**: `stock-search` 스킬로 "삼성전자" 검색 → `005930`
3. **분석 실행**: `stock-report` 스킬로 `005930` 분석

### Command Line Integration

```bash
# 1. 종목코드 검색
python skills/stock-search/scripts/search.py 유진로봇
# Output: 056080

# 2. 검색된 코드로 분석
python skills/stock-report/scripts/analyze.py --code 056080

# 3. 또는 --name 파라미터로 자동 검색
python skills/stock-report/scripts/analyze.py --name 유진로봇

# 4. HTML 리포트 확인
start report/2026-04-22/056080_report.html
```

### Programmatic Integration

```python
# analyze.py에서의 사용 예시
def search_stock_code(keyword):
    result = subprocess.run(
        [sys.executable, 'skills/stock-search/scripts/search.py', keyword, '--format', 'json'],
        capture_output=True,
        text=True,
        encoding='utf-8'
    )
    if result.returncode == 0:
        data = json.loads(result.stdout)
        return data
    return None
```

## Dependencies

```bash
pip install requests beautifulsoup4
```

## Error Handling

- **검색 결과 없음**: 알려진 종목코드 데이터베이스에 없으면 안내 메시지 표시
- **인코딩 문제**: Windows CP949 환경에서도 JSON 출력은 UTF-8로 정상 작동
- **여러 결과**: 일치하는 모든 종목 표시

## Stock Code Sources

전체 종목코드는 다음 공식 웹사이트에서 확인할 수 있습니다:

- **KRX (한국거래소)**: http://www.krx.co.kr/main/main.jsp
- **네이버 금융**: https://finance.naver.com/sise/sise_market_sum.nhn
- **DART (전자공시)**: https://opendart.fss.or.kr/

## Limitations

1. **알려진 종목만**: 주요 종목 20개만 사전 등록되어 있음
2. **실시간 가격 미지원**: 현재가 정보는 제공하지 않음 (N/A)
3. **네트워크 의존성**: 웹 검색 기능은 현재 비활성화 (안정성 문제)

## Use Cases

### Case 1: Single Stock Analysis
```
User: "카카오 분석해줘"
→ Search: "카카오" → 035720
→ Analyze: --code 035720
→ Report: HTML 생성
```

### Case 2: Unknown Code
```
User: "유진로봇 분석해줘"
→ Search: "유진로봇" → 056080 (from known stocks)
→ Analyze: --code 056080
→ Report: HTML 생성
```

### Case 3: Direct Integration
```
User: "삼성전자 분석"
→ analyze.py --name 삼성전자
→ Auto-search → 005930 → Generate report
```

## Troubleshooting

### 검색이 안되는 경우

1. **정확한 종목명 확인**: 전체 종목명 또는 키워드 사용
2. **KRX 웹사이트 확인**: 전체 종목 리스트는 KRX에서 확인
3. **직접 코드 입력**: 종목코드를 아는 경우 `--code` 파라미터 사용

```bash
# 종목명 모를 때
python skills/stock-search/scripts/search.py 삼성전자

# 종목코드를 아는 경우 (직접 입력)
python skills/stock-report/scripts/analyze.py --code 005930
```

## Future Enhancements

- KRX 공식 API 연동으로 전 종목 지원
- 검색 결과 로컬 캐싱으로 성능 개선
- 실시간 주가 정보 추가
- 퍼지 매칭으로 오타 허용
