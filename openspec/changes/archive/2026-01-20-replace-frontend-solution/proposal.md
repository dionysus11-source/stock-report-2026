# Change: 프론트엔드 솔루션 전면 개편 (Next.js + Shadcn UI)

## Why
현재의 단일 파일 기반 React App은 기능 확장에 한계가 있고, UI가 정적인 이미지를 보여주는 수준에 머물러 있어 사용자 경험이 직관적이지 않습니다. 특히 네비게이션이 부재하고 모든 데이터가 한 페이지에 몰려 있어, 사용자가 원하는 정보를 빠르게 찾거나 여러 종목을 비교하기 어렵습니다. 산업 표준에 부합하는 현대적인 UI 아키텍처로의 전환이 필요합니다.

## What Changes
- **프레임워크 전환**: Vite + React 환경에서 **Next.js (App Router)**로 전환합니다. 이를 통해 페이지 기반의 명확한 라우팅과 성능 최적화(SSR/Static Generation)를 확보합니다.
- **UI 라이브러리 도입**: **Shadcn UI (Radix UI + Tailwind CSS)**를 도입합니다. 직접 스타일링하는 대신, 검증된 디자인 시스템을 사용하여 일관성 있고 직관적인 컴포넌트(Tab, Sidebar, Card, Badge 등)를 구성합니다.
- **데이터 페칭 인터페이스 개선**: **TanStack Query (React Query)**를 도입하여 복잡한 로딩 상태 관리와 캐싱을 체계화합니다.
- **레이아웃 개편**: 사이드바 기반의 대시보드 구조를 도입하여 날짜별/종목별 탐색을 직관적으로 개선합니다.
- **아이콘 및 타이포그래피**: **Lucide React** 아이콘 세트와 **Inter/Pretendard** 폰트를 적용하여 가독성을 높입니다.

## Impact
- Affected specs: `stock-report-viewer`
- Affected code: 
  - `webapp/frontend/` (기존 코드 제거 및 신규 프로젝트 초기화)
  - `webapp/backend/` (Next.js API Routes 또는 기존 FastAPI 연동 선택 필요 - 이번 제안은 프론트엔드에 집중)
