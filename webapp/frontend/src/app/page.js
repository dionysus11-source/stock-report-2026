"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ReportClient } from "@/lib/api";
import { TrendingUp } from "lucide-react";
import ClientOnly from "@/components/utils/client-only";

export default function HomePage() {
  const router = useRouter();

  const { data: dates, isLoading } = useQuery({
    queryKey: ['dates'],
    queryFn: ReportClient.getDates,
  });

  useEffect(() => {
    if (dates && dates.length > 0) {
      router.push(`/reports/${dates[0]}`);
    }
  }, [dates, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-200 animate-pulse">
            <ClientOnly>
              <TrendingUp size={40} />
            </ClientOnly>
          </div>
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-100 border-4 border-white" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Stock Insight</h1>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    </div>
  );
}
