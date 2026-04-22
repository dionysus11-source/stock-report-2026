#!/usr/bin/env python3
"""
Stock Code Search using Local Database + Web Scraping

종목명으로 종목코드를 검색합니다. 로컬 데이터베이스와 웹 스크래핑을 병행합니다.
"""

import argparse
import sys
import json
from urllib.parse import quote_plus
import os

# 로컬 스톡 코드 데이터베이스 경로
STOCK_DB_PATH = os.path.join(os.path.dirname(__file__), 'stock_codes.json')


def load_local_database():
    """로컬 스톡 코드 데이터베이스 로드"""
    if not os.path.exists(STOCK_DB_PATH):
        return None

    try:
        with open(STOCK_DB_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return None


def save_local_database(data):
    """로컬 스톡 코드 데이터베이스 저장"""
    try:
        with open(STOCK_DB_PATH, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception:
        return False


def search_in_database(keyword, db):
    """데이터베이스에서 검색"""
    if not db:
        return []

    results = []
    keyword_lower = keyword.lower()

    for item in db:
        name = item.get('name', '')
        if keyword_lower in name.lower():
            results.append(item)

    return results


def search_naver_finance(keyword):
    """
    종목명으로 종목코드 검색

    Args:
        keyword: 종목명 키워드 (예: "삼성전자", "유진로봇")

    Returns:
        검색 결과 리스트
    """
    # 1. 먼저 로컬 데이터베이스에서 검색
    db = load_local_database()
    if db:
        results = search_in_database(keyword, db)
        if results:
            return results

    # 2. 로컬 DB에 없거나 검색 실패 시 웹 검색
    try:
        import requests
        from bs4 import BeautifulSoup
    except ImportError:
        print("필요한 라이브러리를 설치해주세요:")
        print("pip install requests beautifulsoup4")
        return []

    try:
        # KRX 전자공시시스템(DART)의 기업정보 검색 활용
        dart_search_url = "https://opendart.fss.or.kr/api/corpCode.json"
        # DART API 인증키가 필요함

        # 대안: FnGuide 또는 다른 금융 사이트 사용
        # investing.com 한국 주식 사용
        search_url = f"https://www.investing.com/equities/korea?&q={quote_plus(keyword)}"

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8'
        }

        response = requests.get(search_url, headers=headers, timeout=10)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            results = []

            # 검색 결과 파싱
            for item in soup.select('[data-symbol]'):
                try:
                    symbol = item.get('data-symbol', '')
                    name = item.get('data-name', item.get_text(strip=True))

                    if symbol and name and keyword.lower() in name.lower():
                        # 한국 종목코드 보통 6자리
                        if len(symbol) <= 6:
                            market = 'KOSPI' if symbol.startswith('0') else 'KOSDAQ'
                            results.append({
                                'code': symbol.zfill(6),
                                'name': name,
                                'market': market,
                                'price': 'N/A',
                                'url': f"https://finance.naver.com/item/main.naver?code={symbol.zfill(6)}"
                            })
                except Exception:
                    continue

            if results:
                # 로컬 DB 업데이트
                if db is None:
                    db = []
                db.extend(results)
                # 중복 제거
                unique_db = list({d['code']: d for d in db}.values())
                save_local_database(unique_db)

                return results

    except Exception as e:
        print(f"검색 중 오류: {e}")

    # 3. 최후의 수단: 알려진 주요 종목코드에서 검색
    return _search_known_stocks(keyword)


def _search_known_stocks(keyword):
    """알려진 주요 종목코드에서 검색 (대체 방법)"""
    known_stocks = [
        # KOSPI 대형주
        {'code': '005930', 'name': '삼성전자', 'market': 'KOSPI'},
        {'code': '000660', 'name': 'SK하이닉스', 'market': 'KOSPI'},
        {'code': '035420', 'name': 'NAVER', 'market': 'KOSPI'},
        {'code': '035720', 'name': '카카오', 'market': 'KOSPI'},
        {'code': '005380', 'name': '현대차', 'market': 'KOSPI'},
        {'code': '051910', 'name': 'LG화학', 'market': 'KOSPI'},
        {'code': '066570', 'name': 'LG전자', 'market': 'KOSPI'},
        {'code': '003670', 'name': '포항홀딩스', 'market': 'KOSPI'},
        {'code': '012330', 'name': '현대모비스', 'market': 'KOSPI'},
        {'code': '000270', 'name': '기아', 'market': 'KOSPI'},
        {'code': '105560', 'name': 'KB금융', 'market': 'KOSPI'},
        {'code': '055550', 'name': '신한지주', 'market': 'KOSPI'},
        {'code': '068270', 'name': '셀트리온', 'market': 'KOSPI'},
        {'code': '028260', 'name': '삼성물산', 'market': 'KOSPI'},
        {'code': '009540', 'name': '현대중공업', 'market': 'KOSPI'},
        {'code': '009150', 'name': '삼성전기', 'market': 'KOSPI'},
        {'code': '006400', 'name': '삼성SDI', 'market': 'KOSPI'},
        {'code': '018260', 'name': '삼성에스디에스', 'market': 'KOSPI'},
        {'code': '034730', 'name': 'SK', 'market': 'KOSPI'},
        {'code': '003550', 'name': 'LG', 'market': 'KOSPI'},
        # KOSDAQ
        {'code': '056080', 'name': '유진로봇', 'market': 'KOSDAQ'},
        {'code': '066975', 'name': 'LG에너지솔루션', 'market': 'KOSDAQ'},
        {'code': '007700', 'name': '삼성SDS', 'market': 'KOSDAQ'},
        {'code': '247540', 'name': '에코프로', 'market': 'KOSDAQ'},
        {'code': '069260', 'name': '에코프로비엠', 'market': 'KOSDAQ'},
        {'code': '194450', 'name': '한국금융지주', 'market': 'KOSDAQ'},
    ]

    keyword_lower = keyword.lower()
    results = []

    for stock in known_stocks:
        if keyword_lower in stock['name'].lower():
            results.append({
                'code': stock['code'],
                'name': stock['name'],
                'market': stock['market'],
                'price': 'N/A',
                'url': f"https://finance.naver.com/item/main.naver?code={stock['code']}"
            })

    return results


def print_results(results, keyword, format='table'):
    """검색 결과 출력"""

    if not results:
        print(f"\n[ERROR] '{keyword}'에 대한 검색 결과가 없습니다.")
        print("종목명을 정확히 입력했는지 확인해주세요.")
        print("\n팁: 전체 종목코드는 KRX 웹사이트에서 확인할 수 있습니다:")
        print("  - KOSPI: http://www.krx.co.kr/main/main.jsp")
        print("  - 네이버 금융: https://finance.naver.com/sise/sise_market_sum.nhn\n")
        return

    # JSON 형식일 때는 결과만 출력 (프로그램적으로 파싱하기 위해)
    if format == 'json':
        print(json.dumps(results, ensure_ascii=False, indent=2))
        return

    # 그 외 형식은 헤더와 함께 출력
    print(f"\n[OK] '{keyword}' 검색 결과 ({len(results)}건):\n")

    if format == 'simple':
        for i, r in enumerate(results, 1):
            print(f"{i}. {r['code']} - {r['name']} ({r['market']})")

    else:  # table
        # 테이블 헤더
        print(f"{'No.':<5} {'종목코드':<10} {'종목명':<20} {'시장':<10} {'현재가':<15}")
        print("=" * 70)

        for i, r in enumerate(results, 1):
            print(f"{i:<5} {r['code']:<10} {r['name']:<20} {r['market']:<10} {r['price']:<15}")

    print()


def main():
    parser = argparse.ArgumentParser(
        description='종목 코드 검색',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
사용 예시:
  python search.py 삼성전자
  python search.py 유진로봇
  python search.py LG --format simple
  python search.py 현대차 --format json > results.json

참고:
  이 도구는 로컬 데이터베이스와 알려진 종목코드를 활용합니다.
  전체 종목코드는 KRX(한국거래소) 웹사이트에서 확인할 수 있습니다.
        '''
    )

    parser.add_argument(
        'keyword',
        type=str,
        help='검색할 종목명 키워드'
    )

    parser.add_argument(
        '--format',
        choices=['table', 'json', 'simple'],
        default='table',
        help='출력 형식 (default: table)'
    )

    parser.add_argument(
        '--save',
        action='store_true',
        help='검색 결과를 JSON 파일로 저장'
    )

    args = parser.parse_args()

    # 검색 실행
    results = search_naver_finance(args.keyword)

    # 결과 출력
    print_results(results, args.keyword, args.format)

    # JSON 파일 저장 (JSON 형식이 아닐 때만 메시지 출력)
    if args.save and results:
        filename = f"search_{args.keyword.replace(' ', '_')}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        if args.format != 'json':
            print(f"검색 결과가 저장되었습니다: {filename}")

    return 0 if results else 1


if __name__ == '__main__':
    sys.exit(main())
