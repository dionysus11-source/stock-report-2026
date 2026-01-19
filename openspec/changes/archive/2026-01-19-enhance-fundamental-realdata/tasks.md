# 구현 작업 목록

## 1. 데이터 수집 구현
- [ ] 1.1 `skills/stock-fundamental/scripts/analyze.py`: 재무 데이터 크롤링 로직 구현 (예: `fetch_financial_data(code)`).
- [ ] 1.2 `skills/stock-fundamental/scripts/analyze.py`: 수집된 데이터를 딕셔너리로 파싱 (PER, PBR, ROE, 부채비율 등).

## 2. 체크리스트 연동
- [ ] 2.1 `calculate_fundamental_score` 함수를 수정하여 시뮬레이션 값 대신 실제 데이터와 비교하도록 개선.
- [ ] 2.2 결측 데이터 처리 (예: 데이터가 없는 경우 항목을 스킵하거나 체크하지 않음).

## 3. 검증
- [ ] 3.1 `analyze.py --code 005930` 실행 후 실제 지표가 반영된 점수 확인 (16/16 만 점이 아닐 수 있음).
- [ ] 3.2 생성된 JSON 결과물(`report/YYYY-MM-DD/005930_fundamental.json`) 검증.
