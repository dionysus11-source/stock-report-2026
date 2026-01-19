# Change: Implement Stock Capture

## Why
`add-stock-analysis` 단계에서 스캐폴딩된 `stock-capture` 스킬을 고도화하여 실제 안정적인 차트 캡처를 구현해야 합니다.
초기 구현은 기본적인 Puppeteer 실행만 포함했으나, 실제 웹사이트의 로딩 지연, 요소 선택, 오류 처리를 강화할 필요가 있습니다.

## What Changes
- `stock-capture` 스펙을 구체화 (MODIFIED)
- `capture.js` 스크립트 고도화:
    - 정확한 차트 요소 대기 (`waitForSelector`)
    - 에러 핸들링 및 재시도 로직
    - 기본 뷰포트 및 타임아웃 설정 최적화

## Impact
- Affected specs: `stock-capture`
- Affected code: `skills/stock-capture/scripts/capture.js`
