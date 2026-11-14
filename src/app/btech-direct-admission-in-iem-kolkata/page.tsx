import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Cpu, 
  Bot, 
  Network, 
  Radio, 
  Zap, 
  Wrench, 
  FileCheck2, 
  HelpCircle, 
  ShieldCheck, 
  Download,
  ChevronRight
} from 'lucide-react';
import { IemEnquiryForm } from '@/components/landing/iem/IemEnquiryForm';
import { DownloadChecklistButton } from '@/components/landing/iem/DownloadChecklistButton';
import { AnimatedPatternBg } from '@/components/ui/AnimatedPatternBg';

export const metadata: Metadata = {
  title: 'B.Tech Admission in IEM Kolkata 2027 | Eligibility & Guidance',
  description: 'Explore B.Tech admission in IEM Kolkata for 2027. Check engineering specialisations, eligibility, IEMJEE process and get admission guidance from Direct2Campus.',
  keywords: [
    'B.Tech Admission in IEM Kolkata',
    'IEM Kolkata B.Tech Admission 2027',
    'Direct Admission in IEM Kolkata for B.Tech',
    'IEM B.Tech Eligibility',
    'IEMJEE 2027',
    'B.Tech CSE Admission in Kolkata'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/btech-direct-admission-in-iem-kolkata'
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
    title: 'B.Tech Admission in IEM Kolkata 2027 | Eligibility & Guidance',
    description: 'Explore engineering specialisations, eligibility criteria, IEMJEE 2027 examination steps and admission guidance for IEM Kolkata.',
    url: 'https://direct2campus.com/btech-direct-admission-in-iem-kolkata',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata Engineering Campus' }]
  }
};

const BTECH_SPECIALISATIONS = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering (CSE)',
    icon: Cpu,
    tag: 'Highest Demand',
    badgeColor: 'bg-blue-50 text-d2c-royal border-blue-200',
    description: 'Build strong foundations in computing, software architecture, algorithms, data structures and distributed systems.',
    pageUrl: '/iem-kolkata-cse-direct-admission',
    ctaBranch: 'Computer Science & Engineering (CSE)'
  },
  {
    id: 'aiml',
    name: 'CSE – Artificial Intelligence & Machine Learning',
    icon: Bot,
    tag: 'Emerging Tech',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Explore computing applications involving advanced AI algorithms, neural networks, machine learning models and predictive analytics.',
    pageUrl: '/iem-kolkata-cse-ai-ml-direct-admission',
    ctaBranch: 'CSE – Artificial Intelligence & Machine Learning'
  },
  {
    id: 'it',
    name: 'Information Technology (IT)',
    icon: Network,
    tag: 'IT Core',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Study software engineering, information management systems, cloud computing, cybersecurity fundamentals and enterprise networks.',
    pageUrl: '/iem-kolkata-it-direct-admission',
    ctaBranch: 'Information Technology (IT)'
  },
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering (ECE)',
    icon: Radio,
    tag: 'Hardware & Telecom',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Explore electronic devices, communication technologies, microprocessors, signals & systems and embedded hardware design.',
    pageUrl: '/iem-kolkata-ece-direct-admission',
    ctaBranch: 'Electronics & Communication Engineering (ECE)'
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    icon: Zap,
    tag: 'Core Engineering',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
    description: 'Study electrical power systems, power generation and transmission, electrical machines, smart grid technologies and control fundamentals.',
    pageUrl: '/iem-kolkata-electrical-engineering-direct-admission',
    ctaBranch: 'Electrical Engineering'
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    icon: Wrench,
    tag: 'Design & Automation',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    description: 'Explore mechanics, engineering design, CAD/CAM applications, thermodynamics, manufacturing processes and robotic systems.',
    pageUrl: '/iem-kolkata-mechanical-engineering-direct-admission',
    ctaBranch: 'Mechanical Engineering'
  }
];

const FAQS = [
  {
    q: 'Can I get direct admission in IEM Kolkata for B.Tech?',
    a: "B.Tech admission is subject to IEM's current eligibility and selection process. The official IEMJEE 2027 portal identifies IEMJEE as the entrance examination for B.Tech admissions in the IEM-UEM Group. Direct2Campus provides admission guidance and counseling support to explain published rules, cutoff trends, and verified application steps, but does not guarantee admission or seat allotment."
  },
  {
    q: 'Is IEMJEE required for B.Tech admission at IEM?',
    a: 'The official IEMJEE 2027 portal states that IEMJEE is conducted for B.Tech admissions to IEM and UEM Group campuses. Candidates can also check whether accepted quota seats exist via WBJEE or JEE Main scores as per current institutional and regulatory guidelines for the 2027 intake.'
  },
  {
    q: 'What is the duration of B.Tech at IEM Kolkata?',
    a: 'The B.Tech programme is a standard four-year (8 semesters) full-time undergraduate engineering degree programme affiliated with MAKAUT and approved by AICTE.'
  },
  {
    q: 'Which B.Tech specialisations are available at IEM Kolkata?',
    a: 'Programmes listed in official IEM materials include Computer Science & Engineering (CSE), CSE (AI & ML), Information Technology (IT), Electronics & Communication Engineering (ECE), Electrical Engineering, and Mechanical Engineering. Campus-wise seat intake and availability should be verified before applying.'
  },
  {
    q: 'What is the academic eligibility for B.Tech at IEM?',
    a: 'Applicants must generally have passed or be appearing in Class 12 (or equivalent) with Physics and Mathematics as compulsory subjects, along with Chemistry / Biotechnology / Biology / Technical Vocational subject, securing the required minimum aggregate marks as officially specified for the 2027 session.'
  },
  {
    q: 'Can students appearing for Class 12 in 2027 apply?',
    a: 'Yes, candidates appearing in their Class 12 board examination in 2027 are generally eligible to apply for IEMJEE 2027 and participate in early admission counseling, subject to submitting proof of passing with required qualifying marks at document verification.'
  },
  {
    q: 'What is the B.Tech fee structure at IEM Kolkata?',
    a: 'Tuition fees at IEM Kolkata typically range from ₹1.5L to ₹2.1L per year depending on the campus and branch, with total course fees approximately ₹7.65L to ₹8.70L. Candidates must always verify the current official fee schedule directly before enrollment.'
  },
  {
    q: 'Does Direct2Campus guarantee a B.Tech seat?',
    a: 'No. Direct2Campus is an independent educational counseling platform. Admission decisions, seat allotment, and fee payments are strictly controlled and finalized by the institution under its published rules and regulatory guidelines.'
  },
  {
    q: 'Where can I apply for IEMJEE 2027?',
    a: 'Candidates can review official exam guidelines and register directly at the official IEM examination portal: https://exam.iem.edu.in/.'
  }
];

export default function IemBtechLandingPage() {
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
        name: 'B.Tech Admission 2027',
        item: 'https://direct2campus.com/btech-direct-admission-in-iem-kolkata'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-d2c-white font-dm-sans text-gray-800 antialiased selection:bg-d2c-royal selection:text-white">
      {/* Schema Markup */}
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
            <span className="text-white font-semibold">B.Tech Admission 2027</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-d2c-royal/20 border border-d2c-royal/40 text-d2c-sky text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-d2c-gold" />
                <span>2027 Engineering Admission Guidance</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-sora font-bold text-white tracking-tight leading-[1.15]">
                B.Tech Admission in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-d2c-ice to-d2c-sky">IEM Kolkata</span> 2027
              </h1>

              <p className="text-base md:text-xl font-medium text-d2c-gold font-sora">
                Get the Right Guidance for Your Engineering Admission Journey
              </p>

              <p className="text-sm md:text-base text-d2c-ice/90 leading-relaxed max-w-2xl">
                Looking to pursue B.Tech in Kolkata? Explore engineering programmes at the Institute of Engineering & Management (IEM), understand the available specialisations, check the admission requirements and learn about the IEMJEE 2027 process. Direct2Campus helps students and parents navigate course information and admission steps.
              </p>

              {/* Icon Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs md:text-sm text-d2c-ice/90 font-medium">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>B.Tech Programme Info</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Specialisation Guidance</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Entrance & Eligibility</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#btech-enquiry"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-d2c-gold to-yellow-400 hover:from-yellow-400 hover:to-d2c-gold text-d2c-navy font-sora font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-d2c-navy" />
                  <span>CHECK B.TECH ADMISSION</span>
                </a>

                <a
                  href="tel:+916200325137"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sora font-semibold text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <PhoneCall className="w-4 h-4 text-d2c-sky" />
                  <span>TALK TO AN ADVISOR</span>
                </a>
              </div>
            </div>

            {/* Right Column: Verified Campus Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                <div className="rounded-2xl overflow-hidden relative aspect-video sm:aspect-[4/3] bg-gray-900 border border-white/10">
                  <img
                    src="/images/colleges/iem-saltlake.jpg"
                    alt="IEM Kolkata engineering campus laboratory"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-d2c-navy/90 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-d2c-gold">Premier Engineering Institute</p>
                      <p className="text-white font-sora font-bold text-base sm:text-lg">Institute of Engineering & Management, Kolkata</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-d2c-ice/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Approved By:</span>
                    <span className="font-semibold text-white">AICTE, New Delhi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Affiliated University:</span>
                    <span className="font-semibold text-white">MAKAUT, West Bengal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Key Entrance:</span>
                    <span className="font-semibold text-emerald-400">IEMJEE 2027 / WBJEE / JEE Main</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Advisory Notice */}
      <div className="bg-amber-50/80 border-b border-amber-200 py-3 px-4 text-center">
        <p className="text-xs text-amber-900 max-w-4xl mx-auto leading-relaxed">
          <strong>Important Guidance Note:</strong> Direct2Campus is an educational information and admission guidance service. IEM&apos;s official 2027 portal identifies IEMJEE as the designated entrance examination. Direct2Campus does not offer guaranteed direct admission or guaranteed management quota seats. Final admission is subject to official institutional approval and published criteria.
        </p>
      </div>

      <main className="content-boundary max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* SECTION B — ABOUT IEM AND B.TECH */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Institutional Overview</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              Study Engineering at IEM Kolkata
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="md:col-span-2 space-y-4">
              <p>
                The Institute of Engineering & Management (IEM), Kolkata offers undergraduate engineering programmes across selected technology and core engineering disciplines. Established in 1989 in the IT corridor of Salt Lake Sector V, IEM has established itself as one of Eastern India&apos;s leading private engineering institutions known for academic rigour and placement engagement.
              </p>
              <p>
                Students can review the current programme options, campus availability and admission requirements before choosing a specialisation. The B.Tech degree is a four-year full-time undergraduate programme structured across 8 semesters with hands-on laboratory modules, industry certifications, and interdisciplinary electives.
              </p>
              <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-200">
                <strong>Campus Distinction:</strong> Offerings between the IEM Salt Lake campus and the IEM/UEM New Town facilities differ by programme accreditation and university charter. Applicants are advised to confirm the specific awarding university and intake when applying.
              </p>
            </div>

            <div className="bg-blue-50/70 rounded-3xl p-6 border border-blue-100 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-d2c-royal text-white flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-lg text-d2c-navy">Campus Key Facts</h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Established in 1989 (35+ Yrs Heritage)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Location: Sector V, Salt Lake, Kolkata</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>State-of-the-Art Innovation Labs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>4-Year Full-Time B.Tech Degree</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/colleges/iem-saltlake"
                className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1.5"
              >
                <span>View Full IEM College Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION C — B.TECH SPECIALISATIONS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Academic Offerings</span>
              <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
                Explore B.Tech Specialisations
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl">
                IEM Kolkata provides specialized engineering curricula aligned with Industry 4.0 demands. Click any programme below to review its dedicated guide or preselect it for admission counseling.
              </p>
            </div>

            <a
              href="#btech-enquiry"
              className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1 self-start"
            >
              <span>Preselect in Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BTECH_SPECIALISATIONS.map((spec) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={spec.id}
                  className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-d2c-royal flex items-center justify-center group-hover:bg-d2c-royal group-hover:text-white transition-colors duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${spec.badgeColor}`}>
                        {spec.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-sora font-bold text-d2c-navy group-hover:text-d2c-royal transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <a
                      href="#btech-enquiry"
                      className="w-full py-2.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold text-center block transition-all shadow-sm"
                    >
                      Enquire for {spec.name.split('–')[0].replace('(CSE)', '').trim()}
                    </a>

                    <Link
                      href={spec.pageUrl}
                      className="text-xs font-semibold text-gray-500 hover:text-d2c-navy flex items-center justify-center gap-1 py-1"
                    >
                      <span>Read Branch Guide</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION D — WHY CONSIDER THESE ENGINEERING FIELDS */}
        <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200/80 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Specialisation Mapping</span>
            <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              Choose a Specialisation That Matches Your Interests
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Select an engineering pathway rooted in your natural strengths and academic curiosity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
              <h4 className="font-sora font-bold text-d2c-navy text-base">CSE & IT Disciplines</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ideal for candidates drawn to computational logic, programming, algorithms, database architectures and software engineering. Focuses on digital infrastructure and modern computing platforms.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
              <h4 className="font-sora font-bold text-d2c-navy text-base">Artificial Intelligence & ML</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Suitable for students passionate about data science, statistical modeling, neural networks and automated intelligent systems that power modern automation and predictive software.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
              <h4 className="font-sora font-bold text-d2c-navy text-base">ECE, Electrical & Mechanical</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Suited for students fascinated by electronic hardware, microcontrollers, energy systems, power distribution, smart robotics, mechanical design, thermodynamics and automated manufacturing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION E — ELIGIBILITY CRITERIA */}
        <section id="eligibility" className="scroll-mt-28 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">2027 Admission Benchmarks</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              B.Tech Admission Eligibility at IEM Kolkata
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
              B.Tech eligibility depends on the current admission notification, campus, programme and applicable entrance/selection rules. Applicants should verify the 2027 criteria before applying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-sora font-bold text-lg text-d2c-navy flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-d2c-royal" />
                <span>Academic & Subject Criteria</span>
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Qualifying Exam:</strong> Passed or appearing in Class 12 / Higher Secondary / 10+2 from a recognised national or state board (CBSE, CISCE, WBCHSE, etc.).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Compulsory Subjects:</strong> Physics and Mathematics are required compulsory subjects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Third Subject:</strong> Chemistry, Biotechnology, Biology, Computer Science, or Computer Application as per current intake norms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Minimum Marks:</strong> Typically 45% aggregate in PCM (40% for reserved categories), subject to branch-specific revisions.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-sora font-bold text-lg text-d2c-navy flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-d2c-royal" />
                <span>Recognized Entrance Routes</span>
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>IEMJEE 2027:</strong> The institutional entrance exam conducted across multiple exam slots for IEM-UEM Group admission.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>WBJEE 2027:</strong> Candidates with a valid WBJEE General Merit Rank (GMR) participate through Central Selection Counseling for MAKAUT-affiliated seats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>JEE Main 2027:</strong> All-India quota allocations accept JEE Main National Testing Agency (NTA) scorecards.</span>
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href="#btech-enquiry"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-d2c-royal text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <span>CHECK YOUR ELIGIBILITY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F — IEMJEE 2027 ADMISSION PROCESS */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Step-by-Step Walkthrough</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              Understand the IEMJEE 2027 Admission Process
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
              Admission follows a transparent academic process. Review each stage from exam registration to final enrollment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-d2c-royal text-white text-xs font-bold flex items-center justify-center">1</span>
              <h3 className="font-sora font-bold text-base text-d2c-navy">Review Official Notification</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Review the official IEMJEE 2027 notification and confirm the B.Tech programme and campus you are applying for.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-d2c-royal text-white text-xs font-bold flex items-center justify-center">2</span>
              <h3 className="font-sora font-bold text-base text-d2c-navy">Online Application</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Complete the official application form at exam.iem.edu.in and provide the required personal and academic details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-d2c-royal text-white text-xs font-bold flex items-center justify-center">3</span>
              <h3 className="font-sora font-bold text-base text-d2c-navy">Appear for Examination</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Follow published examination instructions and appear for the designated IEMJEE computer-based / online testing slot.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-d2c-royal text-white text-xs font-bold flex items-center justify-center">4</span>
              <h3 className="font-sora font-bold text-base text-d2c-navy">Check Result & Counseling</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Check your scorecard, merit rank, and subsequent counseling/interview schedule through the official student portal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-d2c-royal text-white text-xs font-bold flex items-center justify-center">5</span>
              <h3 className="font-sora font-bold text-base text-d2c-navy">Document Verification</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Submit original marksheets, identity credentials, and transfer documents for institutional verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-d2c-royal text-white text-xs font-bold flex items-center justify-center">6</span>
              <h3 className="font-sora font-bold text-base text-d2c-navy">Institutional Fee Payment</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pay semester fees strictly through authorized institutional bank channels after receiving the provisional offer letter.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-sora font-bold text-base text-d2c-navy">Official IEMJEE Examination Portal</h4>
              <p className="text-xs text-gray-600">Access official registration guidelines, mock tests, and 2027 examination dates.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://exam.iem.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-d2c-navy hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>VIEW IEMJEE 2027 DETAILS</span>
                <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
              </a>
              <a
                href="#btech-enquiry"
                className="px-5 py-2.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                GET ADMISSION GUIDANCE
              </a>
            </div>
          </div>
        </section>

        {/* SECTION G — DOCUMENTS CHECKLIST */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Verification Preparation</span>
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
                Documents to Keep Ready
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                Keep both original and self-attested photocopies organized prior to counseling.
              </p>
            </div>

            <DownloadChecklistButton />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm text-gray-700 pt-2">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Class 10 Board Marksheet & Admit Card (DOB Proof)</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Class 12 Qualifying Marksheet / Appearing Admit Card</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>IEMJEE / WBJEE / JEE Main 2027 Scorecard</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Aadhaar Card or Government Identity Proof</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>School Leaving / Transfer / Migration Certificate</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>8 Passport Size Photographs (matching exam admit card)</span>
            </div>
          </div>
        </section>

        {/* SECTION H — WHY DIRECT2CAMPUS */}
        <section className="bg-gradient-to-r from-d2c-navy to-[#0e274a] text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-gold">Independent Advisory</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-white">
              How Direct2Campus Can Help
            </h2>
            <p className="text-sm md:text-base text-d2c-ice/85 max-w-3xl leading-relaxed">
              Choosing an engineering course involves more than selecting a college. Direct2Campus helps students and parents understand programme options, campus-wise availability, eligibility information, entrance examination steps and the documents they may need. Our role is to provide admission guidance and help you identify the right official next steps. Final admission decisions are made by the institution under its published rules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 text-xs md:text-sm">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-white">Understand B.Tech Branches</h4>
              <p className="text-d2c-ice/80 text-xs">Compare CSE, AI/ML, IT, ECE and core engineering curriculum focus.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-white">Eligibility Evaluation</h4>
              <p className="text-d2c-ice/80 text-xs">Review Class 12 percentage criteria and qualifying subject combinations.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-white">IEMJEE Process Guidance</h4>
              <p className="text-d2c-ice/80 text-xs">Understand application deadlines, test scheduling, and scorecard submission.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-white">Document Preparation</h4>
              <p className="text-d2c-ice/80 text-xs">Ensure your original certificates and affidavits are formatted correctly.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-white">Official Fee Clarification</h4>
              <p className="text-d2c-ice/80 text-xs">Identify approved institutional fee schedules and secure payment avenues.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-white">100% Student-First Support</h4>
              <p className="text-d2c-ice/80 text-xs">Objective counseling tailored to your career aspirations and academic profile.</p>
            </div>
          </div>
        </section>

        {/* SECTION I — ENQUIRY FORM / LEAD CAPTURE */}
        <IemEnquiryForm
          sectionId="btech-enquiry"
          defaultCourse="B.Tech"
          defaultBranch="Computer Science & Engineering (CSE)"
          title="Get B.Tech Admission Guidance for IEM Kolkata"
          subtitle="Share your details and the Direct2Campus team can help you understand the B.Tech programme options and admission process."
        />

        {/* SECTION J — FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">Common Student Queries</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy flex items-center gap-2.5">
              <HelpCircle className="w-7 h-7 text-d2c-royal" />
              <span>Frequently Asked Questions</span>
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

        {/* RELATED INTERNAL LINKS & BRANCH DIRECTORY */}
        <section className="border-t border-gray-200 pt-12 space-y-6">
          <div className="space-y-1">
            <h3 className="font-sora font-bold text-lg text-d2c-navy">Explore Related IEM Admission Resources</h3>
            <p className="text-xs text-gray-500">Access branch-specific engineering guides and official admission portals.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            <Link
              href="/iem-kolkata-cse-direct-admission"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>CSE Admission 2027</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/iem-kolkata-cse-ai-ml-direct-admission"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>CSE AI & ML Admission</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/iem-kolkata-it-direct-admission"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>IT Admission 2027</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/iem-kolkata-ece-direct-admission"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>ECE Admission 2027</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/iem-kolkata-electrical-engineering-direct-admission"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>Electrical Engineering</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/iem-kolkata-mechanical-engineering-direct-admission"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>Mechanical Engineering</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/direct-admission-in-iem-kolkata"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>IEM Direct Admission Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <Link
              href="/colleges/iem-saltlake"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
            >
              <span>IEM Kolkata Courses & Fees</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
          </div>
        </section>

      </main>

      {/* STICKY BOTTOM MOBILE CONTACT BAR */}
      <aside aria-label="Quick contact" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 flex items-center gap-2 shadow-2xl">
        <a
          href="tel:+916200325137"
          className="flex-1 py-3 rounded-xl bg-d2c-navy text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
        >
          <PhoneCall className="w-3.5 h-3.5 text-d2c-gold" />
          <span>Call Counselor</span>
        </a>
        <a
          href="https://wa.me/916200325137?text=Hi%20Direct2Campus,%20I%20am%20inquiring%20about%20IEM%20Kolkata%20B.Tech%20Admission%202027."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-white" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#btech-enquiry"
          className="flex-1 py-3 rounded-xl bg-d2c-royal text-white text-xs font-bold text-center"
        >
          Enquire
        </a>
      </aside>
    </div>
  );
}
