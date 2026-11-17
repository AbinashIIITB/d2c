import type { ContentDefinition, SeoFields } from '@/lib/cms/types';
import { statFields, type HeroStat } from './listing-shared';

export interface CollegesIndexContent {
  seo: SeoFields;
  hero: {
    /** {count} is replaced by the number of colleges listed. */
    badge: string;
    badgeIcon: string;
    titlePrefix: string;
    titleHighlight: string;
    subheading: string;
    /** In stat values, {count} is replaced by the number of colleges listed. */
    stats: HeroStat[];
  };
  grid: {
    searchPlaceholder: string;
    allDepartmentsLabel: string;
    departments: { value: 'Engineering' | 'Medical' | 'Management'; label: string }[];
    allStatesLabel: string;
    emptyTitle: string;
    emptyText: string;
  };
}

export const defaults: CollegesIndexContent = {
  seo: {
    title: 'Top Engineering & Medical Colleges in India | Direct2Campus',
    description:
      'Browse 150+ premium engineering, medical, and management institutions. Compare fees, placements, rankings & get admission guidance at Direct2Campus.',
    keywords: ['top engineering colleges India', 'medical colleges admission', 'B.Tech colleges', 'MBBS colleges', 'management quota colleges'],
    canonical: 'https://direct2campus.com/colleges',
  },
  hero: {
    badge: '{count}+ Institutions',
    badgeIcon: 'building-2',
    titlePrefix: 'Find Your',
    titleHighlight: 'Dream Campus',
    subheading: "Filter through India's premier engineering and medical colleges and secure your seat with expert guidance.",
    stats: [
      { value: '{count}+', label: 'Colleges Listed', icon: 'building-2', accent: 'sky' },
      { value: '500+', label: 'Students Placed', icon: 'graduation-cap', accent: 'gold' },
      { value: '12', label: 'States Covered', icon: 'map-pin', accent: 'success' },
    ],
  },
  grid: {
    searchPlaceholder: 'Search by college name or city...',
    allDepartmentsLabel: 'All Departments',
    departments: [
      { value: 'Engineering', label: 'Engineering' },
      { value: 'Medical', label: 'Medical' },
      { value: 'Management', label: 'Management' },
    ],
    allStatesLabel: 'All States',
    emptyTitle: 'No colleges found',
    emptyText: 'Try adjusting your search criteria or filters',
  },
};

export const definition: ContentDefinition<CollegesIndexContent> = {
  key: 'colleges-index',
  title: 'Colleges listing',
  group: 'Pages',
  previewPath: '/colleges',
  sections: [
    {
      id: 'hero',
      title: 'Hero',
      description: 'Use {count} where the number of colleges should appear.',
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
      id: 'grid',
      title: 'Search, filters and empty state',
      fields: [
        { key: 'grid', label: 'Listing', type: 'group', fields: [
          { key: 'searchPlaceholder', label: 'Search placeholder', type: 'text' },
          { key: 'allDepartmentsLabel', label: 'Department filter: "all" option', type: 'text' },
          { key: 'departments', label: 'Department options', type: 'list', itemLabel: 'option', titleKey: 'label', fields: [
            {
              key: 'value',
              label: 'Filter',
              type: 'select',
              help: 'Which keyword group this option filters on.',
              options: [
                { label: 'Engineering', value: 'Engineering' },
                { label: 'Medical', value: 'Medical' },
                { label: 'Management', value: 'Management' },
              ],
            },
            { key: 'label', label: 'Label shown', type: 'text' },
          ] },
          { key: 'allStatesLabel', label: 'State filter: "all" option', type: 'text' },
          { key: 'emptyTitle', label: 'Empty state title', type: 'text' },
          { key: 'emptyText', label: 'Empty state text', type: 'text' },
        ] },
      ],
    },
    { id: 'seo', title: 'SEO', fields: [{ key: 'seo', label: 'SEO', type: 'seo' }] },
  ],
  defaults,
};
