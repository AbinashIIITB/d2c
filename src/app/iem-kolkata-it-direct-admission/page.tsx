import { Metadata } from 'next';
import { IemBranchLandingTemplate, BranchPageConfig } from '@/components/landing/iem/IemBranchLandingTemplate';

export const metadata: Metadata = {
  title: 'IEM Kolkata IT Direct Admission 2027 – Eligibility & Fees',
  description: 'Explore IEM Kolkata Information Technology admission 2027. Check IT programme details, eligibility, admission process and fee information.',
  keywords: [
    'IEM Kolkata IT direct admission',
    'IEM Kolkata Information Technology',
    'IT Admission in IEM 2027',
    'Direct Admission for IT in IEM',
    'IEM Information Technology Cutoff'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/iem-kolkata-it-direct-admission'
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
    title: 'IEM Kolkata IT Direct Admission 2027 – Eligibility & Fees',
    description: 'Explore IEM Kolkata Information Technology admission 2027. Check IT programme details, eligibility, admission process and fee information.',
    url: 'https://direct2campus.com/iem-kolkata-it-direct-admission',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata Information Technology Admission' }]
  }
};

const itConfig: BranchPageConfig = {
  branchName: 'Information Technology (IT)',
  shortBranch: 'IT',
  slug: 'iem-kolkata-it-direct-admission',
  seoTitle: 'IEM Kolkata IT Direct Admission 2027 – Eligibility & Fees',
  metaDescription: 'Explore IEM Kolkata Information Technology admission 2027. Check IT programme details, eligibility, admission process and fee information.',
  primaryKeyword: 'IEM Kolkata IT direct admission',
  h1: 'IEM Kolkata Information Technology (IT) Direct Admission 2027',
  heroCopy: 'Planning to study Information Technology at IEM Kolkata? This page is designed for students researching IEM Kolkata IT admission for the 2027 intake. Find an overview of the subject area, the admission checks to complete and a direct route to enquire with Direct2Campus. Admission remains subject to IEM’s official eligibility and selection process.',
  aboutProgramme: 'Information Technology focuses on the use, development and management of computing systems and digital information. Relevant study areas may include programming, databases, software engineering, computer networks, information systems, cybersecurity fundamentals and IT infrastructure. Check IEM’s published curriculum for the precise modules offered.',
  whyExplore: 'IT may suit students interested in applying computing to business, organisations and digital services. Compare the IT syllabus with CSE to understand the programme emphasis, core subjects, electives and practical components before selecting a branch.',
  eligibilityCopy: 'The 2027 eligibility requirements must be confirmed from IEM’s official admission notice. Check the required Class 12 subjects, minimum marks, entrance route and any programme-specific conditions. Do not assume that eligibility for CSE or another branch automatically applies to IT.',
  admissionProcessCopy: 'Check whether IT is offered at your preferred IEM campus for the 2027 intake. Confirm eligibility and entrance requirements, complete the official application, upload the requested documents and follow the institution’s instructions for selection or counselling. Keep the application reference and fee receipts safely.',
  feesCopy: 'For the latest fee amount, semester-wise schedule and additional charges, refer to the official IEM fee notice or contact the institution. The currently published general B.Tech fee information should not be represented as a confirmed branch-specific 2027 quote until verified.',
  careerOpportunities: [
    'Cloud Systems Engineer',
    'Information Security Associate',
    'Enterprise Software Developer',
    'Database & Infrastructure Architect',
    'Network Solutions Engineer',
    'IT Business Analyst',
    'Quality Assurance Specialist',
    'Technical Operations Lead'
  ],
  faqs: [
    {
      q: 'What is Information Technology in B.Tech?',
      a: 'IT studies computing technologies and their real-world application in business information systems, software development, cloud computing, networks and enterprise digital services.'
    },
    {
      q: 'What is the eligibility for IEM Kolkata IT admission 2027?',
      a: 'Confirm the latest Class 12 subject and marks requirements in IEM’s official 2027 admission notice (typically minimum 45% aggregate in PCM in 10+2).'
    },
    {
      q: 'Is IT the same as Computer Science Engineering?',
      a: 'They share core programming, data structures, and computing foundations, but IT places greater emphasis on applied software systems, networking, web architectures, and business information management.'
    },
    {
      q: 'What is the fee for IEM IT?',
      a: 'Tuition fees are structured in line with IEM’s B.Tech schedule (approx. ₹7.65L to ₹8.70L total across 4 years). Check with our counselor for official 2027 batch breakdown.'
    },
    {
      q: 'How can I submit an IT admission enquiry?',
      a: 'Complete the enquiry form on this page. Information Technology (IT) is preselected as the preferred branch and remains fully editable.'
    }
  ],
  relatedBranches: [
    { name: 'CSE Admission 2027', url: '/iem-kolkata-cse-direct-admission' },
    { name: 'CSE AI & ML Admission', url: '/iem-kolkata-cse-ai-ml-direct-admission' },
    { name: 'ECE Admission 2027', url: '/iem-kolkata-ece-direct-admission' }
  ],
  altCampus: 'IEM Kolkata Information Technology (IT) admission 2027',
  altLab: 'Information Technology (IT) programme at IEM Kolkata'
};

export default function IemItLandingPage() {
  return <IemBranchLandingTemplate config={itConfig} />;
}
