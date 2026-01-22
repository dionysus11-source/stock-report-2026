## ADDED Requirements

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
