# Stock Analyzer 2026

한국 주식 시장(KOSPI/KOSDAQ) 종목 분석 스킬 모음입니다. 종목 검색, 차트 캡처, 기본적/기술적 분석, 뉴스 수집, 정적 HTML 리포트 생성을 지원합니다.

## 빠른 시작

### 1. 저장소 복제

```bash
git clone https://github.com/yourusername/stock-analyzer-2026.git
cd stock-analyzer-2026
```

### 2. 의존성 설치

**Python 패키지:**
```bash
pip install requests beautifulsoup4 jinja2 finance-datareader pandas
```

**Node.js 패키지 (차트 캡처용, 선택사항):**
```bash
npm install puppeteer
```

### 3. 종목 분석 실행

**간편 방법 (종목명으로):**
```bash
# 종목코드 검색
python skills/stock-search/scripts/search.py 삼성전자

# 전체 분석 실행 (데이터 수집 → 리포트 생성)
python skills/stock-report/scripts/analyze.py --name 삼성전자

# HTML 리포트 확인
start report/2026-04-22/005930_report.html
```

**상세 방법 (개별 스킬 실행):**
```bash
# 1. 종목코드 검색
python skills/stock-search/scripts/search.py 삼성전자
# → 005930

# 2. 차트 캡처
node skills/stock-capture/scripts/capture.js 005930

# 3. 뉴스 수집
python skills/stock-news/scripts/fetch.py --code 005930

# 4. 기술적 분석
python skills/stock-technical/scripts/analyze.py --code 005930

# 5. 기본적 분석 (Agent가 생성하거나 수동으로 JSON 생성)
#    → report/2026-04-22/005930_fundamental.json

# 6. 리포트 통합 + HTML 생성
python skills/stock-report/scripts/analyze.py --code 005930
```

## 포함된 스킬

### 1. stock-search
종목명으로 종목코드를 검색합니다.

```bash
python skills/stock-search/scripts/search.py 삼성전자
python skills/stock-search/scripts/search.py 유진로봇 --format json
```

### 2. stock-capture
Toss 증권에서 차트 이미지를 캡처합니다.

```bash
node skills/stock-capture/scripts/capture.js 005930
```

### 3. stock-news
Google News RSS에서 최신 뉴스를 가져옵니다.

```bash
# 뉴스 가져오기
python skills/stock-news/scripts/fetch.py --code 005930

# 감정 분석 (선택)
python skills/stock-news/scripts/analyze_sentiment.py --code 005930 --sentiments "Positive,Neutral,Positive,Positive,Neutral"
```

### 4. stock-technical
이동평균선, 골든크로스 등 기술적 분석을 수행합니다.

```bash
python skills/stock-technical/scripts/analyze.py --code 005930
```

### 5. stock-fundamental
재무 데이터를 수집하고 체크리스트를 분석합니다. 가이드라인에 따라 Agent가 생성하거나 수동으로 JSON을 작성하세요.

### 6. stock-report
모든 데이터를 통합하고 **정적 HTML 리포트**를 생성합니다.

```bash
# 종목코드로
python skills/stock-report/scripts/analyze.py --code 005930

# 종목명으로 (자동 검색)
python skills/stock-report/scripts/analyze.py --name 삼성전자

# 특정 날짜 데이터
python skills/stock-report/scripts/analyze.py --code 005930 --date 2026-01-20
```

## 생성되는 리포트

분석 완료 후 다음 파일들이 생성됩니다:

```
report/YYYY-MM-DD/
├── {CODE}_report.html          # 정적 HTML 리포트 ⭐
├── {CODE}_report.json          # 통합 JSON
├── {CODE}_fundamental.json     # 기본적 분석
├── {CODE}_technical.json       # 기술적 분석
├── {CODE}_news.json            # 뉴스 (감정 분석 완료)
└── images/
    └── A{CODE}_chart.png       # 차트 이미지
```

## 정적 HTML 리포트

### 특징
- ✅ 백엔드 서버 없이 브라우저에서 바로 열기 가능
- ✅ 반응형 디자인 (모바일/데스크톱)
- ✅ 탭 기반 네비게이션 (4개 탭)
- ✅ 임베디드 CSS (외부 의존성 최소화)
- ✅ 한국어 완벽 지원

### 탭 구성
1. **Overview**: 차트, 투자 의견, 퀵 통계
2. **Fundamental**: 체크리스트, 투자 노트
3. **Technical**: 일봉/주봉 기술적 지표
4. **News**: 최신 뉴스, 감성 분석

## 사용 예시

### 삼성전자 전체 분석

```bash
# 종목코드 검색
python skills/stock-search/scripts/search.py 삼성전자
# 출력: 005930

# 데이터 수집
node skills/stock-capture/scripts/capture.js 005930
python skills/stock-news/scripts/fetch.py --code 005930
python skills/stock-technical/scripts/analyze.py --code 005930

# 기본적 분석 (Agent 또는 수동 생성)
# → report/2026-04-22/005930_fundamental.json 생성

# 리포트 생성
python skills/stock-report/scripts/analyze.py --code 005930

# 브라우저에서 확인
start report/2026-04-22/005930_report.html
```

### 유진로봇 간편 분석

```bash
# 한 번에 실행 (종목명으로)
python skills/stock-report/scripts/analyze.py --name 유진로봇
```

## 지원하는 종목

### 내장된 주요 종목 (20개)

**KOSPI:** 삼성전자, SK하이닉스, NAVER, 카카오, 현대차, LG화학, LG전자, 포항홀딩스, 현대모비스, 기아, KB금융, 신한지주, 셀트리온, 삼성물산, 현대중공업, 삼성전기, 삼성SDI, 삼성에스디에스, SK, LG

**KOSDAQ:** 유진로봇, LG에너지솔루션, 삼성SDS, 에코프로, 에코프로비엠, 한국금융지주

그 외의 종목은 KRX 웹사이트에서 코드를 확인 후 사용하세요.

## 시스템 요구사항

- **Python**: 3.7+
- **pip packages**: requests, beautifulsoup4, jinja2, finance-datareader, pandas
- **Node.js**: 16+ (차트 캡처용, 선택사항)
- **OS**: Windows, macOS, Linux

## 참고 자료

- **KRX (한국거래소)**: http://www.krx.co.kr/main/main.jsp
- **네이버 금융**: https://finance.naver.com/
- **DART (전자공시)**: https://opendart.fss.or.kr/

## 라이선스

MIT License

## 기여

이슈 리포트와 PR 환영합니다! 
