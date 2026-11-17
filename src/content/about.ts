import type { ContentDefinition, SeoFields } from '@/lib/cms/types';
import { statFields, type HeroStat } from './listing-shared';

export interface AboutContent {
  seo: SeoFields;
  hero: {
    badge: string;
    badgeIcon: string;
    titlePrefix: string;
    titleHighlight: string;
    subheading: string;
    stats: HeroStat[];
  };
  story: {
    heading: string;
    paragraphs: string[];
  };
}

export const defaults: AboutContent = {
  seo: {
    title: "About Us – India's Trusted Education Partner | Direct2Campus",
    description:
      "Learn about Direct2Campus — India's trusted education bridge with 12,000+ successful admissions, 150+ institutions & 10+ years of proven excellence.",
    keywords: ['about Direct2Campus', 'education consultancy India', 'trusted admission partner', 'management quota admissions'],
    canonical: 'https://direct2campus.com/about',
  },
  hero: {
    badge: "India's Trusted Education Partner",
    badgeIcon: 'shield',
    titlePrefix: 'About',
    titleHighlight: 'Direct2Campus',
    subheading: 'Direct2Campus has spent over a decade shaping academic journeys for ambitious students nationwide.',
    stats: [
      { value: '12,000+', label: 'Students Placed', icon: 'users', accent: 'sky' },
      { value: '150+', label: 'Institutions', icon: 'award', accent: 'gold' },
      { value: '10+ Years', label: 'Years Of Excellence', icon: 'clock', accent: 'success' },
      { value: 'Pan-India', label: 'Verified College Network', icon: 'check-circle-2', accent: 'green' },
    ],
  },
  story: {
    heading: 'Bridging Dreams to Reality',
    paragraphs: [
      'Direct2Campus was founded with a singular mission: to eliminate confusion, non-transparency, and bureaucratic delays in higher education admissions across India. Whether you are aiming for prestigious private engineering institutes, medical seats, or premier business schools, our vetted network of 150+ colleges provides legitimate, direct counseling routes.',
      'From document verification to fee negotiations and scholarship allocation, our team of seasoned advisors stands beside you every step of the way.',
    ],
  },
};

export const definition: ContentDefinition<AboutContent> = {
  key: 'about',
  title: 'About page',
  group: 'Pages',
  previewPath: '/about',
  sections: [
    {
      id: 'hero',
      title: 'Hero',
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
      id: 'story',
      title: 'Story',
      fields: [
        { key: 'story', label: 'Story card', type: 'group', fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'paragraphs', label: 'Paragraphs', type: 'stringList' },
        ] },
      ],
    },
    { id: 'seo', title: 'SEO', fields: [{ key: 'seo', label: 'SEO', type: 'seo' }] },
  ],
  defaults,
};
