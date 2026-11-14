import { Metadata } from 'next';
import { IemBranchLandingTemplate, BranchPageConfig } from '@/components/landing/iem/IemBranchLandingTemplate';

export const metadata: Metadata = {
  title: 'IEM Kolkata ECE Direct Admission 2027 – Eligibility & Fees',
  description: 'Explore IEM Kolkata ECE admission 2027. Understand electronics and communication engineering, eligibility checks, admission steps and enquiry options.',
  keywords: [
    'IEM Kolkata ECE direct admission',
    'IEM Kolkata Electronics and Communication',
    'ECE Admission in IEM 2027',
    'Direct Admission for ECE in IEM',
    'IEM ECE Eligibility and Cutoff'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/iem-kolkata-ece-direct-admission'
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
    title: 'IEM Kolkata ECE Direct Admission 2027 – Eligibility & Fees',
    description: 'Explore IEM Kolkata ECE admission 2027. Understand electronics and communication engineering, eligibility checks, admission steps and enquiry options.',
    url: 'https://direct2campus.com/iem-kolkata-ece-direct-admission',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata ECE Admission' }]
  }
};

const eceConfig: BranchPageConfig = {
  branchName: 'Electronics & Communication Engineering (ECE)',
  shortBranch: 'ECE',
  slug: 'iem-kolkata-ece-direct-admission',
  seoTitle: 'IEM Kolkata ECE Direct Admission 2027 – Eligibility & Fees',
  metaDescription: 'Explore IEM Kolkata ECE admission 2027. Understand electronics and communication engineering, eligibility checks, admission steps and enquiry options.',
  primaryKeyword: 'IEM Kolkata ECE direct admission',
  h1: 'IEM Kolkata Electronics & Communication Engineering (ECE) Direct Admission 2027',
  heroCopy: 'Students interested in electronic devices, circuits and communication technologies can explore Electronics & Communication Engineering at IEM Kolkata. This page covers the ECE subject area and the key details to verify for the 2027 admission cycle. Use the enquiry form to discuss the programme with Direct2Campus; final eligibility and admission decisions rest with IEM.',
  aboutProgramme: 'Electronics & Communication Engineering combines concepts from electronic circuits, devices, signals, communication systems and related engineering fields. Depending on the approved curriculum, students may study circuit theory, digital electronics, electronic devices, signals and systems, communication engineering, embedded systems and laboratory practice.',
  whyExplore: 'ECE can appeal to students interested in both hardware and communication technologies, with opportunities to explore how electronic and digital systems are designed and used. Review the official syllabus, laboratory details and available electives to understand the programme at IEM.',
  eligibilityCopy: 'Confirm the current 2027 eligibility requirements, including Class 12 subjects, minimum marks, entrance examination and any other conditions, directly from IEM. The requirements may be different from those for CSE, IT or other engineering branches.',
  admissionProcessCopy: 'Verify that ECE is available at your preferred campus for the 2027 intake. Read the official admission notice, check the required academic subjects and marks, complete the application and follow the entrance, counselling or selection instructions published by IEM.',
  feesCopy: 'For the latest fee amount, semester-wise schedule and additional charges, refer to the official IEM fee notice or contact the institution. The currently published general B.Tech fee information should not be represented as a confirmed branch-specific 2027 quote until verified.',
  careerOpportunities: [
    'VLSI Design Engineer',
    'Embedded Systems Developer',
    'Telecommunications Network Engineer',
    'Hardware Validation Specialist',
    'Robotics & IoT Systems Associate',
    'Signal Processing Engineer',
    'RF & Wireless Systems Analyst',
    'Software Integration Engineer'
  ],
  faqs: [
    {
      q: 'What does ECE cover?',
      a: 'ECE covers semiconductor devices, digital electronics, microprocessors, signals and systems, telecommunications, embedded computing, and modern wireless communication technologies.'
    },
    {
      q: 'What subjects are important for ECE admission?',
      a: 'Engineering eligibility requires Physics and Mathematics as compulsory subjects in Class 12, alongside Chemistry or Computer Science.'
    },
    {
      q: 'Is ECE available at IEM Kolkata for 2027?',
      a: 'Yes, ECE is a premier core programme at IEM Kolkata. Confirm the campus-wise intake with our counselors before finalizing your application.'
    },
    {
      q: 'What is the ECE fee at IEM?',
      a: 'Tuition fees follow the standard IEM B.Tech schedule (approx. ₹7.65L to ₹8.70L across four years). Confirm semester-wise charges directly with our counseling team.'
    },
    {
      q: 'Can Direct2Campus guarantee an ECE seat?',
      a: 'No. Direct2Campus provides independent guidance and counseling support. Seat allotment is administered exclusively by the institution under official criteria.'
    }
  ],
  relatedBranches: [
    { name: 'IT Admission 2027', url: '/iem-kolkata-it-direct-admission' },
    { name: 'Electrical Engineering', url: '/iem-kolkata-electrical-engineering-direct-admission' },
    { name: 'CSE Admission 2027', url: '/iem-kolkata-cse-direct-admission' }
  ],
  altCampus: 'IEM Kolkata Electronics & Communication Engineering (ECE) admission 2027',
  altLab: 'Electronics & Communication Engineering (ECE) programme at IEM Kolkata'
};

export default function IemEceLandingPage() {
  return <IemBranchLandingTemplate config={eceConfig} />;
}
