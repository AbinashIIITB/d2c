"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { navbarDefaults, type NavbarContent } from "@/content/navbar";
import { footerDefaults, type FooterContent } from "@/content/footer";
import { floatingDefaults, type FloatingContent } from "@/content/floating";

export function ConditionalLayout({
  children,
  navbar = navbarDefaults,
  footer = footerDefaults,
  floating = floatingDefaults,
}: {
  children: React.ReactNode;
  navbar?: NavbarContent;
  footer?: FooterContent;
  floating?: FloatingContent;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 min-h-screen bg-gray-50">{children}</main>;
  }

  return (
    <PageTransitionProvider>
      <Navbar content={navbar} />
      <main className="flex-1">{children}</main>
      <Footer content={footer} />
      <MobileBottomNav content={floating} />
      <FloatingActions content={floating} />
    </PageTransitionProvider>
  );
}

