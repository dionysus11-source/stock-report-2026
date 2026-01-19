export default function DatePage({ params }) {
    return (
        <div className="flex h-full items-center justify-center p-8">
            <div className="text-center space-y-4 max-w-sm">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-[28px] flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-tight">선택된 종목이 없습니다</h2>
                <p className="text-gray-500 font-medium">사이드바에서 분석 리포트를 조회할 종목을 선택해주세요.</p>
            </div>
        </div>
    );
}
