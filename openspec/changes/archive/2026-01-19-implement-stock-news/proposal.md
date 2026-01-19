# Change: Implement Stock News (Agent Driven)

## Why
외부 LLM API(OpenAI 등)를 직접 연동하는 비용과 복잡성을 피하기 위해, Antigravity Agent가 직접 수집된 뉴스를 읽고 감성 분석을 수행하는 방식을 도입합니다.
스킬은 "데이터 수집"만 담당하고, "판단"은 Agent가 수행합니다.

## What Changes
- `stock-news` 스펙 변경 (MODIFIED)
    - 뉴스 크롤링 기능 (네이버 금융)
    - 감성 분석은 스크립트가 아닌, **Agent에게 파일 리뷰를 요청**하는 워크플로우로 대체
- `scripts/fetch.py` 역할 축소:
    - 뉴스 수집 -> `report/{date}/{code}_news_raw.json` 저장
- 새로운 워크플로우 정의:
    1. 스킬이 뉴스 수집
    2. 생성된 JSON 파일을 Agent가 읽음
    3. Agent가 감성 태그를 달아서 업데이트

## Impact
- Affected specs: `stock-news`
- No external API key required.
