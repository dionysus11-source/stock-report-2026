# Design: Next.js 기반 대시보드 아키텍처

## Context
현재 UI는 `App.jsx` 하나에 모든 로직이 포함되어 있습니다. 이는 기능 추가 시 가독성을 해치고 UI 구성 요소의 재사용성을 떨어뜨립니다. 특히 종목의 상세 분석 데이터(기본 분석, 기술 분석, 뉴스)를 탭이나 세련된 카드 레이아웃으로 분리하여 보여줄 필요가 있습니다.

## Goals / Non-Goals
- **Goals**:
  - Next.js 14+ App Router 도입
  - Shadcn UI를 활용한 전문적인 금융 대시보드 룩앤필 구현
  - 반응형 디자인 강화 (모바일 및 데스크탑 최적화)
  - 데이터 로딩 상태의 직관적 시각화 (Skeleton Screens)
- **Non-Goals**:
  - 백엔드(FastAPI) 로직 대규모 수정 (기존 엔드포인트 유지)
  - 실시간 주식 데이터 연동 (현재는 분석 리포트 조회 위주)

## Decisions
- **Framework**: `Next.js` (App Router)
  - 이유: 라우팅, SEO(필요시), 최신 React 기능 활용 우수성.
- **Styling**: `Tailwind CSS` + `Shadcn UI`
  - 이유: 생산성 극대화 및 고품질 UI 컴포넌트 즉각 사용 가능.
- **State Management**: `TanStack Query`
  - 이유: 서버 상태 관리 자동화 및 로딩/에러 처리 일원화.
- **Icons**: `Lucide React`
  - 이유: 명확하고 현대적인 벡터 아이콘 세트.

## Proposed Layout
- **Sidebar**: 분석 날짜 선택기 및 해당 날짜의 종목 리스트.
- **Main Area**: 
  - 상단: 종목 요약 및 종합 점수.
  - 하단(Tabs):
    - [기본 분석]: 체크리스트 및 투자 판단.
    - [기술 분석]: 차트 이미지 및 주요 지표.
    - [뉴스]: 감성 분석 결과 및 관련 링크.

## Risks / Trade-offs
- **Migration**: 기존 Vite 설정에서 Next.js로 옮기는 과정에서 파일 구조 재배치가 필요함.
- **Learning Curve**: Shadcn UI와 App Router의 익숙함이 필요하지만, AI 어시스턴트(Antigravity)가 충분히 지원 가능함.
