"use client";

import { Calendar, Search, TrendingUp, ChevronRight } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSidebar() {
    const router = useRouter();
    const params = useParams();
    const selectedDate = params.date;
    const selectedCode = params.code;

    const { data: dates, isLoading: datesLoading } = useQuery({
        queryKey: ['dates'],
        queryFn: ReportClient.getDates,
    });

    const { data: stocks, isLoading: stocksLoading } = useQuery({
        queryKey: ['reports', selectedDate],
        queryFn: () => ReportClient.getReportsByDate(selectedDate),
        enabled: !!selectedDate,
    });

    return (
        <Sidebar variant="inset" className="border-r border-gray-100 bg-white/50 backdrop-blur-xl">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                        <TrendingUp size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        Stock <span className="text-blue-600">Insight</span>
                    </span>
                </div>

                <div className="relative group px-2">
                    <Calendar className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500 opacity-60 transition-opacity group-focus-within:opacity-100" />
                    <select
                        value={selectedDate || ""}
                        onChange={(e) => router.push(`/reports/${e.target.value}`)}
                        className="w-full appearance-none rounded-xl border-none bg-gray-100/50 py-2.5 pl-10 pr-10 text-sm font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                    >
                        {!selectedDate && <option value="">Select Date</option>}
                        {dates?.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Analysed Stocks
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1 mt-2">
                            {stocksLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <SidebarMenuItem key={i} className="px-4 py-2">
                                        <Skeleton className="h-10 w-full rounded-xl" />
                                    </SidebarMenuItem>
                                ))
                            ) : (
                                stocks?.map((stock) => (
                                    <SidebarMenuItem key={stock.stock_code}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={selectedCode === stock.stock_code}
                                            className={cn(
                                                "h-14 rounded-2xl transition-all duration-300 group px-4",
                                                selectedCode === stock.stock_code
                                                    ? "bg-blue-600/5 text-blue-700 shadow-sm ring-1 ring-blue-100/50"
                                                    : "hover:bg-gray-50 text-gray-600"
                                            )}
                                            onClick={() => router.push(`/reports/${selectedDate}/${stock.stock_code}`)}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <span className="font-bold text-sm truncate">
                                                        {stock.summary?.name || stock.stock_code}
                                                    </span>
                                                    <span className="text-[10px] font-medium opacity-60 uppercase tracking-tighter">
                                                        {stock.stock_code}
                                                    </span>
                                                </div>
                                                {selectedCode === stock.stock_code ? (
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                                                        <ChevronRight size={14} strokeWidth={3} />
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
                                ))
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
