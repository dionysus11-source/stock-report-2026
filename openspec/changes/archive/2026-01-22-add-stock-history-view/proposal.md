# Change: Add Stock History View with Search

## Why

현재 시스템에서는 사용자가 먼저 날짜를 선택해야만 해당 날짜에 분석된 종목 목록을 확인할 수 있습니다. 이로 인해 특정 종목이 언제 분석되었는지 확인하려면 여러 날짜를 일일이 선택해야 하는 불편함이 있습니다. 사용자가 과거에 분석한 종목을 빠르게 찾고 재검토할 수 있는 기능이 필요합니다.

## What Changes

- **최근 분석 종목 탭**: 모든 날짜에서 분석한 종목을 최신 순으로 통합 표시
- **종목 검색 탭**: 종목 코드 또는 종목 이름으로 검색하여 해당 종목이 분석된 날짜 목록 표시
- **탭 전환 UI**: 두 가지 뷰 모드를 탭으로 전환하여 사용자 경험 개선

## Impact

- **Affected specs**: `stock-report-viewer`
- **Affected code**:
  - `webapp/frontend/old-vite/src/App.jsx` - 메인 화면 로직 수정
  - `webapp/frontend/old-vite/src/api/ReportClient.js` - 검색 API 추가 (필요시)
