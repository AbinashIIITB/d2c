import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://direct2campus.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1128",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Direct2Campus – Your Shortcut to the Right Campus",
    template: "%s | Direct2Campus",
  },
  description:
    "India's trusted educational consultancy for direct B.Tech, MBBS, MBA & BDS admissions. Compare 150+ colleges, check eligibility & get expert counselling.",
  keywords: [
    "direct admission",
    "B.Tech admission",
    "MBBS admission",
    "MBA admission",
    "management quota",
    "college admission India",
    "engineering colleges India",
    "medical colleges India",
    "Direct2Campus",
    "admission counselling",
  ],
  authors: [{ name: "Direct2Campus", url: SITE_URL }],
  creator: "Direct2Campus",
  publisher: "Direct2Campus",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Direct2Campus",
    title: "Direct2Campus – Your Shortcut to the Right Campus",
    description:
      "India's trusted educational consultancy for direct B.Tech, MBBS, MBA & BDS admissions. Compare 150+ colleges & get expert counselling.",
    images: [
      {
        url: "/logo-footer.png",
        width: 1200,
        height: 630,
        alt: "Direct2Campus – Premium Educational Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Direct2Campus – Your Shortcut to the Right Campus",
    description:
      "India's trusted educational consultancy for direct B.Tech, MBBS, MBA & BDS admissions.",
    images: ["/logo-footer.png"],
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Direct2Campus",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-footer.png`,
  description:
    "India's trusted educational consultancy for direct B.Tech, MBBS, MBA & BDS admissions.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "GN-34/1, Aurora Water Front, Unit 21, 11th Floor, Sector V, Salt Lake",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700091",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-62003-25137",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
