import type { Metadata } from 'next';
import type { SeoFields } from '@/lib/cms/types';
import { buildMetadata } from '@/lib/cms/seo';

/**
 * Metadata for the IEM landing pages. Uses buildMetadata, then restores the details the
 * generic SeoFields shape cannot express but the live pages have always emitted:
 * the googlebot directives and the og site name / locale / image size / image alt.
 */
export function buildIemMetadata(seo: SeoFields | undefined, ogImageAlt: string | undefined, path?: string): Metadata {
  const base = buildMetadata(seo, { path });
  const meta: Metadata = { ...base };

  if (seo?.title) meta.title = seo.title; // plain string so the root "%s | Direct2Campus" template applies, as today

  if (base.robots && typeof base.robots === 'object') {
    meta.robots = {
      ...base.robots,
      googleBot: {
        index: seo?.robots?.index ?? true,
        follow: seo?.robots?.follow ?? true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    };
  }

  if (base.openGraph || seo?.og) {
    const image = seo?.og?.image;
    meta.openGraph = {
      ...(base.openGraph ?? {}),
      title: seo?.og?.title ?? base.openGraph?.title ?? undefined,
      description: seo?.og?.description ?? base.openGraph?.description ?? undefined,
      url: seo?.canonical,
      siteName: 'Direct2Campus',
      locale: 'en_IN',
      type: seo?.og?.type ?? 'website',
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: ogImageAlt }] } : {}),
    } as unknown as Metadata['openGraph'];
  }

  return meta;
}
