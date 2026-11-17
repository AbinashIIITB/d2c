import type { ContentDefinition, SeoFields } from '@/lib/cms/types';
import { statFields, type HeroStat } from './listing-shared';

export interface MbaContent {
  seo: SeoFields;
  hero: {
    badge: string;
    badgeIcon: string;
    heading: string;
    description: string;
    browseLabel: string;
    browseHref: string;
    ctaLabel: string;
    ctaContext: string;
    image: string;
    imageAlt: string;
    stats: HeroStat[];
  };
  benefits: {
    heading: string;
    subheading: string;
    items: { icon: string; title: string; text: string }[];
  };
  cta: {
    heading: string;
    text: string;
    buttonLabel: string;
    buttonContext: string;
  };
}

export const defaults: MbaContent = {
  seo: {
    title: 'MBA & PGDM Admissions in Top B-Schools | Direct2Campus',
    description:
      'Skip CAT/XAT — secure management quota seats in Tier-1 & Tier-2 B-Schools across India. Expert MBA admission counselling at Direct2Campus.',
    keywords: ['MBA admission', 'PGDM admission', 'top B-Schools India', 'management quota MBA', 'MBA admission counselling'],
    canonical: 'https://direct2campus.com/mba',
  },
  hero: {
    badge: 'Post-Graduate Programs',
    badgeIcon: 'briefcase',
    heading: 'Elevate your career with a premium MBA',
    description:
      'Skip the extreme competition of CAT/XAT. Secure management quota seats in Tier-1 and Tier-2 B-Schools across Bangalore, Pune, Delhi NCR, and Kolkata.',
    browseLabel: 'Browse B-Schools',
    browseHref: '/colleges',
    ctaLabel: 'Free Consultation',
    ctaContext: 'MBA Free Consultation',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'MBA Students',
    stats: [
      { value: 'Top 50', label: 'B-Schools', icon: 'briefcase', accent: 'sky' },
      { value: '₹12 LPA', label: 'Avg. Package', icon: 'trending-up', accent: 'gold' },
      { value: '100%', label: 'Placement Record', icon: 'users', accent: 'success' },
    ],
  },
  benefits: {
    heading: 'Why choose Admission Guidance for MBA?',
    subheading: 'Focus on your career progression rather than endless preparation cycles.',
    items: [
      {
        icon: 'briefcase',
        title: 'Top Tier Placements',
        text: 'Study in colleges that boast 100% placement records with Fortune 500 companies and high average packages.',
      },
      {
        icon: 'trending-up',
        title: 'Save 1 Academic Year',
        text: "Don't waste a year taking drops for entrance exams. Enroll immediately and accelerate your career trajectory.",
      },
      {
        icon: 'building-2',
        title: 'Premium Infrastructure',
        text: 'Gain access to top-notch facilities, case-study based pedagogy, and extensive alumni networks.',
      },
      {
        icon: 'users',
        title: 'Expert Counseling',
        text: 'Our experts profile your academics and career goals to suggest the exact B-School fit for your profile.',
      },
    ],
  },
  cta: {
    heading: 'Ready to accelerate your career?',
    text: 'Speak to our MBA admissions expert to check your eligibility profile and explore available colleges based on your budget and desired location.',
    buttonLabel: 'Book Free Profile Evaluation',
    buttonContext: 'MBA Profile Evaluation',
  },
};

export const definition: ContentDefinition<MbaContent> = {
  key: 'mba',
  title: 'MBA page',
  group: 'Pages',
  previewPath: '/mba',
  sections: [
    {
      id: 'hero',
      title: 'Hero',
      fields: [
        { key: 'hero', label: 'Hero', type: 'group', fields: [
          { key: 'badge', label: 'Badge text', type: 'text' },
          { key: 'badgeIcon', label: 'Badge icon', type: 'icon' },
          { key: 'heading', label: 'Heading (h1)', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'browseLabel', label: 'Primary button label', type: 'text' },
          { key: 'browseHref', label: 'Primary button link', type: 'url' },
          { key: 'ctaLabel', label: 'Consultation button label', type: 'text' },
          { key: 'ctaContext', label: 'Consultation form context', type: 'text', help: 'Internal label saved with the lead.' },
          { key: 'image', label: 'Hero image', type: 'image' },
          { key: 'imageAlt', label: 'Hero image alt text', type: 'text' },
          { key: 'stats', label: 'Stats bar', type: 'list', itemLabel: 'stat', titleKey: 'label', fields: statFields },
        ] },
      ],
    },
    {
      id: 'benefits',
      title: 'Benefit cards',
      fields: [
        { key: 'benefits', label: 'Benefits', type: 'group', fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'subheading', label: 'Subheading', type: 'text' },
          { key: 'items', label: 'Cards', type: 'list', itemLabel: 'card', titleKey: 'title', fields: [
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'text', label: 'Text', type: 'textarea' },
          ] },
        ] },
      ],
    },
    {
      id: 'cta',
      title: 'Closing call to action',
      fields: [
        { key: 'cta', label: 'Call to action', type: 'group', fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'text', label: 'Text', type: 'textarea' },
          { key: 'buttonLabel', label: 'Button label', type: 'text' },
          { key: 'buttonContext', label: 'Form context', type: 'text', help: 'Internal label saved with the lead.' },
        ] },
      ],
    },
    { id: 'seo', title: 'SEO', fields: [{ key: 'seo', label: 'SEO', type: 'seo' }] },
  ],
  defaults,
};
