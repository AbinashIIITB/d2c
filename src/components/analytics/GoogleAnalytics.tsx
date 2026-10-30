"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_TRACKING_ID, pageview, trackWhatsAppClick, trackPhoneCall } from "@/lib/gtag";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const initialLoadRef = useRef(true);

  // Track pageviews on client-side SPA route transitions (excluding /admin)
  useEffect(() => {
    if (!pathname) return;

    // Skip tracking for admin routes
    if (pathname.startsWith("/admin")) return;

    // On initial page load, the inline script fires the config/pageview.
    // Subsequent client navigations trigger pageview here.
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    pageview(pathname, typeof document !== "undefined" ? document.title : undefined);
  }, [pathname]);

  // Global Delegated Click Tracker for WhatsApp and Phone Calls across ANY page/component
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Ignore clicks inside admin dashboard
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) return;

      const target = (e.target as HTMLElement | null)?.closest("a");
      if (!target || !target.href) return;

      const href = target.href.toLowerCase();

      // Detect WhatsApp clicks
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        const textLabel =
          target.innerText?.trim() ||
          target.getAttribute("title") ||
          target.getAttribute("aria-label") ||
          "WhatsApp Link";

        trackWhatsAppClick({
          location: textLabel,
        });
      }

      // Detect Phone Call clicks
      if (href.startsWith("tel:")) {
        const phone = target.href.replace("tel:", "").trim();
        const textLabel =
          target.innerText?.trim() ||
          target.getAttribute("title") ||
          target.getAttribute("aria-label") ||
          "Phone Call";

        trackPhoneCall({
          location: textLabel,
          phoneNumber: phone,
        });
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Only initialize tracking if not on an admin route
            if (!window.location.pathname.startsWith('/admin')) {
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            }
          `,
        }}
      />
    </>
  );
}
