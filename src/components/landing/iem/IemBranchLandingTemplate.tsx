import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  FileCheck2, 
  HelpCircle, 
  Briefcase, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { IemEnquiryForm } from './IemEnquiryForm';
import { AnimatedPatternBg } from '@/components/ui/AnimatedPatternBg';

export interface BranchPageConfig {
  branchName: string;
  shortBranch: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  h1: string;
  heroCopy: string;
  aboutProgramme: string;
  whyExplore: string;
  eligibilityCopy: string;
  admissionProcessCopy: string;
  feesCopy: string;
  careerOpportunities: string[];
  faqs: { q: string; a: string }[];
  relatedBranches: { name: string; url: string }[];
  altCampus: string;
  altLab: string;
}

export function IemBranchLandingTemplate({ config }: { config: BranchPageConfig }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://direct2campus.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Colleges',
        item: 'https://direct2campus.com/colleges'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'IEM Kolkata',
        item: 'https://direct2campus.com/colleges/iem-saltlake'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'B.Tech Admission 2027',
        item: 'https://direct2campus.com/btech-direct-admission-in-iem-kolkata'
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: `${config.shortBranch} Direct Admission`,
        item: `https://direct2campus.com/${config.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-d2c-white font-dm-sans text-gray-800 antialiased selection:bg-d2c-royal selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO SECTION */}
      <header className="bg-gradient-to-b from-d2c-navy via-[#0d223f] to-d2c-navy pt-28 md:pt-36 pb-20 px-4 relative overflow-hidden border-b-4 border-d2c-royal shadow-xl">
        <AnimatedPatternBg opacity={0.12} speed={140} />
        
        <div className="content-boundary relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center flex-wrap gap-2 text-xs text-d2c-ice/70 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
            <Link href="/colleges/iem-saltlake" className="hover:text-white transition-colors">IEM Kolkata</Link>
            <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
            <Link href="/btech-direct-admission-in-iem-kolkata" className="hover:text-white transition-colors">B.Tech 2027</Link>
            <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
            <span className="text-white font-semibold truncate max-w-xs">{config.shortBranch} Admission</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-d2c-royal/20 border border-d2c-royal/40 text-d2c-sky text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-d2c-gold" />
                <span>2027 Engineering Specialisation Guide</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-5xl font-sora font-bold text-white tracking-tight leading-[1.18]">
                {config.h1}
              </h1>

              <p className="text-sm md:text-base text-d2c-ice/90 leading-relaxed max-w-2xl">
                {config.heroCopy}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#admission-enquiry"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-d2c-gold to-yellow-400 hover:from-yellow-400 hover:to-d2c-gold text-d2c-navy font-sora font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 uppercase tracking-wide"
                >
                  <GraduationCap className="w-4 h-4 text-d2c-navy" />
                  <span>ENQUIRE FOR {config.shortBranch} ADMISSION</span>
                </a>

                <a
                  href="#eligibility"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sora font-semibold text-xs md:text-sm transition-all flex items-center gap-2 backdrop-blur-sm uppercase tracking-wide"
                >
                  <span>CHECK ELIGIBILITY</span>
                  <ChevronRight className="w-4 h-4 text-d2c-sky" />
                </a>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                <div className="rounded-2xl overflow-hidden relative aspect-video sm:aspect-[4/3] bg-gray-900 border border-white/10">
                  <img
                    src="/images/colleges/iem-saltlake.jpg"
                    alt={config.altCampus}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-d2c-navy/90 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-d2c-gold">{config.shortBranch} Programme</p>
                      <p className="text-white font-sora font-bold text-base sm:text-lg">Institute of Engineering & Management</p>
                      <p className="text-xs text-d2c-ice/80">Kolkata Campus (Intake 2027)</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-d2c-ice/90 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>Degree:</span>
                    <span className="font-semibold text-white">4-Year Full-Time B.Tech</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Approved Quota Routes:</span>
                    <span className="font-semibold text-emerald-400">IEMJEE / WBJEE / JEE Main</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Advisory Bar */}
      <div className="bg-amber-50/80 border-b border-amber-200 py-3 px-4 text-center">
        <p className="text-xs text-amber-900 max-w-4xl mx-auto leading-relaxed">
          <strong>Transparency Notice:</strong> Direct2Campus is an educational guidance service. The term &quot;Direct Admission&quot; indicates candidate enquiry intent. Admission is governed exclusively by IEM Kolkata through prescribed selection criteria. Direct2Campus does not promise guaranteed seats or unofficial routes.
        </p>
      </div>

      <main className="content-boundary max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* ABOUT THE PROGRAMME */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Academic Overview</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              About the {config.branchName} Programme
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="md:col-span-8 space-y-4">
              <p>{config.aboutProgramme}</p>
              
              <h3 className="font-sora font-bold text-lg text-d2c-navy pt-2">Why Explore This Programme?</h3>
              <p>{config.whyExplore}</p>
            </div>

            <div className="md:col-span-4 bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-4">
              <h4 className="font-sora font-bold text-base text-d2c-navy flex items-center gap-2">
                <Building2 className="w-4 h-4 text-d2c-royal" />
                <span>Programme Highlights</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Affiliated to MAKAUT & Approved by AICTE</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Industry-Aligned Laboratory Curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Capstone Project & Internship Assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dedicated Career Development Support</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-gray-200">
                <Link
                  href="/btech-direct-admission-in-iem-kolkata"
                  className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1"
                >
                  <span>Compare All B.Tech Branches</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ELIGIBILITY SECTION */}
        <section id="eligibility" className="scroll-mt-28 bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200/80 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">2027 Guidelines</span>
            <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              Eligibility for 2027 Admission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm text-gray-700 leading-relaxed">
            <div className="md:col-span-8 space-y-4">
              <p>{config.eligibilityCopy}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                  <span className="font-bold text-d2c-navy block mb-1">Qualifying Examination</span>
                  <span>10+2 / Class 12 / Higher Secondary from recognized board</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                  <span className="font-bold text-d2c-navy block mb-1">Subject Combination</span>
                  <span>Compulsory Physics & Mathematics + Chemistry / Tech subject</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center items-start space-y-3">
              <a
                href="#admission-enquiry"
                className="w-full py-3.5 px-6 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white font-sora font-bold text-xs text-center transition-all shadow-md"
              >
                CHECK YOUR ELIGIBILITY
              </a>
              <p className="text-[11px] text-gray-500 text-center w-full">
                Get your Class 12 scorecard reviewed by our counselor.
              </p>
            </div>
          </div>
        </section>

        {/* ADMISSION PROCESS & FEES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Process Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-d2c-royal" />
              <span>Admission Process</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {config.admissionProcessCopy}
            </p>
            <ol className="space-y-2 text-xs text-gray-700 pt-2 list-decimal pl-4">
              <li>Confirm branch availability and 2027 intake with IEM.</li>
              <li>Register for IEMJEE 2027 at exam.iem.edu.in or apply via WBJEE.</li>
              <li>Participate in official counseling and seat verification.</li>
              <li>Complete provisional enrollment and secure fee submission.</li>
            </ol>
          </div>

          {/* Fees Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-d2c-royal" />
              <span>Fees & Payment Information</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {config.feesCopy}
            </p>
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/colleges/iem-saltlake"
                className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1"
              >
                <span>View IEM Kolkata Courses and Fees</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CAREER OPPORTUNITIES */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Career Pathways</span>
            <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-d2c-royal" />
              <span>Career Opportunities for {config.shortBranch} Graduates</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Illustrative professional trajectories based on core industry specialisations and hands-on project work.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs md:text-sm">
            {config.careerOpportunities.map((career, cIdx) => (
              <div key={cIdx} className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-gray-800">{career}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION — ADMISSION ENQUIRY FORM */}
        <IemEnquiryForm
          sectionId="admission-enquiry"
          defaultCourse="B.Tech"
          defaultBranch={config.branchName}
          title={`Enquire About ${config.branchName} Admission`}
          subtitle="Share your details and preferred programme. A Direct2Campus representative can help you understand the published admission information and next steps."
        />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Branch FAQs</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy flex items-center gap-2.5">
              <HelpCircle className="w-7 h-7 text-d2c-royal" />
              <span>Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {config.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl p-5 border border-gray-200 transition-all open:bg-blue-50/40 open:border-blue-200 shadow-sm"
              >
                <summary className="font-sora font-bold text-d2c-navy cursor-pointer flex items-center justify-between text-base list-none">
                  <span>{faq.q}</span>
                  <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 group-open:rotate-180 transition-transform text-xs">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-200/60 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CROSS-PAGE INTERNAL LINKING MATRIX */}
        <section className="border-t border-gray-200 pt-12 space-y-6">
          <div className="space-y-1">
            <h3 className="font-sora font-bold text-lg text-d2c-navy">Related IEM Admission Pages</h3>
            <p className="text-xs text-gray-500">Explore sibling engineering branches and college resources.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/btech-direct-admission-in-iem-kolkata"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>IEM B.Tech Hub 2027</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/colleges/iem-saltlake"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>IEM Courses & Fees</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            {config.relatedBranches.map((rel, rIdx) => (
              <Link
                key={rIdx}
                href={rel.url}
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
              >
                <span>{rel.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            ))}
          </div>
        </section>

        {/* FINAL CALL TO ACTION BANNER */}
        <section className="bg-gradient-to-r from-d2c-navy via-d2c-royal to-blue-900 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-sora font-bold text-white">
              Planning to Apply for {config.branchName} at IEM Kolkata?
            </h3>
            <p className="text-xs md:text-sm text-d2c-ice/85 max-w-xl">
              Submit your enquiry to discuss the programme, eligibility checks, cutoff scores, and official application steps with an advisor.
            </p>
          </div>
          <a
            href="#admission-enquiry"
            className="px-8 py-3.5 rounded-xl bg-d2c-gold hover:bg-yellow-400 text-d2c-navy font-sora font-bold text-xs md:text-sm transition-all shadow-md shrink-0 uppercase tracking-wide"
          >
            ENQUIRE NOW
          </a>
        </section>

      </main>
    </div>
  );
}
