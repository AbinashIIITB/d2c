import { Metadata } from 'next';
import { IemBranchLandingTemplate, BranchPageConfig } from '@/components/landing/iem/IemBranchLandingTemplate';

export const metadata: Metadata = {
  title: 'IEM Kolkata Mechanical Engineering Direct Admission 2027',
  description: 'Explore IEM Kolkata Mechanical Engineering admission 2027. Learn about the discipline, eligibility checks, admission steps and how to enquire.',
  keywords: [
    'IEM Kolkata Mechanical Engineering direct admission',
    'IEM Kolkata Mechanical Engineering',
    'Mechanical Engineering Admission in IEM',
    'Direct Admission for Mechanical Engineering',
    'IEM Kolkata Mechanical Cutoff'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/iem-kolkata-mechanical-engineering-direct-admission'
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
    title: 'IEM Kolkata Mechanical Engineering Direct Admission 2027',
    description: 'Explore IEM Kolkata Mechanical Engineering admission 2027. Learn about the discipline, eligibility checks, admission steps and how to enquire.',
    url: 'https://direct2campus.com/iem-kolkata-mechanical-engineering-direct-admission',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata Mechanical Engineering Admission' }]
  }
};

const meConfig: BranchPageConfig = {
  branchName: 'Mechanical Engineering',
  shortBranch: 'Mechanical',
  slug: 'iem-kolkata-mechanical-engineering-direct-admission',
  seoTitle: 'IEM Kolkata Mechanical Engineering Direct Admission 2027',
  metaDescription: 'Explore IEM Kolkata Mechanical Engineering admission 2027. Learn about the discipline, eligibility checks, admission steps and how to enquire.',
  primaryKeyword: 'IEM Kolkata Mechanical Engineering direct admission',
  h1: 'IEM Kolkata Mechanical Engineering Direct Admission 2027',
  heroCopy: 'Interested in machines, product design, manufacturing and engineering systems? Explore Mechanical Engineering admission information for IEM Kolkata’s 2027 intake. This page introduces the discipline and explains the checks to complete before applying. Students searching for direct admission should confirm the official selection route and eligibility with IEM; no seat or admission outcome is guaranteed.',
  aboutProgramme: 'Mechanical Engineering applies engineering principles to the design, analysis, production and operation of machines and mechanical systems. Depending on the official curriculum, subjects may include engineering mechanics, thermodynamics, fluid mechanics, materials, manufacturing processes, machine design and CAD-related applications.',
  whyExplore: 'Mechanical Engineering may interest students who enjoy physics, design, practical problem-solving and understanding how machines and products work. Review the official course structure, workshop and laboratory facilities, project opportunities and electives before deciding.',
  eligibilityCopy: 'The exact 2027 eligibility conditions must be verified with IEM. Check the required Class 12 subjects, minimum marks, entrance examination and any additional branch-specific conditions. Confirm that the programme is available at the campus you prefer.',
  admissionProcessCopy: 'Check the official 2027 programme and campus list. Confirm eligibility and the required entrance or selection route. Submit the application through IEM’s official process, provide the requested documents and follow the institution’s instructions for examination, counselling and admission formalities.',
  feesCopy: 'For the latest fee amount, semester-wise schedule and additional charges, refer to the official IEM fee notice or contact the institution. The currently published general B.Tech fee information should not be represented as a confirmed branch-specific 2027 quote until verified.',
  careerOpportunities: [
    'Mechanical Design Engineer',
    'Robotics & Automation Specialist',
    'Thermal & Fluid Systems Analyst',
    'CAD / CAM Design Associate',
    'Manufacturing & Production Engineer',
    'Automotive Systems Engineer',
    'Quality Assurance & Inspection Lead',
    'Industrial Operations Specialist'
  ],
  faqs: [
    {
      q: 'What is Mechanical Engineering about?',
      a: 'It focuses on the design, analysis, manufacturing, thermodynamics, and operation of machines, mechanical equipment, and automated manufacturing systems.'
    },
    {
      q: 'What subjects are commonly relevant to Mechanical Engineering?',
      a: 'Mathematics and Physics foundations are critical for engineering mechanics and thermodynamics. Candidates must have qualifying Class 12 marks with PCM.'
    },
    {
      q: 'Is Mechanical Engineering available at IEM Kolkata in 2027?',
      a: 'Yes, Mechanical Engineering is offered under MAKAUT affiliation. Check the official campus-wise programme list for the 2027 intake with our admissions team.'
    },
    {
      q: 'What is the Mechanical Engineering fee?',
      a: 'Fees follow the standard B.Tech fee schedule (approx. ₹7.65L to ₹8.70L across 4 years). Request the official 2027 fee schedule for current semester amounts.'
    },
    {
      q: 'Can Direct2Campus confirm admission?',
      a: 'Direct2Campus can explain published information and assist with application guidance, but only IEM can confirm eligibility, selection, and seat allotment.'
    }
  ],
  relatedBranches: [
    { name: 'Electrical Engineering', url: '/iem-kolkata-electrical-engineering-direct-admission' },
    { name: 'ECE Admission 2027', url: '/iem-kolkata-ece-direct-admission' },
    { name: 'CSE Admission 2027', url: '/iem-kolkata-cse-direct-admission' }
  ],
  altCampus: 'IEM Kolkata Mechanical Engineering admission 2027',
  altLab: 'Mechanical Engineering programme at IEM Kolkata'
};

export default function IemMeLandingPage() {
  return <IemBranchLandingTemplate config={meConfig} />;
}
