import type { ContentDefinition } from '@/lib/cms/types';

export const floatingDefaults = {
  whatsapp: {
    enabled: true,
    /** Overrides the number in Site settings when set. */
    number: '',
    message: '',
    label: 'WhatsApp Us',
    title: 'Chat on WhatsApp',
    icon: 'message-circle',
  },
  callback: {
    enabled: true,
    label: 'Request Callback',
    title: 'Request a Callback',
    icon: 'phone-call',
  },
  scrollTopLabel: 'Scroll to top',
  bottomNav: [
    { label: 'Home', href: '/', icon: 'home', isCenter: false },
    { label: 'Colleges', href: '/colleges', icon: 'building-2', isCenter: false },
    { label: 'Consult Us', href: '/contact', icon: 'phone-call', isCenter: true },
    { label: 'Exams', href: '/exams', icon: 'graduation-cap', isCenter: false },
    { label: 'About', href: '/about', icon: 'info', isCenter: false },
  ],
};

export type FloatingContent = typeof floatingDefaults;

export const definition: ContentDefinition<FloatingContent> = {
  key: 'floating',
  title: 'Floating buttons and mobile bar',
  group: 'Site',
  previewPath: null,
  sections: [
    {
      id: 'buttons',
      title: 'Floating buttons',
      description: 'The WhatsApp number defaults to the one in Site settings.',
      fields: [
        {
          key: 'whatsapp', type: 'group', label: 'WhatsApp button',
          fields: [
            { key: 'enabled', type: 'boolean', label: 'Show' },
            { key: 'number', type: 'text', label: 'Number override', help: 'Digits only with country code. Empty = Site settings.' },
            { key: 'message', type: 'text', label: 'Pre-filled message', help: 'Empty = Site settings.' },
            { key: 'label', type: 'text', label: 'Hover label' },
            { key: 'title', type: 'text', label: 'Tooltip' },
            { key: 'icon', type: 'icon', label: 'Icon' },
          ],
        },
        {
          key: 'callback', type: 'group', label: 'Request callback button',
          fields: [
            { key: 'enabled', type: 'boolean', label: 'Show' },
            { key: 'label', type: 'text', label: 'Hover label' },
            { key: 'title', type: 'text', label: 'Tooltip' },
            { key: 'icon', type: 'icon', label: 'Icon' },
          ],
        },
        { key: 'scrollTopLabel', type: 'text', label: 'Scroll-to-top label (accessibility)' },
      ],
    },
    {
      id: 'bottom-nav',
      title: 'Mobile bottom bar',
      description: 'The item marked "centre" opens the callback popup instead of a page.',
      fields: [
        {
          key: 'bottomNav', type: 'list', label: 'Items', itemLabel: 'item', titleKey: 'label',
          fields: [
            { key: 'label', type: 'text', label: 'Label' },
            { key: 'href', type: 'text', label: 'Link' },
            { key: 'icon', type: 'icon', label: 'Icon' },
            { key: 'isCenter', type: 'boolean', label: 'Centre button (opens callback popup)' },
          ],
        },
      ],
    },
  ],
  defaults: floatingDefaults,
};
