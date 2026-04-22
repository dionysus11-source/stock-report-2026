# Stock Analyzer 2026

Claude를 위한 한국 주식 분석 스킬 모음입니다. 종목 검색, 차트 캡처, 기본적/기술적 분석, 뉴스 수집, 정적 HTML 리포트 생성을 지원합니다.

## Claude와 함께 사용하기

이 프로젝트는 Claude Code (Claude CLI)와 함께 사용하도록 설계되었습니다.

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

### 3. Claude에게 분석 요청하기

Claude에게 자연어로 종목 분석을 요청하세요:

```
"삼성전자 분석해줘"
"유진로봇 주식 분석 부탁해"
"005930 종목 리포트 생성해줘"
```

Claude가 자동으로:
1. 종목 코드를 검색합니다 (stock-search 스킬)
2. 차트를 캡처합니다 (stock-capture 스킬)
3. 뉴스를 수집합니다 (stock-news 스킬)
4. 기술적 분석을 수행합니다 (stock-technical 스킬)
5. 기본적 분석을 수행합니다 (stock-fundamental 스킬)
6. HTML 리포트를 생성합니다 (stock-report 스킬)

### 4. 리포트 확인

```
report/YYYY-MM-DD/{CODE}_report.html
```

브라우저에서 열어서 확인하세요!

## 포함된 스킬

### stock-search
종목명으로 종목코드를 검색합니다.

**Claude에게 요청:**
- "삼성전자 종목코드 찾아줘"
- "유진로봇 코드 알려줘"

### stock-capture
Toss 증권에서 차트 이미지를 캡처합니다.

**Claude에게 요청:**
- "005930 차트 캡처해줘"
- "삼성전자 주가 차트 이미지 가져와줘"

### stock-news
Google News RSS에서 최신 뉴스를 가져오고 감정 분석을 수행합니다.

**Claude에게 요청:**
- "005930 최신 뉴스 가져와줘"
- "삼성전자 관련 뉴스 분석해줘"

### stock-technical
이동평균선, 골든크로스 등 기술적 분석을 수행합니다.

**Claude에게 요청:**
- "005930 기술적 분석 해줘"
- "삼성전자 차트 분석해줘"

### stock-fundamental
재무 데이터를 수집하고 체크리스트를 분석합니다. Claude가 웹 검색을 통해 데이터를 수집하고 JSON을 생성합니다.

**Claude에게 요청:**
- "005930 기본적 분석 해줘"
- "삼성전자 재무제표 분석해줘"

### stock-report
모든 데이터를 통합하고 **정적 HTML 리포트**를 생성합니다.

**Claude에게 요청:**
- "005930 리포트 생성해줘"
- "삼성전자 분석 리포트 만들어줘"

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

### 예시 1: 삼성전자 전체 분석

```
User: "삼성전자 분석해줘"
```

Claude가 자동으로 모든 스킬을 실행해서 완전한 리포트를 생성합니다.

### 예시 2: 특정 종목만 분석

```
User: "009150 종목 분석해줘"
```

### 예시 3: 여러 종목 비교

```
User: "삼성전자와 SK하이닉스 비교 분석해줘"
```

## 지원하는 종목

### 내장된 주요 종목 (25개)

**KOSPI:** 삼성전자, SK하이닉스, NAVER, 카카오, 현대차, LG화학, LG전자, 포항홀딩스, 현대모비스, 기아, KB금융, 신한지주, 셀트리온, 삼성물산, 현대중공업, 삼성전기, 삼성SDI, 삼성에스디에스, SK, LG

**KOSDAQ:** 유진로봇, LG에너지솔루션, 삼성SDS, 에코프로, 에코프로비엠, 한국금융지주

다른 종목도 종목코드만 알면 분석할 수 있습니다.

## 시스템 요구사항

- **Claude Code** 또는 **Claude CLI**
- **Python**: 3.7+
- **pip packages**: requests, beautifulsoup4, jinja2, finance-datareader, pandas
- **Node.js**: 16+ (차트 캡처용, 선택사항)
- **OS**: Windows, macOS, Linux

## Claude 스킬이란?

Claude 스킬은 Claude가 특정 작업을 수행하기 위해 사용하는 재사용 가능한 기능 모음입니다:

- **자동화**: 복잡한 멀티스텝 작업을 자동으로 수행
- **통합**: 여러 도구와 API를 연결
- **재사용**: 한 번 작성하면 계속 사용
- **확장**: 새로운 스킬을 쉽게 추가

## 참고 자료

- **KRX (한국거래소)**: http://www.krx.co.kr/main/main.jsp
- **네이버 금융**: https://finance.naver.com/
- **DART (전자공시)**: https://opendart.fss.or.kr/

## 라이선스

MIT License

## 기여

이슈 리포트와 PR 환영합니다!
