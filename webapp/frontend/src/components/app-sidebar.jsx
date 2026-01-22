"use client";

import { useState, useEffect } from "react";
import { Calendar, Search, TrendingUp, ChevronRight, Clock, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ReportClient } from "@/lib/api";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import ClientOnly from "@/components/utils/client-only";

export function AppSidebar() {
    const router = useRouter();
    const params = useParams();
    const selectedDate = params.date;
    const selectedCode = params.code;

    // View mode state: 'date' | 'recent' | 'search'
    const [viewMode, setViewMode] = useState('date');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: dates, isLoading: datesLoading } = useQuery({
        queryKey: ['dates'],
        queryFn: ReportClient.getDates,
    });

    const { isMobile, setOpenMobile } = useSidebar();

    // Query for date-based stocks
    const { data: stocks, isLoading: stocksLoading } = useQuery({
        queryKey: ['reports', selectedDate],
        queryFn: () => ReportClient.getReportsByDate(selectedDate),
        enabled: viewMode === 'date' && !!selectedDate,
    });

    // Query for all stocks (recent mode)
    const { data: allStocks, isLoading: allStocksLoading } = useQuery({
        queryKey: ['all-stocks'],
        queryFn: ReportClient.getAllStocks,
        enabled: viewMode === 'recent',
    });

    // Query for search results
    const { data: searchResults, isLoading: searchLoading } = useQuery({
        queryKey: ['search-stocks', searchQuery],
        queryFn: () => ReportClient.searchStocks(searchQuery),
        enabled: viewMode === 'search' && searchQuery.trim().length > 0,
    });

    const handleDateChange = (e) => {
        router.push(`/reports/${e.target.value}`);
        if (isMobile) setOpenMobile(false);
    };

    const handleStockClick = (code, date) => {
        router.push(`/reports/${date}/${code}`);
        if (isMobile) setOpenMobile(false);
    };

    const getDisplayStocks = () => {
        if (viewMode === 'date') return stocks || [];
        if (viewMode === 'recent') return allStocks || [];
        if (viewMode === 'search') return searchResults || [];
        return [];
    };

    const isLoading = () => {
        if (viewMode === 'date') return stocksLoading;
        if (viewMode === 'recent') return allStocksLoading;
        if (viewMode === 'search') return searchLoading;
        return false;
    };

    return (
        <Sidebar variant="inset" className="border-r border-gray-100 bg-white shadow-sm">
            <SidebarHeader className="p-4 space-y-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                        <ClientOnly><TrendingUp size={20} /></ClientOnly>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        Stock <span className="text-blue-600">Insight</span>
                    </span>
                </div>

                {/* View Mode Tabs */}
                <div className="flex bg-gray-100 p-1.5 rounded-xl gap-1">
                    <button
                        onClick={() => setViewMode('recent')}
                        className={cn(
                            "flex-1 py-2 px-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-0.5",
                            viewMode === 'recent' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <ClientOnly><Clock size={12} /></ClientOnly>
                        <span>Recent</span>
                    </button>
                    <button
                        onClick={() => setViewMode('search')}
                        className={cn(
                            "flex-1 py-2 px-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-0.5",
                            viewMode === 'search' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <ClientOnly><Search size={12} /></ClientOnly>
                        <span>Search</span>
                    </button>
                    <button
                        onClick={() => setViewMode('date')}
                        className={cn(
                            "flex-1 py-2 px-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-0.5",
                            viewMode === 'date' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <ClientOnly><Calendar size={12} /></ClientOnly>
                        <span>Date</span>
                    </button>
                </div>

                {/* Date selector - only show in date mode */}
                {viewMode === 'date' && (
                    <div className="relative group px-2">
                        <ClientOnly><Calendar className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500 opacity-60 transition-opacity group-focus-within:opacity-100" /></ClientOnly>
                        <select
                            value={selectedDate || ""}
                            onChange={handleDateChange}
                            className="w-full appearance-none rounded-xl border-none bg-gray-100 py-2.5 pl-10 pr-10 text-sm font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                        >
                            {!selectedDate && <option value="">Select Date</option>}
                            {dates?.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Search input - only show in search mode */}
                {viewMode === 'search' && (
                    <div className="relative group px-2">
                        <ClientOnly><Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500 opacity-60 transition-opacity group-focus-within:opacity-100" /></ClientOnly>
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search stock code or name..."
                            className="w-full h-10 pl-10 pr-4 bg-gray-100 border-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                )}
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {viewMode === 'date' ? 'Analysed Stocks' : viewMode === 'recent' ? 'Recent Analysis' : 'Search Results'}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1 mt-2">
                            {isLoading() ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <SidebarMenuItem key={i} className="px-4 py-2">
                                        <Skeleton className="h-14 w-full rounded-xl" />
                                    </SidebarMenuItem>
                                ))
                            ) : (
                                getDisplayStocks().map((stock) => {
                                    const stockDate = viewMode === 'date' ? selectedDate : stock.date;
                                    return (
                                    <SidebarMenuItem key={`${stock.stock_code}-${stockDate}`}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={selectedCode === stock.stock_code && selectedDate === stockDate}
                                            className={cn(
                                                "h-14 rounded-2xl transition-all duration-300 group px-4",
                                                selectedCode === stock.stock_code && selectedDate === stockDate
                                                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                                                    : "hover:bg-gray-50 text-gray-600"
                                            )}
                                            onClick={() => handleStockClick(stock.stock_code, stockDate)}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <span className="font-bold text-sm truncate">
                                                        {stock.summary?.name || stock.stock_code}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-medium opacity-60 uppercase tracking-tighter">
                                                            {stock.stock_code}
                                                        </span>
                                                        {viewMode !== 'date' && (
                                                            <span className="text-[9px] font-medium text-blue-500 flex items-center gap-0.5">
                                                                <ClientOnly><Calendar size={10} /></ClientOnly>
                                                                {stock.date}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {selectedCode === stock.stock_code && selectedDate === stock.date ? (
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                                                        <ClientOnly><ChevronRight size={14} strokeWidth={3} /></ClientOnly>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="h-1 w-1 rounded-full bg-blue-400 animate-pulse" />
                                                        <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">DRIVEN</span>
                                                    </div>
                                                )}
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    );
                                })
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
