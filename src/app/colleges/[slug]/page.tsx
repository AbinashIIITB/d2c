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

type Params = Promise<{ slug: string }>

export const revalidate = 0;
export const dynamicParams = true;

// Default IEM FAQs fallback
const IEM_DEFAULT_FAQS = [
  {
    question: "What is the admission process for IEM Kolkata in 2026?",
    answer: "The admission process for IEM Kolkata depends on the course and the applicable admission rules. Students should check the current eligibility criteria, entrance examination requirements and counselling procedure before applying. For official information about IEMJEE 2026, visit the IEM official website."
  },
  {
    question: "What is the fee structure of IEM Kolkata for B.Tech?",
    answer: "The total B.Tech fees at IEM Kolkata depend on the course, admission route and applicable fee schedule. Students should confirm the latest tuition fees, admission charges and other applicable expenses with the institute before taking admission. Hostel fees, where applicable, should be checked separately."
  },
  {
    question: "What are the eligibility criteria for B.Tech admission at IEM Kolkata?",
    answer: "Eligibility requirements depend on the engineering programme and the applicable admission route. Students should review the current academic requirements, compulsory subjects, entrance examination criteria and counselling rules before applying. Refer to the official IEM admissions website for current details."
  },
  {
    question: "Is direct admission available at IEM Kolkata?",
    answer: "Admission to IEM Kolkata is subject to the institute's applicable admission rules and eligibility requirements. Students should contact the official admission office to understand the permitted admission routes and available seats. Admission cannot be guaranteed without meeting the required criteria."
  },
  {
    question: "What is the WBJEE cutoff for CSE at IEM Kolkata?",
    answer: "The WBJEE cutoff for Computer Science and Engineering (CSE) at IEM Kolkata can vary each year depending on the candidate's category, counselling round, seat availability and applicable admission route. Students should check the official counselling results and previous-year opening and closing ranks for a realistic estimate."
  },
  {
    question: "What is the average placement package for CSE at IEM Kolkata?",
    answer: "Placement packages vary by academic year, course, employer and individual performance. Students researching IEM Kolkata placements should review the latest official placement report and distinguish CSE-specific figures from institute-wide statistics. Contact the institute for the latest verified average package and placement data."
  },
  {
    question: "Which university is IEM Kolkata affiliated with?",
    answer: "The Institute of Engineering & Management (IEM), Kolkata, is associated with the University of Engineering & Management (UEM), Kolkata, according to the institute's official information. Students should check the current programme-specific affiliation and degree-awarding details before admission."
  },
  {
    question: "Does IEM Kolkata provide hostel facilities?",
    answer: "Yes, IEM lists separate hostel facilities for male and female students. Availability, accommodation arrangements, facilities and fees should be confirmed directly with the institute, as these details may vary."
  },
  {
    question: "Which companies recruit students from IEM Kolkata?",
    answer: "Recruitment opportunities vary by year, programme and employer requirements. IEM has reported recruiters from different sectors, including IT, consulting, finance and other industries. Students should review the latest placement report for the companies that participated in the relevant academic year's recruitment process."
  },
  {
    question: "Where is the IEM Salt Lake campus located?",
    answer: "The IEM Salt Lake admission office is located at Ashram Building, GN-34/2, Sector V, Salt Lake Electronics Complex, Kolkata – 700091, West Bengal. Students should confirm the exact campus or department location before visiting."
  }
];

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

  const isIem = isIEMCollege(college);
  const seo = college.seo || college.contact?.seo || {};

  const primaryDegree = college.courses?.[0] || 'Degree';
  const defaultTitle = isIem 
    ? "IEM Kolkata: Admission, Fees & Placements | Direct2Campus"
    : `${college.name}: Admission, Fees & Placements | Direct2Campus`;
    
  const defaultDesc = isIem
    ? "Explore IEM Kolkata admission, B.Tech courses, fees, eligibility, placements and the application process. Get expert admission guidance from Direct2Campus."
    : `Explore ${college.name} admission, ${primaryDegree} courses, fees, eligibility, placements and the application process. Get expert admission guidance from Direct2Campus.`;
    
  const defaultCanonical = `https://direct2campus.com/colleges/${college.slug || slug}`;

  const pageTitle = seo.seoTitle?.trim() || defaultTitle;
  const metaDesc = seo.metaDescription?.trim() || defaultDesc;
  const canonical = seo.canonicalUrl?.trim() || defaultCanonical;
  
  const keywords = [
    ...(seo.primaryKeyword ? [seo.primaryKeyword] : []),
    ...(Array.isArray(seo.secondaryKeywords) ? seo.secondaryKeywords : [
      `${college.name} admission`, 
      `${college.name} fees`, 
      `${college.name} placement`, 
      `${college.name} admission process`,
      `${college.name} courses fee structure`,
      `${college.name} ${primaryDegree} fees`,
      `${college.name} campus`
    ]),
    college.name, 
    college.type, 
    college.location,
    ...(college.tags || [])
  ];
  const heroAlt = seo.images?.heroAlt || `${college.name} Campus Direct Admission`;
  
  return {
    title: pageTitle,
    description: metaDesc,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: metaDesc,
      url: canonical,
      images: college.imageUrl || college.image_url ? [{ url: college.imageUrl || college.image_url, alt: heroAlt }] : [],
    },
  }
}

export default async function CollegeDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const college = await getCollegeByIdOrSlug(slug);

  if (!college) {
    notFound()
  }

  const isIem = isIEMCollege(college);
  const seo = college.seo || college.contact?.seo || {};
  const sectionHeadings = college.sectionHeadings || seo.sectionHeadings || {};
  const primaryCourse = college.courses?.[0] || 'B.Tech';

  // Universal SEO-Optimized Template Headings for ALL colleges
  const hAdmissions = sectionHeadings.admissions || `${college.name} Admission Process`;
  const hCoursesFees = sectionHeadings.coursesFees || `${college.name} Courses and Fee Structure`;
  const hCoursesFeesSubtitle = sectionHeadings.coursesFeesSubtitle || `${college.name} Admission Fees and Course Fee Structure`;
  const hCourseFeesEligibility = sectionHeadings.btechFeesEligibility || `${college.name} ${primaryCourse} Fees and Eligibility`;
  const hPlacements = sectionHeadings.placements || `${college.name} Placements and Average Package`;
  const hOverview = sectionHeadings.overview || `${college.name} Campus and Location`;
  const hFaqs = sectionHeadings.faqs || `Frequently Asked Questions About ${college.name}`;

  // Uniform Table of Contents structure for ALL colleges
  const sections = [
    { id: "admissions", label: "Admission Process", iconName: "ClipboardList" },
    { id: "courses-fees", label: "Courses & Fees", iconName: "DollarSign" },
    { id: "btech-fees", label: `${primaryCourse} Fees & Eligibility`, iconName: "Shield" },
    { id: "placements", label: "Placements & Packages", iconName: "TrendingUp" },
    { id: "overview", label: "Campus & Location", iconName: "Building2" },
    { id: "infrastructure", label: "Infrastructure", iconName: "Globe" },
    { id: "scholarships", label: "Scholarships", iconName: "Award" },
    { id: "alumni", label: "Alumni", iconName: "Users" },
    { id: "faqs", label: "FAQs", iconName: "HelpCircle" },
  ];

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
          <p className="text-sm text-[#76777d] mt-0.5">Step-by-step guidance for 2026-27 admission session</p>
        </div>

        {college.admissions ? (
          <div className="space-y-10">
            {/* Eligibility */}
            {college.admissions.eligibility && (
              <div>
                <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-5">
                  Eligibility Criteria
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
                <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-6">How to Apply</h3>
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
                  Required Documents
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
            Admissions for {college.name} are conducted through verified counseling quotas and entrance exams. Contact Direct2Campus advisors for direct seat allotment and cutoff guidance.
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
                    <th className="px-6 py-4 text-[11px] font-bold text-[#45464d] uppercase tracking-[0.08em]">Fee Component</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#45464d] uppercase tracking-[0.08em] text-right">Amount</th>
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
              Available Specializations
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
          <p className="text-sm text-[#76777d] mt-0.5">Comprehensive fee schedule, branch cutoffs, and eligibility guidelines</p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">Total Course Fees</span>
            <p className="text-xl font-bold font-sora text-[#3B4CC0] mt-1">{college.fees || "Contact for fees"}</p>
            <span className="text-xs text-[#76777d] mt-1 block">Tuition fee package</span>
          </div>
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">Course Duration</span>
            <p className="text-xl font-bold font-sora text-[#131b2e] mt-1">3 - 4 Years</p>
            <span className="text-xs text-[#76777d] mt-1 block">Full-time programs</span>
          </div>
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">Hostel Facility</span>
            <p className="text-xl font-bold font-sora text-[#131b2e] mt-1">Available</p>
            <span className="text-xs text-[#76777d] mt-1 block">Separate Boys & Girls</span>
          </div>
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#3B4CC0]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#76777d]">Institute Rating</span>
            <p className="text-xl font-bold font-sora text-[#131b2e] mt-1">{college.rating || 4.5} ★</p>
            <span className="text-xs text-[#76777d] mt-1 block">{college.reviews || 200}+ verified reviews</span>
          </div>
        </div>

        {/* Eligibility Breakdown */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-[#131b2e] mb-4">
            Mandatory Eligibility Criteria
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-[#faf8ff] border border-gray-100 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3B4CC0] mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#131b2e]">Academic Qualification</p>
                <p className="text-xs text-[#45464d] mt-0.5">Passed 10+2 Higher Secondary examination or equivalent from a recognized board or council with relevant stream subjects.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8ff] border border-gray-100 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3B4CC0] mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#131b2e]">Minimum Marks Requirement</p>
                <p className="text-xs text-[#45464d] mt-0.5">Minimum 50% - 60% aggregate marks in core subjects (5% relaxation typically applicable for reserved categories).</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8ff] border border-gray-100 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3B4CC0] mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#131b2e]">Entrance Exams Accepted</p>
                <p className="text-xs text-[#45464d] mt-0.5">State entrance examination ranks, national tests (JEE / NEET / CAT / MAT), or institute-level entrance tests.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8ff] border border-gray-100 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3B4CC0] mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#131b2e]">Age & Domicile</p>
                <p className="text-xs text-[#45464d] mt-0.5">Completed 17 years of age as of admission year. State quota benefits subject to domicile criteria.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Cutoff ranks table */}
        {college.cutoffs && college.cutoffs.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-[#131b2e] mb-4">
              Expected Cutoff Ranks
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
                <p className="text-sm text-white/50 mt-0.5">Top recruiters, salary packages, and career statistics</p>
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
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-[0.1em] mb-5">Key Highlights</h3>
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
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-[0.1em] mb-5">Top Corporate Partners</h3>
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
              Official Campus & Admission Location
            </span>
            <p className="font-bold text-[#131b2e] text-base leading-snug">
              {isIem 
                ? "Ashram Building, GN-34/2, Sector V, Salt Lake Electronics Complex"
                : `${college.name} Main Campus, ${college.location}`}
            </p>
            <p className="text-xs text-[#76777d] mt-1">
              {college.location}, {college.state}, India
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 bg-white border-[#3B4CC0]/20 text-[#3B4CC0] hover:bg-[#3B4CC0] hover:text-white transition-all">
            <Link 
              href={`https://maps.google.com/?q=${encodeURIComponent(`${college.name} ${college.location}`)}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <MapPin className="w-4 h-4 mr-2" /> View on Map
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
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Facilities & Infrastructure</h2>
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
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Scholarships & Financial Aid</h2>
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
          <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Alumni Network</h2>
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
                <p className="text-[11px] font-bold text-[#76777d] uppercase tracking-[0.1em] mb-5">Alumni Work At</p>
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
    const rawFaqs = (college.faqs && college.faqs.length > 0) 
      ? college.faqs 
      : (isIem ? IEM_DEFAULT_FAQS : [
          {
            question: `What is the admission procedure for ${college.name}?`,
            answer: `Admission to ${college.name} is conducted through entrance examination scores, centralized counseling, and permitted quota rules. Contact Direct2Campus for step-by-step guidance and document verification.`
          },
          {
            question: `What is the fee structure at ${college.name}?`,
            answer: `The tuition fee structure at ${college.name} is approximately ${college.fees || 'competitive based on specialization'}. Hostel and mess charges are separate where applicable.`
          },
          {
            question: `Does ${college.name} provide campus placement support?`,
            answer: `Yes, ${college.name} has a proactive training and placement cell that connects graduating students with top corporate recruiters and industry partners.`
          },
          {
            question: `Where is ${college.name} located?`,
            answer: `${college.name} is situated in ${college.location}, ${college.state}. Students should verify the exact campus location and department before visiting.`
          }
        ]);

    const faqsList = [
      ...rawFaqs,
      ...((seo.aeoFaqs || []).map((af: any) => ({ question: af.question, answer: af.answer, isAeo: true })))
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

    const ctaHeadline = seo.cta?.headline || "Need Help with Admission?";
    const ctaSubtext = seo.cta?.subtext || `Our expert counselors are ready to guide you through the entire admission process for ${college.name}.`;
    const ctaButtonText = seo.cta?.buttonText || "Talk to Expert";

    return (
      <>
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

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
                    <span className="text-[#f6c804] text-2xl leading-none font-sora">Q</span>
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
              <h3 className="text-lg font-sora font-bold text-d2c-navy">Recommended Direct2Campus Guides</h3>
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
                <Link href="tel:+916200325137">
                  <PhoneCall className="w-5 h-5 mr-2" /> {ctaButtonText}
                </Link>
              </Button>
              <Button variant="outline" asChild className="bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08] h-12 px-6 rounded-xl">
                <Link href="https://wa.me/916200325137" target="_blank">
                  <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp
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
      <CollegeHero college={college} />

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
          <CollegeSidebar collegeName={college.name} sections={sections} />
        </div>
      </div>

      {/* Floating Mobile TOC */}
      <FloatingMobileTOC sections={sections} className="lg:hidden" />
    </div>
  )
}
