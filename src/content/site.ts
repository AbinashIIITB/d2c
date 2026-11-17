import type { ContentDefinition, SeoFields } from '@/lib/cms/types';

const SITE_URL = 'https://direct2campus.com';

export const siteDefaults = {
  /** Brand name pieces: the navbar/footer render `before` + accent `accent` + `after` ("Direct" "2" "Campus"). */
  brand: {
    name: 'Direct2Campus',
    before: 'Direct',
    accent: '2',
    after: 'Campus',
  },
  siteUrl: SITE_URL,
  themeColor: '#0a1128',
  contact: {
    phoneDisplay: '+91 62003 25137',
    /** Digits for tel: links, with country code and a leading +. */
    phoneTel: '+916200325137',
    /** Digits only for wa.me links. */
    whatsappNumber: '916200325137',
    /** Optional pre-filled WhatsApp message (empty = none). */
    whatsappMessage: '',
    email: 'info@direct2campus.com',
    addressLines: [
      'GN-34/1, Aurora Water Front, Unit 21,',
      '11th Floor, Sector V, Salt Lake,',
      'Kolkata - 700091',
    ] as string[],
  },
  social: [
    { platform: 'facebook', label: 'Facebook', href: '#' },
    { platform: 'instagram', label: 'Instagram', href: '#' },
    { platform: 'linkedin', label: 'LinkedIn', href: '#' },
  ] as { platform: string; label: string; href: string }[],
  /** Root-layout SEO (used by every page that does not set its own metadata). */
  seo: {
    title: 'Direct2Campus – Your Shortcut to the Right Campus',
    description:
      "India's trusted educational consultancy for B.Tech, MBBS, MBA & BDS admissions. Compare 150+ colleges, check eligibility & get expert counselling.",
    keywords: [
      'admission guidance',
      'B.Tech admission',
      'MBBS admission',
      'MBA admission',
      'management quota',
      'college admission India',
      'engineering colleges India',
      'medical colleges India',
      'Direct2Campus',
      'admission counselling',
    ],
    canonical: SITE_URL,
    robots: { index: true, follow: true },
    og: {
      title: 'Direct2Campus – Your Shortcut to the Right Campus',
      description:
        "India's trusted educational consultancy for B.Tech, MBBS, MBA & BDS admissions. Compare 150+ colleges & get expert counselling.",
      image: '/logo-footer.png',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Direct2Campus – Your Shortcut to the Right Campus',
      description: "India's trusted educational consultancy for B.Tech, MBBS, MBA & BDS admissions.",
      image: '/logo-footer.png',
    },
    jsonLd: '',
  } as SeoFields,
  seoExtra: {
    titleTemplate: '%s | Direct2Campus',
    authorName: 'Direct2Campus',
    authorUrl: SITE_URL,
    creator: 'Direct2Campus',
    publisher: 'Direct2Campus',
    ogLocale: 'en_IN',
    ogUrl: SITE_URL,
    ogSiteName: 'Direct2Campus',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Direct2Campus – Premium Educational Consultancy',
    googleBotMaxVideoPreview: -1,
    googleBotMaxImagePreview: 'large',
    googleBotMaxSnippet: -1,
    googleVerification: '',
  },
  /** Organization structured data (JSON-LD) rendered on every page. */
  organization: {
    type: 'EducationalOrganization',
    description: "India's trusted educational consultancy for B.Tech, MBBS, MBA & BDS admissions.",
    logo: '/logo-footer.png',
    streetAddress: 'GN-34/1, Aurora Water Front, Unit 21, 11th Floor, Sector V, Salt Lake',
    locality: 'Kolkata',
    region: 'West Bengal',
    postalCode: '700091',
    country: 'IN',
    contactTelephone: '+91-62003-25137',
    contactType: 'customer service',
    areaServed: 'IN',
    languages: ['English', 'Hindi'] as string[],
  },
  analytics: {
    enabled: true,
    gaIds: Array.from(new Set([process.env.NEXT_PUBLIC_GA_ID || 'G-67Y37C17GC', 'G-16VHLY7CMF'])) as string[],
  },
  robots: {
    userAgent: '*',
    allow: ['/'] as string[],
    disallow: ['/admin/', '/api/'] as string[],
    sitemapUrl: `${SITE_URL}/sitemap.xml`,
  },
  sitemap: {
    baseUrl: SITE_URL,
    staticRoutes: ['', '/colleges', '/exams', '/mba', '/blog', '/about', '/contact', '/privacy', '/terms'] as string[],
  },
};

export type SiteContent = typeof siteDefaults;

export const definition: ContentDefinition<SiteContent> = {
  key: 'site',
  title: 'Site settings',
  group: 'Site',
  previewPath: null,
  sections: [
    {
      id: 'brand',
      title: 'Brand and contact',
      description: 'Used in the navbar, footer, popups, floating buttons and structured data.',
      fields: [
        {
          key: 'brand', type: 'group', label: 'Brand name',
          fields: [
            { key: 'name', type: 'text', label: 'Full name (plain text)' },
            { key: 'before', type: 'text', label: 'Logo text: before accent' },
            { key: 'accent', type: 'text', label: 'Logo text: accent (coloured)' },
            { key: 'after', type: 'text', label: 'Logo text: after accent' },
          ],
        },
        { key: 'siteUrl', type: 'url', label: 'Site URL', help: 'Absolute URL without a trailing slash. Used for metadata base.' },
        { key: 'themeColor', type: 'color', label: 'Browser theme colour' },
        {
          key: 'contact', type: 'group', label: 'Contact details',
          fields: [
            { key: 'phoneDisplay', type: 'text', label: 'Phone (as shown)' },
            { key: 'phoneTel', type: 'text', label: 'Phone for call links', help: 'With country code, e.g. +916200325137' },
            { key: 'whatsappNumber', type: 'text', label: 'WhatsApp number', help: 'Digits only with country code, e.g. 916200325137' },
            { key: 'whatsappMessage', type: 'text', label: 'WhatsApp pre-filled message', help: 'Optional' },
            { key: 'email', type: 'text', label: 'Email' },
            { key: 'addressLines', type: 'stringList', label: 'Address lines' },
          ],
        },
        {
          key: 'social', type: 'list', label: 'Social links', itemLabel: 'link', titleKey: 'label',
          fields: [
            {
              key: 'platform', type: 'select', label: 'Platform',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Other', value: 'other' },
              ],
            },
            { key: 'label', type: 'text', label: 'Label (accessibility)' },
            { key: 'href', type: 'url', label: 'URL', help: 'Links starting with http are also added to structured data (sameAs).' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      title: 'Default SEO',
      description: 'Applies to every page that does not set its own SEO.',
      fields: [
        { key: 'seo', type: 'seo', label: 'SEO' },
        {
          key: 'seoExtra', type: 'group', label: 'More metadata',
          fields: [
            { key: 'titleTemplate', type: 'text', label: 'Title template', help: '%s is replaced with the page title.' },
            { key: 'authorName', type: 'text', label: 'Author name' },
            { key: 'authorUrl', type: 'url', label: 'Author URL' },
            { key: 'creator', type: 'text', label: 'Creator' },
            { key: 'publisher', type: 'text', label: 'Publisher' },
            { key: 'ogLocale', type: 'text', label: 'OpenGraph locale' },
            { key: 'ogUrl', type: 'url', label: 'OpenGraph URL' },
            { key: 'ogSiteName', type: 'text', label: 'OpenGraph site name' },
            { key: 'ogImageWidth', type: 'number', label: 'OpenGraph image width' },
            { key: 'ogImageHeight', type: 'number', label: 'OpenGraph image height' },
            { key: 'ogImageAlt', type: 'text', label: 'OpenGraph image alt text' },
            { key: 'googleBotMaxVideoPreview', type: 'number', label: 'Googlebot max video preview' },
            { key: 'googleBotMaxImagePreview', type: 'select', label: 'Googlebot max image preview', options: [
              { label: 'large', value: 'large' }, { label: 'standard', value: 'standard' }, { label: 'none', value: 'none' },
            ] },
            { key: 'googleBotMaxSnippet', type: 'number', label: 'Googlebot max snippet' },
            { key: 'googleVerification', type: 'text', label: 'Google Search Console verification code', help: 'Leave empty for none.' },
          ],
        },
      ],
    },
    {
      id: 'organization',
      title: 'Organization structured data',
      fields: [
        {
          key: 'organization', type: 'group', label: 'Organization (JSON-LD)',
          fields: [
            { key: 'type', type: 'text', label: 'Schema.org type' },
            { key: 'description', type: 'textarea', label: 'Description' },
            { key: 'logo', type: 'image', label: 'Logo' },
            { key: 'streetAddress', type: 'text', label: 'Street address' },
            { key: 'locality', type: 'text', label: 'City' },
            { key: 'region', type: 'text', label: 'State / region' },
            { key: 'postalCode', type: 'text', label: 'Postal code' },
            { key: 'country', type: 'text', label: 'Country code' },
            { key: 'contactTelephone', type: 'text', label: 'Contact telephone' },
            { key: 'contactType', type: 'text', label: 'Contact type' },
            { key: 'areaServed', type: 'text', label: 'Area served' },
            { key: 'languages', type: 'stringList', label: 'Languages' },
          ],
        },
      ],
    },
    {
      id: 'analytics',
      title: 'Analytics',
      fields: [
        {
          key: 'analytics', type: 'group', label: 'Google Analytics',
          fields: [
            { key: 'enabled', type: 'boolean', label: 'Analytics enabled' },
            { key: 'gaIds', type: 'stringList', label: 'GA4 measurement IDs', help: 'e.g. G-XXXXXXXXXX. Page views and events go to every ID.' },
          ],
        },
      ],
    },
    {
      id: 'crawlers',
      title: 'robots.txt and sitemap',
      fields: [
        {
          key: 'robots', type: 'group', label: 'robots.txt',
          fields: [
            { key: 'userAgent', type: 'text', label: 'User agent' },
            { key: 'allow', type: 'stringList', label: 'Allow paths' },
            { key: 'disallow', type: 'stringList', label: 'Disallow paths' },
            { key: 'sitemapUrl', type: 'url', label: 'Sitemap URL' },
          ],
        },
        {
          key: 'sitemap', type: 'group', label: 'Sitemap',
          fields: [
            { key: 'baseUrl', type: 'url', label: 'Base URL' },
            { key: 'staticRoutes', type: 'stringList', label: 'Static routes', help: 'Empty string is the home page. Colleges, exams, blogs and custom pages are added automatically.' },
          ],
        },
      ],
    },
  ],
  defaults: siteDefaults,
};
