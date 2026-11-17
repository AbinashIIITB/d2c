import type { ContentDefinition, SeoFields } from '@/lib/cms/types';

export interface PrivacyContent {
  seo: SeoFields;
  heading: string;
  lastUpdated: string;
  /** Body text. Blank line = new paragraph, "### " = sub-heading, "## " = larger heading. HTML is also accepted. */
  content: string;
}

export const defaults: PrivacyContent = {
  seo: {
    title: "Privacy Policy – Direct2Campus | Direct2Campus",
    description: "Read the Direct2Campus privacy policy. Learn how we collect, use, and protect your personal data when using our educational consultancy services.",
    canonical: 'https://direct2campus.com/privacy',
  },
  heading: "Privacy Policy",
  lastUpdated: "October 2026",
  content: "Your privacy is important to us. It is Direct2Campus's policy to respect your privacy regarding any information we may collect from you across our website, https://direct2campus.com, and other sites we own and operate.\n\n### Information we collect\nWe only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we are collecting it and how it will be used.\n\n### How we use your data\nWe use your contact details exclusively to provide educational counseling, updates on college criteria, and for lead management internally (via our CMS database). We do not share your information publicly or with third-parties, except when required to by law.",
};

export const definition: ContentDefinition<PrivacyContent> = {
  key: 'privacy',
  title: "Privacy policy",
  group: 'Pages',
  previewPath: '/privacy',
  sections: [
    {
      id: 'content',
      title: 'Page content',
      fields: [
        { key: 'heading', label: 'Page heading (h1)', type: 'text' },
        { key: 'lastUpdated', label: 'Last updated', type: 'text', help: 'Shown as "Last updated: …"' },
        {
          key: 'content',
          label: 'Body',
          type: 'textarea',
          help: 'Separate paragraphs with a blank line. Start a line with ### for a sub-heading (## for a larger one). Raw HTML is also accepted.',
        },
      ],
    },
    { id: 'seo', title: 'SEO', fields: [{ key: 'seo', label: 'SEO', type: 'seo' }] },
  ],
  defaults,
};
