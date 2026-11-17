// Shared schema pieces + types for the IEM Kolkata landing-page documents
// (iem-hub, iem-btech and the six branch pages iem-cse … iem-mechanical).
import type { Field, SchemaSection, SeoFields } from '@/lib/cms/types';

// ---------------------------------------------------------------- field helpers
export const tf = (key: string, label: string, help?: string): Field => ({ key, label, type: 'text', help });
export const ta = (key: string, label: string, help?: string): Field => ({ key, label, type: 'textarea', help });
export const uf = (key: string, label: string, help?: string): Field => ({ key, label, type: 'url', help });
export const imf = (key: string, label: string): Field => ({ key, label, type: 'image' });
export const icf = (key: string, label: string, help?: string): Field => ({ key, label, type: 'icon', help });
export const sl = (key: string, label: string, help?: string): Field => ({ key, label, type: 'stringList', help });
export const grp = (key: string, label: string, fields: Field[], help?: string): Field => ({ key, label, type: 'group', fields, help });
export const lst = (key: string, label: string, itemLabel: string, titleKey: string, fields: Field[], help?: string): Field => ({
  key,
  label,
  type: 'list',
  itemLabel,
  titleKey,
  fields,
  help,
});

// ---------------------------------------------------------------- shared types
export interface IemLink {
  label: string;
  href: string;
}
export interface IemFaqContent {
  eyebrow: string;
  heading: string;
  icon: string;
  items: { q: string; a: string }[];
}
export interface IemNotice {
  label: string;
  text: string;
}
export interface IemOption {
  value: string;
  label: string;
}
export interface IemFormContent {
  title: string;
  subtitle: string;
  badge: string;
  successTitle: string;
  successBody: string;
  callLabel: string;
  callHref: string;
  submitAnotherLabel: string;
  labels: {
    name: string;
    phone: string;
    email: string;
    emailHint: string;
    city: string;
    course: string;
    specialisation: string;
    campus: string;
    status: string;
    stream: string;
    exam: string;
  };
  placeholders: { name: string; phone: string; email: string; city: string };
  courseOptions: IemOption[];
  specialisationOptions: IemOption[];
  campusOptions: IemOption[];
  statusOptions: IemOption[];
  streamOptions: IemOption[];
  examOptions: IemOption[];
  consentBefore: string;
  privacyLabel: string;
  privacyHref: string;
  consentAfter: string;
  submitLabel: string;
  submittingLabel: string;
  trustNote1: string;
  trustNote2: string;
  errors: { name: string; phone: string; consent: string };
}

export const IEM_BASE = 'https://direct2campus.com';
export const IEM_OG_IMAGE = '/images/colleges/iem-saltlake.jpg';

// ---------------------------------------------------------------- shared defaults
export const iemFormDefaults: IemFormContent = {
  title: 'Get B.Tech Admission Guidance for IEM Kolkata',
  subtitle:
    'Share your details and the Direct2Campus team can help you understand the B.Tech programme options and admission process.',
  badge: '2027 Admission Guidance',
  successTitle: 'Enquiry Submitted Successfully!',
  successBody:
    'Thank you for contacting Direct2Campus. Your B.Tech admission enquiry has been received. Our senior academic guidance team will contact you shortly using the details provided.',
  callLabel: 'Call Admissions Now (+91 62003 25137)',
  callHref: 'tel:+916200325137',
  submitAnotherLabel: 'Submit Another Enquiry',
  labels: {
    name: 'Student Full Name',
    phone: 'Mobile Number',
    email: 'Email Address',
    emailHint: '(optional)',
    city: 'Current City / Location',
    course: 'Interested Programme',
    specialisation: 'Preferred Specialisation / Branch',
    campus: 'Preferred Campus',
    status: 'Academic Status',
    stream: 'Class 12 Stream',
    exam: 'IEMJEE Exam Status',
  },
  placeholders: {
    name: 'e.g. Rahul Sharma',
    phone: '10-digit mobile number',
    email: 'rahul@example.com',
    city: 'e.g. Kolkata, Patna, Ranchi',
  },
  courseOptions: [
    { value: 'B.Tech', label: 'B.Tech (Bachelor of Technology)' },
    { value: 'BBA', label: 'BBA (Bachelor of Business Administration)' },
    { value: 'BCA', label: 'BCA (Bachelor of Computer Applications)' },
    { value: 'MBA', label: 'MBA (Master of Business Administration)' },
    { value: 'Other', label: 'Other Programme' },
  ],
  specialisationOptions: [
    { value: 'Computer Science & Engineering (CSE)', label: 'Computer Science & Engineering (CSE)' },
    { value: 'CSE – Artificial Intelligence & Machine Learning', label: 'CSE – Artificial Intelligence & Machine Learning' },
    { value: 'Information Technology (IT)', label: 'Information Technology (IT)' },
    { value: 'Electronics & Communication Engineering (ECE)', label: 'Electronics & Communication Engineering (ECE)' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
    { value: 'Not sure / Need Counseling', label: 'Not sure / Need Counseling' },
    { value: 'Other / Management', label: 'Other / Management' },
  ],
  campusOptions: [
    { value: 'Salt Lake', label: 'IEM Salt Lake (Sector V, Kolkata)' },
    { value: 'New Town', label: 'IEM New Town Campus' },
    { value: 'Not sure / Open to both', label: 'Not sure / Open to both' },
  ],
  statusOptions: [
    { value: 'Class 12 Appearing', label: 'Class 12 Appearing (2027)' },
    { value: 'Class 12 Passed', label: 'Class 12 Passed' },
    { value: 'Graduate / Other', label: 'Graduate / Other' },
  ],
  streamOptions: [
    { value: 'PCM', label: 'Physics, Chemistry, Maths (PCM)' },
    { value: 'PCB', label: 'Physics, Chemistry, Biology (PCB)' },
    { value: 'Commerce / Arts / Other', label: 'Commerce / Arts / Other' },
  ],
  examOptions: [
    { value: 'IEMJEE applied', label: 'IEMJEE Applied' },
    { value: 'Appeared', label: 'Appeared for Exam' },
    { value: 'Result awaited', label: 'Result Awaited' },
    { value: 'Not applied yet', label: 'Not Applied Yet' },
    { value: 'Other Exam (WBJEE/JEE Main)', label: 'Other Exam (WBJEE / JEE Main)' },
  ],
  consentBefore:
    'I agree to receive admission updates, counseling calls, and information from Direct2Campus regarding IEM Kolkata admissions in accordance with the',
  privacyLabel: 'Privacy Policy',
  privacyHref: '/privacy',
  consentAfter: '. Direct2Campus does not guarantee admission or seat allotment.',
  submitLabel: 'SUBMIT ADMISSION ENQUIRY',
  submittingLabel: 'Submitting Enquiry...',
  trustNote1: '100% Verified Information',
  trustNote2: 'Fast Callback from Advisor',
  errors: {
    name: 'Please enter your full name',
    phone: 'Please enter a valid 10-digit mobile number',
    consent: 'Please agree to the contact consent to proceed',
  },
};

export function seoDefaults(p: {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  ogTitle?: string;
  ogDescription: string;
}): SeoFields {
  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    canonical: `${IEM_BASE}/${p.path}`,
    robots: { index: true, follow: true },
    og: { title: p.ogTitle ?? p.title, description: p.ogDescription, image: IEM_OG_IMAGE, type: 'website' },
  };
}

// ---------------------------------------------------------------- shared schema fields
const optionFields: Field[] = [tf('value', 'Value sent with the lead'), tf('label', 'Label shown')];

export const formFields: Field[] = [
  tf('title', 'Heading'),
  ta('subtitle', 'Sub-heading'),
  tf('badge', 'Badge text'),
  tf('successTitle', 'Success heading'),
  ta('successBody', 'Success message'),
  tf('callLabel', 'Success call button label'),
  tf('callHref', 'Success call button link', 'e.g. tel:+916200325137'),
  tf('submitAnotherLabel', 'Submit-another button label'),
  grp('labels', 'Field labels', [
    tf('name', 'Name'),
    tf('phone', 'Mobile'),
    tf('email', 'Email'),
    tf('emailHint', 'Email hint'),
    tf('city', 'City'),
    tf('course', 'Programme'),
    tf('specialisation', 'Specialisation / branch'),
    tf('campus', 'Campus'),
    tf('status', 'Academic status'),
    tf('stream', 'Stream'),
    tf('exam', 'Exam status'),
  ]),
  grp('placeholders', 'Placeholders', [tf('name', 'Name'), tf('phone', 'Mobile'), tf('email', 'Email'), tf('city', 'City')]),
  lst('courseOptions', 'Programme options', 'option', 'label', optionFields),
  lst('specialisationOptions', 'Specialisation options', 'option', 'label', optionFields),
  lst('campusOptions', 'Campus options', 'option', 'label', optionFields),
  lst('statusOptions', 'Academic status options', 'option', 'label', optionFields),
  lst('streamOptions', 'Stream options', 'option', 'label', optionFields),
  lst('examOptions', 'Exam status options', 'option', 'label', optionFields),
  ta('consentBefore', 'Consent text (before the privacy link)'),
  tf('privacyLabel', 'Privacy link label'),
  uf('privacyHref', 'Privacy link'),
  ta('consentAfter', 'Consent text (after the privacy link)'),
  tf('submitLabel', 'Submit button label'),
  tf('submittingLabel', 'Submitting label'),
  tf('trustNote1', 'Trust note 1'),
  tf('trustNote2', 'Trust note 2'),
  grp('errors', 'Validation messages', [tf('name', 'Missing name'), tf('phone', 'Bad mobile'), tf('consent', 'Consent missing')]),
];

export const formSection: SchemaSection = {
  id: 'form',
  title: 'Enquiry form',
  description: 'Heading, labels, dropdown options and messages of the enquiry form.',
  fields: [grp('form', 'Enquiry form', formFields)],
};

export const seoSection: SchemaSection = {
  id: 'seo',
  title: 'SEO',
  fields: [
    { key: 'seo', label: 'SEO', type: 'seo' },
    tf('ogImageAlt', 'Social image alt text'),
  ],
};

export const faqFields: Field[] = [
  tf('eyebrow', 'Eyebrow'),
  tf('heading', 'Heading'),
  icf('icon', 'Heading icon'),
  lst('items', 'Questions', 'question', 'q', [tf('q', 'Question'), ta('a', 'Answer')]),
];

export const noticeFields: Field[] = [tf('label', 'Bold label'), ta('text', 'Text')];

export const linkListFields: Field[] = [tf('label', 'Label'), uf('href', 'Link')];

export const breadcrumbSchemaField: Field = lst(
  'breadcrumbSchema',
  'Breadcrumb structured data',
  'crumb',
  'name',
  [tf('name', 'Name'), uf('url', 'URL')],
  'Used only for the BreadcrumbList JSON-LD.',
);

export const crumbFields: Field[] = [
  lst('crumbs', 'Visible breadcrumb links', 'link', 'label', linkListFields),
  tf('crumbLast', 'Breadcrumb current page label'),
];

// ---------------------------------------------------------------- branch page document
export interface IemBranchContent {
  seo: SeoFields;
  ogImageAlt: string;
  breadcrumbSchema: { name: string; url: string }[];
  crumbs: IemLink[];
  crumbLast: string;
  hero: {
    badgeIcon: string;
    badge: string;
    h1: string;
    copy: string;
    primaryIcon: string;
    primaryLabel: string;
    secondaryLabel: string;
    image: string;
    imageAlt: string;
    cardEyebrow: string;
    cardTitle: string;
    cardSubtitle: string;
    facts: { label: string; value: string; valueClass: string }[];
  };
  notice: IemNotice;
  about: {
    eyebrow: string;
    heading: string;
    intro: string;
    whyHeading: string;
    why: string;
    highlightsIcon: string;
    highlightsTitle: string;
    highlightsBulletIcon: string;
    highlights: string[];
    compareLabel: string;
    compareHref: string;
  };
  eligibility: {
    eyebrow: string;
    heading: string;
    copy: string;
    boxes: { title: string; text: string }[];
    ctaLabel: string;
    ctaNote: string;
  };
  process: { icon: string; title: string; copy: string; steps: string[] };
  fees: { icon: string; title: string; copy: string; linkLabel: string; linkHref: string; linkIcon: string };
  careers: { eyebrow: string; heading: string; icon: string; intro: string; bulletIcon: string; items: string[] };
  formDefaultBranch: string;
  form: IemFormContent;
  faqs: IemFaqContent;
  related: { title: string; intro: string; links: IemLink[]; branches: IemLink[] };
  finalCta: { heading: string; text: string; label: string };
}

export const branchSections: SchemaSection[] = [
  {
    id: 'hero',
    title: 'Hero',
    fields: [
      grp('hero', 'Hero', [
        icf('badgeIcon', 'Badge icon'),
        tf('badge', 'Badge text'),
        tf('h1', 'Main heading (H1)'),
        ta('copy', 'Intro paragraph'),
        icf('primaryIcon', 'Primary button icon'),
        tf('primaryLabel', 'Primary button label'),
        tf('secondaryLabel', 'Secondary button label'),
        imf('image', 'Card image'),
        tf('imageAlt', 'Card image alt text'),
        tf('cardEyebrow', 'Image caption eyebrow'),
        tf('cardTitle', 'Image caption title'),
        tf('cardSubtitle', 'Image caption subtitle'),
        lst('facts', 'Fact rows', 'fact', 'label', [
          tf('label', 'Label'),
          tf('value', 'Value'),
          tf('valueClass', 'Value colour classes', 'Tailwind classes, e.g. font-semibold text-white'),
        ]),
      ]),
      ...crumbFields,
      breadcrumbSchemaField,
      tf('formDefaultBranch', 'Branch preselected in the enquiry form'),
    ],
  },
  {
    id: 'notice',
    title: 'Notice bar',
    fields: [grp('notice', 'Transparency notice', noticeFields)],
  },
  {
    id: 'about',
    title: 'About the programme',
    fields: [
      grp('about', 'About', [
        tf('eyebrow', 'Eyebrow'),
        tf('heading', 'Heading'),
        ta('intro', 'About paragraph'),
        tf('whyHeading', '"Why explore" heading'),
        ta('why', '"Why explore" paragraph'),
        icf('highlightsIcon', 'Highlights card icon'),
        tf('highlightsTitle', 'Highlights card title'),
        icf('highlightsBulletIcon', 'Highlights bullet icon'),
        sl('highlights', 'Highlights'),
        tf('compareLabel', 'Compare link label'),
        uf('compareHref', 'Compare link'),
      ]),
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    fields: [
      grp('eligibility', 'Eligibility', [
        tf('eyebrow', 'Eyebrow'),
        tf('heading', 'Heading'),
        ta('copy', 'Paragraph'),
        lst('boxes', 'Info boxes', 'box', 'title', [tf('title', 'Title'), ta('text', 'Text')]),
        tf('ctaLabel', 'Button label'),
        tf('ctaNote', 'Note under the button'),
      ]),
    ],
  },
  {
    id: 'process-fees',
    title: 'Admission process and fees',
    fields: [
      grp('process', 'Admission process', [
        icf('icon', 'Icon'),
        tf('title', 'Title'),
        ta('copy', 'Paragraph'),
        sl('steps', 'Numbered steps'),
      ]),
      grp('fees', 'Fees', [
        icf('icon', 'Icon'),
        tf('title', 'Title'),
        ta('copy', 'Paragraph'),
        tf('linkLabel', 'Link label'),
        uf('linkHref', 'Link'),
        icf('linkIcon', 'Link icon'),
      ]),
    ],
  },
  {
    id: 'careers',
    title: 'Career opportunities',
    fields: [
      grp('careers', 'Careers', [
        tf('eyebrow', 'Eyebrow'),
        tf('heading', 'Heading'),
        icf('icon', 'Heading icon'),
        ta('intro', 'Intro'),
        icf('bulletIcon', 'Item icon'),
        sl('items', 'Career options'),
      ]),
    ],
  },
  formSection,
  {
    id: 'faqs',
    title: 'FAQs',
    description: 'Also used for the FAQPage structured data.',
    fields: [grp('faqs', 'FAQs', faqFields)],
  },
  {
    id: 'related',
    title: 'Related links and closing banner',
    fields: [
      grp('related', 'Related pages', [
        tf('title', 'Title'),
        tf('intro', 'Intro'),
        lst('links', 'Fixed links', 'link', 'label', linkListFields),
        lst('branches', 'Related branch links', 'link', 'label', [tf('label', 'Label'), uf('href', 'Link')]),
      ]),
      grp('finalCta', 'Closing banner', [tf('heading', 'Heading'), ta('text', 'Text'), tf('label', 'Button label')]),
    ],
  },
  seoSection,
];
