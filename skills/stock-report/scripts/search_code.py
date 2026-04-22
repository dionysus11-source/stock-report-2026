#!/usr/bin/env python3
"""
Stock Code Search Utility

종목명으로 종목코드를 검색하는 유틸리티
"""

import sys
import argparse

def search_stock_code(keyword):
    """
    종목명으로 종목코드 검색 (FinanceDataReader 사용)

    Args:
        keyword: 종목명 키워드 (예: "삼성전자", "유진로봇")

    Returns:
        검색 결과 리스트
    """
    try:
        import FinanceDataReader as fdr
    except ImportError:
        print("FinanceDataReader를 설치해주세요: pip install finance-datareader")
        return []

    try:
        # KOSPI 종목 목록 가져오기
        print("KOSPI 종목 목록 로딩 중...")
        kospi = fdr.StockListing('KOSPI')
        kospi_results = kospi[kospi['Name'].str.contains(keyword, case=False, na=False)]

        # KOSDAQ 종목 목록 가져오기
        print("KOSDAQ 종목 목록 로딩 중...")
        kosdaq = fdr.StockListing('KOSDAQ')
        kosdaq_results = kosdaq[kosdaq['Name'].str.contains(keyword, case=False, na=False)]

        # 결과 합치기
        results = []

        for _, row in kospi_results.iterrows():
            results.append({
                'code': row['Code'],
                'name': row['Name'],
                'market': 'KOSPI',
                'sector': row.get('Sector', 'N/A'),
                'industry': row.get('Industry', 'N/A')
            })

        for _, row in kosdaq_results.iterrows():
            results.append({
                'code': row['Code'],
                'name': row['Name'],
                'market': 'KOSDAQ',
                'sector': row.get('Sector', 'N/A'),
                'industry': row.get('Industry', 'N/A')
            })

        return results

    except Exception as e:
        print(f"검색 중 오류 발생: {e}")
        return []


def main():
    parser = argparse.ArgumentParser(
        description='종목명으로 종목코드 검색',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python search_code.py 삼성전자
  python search_code.py 유진로봇
  python search_code.py LG
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

    args = parser.parse_args()

    # 검색 실행
    results = search_stock_code(args.keyword)

    if not results:
        print(f"\n❌ '{args.keyword}'에 대한 검색 결과가 없습니다.")
        print("   종목명을 정확히 입력했는지 확인해주세요.")
        return 1

    # 결과 출력
    print(f"\n✅ '{args.keyword}' 검색 결과 ({len(results)}건):\n")

    if args.format == 'json':
        import json
        print(json.dumps(results, ensure_ascii=False, indent=2))

    elif args.format == 'table':
        # 테이블 형식 출력
        print(f"{'종목코드':<10} {'종목명':<20} {'시장':<8} {'섹터':<20}")
        print("=" * 70)
        for r in results:
            print(f"{r['code']:<10} {r['name']:<20} {r['market']:<8} {r['sector']:<20}")

    else:  # simple
        for r in results:
            print(f"{r['code']} - {r['name']} ({r['market']})")

    print()
    return 0


if __name__ == '__main__':
    sys.exit(main())
