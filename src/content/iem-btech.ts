import type { ContentDefinition, Field } from '@/lib/cms/types';
import {
  breadcrumbSchemaField,
  crumbFields,
  faqFields,
  formSection,
  grp,
  icf,
  imf,
  linkListFields,
  lst,
  noticeFields,
  seoSection,
  sl,
  ta,
  tf,
  uf,
} from './iem-branch.schema';
import { iemBtechDefaults, type IemBtechContent } from './iem-btech.defaults';

const labelTextFields: Field[] = [tf('label', 'Bold label'), ta('text', 'Text')];
const titleTextFields: Field[] = [tf('title', 'Title'), ta('text', 'Text')];

export const definition: ContentDefinition<IemBtechContent> = {
  key: 'iem-btech',
  title: 'IEM Kolkata B.Tech',
  group: 'Landing pages',
  previewPath: '/btech-admission-in-iem-kolkata',
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
          icf('bulletIcon', 'Bullet icon'),
          sl('bullets', 'Highlight chips'),
          icf('primaryIcon', 'Primary button icon'),
          tf('primaryLabel', 'Primary button label'),
          icf('callIcon', 'Call button icon'),
          tf('callLabel', 'Call button label'),
          tf('callHref', 'Call button link', 'e.g. tel:+916200325137'),
          imf('image', 'Card image'),
          tf('imageAlt', 'Card image alt text'),
          tf('cardEyebrow', 'Image caption eyebrow'),
          tf('cardTitle', 'Image caption title'),
          lst('facts', 'Fact rows', 'fact', 'label', [
            tf('label', 'Label'),
            tf('value', 'Value'),
            tf('valueClass', 'Value colour classes', 'Tailwind classes, e.g. font-semibold text-white'),
          ]),
        ]),
        ...crumbFields,
        breadcrumbSchemaField,
      ],
    },
    { id: 'notice', title: 'Notice bar', fields: [grp('notice', 'Guidance note', noticeFields)] },
    {
      id: 'overview',
      title: 'Institution overview',
      fields: [
        grp('overview', 'Overview', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          sl('paragraphs', 'Paragraphs'),
          grp('campusNote', 'Campus note', labelTextFields),
          icf('factsIcon', 'Key facts icon'),
          tf('factsTitle', 'Key facts title'),
          icf('factsBulletIcon', 'Key facts bullet icon'),
          sl('facts', 'Key facts'),
          tf('profileLabel', 'Profile link label'),
          uf('profileHref', 'Profile link'),
        ]),
      ],
    },
    {
      id: 'specs',
      title: 'Specialisations',
      fields: [
        grp('specs', 'Specialisations', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          ta('intro', 'Intro'),
          tf('preselectLabel', '"Preselect" link label'),
          tf('detailLabel', 'Card guide link label'),
          lst('items', 'Specialisation cards', 'specialisation', 'name', [
            icf('icon', 'Icon'),
            tf('name', 'Name'),
            tf('tag', 'Tag'),
            tf('badgeColor', 'Tag colour classes', 'Tailwind classes, e.g. bg-blue-50 text-d2c-royal border-blue-200'),
            ta('description', 'Description'),
            tf('enquireLabel', 'Enquire button label'),
            uf('pageUrl', 'Branch page link'),
          ]),
        ]),
      ],
    },
    {
      id: 'mapping',
      title: 'Specialisation mapping',
      fields: [
        grp('mapping', 'Mapping', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          ta('intro', 'Intro'),
          lst('items', 'Cards', 'card', 'title', titleTextFields),
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
          grp('academic', 'Academic criteria card', [
            icf('icon', 'Icon'),
            tf('title', 'Title'),
            icf('bulletIcon', 'Bullet icon'),
            lst('items', 'Criteria', 'criterion', 'label', labelTextFields),
          ]),
          grp('routes', 'Entrance routes card', [
            icf('icon', 'Icon'),
            tf('title', 'Title'),
            icf('bulletIcon', 'Bullet icon'),
            lst('items', 'Routes', 'route', 'label', labelTextFields),
          ]),
          tf('ctaLabel', 'Button label'),
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
          ta('intro', 'Intro'),
          lst('steps', 'Steps (numbered automatically)', 'step', 'title', titleTextFields),
          grp('portal', 'Official portal box', [
            tf('title', 'Title'),
            ta('text', 'Text'),
            tf('viewLabel', 'Portal button label'),
            uf('viewHref', 'Portal link'),
            tf('guidanceLabel', 'Guidance button label'),
          ]),
        ]),
      ],
    },
    {
      id: 'documents',
      title: 'Documents checklist',
      fields: [
        grp('documents', 'Documents', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          ta('intro', 'Intro'),
          icf('bulletIcon', 'Item icon'),
          sl('items', 'Documents'),
          grp('checklist', 'Downloadable checklist', [
            tf('buttonLabel', 'Button label'),
            tf('downloadedLabel', 'Button label after download'),
            tf('fileName', 'Downloaded file name'),
            ta('fileText', 'File contents (plain text)'),
          ]),
        ]),
      ],
    },
    {
      id: 'help',
      title: 'How Direct2Campus helps',
      fields: [
        grp('help', 'Help', [
          tf('eyebrow', 'Eyebrow'),
          tf('heading', 'Heading'),
          ta('intro', 'Intro'),
          lst('items', 'Cards', 'card', 'title', titleTextFields),
        ]),
      ],
    },
    formSection,
    { id: 'faqs', title: 'FAQs', description: 'Also used for the FAQPage structured data.', fields: [grp('faqs', 'FAQs', faqFields)] },
    {
      id: 'related',
      title: 'Related links and mobile bar',
      fields: [
        grp('related', 'Related resources', [tf('title', 'Title'), tf('intro', 'Intro'), lst('links', 'Links', 'link', 'label', linkListFields)]),
        grp('mobileBar', 'Sticky mobile bar', [
          tf('ariaLabel', 'Accessible label'),
          tf('callLabel', 'Call label'),
          tf('callHref', 'Call link', 'e.g. tel:+916200325137'),
          tf('whatsappLabel', 'WhatsApp label'),
          uf('whatsappHref', 'WhatsApp link (including pre-filled message)'),
          tf('enquireLabel', 'Enquire label'),
        ]),
      ],
    },
    seoSection,
  ],
  defaults: iemBtechDefaults,
};
