import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { SiteContentProvider } from "@/components/cms/SiteContentProvider";
import { getContents } from "@/lib/cms/content";
import { buildMetadata, JsonLd } from "@/lib/cms/seo";
import { siteDefaults, type SiteContent } from "@/content/site";
import type { NavbarContent } from "@/content/navbar";
import type { FooterContent } from "@/content/footer";
import type { FloatingContent } from "@/content/floating";
import type { ModalsContent } from "@/content/modals";

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

export async function generateViewport(): Promise<Viewport> {
  const { site } = await getContents(["site"]);
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: (site as SiteContent).themeColor || siteDefaults.themeColor,
  };
}

function absoluteUrl(base: string, value: string | undefined): string | undefined {
  if (!value) return undefined;
  return /^https?:\/\//i.test(value) ? value : `${base}${value.startsWith("/") ? "" : "/"}${value}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const { site } = (await getContents(["site"])) as { site: SiteContent };
  const siteUrl = (site.siteUrl || siteDefaults.siteUrl).replace(/\/+$/, "");
  const seo = site.seo || {};
  const x = site.seoExtra || siteDefaults.seoExtra;
  const base = buildMetadata(seo, { path: "/" });

  const meta: Metadata = {
    ...base,
    metadataBase: new URL(siteUrl),
    title: { default: seo.title || siteDefaults.seo.title || "", template: x.titleTemplate || "%s" },
    authors: [{ name: x.authorName, url: x.authorUrl }],
    creator: x.creator,
    publisher: x.publisher,
  };

  if (seo.robots && (typeof seo.robots.index === "boolean" || typeof seo.robots.follow === "boolean")) {
    meta.robots = {
      index: seo.robots.index,
      follow: seo.robots.follow,
      googleBot: {
        index: seo.robots.index,
        follow: seo.robots.follow,
        "max-video-preview": x.googleBotMaxVideoPreview,
        "max-image-preview": x.googleBotMaxImagePreview as "none" | "standard" | "large",
        "max-snippet": x.googleBotMaxSnippet,
      },
    };
  }

  if (base.openGraph || x.ogUrl) {
    const ogImage = seo.og?.image;
    meta.openGraph = {
      ...(seo.og?.type ? { type: seo.og.type } : {}),
      locale: x.ogLocale,
      url: x.ogUrl,
      siteName: x.ogSiteName,
      ...(seo.og?.title ? { title: seo.og.title } : {}),
      ...(seo.og?.description ? { description: seo.og.description } : {}),
      ...(ogImage
        ? { images: [{ url: ogImage, width: x.ogImageWidth, height: x.ogImageHeight, alt: x.ogImageAlt }] }
        : {}),
    } as Metadata["openGraph"];
  }

  if (x.googleVerification && x.googleVerification.trim()) {
    meta.verification = { google: x.googleVerification.trim() };
  }

  return meta;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site, navbar, footer, floating, modals } = (await getContents([
    "site",
    "navbar",
    "footer",
    "floating",
    "modals",
  ])) as {
    site: SiteContent;
    navbar: NavbarContent;
    footer: FooterContent;
    floating: FloatingContent;
    modals: ModalsContent;
  };

  const siteUrl = (site.siteUrl || siteDefaults.siteUrl).replace(/\/+$/, "");
  const org = site.organization || siteDefaults.organization;
  /* ── JSON-LD Structured Data ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": org.type,
    name: site.brand?.name || siteDefaults.brand.name,
    url: siteUrl,
    logo: absoluteUrl(siteUrl, org.logo),
    description: org.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: org.streetAddress,
      addressLocality: org.locality,
      addressRegion: org.region,
      postalCode: org.postalCode,
      addressCountry: org.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: org.contactTelephone,
      contactType: org.contactType,
      areaServed: org.areaServed,
      availableLanguage: org.languages,
    },
    sameAs: (site.social || []).map((s) => s.href).filter((h) => /^https?:\/\//i.test(h)),
  };

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
        <JsonLd seo={site.seo} />
      </head>
      <body className="min-h-full flex flex-col font-dm-sans bg-d2c-white text-d2c-text selection:bg-d2c-royal/30 selection:text-d2c-navy-dark">
        <SiteContentProvider site={site} modals={modals}>
          <GoogleAnalytics ids={site.analytics?.gaIds} enabled={site.analytics?.enabled !== false} />
          <ConditionalLayout navbar={navbar} footer={footer} floating={floating}>
            {children}
          </ConditionalLayout>
        </SiteContentProvider>
      </body>
    </html>
  );
}
