import type { ContentDefinition, SeoFields } from '@/lib/cms/types';
import { statFields, type HeroStat } from './listing-shared';

export interface ContactContent {
  seo: SeoFields;
  hero: {
    badge: string;
    badgeIcon: string;
    heading: string;
    subheading: string;
    stats: HeroStat[];
  };
  logo: { image: string; alt: string };
  form: {
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submitIcon: string;
    sendingLabel: string;
    successLabel: string;
  };
  info: {
    heading: string;
    items: { icon: string; label: string; value: string }[];
  };
}

export const defaults: ContactContent = {
  seo: {
    title: 'Contact Us – 24/7 Expert Admission Support | Direct2Campus',
    description:
      'Have questions about admission, WBJEE cutoffs, or fee structures? Get in touch with our team for 24/7 expert counseling.',
    keywords: ['contact Direct2Campus', 'admission counselling', 'free college counselling', 'admission help'],
    canonical: 'https://direct2campus.com/contact',
  },
  hero: {
    badge: '24/7 Expert Support',
    badgeIcon: 'phone',
    heading: 'Get In Touch',
    subheading: 'Have questions about admission cutoffs, fee structures, or campus selection? Our advisors are ready to help.',
    stats: [
      { value: '15 Min', label: 'Avg Response Time', icon: 'clock', accent: 'gold' },
      { value: 'Pan-India', label: 'Network Coverage', icon: 'map-pin', accent: 'sky' },
    ],
  },
  logo: { image: '/logo-footer.png', alt: 'Direct2Campus' },
  form: {
    heading: 'Send us a message',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+91',
    emailLabel: 'Email Address',
    emailPlaceholder: 'john@example.com',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Tell us about your requirements...',
    submitLabel: 'Send Message',
    submitIcon: 'send',
    sendingLabel: 'Sending...',
    successLabel: 'Message Sent successfully!',
  },
  info: {
    heading: 'Contact Information',
    items: [
      { icon: 'map-pin', label: 'Our Office', value: 'Ashram Building, GN-34/2, Sector V, Salt Lake Electronics Complex, Kolkata – 700091' },
      { icon: 'phone', label: 'Phone', value: '+91 62003 25137' },
      { icon: 'mail', label: 'Email', value: 'info@direct2campus.com' },
      { icon: 'clock', label: 'Working Hours', value: 'Monday to Saturday: 9:00 AM – 7:30 PM (IST)' },
    ],
  },
};

export const definition: ContentDefinition<ContactContent> = {
  key: 'contact',
  title: 'Contact page',
  group: 'Pages',
  previewPath: '/contact',
  sections: [
    {
      id: 'hero',
      title: 'Hero',
      fields: [
        { key: 'hero', label: 'Hero', type: 'group', fields: [
          { key: 'badge', label: 'Badge text', type: 'text' },
          { key: 'badgeIcon', label: 'Badge icon', type: 'icon' },
          { key: 'heading', label: 'Heading', type: 'text', help: 'The first word is plain, the rest uses the gradient.' },
          { key: 'subheading', label: 'Subheading', type: 'textarea' },
          { key: 'stats', label: 'Stats bar', type: 'list', itemLabel: 'stat', titleKey: 'label', fields: statFields },
        ] },
        { key: 'logo', label: 'Logo banner', type: 'group', fields: [
          { key: 'image', label: 'Image', type: 'image' },
          { key: 'alt', label: 'Alt text', type: 'text' },
        ] },
      ],
    },
    {
      id: 'form',
      title: 'Contact form',
      fields: [
        { key: 'form', label: 'Form', type: 'group', fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'nameLabel', label: 'Name label', type: 'text' },
          { key: 'namePlaceholder', label: 'Name placeholder', type: 'text' },
          { key: 'phoneLabel', label: 'Phone label', type: 'text' },
          { key: 'phonePlaceholder', label: 'Phone placeholder', type: 'text' },
          { key: 'emailLabel', label: 'Email label', type: 'text' },
          { key: 'emailPlaceholder', label: 'Email placeholder', type: 'text' },
          { key: 'messageLabel', label: 'Message label', type: 'text' },
          { key: 'messagePlaceholder', label: 'Message placeholder', type: 'text' },
          { key: 'submitLabel', label: 'Submit button label', type: 'text' },
          { key: 'submitIcon', label: 'Submit button icon', type: 'icon' },
          { key: 'sendingLabel', label: 'Sending text', type: 'text' },
          { key: 'successLabel', label: 'Success message', type: 'text' },
        ] },
      ],
    },
    {
      id: 'info',
      title: 'Contact details',
      fields: [
        { key: 'info', label: 'Contact information card', type: 'group', fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'items', label: 'Details', type: 'list', itemLabel: 'detail', titleKey: 'label', fields: [
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'label', label: 'Label', type: 'text' },
            { key: 'value', label: 'Value', type: 'textarea' },
          ] },
        ] },
      ],
    },
    { id: 'seo', title: 'SEO', fields: [{ key: 'seo', label: 'SEO', type: 'seo' }] },
  ],
  defaults,
};
