# stock-report-viewer Specification

## Purpose
TBD - created by archiving change add-stock-report-webapp. Update Purpose after archive.
## Requirements
### Requirement: Stock Report Web Viewer
시스템은 생성된 주식 리포트를 조회할 수 있는 웹 기반 인터페이스를 제공해야 한다 (SHALL).

#### Scenario: View Stock Details
- **AND** 시스템은 분석 분야별(기본 분석, 기술적 분석, 뉴스 등)로 독립된 카드 형태의 모듈로 구성하여 정보를 표시한다.
- **AND** 각 모듈은 해당하는 JSON 데이터(`fundamental.json`, `technical.json`, `news.json`)와 1:1로 매칭되는 시각적 영역을 가진다.
- **AND** 시스템은 기술적 분석 결과(`technical.json`)를 표시한다 (SHALL).
- **AND** 일봉/주봉 기준의 20일 이평선 돌파 여부, 골든크로스 여부, 캔들 색상을 시각적으로 표현한다.
- **AND** 현재가를 강조하여 표시한다.

