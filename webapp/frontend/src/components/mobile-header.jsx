"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { TrendingUp, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import ClientOnly from "@/components/utils/client-only";

export function MobileHeader() {
    const params = useParams();
    const { date, code } = params;

    return (
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-white/80 px-4 backdrop-blur-md md:hidden">
            <SidebarTrigger />
            <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                    <ClientOnly><TrendingUp size={16} /></ClientOnly>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 min-w-0">
                    <span className="truncate max-w-[80px]">{date}</span>
                    {code && (
                        <>
                            <ChevronRight size={12} className="shrink-0 opacity-40" />
                            <span className="font-bold text-gray-900 truncate">{code}</span>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
