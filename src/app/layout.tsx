import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingActions } from "@/components/layout/FloatingActions";
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Direct2Campus - Your Shortcut to the Right Campus",
  description: "Expert educational counselling for B.Tech, MBA, and Medical admissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-dm-sans bg-d2c-white text-d2c-text selection:bg-d2c-royal/30 selection:text-d2c-navy-dark">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <FloatingActions />
      </body>
    </html>
  );
}
