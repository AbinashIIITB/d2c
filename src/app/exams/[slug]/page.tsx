// @ts-nocheck
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, HelpCircle, AlertCircle, CheckCircle2, FileText, Info, Link2, ChevronRight } from "lucide-react"
import { getAllExams, getExamByIdOrSlug } from "@/lib/data-service"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { ExamApplyButton } from "@/components/ui/ExamApplyButton"
import { ApplyButton } from "@/components/ui/ApplyButton"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const exam = await getExamByIdOrSlug(slug);
  
  if (!exam) {
    return { title: "Exam Not Found" }
  }

  const seo = exam.seo || exam.exam_pattern?.seo || (exam as any).examPattern?.seo || {};
  const pageTitle = seo.seoTitle?.trim() || `${exam.name} – Admission & Pattern Guide 2027`;
  const metaDesc = seo.metaDescription?.trim() || `${(exam.aboutExam || exam.about_exam || exam.description || '').slice(0, 155)}…`;
  const canonical = seo.canonicalUrl?.trim() || `https://direct2campus.com/exams/${slug}`;
  const keywords = [
    ...(seo.primaryKeyword ? [seo.primaryKeyword] : []),
    ...(Array.isArray(seo.secondaryKeywords) ? seo.secondaryKeywords : []),
    exam.name, 
    `${exam.name} exam`, 
    `${exam.name} pattern`, 
    `${exam.name} eligibility`, 
    `${exam.name} cutoff`,
    ...((exam as any).tags || [])
  ];
  const logoAlt = seo.images?.logoAlt || `${exam.name} Logo`;
  
  return {
    title: pageTitle,
    description: metaDesc,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: metaDesc,
      url: canonical,
      images: exam.logoUrl || exam.logo_url ? [{ url: exam.logoUrl || exam.logo_url, alt: logoAlt }] : [],
    },
  }
}

export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const exams = await getAllExams();
  return (exams || []).map((exam) => ({
    slug: exam.slug,
  }))
}

export default async function ExamDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const exam = await getExamByIdOrSlug(slug);

  if (!exam) {
    notFound()
  }

  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-d2c-navy pt-32 pb-32 px-4 shadow-xl border-b-4 border-d2c-royal relative overflow-hidden">
        <AnimatedPatternBg opacity={0.1} speed={160} />
        <div className="content-boundary relative z-10">
          <Link href="/exams" className="inline-flex items-center gap-2 text-d2c-sky hover:text-white transition-colors mb-8 text-sm font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Back to Exams
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-2xl bg-white p-4 shadow-2xl flex-shrink-0 flex items-center justify-center">
              <img src={exam.logoUrl} alt={exam.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-d2c-sky/10 border border-d2c-sky/20 rounded-md text-d2c-sky text-xs font-bold uppercase tracking-widest mb-4">
                Master Guide 2027
              </div>
              <h1 className="text-4xl md:text-6xl font-sora font-bold text-white mb-4 line-tight">
                {exam.name}
              </h1>
              <p className="text-xl text-d2c-ice/90 leading-relaxed max-w-2xl">
                {exam.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-boundary -mt-16 relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50">
              <div className="flex items-center gap-3 text-d2c-muted mb-4 font-semibold uppercase text-xs tracking-wider">
                <Calendar className="w-5 h-5 text-d2c-royal" /> Important Date
              </div>
              <div className="font-sora font-bold text-d2c-navy text-xl leading-tight">{exam.date}</div>
              <p className="text-sm text-d2c-muted mt-2">Check official portal for updates</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50">
              <div className="flex items-center gap-3 text-d2c-muted mb-4 font-semibold uppercase text-xs tracking-wider">
                <BookOpen className="w-5 h-5 text-d2c-success" /> Exam Mode
              </div>
              <div className="font-sora font-bold text-d2c-navy text-xl leading-tight">{exam.examPattern?.mode || "Online (CBT)"}</div>
              <p className="text-sm text-d2c-muted mt-2">{exam.examPattern?.duration || "Standard duration"}</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50">
              <div className="flex items-center gap-3 text-d2c-muted mb-4 font-semibold uppercase text-xs tracking-wider">
                <HelpCircle className="w-5 h-5 text-d2c-gold" /> Application
              </div>
              <ExamApplyButton examName={exam.name} />
              <p className="text-sm text-d2c-muted mt-2">Official Entrance Portal</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Content */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Introduction */}
              <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-6">
                  About the Exam
                </h2>
                <div className="prose prose-slate max-w-none text-d2c-muted leading-relaxed">
                  <p className="mb-6">{exam.introduction}</p>
                  <p>{exam.aboutExam}</p>
                </div>
              </section>

              {/* Exam Pattern */}
              {exam.examPattern && (
                <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-6">
                    Question Paper Pattern
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-d2c-ice/30 p-6 rounded-2xl border border-d2c-royal/5">
                      <div className="text-xs font-bold text-d2c-royal uppercase tracking-widest mb-1">Total Marks</div>
                      <div className="text-2xl font-sora font-bold text-d2c-navy">{exam.examPattern.totalMarks}</div>
                    </div>
                    <div className="bg-d2c-sky/5 p-6 rounded-2xl border border-d2c-sky/10">
                      <div className="text-xs font-bold text-d2c-sky uppercase tracking-widest mb-1">Marking Scheme</div>
                      <div className="text-lg font-semibold text-d2c-navy leading-tight">{exam.examPattern.markingScheme}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-sora font-bold text-d2c-navy">Subject-wise Distribution</h3>
                    <div className="flex flex-wrap gap-3">
                      {exam.examPattern.subjects.map((subject, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 px-5 py-3 rounded-xl shadow-sm font-medium text-d2c-navy flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-d2c-success" /> {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Eligibility */}
              <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-6">
                  Eligibility Criteria
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exam.eligibility.map((item, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-d2c-success/10 text-d2c-success flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">{idx + 1}</div>
                      <span className="text-sm text-d2c-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ────────────── FAQs & AEO Schema Section ────────────── */}
              {(() => {
                const seo = exam.seo || exam.exam_pattern?.seo || (exam as any).examPattern?.seo || {};
                const faqsList = [
                  ...(exam.faqs || []),
                  ...((seo.aeoFaqs || []).map((af: any) => ({ question: af.question, answer: af.answer })))
                ];

                const faqSchema = faqsList.length > 0 ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": faqsList.map((f: any) => ({
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": f.answer
                    }
                  }))
                } : null;

                return (
                  <>
                    {faqSchema && (
                      <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                      />
                    )}

                    {faqsList.length > 0 && (
                      <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-6">
                          Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                          {faqsList.map((faq, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-gray-50/60 border border-gray-100">
                              <h3 className="font-bold text-d2c-navy mb-2 flex items-start gap-2.5">
                                <span className="text-d2c-royal font-sora font-bold">Q.</span>
                                <span>{faq.question}</span>
                              </h3>
                              <p className="text-sm text-d2c-muted leading-relaxed pl-6">
                                {faq.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* ────────────── Recommended Internal Linking ────────────── */}
                    {seo.internalLinks && seo.internalLinks.length > 0 && (
                      <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-6">
                          Recommended Direct2Campus Guides
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {seo.internalLinks.map((link: any, idx: number) => (
                            <Link
                              key={idx}
                              href={link.targetUrl}
                              className="p-4 rounded-2xl bg-gray-50/60 hover:bg-d2c-royal/5 border border-gray-100 hover:border-d2c-royal/20 transition-all group flex items-start justify-between gap-3"
                            >
                              <div>
                                <div className="text-xs font-bold text-d2c-navy group-hover:text-d2c-royal transition-colors">
                                  {link.anchorText}
                                </div>
                                {link.context && (
                                  <div className="text-[11px] text-gray-500 mt-0.5">{link.context}</div>
                                )}
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-d2c-royal group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Right: Sidebar */}
            <div className="flex flex-col gap-8">
              {/* Important Events */}
              <div className="bg-d2c-navy text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-d2c-royal/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h3 className="text-xl font-sora font-bold mb-6 relative z-10">Application Timeline</h3>
                <div className="space-y-6 relative z-10">
                  {exam.importantDates.map((date, idx) => (
                    <div key={idx} className="flex gap-4 items-start pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-d2c-sky" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1">{date.event}</div>
                        <div className="text-xs text-d2c-ice/70">{date.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Card */}
              {(() => {
                const seo = exam.seo || exam.exam_pattern?.seo || (exam as any).examPattern?.seo || {};
                const ctaHeadline = seo.cta?.headline || "Need Admission Help?";
                const ctaSubtext = seo.cta?.subtext || "Management quota and direct admission options are available in top institutes accepting this exam. Get end-to-end counseling support from Akash Talks.";
                const ctaButtonText = seo.cta?.buttonText || "Get Free Counseling";

                return (
                  <div className="bg-gradient-to-br from-white to-d2c-ice/30 rounded-3xl p-8 shadow-sm border border-d2c-royal/10 flex flex-col text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-d2c-navy/5 mx-auto mb-6">
                      <AlertCircle className="w-8 h-8 text-d2c-royal" />
                    </div>
                    <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4">{ctaHeadline}</h2>
                    <p className="text-sm text-d2c-muted mb-8 leading-relaxed">
                      {ctaSubtext}
                    </p>
                    <div className="space-y-3">
                      <ApplyButton 
                        className="block w-full bg-d2c-navy hover:bg-d2c-royal text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-d2c-navy/20"
                        context={`Exam Counseling: ${exam.name}`}
                      >
                        {ctaButtonText}
                      </ApplyButton>
                      <a 
                        href="tel:+916200325137"
                        className="block w-full bg-white border border-gray-200 text-d2c-navy py-4 rounded-xl font-bold transition-colors hover:bg-gray-50"
                      >
                        Call Counselor
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
