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

export interface IemHubContent {
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
    primaryIcon: string;
    primaryLabel: string;
    callIcon: string;
    callLabel: string;
    callHref: string;
    whatsappIcon: string;
    whatsappLabel: string;
    whatsappHref: string;
    image: string;
    imageAlt: string;
    cardEyebrow: string;
    cardTitle: string;
    cardSubtitle: string;
    stats: { value: string; label: string }[];
  };
  notice: IemNotice;
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    factsIcon: string;
    factsTitle: string;
    factsBulletIcon: string;
    facts: string[];
    profileLabel: string;
    profileHref: string;
  };
  courses: {
    eyebrow: string;
    heading: string;
    intro: string;
    detailsLabel: string;
    items: {
      icon: string;
      duration: string;
      badge: string;
      name: string;
      description: string;
      enquireLabel: string;
      link: string;
    }[];
  };
  eligibility: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: { title: string; labelClass: string; text: string }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: { label: string; title: string; text: string }[];
    ctaLabel: string;
  };
  whyIem: { title: string; bulletIcon: string; items: string[] };
  whyD2c: { title: string; text: string; bulletIcon: string; items: string[] };
  form: IemFormContent;
  faqs: IemFaqContent;
}

export const iemHubDefaults: IemHubContent = {
  seo: seoDefaults({
    title: 'Admission in IEM Kolkata 2027 – Courses & Eligibility',
    description:
      'Looking for admission in IEM Kolkata? Explore B.Tech, BBA, BCA and MBA courses, eligibility, admission process and expert admission guidance with Direct2Campus.',
    keywords: [
      'Admission in IEM Kolkata',
      'IEM Kolkata Admission 2027',
      'IEM Kolkata B.Tech Admission',
      'IEM Kolkata BBA Admission',
      'IEM Kolkata BCA Admission',
      'IEM Kolkata MBA Admission',
    ],
    path: 'admission-in-iem-kolkata',
    ogDescription:
      'Explore undergraduate and postgraduate admissions at IEM Kolkata for 2027. Review B.Tech, BBA, BCA and MBA courses, eligibility, and counseling steps.',
  }),
  ogImageAlt: 'IEM Kolkata Admission Guidance',
  breadcrumbSchema: [
    { name: 'Home', url: IEM_BASE },
    { name: 'Colleges', url: `${IEM_BASE}/colleges` },
    { name: 'IEM Kolkata', url: `${IEM_BASE}/colleges/iem-saltlake` },
    { name: 'Admission 2027', url: `${IEM_BASE}/admission-in-iem-kolkata` },
  ],
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'IEM Kolkata', href: '/colleges/iem-saltlake' },
  ],
  crumbLast: 'Admission 2027',
  hero: {
    badgeIcon: 'sparkles',
    badge: '2027 Admission Guidance | Course & Eligibility Info',
    h1Before: 'Admission in',
    h1Highlight: 'IEM Kolkata',
    h1After: '2027',
    subtitle: 'Get Expert Guidance for Admission to the Institute of Engineering & Management, Kolkata',
    copy: 'Planning to pursue engineering, management or computer applications at IEM Kolkata? Direct2Campus helps students understand course options, eligibility requirements, entrance examinations and the admission process. Get personalised admission guidance and take the next step towards your academic career.',
    primaryIcon: 'graduation-cap',
    primaryLabel: 'ENQUIRE NOW',
    callIcon: 'phone-call',
    callLabel: 'CALL ADVISOR',
    callHref: 'tel:+916200325137',
    whatsappIcon: 'message-square',
    whatsappLabel: 'WHATSAPP US',
    whatsappHref:
      'https://wa.me/916200325137?text=Hi%20Direct2Campus,%20I%20am%20inquiring%20about%20IEM%20Kolkata%20Admission%202027.',
    image: '/images/colleges/iem-saltlake.jpg',
    imageAlt: 'Institute of Engineering and Management Kolkata campus',
    cardEyebrow: 'Education Excellence',
    cardTitle: 'Institute of Engineering & Management',
    cardSubtitle: 'Sector V, Salt Lake & New Town Campuses',
    stats: [
      { value: '35+ Years', label: 'Academic Heritage' },
      { value: '100% Verified', label: 'Quota Pathways' },
    ],
  },
  notice: {
    label: 'Important Guidance Note:',
    text: 'Direct2Campus provides independent admission information and career guidance. Admission is subject to official institutional rules, qualifying standards, and seat availability. Direct2Campus does not make false promises about admission outcomes.',
  },
  about: {
    eyebrow: 'Institution Background',
    heading: 'About IEM Kolkata',
    paragraphs: [
      'The Institute of Engineering & Management (IEM), Kolkata is an educational institution in Kolkata offering programmes in engineering, technology and management. Established in 1989, it operates primarily from its flagship campus in Kolkata’s premier IT hub (Sector V, Salt Lake), alongside modern extended facilities in New Town.',
      'Students can explore undergraduate and postgraduate programmes based on their academic qualifications and the institution’s current admission criteria. With a proven record in campus placements, distinguished faculty, and comprehensive academic infrastructure, IEM is consistently among the top choices for students across Eastern India.',
    ],
    factsIcon: 'building-2',
    factsTitle: 'Quick Facts',
    factsBulletIcon: 'check-circle-2',
    facts: [
      'Approved by AICTE, New Delhi',
      'Affiliated to MAKAUT, West Bengal',
      'NAAC Accredited Institution',
      'Strong Alumni Network Across Fortune 500',
    ],
    profileLabel: 'Explore College Profile',
    profileHref: '/colleges/iem-saltlake',
  },
  courses: {
    eyebrow: 'Academic Offerings',
    heading: 'Courses Offered at IEM Kolkata',
    intro:
      'Select any programme below to review curriculum details, campus availability, and preselect it for personal admission guidance.',
    detailsLabel: 'Course Details',
    items: [
      {
        icon: 'graduation-cap',
        duration: '4 Years (8 Semesters)',
        badge: 'Flagship Engineering',
        name: 'B.Tech (Bachelor of Technology)',
        description:
          'Four-year undergraduate engineering degree in CSE, AI/ML, IT, ECE, Electrical and Mechanical engineering affiliated with MAKAUT and approved by AICTE.',
        enquireLabel: 'Enquire for B.Tech',
        link: '/btech-admission-in-iem-kolkata',
      },
      {
        icon: 'briefcase',
        duration: '3 Years (6 Semesters)',
        badge: 'Undergraduate Management',
        name: 'BBA (Bachelor of Business Administration)',
        description:
          'Foundational business administration curriculum covering marketing, financial analytics, human resources and business entrepreneurship.',
        enquireLabel: 'Enquire for BBA',
        link: '/bba-admission-iem-2027',
      },
      {
        icon: 'laptop',
        duration: '3 Years (6 Semesters)',
        badge: 'IT & Software Foundations',
        name: 'BCA (Bachelor of Computer Applications)',
        description:
          'Comprehensive software development, web architecture, database management and application programming degree for tech aspirants.',
        enquireLabel: 'Enquire for BCA',
        link: '/bca-admission-iem-2027',
      },
      {
        icon: 'award',
        duration: '2 Years (4 Semesters)',
        badge: 'Postgraduate Management',
        name: 'MBA (Master of Business Administration)',
        description:
          'Advanced corporate management degree with dual specialisations in Finance, Marketing, HR, Systems and Supply Chain Management.',
        enquireLabel: 'Enquire for MBA',
        link: '/mba',
      },
    ],
  },
  eligibility: {
    eyebrow: 'Admissions Requirements',
    heading: 'IEM Kolkata Admission Eligibility',
    intro:
      'Eligibility differs by programme, admission year and applicable regulatory requirements. The following is general guidance only; final criteria must be checked against current official notices.',
    items: [
      {
        title: 'B.Tech Programme',
        labelClass: 'font-bold text-d2c-royal uppercase tracking-wider text-[11px]',
        text: 'Class 12 pass or appearing with compulsory Physics & Mathematics, plus Chemistry/Bio/CS. Minimum 45% aggregate in PCM (40% for reserved categories). Valid IEMJEE, WBJEE or JEE Main score.',
      },
      {
        title: 'BBA Programme',
        labelClass: 'font-bold text-purple-700 uppercase tracking-wider text-[11px]',
        text: 'Passed Class 12 / Higher Secondary in any stream (Science, Commerce, Arts) with English from a recognised board with minimum qualifying aggregate as per current MAKAUT norms.',
      },
      {
        title: 'BCA Programme',
        labelClass: 'font-bold text-emerald-700 uppercase tracking-wider text-[11px]',
        text: 'Class 12 passed in Science or Commerce with Mathematics / Computer Application / Information Practice as one of the subjects and English, securing prescribed minimum aggregate.',
      },
      {
        title: 'MBA Programme',
        labelClass: 'font-bold text-amber-700 uppercase tracking-wider text-[11px]',
        text: 'Recognised 3-year Bachelor’s degree in any discipline with minimum 50% aggregate (45% for reserved categories). Valid CAT, MAT, JEMAT or IEMJEE management score.',
      },
    ],
  },
  process: {
    eyebrow: 'Navigation Steps',
    heading: 'IEM Kolkata Admission Process',
    steps: [
      { label: 'Step 1', title: 'Course Selection', text: 'Choose your preferred course and specialisation based on career goals.' },
      { label: 'Step 2', title: 'Eligibility Verification', text: 'Review the current course-specific Class 12 or graduation percentage benchmarks.' },
      { label: 'Step 3', title: 'Entrance Exam Route', text: 'Apply for the official entrance exam specified by IEM (IEMJEE, WBJEE, CAT, etc.).' },
      { label: 'Step 4', title: 'Counseling & Interview', text: 'Complete counseling rounds or personal interviews where applicable.' },
      { label: 'Step 5', title: 'Document Verification', text: 'Submit verified original marksheets, admit cards and identity credentials.' },
      { label: 'Step 6', title: 'Enrollment & Fees', text: 'Complete admission formalities and pay semester fees via institutional bank portals.' },
    ],
    ctaLabel: 'CHECK YOUR ELIGIBILITY',
  },
  whyIem: {
    title: 'Why Consider IEM Kolkata?',
    bulletIcon: 'check-circle-2',
    items: [
      'Premier technical and management education options in Sector V IT Corridor.',
      'Modern laboratories, digital libraries, and collaborative research incubators.',
      'Active student clubs, technical hackathons, and corporate mentorship programmes.',
      'Consistently proven placement engagements with major corporate recruiters.',
    ],
  },
  whyD2c: {
    title: 'Why Direct2Campus Guidance?',
    text: 'Choosing a college and course is an important decision. Direct2Campus helps students and parents understand course options, eligibility requirements, entrance examination procedures, application steps, documentation and admission timelines. Admission remains subject to IEM’s official criteria and approval.',
    bulletIcon: 'sparkles',
    items: [
      'Course and specialisation comparison guidance.',
      'Transparent explanation of quota and fee structures.',
      'Step-by-step assistance with official documentation.',
    ],
  },
  form: {
    ...iemFormDefaults,
    title: 'Get Admission Guidance for IEM Kolkata',
    subtitle: 'Share your details and the Direct2Campus admission guidance team will contact you.',
  },
  faqs: {
    eyebrow: 'Frequently Asked',
    heading: 'Questions & Answers',
    icon: 'help-circle',
    items: [
      {
        q: 'Can I get admission in IEM Kolkata?',
        a: 'Admission is subject to the institution’s eligibility and selection process. Students should check the official course-specific admission route. Direct2Campus can provide guidance, explain cutoff nuances and quota procedures, but cannot guarantee admission or allotment.',
      },
      {
        q: 'Is admission open at IEM Kolkata for 2027?',
        a: 'Students should check the official IEM admission portal and entrance examination websites (exam.iem.edu.in) for the latest 2027 application dates, slot bookings, and counseling notifications.',
      },
      {
        q: 'What courses are available at IEM Kolkata?',
        a: 'Course availability depends on the campus and admission intake. Programmes offered include B.Tech in multiple specialisations, BBA, BCA, MBA, and MCA. Check the current official programme list for specific campus affiliations.',
      },
      {
        q: 'What is the eligibility for B.Tech at IEM?',
        a: 'Applicants must meet the current Class 12 subject (Physics & Mathematics compulsory) and minimum marks requirements (typically 45% aggregate in PCM) along with applicable entrance examination scores (IEMJEE, WBJEE, or JEE Main).',
      },
      {
        q: 'Does IEM Kolkata offer management quota admission?',
        a: 'Institutions generally have prescribed institutional / management quota provisions subject to regulatory standards. Direct2Campus assists students in understanding verified institutional quota pathways, eligibility benchmarks, and official fee receipts.',
      },
      {
        q: 'What is the fee structure of IEM Kolkata?',
        a: 'Fees vary by course and admission intake. For B.Tech, total tuition fees are approximately ₹7.65L to ₹8.70L. BBA and BCA fees are approximately ₹3.2L to ₹3.8L total, while MBA fees are approximately ₹6.0L to ₹6.5L. Always confirm official payment instructions directly with the institution.',
      },
      {
        q: 'Does IEM accept IEMJEE scores?',
        a: 'Yes, IEMJEE is the official institutional entrance examination conducted across multiple phases for admission to IEM and UEM Group campuses.',
      },
      {
        q: 'How can I get admission guidance from Direct2Campus?',
        a: 'Submit the enquiry form on this page or call our academic advisory desk directly at +91 62003 25137. Our team will review your academic background and explain the available options.',
      },
    ],
  },
};
