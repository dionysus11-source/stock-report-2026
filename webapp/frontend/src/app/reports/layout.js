import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { MobileHeader } from "@/components/mobile-header";

export default function ReportsLayout({ children }) {
    return (
        <>
            <AppSidebar />
            <SidebarInset className="bg-gray-50/30">
                <MobileHeader />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}
