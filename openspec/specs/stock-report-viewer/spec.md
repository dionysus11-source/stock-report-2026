# stock-report-viewer Specification

## Purpose
TBD - created by archiving change add-stock-report-webapp. Update Purpose after archive.
## Requirements
### Requirement: Stock Report Web Viewer
시스템은 사용자가 주식 분석 리포트를 직관적으로 탐색하고 이해할 수 있도록 구조화된 대시보드 인터페이스를 제공해야 한다 (SHALL).

#### Scenario: Navigate Reports via Dashboard
- **WHEN** 사용자가 웹 어플리케이션에 접속하면
- **THEN** 시스템은 사이드바를 통해 분석 날짜를 선택하고 해당 날짜의 종목 리스트를 탐색할 수 있는 인터페이스를 제공한다 (SHALL).
- **AND** 특정 종목을 선택하면, 중앙 대시보드 영역에 해당 종목의 요약 정보가 표시된다.

#### Scenario: Navigate Reports on Mobile
- **WHEN** 사용자가 모바일 기기(작은 화면)로 접속하면
- **THEN** 시스템은 사이드바를 기본적으로 숨기고, 상단 헤더에 사이드바를 열 수 있는 토글 버튼(Trigger)을 제공한다 (SHALL).
- **AND** 토글 버튼을 클릭하면, 사이드바가 오버레이 형태로 나타나 분석 날짜와 종목 리스트를 탐색할 수 있게 한다.

#### Scenario: View Structured Analysis Data
- **WHEN** 사용자가 특정 종목의 상세 정보를 조회하면
- **THEN** 시스템은 정보를 탭(Tabs) 또는 섹션으로 구분하여 (기본 분석, 기술 분석, 뉴스 섹션) 제공하여 정보 과부하를 방지한다 (SHALL).
- **AND** 기본 분석 섹션에서는 체크리스트 통과 여부를 시각적으로 명확하게(예: 색상 및 아이콘) 표시한다.
- **AND** 기술 분석 섹션에서는 차트 이미지와 함께 주요 지표(이평선, 거래량 등)를 강조하여 표시한다.
- **AND** 뉴스 섹션에서는 뉴스 제목, 링크 및 AI 감성 분석 결과(Positive/Negative)를 배지 형태로 표시한다.

### Requirement: Remote Report Upload API
시스템은 원격지에서 생성된 분석 리포트를 중앙 서버로 전송할 수 있는 API 엔드포인트를 제공해야 한다 (SHALL).

#### Scenario: Successfully upload a report
- **WHEN** 유효한 `report.json` 파일 데이터가 POST 요청으로 `/api/upload-report`에 전달되면
- **THEN** 시스템은 해당 리포트의 날짜를 확인하여 `report/YYYY-MM-DD/` 디렉토리에 파일을 저장한다 (SHALL).
- **AND** 저장 완료 후 HTTP 201 Created 응답을 반환한다.

#### Scenario: Upload report with images
- **WHEN** `report.json`과 함께 관련 이미지(차트 등)가 멀티파트 요청으로 전달되면
- **THEN** 시스템은 이미지를 동일한 날짜 디렉토리에 저장하고, JSON 내의 이미지 경로가 올바르게 참조되도록 한다 (SHALL).

### Requirement: Stock History Navigation
시스템은 사용자가 과거에 분석한 모든 종목을 날짜에 구애받지 않고 탐색할 수 있는 기능을 제공해야 한다 (SHALL).

#### Scenario: View Recent Analysis Stocks
- **WHEN** 사용자가 "최근 분석" 탭을 선택하면
- **THEN** 시스템은 모든 날짜에서 분석한 종목을 최신 분석 순서로 정렬하여 표시한다 (SHALL).
- **AND** 각 종목 항목에는 해당 종목이 분석된 날짜를 함께 표시한다.

#### Scenario: Search Stocks
- **WHEN** 사용자가 "검색" 탭을 선택하고 종목 코드 또는 종목 이름을 입력하면
- **THEN** 시스템은 입력과 일치하는 종목 목록을 표시한다 (SHALL).
- **AND** 검색 결과에는 해당 종목이 분석된 모든 날짜를 표시한다.
- **AND** 검색 입력은 300ms debounce를 적용하여 불필요한 API 호출을 방지한다.

#### Scenario: Switch Between Views
- **WHEN** 사용자가 "최근 분석" 탭과 "검색" 탭 사이를 전환하면
- **THEN** 시스템은 각 탭의 상태를 유지한다 (SHALL).
- **AND** 탭 전환은 부드러운 애니메이션과 함께 수행된다.

