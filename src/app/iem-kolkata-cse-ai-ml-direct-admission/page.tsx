import { Metadata } from 'next';
import { IemBranchLandingTemplate, BranchPageConfig } from '@/components/landing/iem/IemBranchLandingTemplate';

export const metadata: Metadata = {
  title: 'IEM Kolkata CSE AI & ML Direct Admission 2027 – Eligibility',
  description: 'Explore IEM Kolkata CSE AI & ML admission 2027. Review programme details, eligibility, admission steps and fees, then enquire with Direct2Campus.',
  keywords: [
    'IEM Kolkata CSE AI ML direct admission',
    'IEM Kolkata AI ML Admission 2027',
    'AI and ML Admission in IEM',
    'CSE AI ML Direct Admission Kolkata',
    'IEM Kolkata Artificial Intelligence'
  ],
  alternates: {
    canonical: 'https://direct2campus.com/iem-kolkata-cse-ai-ml-direct-admission'
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
    title: 'IEM Kolkata CSE AI & ML Direct Admission 2027 – Eligibility',
    description: 'Explore IEM Kolkata CSE AI & ML admission 2027. Review programme details, eligibility, admission steps and fees.',
    url: 'https://direct2campus.com/iem-kolkata-cse-ai-ml-direct-admission',
    siteName: 'Direct2Campus',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/colleges/iem-saltlake.jpg', width: 1200, height: 630, alt: 'IEM Kolkata CSE AI & ML Admission' }]
  }
};

const aimlConfig: BranchPageConfig = {
  branchName: 'CSE – Artificial Intelligence & Machine Learning',
  shortBranch: 'CSE (AI & ML)',
  slug: 'iem-kolkata-cse-ai-ml-direct-admission',
  seoTitle: 'IEM Kolkata CSE AI & ML Direct Admission 2027 – Eligibility',
  metaDescription: 'Explore IEM Kolkata CSE AI & ML admission 2027. Review programme details, eligibility, admission steps and fees, then enquire with Direct2Campus.',
  primaryKeyword: 'IEM Kolkata CSE AI ML direct admission',
  h1: 'IEM Kolkata CSE – Artificial Intelligence & Machine Learning Direct Admission 2027',
  heroCopy: 'Interested in Computer Science with a focus on Artificial Intelligence and Machine Learning? This guide is for students exploring IEM Kolkata CSE AI & ML admission for the 2027 intake. It outlines the subject area, key admission checks and how to submit an enquiry. The phrase "direct admission" does not mean guaranteed admission or exemption from IEM’s prescribed selection process.',
  aboutProgramme: 'Artificial Intelligence and Machine Learning are areas of computing concerned with systems that perform tasks using data, models and computational methods. A programme in this area may cover programming, mathematics, statistics, data handling, machine learning concepts, intelligent systems and software development. Confirm the exact subjects and course title in IEM’s current syllabus.',
  whyExplore: 'This specialisation may interest students who enjoy mathematics, coding, analytical thinking and exploring data-driven applications. Before choosing it, compare the official curriculum with the general CSE programme, and review the depth of core computer science subjects as well as the AI/ML electives.',
  eligibilityCopy: 'Check the official 2027 notice for the exact programme name, minimum marks, required subjects, entrance route and campus availability. IEM’s published criteria have shown different thresholds across CSE specialisations; do not assume that the general CSE eligibility applies to this branch.',
  admissionProcessCopy: 'Confirm that the CSE AI & ML programme is listed for the campus and intake you want. Verify academic eligibility and the applicable entrance or counselling process through IEM’s official portal. Submit the application and supporting documents as instructed. Keep copies of submitted forms and official communications.',
  feesCopy: 'For the latest fee amount, semester-wise schedule and additional charges, refer to the official IEM fee notice or contact the institution. The currently published general B.Tech fee information should not be represented as a confirmed branch-specific 2027 quote until verified.',
  careerOpportunities: [
    'Machine Learning Engineer',
    'AI Solutions Architect',
    'Data Scientist & Analytics Specialist',
    'Computer Vision Associate',
    'Natural Language Processing (NLP) Engineer',
    'Big Data Pipeline Developer',
    'Intelligent Systems Automation Engineer',
    'Software Research Associate'
  ],
  faqs: [
    {
      q: 'Is CSE AI & ML different from regular CSE?',
      a: 'It generally combines core computer science foundations (algorithms, operating systems, databases) with additional specialized coursework in artificial intelligence, neural networks, machine learning, and deep learning algorithms.'
    },
    {
      q: 'What is the eligibility for IEM CSE AI & ML 2027?',
      a: 'Refer to IEM’s official 2027 admission notice for the exact marks, subject and entrance requirements. Candidates typically need 45% aggregate in PCM in Class 12 with valid IEMJEE or WBJEE scores.'
    },
    {
      q: 'Does AI & ML admission require an entrance examination?',
      a: 'Follow the entrance and selection process specified by IEM for the 2027 intake. Candidates normally appear for IEMJEE 2027 or participate through WBJEE counseling.'
    },
    {
      q: 'What can I do after studying CSE AI & ML?',
      a: 'Depending on your skills and experience, you may explore software development, data science, AI application engineering, automation and research roles across global technology companies.'
    },
    {
      q: 'How do I enquire about this specialisation?',
      a: 'Use the enquiry form on this page. The programme is preselected as CSE – Artificial Intelligence & Machine Learning and remains editable.'
    }
  ],
  relatedBranches: [
    { name: 'Core CSE Admission', url: '/iem-kolkata-cse-direct-admission' },
    { name: 'IT Admission 2027', url: '/iem-kolkata-it-direct-admission' },
    { name: 'ECE Admission 2027', url: '/iem-kolkata-ece-direct-admission' }
  ],
  altCampus: 'IEM Kolkata CSE – Artificial Intelligence & Machine Learning admission 2027',
  altLab: 'CSE – Artificial Intelligence & Machine Learning programme at IEM Kolkata'
};

export default function IemAimlLandingPage() {
  return <IemBranchLandingTemplate config={aimlConfig} />;
}
