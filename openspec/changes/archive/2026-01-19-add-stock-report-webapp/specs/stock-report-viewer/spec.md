## ADDED Requirements

### Requirement: Stock Report Web Viewer
시스템은 생성된 주식 리포트를 조회할 수 있는 웹 기반 인터페이스를 제공해야 한다 (SHALL).

#### Scenario: View Stock Details
- **WHEN** 사용자가 날짜와 종목 코드를 선택하면
- **THEN** 시스템은 캡처된 차트 이미지 (`*_chart.png`)를 표시한다
- **AND** 시스템은 기본적 분석 주요 지표를 표시한다
- **AND** 시스템은 뉴스 요약을 표시한다
- **AND** UI는 "모바일 우선"의 카드 기반 심미성을 갖추어 렌더링된다

#### Scenario: List Available Reports
- **WHEN** 사용자가 애플리케이션을 열면
- **THEN** 시스템은 `report/` 디렉터리에 있는 사용 가능한 날짜 목록을 표시한다
- **AND** 특정 날짜를 선택하면 해당 날짜에 생성된 모든 종목 리포트를 보여준다
