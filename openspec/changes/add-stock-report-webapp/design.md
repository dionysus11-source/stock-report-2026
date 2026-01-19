# Design: Stock Report Web App

## Context (배경)
사용자는 `stock-report` 스킬이 생성한 주식 분석 리포트를 조회할 수 있는 웹 애플리케이션을 필요로 합니다.
**주요 요구사항**:
-   데이터 소스: `report/YYYY-MM-DD/code_report.json` 및 `images/code_chart.png`.
-   UI 경험: "토스 스타일" (깔끔함, 애니메이션, 모바일 우선, "벤토" 그리드).
-   입력: 날짜 선택 -> 종목 선택.

## Decisions (설계 결정 사항)

### 1. 기술 스택 (Technology Stack)
**결정**: FastAPI (Backend) + React/Vite (Frontend)
-   **Backend**: **FastAPI**
    -   *근거*: 프로젝트가 Python 기반입니다. 분석 생성 로직과 뷰어 간에 모델(Pydantic 스키마)을 공유하여 유지보수성을 높일 수 있습니다. FastAPI는 경량화되어 있고 JSON 및 정적 파일 서빙에 탁월합니다.
-   **Frontend**: **React (Vite) + Tailwind CSS + Framer Motion**
    -   *근거*: "토스 스타일" UX는 고품질의 마이크로 인터랙션과 부드러운 전환 효과를 필요로 합니다.
        -   **React**: 강력한 컴포넌트 생태계.
        -   **Tailwind CSS**: 빠른 UI 개발, "깔끔한" 디자인 시스템(부드러운 그림자, 둥근 모서리, 현대적인 타이포그래피) 구현 용이.
        -   **Framer Motion**: 토스 앱 특유의 유려하고 생동감 있는 느낌(레이아웃 애니메이션, 진입 트랜지션) 구현에 필수적임.

### 2. 아키텍처 (Architecture)
-   **단일 리포지토리**: 루트 경로의 `webapp/` 디렉터리.
-   **데이터 접근**: 백엔드는 별도 데이터베이스 없이 `report/` 파일 시스템에서 직접 데이터를 읽습니다.
-   **API 엔드포인트**:
    -   `GET /api/reports/dates`: 사용 가능한 날짜 폴더 목록 조회.
    -   `GET /api/reports/{date}`: 해당 날짜에 분석된 종목 목록 조회.
    -   `GET /api/reports/{date}/{stock_code}`: 전체 JSON 리포트 반환.
    -   `GET /images/{date}/{filename}`: 차트 이미지 서빙.

### 3. UI 디자인 시스템 ("토스 스타일")
-   **타이포그래피**: Inter 또는 Suit (한글 가독성이 좋은 산세리프).
-   **색상**: 연한 회색 배경(`bg-gray-50`), 흰색 카드(`bg-white`), 부드러운 그림자(`shadow-lg`, `shadow-soft`).
-   **레이아웃**:
    -   **모바일 우선**: 차트는 단일 컬럼, 세부 정보는 벤토(Bento) 그리드 스타일.
    -   **카드 디자인**: 둥근 모서리(`rounded-2xl` 또는 `rounded-3xl`), 넉넉한 여백.

## Risks (위험 요소)
-   **브라우저 보안**: 브라우저에서 로컬 파일 시스템(`file://`) 직접 접근은 제한됩니다.
    -   *완화 방안*: FastAPI 백엔드가 파일 서버 역할을 수행하여 브라우저에 데이터를 제공하므로 이 문제를 해결할 수 있습니다.

## Alternatives Considered (대안 검토)
-   **Streamlit/Gradio**:
    -   *장점*: 순수 Python으로 빠르게 구축 가능.
    -   *단점*: 사용자가 요구하는 "토스 스타일"의 고도화된 커스텀 UI 및 애니메이션 구현에 한계가 있음. UI 요구사항 미충족으로 제외.
-   **Next.js (Full Stack)**:
    -   *장점*: 단일 스택으로 통일 가능.
    -   *단점*: 백엔드 로직(파일 시스템 접근)을 위해 Node.js 환경이 추가로 필요함. 데이터 생성 로직이 Python이므로, 백엔드는 Python으로 유지하는 것이 일관성에 유리하다고 판단. FastAPI + 정적 React 빌드 서빙 방식이 구조적으로 단순함.
