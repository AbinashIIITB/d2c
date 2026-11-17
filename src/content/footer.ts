import type { ContentDefinition } from '@/lib/cms/types';

type FooterLink = { label: string; href: string };

export const footerDefaults = {
  logo: '/logo-footer.png',
  logoAlt: 'Direct2Campus Logo',
  about:
    "Premium educational consultancy guiding admissions into India's top Engineering, Medical, and Management institutions.",
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Colleges', href: '/colleges' },
        { label: 'Exam Guides', href: '/exams' },
        { label: 'Blogs & Insights', href: '/blog' },
        { label: 'MBA Admissions', href: '/mba' },
        { label: 'Contact Us', href: '/contact' },
      ] as FooterLink[],
    },
    {
      title: 'Admissions',
      links: [
        { label: 'Engineering (B.Tech)', href: '/colleges?type=engineering' },
        { label: 'Medical (MBBS, BDS)', href: '/colleges?type=medical' },
        { label: 'Management (BBA, MBA)', href: '/colleges?type=management' },
        { label: 'Law (BA LLB)', href: '/colleges?type=law' },
        { label: 'Design & Architecture', href: '/colleges?type=design' },
      ] as FooterLink[],
    },
  ],
  contact: {
    title: 'Head Office',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
  },
  map: {
    show: true,
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1444155160533!2d88.42635097607733!3d22.570063032930263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02750044088917%3A0x92751991b84ceab5!2sAurora%20Waterfront!5e0!3m2!1sen!2sin!4v1711847119!5m2!1sen!2sin',
    title: 'Direct2Campus Head Office Location',
  },
  copyrightSuffix: 'All rights reserved.',
  bottomLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ] as FooterLink[],
  adminLink: { show: true, label: 'Admin Console', href: '/admin' },
};

export type FooterContent = typeof footerDefaults;

const linkFields = [
  { key: 'label', type: 'text' as const, label: 'Label' },
  { key: 'href', type: 'text' as const, label: 'Link' },
];

export const definition: ContentDefinition<FooterContent> = {
  key: 'footer',
  title: 'Footer',
  group: 'Site',
  previewPath: null,
  sections: [
    {
      id: 'brand',
      title: 'Brand block',
      description: 'Phone, email, address and social links are edited in Site settings.',
      fields: [
        { key: 'logo', type: 'image', label: 'Logo' },
        { key: 'logoAlt', type: 'text', label: 'Logo alt text' },
        { key: 'about', type: 'textarea', label: 'About text' },
      ],
    },
    {
      id: 'columns',
      title: 'Link columns',
      fields: [
        {
          key: 'columns', type: 'list', label: 'Columns', itemLabel: 'column', titleKey: 'title',
          fields: [
            { key: 'title', type: 'text', label: 'Heading' },
            { key: 'links', type: 'list', label: 'Links', itemLabel: 'link', titleKey: 'label', fields: linkFields },
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact column',
      fields: [
        {
          key: 'contact', type: 'group', label: 'Labels',
          fields: [
            { key: 'title', type: 'text', label: 'Heading' },
            { key: 'addressLabel', type: 'text', label: 'Address label' },
            { key: 'phoneLabel', type: 'text', label: 'Phone label' },
            { key: 'emailLabel', type: 'text', label: 'Email label' },
          ],
        },
        {
          key: 'map', type: 'group', label: 'Office map',
          fields: [
            { key: 'show', type: 'boolean', label: 'Show map' },
            { key: 'embedUrl', type: 'url', label: 'Google Maps embed URL' },
            { key: 'title', type: 'text', label: 'Map title (accessibility)' },
          ],
        },
      ],
    },
    {
      id: 'bottom',
      title: 'Bottom bar',
      fields: [
        { key: 'copyrightSuffix', type: 'text', label: 'Text after the brand name in the copyright line' },
        { key: 'bottomLinks', type: 'list', label: 'Legal links', itemLabel: 'link', titleKey: 'label', fields: linkFields },
        {
          key: 'adminLink', type: 'group', label: 'Admin link',
          fields: [
            { key: 'show', type: 'boolean', label: 'Show' },
            { key: 'label', type: 'text', label: 'Label' },
            { key: 'href', type: 'text', label: 'Link' },
          ],
        },
      ],
    },
  ],
  defaults: footerDefaults,
};
