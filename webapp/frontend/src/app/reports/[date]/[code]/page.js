"use client";

import { useQuery } from "@tanstack/react-query";
import { ReportClient } from "@/lib/api";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    Calendar,
    Search,
    ExternalLink,
    BarChart3,
    Newspaper,
    ShieldCheck,
    ArrowUpRight,
    ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import ClientOnly from "@/components/utils/client-only";

export default function ReportDetailPage() {
    const { date, code } = useParams();

    const { data: report, isLoading, error } = useQuery({
        queryKey: ['report', date, code],
        queryFn: () => ReportClient.getReportDetail(date, code),
        enabled: !!date && !!code,
    });

    if (isLoading) return <ReportSkeleton />;
    if (error) return <ReportError message={error.message} />;
    if (!report) return null;

    const fundamental = report.data?.fundamental;
    const technical = report.data?.technical;
    const newsData = report.data?.news?.news || [];
    const images = report.data?.images || [];

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-10">
            {/* Header Section */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                            Verified Analysis
                        </Badge>
                        <div className="flex items-center text-gray-400 text-xs font-bold gap-1.5">
                            <Calendar size={14} className="opacity-50" />
                            {date}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 flex items-center gap-3">
                            {fundamental?.name || code}
                            <a
                                href={`https://www.tossinvest.com/stocks/A${code}/order`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-400 hover:bg-blue-600 hover:text-white transition-all group"
                            >
                                <ArrowUpRight size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </h1>
                        <p className="text-xl font-bold text-gray-300 tracking-[0.2em] uppercase">{code}</p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-blue-600 tracking-tighter">
                            {fundamental?.checked_count || 0}
                        </span>
                        <span className="text-xl font-bold text-gray-200">/ {fundamental?.total_items || 0}</span>
                    </div>
                    <Badge className="bg-blue-600 text-white border-none px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
                        {fundamental?.score_label || "Score"}
                    </Badge>
                </div>
            </motion.header>

            {/* Main Content with Tabs */}
            <Tabs defaultValue="overview" className="w-full space-y-8">
                <TabsList className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto h-auto flex overflow-x-auto justify-start md:justify-center scrollbar-hide px-4 md:px-1.5">
                    <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 font-bold text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all shrink-0">
                        <ClientOnly><TrendingUp size={16} className="mr-2" /></ClientOnly> Overview
                    </TabsTrigger>
                    <TabsTrigger value="fundamental" className="rounded-xl px-6 py-2.5 font-bold text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all shrink-0">
                        <ClientOnly><ShieldCheck size={16} className="mr-2" /></ClientOnly> Fundamental
                    </TabsTrigger>
                    <TabsTrigger value="technical" className="rounded-xl px-6 py-2.5 font-bold text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all shrink-0">
                        <ClientOnly><BarChart3 size={16} className="mr-2" /></ClientOnly> Technical
                    </TabsTrigger>
                    <TabsTrigger value="news" className="rounded-xl px-6 py-2.5 font-bold text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all shrink-0">
                        <ClientOnly><Newspaper size={16} className="mr-2" /></ClientOnly> News Pulse
                    </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                    {/* Overview Tab */}
                    <TabsContent value="overview" key="overview">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            <Card className="md:col-span-2 rounded-[40px] overflow-hidden border-none shadow-2xl shadow-blue-900/5 group relative">
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900/40 to-transparent pointer-events-none z-10" />
                                {images[0] ? (
                                    <img
                                        src={`/images/${date}/${images[0].replace(/\\/g, '/')}`}
                                        alt="Market Chart"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-50 text-gray-300 gap-4">
                                        <Search size={48} className="opacity-20" />
                                        <span className="font-bold uppercase tracking-widest text-sm opacity-40">Initializing Chart...</span>
                                    </div>
                                )}
                            </Card>

                            <div className="space-y-6">
                                <Card className="rounded-[32px] bg-blue-600 border-none shadow-xl shadow-blue-500/20 text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-500" />
                                    <CardHeader className="relative z-10 pb-0">
                                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.25em] opacity-80 mb-4">Invest Decision</CardTitle>
                                    </CardHeader>
                                    <CardContent className="relative z-10 space-y-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-inner">
                                            <TrendingUp size={24} />
                                        </div>
                                        <p className="text-2xl font-black leading-tight">
                                            {fundamental?.action_guidance || "Analysis Required"}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-[32px] border-none shadow-sm bg-white p-6 space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Quick Pulse</h3>
                                    <div className="space-y-3">
                                        <TechnicalIndicator label="Current Price" value={`${technical?.current_price?.toLocaleString() || '-'} KRW`} active />
                                        <TechnicalIndicator label="Bullish Trend" active={technical?.weekly?.ma20_slope_up} />
                                        <TechnicalIndicator label="Golden Cross" active={technical?.daily?.golden_cross} />
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* Fundamental Tab */}
                    <TabsContent value="fundamental" key="fundamental">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            <Card className="rounded-[40px] border-none shadow-sm bg-white p-8 space-y-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900">Health Check</h3>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Financial Discipline</p>
                                    </div>
                                    <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                        <ShieldCheck size={24} />
                                    </div>
                                </div>

                                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {Object.entries(fundamental?.checklist_details || {}).map(([item, passed]) => (
                                        <div key={item} className={cn(
                                            "flex justify-between items-center p-5 rounded-[24px] transition-all",
                                            passed ? "bg-green-50/40" : "bg-red-50/40"
                                        )}>
                                            <span className="text-sm font-bold text-gray-700 leading-snug pr-4">{item}</span>
                                            <div className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center shadow-sm shrink-0",
                                                passed ? "bg-white text-green-500 border border-green-100" : "bg-white text-red-500 border border-red-100"
                                            )}>
                                                {passed ? <CheckIcon /> : <XIcon />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Analysis Text area if needed - could be scaled from report summary */}
                            <div className="space-y-6">
                                <Card className="rounded-[40px] border-none shadow-sm bg-white p-8">
                                    <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-blue-600 rounded-full" />
                                        Investor Notes
                                    </h3>
                                    <div className="prose prose-sm text-gray-600 font-medium leading-relaxed">
                                        {/* Placeholder for future detailed analysis AI commentary */}
                                        AI Agent는 재무제표와 시장 컨센서스를 바탕으로 총 {fundamental?.total_items}개의 체크리스트 항목을 검증하였습니다.
                                        현재 {fundamental?.checked_count}개 조건을 충족하며, 이는 {fundamental?.score_label} 수준의 재무 안정성을 나타냅니다.
                                        상세 모니터링이 필요한 항목들은 위 체크리스트에서 확인할 수 있습니다.
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* Technical Tab */}
                    <TabsContent value="technical" key="technical">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <TechnicalCard
                                    title="Daily Chart Pulse"
                                    indicators={[
                                        { label: "Price Above MA20", active: technical?.daily?.price_above_ma20 },
                                        { label: "Golden Cross", active: technical?.daily?.golden_cross },
                                        { label: "Red Candle (Strength)", active: technical?.daily?.is_red_candle, color: technical?.daily?.is_red_candle ? 'red' : 'blue' }
                                    ]}
                                />
                                <TechnicalCard
                                    title="Weekly Trend Analysis"
                                    indicators={[
                                        { label: "Price Above MA20", active: technical?.weekly?.price_above_ma20 },
                                        { label: "Trend Velocity Up", active: technical?.weekly?.ma20_slope_up },
                                        { label: "Volume Strength", active: true } // Placeholder
                                    ]}
                                    progress={technical?.weekly?.ma20_slope_up ? 85 : 30}
                                />
                            </div>

                            <Card className="rounded-[40px] border-none shadow-sm bg-white overflow-hidden p-0">
                                <div className="aspect-video w-full bg-gray-50 flex items-center justify-center relative group">
                                    {images[1] ? (
                                        <img
                                            src={`/images/${date}/${images[1].replace(/\\/g, '/')}`}
                                            alt="Technical Chart"
                                            className="w-full h-full object-contain p-4 group-hover:scale-[1.02] transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="text-gray-300 font-black uppercase tracking-widest text-xs">Secondary Chart Loading...</div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* News Tab */}
                    <TabsContent value="news" key="news">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-center px-2">
                                <h3 className="text-2xl font-black text-gray-900 italic">Market Pulse News</h3>
                                <Badge variant="outline" className="rounded-full border-gray-200 text-gray-400 font-bold px-3">
                                    {newsData.length} Recent Articles
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {newsData.map((news, i) => (
                                    <Card key={i} className="rounded-[32px] border-none shadow-sm bg-white hover:bg-gray-50/50 transition-all group p-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-100/40 transition-colors" />
                                        <div className="flex flex-col h-full relative z-10">
                                            <a
                                                href={news.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xl font-black text-gray-900 leading-[1.4] mb-8 group-hover:text-blue-600 transition-colors line-clamp-2 underline-offset-4 decoration-gray-100 group-hover:decoration-blue-200"
                                            >
                                                {news.title}
                                            </a>
                                            <div className="mt-auto flex items-center justify-between">
                                                {news.sentiment && (
                                                    <div className={cn(
                                                        "flex items-center px-4 py-2 rounded-2xl font-black text-[10px] tracking-widest uppercase ring-1 ring-inset",
                                                        news.sentiment === 'Positive' ? "bg-green-50 text-green-600 ring-green-100" :
                                                            news.sentiment === 'Negative' ? "bg-red-50 text-red-600 ring-red-100" :
                                                                "bg-gray-50 text-gray-600 ring-gray-100"
                                                    )}>
                                                        <span className="mr-2 text-lg">
                                                            {news.sentiment === 'Positive' ? '😊' : news.sentiment === 'Negative' ? '☹️' : '😐'}
                                                        </span>
                                                        {news.sentiment}
                                                    </div>
                                                )}
                                                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>
                </AnimatePresence>
            </Tabs>
        </div>
    );
}

// Sub components
function TechnicalIndicator({ label, value, active, color = 'blue' }) {
    return (
        <div className="flex items-center justify-between group/item py-1">
            <span className={cn("text-xs font-bold transition-colors", active ? "text-gray-600" : "text-gray-300")}>
                {label}
            </span>
            {value ? (
                <span className="text-xs font-black text-gray-900">{value}</span>
            ) : (
                <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center ring-1 ring-inset transition-all duration-500 shadow-sm",
                    active ? (color === 'red' ? "bg-red-50 text-red-500 ring-red-100" : "bg-blue-50 text-blue-500 ring-blue-100") : "bg-gray-50 text-gray-200 ring-gray-100"
                )}>
                    {active ? <CheckIcon small /> : <XIcon small />}
                </div>
            )}
        </div>
    );
}

function TechnicalCard({ title, indicators, progress }) {
    return (
        <Card className="rounded-[40px] border-none shadow-sm bg-white p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-gray-900">{title}</h3>
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </div>
            <div className="space-y-4">
                {indicators.map((ind, i) => (
                    <TechnicalIndicator key={i} {...ind} />
                ))}
            </div>
            {progress !== undefined && (
                <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span>Trend Momentum</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className={cn("h-full", progress > 50 ? "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]" : "bg-gray-300")}
                        />
                    </div>
                </div>
            )}
        </Card>
    );
}

function CheckIcon({ small }) {
    return (
        <svg width={small ? "10" : "18"} height={small ? "10" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );
}

function XIcon({ small }) {
    return (
        <svg width={small ? "10" : "10"} height={small ? "10" : "10"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
}

function ReportSkeleton() {
    return (
        <div className="max-w-5xl mx-auto p-10 space-y-10 animate-pulse">
            <div className="flex justify-between items-end">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-14 w-64 rounded-2xl" />
                </div>
                <Skeleton className="h-16 w-32 rounded-3xl" />
            </div>
            <Skeleton className="h-[400px] w-full rounded-[40px]" />
        </div>
    );
}

function ReportError({ message }) {
    return (
        <div className="flex h-full items-center justify-center p-10">
            <Card className="max-w-md w-full border-red-100 bg-red-50/50 p-8 rounded-[40px] text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <XIcon />
                </div>
                <h2 className="text-xl font-black text-gray-900">데이터를 불러오지 못했습니다</h2>
                <p className="text-gray-500 font-medium">{message}</p>
            </Card>
        </div>
    );
}
