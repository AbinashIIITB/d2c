import { Metadata } from 'next';
import { IemBranchLandingTemplate, BranchPageConfig } from '@/components/landing/iem/IemBranchLandingTemplate';

export const metadata: Metadata = {
  title: 'IEM Kolkata Electrical Engineering Direct Admission 2027',
  description: 'Explore IEM Kolkata Electrical Engineering admission 2027. Review the subject overview, eligibility checks, admission process and enquiry details.',
  keywords: [
    'IEM Kolkata Electrical Engineering direct admission',
    'IEM Kolkata Electrical Engineering',
    'Electrical Engineering Admission in IEM',
    'IEM EE Admission 2027',
    'IEM Kolkata Electrical Cutoff'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/iem-kolkata-electrical-engineering-direct-admission'
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
    title: 'IEM Kolkata Electrical Engineering Direct Admission 2027',
    description: 'Explore IEM Kolkata Electrical Engineering admission 2027. Review the subject overview, eligibility checks, admission process and enquiry details.',
    url: 'https://direct2campus.com/iem-kolkata-electrical-engineering-direct-admission',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata Electrical Engineering Admission' }]
  }
};

const eeConfig: BranchPageConfig = {
  branchName: 'Electrical Engineering',
  shortBranch: 'Electrical',
  slug: 'iem-kolkata-electrical-engineering-direct-admission',
  seoTitle: 'IEM Kolkata Electrical Engineering Direct Admission 2027',
  metaDescription: 'Explore IEM Kolkata Electrical Engineering admission 2027. Review the subject overview, eligibility checks, admission process and enquiry details.',
  primaryKeyword: 'IEM Kolkata Electrical Engineering direct admission',
  h1: 'IEM Kolkata Electrical Engineering Direct Admission 2027',
  heroCopy: 'Considering Electrical Engineering at IEM Kolkata for 2027? This page provides an introduction to the discipline and a checklist of the admission information students should verify. If you are searching for IEM Kolkata Electrical Engineering direct admission, use the enquiry form to discuss the current process; admission is subject to the institution’s official rules and selection.',
  aboutProgramme: 'Electrical Engineering deals with the generation, transmission, distribution and use of electrical energy, along with electrical machines, circuits, measurement, control and power systems. The precise course modules, laboratories and electives depend on the approved programme curriculum.',
  whyExplore: 'This branch may suit students interested in electrical systems, power infrastructure, machines, control applications and engineering problem-solving. Review the curriculum and practical training facilities to understand the programme’s focus before applying.',
  eligibilityCopy: 'Check the official 2027 IEM admission notification for the exact Class 12 subject requirements, minimum marks, entrance route and campus availability. Do not assume eligibility based on another branch or an earlier admission year.',
  admissionProcessCopy: 'Confirm that Electrical Engineering is listed for the 2027 intake and selected campus. Review the official eligibility rules, complete the institution’s application and follow all examination, counselling and document-submission instructions. Confirm all fee payments through official IEM channels.',
  feesCopy: 'For the latest fee amount, semester-wise schedule and additional charges, refer to the official IEM fee notice or contact the institution. The currently published general B.Tech fee information should not be represented as a confirmed branch-specific 2027 quote until verified.',
  careerOpportunities: [
    'Power Systems Engineer',
    'Control & Instrumentation Specialist',
    'Smart Grid Technologies Associate',
    'Electrical Design Engineer',
    'Renewable Energy Analyst',
    'Automation & PLC Engineer',
    'Industrial Operations Specialist',
    'Substation & Transmission Executive'
  ],
  faqs: [
    {
      q: 'What do students study in Electrical Engineering?',
      a: 'The discipline commonly covers electrical circuits, power generation, power electronics, transmission systems, electrical machines, control systems, and renewable energy integration.'
    },
    {
      q: 'What is the eligibility for IEM Electrical Engineering 2027?',
      a: 'Candidates must have passed Class 12 with Physics and Mathematics as compulsory subjects, alongside Chemistry or Technical Vocational subjects, with at least 45% aggregate in PCM.'
    },
    {
      q: 'Is Electrical Engineering offered at every IEM campus?',
      a: 'Campus-wise intake and availability can change. Confirm the 2027 branch list directly with our counseling desk or official IEM notices.'
    },
    {
      q: 'How much does the Electrical Engineering programme cost?',
      a: 'Tuition fees range approximately ₹7.65L to ₹8.70L across the 4-year degree. Request the official 2027 fee schedule for detailed semester breakdown.'
    },
    {
      q: 'How do I enquire?',
      a: 'Submit the enquiry form on this page. Electrical Engineering is preselected as your preferred branch.'
    }
  ],
  relatedBranches: [
    { name: 'ECE Admission 2027', url: '/iem-kolkata-ece-direct-admission' },
    { name: 'Mechanical Engineering', url: '/iem-kolkata-mechanical-engineering-direct-admission' },
    { name: 'CSE Admission 2027', url: '/iem-kolkata-cse-direct-admission' }
  ],
  altCampus: 'IEM Kolkata Electrical Engineering admission 2027',
  altLab: 'Electrical Engineering programme at IEM Kolkata'
};

export default function IemEeLandingPage() {
  return <IemBranchLandingTemplate config={eeConfig} />;
}
