import type { ContentDefinition, SeoFields } from '@/lib/cms/types';
import { statFields, type HeroStat } from './listing-shared';

export interface ExamsIndexContent {
  seo: SeoFields;
  hero: {
    badge: string;
    badgeIcon: string;
    titlePrefix: string;
    titleHighlight: string;
    subheading: string;
    /** In stat values, {count} is replaced by the number of exams listed. */
    stats: HeroStat[];
  };
  list: {
    searchPlaceholder: string;
    emptyTitle: string;
    emptyText: string;
    cardBadge: string;
    cardBadgeIcon: string;
    cardCta: string;
    logoAltSuffix: string;
  };
}

export const defaults: ExamsIndexContent = {
  seo: {
    title: 'Engineering & Medical Entrance Exams Guide | Direct2Campus',
    description:
      "Comprehensive guides on JEE, NEET, WBJEE, COMEDK & more. Get paper patterns, cut-off analysis, out-of-syllabus insights & application deadlines for India's top entrance exams.",
    keywords: ['JEE Main', 'NEET', 'WBJEE', 'entrance exam guide', 'engineering exam preparation', 'medical entrance exam', 'exam cutoff analysis'],
    canonical: 'https://direct2campus.com/exams',
  },
  hero: {
    badge: 'Comprehensive Exam Guides',
    badgeIcon: 'book-open',
    titlePrefix: 'Entrance Exam',
    titleHighlight: 'Masterguides',
    subheading: "Detailed insights on paper patterns, application deadlines, and admission pipelines for India's most competitive tests.",
    stats: [
      { value: '{count}+', label: 'Exams Covered', icon: 'graduation-cap', accent: 'sky' },
      { value: '1,500+', label: 'Sample Papers', icon: 'file-text', accent: 'gold' },
      { value: '24/7', label: 'Expert Support', icon: 'clock', accent: 'success' },
    ],
  },
  list: {
    searchPlaceholder: 'Search for an exam...',
    emptyTitle: 'No exams found',
    emptyText: "We're constantly adding new guides.",
    cardBadge: 'Masterguide',
    cardBadgeIcon: 'book-open',
    cardCta: 'Read the Masterguide',
    logoAltSuffix: 'Logo',
  },
};

export const definition: ContentDefinition<ExamsIndexContent> = {
  key: 'exams-index',
  title: 'Exams listing',
  group: 'Pages',
  previewPath: '/exams',
  sections: [
    {
      id: 'hero',
      title: 'Hero',
      description: 'Use {count} where the number of exams should appear.',
      fields: [
        { key: 'hero', label: 'Hero', type: 'group', fields: [
          { key: 'badge', label: 'Badge text', type: 'text' },
          { key: 'badgeIcon', label: 'Badge icon', type: 'icon' },
          { key: 'titlePrefix', label: 'Heading (plain part)', type: 'text' },
          { key: 'titleHighlight', label: 'Heading (gradient part)', type: 'text' },
          { key: 'subheading', label: 'Subheading', type: 'textarea' },
          { key: 'stats', label: 'Stats bar', type: 'list', itemLabel: 'stat', titleKey: 'label', fields: statFields },
        ] },
      ],
    },
    {
      id: 'list',
      title: 'Search, cards and empty state',
      fields: [
        { key: 'list', label: 'Listing', type: 'group', fields: [
          { key: 'searchPlaceholder', label: 'Search placeholder', type: 'text' },
          { key: 'cardBadge', label: 'Card badge text', type: 'text' },
          { key: 'cardBadgeIcon', label: 'Card badge icon', type: 'icon' },
          { key: 'cardCta', label: 'Card link text', type: 'text' },
          { key: 'logoAltSuffix', label: 'Logo alt text suffix', type: 'text', help: 'Added after the exam name, e.g. "WBJEE Logo".' },
          { key: 'emptyTitle', label: 'Empty state title', type: 'text' },
          { key: 'emptyText', label: 'Empty state text', type: 'text' },
        ] },
      ],
    },
    { id: 'seo', title: 'SEO', fields: [{ key: 'seo', label: 'SEO', type: 'seo' }] },
  ],
  defaults,
};
