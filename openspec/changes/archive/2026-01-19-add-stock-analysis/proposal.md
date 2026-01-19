# Change: Add Stock Skills Bundle

## Why
사용자가 주식 분석의 각 단계를 독립적으로 실행하고 관리할 수 있기를 원합니다.
단일 스킬 대신 각 분석 단계(기업분석, 기술분석, 캡처, 뉴스, 리포트)를 별도의 스킬로 분리하여 모듈성을 높입니다.

## What Changes
- `stock-fundamental`: 기업 재무/체크리스트 분석
- `stock-technical`: 기술적 지표(이평선) 분석
- `stock-capture`: 차트 이미지 캡처
- `stock-news`: 뉴스 검색 및 감성 분석
- `stock-report`: 결과 취합 및 웹 대시보드

## Impact
- Affected specs: `stock-fundamental`, `stock-technical`, `stock-capture`, `stock-news`, `stock-report` (ALL NEW)
- Affected code: `skills/` directory (5 new subdirectories)
