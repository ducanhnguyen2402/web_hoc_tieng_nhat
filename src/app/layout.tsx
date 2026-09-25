import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/ThemeProvider";
import { TextSizeProvider } from "@/components/TextSizeProvider";
import { FuriganaProvider } from "@/components/FuriganaProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Học Tiếng Nhật",
  description: "Nền tảng học tiếng Nhật trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${notoSansJP.variable} font-sans min-h-screen flex flex-col antialiased bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TextSizeProvider>
              <FuriganaProvider>
                <Header />
                <main className="flex-1 flex flex-col">
                  {children}
                </main>
                <Footer />
                <Toaster position="top-right" richColors />
              </FuriganaProvider>
            </TextSizeProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
