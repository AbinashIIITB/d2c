import type { ContentDefinition } from '@/lib/cms/types';

export const navbarDefaults = {
  links: [
    { label: 'Home', href: '/', dropdown: [] as { label: string; href: string }[] },
    {
      label: 'Colleges',
      href: '/colleges',
      dropdown: [
        { label: 'Engineering', href: '/colleges?type=engineering' },
        { label: 'Medical', href: '/colleges?type=medical' },
        { label: 'Management', href: '/colleges?type=management' },
      ],
    },
    { label: 'Exams', href: '/exams', dropdown: [] as { label: string; href: string }[] },
    { label: 'Blogs', href: '/blog', dropdown: [] as { label: string; href: string }[] },
    { label: 'Contact Us', href: '/contact', dropdown: [] as { label: string; href: string }[] },
  ],
  applyLabel: 'Apply Now',
  callbackLabel: 'Request Callback',
  searchPlaceholder: 'Search colleges, exams...',
  searchLabel: 'Search',
  closeSearchLabel: 'Close search',
  toggleMenuLabel: 'Toggle menu',
};

export type NavbarContent = typeof navbarDefaults;

export const definition: ContentDefinition<NavbarContent> = {
  key: 'navbar',
  title: 'Navbar',
  group: 'Site',
  previewPath: null,
  sections: [
    {
      id: 'links',
      title: 'Menu links',
      description: 'Shown in the desktop bar and the mobile menu. Add dropdown items to show a submenu.',
      fields: [
        {
          key: 'links', type: 'list', label: 'Links', itemLabel: 'link', titleKey: 'label',
          fields: [
            { key: 'label', type: 'text', label: 'Label' },
            { key: 'href', type: 'text', label: 'Link' },
            {
              key: 'dropdown', type: 'list', label: 'Dropdown items', itemLabel: 'item', titleKey: 'label',
              fields: [
                { key: 'label', type: 'text', label: 'Label' },
                { key: 'href', type: 'text', label: 'Link' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'labels',
      title: 'Buttons and labels',
      fields: [
        { key: 'applyLabel', type: 'text', label: 'Apply button' },
        { key: 'callbackLabel', type: 'text', label: 'Mobile menu callback button' },
        { key: 'searchPlaceholder', type: 'text', label: 'Search placeholder' },
        { key: 'searchLabel', type: 'text', label: 'Search button (accessibility label)' },
        { key: 'closeSearchLabel', type: 'text', label: 'Close search (accessibility label)' },
        { key: 'toggleMenuLabel', type: 'text', label: 'Menu toggle (accessibility label)' },
      ],
    },
  ],
  defaults: navbarDefaults,
};
