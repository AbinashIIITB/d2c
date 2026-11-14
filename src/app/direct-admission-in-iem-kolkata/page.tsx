import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  Building2, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Laptop, 
  Award, 
  ArrowRight, 
  ExternalLink, 
  HelpCircle, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { IemEnquiryForm } from '@/components/landing/iem/IemEnquiryForm';
import { AnimatedPatternBg } from '@/components/ui/AnimatedPatternBg';

export const metadata: Metadata = {
  title: 'Direct Admission in IEM Kolkata 2027 – Courses & Eligibility',
  description: 'Looking for admission in IEM Kolkata? Explore B.Tech, BBA, BCA and MBA courses, eligibility, admission process and expert admission guidance with Direct2Campus.',
  keywords: [
    'Direct Admission in IEM Kolkata',
    'IEM Kolkata Admission 2027',
    'IEM Kolkata B.Tech Admission',
    'IEM Kolkata BBA Admission',
    'IEM Kolkata BCA Admission',
    'IEM Kolkata MBA Admission'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/direct-admission-in-iem-kolkata'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    title: 'Direct Admission in IEM Kolkata 2027 – Courses & Eligibility',
    description: 'Explore undergraduate and postgraduate admissions at IEM Kolkata for 2027. Review B.Tech, BBA, BCA and MBA courses, eligibility, and counseling steps.',
    url: 'https://direct2campus.com/direct-admission-in-iem-kolkata',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata Admission Guidance' }]
  }
};

const COURSES = [
  {
    id: 'btech',
    name: 'B.Tech (Bachelor of Technology)',
    duration: '4 Years (8 Semesters)',
    icon: GraduationCap,
    badge: 'Flagship Engineering',
    color: 'from-blue-600 to-d2c-navy',
    description: 'Four-year undergraduate engineering degree in CSE, AI/ML, IT, ECE, Electrical and Mechanical engineering affiliated with MAKAUT and approved by AICTE.',
    link: '/btech-direct-admission-in-iem-kolkata',
    ctaBranch: 'Computer Science & Engineering (CSE)',
    ctaCourse: 'B.Tech'
  },
  {
    id: 'bba',
    name: 'BBA (Bachelor of Business Administration)',
    duration: '3 Years (6 Semesters)',
    icon: Briefcase,
    badge: 'Undergraduate Management',
    color: 'from-purple-600 to-indigo-900',
    description: 'Foundational business administration curriculum covering marketing, financial analytics, human resources and business entrepreneurship.',
    link: '/bba-admission-iem-2027',
    ctaBranch: 'Business Administration',
    ctaCourse: 'BBA'
  },
  {
    id: 'bca',
    name: 'BCA (Bachelor of Computer Applications)',
    duration: '3 Years (6 Semesters)',
    icon: Laptop,
    badge: 'IT & Software Foundations',
    color: 'from-emerald-600 to-teal-900',
    description: 'Comprehensive software development, web architecture, database management and application programming degree for tech aspirants.',
    link: '/bca-admission-iem-2027',
    ctaBranch: 'Computer Applications',
    ctaCourse: 'BCA'
  },
  {
    id: 'mba',
    name: 'MBA (Master of Business Administration)',
    duration: '2 Years (4 Semesters)',
    icon: Award,
    badge: 'Postgraduate Management',
    color: 'from-amber-600 to-yellow-900',
    description: 'Advanced corporate management degree with dual specialisations in Finance, Marketing, HR, Systems and Supply Chain Management.',
    link: '/mba',
    ctaBranch: 'MBA Management',
    ctaCourse: 'MBA'
  }
];

const FAQS = [
  {
    q: 'Can I get direct admission in IEM Kolkata?',
    a: 'Admission is subject to the institution’s eligibility and selection process. Students should check the official course-specific admission route. Direct2Campus can provide guidance, explain cutoff nuances and quota procedures, but cannot guarantee admission or allotment.'
  },
  {
    q: 'Is admission open at IEM Kolkata for 2027?',
    a: 'Students should check the official IEM admission portal and entrance examination websites (exam.iem.edu.in) for the latest 2027 application dates, slot bookings, and counseling notifications.'
  },
  {
    q: 'What courses are available at IEM Kolkata?',
    a: 'Course availability depends on the campus and admission intake. Programmes offered include B.Tech in multiple specialisations, BBA, BCA, MBA, and MCA. Check the current official programme list for specific campus affiliations.'
  },
  {
    q: 'What is the eligibility for B.Tech at IEM?',
    a: 'Applicants must meet the current Class 12 subject (Physics & Mathematics compulsory) and minimum marks requirements (typically 45% aggregate in PCM) along with applicable entrance examination scores (IEMJEE, WBJEE, or JEE Main).'
  },
  {
    q: 'Does IEM Kolkata offer management quota admission?',
    a: 'Institutions generally have prescribed institutional / management quota provisions subject to regulatory standards. Direct2Campus assists students in understanding verified institutional quota pathways, eligibility benchmarks, and official fee receipts.'
  },
  {
    q: 'What is the fee structure of IEM Kolkata?',
    a: 'Fees vary by course and admission intake. For B.Tech, total tuition fees are approximately ₹7.65L to ₹8.70L. BBA and BCA fees are approximately ₹3.2L to ₹3.8L total, while MBA fees are approximately ₹6.0L to ₹6.5L. Always confirm official payment instructions directly with the institution.'
  },
  {
    q: 'Does IEM accept IEMJEE scores?',
    a: 'Yes, IEMJEE is the official institutional entrance examination conducted across multiple phases for admission to IEM and UEM Group campuses.'
  },
  {
    q: 'How can I get admission guidance from Direct2Campus?',
    a: 'Submit the enquiry form on this page or call our academic advisory desk directly at +91 62003 25137. Our team will review your academic background and explain the available options.'
  }
];

export default function IemGeneralLandingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
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
        name: 'Direct Admission 2027',
        item: 'https://direct2campus.com/direct-admission-in-iem-kolkata'
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

      {/* SECTION A — HERO BANNER */}
      <header className="bg-gradient-to-b from-d2c-navy via-[#0d223f] to-d2c-navy pt-28 md:pt-36 pb-20 px-4 relative overflow-hidden border-b-4 border-d2c-royal shadow-xl">
        <AnimatedPatternBg opacity={0.12} speed={140} />
        
        <div className="content-boundary relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center flex-wrap gap-2 text-xs text-d2c-ice/70 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
            <Link href="/colleges/iem-saltlake" className="hover:text-white transition-colors">IEM Kolkata</Link>
            <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
            <span className="text-white font-semibold">Direct Admission 2027</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-d2c-royal/20 border border-d2c-royal/40 text-d2c-sky text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-d2c-gold" />
                <span>2027 Admission Guidance | Course & Eligibility Info</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-sora font-bold text-white tracking-tight leading-[1.15]">
                Direct Admission in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-d2c-ice to-d2c-sky">IEM Kolkata</span> 2027
              </h1>

              <p className="text-base md:text-xl font-medium text-d2c-gold font-sora">
                Get Expert Guidance for Admission to the Institute of Engineering & Management, Kolkata
              </p>

              <p className="text-sm md:text-base text-d2c-ice/90 leading-relaxed max-w-2xl">
                Planning to pursue engineering, management or computer applications at IEM Kolkata? Direct2Campus helps students understand course options, eligibility requirements, entrance examinations and the admission process. Get personalised admission guidance and take the next step towards your academic career.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#iem-enquiry"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-d2c-gold to-yellow-400 hover:from-yellow-400 hover:to-d2c-gold text-d2c-navy font-sora font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-d2c-navy" />
                  <span>ENQUIRE NOW</span>
                </a>

                <a
                  href="tel:+916200325137"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sora font-semibold text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <PhoneCall className="w-4 h-4 text-d2c-sky" />
                  <span>CALL ADVISOR</span>
                </a>

                <a
                  href="https://wa.me/916200325137?text=Hi%20Direct2Campus,%20I%20am%20inquiring%20about%20IEM%20Kolkata%20Direct%20Admission%202027."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-sora font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP US</span>
                </a>
              </div>
            </div>

            {/* Right Column Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                <div className="rounded-2xl overflow-hidden relative aspect-video sm:aspect-[4/3] bg-gray-900 border border-white/10">
                  <img
                    src="/images/colleges/iem-saltlake.jpg"
                    alt="Institute of Engineering and Management Kolkata campus"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-d2c-navy/90 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-d2c-gold">Education Excellence</p>
                      <p className="text-white font-sora font-bold text-base sm:text-lg">Institute of Engineering & Management</p>
                      <p className="text-xs text-d2c-ice/80">Sector V, Salt Lake & New Town Campuses</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-d2c-ice/90">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-white font-bold text-sm">35+ Years</p>
                    <p className="text-[11px] text-gray-400">Academic Heritage</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-white font-bold text-sm">100% Verified</p>
                    <p className="text-[11px] text-gray-400">Quota Pathways</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Guidance Notice */}
      <div className="bg-amber-50/80 border-b border-amber-200 py-3 px-4 text-center">
        <p className="text-xs text-amber-900 max-w-4xl mx-auto leading-relaxed">
          <strong>Important Guidance Note:</strong> Direct2Campus provides independent admission information and career guidance. Direct admission is subject to official institutional rules, qualifying standards, and seat availability. Direct2Campus does not make false promises of guaranteed admission.
        </p>
      </div>

      <main className="content-boundary max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* SECTION B — ABOUT IEM KOLKATA */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Institution Background</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              About IEM Kolkata
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="md:col-span-8 space-y-4">
              <p>
                The Institute of Engineering & Management (IEM), Kolkata is an educational institution in Kolkata offering programmes in engineering, technology and management. Established in 1989, it operates primarily from its flagship campus in Kolkata’s premier IT hub (Sector V, Salt Lake), alongside modern extended facilities in New Town.
              </p>
              <p>
                Students can explore undergraduate and postgraduate programmes based on their academic qualifications and the institution’s current admission criteria. With a proven record in campus placements, distinguished faculty, and comprehensive academic infrastructure, IEM is consistently among the top choices for students across Eastern India.
              </p>
            </div>

            <div className="md:col-span-4 bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-3">
              <h3 className="font-sora font-bold text-base text-d2c-navy flex items-center gap-2">
                <Building2 className="w-4 h-4 text-d2c-royal" />
                <span>Quick Facts</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Approved by AICTE, New Delhi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Affiliated to MAKAUT, West Bengal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>NAAC Accredited Institution</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Strong Alumni Network Across Fortune 500</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/colleges/iem-saltlake"
                  className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1"
                >
                  <span>Explore College Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C — COURSES */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Academic Offerings</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              Courses Offered at IEM Kolkata
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl">
              Select any programme below to review curriculum details, campus availability, and preselect it for personal admission guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COURSES.map((course) => {
              const IconComp = course.icon;
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-d2c-royal flex items-center justify-center group-hover:bg-d2c-royal group-hover:text-white transition-colors duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {course.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-d2c-royal uppercase tracking-wider">
                        {course.badge}
                      </span>
                      <h3 className="text-xl font-sora font-bold text-d2c-navy group-hover:text-d2c-royal transition-colors mt-1">
                        {course.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href="#iem-enquiry"
                      className="px-5 py-2.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Enquire for {course.name.split(' ')[0]}
                    </a>

                    <Link
                      href={course.link}
                      className="text-xs font-bold text-gray-600 hover:text-d2c-navy flex items-center gap-1"
                    >
                      <span>Course Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION D — ELIGIBILITY */}
        <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200/80 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Admissions Requirements</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              IEM Kolkata Admission Eligibility
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
              Eligibility differs by programme, admission year and applicable regulatory requirements. The following is general guidance only; final criteria must be checked against current official notices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs md:text-sm">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
              <span className="font-bold text-d2c-royal uppercase tracking-wider text-[11px]">B.Tech Programme</span>
              <p className="text-xs text-gray-700 leading-relaxed">
                Class 12 pass or appearing with compulsory Physics & Mathematics, plus Chemistry/Bio/CS. Minimum 45% aggregate in PCM (40% for reserved categories). Valid IEMJEE, WBJEE or JEE Main score.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
              <span className="font-bold text-purple-700 uppercase tracking-wider text-[11px]">BBA Programme</span>
              <p className="text-xs text-gray-700 leading-relaxed">
                Passed Class 12 / Higher Secondary in any stream (Science, Commerce, Arts) with English from a recognised board with minimum qualifying aggregate as per current MAKAUT norms.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
              <span className="font-bold text-emerald-700 uppercase tracking-wider text-[11px]">BCA Programme</span>
              <p className="text-xs text-gray-700 leading-relaxed">
                Class 12 passed in Science or Commerce with Mathematics / Computer Application / Information Practice as one of the subjects and English, securing prescribed minimum aggregate.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
              <span className="font-bold text-amber-700 uppercase tracking-wider text-[11px]">MBA Programme</span>
              <p className="text-xs text-gray-700 leading-relaxed">
                Recognised 3-year Bachelor’s degree in any discipline with minimum 50% aggregate (45% for reserved categories). Valid CAT, MAT, JEMAT or IEMJEE management score.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION E — ADMISSION PROCESS */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Navigation Steps</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              IEM Kolkata Admission Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-d2c-royal">Step 1</span>
              <h4 className="font-sora font-bold text-base text-d2c-navy">Course Selection</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Choose your preferred course and specialisation based on career goals.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-d2c-royal">Step 2</span>
              <h4 className="font-sora font-bold text-base text-d2c-navy">Eligibility Verification</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Review the current course-specific Class 12 or graduation percentage benchmarks.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-d2c-royal">Step 3</span>
              <h4 className="font-sora font-bold text-base text-d2c-navy">Entrance Exam Route</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Apply for the official entrance exam specified by IEM (IEMJEE, WBJEE, CAT, etc.).</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-d2c-royal">Step 4</span>
              <h4 className="font-sora font-bold text-base text-d2c-navy">Counseling & Interview</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Complete counseling rounds or personal interviews where applicable.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-d2c-royal">Step 5</span>
              <h4 className="font-sora font-bold text-base text-d2c-navy">Document Verification</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Submit verified original marksheets, admit cards and identity credentials.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-d2c-royal">Step 6</span>
              <h4 className="font-sora font-bold text-base text-d2c-navy">Enrollment & Fees</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Complete admission formalities and pay semester fees via institutional bank portals.</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <a
              href="#iem-enquiry"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white font-sora font-bold text-sm shadow-md transition-all"
            >
              <span>CHECK YOUR ELIGIBILITY</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* SECTION F & G — WHY CONSIDER IEM & WHY DIRECT2CAMPUS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy">Why Consider IEM Kolkata?</h3>
            <ul className="space-y-3 text-xs md:text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Premier technical and management education options in Sector V IT Corridor.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Modern laboratories, digital libraries, and collaborative research incubators.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Active student clubs, technical hackathons, and corporate mentorship programmes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Consistently proven placement engagements with major corporate recruiters.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy">Why Direct2Campus Guidance?</h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Choosing a college and course is an important decision. Direct2Campus helps students and parents understand course options, eligibility requirements, entrance examination procedures, application steps, documentation and admission timelines. Admission remains subject to IEM’s official criteria and approval.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 pt-1">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-d2c-royal shrink-0" />
                <span>Course and specialisation comparison guidance.</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-d2c-royal shrink-0" />
                <span>Transparent explanation of quota and fee structures.</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-d2c-royal shrink-0" />
                <span>Step-by-step assistance with official documentation.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION H — ENQUIRY FORM */}
        <IemEnquiryForm
          sectionId="iem-enquiry"
          showCourseSelector={true}
          defaultCourse="B.Tech"
          title="Get Admission Guidance for IEM Kolkata"
          subtitle="Share your details and the Direct2Campus admission guidance team will contact you."
        />

        {/* SECTION I — FAQS */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Frequently Asked</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy flex items-center gap-2.5">
              <HelpCircle className="w-7 h-7 text-d2c-royal" />
              <span>Questions & Answers</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
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

      </main>
    </div>
  );
}
