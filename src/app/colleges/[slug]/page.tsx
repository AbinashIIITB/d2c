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
  Images, 
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
  Zap
} from "lucide-react"
import { colleges } from "@/lib/data"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { ScrollSpyTOC, FloatingMobileTOC } from "@/components/ui/ScrollSpyTOC"
import { ImageGallery } from "@/components/ui/image-gallery"
import { CollegeEnquiryForm } from "@/components/ui/CollegeEnquiryForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return colleges.map((college) => ({
    slug: college.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const college = colleges.find(c => c.slug === slug)
  
  if (!college) {
    return { title: "College Not Found" }
  }
  
  return {
    title: `${college.name} - Direct Admission, Fees & Placement | Direct2Campus`,
    description: college.about || college.description,
  }
}

const sections = [
  { id: "overview", label: "Overview", iconName: "Building2" },
  { id: "courses-fees", label: "Courses & Fees", iconName: "DollarSign" },
  { id: "placements", label: "Placements", iconName: "TrendingUp" },
  { id: "admissions", label: "Admissions", iconName: "ClipboardList" },
  { id: "infrastructure", label: "Infrastructure", iconName: "Building2" },
  { id: "scholarships", label: "Scholarships", iconName: "Award" },
  { id: "alumni", label: "Alumni", iconName: "Users" },
  { id: "gallery", label: "Gallery", iconName: "Images" },
  { id: "faqs", label: "FAQs", iconName: "HelpCircle" },
]

export default async function CollegeDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const college = colleges.find(c => c.slug === slug)

  if (!college) {
    notFound()
  }

  return (
    <div className="pb-20 min-h-screen bg-[#faf8ff]">
      
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-[#0B1120]">
        {/* Dark overlays and border */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,76,192,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.06),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 border-b border-white/[0.12] shadow-[0_4px_12px_rgba(0,0,0,0.1)]" />
        <AnimatedPatternBg opacity={0.02} speed={200} />

        <div className="content-boundary relative z-10 pt-28 pb-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <Link href="/colleges" className="text-white/40 hover:text-white/70 transition-colors">Colleges</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-[#f6c804]/80 font-medium truncate max-w-[200px] md:max-w-none">{college.name}</span>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Image — Glassmorphic container */}
            {(college.imageUrl || college.logoUrl) && (
              <div className="relative group shrink-0 mt-2">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#3B4CC0]/40 to-[#f6c804]/20 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-40 w-56 md:h-48 md:w-72 bg-white/[0.08] backdrop-blur-2xl rounded-2xl p-2 border border-white/[0.12] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] overflow-hidden">
                  <img src={college.imageUrl || college.logoUrl} alt={`${college.name} Visual`} className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              {/* Badges row */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.06] backdrop-blur-sm text-white/80 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-white/[0.06]">
                  <Shield className="w-3 h-3 text-[#60A5FA]" />
                  {college.type}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f6c804]/[0.08] backdrop-blur-sm text-[#f6c804] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-[#f6c804]/[0.12]">
                  <Sparkles className="w-3 h-3" />
                  EST. {college.established || "N/A"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.06] backdrop-blur-sm text-white/80 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-white/[0.06]">
                  <Star className="w-3 h-3 fill-[#f6c804] text-[#f6c804]" />
                  {college.rating} ({college.reviews} Reviews)
                </span>
              </div>

              {/* College Name — Display size */}
              <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] font-sora font-bold text-white leading-[1.1] tracking-[-0.02em] mb-5">
                {college.name}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2.5 text-[#60A5FA] mb-8">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">{college.location}, {college.state}</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold h-12 px-8 rounded-xl shadow-[0_8px_24px_-4px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(34,197,94,0.5)] transition-all duration-300 hover:-translate-y-0.5">
                  <Link href="#enquiry-form">
                    <GraduationCap className="w-5 h-5 mr-2" /> Apply Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.08] h-12 px-8 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
                  <Link href="https://wa.me/916200325137" target="_blank">
                    <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Dashboard Bar ── */}
        <div className="relative z-10 mt-6 pb-12">
          <div className="content-boundary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] backdrop-blur-xl">
              {college.placements?.stats?.slice(0, 4).map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center group hover:bg-white/[0.04] transition-colors duration-300">
                  <p className="text-2xl md:text-3xl font-bold font-sora tracking-tight text-[#f6c804] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">
                    {stat.label}
                  </p>
                </div>
              )) || (
                <>
                  <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                    <p className="text-2xl md:text-3xl font-bold font-sora text-[#f6c804] mb-1">{college.rating}★</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Rating</p>
                  </div>
                  <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                    <p className="text-2xl md:text-3xl font-bold font-sora text-[#22c55e] mb-1">{college.type}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Institute Type</p>
                  </div>
                  <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                    <p className="text-2xl md:text-3xl font-bold font-sora text-white mb-1">{college.courses?.length || 0}+</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Programs</p>
                  </div>
                  <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                    <p className="text-2xl md:text-3xl font-bold font-sora text-[#60A5FA] mb-1">{college.fees}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Starting Fee</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — Tonal Layered Layout
      ═══════════════════════════════════════════ */}
      <div className="content-boundary mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── Main Content Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* ────────────── OVERVIEW ────────────── */}
            <section id="overview" className="scroll-mt-28">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="p-3 rounded-xl bg-[#3B4CC0]/[0.08]">
                    <Building2 className="w-6 h-6 text-[#3B4CC0]" />
                  </div>
                  <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">College Overview</h2>
                </div>
                
                <p className="text-[#45464d] leading-[1.8] text-[1.05rem] whitespace-pre-line">
                  {college.about || college.description}
                </p>
                
                {college.highlights && college.highlights.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.highlights.map((highlight, idx) => (
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

            {/* ────────────── COURSES & FEES ────────────── */}
            <section id="courses-fees" className="scroll-mt-28">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="p-3 rounded-xl bg-[#f6c804]/[0.1]">
                    <DollarSign className="w-6 h-6 text-[#b8960a]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Courses & Fee Structure</h2>
                    <p className="text-sm text-[#76777d] mt-0.5">Complete breakdown for all programs</p>
                  </div>
                </div>
                
                {college.feesDetails && college.feesDetails.map((category, idx) => (
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
                          {category.items.map((item, i) => (
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

                {college.coursesDetails && (
                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-[#131b2e] mb-5 flex items-center gap-3">
                      <span className="w-1 h-6 rounded-full bg-[#3B4CC0]" />
                      Available Specializations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {college.coursesDetails.map((course, idx) => (
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

            {/* ────────────── PLACEMENTS ────────────── */}
            <section id="placements" className="scroll-mt-28">
              {/* Stats — Dark immersive block */}
              {college.placements && (
                <div className="rounded-[1.25rem] overflow-hidden">
                  <div className="bg-[#0B1120] relative p-8 md:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,76,192,0.15),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(246,200,4,0.05),transparent_50%)]" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3.5 mb-8">
                        <div className="p-3 rounded-xl bg-[#22c55e]/10">
                          <TrendingUp className="w-6 h-6 text-[#22c55e]" />
                        </div>
                        <h2 className="text-2xl font-sora font-bold text-white tracking-[-0.01em]">Placement & Career Records</h2>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                        {college.placements.stats.map((stat, idx) => (
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

                      {college.placements.highlights && (
                        <div className="mb-10">
                          <h3 className="text-sm font-bold text-white/60 uppercase tracking-[0.1em] mb-5">Key Highlights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {college.placements.highlights.map((item, idx) => (
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
                            {college.placements.topRecruiters.map((group, idx) => (
                              <div key={idx}>
                                <p className="text-[10px] font-bold text-[#60A5FA] uppercase tracking-[0.15em] mb-3">{group.category}</p>
                                <div className="flex flex-wrap gap-2">
                                  {group.companies.map((company, i) => (
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

            {/* ────────────── ADMISSIONS ────────────── */}
            <section id="admissions" className="scroll-mt-28">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="p-3 rounded-xl bg-purple-500/[0.08]">
                    <ClipboardList className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Admission Process</h2>
                </div>

                {college.admissions && (
                  <div className="space-y-10">
                    {/* Eligibility */}
                    <div>
                      <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-5 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#3B4CC0]" /> Eligibility Criteria
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {college.admissions.eligibility.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#f2f3ff] transition-colors hover:bg-[#dae2fd]">
                            <CheckCircle2 className="w-5 h-5 text-[#3B4CC0] shrink-0 mt-0.5" />
                            <span className="text-sm font-medium text-[#131b2e]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-Step — Vertical Timeline */}
                    <div className="bg-[#faf8ff] rounded-2xl p-8">
                      <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-6">How to Apply</h3>
                      <div className="space-y-0">
                        {college.admissions.process.map((step, idx) => (
                          <div key={idx} className="flex gap-5 relative">
                            {/* Timeline Line */}
                            {idx < college.admissions!.process.length - 1 && (
                              <div className="absolute left-[18px] top-10 bottom-0 w-px bg-gradient-to-b from-[#f6c804]/40 to-[#f6c804]/10" />
                            )}
                            {/* Step Number */}
                            <div className="relative z-10 h-9 w-9 rounded-full bg-gradient-to-br from-[#f6c804] to-[#e5b703] flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(246,200,4,0.4)]">
                              <span className="text-sm font-bold text-[#0B1120]">{idx + 1}</span>
                            </div>
                            {/* Step Content */}
                            <div className="pb-8 last:pb-0 pt-1.5">
                              <p className="text-sm font-semibold text-[#131b2e] leading-relaxed">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Required Documents */}
                    <div>
                      <h3 className="text-sm font-bold text-[#45464d] uppercase tracking-[0.08em] mb-5 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#45464d]" /> Required Documents
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {college.admissions.documents.map((doc, idx) => (
                          <span key={idx} className="px-4 py-2 bg-[#eaedff] text-[#3f465c] font-semibold text-sm rounded-lg hover:bg-[#dae2fd] transition-colors duration-200">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ────────────── INFRASTRUCTURE ────────────── */}
            <section id="infrastructure" className="scroll-mt-28">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="p-3 rounded-xl bg-orange-500/[0.08]">
                    <Globe className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Facilities & Infrastructure</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {college.infrastructure?.map((item, idx) => (
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

            {/* ────────────── SCHOLARSHIPS ────────────── */}
            <section id="scholarships" className="scroll-mt-28">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="p-3 rounded-xl bg-indigo-500/[0.08]">
                    <Award className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Scholarships & Financial Aid</h2>
                </div>
                {college.scholarships?.map((cat, idx) => (
                  <div key={idx} className="mb-8 last:mb-0">
                    <div className="bg-[#f2f3ff] p-7 rounded-xl">
                      <h3 className="font-bold text-[#131b2e] mb-5 text-lg">{cat.title}</h3>
                      <div className="space-y-4">
                        {cat.items.map((item, i) => (
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

            {/* ────────────── ALUMNI ────────────── */}
            <section id="alumni" className="scroll-mt-28">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-[#3B4CC0]/[0.03] rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-3.5 mb-8 relative z-10">
                  <div className="p-3 rounded-xl bg-sky-500/[0.08]">
                    <Users className="w-6 h-6 text-sky-600" />
                  </div>
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
                          {college.alumni.companies.map((company, idx) => (
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

            {/* ────────────── GALLERY ────────────── */}
            {college.galleryImages && college.galleryImages.length > 0 && (
              <section id="gallery" className="scroll-mt-28">
                <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className="p-3 rounded-xl bg-rose-500/[0.08]">
                      <Images className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Campus Gallery</h2>
                      <p className="text-sm text-[#76777d] mt-0.5">Take a virtual tour of the campus</p>
                    </div>
                  </div>
                  <ImageGallery images={college.galleryImages} collegeName={college.name} />
                </div>
              </section>
            )}

            {/* ────────────── FAQs ────────────── */}
            <section id="faqs" className="scroll-mt-28">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#f6c804]/[0.04] rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-3.5 mb-8 relative z-10">
                  <div className="p-3 rounded-xl bg-gray-500/[0.08]">
                    <HelpCircle className="w-6 h-6 text-gray-600" />
                  </div>
                  <h2 className="text-2xl font-sora font-bold text-[#131b2e] tracking-[-0.01em]">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4 relative z-10">
                  {college.faqs?.map((faq, idx) => (
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

            {/* ── Help CTA Block ── */}
            <div className="bg-[#0B1120] rounded-[1.25rem] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,76,192,0.15),transparent_60%)]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-sora font-bold text-white mb-2">Need Help with Admission?</h3>
                  <p className="text-white/50 text-sm">Our expert counselors are ready to guide you through the entire admission process for {college.name}.</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button asChild className="bg-[#f6c804] hover:bg-[#e5b703] text-[#0B1120] font-bold h-12 px-6 rounded-xl shadow-[0_8px_24px_-4px_rgba(246,200,4,0.3)]">
                    <Link href="tel:+916200325137">
                      <PhoneCall className="w-5 h-5 mr-2" /> Talk to Expert
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
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-4 h-full">
            <div className="hidden lg:block sticky top-32 space-y-8 mb-8">
              {/* Table of Contents */}
              <ScrollSpyTOC sections={sections} />
              
              {/* Enquiry Form — Premium Glassmorphic */}
              <div id="enquiry-form" className="bg-[#0B1120] rounded-[1.25rem] p-8 relative overflow-hidden shadow-[0_24px_48px_-12px_rgba(11,17,32,0.5)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(246,200,4,0.06),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,76,192,0.1),transparent_50%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f6c804]/30 to-transparent" />
                
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] rounded-lg text-[10px] font-bold tracking-[0.1em] uppercase border border-[#22c55e]/20 mb-4">
                    <Zap className="w-3 h-3" /> Admission Open
                  </span>
                  <h3 className="text-xl font-sora font-bold text-white mb-1.5">Apply for Admission</h3>
                  <p className="text-white/30 text-xs mb-6 leading-relaxed">
                    Enter your details. Our admission counselor will reach out within 24 hours.
                  </p>
                  <CollegeEnquiryForm collegeName={college.name} />
                  
                  <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <PhoneCall className="w-4 h-4 text-[#f6c804]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-bold">Urgent?</p>
                      <Link href="tel:+916200325137" className="text-sm font-bold text-white hover:text-[#f6c804] transition-colors">
                        +91 62003 25137
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Enquiry */}
            <div className="lg:hidden mt-8">
              <div className="bg-[#0B1120] rounded-[1.25rem] p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,76,192,0.1),transparent_60%)]" />
                <div className="relative z-10">
                  <h3 className="text-xl font-sora font-bold text-white mb-6">Enquire Now</h3>
                  <CollegeEnquiryForm collegeName={college.name} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mobile TOC */}
      <FloatingMobileTOC sections={sections} className="lg:hidden" />
      
      {/* Bottom Sticky Action Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#c6c6cd]/20 p-4 lg:hidden flex gap-3 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.1)]">
        <Button asChild className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-xl h-12 shadow-[0_4px_12px_-2px_rgba(34,197,94,0.3)]">
          <Link href="https://wa.me/916200325137" target="_blank">
            <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp
          </Link>
        </Button>
        <Button asChild className="flex-1 bg-[#0B1120] hover:bg-[#1e2a5a] text-white font-bold rounded-xl h-12">
          <Link href="tel:+916200325137">
            <PhoneCall className="w-5 h-5 mr-2" /> Call Now
          </Link>
        </Button>
      </div>
    </div>
  )
}
