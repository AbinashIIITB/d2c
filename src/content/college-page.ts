import type { ContentDefinition, Field } from '@/lib/cms/types';

// Global labels of the college detail pages (/colleges/<slug>): section subtitles, table headers,
// sidebar and CTA texts, the default FAQs. Per-college values (name, fees, FAQs, section headings,
// images, SEO...) are edited on each college in /admin/colleges.
// Placeholders: {name} college name, {course} first listed course, {location}, {state}, {fees},
// {rating}, {reviews}.

const tf = (key: string, label: string, help?: string): Field => ({ key, label, type: 'text', help });
const ta = (key: string, label: string, help?: string): Field => ({ key, label, type: 'textarea', help });
const uf = (key: string, label: string, help?: string): Field => ({ key, label, type: 'url', help });
const icf = (key: string, label: string, help?: string): Field => ({ key, label, type: 'icon', help });
const grp = (key: string, label: string, fields: Field[], help?: string): Field => ({ key, label, type: 'group', fields, help });
const lst = (key: string, label: string, itemLabel: string, titleKey: string, fields: Field[], help?: string): Field => ({
  key,
  label,
  type: 'list',
  itemLabel,
  titleKey,
  fields,
  help,
});

export const defaults = {
  contact: {
    phoneHref: 'tel:+916200325137',
    phoneDisplay: '+91 62003 25137',
    whatsappHref: 'https://wa.me/916200325137',
  },
  hero: {
    breadcrumbHome: 'Home',
    breadcrumbColleges: 'Colleges',
    establishedPrefix: 'EST.',
    establishedFallback: 'N/A',
    ratingTemplate: '{rating} ({reviews} Reviews)',
    whatsappButton: 'WhatsApp Us',
    imageAltTemplate: '{name} Visual',
    statFallbackRating: 'Rating',
    statFallbackType: 'Institute Type',
    statFallbackPrograms: 'Programs',
    statFallbackFee: 'Starting Fee',
    feeFallback: 'N/A',
  },
  toc: [
    { id: 'admissions', label: 'Admission Process', icon: 'clipboard-list' },
    { id: 'courses-fees', label: 'Courses & Fees', icon: 'dollar-sign' },
    { id: 'btech-fees', label: '{course} Fees & Eligibility', icon: 'building-2' },
    { id: 'placements', label: 'Placements & Packages', icon: 'trending-up' },
    { id: 'overview', label: 'Campus & Location', icon: 'building-2' },
    { id: 'infrastructure', label: 'Infrastructure', icon: 'building-2' },
    { id: 'scholarships', label: 'Scholarships', icon: 'award' },
    { id: 'alumni', label: 'Alumni', icon: 'users' },
    { id: 'faqs', label: 'FAQs', icon: 'help-circle' },
  ],
  tocUi: {
    title: 'Table of Contents',
    mobileTitle: 'Jump to Section',
    drawerTitle: 'Quick Navigation',
  },
  headings: {
    admissions: '{name} Admission Process',
    coursesFees: '{name} Courses and Fee Structure',
    coursesFeesSubtitle: '{name} Admission Fees and Course Fee Structure',
    degreeFeesEligibility: '{name} {course} Fees and Eligibility',
    placements: '{name} Placements and Average Package',
    overview: '{name} Campus and Location',
    faqs: 'Frequently Asked Questions About {name}',
    infrastructure: 'Facilities & Infrastructure',
    scholarships: 'Scholarships & Financial Aid',
    alumni: 'Alumni Network',
  },
  admissions: {
    subtitle: 'Step-by-step guidance for 2026-27 admission session',
    eligibilityTitle: 'Eligibility Criteria',
    howToApplyTitle: 'How to Apply',
    documentsTitle: 'Required Documents',
    fallbackText:
      'Admissions for {name} are conducted through verified counseling quotas and entrance exams. Contact Direct2Campus advisors for seat allotment and cutoff guidance.',
  },
  coursesFees: {
    feeComponentHeader: 'Fee Component',
    amountHeader: 'Amount',
    specializationsTitle: 'Available Specializations',
  },
  degreeFees: {
    subtitle: 'Comprehensive fee schedule, branch cutoffs, and eligibility guidelines',
    totalFees: { label: 'Total Course Fees', fallbackValue: 'Contact for fees', note: 'Tuition fee package' },
    duration: { label: 'Course Duration', value: '3 - 4 Years', note: 'Full-time programs' },
    hostel: { label: 'Hostel Facility', value: 'Available', note: 'Separate Boys & Girls' },
    rating: {
      label: 'Institute Rating',
      valueTemplate: '{rating} ★',
      defaultRating: '4.5',
      noteTemplate: '{reviews}+ verified reviews',
      defaultReviews: '200',
    },
    eligibilityTitle: 'Mandatory Eligibility Criteria',
    eligibility: [
      {
        title: 'Academic Qualification',
        text: 'Passed 10+2 Higher Secondary examination or equivalent from a recognized board or council with relevant stream subjects.',
      },
      {
        title: 'Minimum Marks Requirement',
        text: 'Minimum 50% - 60% aggregate marks in core subjects (5% relaxation typically applicable for reserved categories).',
      },
      {
        title: 'Entrance Exams Accepted',
        text: 'State entrance examination ranks, national tests (JEE / NEET / CAT / MAT), or institute-level entrance tests.',
      },
      {
        title: 'Age & Domicile',
        text: 'Completed 17 years of age as of admission year. State quota benefits subject to domicile criteria.',
      },
    ],
    cutoffsTitle: 'Expected Cutoff Ranks',
  },
  placements: {
    subtitle: 'Top recruiters, salary packages, and career statistics',
    highlightsTitle: 'Key Highlights',
    recruitersTitle: 'Top Corporate Partners',
  },
  overview: {
    locationBadge: 'Official Campus & Admission Location',
    iemAddress: 'Ashram Building, GN-34/2, Sector V, Salt Lake Electronics Complex',
    campusTemplate: '{name} Main Campus, {location}',
    addressLine: '{location}, {state}, India',
    mapButton: 'View on Map',
  },
  alumni: {
    worksAtLabel: 'Alumni Work At',
  },
  faqs: {
    questionMark: 'Q',
    iemFaqs: [
      {
        question: 'What is the admission process for IEM Kolkata in 2026?',
        answer:
          'The admission process for IEM Kolkata depends on the course and the applicable admission rules. Students should check the current eligibility criteria, entrance examination requirements and counselling procedure before applying. For official information about IEMJEE 2026, visit the IEM official website.',
      },
      {
        question: 'What is the fee structure of IEM Kolkata for B.Tech?',
        answer:
          'The total B.Tech fees at IEM Kolkata depend on the course, admission route and applicable fee schedule. Students should confirm the latest tuition fees, admission charges and other applicable expenses with the institute before taking admission. Hostel fees, where applicable, should be checked separately.',
      },
      {
        question: 'What are the eligibility criteria for B.Tech admission at IEM Kolkata?',
        answer:
          'Eligibility requirements depend on the engineering programme and the applicable admission route. Students should review the current academic requirements, compulsory subjects, entrance examination criteria and counselling rules before applying. Refer to the official IEM admissions website for current details.',
      },
      {
        question: 'Is admission available at IEM Kolkata?',
        answer:
          "Admission to IEM Kolkata is subject to the institute's applicable admission rules and eligibility requirements. Students should contact the official admission office to understand the permitted admission routes and available seats. Admission cannot be guaranteed without meeting the required criteria.",
      },
      {
        question: 'What is the WBJEE cutoff for CSE at IEM Kolkata?',
        answer:
          "The WBJEE cutoff for Computer Science and Engineering (CSE) at IEM Kolkata can vary each year depending on the candidate's category, counselling round, seat availability and applicable admission route. Students should check the official counselling results and previous-year opening and closing ranks for a realistic estimate.",
      },
      {
        question: 'What is the average placement package for CSE at IEM Kolkata?',
        answer:
          'Placement packages vary by academic year, course, employer and individual performance. Students researching IEM Kolkata placements should review the latest official placement report and distinguish CSE-specific figures from institute-wide statistics. Contact the institute for the latest verified average package and placement data.',
      },
      {
        question: 'Which university is IEM Kolkata affiliated with?',
        answer:
          "The Institute of Engineering & Management (IEM), Kolkata, is associated with the University of Engineering & Management (UEM), Kolkata, according to the institute's official information. Students should check the current programme-specific affiliation and degree-awarding details before admission.",
      },
      {
        question: 'Does IEM Kolkata provide hostel facilities?',
        answer:
          'Yes, IEM lists separate hostel facilities for male and female students. Availability, accommodation arrangements, facilities and fees should be confirmed directly with the institute, as these details may vary.',
      },
      {
        question: 'Which companies recruit students from IEM Kolkata?',
        answer:
          "Recruitment opportunities vary by year, programme and employer requirements. IEM has reported recruiters from different sectors, including IT, consulting, finance and other industries. Students should review the latest placement report for the companies that participated in the relevant academic year's recruitment process.",
      },
      {
        question: 'Where is the IEM Salt Lake campus located?',
        answer:
          'The IEM Salt Lake admission office is located at Ashram Building, GN-34/2, Sector V, Salt Lake Electronics Complex, Kolkata – 700091, West Bengal. Students should confirm the exact campus or department location before visiting.',
      },
    ],
    defaultFaqs: [
      {
        question: 'What is the admission procedure for {name}?',
        answer:
          'Admission to {name} is conducted through entrance examination scores, centralized counseling, and permitted quota rules. Contact Direct2Campus for step-by-step guidance and document verification.',
      },
      {
        question: 'What is the fee structure at {name}?',
        answer:
          'The tuition fee structure at {name} is approximately {fees}. Hostel and mess charges are separate where applicable.',
      },
      {
        question: 'Does {name} provide campus placement support?',
        answer:
          'Yes, {name} has a proactive training and placement cell that connects graduating students with top corporate recruiters and industry partners.',
      },
      {
        question: 'Where is {name} located?',
        answer:
          '{name} is situated in {location}, {state}. Students should verify the exact campus location and department before visiting.',
      },
    ],
    feesFallback: 'competitive based on specialization',
  },
  internalLinks: {
    title: 'Recommended Direct2Campus Guides',
  },
  cta: {
    headline: 'Need Help with Admission?',
    subtext: 'Our expert counselors are ready to guide you through the entire admission process for {name}.',
    button: 'Talk to Expert',
    whatsappButton: 'WhatsApp',
  },
  sidebar: {
    badge: 'Admission Open',
    title: 'Apply for Admission',
    text: 'Enter your details. Our admission counselor will reach out within 24 hours.',
    urgentLabel: 'Urgent?',
    mobileTitle: 'Enquire Now',
  },
  card: {
    premiumBadge: 'Premium',
    exploreLabel: 'Explore Admission',
  },
};

export type CollegePageContent = typeof defaults;

const faqFields = (): Field[] => [tf('question', 'Question'), ta('answer', 'Answer')];

export const definition: ContentDefinition<CollegePageContent> = {
  key: 'college-page',
  title: 'College detail pages',
  group: 'Pages',
  previewPath: '/colleges/iem-saltlake',
  sections: [
    {
      id: 'hero',
      title: 'Hero and contact',
      description: 'Shared by every college page. Placeholders: {name}, {rating}, {reviews}.',
      fields: [
        grp('contact', 'Contact links', [
          uf('phoneHref', 'Phone link', 'e.g. tel:+916200325137'),
          tf('phoneDisplay', 'Phone number shown in the sidebar'),
          uf('whatsappHref', 'WhatsApp link'),
        ]),
        grp('hero', 'Hero', [
          tf('breadcrumbHome', 'Breadcrumb: home'),
          tf('breadcrumbColleges', 'Breadcrumb: colleges'),
          tf('establishedPrefix', 'Established badge prefix'),
          tf('establishedFallback', 'Established badge when no year is set'),
          tf('ratingTemplate', 'Rating badge', 'Uses {rating} and {reviews}'),
          tf('whatsappButton', 'WhatsApp button label'),
          tf('imageAltTemplate', 'Hero image alt text (default)', 'Used when the college has no custom alt text. Uses {name}'),
          tf('statFallbackRating', 'Stat label: rating'),
          tf('statFallbackType', 'Stat label: institute type'),
          tf('statFallbackPrograms', 'Stat label: programs'),
          tf('statFallbackFee', 'Stat label: starting fee'),
          tf('feeFallback', 'Starting fee when none is set'),
        ]),
      ],
    },
    {
      id: 'toc',
      title: 'Table of contents',
      description: 'Labels and icons of the jump links. Keep each id: it points at a section of the page.',
      fields: [
        lst(
          'toc',
          'Sections',
          'section',
          'label',
          [tf('id', 'Section id (do not change)'), tf('label', 'Label', 'Use {course} for the first course'), icf('icon', 'Icon')],
        ),
        grp('tocUi', 'Table of contents titles', [
          tf('title', 'Desktop title'),
          tf('mobileTitle', 'Mobile strip title'),
          tf('drawerTitle', 'Mobile drawer title'),
        ]),
      ],
    },
    {
      id: 'headings',
      title: 'Section headings',
      description: 'Default headings. A college can override each one in its own editor. Placeholders: {name}, {course}.',
      fields: [
        grp('headings', 'Headings', [
          tf('admissions', 'Admission process'),
          tf('coursesFees', 'Courses and fee structure'),
          tf('coursesFeesSubtitle', 'Courses and fee structure: subtitle'),
          tf('degreeFeesEligibility', 'Fees and eligibility'),
          tf('placements', 'Placements'),
          tf('overview', 'Campus and location'),
          tf('faqs', 'FAQs'),
          tf('infrastructure', 'Facilities and infrastructure'),
          tf('scholarships', 'Scholarships'),
          tf('alumni', 'Alumni'),
        ]),
      ],
    },
    {
      id: 'admissions',
      title: 'Admission section',
      fields: [
        grp('admissions', 'Admission section texts', [
          tf('subtitle', 'Subtitle'),
          tf('eligibilityTitle', 'Eligibility title'),
          tf('howToApplyTitle', 'Steps title'),
          tf('documentsTitle', 'Documents title'),
          ta('fallbackText', 'Text when a college has no admission details', 'Uses {name}'),
        ]),
      ],
    },
    {
      id: 'courses',
      title: 'Courses and fees',
      fields: [
        grp('coursesFees', 'Fee table', [
          tf('feeComponentHeader', 'Fee component column'),
          tf('amountHeader', 'Amount column'),
          tf('specializationsTitle', 'Specializations title'),
        ]),
        grp('degreeFees', 'Fees and eligibility section', [
          tf('subtitle', 'Subtitle'),
          grp('totalFees', 'Card: total fees', [tf('label', 'Label'), tf('fallbackValue', 'Value when no fees are set'), tf('note', 'Note')]),
          grp('duration', 'Card: duration', [tf('label', 'Label'), tf('value', 'Value'), tf('note', 'Note')]),
          grp('hostel', 'Card: hostel', [tf('label', 'Label'), tf('value', 'Value'), tf('note', 'Note')]),
          grp('rating', 'Card: rating', [
            tf('label', 'Label'),
            tf('valueTemplate', 'Value', 'Uses {rating}'),
            tf('defaultRating', 'Rating when none is set'),
            tf('noteTemplate', 'Note', 'Uses {reviews}'),
            tf('defaultReviews', 'Review count when none is set'),
          ]),
          tf('eligibilityTitle', 'Eligibility title'),
          lst('eligibility', 'Eligibility cards', 'card', 'title', [tf('title', 'Title'), ta('text', 'Text')]),
          tf('cutoffsTitle', 'Cutoff ranks title'),
        ]),
      ],
    },
    {
      id: 'placements',
      title: 'Placements, campus, alumni',
      fields: [
        grp('placements', 'Placements', [
          tf('subtitle', 'Subtitle'),
          tf('highlightsTitle', 'Highlights title'),
          tf('recruitersTitle', 'Recruiters title'),
        ]),
        grp('overview', 'Campus and location', [
          tf('locationBadge', 'Location badge'),
          tf('iemAddress', 'Address shown for IEM'),
          tf('campusTemplate', 'Address for other colleges', 'Uses {name}, {location}'),
          tf('addressLine', 'Address line 2', 'Uses {location}, {state}'),
          tf('mapButton', 'Map button label'),
        ]),
        grp('alumni', 'Alumni', [tf('worksAtLabel', 'Companies label')]),
      ],
    },
    {
      id: 'faqs',
      title: 'FAQs, links and call to action',
      fields: [
        grp('faqs', 'FAQs', [
          tf('questionMark', 'FAQ marker letter'),
          lst('iemFaqs', 'Default FAQs for IEM Kolkata', 'FAQ', 'question', faqFields(), 'Shown when the college has no FAQs of its own.'),
          lst(
            'defaultFaqs',
            'Default FAQs for other colleges',
            'FAQ',
            'question',
            faqFields(),
            'Shown when the college has no FAQs of its own. Placeholders: {name}, {fees}, {location}, {state}.',
          ),
          tf('feesFallback', 'Fees wording when a college has no fees'),
        ]),
        grp('internalLinks', 'Recommended links', [tf('title', 'Block title')]),
        grp('cta', 'Help call-to-action (defaults)', [
          tf('headline', 'Headline'),
          ta('subtext', 'Text', 'Uses {name}'),
          tf('button', 'Call button label'),
          tf('whatsappButton', 'WhatsApp button label'),
        ]),
      ],
    },
    {
      id: 'sidebar',
      title: 'Sidebar and cards',
      fields: [
        grp('sidebar', 'Enquiry box', [
          tf('badge', 'Badge'),
          tf('title', 'Title'),
          ta('text', 'Text'),
          tf('urgentLabel', 'Phone label'),
          tf('mobileTitle', 'Mobile title'),
        ]),
        grp('card', 'College cards (lists and home page)', [tf('premiumBadge', 'Badge'), tf('exploreLabel', 'Link text')]),
      ],
    },
  ],
  defaults,
};
