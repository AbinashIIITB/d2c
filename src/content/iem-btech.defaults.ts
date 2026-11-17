import {
  IEM_BASE,
  iemFormDefaults,
  seoDefaults,
  type IemFaqContent,
  type IemFormContent,
  type IemLink,
  type IemNotice,
} from './iem-branch.schema';
import type { SeoFields } from '@/lib/cms/types';

export interface IemChecklistContent {
  buttonLabel: string;
  downloadedLabel: string;
  fileName: string;
  fileText: string;
}

export interface IemBtechContent {
  seo: SeoFields;
  ogImageAlt: string;
  breadcrumbSchema: { name: string; url: string }[];
  crumbs: IemLink[];
  crumbLast: string;
  hero: {
    badgeIcon: string;
    badge: string;
    h1Before: string;
    h1Highlight: string;
    h1After: string;
    subtitle: string;
    copy: string;
    bulletIcon: string;
    bullets: string[];
    primaryIcon: string;
    primaryLabel: string;
    callIcon: string;
    callLabel: string;
    callHref: string;
    image: string;
    imageAlt: string;
    cardEyebrow: string;
    cardTitle: string;
    facts: { label: string; value: string; valueClass: string }[];
  };
  notice: IemNotice;
  overview: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    campusNote: { label: string; text: string };
    factsIcon: string;
    factsTitle: string;
    factsBulletIcon: string;
    facts: string[];
    profileLabel: string;
    profileHref: string;
  };
  specs: {
    eyebrow: string;
    heading: string;
    intro: string;
    preselectLabel: string;
    detailLabel: string;
    items: {
      icon: string;
      name: string;
      tag: string;
      badgeColor: string;
      description: string;
      enquireLabel: string;
      pageUrl: string;
    }[];
  };
  mapping: { eyebrow: string; heading: string; intro: string; items: { title: string; text: string }[] };
  eligibility: {
    eyebrow: string;
    heading: string;
    intro: string;
    academic: { icon: string; title: string; bulletIcon: string; items: { label: string; text: string }[] };
    routes: { icon: string; title: string; bulletIcon: string; items: { label: string; text: string }[] };
    ctaLabel: string;
  };
  process: {
    eyebrow: string;
    heading: string;
    intro: string;
    steps: { title: string; text: string }[];
    portal: { title: string; text: string; viewLabel: string; viewHref: string; guidanceLabel: string };
  };
  documents: {
    eyebrow: string;
    heading: string;
    intro: string;
    bulletIcon: string;
    items: string[];
    checklist: IemChecklistContent;
  };
  help: { eyebrow: string; heading: string; intro: string; items: { title: string; text: string }[] };
  form: IemFormContent;
  faqs: IemFaqContent;
  related: { title: string; intro: string; links: IemLink[] };
  mobileBar: { ariaLabel: string; callLabel: string; callHref: string; whatsappLabel: string; whatsappHref: string; enquireLabel: string };
}

export const iemChecklistDefaults: IemChecklistContent = {
  buttonLabel: 'DOWNLOAD ADMISSION CHECKLIST',
  downloadedLabel: 'Checklist Downloaded!',
  fileName: 'IEM-Kolkata-BTech-Admission-Checklist-2027.txt',
  fileText: `================================================================================
DIRECT2CAMPUS | IEM KOLKATA B.TECH ADMISSION 2027
DOCUMENT VERIFICATION & APPLICATION PREPARATION CHECKLIST
================================================================================

This document checklist is prepared for candidates applying for B.Tech programmes
at the Institute of Engineering & Management (IEM), Kolkata for the 2027 intake.

--------------------------------------------------------------------------------
1. MANDATORY ACADEMIC DOCUMENTS
--------------------------------------------------------------------------------
[ ] Class 10 Board Marksheet (Self-attested photocopy + Original for verification)
[ ] Class 10 Board Pass Certificate / Admit Card (for proof of Date of Birth)
[ ] Class 12 Qualifying Examination Marksheet (or Appearing Admit Card for 2027 batch)
[ ] Class 12 Pass Certificate (if already passed)
[ ] Transfer Certificate (TC) / School Leaving Certificate (SLC) from last attended school
[ ] Migration Certificate (for CBSE, CISCE, and non-West Bengal state boards)
[ ] Character / Conduct Certificate issued by the Head of the Institution last attended

--------------------------------------------------------------------------------
2. ENTRANCE EXAMINATION DOCUMENTS (AS APPLICABLE)
--------------------------------------------------------------------------------
[ ] IEMJEE 2027 Admit Card & Scorecard / Rank Letter (Official portal: exam.iem.edu.in)
[ ] WBJEE 2027 Rank Card (if applying through WBJEE quota)
[ ] JEE Main 2027 Scorecard / Session Result (if applying through All-India quota)
[ ] Provisional Seat Allotment Letter (issued during counselling)

--------------------------------------------------------------------------------
3. IDENTITY & RESIDENCE PROOFS
--------------------------------------------------------------------------------
[ ] Aadhaar Card of Candidate (Photocopy + Original for verification)
[ ] Domicile Certificate (issued by competent authority as per institutional guidelines)
[ ] Category Certificate (SC / ST / OBC-A / OBC-B / PwD / EWS) if claiming reservation
[ ] Parents / Guardian's Identity Proof & PAN Card

--------------------------------------------------------------------------------
4. PHOTOGRAPHS & SIGNATURES
--------------------------------------------------------------------------------
[ ] 8 Copies of Recent Passport Size Colour Photographs (matching admit card)
[ ] 2 Copies of Stamp Size Photographs
[ ] Candidate's & Parent's Specimen Signatures on prescribed institutional forms

--------------------------------------------------------------------------------
5. MEDICAL & ANTI-RAGGING AFFIDAVITS
--------------------------------------------------------------------------------
[ ] Medical Fitness Certificate from a Registered Medical Practitioner (MBBS)
[ ] Eye Examination / Vision Report
[ ] Anti-Ragging Undertaking by Student (via antiragging.in reference)
[ ] Anti-Ragging Undertaking by Parent / Guardian

--------------------------------------------------------------------------------
IMPORTANT ADVISORY FOR CANDIDATES:
--------------------------------------------------------------------------------
1. Institutional Fee Payments: All tuition fees, registration fees, and hostel fees
   must be paid ONLY via official IEM institutional payment portals (demand draft,
   net banking, or authorised college gateway). NEVER pay admission fees in cash
   or to personal accounts.
2. Official IEM Portal: https://exam.iem.edu.in/ | https://iem.edu.in/
3. Admission Guidance Support: Direct2Campus Education Portal (+91 62003 25137)
================================================================================`,
};

export const iemBtechDefaults: IemBtechContent = {
  seo: seoDefaults({
    title: 'B.Tech Admission in IEM Kolkata 2027 | Eligibility & Guidance',
    description:
      'Explore B.Tech admission in IEM Kolkata for 2027. Check engineering specialisations, eligibility, IEMJEE process and get admission guidance from Direct2Campus.',
    keywords: [
      'B.Tech Admission in IEM Kolkata',
      'IEM Kolkata B.Tech Admission 2027',
      'Admission in IEM Kolkata for B.Tech',
      'IEM B.Tech Eligibility',
      'IEMJEE 2027',
      'B.Tech CSE Admission in Kolkata',
    ],
    path: 'btech-admission-in-iem-kolkata',
    ogDescription:
      'Explore engineering specialisations, eligibility criteria, IEMJEE 2027 examination steps and admission guidance for IEM Kolkata.',
  }),
  ogImageAlt: 'IEM Kolkata Engineering Campus',
  breadcrumbSchema: [
    { name: 'Home', url: IEM_BASE },
    { name: 'Colleges', url: `${IEM_BASE}/colleges` },
    { name: 'IEM Kolkata', url: `${IEM_BASE}/colleges/iem-saltlake` },
    { name: 'B.Tech Admission 2027', url: `${IEM_BASE}/btech-admission-in-iem-kolkata` },
  ],
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'IEM Kolkata', href: '/colleges/iem-saltlake' },
  ],
  crumbLast: 'B.Tech Admission 2027',
  hero: {
    badgeIcon: 'sparkles',
    badge: '2027 Engineering Admission Guidance',
    h1Before: 'B.Tech Admission in',
    h1Highlight: 'IEM Kolkata',
    h1After: '2027',
    subtitle: 'Get the Right Guidance for Your Engineering Admission Journey',
    copy: 'Looking to pursue B.Tech in Kolkata? Explore engineering programmes at the Institute of Engineering & Management (IEM), understand the available specialisations, check the admission requirements and learn about the IEMJEE 2027 process. Direct2Campus helps students and parents navigate course information and admission steps.',
    bulletIcon: 'check-circle-2',
    bullets: ['B.Tech Programme Info', 'Specialisation Guidance', 'Entrance & Eligibility'],
    primaryIcon: 'graduation-cap',
    primaryLabel: 'CHECK B.TECH ADMISSION',
    callIcon: 'phone-call',
    callLabel: 'TALK TO AN ADVISOR',
    callHref: 'tel:+916200325137',
    image: '/images/colleges/iem-saltlake.jpg',
    imageAlt: 'IEM Kolkata engineering campus laboratory',
    cardEyebrow: 'Premier Engineering Institute',
    cardTitle: 'Institute of Engineering & Management, Kolkata',
    facts: [
      { label: 'Approved By:', value: 'AICTE, New Delhi', valueClass: 'font-semibold text-white' },
      { label: 'Affiliated University:', value: 'MAKAUT, West Bengal', valueClass: 'font-semibold text-white' },
      { label: 'Key Entrance:', value: 'IEMJEE 2027 / WBJEE / JEE Main', valueClass: 'font-semibold text-emerald-400' },
    ],
  },
  notice: {
    label: 'Important Guidance Note:',
    text: 'Direct2Campus is an educational information and admission guidance service. IEM\'s official 2027 portal identifies IEMJEE as the designated entrance examination. Direct2Campus does not promise admission or management quota seats. Final admission is subject to official institutional approval and published criteria.',
  },
  overview: {
    eyebrow: 'Institutional Overview',
    heading: 'Study Engineering at IEM Kolkata',
    paragraphs: [
      'The Institute of Engineering & Management (IEM), Kolkata offers undergraduate engineering programmes across selected technology and core engineering disciplines. Established in 1989 in the IT corridor of Salt Lake Sector V, IEM has established itself as one of Eastern India\'s leading private engineering institutions known for academic rigour and placement engagement.',
      'Students can review the current programme options, campus availability and admission requirements before choosing a specialisation. The B.Tech degree is a four-year full-time undergraduate programme structured across 8 semesters with hands-on laboratory modules, industry certifications, and interdisciplinary electives.',
    ],
    campusNote: {
      label: 'Campus Distinction:',
      text: 'Offerings between the IEM Salt Lake campus and the IEM/UEM New Town facilities differ by programme accreditation and university charter. Applicants are advised to confirm the specific awarding university and intake when applying.',
    },
    factsIcon: 'building-2',
    factsTitle: 'Campus Key Facts',
    factsBulletIcon: 'check-circle-2',
    facts: [
      'Established in 1989 (35+ Yrs Heritage)',
      'Location: Sector V, Salt Lake, Kolkata',
      'State-of-the-Art Innovation Labs',
      '4-Year Full-Time B.Tech Degree',
    ],
    profileLabel: 'View Full IEM College Profile',
    profileHref: '/colleges/iem-saltlake',
  },
  specs: {
    eyebrow: 'Academic Offerings',
    heading: 'Explore B.Tech Specialisations',
    intro:
      'IEM Kolkata provides specialized engineering curricula aligned with Industry 4.0 demands. Click any programme below to review its dedicated guide or preselect it for admission counseling.',
    preselectLabel: 'Preselect in Form',
    detailLabel: 'Read Branch Guide',
    items: [
      {
        icon: 'cpu',
        name: 'Computer Science & Engineering (CSE)',
        tag: 'Highest Demand',
        badgeColor: 'bg-blue-50 text-d2c-royal border-blue-200',
        description:
          'Build strong foundations in computing, software architecture, algorithms, data structures and distributed systems.',
        enquireLabel: 'Enquire for Computer Science & Engineering',
        pageUrl: '/iem-kolkata-cse-admission',
      },
      {
        icon: 'bot',
        name: 'CSE – Artificial Intelligence & Machine Learning',
        tag: 'Emerging Tech',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        description:
          'Explore computing applications involving advanced AI algorithms, neural networks, machine learning models and predictive analytics.',
        enquireLabel: 'Enquire for CSE',
        pageUrl: '/iem-kolkata-cse-ai-ml-admission',
      },
      {
        icon: 'network',
        name: 'Information Technology (IT)',
        tag: 'IT Core',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        description:
          'Study software engineering, information management systems, cloud computing, cybersecurity fundamentals and enterprise networks.',
        enquireLabel: 'Enquire for Information Technology (IT)',
        pageUrl: '/iem-kolkata-it-admission',
      },
      {
        icon: 'radio',
        name: 'Electronics & Communication Engineering (ECE)',
        tag: 'Hardware & Telecom',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
        description:
          'Explore electronic devices, communication technologies, microprocessors, signals & systems and embedded hardware design.',
        enquireLabel: 'Enquire for Electronics & Communication Engineering (ECE)',
        pageUrl: '/iem-kolkata-ece-admission',
      },
      {
        icon: 'zap',
        name: 'Electrical Engineering',
        tag: 'Core Engineering',
        badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
        description:
          'Study electrical power systems, power generation and transmission, electrical machines, smart grid technologies and control fundamentals.',
        enquireLabel: 'Enquire for Electrical Engineering',
        pageUrl: '/iem-kolkata-electrical-engineering-admission',
      },
      {
        icon: 'wrench',
        name: 'Mechanical Engineering',
        tag: 'Design & Automation',
        badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        description:
          'Explore mechanics, engineering design, CAD/CAM applications, thermodynamics, manufacturing processes and robotic systems.',
        enquireLabel: 'Enquire for Mechanical Engineering',
        pageUrl: '/iem-kolkata-mechanical-engineering-admission',
      },
    ],
  },
  mapping: {
    eyebrow: 'Specialisation Mapping',
    heading: 'Choose a Specialisation That Matches Your Interests',
    intro: 'Select an engineering pathway rooted in your natural strengths and academic curiosity.',
    items: [
      {
        title: 'CSE & IT Disciplines',
        text: 'Ideal for candidates drawn to computational logic, programming, algorithms, database architectures and software engineering. Focuses on digital infrastructure and modern computing platforms.',
      },
      {
        title: 'Artificial Intelligence & ML',
        text: 'Suitable for students passionate about data science, statistical modeling, neural networks and automated intelligent systems that power modern automation and predictive software.',
      },
      {
        title: 'ECE, Electrical & Mechanical',
        text: 'Suited for students fascinated by electronic hardware, microcontrollers, energy systems, power distribution, smart robotics, mechanical design, thermodynamics and automated manufacturing.',
      },
    ],
  },
  eligibility: {
    eyebrow: '2027 Admission Benchmarks',
    heading: 'B.Tech Admission Eligibility at IEM Kolkata',
    intro:
      'B.Tech eligibility depends on the current admission notification, campus, programme and applicable entrance/selection rules. Applicants should verify the 2027 criteria before applying.',
    academic: {
      icon: 'file-check-2',
      title: 'Academic & Subject Criteria',
      bulletIcon: 'check-circle-2',
      items: [
        {
          label: 'Qualifying Exam:',
          text: 'Passed or appearing in Class 12 / Higher Secondary / 10+2 from a recognised national or state board (CBSE, CISCE, WBCHSE, etc.).',
        },
        { label: 'Compulsory Subjects:', text: 'Physics and Mathematics are required compulsory subjects.' },
        {
          label: 'Third Subject:',
          text: 'Chemistry, Biotechnology, Biology, Computer Science, or Computer Application as per current intake norms.',
        },
        {
          label: 'Minimum Marks:',
          text: 'Typically 45% aggregate in PCM (40% for reserved categories), subject to branch-specific revisions.',
        },
      ],
    },
    routes: {
      icon: 'graduation-cap',
      title: 'Recognized Entrance Routes',
      bulletIcon: 'check-circle-2',
      items: [
        {
          label: 'IEMJEE 2027:',
          text: 'The institutional entrance exam conducted across multiple exam slots for IEM-UEM Group admission.',
        },
        {
          label: 'WBJEE 2027:',
          text: 'Candidates with a valid WBJEE General Merit Rank (GMR) participate through Central Selection Counseling for MAKAUT-affiliated seats.',
        },
        {
          label: 'JEE Main 2027:',
          text: 'All-India quota allocations accept JEE Main National Testing Agency (NTA) scorecards.',
        },
      ],
    },
    ctaLabel: 'CHECK YOUR ELIGIBILITY',
  },
  process: {
    eyebrow: 'Step-by-Step Walkthrough',
    heading: 'Understand the IEMJEE 2027 Admission Process',
    intro: 'Admission follows a transparent academic process. Review each stage from exam registration to final enrollment.',
    steps: [
      {
        title: 'Review Official Notification',
        text: 'Review the official IEMJEE 2027 notification and confirm the B.Tech programme and campus you are applying for.',
      },
      {
        title: 'Online Application',
        text: 'Complete the official application form at exam.iem.edu.in and provide the required personal and academic details.',
      },
      {
        title: 'Appear for Examination',
        text: 'Follow published examination instructions and appear for the designated IEMJEE computer-based / online testing slot.',
      },
      {
        title: 'Check Result & Counseling',
        text: 'Check your scorecard, merit rank, and subsequent counseling/interview schedule through the official student portal.',
      },
      {
        title: 'Document Verification',
        text: 'Submit original marksheets, identity credentials, and transfer documents for institutional verification.',
      },
      {
        title: 'Institutional Fee Payment',
        text: 'Pay semester fees strictly through authorized institutional bank channels after receiving the provisional offer letter.',
      },
    ],
    portal: {
      title: 'Official IEMJEE Examination Portal',
      text: 'Access official registration guidelines, mock tests, and 2027 examination dates.',
      viewLabel: 'VIEW IEMJEE 2027 DETAILS',
      viewHref: 'https://exam.iem.edu.in/',
      guidanceLabel: 'GET ADMISSION GUIDANCE',
    },
  },
  documents: {
    eyebrow: 'Verification Preparation',
    heading: 'Documents to Keep Ready',
    intro: 'Keep both original and self-attested photocopies organized prior to counseling.',
    bulletIcon: 'check-circle-2',
    items: [
      'Class 10 Board Marksheet & Admit Card (DOB Proof)',
      'Class 12 Qualifying Marksheet / Appearing Admit Card',
      'IEMJEE / WBJEE / JEE Main 2027 Scorecard',
      'Aadhaar Card or Government Identity Proof',
      'School Leaving / Transfer / Migration Certificate',
      '8 Passport Size Photographs (matching exam admit card)',
    ],
    checklist: iemChecklistDefaults,
  },
  help: {
    eyebrow: 'Independent Advisory',
    heading: 'How Direct2Campus Can Help',
    intro:
      'Choosing an engineering course involves more than selecting a college. Direct2Campus helps students and parents understand programme options, campus-wise availability, eligibility information, entrance examination steps and the documents they may need. Our role is to provide admission guidance and help you identify the right official next steps. Final admission decisions are made by the institution under its published rules.',
    items: [
      { title: 'Understand B.Tech Branches', text: 'Compare CSE, AI/ML, IT, ECE and core engineering curriculum focus.' },
      { title: 'Eligibility Evaluation', text: 'Review Class 12 percentage criteria and qualifying subject combinations.' },
      { title: 'IEMJEE Process Guidance', text: 'Understand application deadlines, test scheduling, and scorecard submission.' },
      { title: 'Document Preparation', text: 'Ensure your original certificates and affidavits are formatted correctly.' },
      { title: 'Official Fee Clarification', text: 'Identify approved institutional fee schedules and secure payment avenues.' },
      { title: '100% Student-First Support', text: 'Objective counseling tailored to your career aspirations and academic profile.' },
    ],
  },
  form: { ...iemFormDefaults },
  faqs: {
    eyebrow: 'Common Student Queries',
    heading: 'Frequently Asked Questions',
    icon: 'help-circle',
    items: [
      {
        q: 'Can I get admission in IEM Kolkata for B.Tech?',
        a: "B.Tech admission is subject to IEM's current eligibility and selection process. The official IEMJEE 2027 portal identifies IEMJEE as the entrance examination for B.Tech admissions in the IEM-UEM Group. Direct2Campus provides admission guidance and counseling support to explain published rules, cutoff trends, and verified application steps, but does not guarantee admission or seat allotment.",
      },
      {
        q: 'Is IEMJEE required for B.Tech admission at IEM?',
        a: 'The official IEMJEE 2027 portal states that IEMJEE is conducted for B.Tech admissions to IEM and UEM Group campuses. Candidates can also check whether accepted quota seats exist via WBJEE or JEE Main scores as per current institutional and regulatory guidelines for the 2027 intake.',
      },
      {
        q: 'What is the duration of B.Tech at IEM Kolkata?',
        a: 'The B.Tech programme is a standard four-year (8 semesters) full-time undergraduate engineering degree programme affiliated with MAKAUT and approved by AICTE.',
      },
      {
        q: 'Which B.Tech specialisations are available at IEM Kolkata?',
        a: 'Programmes listed in official IEM materials include Computer Science & Engineering (CSE), CSE (AI & ML), Information Technology (IT), Electronics & Communication Engineering (ECE), Electrical Engineering, and Mechanical Engineering. Campus-wise seat intake and availability should be verified before applying.',
      },
      {
        q: 'What is the academic eligibility for B.Tech at IEM?',
        a: 'Applicants must generally have passed or be appearing in Class 12 (or equivalent) with Physics and Mathematics as compulsory subjects, along with Chemistry / Biotechnology / Biology / Technical Vocational subject, securing the required minimum aggregate marks as officially specified for the 2027 session.',
      },
      {
        q: 'Can students appearing for Class 12 in 2027 apply?',
        a: 'Yes, candidates appearing in their Class 12 board examination in 2027 are generally eligible to apply for IEMJEE 2027 and participate in early admission counseling, subject to submitting proof of passing with required qualifying marks at document verification.',
      },
      {
        q: 'What is the B.Tech fee structure at IEM Kolkata?',
        a: 'Tuition fees at IEM Kolkata typically range from ₹1.5L to ₹2.1L per year depending on the campus and branch, with total course fees approximately ₹7.65L to ₹8.70L. Candidates must always verify the current official fee schedule directly before enrollment.',
      },
      {
        q: 'Does Direct2Campus guarantee a B.Tech seat?',
        a: 'No. Direct2Campus is an independent educational counseling platform. Admission decisions, seat allotment, and fee payments are strictly controlled and finalized by the institution under its published rules and regulatory guidelines.',
      },
      {
        q: 'Where can I apply for IEMJEE 2027?',
        a: 'Candidates can review official exam guidelines and register directly at the official IEM examination portal: https://exam.iem.edu.in/.',
      },
    ],
  },
  related: {
    title: 'Explore Related IEM Admission Resources',
    intro: 'Access branch-specific engineering guides and official admission portals.',
    links: [
      { label: 'CSE Admission 2027', href: '/iem-kolkata-cse-admission' },
      { label: 'CSE AI & ML Admission', href: '/iem-kolkata-cse-ai-ml-admission' },
      { label: 'IT Admission 2027', href: '/iem-kolkata-it-admission' },
      { label: 'ECE Admission 2027', href: '/iem-kolkata-ece-admission' },
      { label: 'Electrical Engineering', href: '/iem-kolkata-electrical-engineering-admission' },
      { label: 'Mechanical Engineering', href: '/iem-kolkata-mechanical-engineering-admission' },
      { label: 'IEM Admission Hub', href: '/admission-in-iem-kolkata' },
      { label: 'IEM Kolkata Courses & Fees', href: '/colleges/iem-saltlake' },
    ],
  },
  mobileBar: {
    ariaLabel: 'Quick contact',
    callLabel: 'Call Counselor',
    callHref: 'tel:+916200325137',
    whatsappLabel: 'WhatsApp',
    whatsappHref:
      'https://wa.me/916200325137?text=Hi%20Direct2Campus,%20I%20am%20inquiring%20about%20IEM%20Kolkata%20B.Tech%20Admission%202027.',
    enquireLabel: 'Enquire',
  },
};
