# Tasks: 프론트엔드 개편 구현

## 1. 환경 설정 및 프로젝트 초기화
- [x] 1.1 `webapp/frontend` 디렉토리 내 Next.js 프로젝트 초기화 (`npx create-next-app@latest`)
- [x] 1.2 Tailwind CSS 및 필수 환경 설정
- [x] 1.3 Shadcn UI 초기화 및 필요한 컴포넌트 설치 (Sidebar, Card, Tabs, Badge, Skeleton 등)
- [x] 1.4 TanStack Query 설정 (`QueryProvider`)

## 2. 데이터 통신 레이어
- [x] 2.1 기존 `api/ReportClient.js`를 Next.js 환경으로 이관 및 리팩토링
- [x] 2.2 API 엔드포인트 환경 변수 설정

## 3. UI/UX 구현
- [x] 3.1 공통 레이아웃 (사이드바 및 헤더) 구현
- [x] 3.2 날짜 및 종목 리스트 네비게이션 구현
- [x] 3.3 종목 상세 대시보드 (탭 기반 구조) 구현
  - [x] 3.3.1 기본적 분석 섹션 (체크리스트 시각화)
  - [x] 3.3.2 기술적 분석 섹션 (차트 및 지표 강조)
  - [x] 3.3.3 뉴스 및 감성 분석 섹션
- [x] 3.4 로딩 상태(Skeleton) 및 에러 페이지 처리

## 4. 검증 및 마무리
- [x] 4.1 반응형 레이아웃 확인 (모바일/데스크탑)
- [x] 4.2 기존 데이터 연동 정상 동작 확인
- [x] 4.3 불필요한 기존 코드 정리
