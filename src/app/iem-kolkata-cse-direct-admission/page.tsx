import { Metadata } from 'next';
import { IemBranchLandingTemplate, BranchPageConfig } from '@/components/landing/iem/IemBranchLandingTemplate';

export const metadata: Metadata = {
  title: 'IEM Kolkata CSE Direct Admission 2027 – Eligibility & Fees',
  description: 'Explore IEM Kolkata CSE admission 2027. Check programme information, eligibility, admission steps and fee details. Enquire with Direct2Campus.',
  keywords: [
    'IEM Kolkata CSE direct admission',
    'IEM Kolkata CSE Admission 2027',
    'Direct Admission for CSE in IEM',
    'IEM Computer Science Eligibility',
    'IEM Kolkata CSE Cutoff'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/iem-kolkata-cse-direct-admission'
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
    title: 'IEM Kolkata CSE Direct Admission 2027 – Eligibility & Fees',
    description: 'Explore IEM Kolkata CSE admission 2027. Check programme information, eligibility, admission steps and fee details.',
    url: 'https://direct2campus.com/iem-kolkata-cse-direct-admission',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata CSE Admission 2027' }]
  }
};

const cseConfig: BranchPageConfig = {
  branchName: 'Computer Science & Engineering (CSE)',
  shortBranch: 'CSE',
  slug: 'iem-kolkata-cse-direct-admission',
  seoTitle: 'IEM Kolkata CSE Direct Admission 2027 – Eligibility & Fees',
  metaDescription: 'Explore IEM Kolkata CSE admission 2027. Check programme information, eligibility, admission steps and fee details. Enquire with Direct2Campus.',
  primaryKeyword: 'IEM Kolkata CSE direct admission',
  h1: 'IEM Kolkata Computer Science & Engineering (CSE) Direct Admission 2027',
  heroCopy: 'Looking for Computer Science & Engineering admission at IEM Kolkata for the 2027 intake? This page helps students and parents understand the CSE programme, the information to verify before applying, and the next steps for an admission enquiry. If you are exploring the phrase "IEM Kolkata CSE direct admission", please note that the applicable admission route, entrance requirements and seat availability must be confirmed with the institution.',
  aboutProgramme: 'Computer Science & Engineering introduces students to the principles behind computer systems and software. The subject area commonly includes programming, data structures, algorithms, databases, operating systems, computer networks and software engineering. The exact curriculum, electives and laboratory structure for the relevant IEM programme should be checked in the current official syllabus.',
  whyExplore: 'Students interested in logical problem-solving, software, computing systems and technology development may wish to explore CSE. Review the official curriculum, faculty information, laboratory facilities, academic regulations and internship or placement information before making a decision. Do not rely on unverified placement figures or claims.',
  eligibilityCopy: "Eligibility depends on the institution's current admission policy, qualifying examination subjects, minimum marks and any entrance or counselling requirements. IEM's currently published admission information has shown branch-specific academic thresholds; applicants must confirm the exact CSE criteria for the 2027 intake directly with IEM. Do not publish an assumed percentage as final.",
  admissionProcessCopy: "Review the official IEM 2027 admission notice and confirm the accepted entrance route. Check the CSE-specific eligibility and campus availability. Complete the application through the official process, submit the required documents, and follow the institution's instructions for examination, counselling or subsequent admission steps. Direct2Campus can help organise questions and explain the published information, but cannot determine admission.",
  feesCopy: 'For the latest fee amount, semester-wise schedule and additional charges, refer to the official IEM fee notice or contact the institution. The currently published general B.Tech fee information should not be represented as a confirmed branch-specific 2027 quote until verified.',
  careerOpportunities: [
    'Software Development Engineer (SDE)',
    'Full Stack Web Developer',
    'Systems Architect',
    'Cloud Solutions Associate',
    'Database Administrator (DBA)',
    'DevOps & QA Automation Engineer',
    'Cybersecurity Analyst',
    'Product Engineering Specialist'
  ],
  faqs: [
    {
      q: 'What is the eligibility for IEM Kolkata CSE admission 2027?',
      a: "The exact academic and subject requirements must be checked in IEM's official 2027 admission notice. Requirements typically include Class 12 with Physics, Mathematics, and Chemistry/CS with at least 45% aggregate in PCM (40% for reserved categories)."
    },
    {
      q: 'Can I get direct admission to CSE at IEM Kolkata?',
      a: 'The phrase is commonly used by students searching for admission guidance. The actual admission route, entrance requirements and seat allocation are controlled by IEM. Confirm the current process with the institution; no admission is guaranteed.'
    },
    {
      q: 'What subjects are important for CSE?',
      a: "Mathematics and foundational science subjects are essential to engineering eligibility and computational logic. Check IEM's official subject-wise criteria for the 2027 intake."
    },
    {
      q: 'What is the CSE fee at IEM Kolkata?',
      a: 'Confirm the latest branch- and campus-applicable fee schedule with IEM. The fee shown on the general college page (approx. ₹7.65L to ₹8.70L total) should be treated as indicative until verified for the 2027 batch.'
    },
    {
      q: 'Where can I compare other IEM engineering branches?',
      a: 'Visit the IEM Kolkata B.Tech admission hub page to compare CSE with CSE (AI & ML), IT, ECE, Electrical, and Mechanical engineering offerings.'
    }
  ],
  relatedBranches: [
    { name: 'CSE AI & ML Admission', url: '/iem-kolkata-cse-ai-ml-direct-admission' },
    { name: 'IT Admission 2027', url: '/iem-kolkata-it-direct-admission' },
    { name: 'ECE Admission 2027', url: '/iem-kolkata-ece-direct-admission' }
  ],
  altCampus: 'IEM Kolkata Computer Science & Engineering (CSE) admission 2027',
  altLab: 'Computer Science & Engineering (CSE) programme at IEM Kolkata'
};

export default function IemCseLandingPage() {
  return <IemBranchLandingTemplate config={cseConfig} />;
}
