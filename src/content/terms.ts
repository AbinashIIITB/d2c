import type { ContentDefinition, SeoFields } from '@/lib/cms/types';

export interface TermsContent {
  seo: SeoFields;
  heading: string;
  lastUpdated: string;
  /** Body text. Blank line = new paragraph, "### " = sub-heading, "## " = larger heading. HTML is also accepted. */
  content: string;
}

export const defaults: TermsContent = {
  seo: {
    title: "Terms and Conditions of Service – Direct2Campus | Direct2Campus",
    description: "Review the terms and conditions for using Direct2Campus educational consultancy services, including admission facilitation disclaimers.",
    canonical: 'https://direct2campus.com/terms',
  },
  heading: "Terms of Service",
  lastUpdated: "October 2026",
  content: "By accessing the website at https://direct2campus.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.\n\n### Disclaimer\nThe materials on Direct2Campus's website are provided on an 'as is' basis. Direct2Campus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.\n\n### Admissions\nWe facilitate counseling and management quota admissions. However, final admission grants are subject to the college's administrative discretion and the student's passing of the required background/academic checks.",
};

export const definition: ContentDefinition<TermsContent> = {
  key: 'terms',
  title: "Terms & conditions",
  group: 'Pages',
  previewPath: '/terms',
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
