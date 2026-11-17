// Defaults for the `home` content document: what the public home page shows today.
// Plain data only (no server-only imports): client components import this as their prop default.
import type { SeoFields } from '@/lib/cms/types';

const seo: SeoFields = {
  title: 'Direct2Campus – Your Shortcut to the Right Campus',
  description:
    "India's most trusted educational consultancy. Get admission guidance for B.Tech, MBBS, MBA & BDS. Compare 150+ colleges and secure your seat with expert counselling.",
  canonical: 'https://direct2campus.com',
};

export const homeDefaults = {
  seo,

  // Optional bar above the hero. Not shown unless `enabled` is switched on.
  announcement: {
    enabled: false,
    badge: 'NEW',
    message: '',
    link: '',
    linkText: 'Learn More',
    dismissLabel: 'Dismiss banner',
  },

  hero: {
    backgroundImage: '/images/hero-graduation-bg.png',
    backgroundImageAlt: 'Graduating students celebrating',
    logoImage: '/logo-footer.png',
    logoImageAlt: 'Direct2Campus',
    titleLine1: 'Get Admission',
    mobileTitleLine2: 'Guidance for',
    rotatingWords: ['B.Tech', 'MBA', 'Medical'],
    desktopTitleLine2: 'Guidance from',
    desktopTitleHighlight: 'Verified Experts',
    mobileDescription: 'Compare colleges, check eligibility, and secure your seat with expert counselling.',
    desktopDescription:
      'Compare colleges, check eligibility, and secure your seat with expert counselling. Your path to a premium education simplified.',
    primaryButtonLabel: 'Get Free Counselling',
    secondaryButton: { label: 'Explore Colleges', href: '/colleges', newTab: false },
    maleStudentImage: '/images/hero-student-male.png',
    maleStudentImageAlt: 'Indian male college student',
    femaleStudentImage: '/images/hero-student-female.png',
    femaleStudentImageAlt: 'Indian female college student',
    stats: [
      { icon: 'users', tone: 'blue', value: 500, suffix: '+', duration: 2200, label: 'Students' },
      { icon: 'building', tone: 'gold', value: 90, suffix: '+', duration: 1800, label: 'Colleges' },
      { icon: 'map-pin', tone: 'green', value: 12, suffix: '', duration: 1500, label: 'States' },
    ],
  },

  trust: {
    items: [
      {
        icon: 'shield-check',
        tone: 'navy',
        title: "India's Trusted Partner",
        desc: 'Bridging the gap between students and premium campuses since 2012.',
      },
      {
        icon: 'graduation-cap',
        tone: 'royal',
        title: '100% Admission Support',
        desc: 'Dedicated 1-on-1 counseling from shortlisting to final enrollment.',
      },
      {
        icon: 'badge-check',
        tone: 'success',
        title: 'Verified Institutions',
        desc: 'Guidance for 150+ premium engineering & medical colleges.',
      },
    ],
  },

  banners: {
    enabled: true,
    slides: [
      {
        image: '/images/banners/heritage_enhanced.png',
        alt: 'Heritage Institute of Medical Sciences',
        title: 'Heritage Institute of Medical Sciences',
        subtitle: 'Premier Medical Institution in Varanasi — High-definition Campus View',
        link: '/colleges',
        badge: 'Top Medical',
      },
      {
        image: '/images/banners/jis_enhanced.png',
        alt: 'JIS College of Engineering Campus',
        title: 'JIS College of Engineering Campus',
        subtitle: 'Leading Institution with AI & Robotics Research Centers',
        link: '/colleges',
        badge: 'Autonomous',
      },
      {
        image: '/images/banners/ncr_enhanced.png',
        alt: 'NCR Institute of Medical Sciences',
        title: 'NCR Institute of Medical Sciences',
        subtitle: 'Leading Medical Healthcare & Education Complex in Meerut',
        link: '/colleges',
        badge: 'NMC Approved',
      },
    ],
  },

  procedure: {
    badge: 'Your Journey',
    heading: 'How Our Admission Guidance Works',
    // Contains a non-breaking hyphen (U+2011) exactly as the live page does.
    subheading: 'A streamlined 4‑step journey from consultation to confirmed admission',
    stepLabel: 'Step',
    steps: [
      {
        title: 'Free Consultation',
        subtitle: 'Tell us your goals',
        desc: 'Start with a one-on-one session with our expert counsellors to build a personalised admission roadmap based on your profile.',
        image: '/images/steps/step-consultation.png',
        imageAlt: 'Free Consultation',
        icon: 'message-circle',
        color: '#3B4CC0',
        tone: 'blue',
      },
      {
        title: 'College Shortlisting',
        subtitle: 'Data-backed research',
        desc: 'We curate a personalised shortlist of colleges with detailed placement records, fee breakdowns, and campus insights.',
        image: '/images/steps/step-shortlisting.png',
        imageAlt: 'College Shortlisting',
        icon: 'search',
        color: '#5B9BD5',
        tone: 'sky',
      },
      {
        title: 'Application & Docs',
        subtitle: 'Paperwork handled',
        desc: 'No missed deadlines, no incorrect submissions — we ensure a flawless application process from start to finish.',
        image: '/images/steps/step-application.png',
        imageAlt: 'Application & Docs',
        icon: 'file-text',
        color: '#D4A843',
        tone: 'amber',
      },
      {
        title: 'Confirmed Admission',
        subtitle: 'Seat secured!',
        desc: 'Once accepted, we guide you through fee payment, hostel allotment, orientation, and everything you need to start your journey.',
        image: '/images/steps/step-confirmed.png',
        imageAlt: 'Confirmed Admission',
        icon: 'graduation-cap',
        color: '#22C55E',
        tone: 'green',
      },
    ],
  },

  featuredColleges: {
    heading: 'Top Colleges',
    description: 'Explore premium institutions where we guide students through every step of admission.',
    viewAll: { label: 'View All Colleges', href: '/colleges', newTab: false },
    count: 6,
  },

  contact: {
    eyebrow: 'Get in Touch',
    headingPrefix: 'Start Your Admission',
    headingHighlight: 'Journey Today',
    description:
      'Fill out this quick form and our expert counsellors will get back to you within 2 hours with a personalised admission roadmap for your dream college.',
    whatsappButton: { label: 'WhatsApp Us', href: 'https://wa.me/916200325137', newTab: true },
    callButton: { label: 'Call Now', href: 'tel:+916200325137', newTab: false },
    formTitle: 'Get Free Counselling',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+91',
    submitLabel: 'Get Free Consultation',
    sendingLabel: 'Sending...',
    successLabel: "✓ We'll call you shortly!",
  },

  cta: {
    backgroundImage: '/images/cta-3d-graphic.png',
    backgroundImageAlt: 'Background mesh',
    badge: 'Your Premium Path',
    headingPrefix: 'Ready to Secure Your',
    headingHighlight: 'Future?',
    description:
      'Connect with our veteran counsellors today. Get a free, data-backed profile evaluation and find out which premium colleges perfectly match your academic ambitions.',
    whatsappButton: { label: 'WhatsApp Now', href: 'https://wa.me/916200325137', newTab: true },
    callbackLabel: 'Request Callback',
  },

  welcomeModal: {
    enabled: false,
    autoOpenDelaySeconds: 3,
    badge: 'SESSION 2026-27',
    title: 'Get 1-on-1 Admission Guidance',
    subtitle:
      'Speak directly with senior academic counselors to check eligibility, fee structure, and seat availability.',
    offerText: '⚡ Verified Seat Guidance | Transparent Process | 100% Genuine Guidance',
    nameLabel: 'Your Full Name *',
    namePlaceholder: 'e.g. Rahul Sharma',
    phoneLabel: 'WhatsApp / Phone *',
    phonePlaceholder: '10-digit number',
    emailLabel: 'Email Address',
    emailPlaceholder: 'yourname@gmail.com',
    courseLabel: 'Interested Course *',
    courseOptions: [
      'B.Tech Computer Science & Engineering',
      'B.Tech (Other Branches)',
      'MBBS / BDS Medical',
      'MBA / PGDM Management',
      'BCA / MCA Computer Applications',
      'BBA / Law / Pharmacy',
    ],
    buttonText: 'Request Free Counseling Call',
    loadingText: 'Connecting with Counselor...',
    footnote: '100% Confidential • Trusted Admission Guidance',
    successTitle: 'Request Received!',
    successTextBefore: 'Our chief admission counselor will call you shortly on',
    successTextAfter: 'with seat availability and fee guidance.',
    closeLabel: 'Close',
  },
};

export type HomeContent = typeof homeDefaults;
