import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Insight Dashboard",
  description: "Advanced AI Stock Analysis Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
