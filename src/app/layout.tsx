import type { Metadata } from "next";
import "./globals.css";
import SidebarNav from "@/components/navigation/sidebar-nav";
import BottomNav from "@/components/navigation/bottom-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Budget",
  description: "A simple budget tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
       <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <SidebarNav />
              <div className="flex-1">
                <div className="flex flex-col min-h-screen mx-auto md:max-w-4xl lg:max-w-5xl">
                  <main className="flex-1 pb-16 md:pb-0">{children}</main>
                  <BottomNav />
                </div>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
