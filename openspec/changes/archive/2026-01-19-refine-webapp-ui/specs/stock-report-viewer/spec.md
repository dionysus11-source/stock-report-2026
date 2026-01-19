## MODIFIED Requirements
### Requirement: Stock Report Web Viewer
시스템은 생성된 주식 리포트를 조회할 수 있는 웹 기반 인터페이스를 제공해야 한다 (SHALL).

#### Scenario: View Stock Details
- **WHEN** 사용자가 특정 주식 리포트를 조회하면
- **THEN** 시스템은 캡처된 차트 이미지를 표시한다
- **AND** 기본적 분석 체크리스트와 요약 점수를 표시한다 (개별 지표 그리드는 제외됨)
- **AND** 뉴스 리스트는 각 기사의 제목과 감정 이모티콘만 표시한다 (날짜 및 출처 제외)
- **AND** UI는 고해상도 타이포그래피(Inter/Outfit Font), 정제된 색상 팔레트, 부드러운 애니메이션을 사용하여 "프리미엄 토스 스타일"의 심미성을 구현한다
- **AND** 모든 페이지 전환 및 요소 등장에는 부드러운 모션(framer-motion)이 적용된다
