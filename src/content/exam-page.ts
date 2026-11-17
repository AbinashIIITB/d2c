import type { ContentDefinition, Field } from '@/lib/cms/types';

// Global labels of the exam detail page (/exams/[slug]). Values that belong to one exam (name, dates,
// pattern, FAQs, SEO, CTA overrides) are edited per exam in Admin > Exams. {name} is the exam's short name.
export interface ExamPageContent {
  hero: { backIcon: string; backLabel: string; badge: string };
  stats: {
    dateIcon: string;
    dateLabel: string;
    dateNote: string;
    modeIcon: string;
    modeLabel: string;
    modeFallback: string;
    durationFallback: string;
    applicationIcon: string;
    applicationLabel: string;
    applicationNote: string;
  };
  about: { heading: string };
  pattern: {
    heading: string;
    totalMarksLabel: string;
    markingSchemeLabel: string;
    subjectsHeading: string;
    subjectIcon: string;
  };
  eligibility: { heading: string };
  faq: { heading: string };
  guides: { heading: string };
  timeline: { heading: string; eventIcon: string };
  cta: {
    icon: string;
    headline: string;
    subtext: string;
    buttonText: string;
    callLabel: string;
    callHref: string;
    leadContext: string;
  };
  schema: { homeName: string; listName: string };
}

export const defaults: ExamPageContent = {
  hero: { backIcon: 'arrow-left', backLabel: 'Back to Exams', badge: 'Master Guide 2027' },
  stats: {
    dateIcon: 'calendar',
    dateLabel: 'Important Date',
    dateNote: 'Check official portal for updates',
    modeIcon: 'book-open',
    modeLabel: 'Exam Mode',
    modeFallback: 'Online (CBT)',
    durationFallback: 'Standard duration',
    applicationIcon: 'circle-help',
    applicationLabel: 'Application',
    applicationNote: 'Official Entrance Portal',
  },
  about: { heading: 'About the Exam' },
  pattern: {
    heading: 'Question Paper Pattern',
    totalMarksLabel: 'Total Marks',
    markingSchemeLabel: 'Marking Scheme',
    subjectsHeading: 'Subject-wise Distribution',
    subjectIcon: 'circle-check',
  },
  eligibility: { heading: 'Eligibility Criteria' },
  faq: { heading: 'Frequently Asked Questions' },
  guides: { heading: 'Recommended Direct2Campus Guides' },
  timeline: { heading: 'Application Timeline', eventIcon: 'calendar' },
  cta: {
    icon: 'circle-alert',
    headline: 'Need Admission Help?',
    subtext:
      'Management quota admission guidance is available for top institutes accepting this exam. Get end-to-end counseling support from Direct2Campus.',
    buttonText: 'Get Free Counseling',
    callLabel: 'Call Counselor',
    callHref: 'tel:+916200325137',
    leadContext: 'Exam Counseling: {name}',
  },
  schema: { homeName: 'Home', listName: 'Entrance Exams' },
};

const t = (key: string, label: string, extra: Partial<Field> = {}): Field => ({ key, label, type: 'text', ...extra }) as Field;
const ta = (key: string, label: string, help?: string): Field => ({ key, label, type: 'textarea', help }) as Field;
const ic = (key: string, label: string): Field => ({ key, label, type: 'icon' }) as Field;

export const definition: ContentDefinition<ExamPageContent> = {
  key: 'exam-page',
  title: 'Exam detail pages',
  group: 'Pages',
  previewPath: '/exams/iemjee',
  sections: [
    {
      id: 'hero',
      title: 'Hero banner',
      description: 'Top banner of every exam page.',
      fields: [
        {
          key: 'hero',
          label: 'Hero',
          type: 'group',
          fields: [ic('backIcon', 'Back link icon'), t('backLabel', 'Back link text'), t('badge', 'Badge text')],
        },
      ],
    },
    {
      id: 'stats',
      title: 'Quick stat cards',
      description: 'The three cards under the hero (date, mode, application).',
      fields: [
        {
          key: 'stats',
          label: 'Cards',
          type: 'group',
          fields: [
            ic('dateIcon', 'Date card icon'),
            t('dateLabel', 'Date card label'),
            t('dateNote', 'Date card note'),
            ic('modeIcon', 'Mode card icon'),
            t('modeLabel', 'Mode card label'),
            t('modeFallback', 'Mode shown when an exam has none'),
            t('durationFallback', 'Duration shown when an exam has none'),
            ic('applicationIcon', 'Application card icon'),
            t('applicationLabel', 'Application card label'),
            t('applicationNote', 'Application card note'),
          ],
        },
      ],
    },
    {
      id: 'sections',
      title: 'Section headings',
      fields: [
        { key: 'about', label: 'About', type: 'group', fields: [t('heading', 'About section heading')] },
        {
          key: 'pattern',
          label: 'Question paper pattern',
          type: 'group',
          fields: [
            t('heading', 'Heading'),
            t('totalMarksLabel', 'Total marks label'),
            t('markingSchemeLabel', 'Marking scheme label'),
            t('subjectsHeading', 'Subjects heading'),
            ic('subjectIcon', 'Subject badge icon'),
          ],
        },
        { key: 'eligibility', label: 'Eligibility', type: 'group', fields: [t('heading', 'Eligibility heading')] },
        { key: 'faq', label: 'FAQs', type: 'group', fields: [t('heading', 'FAQ heading')] },
        { key: 'guides', label: 'Recommended guides', type: 'group', fields: [t('heading', 'Guides heading')] },
      ],
    },
    {
      id: 'sidebar',
      title: 'Sidebar and call to action',
      description: 'Timeline card and the help card. An exam can override the help card text in its own editor.',
      fields: [
        {
          key: 'timeline',
          label: 'Application timeline',
          type: 'group',
          fields: [t('heading', 'Timeline heading'), ic('eventIcon', 'Event icon')],
        },
        {
          key: 'cta',
          label: 'Help card (default text)',
          type: 'group',
          fields: [
            ic('icon', 'Icon'),
            t('headline', 'Headline'),
            ta('subtext', 'Text'),
            t('buttonText', 'Main button label'),
            t('callLabel', 'Call button label'),
            t('callHref', 'Call button link', { help: 'e.g. tel:+916200325137' }),
            t('leadContext', 'Enquiry context sent with the lead', { help: '{name} is the exam name. Visible to staff in the leads list only.' }),
          ],
        },
      ],
    },
    {
      id: 'schema',
      title: 'Search engine breadcrumb names',
      description: 'Names used in the breadcrumb structured data of every exam page.',
      fields: [
        {
          key: 'schema',
          label: 'Breadcrumb',
          type: 'group',
          fields: [t('homeName', 'Home name'), t('listName', 'Exams list name')],
        },
      ],
    },
  ],
  defaults,
};
