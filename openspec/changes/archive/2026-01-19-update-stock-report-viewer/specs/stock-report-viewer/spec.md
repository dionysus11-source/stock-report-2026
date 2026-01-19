## MODIFIED Requirements
### Requirement: Stock Report Web Viewer
시스템은 생성된 주식 리포트를 조회할 수 있는 웹 기반 인터페이스를 제공해야 한다 (SHALL).

#### Scenario: View Stock Details
- **WHEN** 사용자가 날짜와 종목 코드를 선택하면
- **THEN** 시스템은 캡처된 차트 이미지 (`*_chart.png`)를 올바른 경로로 표시한다 (404 오류 없음)
- **AND** 종목명은 "종목명 (종목코드)" 형식으로 표시되며, 토스 증권 주문 페이지(`https://www.tossinvest.com/stocks/A{code}/order`)로 연결되는 하이퍼링크를 포함한다
- **AND** 기본적 분석 섹션은 전체 체크리스트 항목의 통과/실패 여부를 표시하고, 총 통과 개수(예: 16/20)를 요약하여 보여준다
- **AND** 뉴스 섹션은 각 기사의 제목과 함께 분석된 감정(긍정/중립/부정)을 표시한다
- **AND** UI는 "모바일 우선"의 카드 기반 심미성을 갖추어 렌더링된다

#### Scenario: List Available Reports
- **WHEN** 사용자가 애플리케이션을 열면
- **THEN** 시스템은 `report/` 디렉터리에 있는 사용 가능한 날짜 목록을 표시한다
- **AND** 특정 날짜를 선택하면 해당 날짜에 생성된 모든 종목 리포트를 보여준다
