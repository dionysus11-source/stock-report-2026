# Change: Add Stock Report Web App

## Why (변경 이유)
현재 주식 분석 리포트는 JSON 파일과 정적 이미지로 생성되어 사용자가 확인하기 어렵습니다. 사용자는 깔끔하고 직관적인 "토스 스타일"의 웹 인터페이스를 통해 리포트, 차트, 분석 결과를 시각적으로 확인하기를 원합니다.

## What Changes (변경 내용)
- **생성**: `webapp` 디렉터리에 다음을 포함하는 프로젝트 구조 생성:
    - **Backend**: 리포트 데이터와 이미지를 제공하는 FastAPI 서버.
    - **Frontend**: 모바일 우선의 "토스 스타일" UI를 갖춘 React (Vite) 애플리케이션.
- **추가**: OpenSpec에 `stock-report-viewer` 기능(Capability) 정의 추가.

## Impact (영향)
- **신규 디렉터리**: `webapp/`
- **영향받는 기능**: `stock-report-viewer` (신규)
- **사용자 경험**: 사용자는 JSON 파일을 직접 열어보는 대신, 로컬 서버를 실행하여 웹 브라우저에서 인터랙티브하게 리포트를 조회할 수 있습니다.
