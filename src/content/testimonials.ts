import type { ContentDefinition } from '@/lib/cms/types';
import { testimonialsDefaults } from './testimonials.defaults';

export const definition: ContentDefinition = {
  key: 'testimonials',
  title: 'Testimonials & stories',
  group: 'Pages',
  previewPath: '/',
  sections: [
    {
      id: 'section',
      title: 'Home page testimonials section',
      fields: [
        {
          key: 'section',
          label: 'Section text',
          type: 'group',
          fields: [
            { key: 'eyebrow', label: 'Small heading', type: 'text' },
            { key: 'headingPrefix', label: 'Heading (first part)', type: 'text' },
            { key: 'headingHighlight', label: 'Heading (highlighted part)', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            {
              key: 'featuredLine',
              label: 'Line next to the first testimonial',
              type: 'text',
              help: 'Use {name} where the student name goes.',
            },
            { key: 'readStoryLabel', label: '"Read the story" link label', type: 'text' },
          ],
        },
        {
          key: 'featuredStats',
          label: 'Stats under the first testimonial',
          type: 'list',
          itemLabel: 'stat',
          titleKey: 'label',
          fields: [
            { key: 'value', label: 'Value', type: 'text' },
            { key: 'label', label: 'Label', type: 'text' },
          ],
        },
      ],
    },
    {
      id: 'items',
      title: 'Testimonials and success stories',
      description:
        'The first item is the large featured card on the home page; the rest are the expandable list. Items with a slug and a story headline get their own page at /stories/<slug>.',
      fields: [
        {
          key: 'items',
          label: 'Testimonials',
          type: 'list',
          itemLabel: 'testimonial',
          titleKey: 'name',
          fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'role', label: 'Role / college', type: 'text' },
            { key: 'avatarUrl', label: 'Photo', type: 'image' },
            { key: 'avatarAlt', label: 'Photo alt text', type: 'text' },
            { key: 'rating', label: 'Rating (0 to 5 stars)', type: 'number' },
            { key: 'message', label: 'Quote', type: 'textarea' },
            { key: 'slug', label: 'Story page slug (leave empty for no story page)', type: 'text' },
            {
              key: 'fullStory',
              label: 'Full story',
              type: 'group',
              fields: [
                { key: 'headline', label: 'Headline (a story page is created when this is filled)', type: 'text' },
                { key: 'college', label: 'College', type: 'text' },
                { key: 'branch', label: 'Branch', type: 'text' },
                { key: 'year', label: 'Admission year', type: 'text' },
                { key: 'examScore', label: 'Exam score / rank', type: 'text' },
                { key: 'body', label: 'Story text', type: 'textarea', help: 'Separate paragraphs with a blank line.' },
              ],
            },
            {
              key: 'seo',
              label: 'Story page SEO override',
              type: 'group',
              fields: [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'storyPage',
      title: 'Story page text',
      description: 'Labels shared by every /stories/<slug> page. In the title/description templates use {name}, {headline} and {college}.',
      fields: [
        {
          key: 'storyPage',
          label: 'Story page text',
          type: 'group',
          fields: [
            { key: 'titleTemplate', label: 'Browser title template', type: 'text' },
            { key: 'descriptionTemplate', label: 'Meta description template', type: 'textarea' },
            { key: 'notFoundTitle', label: 'Title when a story is not found', type: 'text' },
            { key: 'breadcrumbHome', label: 'Breadcrumb: home', type: 'text' },
            { key: 'breadcrumbSection', label: 'Breadcrumb: section', type: 'text' },
            { key: 'batchLabel', label: 'Word before the year badge', type: 'text' },
            { key: 'statCollegeLabel', label: 'Stat label: college', type: 'text' },
            { key: 'statBranchLabel', label: 'Stat label: branch', type: 'text' },
            { key: 'statScoreLabel', label: 'Stat label: exam score', type: 'text' },
            { key: 'statYearLabel', label: 'Stat label: year', type: 'text' },
            { key: 'ctaHeading', label: 'Bottom box heading', type: 'text' },
            { key: 'ctaText', label: 'Bottom box text', type: 'textarea' },
            { key: 'whatsappButton', label: 'WhatsApp button', type: 'link' },
            { key: 'callbackLabel', label: 'Callback button label', type: 'text' },
            { key: 'backLink', label: 'Back link', type: 'link' },
          ],
        },
      ],
    },
  ],
  defaults: testimonialsDefaults,
};
