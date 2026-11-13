import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  Calendar, 
  Clock, 
  HelpCircle,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { getPageData, getAllPages, isCorePage } from "@/lib/page-service";
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg";
import { ApplyButton } from "@/components/ui/ApplyButton";

type Params = Promise<{ slug: string }>;

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

// Pre-render known slugs
export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    // Filter out core system pages that already have dedicated route files
    const reservedRoutes = ['home', 'about', 'contact', 'mba', 'privacy', 'terms', 'admin', 'api', 'blog', 'colleges', 'exams', 'stories'];
    return pages
      .filter(p => p.slug && !reservedRoutes.includes(p.slug.toLowerCase()))
      .map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug || '').trim();
  } catch {}

  const page = (await getPageData(decodedSlug)) || (await getPageData(slug));

  if (!page) {
    return { title: "Page Not Found | Direct2Campus" };
  }

  const pageTitle = page.seoTitle || page.title || `${page.h1 || decodedSlug} | Direct2Campus`;
  const metaDesc = page.metaDescription || page.description || `Explore ${page.title || decodedSlug} on Direct2Campus for latest higher education admission insights.`;
  const canonical = page.canonicalUrl || `https://direct2campus.com/${page.slug || decodedSlug}`;
  const isIndexed = page.published !== false && page.noIndex !== true;

  return {
    title: pageTitle,
    description: metaDesc,
    keywords: Array.isArray(page.keywords) ? page.keywords : (page.keywords ? [page.keywords] : ["Direct2Campus", "College Admissions"]),
    alternates: { canonical },
    robots: {
      index: isIndexed,
      follow: isIndexed,
      googleBot: {
        index: isIndexed,
        follow: isIndexed,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: metaDesc,
      url: canonical,
      siteName: "Direct2Campus",
      locale: "en_IN",
      type: "website",
      images: page.featuredImage ? [{ url: page.featuredImage, alt: page.imageAlt || pageTitle }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDesc,
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

export default async function CustomDynamicPage({ params }: { params: Params }) {
  const { slug } = await params;
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug || '').trim();
  } catch {}

  const page = (await getPageData(decodedSlug)) || (await getPageData(slug));

  // If page does not exist or is marked draft and not published
  if (!page || page.published === false) {
    notFound();
  }

  // Schema generation for FAQ if present
  const faqs = Array.isArray(page.faqs) ? page.faqs : [];
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f: any) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://direct2campus.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title || slug,
        "item": `https://direct2campus.com/${slug}`
      }
    ]
  };

  // Content block renderer
  const renderBlock = (block: any, idx: number) => {
    switch (block.type) {
      case 'heading2':
      case 'h2':
        return (
          <h2 key={idx} className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy mt-10 mb-4 border-b border-gray-100 pb-3">
            {block.text}
          </h2>
        );
      case 'heading3':
      case 'h3':
        return (
          <h3 key={idx} className="text-xl md:text-2xl font-sora font-bold text-d2c-royal mt-8 mb-3">
            {block.text}
          </h3>
        );
      case 'paragraph':
      case 'p':
        return (
          <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed my-4">
            {block.text}
          </p>
        );
      case 'image':
        return (
          <figure key={idx} className="my-8">
            <div className="rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg bg-gray-50">
              <img
                src={block.url || block.src}
                alt={block.alt || page.imageAlt || page.title || "Direct2Campus college campus guide"}
                className="w-full max-h-[500px] object-cover transition-transform hover:scale-[1.01] duration-300"
                loading="lazy"
              />
            </div>
            {block.caption && (
              <figcaption className="text-xs text-gray-500 text-center mt-2.5 italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'cta':
        return (
          <div key={idx} className="my-10 p-8 rounded-3xl bg-gradient-to-r from-d2c-navy to-d2c-royal text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-d2c-gold px-3 py-1 rounded-full bg-white/10">
                {block.badge || "Admissions 2026-27"}
              </span>
              <h3 className="text-2xl md:text-3xl font-sora font-bold text-white">
                {block.title || "Take the Next Step Toward Your Future"}
              </h3>
              <p className="text-sm md:text-base text-d2c-ice/85 max-w-2xl leading-relaxed">
                {block.subtitle || "Speak with verified educational advisors to explore approved management quota seats, course cutoffs, and transparent fee structures."}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <ApplyButton
                  className="px-8 py-3.5 bg-d2c-gold hover:bg-yellow-400 text-d2c-navy font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
                  context={block.buttonText || page.title}
                >
                  <PhoneCall className="w-4 h-4 text-d2c-navy" />
                  <span>{block.buttonText || "Get Free Counseling Call"}</span>
                </ApplyButton>
              </div>
            </div>
          </div>
        );
      case 'highlights':
        return (
          <div key={idx} className="my-8 p-6 md:p-8 rounded-3xl bg-blue-50/70 border border-blue-100">
            <h4 className="text-lg font-bold font-sora text-d2c-navy mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-d2c-royal" />
              <span>{block.title || "Key Highlights"}</span>
            </h4>
            <ul className="space-y-3">
              {(block.items || []).map((item: string, iIdx: number) => (
                <li key={iIdx} className="flex items-start gap-3 text-sm md:text-base text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-24 bg-d2c-white min-h-screen font-dm-sans">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header Banner */}
      <div className="bg-d2c-navy pt-32 pb-20 px-4 shadow-xl border-b-4 border-d2c-royal relative overflow-hidden">
        <AnimatedPatternBg opacity={0.1} speed={160} />
        
        <div className="content-boundary relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-d2c-ice/70 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
            <span className="text-white font-semibold truncate max-w-xs">{page.title || slug}</span>
          </nav>

          {page.badge && (
            <div className="inline-block px-3 py-1 bg-d2c-sky/15 border border-d2c-sky/30 rounded-md text-d2c-sky text-xs font-bold uppercase tracking-widest mb-4">
              {page.badge}
            </div>
          )}

          {/* DEDICATED PRIMARY H1 TAG */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6 leading-[1.15]">
            {page.h1 || page.heading || page.title}
          </h1>

          {page.subheading && (
            <p className="text-base md:text-xl text-d2c-ice/90 max-w-3xl leading-relaxed">
              {page.subheading}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-d2c-ice/70 pt-4 mt-6 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-d2c-sky" />
              <span>Verified Session 2026-27</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Government Approved Quota</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="content-boundary -mt-8 relative z-20 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-12 border border-gray-200/80 shadow-xl space-y-8">
          
          {/* Featured Image if present */}
          {page.featuredImage && (
            <figure className="mb-8">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-150">
                <img
                  src={page.featuredImage}
                  alt={page.imageAlt || page.title || "Featured banner"}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>
              {page.imageCaption && (
                <figcaption className="text-xs text-gray-500 text-center mt-2.5 italic">
                  {page.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Structured Sections */}
          {Array.isArray(page.sections) && page.sections.length > 0 && (
            <div className="space-y-6">
              {page.sections.map((block: any, idx: number) => renderBlock(block, idx))}
            </div>
          )}

          {/* Rich Content Fallback */}
          {page.content && (
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed pt-6">
              {page.content.split('\n\n').map((paragraph: string, pIdx: number) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-xl md:text-2xl font-sora font-bold text-d2c-royal mt-8 mb-3">
                      {trimmed.replace(/^###\s+/, '')}
                    </h3>
                  );
                }

                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={pIdx} className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy mt-10 mb-4 border-b border-gray-100 pb-2">
                      {trimmed.replace(/^##\s+/, '')}
                    </h2>
                  );
                }

                if (trimmed.startsWith('# ')) {
                  return (
                    <h1 key={pIdx} className="text-3xl md:text-4xl font-sora font-bold text-d2c-navy mt-8 mb-4">
                      {trimmed.replace(/^#\s+/, '')}
                    </h1>
                  );
                }

                if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n');
                  return (
                    <ul key={pIdx} className="space-y-2 my-4 list-disc pl-6 text-gray-700">
                      {items.map((it, itIdx) => (
                        <li key={itIdx}>{it.replace(/^(\*|-)\s+/, '')}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={pIdx} className="my-4 text-base md:text-lg text-gray-700 leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>
          )}

          {/* FAQs Accordion */}
          {faqs.length > 0 && (
            <section className="pt-10 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-d2c-royal" />
                <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq: any, fIdx: number) => (
                  <details
                    key={fIdx}
                    className="group bg-gray-50 rounded-2xl p-5 border border-gray-200 transition-all open:bg-blue-50/50 open:border-blue-200"
                  >
                    <summary className="font-sora font-bold text-d2c-navy cursor-pointer flex items-center justify-between text-base list-none">
                      <span>{faq.question}</span>
                      <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-200/60 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Floating Inquiry Bar */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-sora font-bold text-lg text-d2c-navy">Need personalized guidance?</h4>
              <p className="text-xs text-gray-500">Contact our senior counseling panel for 100% verified admissions.</p>
            </div>
            <ApplyButton
              className="px-6 py-3 bg-d2c-royal hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              context={`Page Enquiry: ${page.title || slug}`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Free Call</span>
            </ApplyButton>
          </div>

        </div>
      </main>
    </div>
  );
}

