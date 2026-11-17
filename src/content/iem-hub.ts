import type { ContentDefinition } from '@/lib/cms/types';
import {
  breadcrumbSchemaField,
  crumbFields,
  faqFields,
  formSection,
  grp,
  icf,
  imf,
  lst,
  noticeFields,
  seoSection,
  sl,
  ta,
  tf,
  uf,
} from './iem-branch.schema';
import { iemHubDefaults, type IemHubContent } from './iem-hub.defaults';

export const definition: ContentDefinition<IemHubContent> = {
  key: 'iem-hub',
  title: 'IEM Kolkata admission hub',
  group: 'Landing pages',
  previewPath: '/admission-in-iem-kolkata',
  sections: [
    {
      id: 'hero',
      title: 'Hero',
      fields: [
        grp('hero', 'Hero', [
          icf('badgeIcon', 'Badge icon'),
          tf('badge', 'Badge text'),
          tf('h1Before', 'Heading: text before the highlight'),
          tf('h1Highlight', 'Heading: highlighted words'),
          tf('h1After', 'Heading: text after the highlight'),
          tf('subtitle', 'Gold sub-heading'),
          ta('copy', 'Intro paragraph'),
          icf('primaryIcon', 'Enquire button icon'),
          tf('primaryLabel', 'Enquire button label'),
          icf('callIcon', 'Call button icon'),
          tf('callLabel', 'Call button label'),
          tf('callHref', 'Call button link', 'e.g. tel:+916200325137'),
          icf('whatsappIcon', 'WhatsApp button icon'),
          tf('whatsappLabel', 'WhatsApp button label'),
          uf('whatsappHref', 'WhatsApp link (including pre-filled message)'),
          imf('image', 'Card image'),
          tf('imageAlt', 'Card image alt text'),
          tf('cardEyebrow', 'Image caption eyebrow'),
          tf('cardTitle', 'Image caption title'),
          tf('cardSubtitle', 'Image caption subtitle'),
          lst('stats', 'Stat boxes', 'stat', 'value', [tf('value', 'Value'), tf('label', 'Label')]),
        ]),
        ...crumbFields,
        breadcrumbSchemaField,
      ],
    },
    { id: 'notice', title: 'Notice bar', fields: [grp('notice', 'Guidance note', noticeFields)] },
    {
      id: 'about',
      title: 'About IEM Kolkata',
      fields: [
        grp('about', 'About', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          sl('paragraphs', 'Paragraphs'),
          icf('factsIcon', 'Quick facts icon'),
          tf('factsTitle', 'Quick facts title'),
          icf('factsBulletIcon', 'Quick facts bullet icon'),
          sl('facts', 'Quick facts'),
          tf('profileLabel', 'Profile link label'),
          uf('profileHref', 'Profile link'),
        ]),
      ],
    },
    {
      id: 'courses',
      title: 'Courses',
      fields: [
        grp('courses', 'Courses', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          ta('intro', 'Intro'),
          tf('detailsLabel', 'Details link label'),
          lst('items', 'Course cards', 'course', 'name', [
            icf('icon', 'Icon'),
            tf('duration', 'Duration'),
            tf('badge', 'Badge'),
            tf('name', 'Name'),
            ta('description', 'Description'),
            tf('enquireLabel', 'Enquire button label'),
            uf('link', 'Details page link'),
          ]),
        ]),
      ],
    },
    {
      id: 'eligibility',
      title: 'Eligibility',
      fields: [
        grp('eligibility', 'Eligibility', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          ta('intro', 'Intro'),
          lst('items', 'Programme cards', 'card', 'title', [
            tf('title', 'Title'),
            tf('labelClass', 'Title colour classes', 'Tailwind classes for the small coloured title'),
            ta('text', 'Text'),
          ]),
        ]),
      ],
    },
    {
      id: 'process',
      title: 'Admission process',
      fields: [
        grp('process', 'Admission process', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          lst('steps', 'Steps', 'step', 'title', [tf('label', 'Step label'), tf('title', 'Title'), ta('text', 'Text')]),
          tf('ctaLabel', 'Button label'),
        ]),
      ],
    },
    {
      id: 'why',
      title: 'Why IEM / why Direct2Campus',
      fields: [
        grp('whyIem', 'Why consider IEM Kolkata', [tf('title', 'Title'), icf('bulletIcon', 'Bullet icon'), sl('items', 'Points')]),
        grp('whyD2c', 'Why Direct2Campus guidance', [
          tf('title', 'Title'),
          ta('text', 'Paragraph'),
          icf('bulletIcon', 'Bullet icon'),
          sl('items', 'Points'),
        ]),
      ],
    },
    formSection,
    { id: 'faqs', title: 'FAQs', description: 'Also used for the FAQPage structured data.', fields: [grp('faqs', 'FAQs', faqFields)] },
    seoSection,
  ],
  defaults: iemHubDefaults,
};
