// Builds the default content of one IEM branch landing page (CSE, AI/ML, IT, ECE, Electrical, Mechanical).
// The static text shared by all six pages lives here; each iem-<branch>.defaults.ts supplies the branch-specific copy.
import { IEM_BASE, iemFormDefaults, seoDefaults, type IemBranchContent } from './iem-branch.schema';

export interface BranchParams {
  branchName: string;
  shortBranch: string;
  /** Route path without leading slash, e.g. iem-kolkata-cse-admission */
  path: string;
  seoTitle: string;
  metaDescription: string;
  ogDescription: string;
  keywords: string[];
  ogImageAlt: string;
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
}

export function makeBranchDefaults(p: BranchParams): IemBranchContent {
  return {
    seo: seoDefaults({
      title: p.seoTitle,
      description: p.metaDescription,
      keywords: p.keywords,
      path: p.path,
      ogDescription: p.ogDescription,
    }),
    ogImageAlt: p.ogImageAlt,
    breadcrumbSchema: [
      { name: 'Home', url: IEM_BASE },
      { name: 'Colleges', url: `${IEM_BASE}/colleges` },
      { name: 'IEM Kolkata', url: `${IEM_BASE}/colleges/iem-saltlake` },
      { name: 'B.Tech Admission 2027', url: `${IEM_BASE}/btech-admission-in-iem-kolkata` },
      { name: `${p.shortBranch} Admission`, url: `${IEM_BASE}/${p.path}` },
    ],
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'IEM Kolkata', href: '/colleges/iem-saltlake' },
      { label: 'B.Tech 2027', href: '/btech-admission-in-iem-kolkata' },
    ],
    crumbLast: `${p.shortBranch} Admission`,
    hero: {
      badgeIcon: 'sparkles',
      badge: '2027 Engineering Specialisation Guide',
      h1: p.h1,
      copy: p.heroCopy,
      primaryIcon: 'graduation-cap',
      primaryLabel: `ENQUIRE FOR ${p.shortBranch} ADMISSION`,
      secondaryLabel: 'CHECK ELIGIBILITY',
      image: '/images/colleges/iem-saltlake.jpg',
      imageAlt: p.altCampus,
      cardEyebrow: `${p.shortBranch} Programme`,
      cardTitle: 'Institute of Engineering & Management',
      cardSubtitle: 'Kolkata Campus (Intake 2027)',
      facts: [
        { label: 'Degree:', value: '4-Year Full-Time B.Tech', valueClass: 'font-semibold text-white' },
        { label: 'Approved Quota Routes:', value: 'IEMJEE / WBJEE / JEE Main', valueClass: 'font-semibold text-emerald-400' },
      ],
    },
    notice: {
      label: 'Transparency Notice:',
      text: 'Direct2Campus is an educational guidance service. Admission is governed exclusively by IEM Kolkata through prescribed selection criteria. Direct2Campus does not promise seats or unofficial routes.',
    },
    about: {
      eyebrow: 'Academic Overview',
      heading: `About the ${p.branchName} Programme`,
      intro: p.aboutProgramme,
      whyHeading: 'Why Explore This Programme?',
      why: p.whyExplore,
      highlightsIcon: 'building-2',
      highlightsTitle: 'Programme Highlights',
      highlightsBulletIcon: 'check-circle-2',
      highlights: [
        'Affiliated to MAKAUT & Approved by AICTE',
        'Industry-Aligned Laboratory Curriculum',
        'Capstone Project & Internship Assistance',
        'Dedicated Career Development Support',
      ],
      compareLabel: 'Compare All B.Tech Branches',
      compareHref: '/btech-admission-in-iem-kolkata',
    },
    eligibility: {
      eyebrow: '2027 Guidelines',
      heading: 'Eligibility for 2027 Admission',
      copy: p.eligibilityCopy,
      boxes: [
        { title: 'Qualifying Examination', text: '10+2 / Class 12 / Higher Secondary from recognized board' },
        { title: 'Subject Combination', text: 'Compulsory Physics & Mathematics + Chemistry / Tech subject' },
      ],
      ctaLabel: 'CHECK YOUR ELIGIBILITY',
      ctaNote: 'Get your Class 12 scorecard reviewed by our counselor.',
    },
    process: {
      icon: 'file-check-2',
      title: 'Admission Process',
      copy: p.admissionProcessCopy,
      steps: [
        'Confirm branch availability and 2027 intake with IEM.',
        'Register for IEMJEE 2027 at exam.iem.edu.in or apply via WBJEE.',
        'Participate in official counseling and seat verification.',
        'Complete provisional enrollment and secure fee submission.',
      ],
    },
    fees: {
      icon: 'credit-card',
      title: 'Fees & Payment Information',
      copy: p.feesCopy,
      linkLabel: 'View IEM Kolkata Courses and Fees',
      linkHref: '/colleges/iem-saltlake',
      linkIcon: 'external-link',
    },
    careers: {
      eyebrow: 'Career Pathways',
      heading: `Career Opportunities for ${p.shortBranch} Graduates`,
      icon: 'briefcase',
      intro: 'Illustrative professional trajectories based on core industry specialisations and hands-on project work.',
      bulletIcon: 'check-circle-2',
      items: p.careerOpportunities,
    },
    formDefaultBranch: p.branchName,
    form: {
      ...iemFormDefaults,
      title: `Enquire About ${p.branchName} Admission`,
      subtitle:
        'Share your details and preferred programme. A Direct2Campus representative can help you understand the published admission information and next steps.',
    },
    faqs: {
      eyebrow: 'Branch FAQs',
      heading: 'Frequently Asked Questions',
      icon: 'help-circle',
      items: p.faqs,
    },
    related: {
      title: 'Related IEM Admission Pages',
      intro: 'Explore sibling engineering branches and college resources.',
      links: [
        { label: 'IEM B.Tech Hub 2027', href: '/btech-admission-in-iem-kolkata' },
        { label: 'IEM Courses & Fees', href: '/colleges/iem-saltlake' },
      ],
      branches: p.relatedBranches.map((r) => ({ label: r.name, href: r.url })),
    },
    finalCta: {
      heading: `Planning to Apply for ${p.branchName} at IEM Kolkata?`,
      text: 'Submit your enquiry to discuss the programme, eligibility checks, cutoff scores, and official application steps with an advisor.',
      label: 'ENQUIRE NOW',
    },
  };
}
