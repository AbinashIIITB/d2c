import type { ContentDefinition } from '@/lib/cms/types';

// Global labels of the blog post page (/blog/[slug]). Per-post values (title, image, excerpt,
// content, tags, SEO) are edited on each post in Admin > Blogs.
export interface BlogPostContent {
  hero: {
    backLabel: string;
    backHref: string;
    backIcon: string;
    authorIcon: string;
    dateIcon: string;
    readTimeIcon: string;
    fallbackAuthor: string;
  };
  article: {
    relatedTopicsLabel: string;
    relatedTopicsIcon: string;
    writtenByLabel: string;
    authorBio: string;
  };
  cta: {
    icon: string;
    heading: string;
    text: string;
    applyLabel: string;
    /** {title} is replaced by the post title (stored with the enquiry). */
    applyContext: string;
    callIcon: string;
    callLabel: string;
    callHref: string;
    whatsappIcon: string;
    whatsappLabel: string;
    whatsappHref: string;
  };
  recommended: {
    heading: string;
    icon: string;
    fallbackCategory: string;
    fallbackReadTime: string;
  };
}

export const defaults: BlogPostContent = {
  hero: {
    backLabel: 'Back to All Articles',
    backHref: '/blog',
    backIcon: 'arrow-left',
    authorIcon: 'user',
    dateIcon: 'calendar',
    readTimeIcon: 'clock',
    fallbackAuthor: 'Direct2Campus Editorial Team',
  },
  article: {
    relatedTopicsLabel: 'Related Topics:',
    relatedTopicsIcon: 'tag',
    writtenByLabel: 'Written By',
    authorBio:
      'Verified educational counselor and admission specialist providing research-backed guidance on Indian higher education.',
  },
  cta: {
    icon: 'sparkles',
    heading: 'Need Admission Guidance?',
    text: 'Connect with our senior counselors at Direct2Campus to explore management quota, cutoff ranks, and seat availability in top colleges.',
    applyLabel: 'Get Free Counseling',
    applyContext: 'Blog Counseling: {title}',
    callIcon: 'phone-call',
    callLabel: 'Call Counselor',
    callHref: 'tel:+916200325137',
    whatsappIcon: 'message-square',
    whatsappLabel: 'WhatsApp Expert',
    whatsappHref: 'https://wa.me/916200325137',
  },
  recommended: {
    heading: 'Recommended Guides',
    icon: 'book-open',
    fallbackCategory: 'Guide',
    fallbackReadTime: '5 min',
  },
};

export const definition: ContentDefinition<BlogPostContent> = {
  key: 'blog-post',
  title: 'Blog post page',
  group: 'Pages',
  previewPath: '/blog/wbjee-vs-jee-main-preparation-strategy-2027',
  sections: [
    {
      id: 'hero',
      title: 'Header',
      description: 'Back link and the icons next to author, date and reading time. The post title, author and date are edited on each post.',
      fields: [
        {
          key: 'hero',
          type: 'group',
          label: 'Header',
          fields: [
            { key: 'backLabel', type: 'text', label: 'Back link text' },
            { key: 'backHref', type: 'url', label: 'Back link address' },
            { key: 'backIcon', type: 'icon', label: 'Back link icon' },
            { key: 'authorIcon', type: 'icon', label: 'Author icon' },
            { key: 'dateIcon', type: 'icon', label: 'Date icon' },
            { key: 'readTimeIcon', type: 'icon', label: 'Reading time icon' },
            { key: 'fallbackAuthor', type: 'text', label: 'Author name when a post has none' },
          ],
        },
      ],
    },
    {
      id: 'article',
      title: 'Article footer',
      description: 'Tags label and the "Written by" card under every article.',
      fields: [
        {
          key: 'article',
          type: 'group',
          label: 'Article footer',
          fields: [
            { key: 'relatedTopicsLabel', type: 'text', label: 'Tags label' },
            { key: 'relatedTopicsIcon', type: 'icon', label: 'Tags icon' },
            { key: 'writtenByLabel', type: 'text', label: '"Written by" label' },
            { key: 'authorBio', type: 'textarea', label: 'Author card text' },
          ],
        },
      ],
    },
    {
      id: 'cta',
      title: 'Sidebar counselling card',
      fields: [
        {
          key: 'cta',
          type: 'group',
          label: 'Counselling card',
          fields: [
            { key: 'icon', type: 'icon', label: 'Card icon' },
            { key: 'heading', type: 'text', label: 'Heading' },
            { key: 'text', type: 'textarea', label: 'Paragraph' },
            { key: 'applyLabel', type: 'text', label: 'Main button text' },
            { key: 'applyContext', type: 'text', label: 'Enquiry label', help: 'Saved with the enquiry. {title} is the post title.' },
            { key: 'callIcon', type: 'icon', label: 'Call button icon' },
            { key: 'callLabel', type: 'text', label: 'Call button text' },
            { key: 'callHref', type: 'url', label: 'Call button link', placeholder: 'tel:+91...' },
            { key: 'whatsappIcon', type: 'icon', label: 'WhatsApp button icon' },
            { key: 'whatsappLabel', type: 'text', label: 'WhatsApp button text' },
            { key: 'whatsappHref', type: 'url', label: 'WhatsApp button link' },
          ],
        },
      ],
    },
    {
      id: 'recommended',
      title: 'Recommended guides',
      fields: [
        {
          key: 'recommended',
          type: 'group',
          label: 'Recommended guides',
          fields: [
            { key: 'heading', type: 'text', label: 'Heading' },
            { key: 'icon', type: 'icon', label: 'Heading icon' },
            { key: 'fallbackCategory', type: 'text', label: 'Category shown when a post has none' },
            { key: 'fallbackReadTime', type: 'text', label: 'Reading time shown when a post has none' },
          ],
        },
      ],
    },
  ],
  defaults,
};
