# Tasks: Add Stock Report Web App

## 1. Backend Implementation (FastAPI)
- [x] 1.1 `webapp/backend` 디렉터리 생성 및 `poetry` 또는 `requirements.txt` 설정.
- [x] 1.2 FastAPI 앱 구조를 갖춘 `main.py` 구현.
- [x] 1.3 `report/` 디렉터리 목록을 조회하는 `GET /api/dates` 구현.
- [x] 1.4 특정 날짜의 JSON 파일들을 스캔하는 `GET /api/reports/{date}` 구현.
- [x] 1.5 리포트 내용을 반환하는 `GET /api/reports/{date}/{code}` 구현.
- [x] 1.6 이미지 서빙을 위한 `StaticFiles` 마운트 설정.

## 2. Frontend Implementation (React/Vite)
- [x] 2.1 `webapp/frontend` 경로에 Vite 프로젝트 초기화 (`npm create vite@latest`).
- [x] 2.2 Tailwind CSS 설정 (설치 및 `tailwind.config.js` 구성).
- [x] 2.3 FastAPI와 통신하는 `ReportClient` 클래스/서비스 생성.
- [x] 2.4 **홈 페이지 (Home Page)** 구현:
    -   날짜 선택기 (드롭다운 또는 슬라이더).
    -   종목 목록 (간단한 요약을 포함한 카드 리스트).
- [x] 2.5 **상세 페이지 (Detail Page)** 구현:
    -   **헤더**: 종목명, 종목코드, 현재가 (가능한 경우).
    -   **차트 섹션**: 둥근 모서리와 그림자가 적용된 `_chart.png` 표시.
    -   **기본 분석 카드**: 주요 지표(PER, PBR 등)를 보여주는 "벤토" 그리드 스타일링.
    -   **뉴스 카드**: 외부 링크가 포함된 뉴스 아이템 리스트.
    -   **종합 의견 카드**: "매수/매도" 추천 의견을 강조하여 표시.

## 3. Integration & Polish (통합 및 완성도 향상)
- [x] 3.1 페이지 전환 시 "토스 스타일" 애니메이션 (Framer Motion) 적용.
- [x] 3.2 두 서버를 동시에 실행하거나(FastAPI가 React 정적 빌드 서빙) 실행을 돕는 `run_webapp.py` 또는 스크립트 추가.
