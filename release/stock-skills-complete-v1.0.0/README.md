# Stock Analysis Skills - Complete Set

주식 분석 자동화 스킬 **전체 세트**입니다. 종목 검색, 차트 캡처, 기본적 분석, 뉴스 수집, 기술적 분석, HTML 리포트 생성을 포함합니다.

## 포함된 스킬 (6개)

### 1. stock-search
종목명으로 종목코드를 검색합니다.

**파일:**
- `stock-search/scripts/search.py`
- `stock-search/SKILL.md`

### 2. stock-capture
Toss 증권에서 차트 이미지를 캡처합니다.

**파일:**
- `stock-capture/scripts/capture.js`
- `stock-capture/SKILL.md`

**의존성:** Node.js, Puppeteer

### 3. stock-fundamental
재무 데이터를 수집하고 체크리스트를 분석합니다. (Agent-driven)

**파일:**
- `stock-fundamental/SKILL.md` (가이드라인)

### 4. stock-news
Google News RSS에서 최신 뉴스를 가져옵니다.

**파일:**
- `stock-news/scripts/fetch.py`
- `stock-news/scripts/analyze_sentiment.py`
- `stock-news/SKILL.md`

### 5. stock-technical
이동평균선, 골든크로스 등 기술적 분석을 수행합니다.

**파일:**
- `stock-technical/scripts/analyze.py`
- `stock-technical/SKILL.md`

### 6. stock-report
모든 데이터를 통합하고 **정적 HTML 리포트**를 생성합니다.

**파일:**
- `stock-report/scripts/analyze.py`
- `stock-report/scripts/generate_html.py`
- `stock-report/scripts/templates/*.html` (6개 템플릿)
- `stock-report/SKILL.md`

## 설치

### 1. Python 의존성

```bash
pip install requests beautifulsoup4 jinja2 finance-datareader pandas
```

### 2. Node.js 의존성 (stock-capture용)

```bash
npm install puppeteer
```

### 3. 자동 설치

**Windows:**
```bash
install.bat
```

**Linux/macOS:**
```bash
bash install.sh
```

### 4. 수동 설치

모든 스킬 폴더를 프로젝트의 `skills/` 디렉토리에 배치:

```
your-project/
└── skills/
    ├── stock-search/
    ├── stock-capture/
    ├── stock-fundamental/
    ├── stock-news/
    ├── stock-technical/
    └── stock-report/
```

## 완전한 분석 워크플로우

### 방법 1: 개별 스킬 실행

```bash
# 1. 종목코드 검색
python skills/stock-search/scripts/search.py 삼성전자
# → 005930

# 2. 차트 캡처 (Node.js)
node skills/stock-capture/scripts/capture.js 005930

# 3. 뉴스 수집
python skills/stock-news/scripts/fetch.py --code 005930

# 4. 기술적 분석
python skills/stock-technical/scripts/analyze.py --code 005930

# 5. 기본적 분석 (Agent 또는 수동 JSON 생성)
# → report/2026-04-22/005930_fundamental.json 생성

# 6. 리포트 통합 + HTML 생성
python skills/stock-report/scripts/analyze.py --code 005930
```

### 방법 2: 간편 실행 (--name 파라미터)

```bash
# 종목명으로 자동 검색 후 분석
python skills/stock-report/scripts/analyze.py --name 삼성전자
```

**주의**: 차트, 뉴스, 기술적 분석 데이터가 먼저 생성되어야 합니다.

## 생성되는 파일

```
report/YYYY-MM-DD/
├── {CODE}_report.html          # 정적 HTML 리포트 (브라우저로 열기)
├── {CODE}_report.json          # 통합 JSON
├── {CODE}_fundamental.json     # 기본적 분석 (별도 생성 필요)
├── {CODE}_technical.json       # 기술적 분석
├── {CODE}_news.json            # 뉴스 (감정 분석 완료)
├── {CODE}_news_raw.json        # 원본 뉴스
└── images/
    └── A{CODE}_chart.png       # 차트 이미지
```

## 각 스킬의 상세 사용법

### stock-search
```bash
python skills/stock-search/scripts/search.py 삼성전자
python skills/stock-search/scripts/search.py 유진로봇 --format json
```

### stock-capture
```bash
node skills/stock-capture/scripts/capture.js 005930
# → report/2026-04-22/images/A005930_chart.png
```

### stock-news
```bash
# 1. 뉴스 가져오기
python skills/stock-news/scripts/fetch.py --code 005930

# 2. 감정 분석 (선택)
python skills/stock-news/scripts/analyze_sentiment.py --code 005930 --sentiments "Positive,Neutral,Positive,Positive,Neutral"
```

### stock-technical
```bash
python skills/stock-technical/scripts/analyze.py --code 005930
# → report/2026-04-22/005930_technical.json
```

### stock-fundamental
가이드라인에 따라 웹 검색 후 JSON을 직접 생성하거나 Agent가 생성:
```json
{
    "code": "005930",
    "name": "삼성전자",
    "metrics_fetched": {...},
    "checklist_details": {...},
    "score_label": "Good",
    "action_guidance": "매수 추천"
}
```

### stock-report
```bash
# 종목코드로
python skills/stock-report/scripts/analyze.py --code 005930

# 종목명으로 (자동 검색)
python skills/stock-report/scripts/analyze.py --name 삼성전자

# 특정 날짜
python skills/stock-report/scripts/analyze.py --code 005930 --date 2026-01-20
```

## 정적 HTML 리포트 기능

### 특징
- ✅ 백엔드 서버 없이 브라우저에서 바로 열기
- ✅ 반응형 디자인 (모바일/데스크톱)
- ✅ 탭 기반 네비게이션 (4개 탭)
- ✅ 임베디드 CSS (외부 의존성 최소화)
- ✅ 한국어 완벽 지원

### 탭 구성
1. **Overview**: 차트, 투자 의견, 퀵 통계
2. **Fundamental**: 체크리스트, 투자 노트
3. **Technical**: 일봉/주봉 기술적 지표
4. **News**: 최신 뉴스, 감성 분석

## 예시: 삼성전자 전체 분석

```bash
# 1. 종목코드 검색
python skills/stock-search/scripts/search.py 삼성전자
# 출력: 005930

# 2. 차트 캡처
node skills/stock-capture/scripts/capture.js 005930

# 3. 뉴스 수집
python skills/stock-news/scripts/fetch.py --code 005930

# 4. 기술적 분석
python skills/stock-technical/scripts/analyze.py --code 005930

# 5. 기본적 분석 (수동 또는 Agent로 JSON 생성)
# → report/2026-04-22/005930_fundamental.json

# 6. 리포트 생성
python skills/stock-report/scripts/analyze.py --code 005930

# 7. 브라우저에서 확인
start report/2026-04-22/005930_report.html
```

## 시스템 요구사항

### 필수
- Python 3.7+
- pip packages: `requests`, `beautifulsoup4`, `jinja2`, `finance-datareader`, `pandas`

### 선택적 (stock-capture용)
- Node.js 16+
- npm: `puppeteer`

## 지원하는 종목

### 내장된 주요 종목 (20개)

**KOSPI:** 삼성전자, SK하이닉스, NAVER, 카카오, 현대차, LG화학, LG전자, 포항홀딩스, 현대모비스, 기아, KB금융, 신한지주, 셀트리온, 삼성물산, 현대중공업, 삼성전기, 삼성SDI, 삼성에스디에스, SK, LG

**KOSDAQ:** 유진로봇, LG에너지솔루션, 삼성SDS, 에코프로, 에코프로비엠, 한국금융지주

## 참고 자료

- **KRX**: http://www.krx.co.kr/main/main.jsp
- **네이버 금융**: https://finance.naver.com/
- **DART**: https://opendart.fss.or.kr/

## 라이선스

MIT License

## 변경 이력

### v1.0.0 (2026-04-22)
- 초기 릴리스
- 6개 스킬 완전 세트 포함
- 정적 HTML 리포트 생성
- 종목명 자동 검색
