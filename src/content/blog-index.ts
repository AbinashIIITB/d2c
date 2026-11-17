import type { ContentDefinition, SeoFields } from '@/lib/cms/types';
import { statFields, type HeroStat } from './listing-shared';

export interface BlogIndexContent {
  seo: SeoFields;
  /** Alt text for the Open Graph image (the image itself is seo.og.image). */
  ogImageAlt: string;
  /** Structured data (CollectionPage) text. The article list is added automatically. */
  schema: { name: string; description: string };
  hero: {
    badge: string;
    badgeIcon: string;
    titlePrefix: string;
    titleHighlight: string;
    subheading: string;
    /** In stat values, {count} is replaced by the number of articles. */
    stats: HeroStat[];
  };
  list: {
    loadingText: string;
    searchPlaceholder: string;
    allCategoryLabel: string;
    emptyTitle: string;
    /** {query} is replaced by the visitor's search text. */
    emptyText: string;
    clearFiltersLabel: string;
    readMoreLabel: string;
    defaultAuthor: string;
    fallbackImage: string;
  };
}

export const defaults: BlogIndexContent = {
  seo: {
    title: 'Blogs & Admission Insights 2027 – Direct2Campus | Direct2Campus',
    description:
      'Expert guides on college admissions, entrance exams, management quota procedures, and career counseling. Stay ahead with Direct2Campus insights.',
    keywords: ['college admission blog', 'management quota guide', 'entrance exam tips', 'engineering admissions Kolkata', 'career counseling blog'],
    canonical: 'https://direct2campus.com/blog',
    og: {
      title: 'Blogs & Admission Insights 2027 – Direct2Campus',
      description: 'Expert guides on college admissions, entrance exams, management quota procedures, and career counseling.',
      image: '/logo-footer.png',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blogs & Admission Insights 2027 – Direct2Campus',
      description: 'Expert guides on college admissions, entrance exams, and management quota procedures.',
      image: '/logo-footer.png',
    },
  },
  ogImageAlt: 'Direct2Campus Blog',
  schema: {
    name: 'Direct2Campus Admission Insights & Guides',
    description: 'Expert guides on college admissions, entrance exams, management quota procedures, and career counseling.',
  },
  hero: {
    badge: 'Articles & Admission Insights',
    badgeIcon: 'newspaper',
    titlePrefix: 'Admission & Career',
    titleHighlight: 'Insights',
    subheading: 'Stay informed with verified guidance on entrance exams, quota eligibility, college cutoffs, and counseling blueprints.',
    stats: [
      { value: '{count}+', label: 'Guides Published', icon: 'book-open', accent: 'sky' },
      { value: '15,000+', label: 'Students Guided', icon: 'users', accent: 'gold' },
      { value: '100%', label: 'Verified Insights', icon: 'award', accent: 'success' },
    ],
  },
  list: {
    loadingText: 'Loading articles...',
    searchPlaceholder: 'Search articles by title, topic, or keyword...',
    allCategoryLabel: 'All',
    emptyTitle: 'No Articles Found',
    emptyText: 'No articles match “{query}”. Try another search term or reset filters.',
    clearFiltersLabel: 'Clear Filters',
    readMoreLabel: 'Read More',
    defaultAuthor: 'Direct2Campus Editorial Team',
    fallbackImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
  },
};

export const definition: ContentDefinition<BlogIndexContent> = {
  key: 'blog-index',
  title: 'Blog listing',
  group: 'Pages',
  previewPath: '/blog',
  sections: [
    {
      id: 'hero',
      title: 'Hero',
      description: 'Use {count} where the number of articles should appear.',
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
      title: 'Search, filters and empty state',
      fields: [
        { key: 'list', label: 'Listing', type: 'group', fields: [
          { key: 'loadingText', label: 'Loading text', type: 'text' },
          { key: 'searchPlaceholder', label: 'Search placeholder', type: 'text' },
          { key: 'allCategoryLabel', label: 'Category filter: "all" label', type: 'text', help: 'Keep as "All" unless you also rename it consistently; used as the reset option.' },
          { key: 'emptyTitle', label: 'Empty state title', type: 'text' },
          { key: 'emptyText', label: 'Empty state text', type: 'textarea', help: '{query} is replaced by the visitor\'s search text.' },
          { key: 'clearFiltersLabel', label: 'Clear filters button', type: 'text' },
          { key: 'readMoreLabel', label: '"Read more" link text', type: 'text' },
          { key: 'defaultAuthor', label: 'Author shown when an article has none', type: 'text' },
          { key: 'fallbackImage', label: 'Cover image when an article has none', type: 'image' },
        ] },
      ],
    },
    {
      id: 'schema',
      title: 'Structured data',
      fields: [
        { key: 'schema', label: 'Collection page', type: 'group', fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ] },
      ],
    },
    {
      id: 'seo',
      title: 'SEO',
      fields: [
        { key: 'seo', label: 'SEO', type: 'seo' },
        { key: 'ogImageAlt', label: 'Social share image alt text', type: 'text' },
      ],
    },
  ],
  defaults,
};
