// @ts-nocheck
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  PhoneCall, 
  MessageSquare, 
  ChevronRight, 
  BookOpen, 
  Tag, 
  Sparkles,
  CheckCircle2,
  Share2
} from "lucide-react"
import { getAllBlogs, getBlogByIdOrSlug } from "@/lib/data-service"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { ApplyButton } from "@/components/ui/ApplyButton"

type Params = Promise<{ slug: string }>

export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return (blogs || []).map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogByIdOrSlug(slug);
  
  if (!blog) {
    return { title: "Article Not Found" }
  }

  const pageTitle = blog.seoTitle || `${blog.title} | Direct2Campus`;
  const metaDesc = blog.metaDescription || blog.excerpt || `Read ${blog.title} on Direct2Campus for latest admission insights, cutoffs, and guidance.`;
  const canonical = `https://direct2campus.com/blog/${slug}`;
  const imageUrl = blog.imageUrl || blog.image_url || "/images/blog/default.jpg";
  const authorName = blog.author || "Direct2Campus Editorial Team";

  return {
    title: pageTitle,
    description: metaDesc,
    keywords: [
      ...(Array.isArray(blog.tags) ? blog.tags : []),
      blog.category || "Admission Guide",
      "college admissions",
      "engineering admission",
      "Direct2Campus"
    ],
    authors: [{ name: authorName, url: "https://direct2campus.com" }],
    alternates: { canonical },
    robots: {
      index: blog.published !== false,
      follow: true,
      googleBot: {
        index: blog.published !== false,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "article",
      title: pageTitle,
      description: metaDesc,
      url: canonical,
      siteName: "Direct2Campus",
      locale: "en_IN",
      publishedTime: blog.date,
      authors: [authorName],
      tags: blog.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDesc,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const [blog, allBlogs] = await Promise.all([
    getBlogByIdOrSlug(slug),
    getAllBlogs()
  ]);

  if (!blog) {
    notFound()
  }

  const canonical = `https://direct2campus.com/blog/${slug}`;
  const imageUrl = blog.imageUrl || blog.image_url || "https://direct2campus.com/logo-footer.png";
  const authorName = blog.author || "Direct2Campus Editorial Team";

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
        "name": "Blog",
        "item": "https://direct2campus.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": canonical
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.metaDescription || blog.excerpt || blog.title,
    "image": imageUrl,
    "datePublished": blog.date,
    "dateModified": blog.updatedAt || blog.date,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://direct2campus.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Direct2Campus",
      "url": "https://direct2campus.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://direct2campus.com/logo-footer.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    }
  };

  const otherBlogs = (allBlogs || []).filter(b => b.slug !== slug).slice(0, 3);

  // Helper to render content with markdown headings and lists cleanly
  const renderFormattedContent = (content: string) => {
    if (!content) return null;

    const blocks = content.split('\n\n');

    return blocks.map((block, i) => {
      const trimmed = block.trim();
      
      // H3 heading
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl md:text-2xl font-sora font-bold text-d2c-navy mt-8 mb-4">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // H2 heading
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy mt-10 mb-4 pb-2 border-b border-gray-100">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Bullet lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ul key={i} className="space-y-2.5 my-5 pl-2">
            {items.map((item, j) => {
              const text = item.replace(/^[\*\-]\s+/, '');
              // Parse bold text **bold**
              const parts = text.split(/(\*\*.*?\*\*)/);
              return (
                <li key={j} className="flex items-start gap-3 text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-d2c-royal mt-2.5 shrink-0" />
                  <span>
                    {parts.map((p, k) => {
                      if (p.startsWith('**') && p.endsWith('**')) {
                        return <strong key={k} className="font-bold text-d2c-navy">{p.slice(2, -2)}</strong>;
                      }
                      return p;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ol key={i} className="space-y-3 my-5 pl-2">
            {items.map((item, j) => {
              const cleaned = item.replace(/^\d+\.\s+/, '');
              const parts = cleaned.split(/(\*\*.*?\*\*)/);
              return (
                <li key={j} className="flex items-start gap-3.5 text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-d2c-royal/10 text-d2c-royal font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {j + 1}
                  </span>
                  <span>
                    {parts.map((p, k) => {
                      if (p.startsWith('**') && p.endsWith('**')) {
                        return <strong key={k} className="font-bold text-d2c-navy">{p.slice(2, -2)}</strong>;
                      }
                      return p;
                    })}
                  </span>
                </li>
              );
            })}
          </ol>
        );
      }

      // Standard paragraph
      return (
        <p key={i} className="text-sm md:text-base text-gray-700 leading-relaxed my-4">
          {trimmed.split(/(\*\*.*?\*\*)/).map((p, k) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={k} className="font-bold text-d2c-navy">{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </p>
      );
    });
  };

  return (
    <div className="pb-24 bg-d2c-white min-h-screen font-dm-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hero Header */}
      <div className="bg-d2c-navy pt-32 pb-24 px-4 shadow-xl border-b-4 border-d2c-royal relative overflow-hidden">
        <AnimatedPatternBg opacity={0.1} speed={160} />
        
        <div className="content-boundary relative z-10 max-w-5xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-d2c-sky hover:text-white transition-colors mb-8 text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Articles
          </Link>

          <div>
            {blog.category && (
              <div className="inline-block px-3 py-1 bg-d2c-sky/15 border border-d2c-sky/30 rounded-md text-d2c-sky text-xs font-bold uppercase tracking-widest mb-4">
                {blog.category}
              </div>
            )}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6 leading-[1.15]">
              {blog.title}
            </h1>

            {/* Author and Date bar */}
            <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-d2c-ice/80 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-d2c-royal flex items-center justify-center font-bold text-white">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-semibold text-white">{blog.author || "Direct2Campus Editorial Team"}</span>
              </div>

              {blog.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-d2c-sky" />
                  <span>{blog.date}</span>
                </div>
              )}

              {blog.readTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-d2c-gold" />
                  <span>{blog.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="content-boundary -mt-10 relative z-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Article Body */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Image Card */}
            {blog.imageUrl && (
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-150 bg-white">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>
            )}

            {/* Lead Excerpt */}
            {blog.excerpt && (
              <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-6 md:p-8 rounded-2xl border-l-4 border-d2c-royal shadow-sm">
                <p className="text-base md:text-lg text-d2c-navy font-medium leading-relaxed italic">
                  &ldquo;{blog.excerpt}&rdquo;
                </p>
              </div>
            )}

            {/* Main Article Content */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <div className="prose prose-slate max-w-none">
                {renderFormattedContent(blog.content)}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-150">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-d2c-royal" /> Related Topics:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-d2c-royal/10 hover:text-d2c-royal transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Author Attribution Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-d2c-royal text-white flex items-center justify-center font-bold font-sora text-2xl shrink-0 shadow-md shadow-d2c-royal/20">
                {(blog.author || "D")[0]}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Written By</div>
                <div className="text-base font-sora font-bold text-d2c-navy">{blog.author || "Direct2Campus Editorial Team"}</div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Verified educational counselor and admission specialist providing research-backed guidance on Indian higher education.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="flex flex-col gap-8">
            {/* Admission Counseling CTA Box */}
            <div className="bg-gradient-to-br from-white to-d2c-ice/30 rounded-3xl p-8 shadow-sm border border-d2c-royal/10 flex flex-col text-center">
              <div className="w-14 h-14 bg-d2c-royal text-white rounded-2xl flex items-center justify-center shadow-lg shadow-d2c-navy/10 mx-auto mb-5">
                <Sparkles className="w-7 h-7 text-d2c-gold" />
              </div>
              <h3 className="text-xl font-sora font-bold text-d2c-navy mb-3">Need Admission Guidance?</h3>
              <p className="text-xs md:text-sm text-d2c-muted mb-6 leading-relaxed">
                Connect with our senior counselors at Direct2Campus to explore management quota, cutoff ranks, and direct seat availability in top colleges.
              </p>
              
              <div className="space-y-3">
                <ApplyButton
                  className="block w-full bg-d2c-navy hover:bg-d2c-royal text-white py-3.5 rounded-xl font-bold transition-all shadow-md shadow-d2c-navy/20 text-xs"
                  context={`Blog Counseling: ${blog.title}`}
                >
                  Get Free Counseling
                </ApplyButton>

                <a
                  href="tel:+916200325137"
                  className="block w-full bg-white border border-gray-200 text-d2c-navy py-3 rounded-xl font-bold transition-colors hover:bg-gray-50 text-xs flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-d2c-royal" /> Call Counselor
                </a>

                <a
                  href="https://wa.me/916200325137"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-emerald-50 border border-emerald-200 text-emerald-800 py-3 rounded-xl font-bold transition-colors hover:bg-emerald-100 text-xs flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Expert
                </a>
              </div>
            </div>

            {/* Other Recommended Articles */}
            {otherBlogs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-sm font-sora font-bold text-d2c-navy mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-d2c-royal" /> Recommended Guides
                </h4>
                <div className="divide-y divide-gray-100">
                  {otherBlogs.map((item) => (
                    <Link
                      key={item.id || item.slug}
                      href={`/blog/${item.slug}`}
                      className="py-3.5 block group"
                    >
                      <div className="text-xs font-bold text-d2c-navy group-hover:text-d2c-royal transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1.5 font-medium">
                        <span>{item.category || "Guide"}</span>
                        <span>•</span>
                        <span>{item.readTime || "5 min"}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
