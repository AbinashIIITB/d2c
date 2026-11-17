// @ts-nocheck
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { 
  MapPin, 
  ArrowLeft, 
  PhoneCall, 
  CheckCircle2, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  ClipboardList, 
  Award, 
  Users, 
  HelpCircle,
  GraduationCap,
  Star,
  MessageSquare,
  Info,
  ChevronRight,
  Download,
  Shield,
  Sparkles,
  BarChart3,
  FileText,
  Globe,
  Zap,
  Link2
} from "lucide-react"
import { getAllColleges, getCollegeByIdOrSlug, isIEMCollege } from "@/lib/data-service"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { ScrollSpyTOC, FloatingMobileTOC } from "@/components/ui/ScrollSpyTOC"
import { CollegeHero } from "@/components/colleges/CollegeHero"
import { CollegeSidebar } from "@/components/colleges/CollegeSidebar"
import { CollegeEnquiryForm } from "@/components/ui/CollegeEnquiryForm"
import { ApplyNowButton } from "@/components/ui/ApplyNowButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getContent } from "@/lib/cms/content"
import { JsonLd } from "@/lib/cms/seo"
import { fill } from "@/lib/record-text"
import { collegeMetadata, collegeSeo } from "@/lib/record-seo"
import type { CollegePageContent } from "@/content/college-page"

type Params = Promise<{ slug: string }>

export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const colleges = await getAllColleges();
  const slugs = new Set<string>();
  (colleges || []).forEach((c) => {
    if (c.slug) slugs.add(c.slug);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const college = await getCollegeByIdOrSlug(slug);
  
  if (!college) {
    return { title: "College Not Found" }
  }

  return collegeMetadata(college);
}

export default async function CollegeDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const [college, content] = await Promise.all([
    getCollegeByIdOrSlug(slug),
    getContent<CollegePageContent>("college-page"),
  ]);

  if (!college) {
    notFound()
  }

  const isIem = isIEMCollege(college);
  const seo = college.seo || college.contact?.seo || {};
  const sectionHeadings = college.sectionHeadings || seo.sectionHeadings || {};
  const primaryCourse = college.courses?.[0] || 'B.Tech';

  // Universal SEO-Optimized Template Headings for ALL colleges (per-college overrides win)
  const hv = { name: college.name, course: primaryCourse };
  const hAdmissions = sectionHeadings.admissions || fill(content.headings.admissions, hv);
  const hCoursesFees = sectionHeadings.coursesFees || fill(content.headings.coursesFees, hv);
  const hCoursesFeesSubtitle = sectionHeadings.coursesFeesSubtitle || fill(content.headings.coursesFeesSubtitle, hv);
  const hCourseFeesEligibility = sectionHeadings.btechFeesEligibility || fill(content.headings.degreeFeesEligibility, hv);
  const hPlacements = sectionHeadings.placements || fill(content.headings.placements, hv);
  const hOverview = sectionHeadings.overview || fill(content.headings.overview, hv);
  const hFaqs = sectionHeadings.faqs || fill(content.headings.faqs, hv);
  const hInfrastructure = sectionHeadings.infrastructure || fill(content.headings.infrastructure, hv);
  const hScholarships = sectionHeadings.scholarships || fill(content.headings.scholarships, hv);
  const hAlumni = sectionHeadings.alumni || fill(content.headings.alumni, hv);

  // Uniform Table of Contents structure for ALL colleges
  const sections = content.toc.map((t) => ({
    id: t.id,
    label: fill(t.label, hv),
    iconName: t.icon,
  }));

  /* ─────────────────────────────────────────────────────────────
     RENDER SECTION HELPERS
  ───────────────────────────────────────────────────────────── */

  // 1. Admission Process Section
  const renderAdmissions = () => (
    <section id="admissions" className="scroll-mt-28">
      <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">
            {hAdmissions}
          </h2>
          <p className="text-sm text-[#76777d] mt-0.5">{content.admissions.subtitle}</p>
        </div>

        {college.admissions ? (
          <div className="space-y-10">
            {/* Eligibility */}
            {college.admissions.eligibility && (
              <div>
                <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-5">
                  {content.admissions.eligibilityTitle}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {college.admissions.eligibility.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#f2f3ff] transition-colors hover:bg-[#dae2fd]">
                      <CheckCircle2 className="w-5 h-5 text-[#3B4CC0] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#131b2e]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-Step — Vertical Timeline */}
            {college.admissions.process && (
              <div className="bg-[#faf8ff] rounded-2xl p-8">
                <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-6">{content.admissions.howToApplyTitle}</h3>
                <div className="space-y-0">
                  {college.admissions.process.map((step: string, idx: number) => (
                    <div key={idx} className="flex gap-5 relative">
                      {idx < college.admissions!.process.length - 1 && (
                        <div className="absolute left-[18px] top-10 bottom-0 w-px bg-gradient-to-b from-[#f6c804]/40 to-[#f6c804]/10" />
                      )}
                      <div className="relative z-10 h-9 w-9 rounded-full bg-gradient-to-br from-[#f6c804] to-[#e5b703] flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(246,200,4,0.4)]">
                        <span className="text-sm font-bold text-[#0B1120]">{idx + 1}</span>
                      </div>
                      <div className="pb-8 last:pb-0 pt-1.5">
                        <p className="text-sm font-semibold text-[#131b2e] leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents */}
            {college.admissions.documents && (
              <div>
                <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-5">
                  {content.admissions.documentsTitle}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {college.admissions.documents.map((doc: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 bg-[#eaedff] text-[#3f465c] font-semibold text-sm rounded-lg hover:bg-[#dae2fd] transition-colors duration-200">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-[#faf8ff] text-sm text-[#45464d] leading-relaxed">
            {fill(content.admissions.fallbackText, hv)}
          </div>
        )}
      </div>
    </section>
  );

  // 2. Courses and Fee Structure
  const renderCoursesFees = () => (
    <section id="courses-fees" className="scroll-mt-28">
      <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">
            {hCoursesFees}
          </h2>
          <p className="text-sm text-[#76777d] mt-0.5">
            {hCoursesFeesSubtitle}
          </p>
        </div>
        
        {college.feesDetails && college.feesDetails.map((category: any, idx: number) => (
          <div key={idx} className="mb-10 last:mb-0">
            <h3 className="text-lg font-bold text-[#131b2e] mb-5 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-[#f6c804]" />
              {category.title}
            </h3>
            <div className="overflow-hidden rounded-xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f2f3ff]">
                    <th className="px-6 py-4 text-[11px] font-bold text-[#45464d] uppercase tracking-[0.08em]">{content.coursesFees.feeComponentHeader}</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#45464d] uppercase tracking-[0.08em] text-right">{content.coursesFees.amountHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items?.map((item: any, i: number) => (
                    <tr key={i} className={`transition-colors duration-200 hover:bg-[#f2f3ff]/60 ${i % 2 === 0 ? 'bg-white' : 'bg-[#faf8ff]'}`}>
                      <td className="px-6 py-4 text-[#131b2e] font-medium">{item.label}</td>
                      <td className="px-6 py-4 text-[#131b2e] font-bold text-right tabular-nums">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {category.note && (
              <p className="mt-4 text-sm text-[#76777d] italic flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 shrink-0" /> {category.note}
              </p>
            )}
          </div>
        ))}

        {college.coursesDetails && college.coursesDetails.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-bold text-[#131b2e] mb-5 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-[#3B4CC0]" />
              {content.coursesFees.specializationsTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {college.coursesDetails.map((course: any, idx: number) => (
                <div key={idx} className="p-5 rounded-xl bg-[#faf8ff] flex justify-between items-center group hover:bg-[#e2e7ff] transition-all duration-300 hover:scale-[1.01]">
                  <div>
                    <p className="font-bold text-[#131b2e] leading-tight">{course.name}</p>
                    <p className="text-[11px] text-[#76777d] mt-1.5 uppercase tracking-[0.06em] font-semibold">{course.duration}</p>
                  </div>
                  <span className="text-[10px] text-[#45464d] font-bold uppercase tracking-[0.08em] px-3 py-1.5 bg-white rounded-lg border border-[#c6c6cd]/30">
                    {course.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );

  // 3. Degree Fees & Eligibility Section
  const renderBTechFeesEligibility = () => (
    <section id="btech-fees" className="scroll-mt-28">
      <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">
            {hCourseFeesEligibility}
          </h2>
          <p className="text-sm text-[#76777d] mt-0.5">{content.degreeFees.subtitle}</p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">{content.degreeFees.totalFees.label}</span>
            <p className="text-xl font-bold font-sora text-[#3B4CC0] mt-1">{college.fees || content.degreeFees.totalFees.fallbackValue}</p>
            <span className="text-xs text-[#76777d] mt-1 block">{content.degreeFees.totalFees.note}</span>
          </div>
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">{content.degreeFees.duration.label}</span>
            <p className="text-xl font-bold font-sora text-[#131b2e] mt-1">{content.degreeFees.duration.value}</p>
            <span className="text-xs text-[#76777d] mt-1 block">{content.degreeFees.duration.note}</span>
          </div>
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">{content.degreeFees.hostel.label}</span>
            <p className="text-xl font-bold font-sora text-[#131b2e] mt-1">{content.degreeFees.hostel.value}</p>
            <span className="text-xs text-[#76777d] mt-1 block">{content.degreeFees.hostel.note}</span>
          </div>
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">{content.degreeFees.rating.label}</span>
            <p className="text-xl font-bold font-sora text-[#131b2e] mt-1">{fill(content.degreeFees.rating.valueTemplate, { rating: college.rating || content.degreeFees.rating.defaultRating })}</p>
            <span className="text-xs text-[#76777d] mt-1 block">{fill(content.degreeFees.rating.noteTemplate, { reviews: college.reviews || content.degreeFees.rating.defaultReviews })}</span>
          </div>
        </div>

        {/* Eligibility Breakdown */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-[#131b2e] mb-4">
            {content.degreeFees.eligibilityTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {content.degreeFees.eligibility.map((card, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#faf8ff] border border-gray-100 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#3B4CC0] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">{card.title}</p>
                  <p className="text-xs text-[#45464d] mt-0.5">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Cutoff ranks table */}
        {college.cutoffs && college.cutoffs.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-[#131b2e] mb-4">
              {content.degreeFees.cutoffsTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.cutoffs.map((co: any, i: number) => (
                <div key={i} className="p-5 rounded-xl bg-[#faf8ff] border border-gray-100">
                  <p className="font-bold text-sm text-[#131b2e] mb-3">{co.title}</p>
                  <div className="space-y-2">
                    {co.table?.map((row: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-gray-100 last:border-0">
                        <span className="font-medium text-[#45464d]">{row.label}</span>
                        <span className="font-bold text-[#3B4CC0]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  {co.description && (
                    <p className="text-[11px] text-[#76777d] mt-3 italic">{co.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );

  // 4. Placements and Packages
  const renderPlacements = () => (
    <section id="placements" className="scroll-mt-28">
      {college.placements && (
        <div className="rounded-[1.25rem] overflow-hidden">
          <div className="bg-[#0B1120] relative p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,76,192,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(246,200,4,0.05),transparent_50%)]" />
            
            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-2xl font-sora font-bold text-white tracking-[-0.01em]">
                  {hPlacements}
                </h2>
                <p className="text-sm text-white/50 mt-0.5">{content.placements.subtitle}</p>
              </div>

              {college.placements.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {college.placements.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-6 rounded-2xl bg-white/[0.04] backdrop-blur-sm text-center border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                        <p className="text-3xl md:text-4xl font-bold font-sora tracking-tight text-[#f6c804] mb-2">
                          {stat.value}
                        </p>
                        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {college.placements.highlights && (
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-[0.1em] mb-5">{content.placements.highlightsTitle}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {college.placements.highlights.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-white/70 text-sm">
                        <Zap className="w-4 h-4 text-[#f6c804] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {college.placements.topRecruiters && (
                <div>
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-[0.1em] mb-5">{content.placements.recruitersTitle}</h3>
                  <div className="space-y-6">
                    {college.placements.topRecruiters.map((group: any, idx: number) => (
                      <div key={idx}>
                        <p className="text-[10px] font-bold text-[#60A5FA] uppercase tracking-[0.15em] mb-3">{group.category}</p>
                        <div className="flex flex-wrap gap-2">
                          {group.companies.map((company: string, i: number) => (
                            <span key={i} className="px-4 py-2 text-sm text-white/70 bg-white/[0.04] rounded-lg border border-white/[0.06] hover:border-[#3B4CC0]/50 hover:text-white hover:bg-white/[0.08] transition-all duration-300 cursor-default">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );

  // 5. Campus and Location / Overview
  const renderOverview = () => (
    <section id="overview" className="scroll-mt-28">
      <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">
            {hOverview}
          </h2>
          <p className="text-sm text-[#76777d] mt-0.5">{college.location}, {college.state}</p>
        </div>
        
        <p className="text-[#45464d] leading-[1.8] text-[1.05rem] whitespace-pre-line">
          {college.about || college.description}
        </p>

        {/* Official Campus & Location Card */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#f2f3ff] to-[#faf8ff] border border-[#3B4CC0]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <span className="text-[10px] font-bold text-[#3B4CC0] uppercase tracking-wider bg-[#3B4CC0]/10 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
              {content.overview.locationBadge}
            </span>
            <p className="font-bold text-[#131b2e] text-base leading-snug">
              {isIem 
                ? content.overview.iemAddress
                : fill(content.overview.campusTemplate, { name: college.name, location: college.location })}
            </p>
            <p className="text-xs text-[#76777d] mt-1">
              {fill(content.overview.addressLine, { location: college.location, state: college.state })}
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 bg-white border-[#3B4CC0]/20 text-[#3B4CC0] hover:bg-[#3B4CC0] hover:text-white transition-all">
            <Link 
              href={`https://maps.google.com/?q=${encodeURIComponent(`${college.name} ${college.location}`)}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <MapPin className="w-4 h-4 mr-2" /> {content.overview.mapButton}
            </Link>
          </Button>
        </div>
        
        {college.highlights && college.highlights.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {college.highlights.map((highlight: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3.5 p-5 rounded-xl bg-[#f2f3ff] transition-colors duration-300 hover:bg-[#e2e7ff] group">
                <div className="p-1.5 rounded-lg bg-[#22c55e]/10 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                </div>
                <span className="text-[#131b2e] font-semibold text-sm leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  // 6. Infrastructure
  const renderInfrastructure = () => (
    <section id="infrastructure" className="scroll-mt-28">
      <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">{hInfrastructure}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {college.infrastructure?.map((item: string, idx: number) => (
            <div key={idx} className="p-5 rounded-xl bg-[#faf8ff] text-center group hover:bg-[#e2e7ff] transition-all duration-300 hover:scale-[1.02]">
              <div className="mx-auto w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <Building2 className="w-5 h-5 text-[#3B4CC0]" />
              </div>
              <span className="text-xs font-bold text-[#131b2e] uppercase tracking-[0.04em] leading-tight block">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 7. Scholarships
  const renderScholarships = () => (
    <section id="scholarships" className="scroll-mt-28">
      <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">{hScholarships}</h2>
        </div>
        {college.scholarships?.map((cat: any, idx: number) => (
          <div key={idx} className="mb-8 last:mb-0">
            <div className="bg-[#f2f3ff] p-7 rounded-xl">
              <h3 className="font-bold text-[#131b2e] mb-5 text-lg">{cat.title}</h3>
              <div className="space-y-4">
                {cat.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-[#45464d]">{item.label}</span>
                    <span className="font-bold text-[#131b2e] tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // 8. Alumni
  const renderAlumni = () => (
    <section id="alumni" className="scroll-mt-28">
      <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-[#3B4CC0]/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="mb-8 relative z-10">
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">{hAlumni}</h2>
        </div>
        {college.alumni && (
          <div className="space-y-8 relative z-10">
            {college.alumni.description && (
              <blockquote className="text-[#45464d] text-lg italic leading-relaxed border-l-4 border-[#f6c804]/40 pl-6">
                {college.alumni.description}
              </blockquote>
            )}
            {college.alumni.companies && (
              <div>
                <p className="text-[11px] font-bold text-[#76777d] uppercase tracking-[0.1em] mb-5">{content.alumni.worksAtLabel}</p>
                <div className="flex flex-wrap gap-3">
                  {college.alumni.companies.map((company: string, idx: number) => (
                    <span key={idx} className="px-5 py-2.5 rounded-lg bg-[#faf8ff] font-bold text-sm text-[#131b2e] hover:bg-[#e2e7ff] transition-all duration-300 cursor-default">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );

  // 9. FAQs + Schema + CTA
  const renderFaqs = () => {
    const fv = {
      name: college.name,
      location: college.location,
      state: college.state,
      fees: college.fees || content.faqs.feesFallback,
    };
    const rawFaqs = (college.faqs && college.faqs.length > 0)
      ? college.faqs
      : (isIem ? content.faqs.iemFaqs : content.faqs.defaultFaqs.map((f) => ({
          question: fill(f.question, fv),
          answer: fill(f.answer, fv),
        })));

    const seenQuestions = new Set<string>();
    const combinedFaqs = [...(seo.aeoFaqs || []), ...rawFaqs];
    const faqsList = combinedFaqs.filter((f: any) => {
      const q = (f.question || '').trim().toLowerCase();
      if (!q || seenQuestions.has(q)) return false;
      seenQuestions.add(q);
      return true;
    });

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

    const collegeUrl = `https://direct2campus.com/colleges/${college.slug || slug}`;
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
          "name": "Colleges",
          "item": "https://direct2campus.com/colleges"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": college.name,
          "item": collegeUrl
        }
      ]
    };

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": college.name,
      "url": collegeUrl,
      "logo": college.logoUrl || college.logo_url,
      "image": college.imageUrl || college.image_url,
      "description": `Comprehensive details, admission process, courses, fees, and placements for ${college.name}.`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": college.location,
        "addressRegion": college.state,
        "addressCountry": "IN"
      }
    };

    const ctaHeadline = seo.cta?.headline || content.cta.headline;
    const ctaSubtext = seo.cta?.subtext || fill(content.cta.subtext, { name: college.name });
    const ctaButtonText = seo.cta?.buttonText || content.cta.button;

    return (
      <>
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={orgSchema} />
        <JsonLd data={faqSchema ?? undefined} seo={collegeSeo(college)} />

        <section id="faqs" className="scroll-mt-28">
          <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#f6c804]/[0.04] rounded-bl-full pointer-events-none" />
            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">
                {hFaqs}
              </h2>
            </div>
            <div className="space-y-4 relative z-10">
              {faqsList.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#faf8ff] hover:bg-[#f2f3ff] transition-colors duration-300">
                  <h3 className="font-bold text-[#131b2e] mb-3 flex items-start gap-3">
                    <span className="text-[#f6c804] text-2xl leading-none font-sora">{content.faqs.questionMark}</span>
                    <span className="pt-1">{faq.question}</span>
                  </h3>
                  <p className="text-[#45464d] text-sm leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────── Recommended Internal Linking ────────────── */}
        {seo.internalLinks && seo.internalLinks.length > 0 && (
          <div className="bg-white rounded-[1.25rem] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-5 h-5 text-d2c-royal" />
              <h3 className="text-lg font-sora font-bold text-d2c-navy">{content.internalLinks.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {seo.internalLinks.map((link: any, idx: number) => (
                <Link
                  key={idx}
                  href={link.targetUrl}
                  className="p-3.5 rounded-xl bg-gray-50 hover:bg-d2c-royal/5 border border-gray-100 hover:border-d2c-royal/20 transition-all group flex items-start justify-between gap-3"
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
          </div>
        )}

        {/* ── Help CTA Block ── */}
        <div className="bg-[#0B1120] rounded-[1.25rem] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,76,192,0.15),transparent_60%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-sora font-bold text-white mb-2">{ctaHeadline}</h3>
              <p className="text-white/50 text-sm">{ctaSubtext}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button asChild className="bg-[#f6c804] hover:bg-[#e5b703] text-[#0B1120] font-bold h-12 px-6 rounded-xl shadow-[0_8px_24px_-4px_rgba(246,200,4,0.3)]">
                <Link href={content.contact.phoneHref}>
                  <PhoneCall className="w-5 h-5 mr-2" /> {ctaButtonText}
                </Link>
              </Button>
              <Button variant="outline" asChild className="bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08] h-12 px-6 rounded-xl">
                <Link href={content.contact.whatsappHref} target="_blank">
                  <MessageSquare className="w-5 h-5 mr-2" /> {content.cta.whatsappButton}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="pb-6 lg:pb-12 min-h-screen bg-[#faf8ff]">
      
      {/* ═══════════════════════════════════════════
          HERO SECTION (Renders H1)
      ═══════════════════════════════════════════ */}
      <CollegeHero college={college} content={content.hero} contact={content.contact} />

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — High-Converting Unified Flow
      ═══════════════════════════════════════════ */}
      <div className="content-boundary mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── Main Content Column (Universal SEO order for all colleges) ── */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {renderAdmissions()}
            {renderCoursesFees()}
            {renderBTechFeesEligibility()}
            {renderPlacements()}
            {renderOverview()}
            {renderInfrastructure()}
            {renderScholarships()}
            {renderAlumni()}
            {renderFaqs()}
          </div>

          {/* ── Sidebar ── */}
          <CollegeSidebar collegeName={college.name} sections={sections} content={content.sidebar} contact={content.contact} tocUi={content.tocUi} />
        </div>
      </div>

      {/* Floating Mobile TOC */}
      <FloatingMobileTOC sections={sections} className="lg:hidden" labels={content.tocUi} />
    </div>
  )
}
