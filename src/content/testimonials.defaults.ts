// Defaults for the `testimonials` content document (home-page testimonials + /stories/[slug] pages).
// The testimonial list itself is seeded from src/data/testimonials.json.
import testimonialsData from '@/data/testimonials.json';

export interface TestimonialStory {
  headline: string;
  college: string;
  branch: string;
  year: string;
  examScore: string;
  /** Story paragraphs separated by a blank line. */
  body: string;
}

export interface TestimonialSeo {
  title?: string;
  description?: string;
}

export interface TestimonialItem {
  name: string;
  slug?: string;
  role: string;
  message: string;
  avatarUrl: string;
  avatarAlt?: string;
  rating?: number;
  fullStory?: TestimonialStory;
  seo?: TestimonialSeo;
}

interface RawTestimonial {
  name: string;
  slug?: string;
  role: string;
  message: string;
  avatarUrl: string;
  fullStory?: Omit<TestimonialStory, 'body'> & { body: string[] };
}

const items: TestimonialItem[] = (testimonialsData as RawTestimonial[]).map((t) => {
  const item: TestimonialItem = {
    name: t.name,
    role: t.role,
    message: t.message,
    avatarUrl: t.avatarUrl,
    avatarAlt: t.name,
    rating: 5,
  };
  if (t.slug) item.slug = t.slug;
  if (t.fullStory) item.fullStory = { ...t.fullStory, body: t.fullStory.body.join('\n\n') };
  return item;
});

export const testimonialsDefaults = {
  section: {
    eyebrow: 'Success Stories',
    headingPrefix: 'Students trust Direct2Campus for',
    headingHighlight: 'life-changing results.',
    description:
      'From first consultation to campus day — hear directly from the students and parents who made it happen.',
    featuredLine: '{name} secured admission through Direct2Campus.',
    readStoryLabel: 'Read the story',
  },
  featuredStats: [
    { label: 'Branch Secured', value: 'CSE' },
    { label: 'Admission Year', value: '2025' },
    { label: 'Counselling Sessions', value: '3' },
  ],
  items,
  storyPage: {
    titleTemplate: "{name}'s Story — {headline} | Direct2Campus",
    descriptionTemplate: 'Read how {name} secured admission at {college} through Direct2Campus.',
    notFoundTitle: 'Story Not Found',
    breadcrumbHome: 'Home',
    breadcrumbSection: 'Success Stories',
    batchLabel: 'Batch',
    statCollegeLabel: 'College',
    statBranchLabel: 'Branch Secured',
    statScoreLabel: 'Exam Score',
    statYearLabel: 'Admission Year',
    ctaHeading: 'Want a Similar Success Story?',
    ctaText:
      'Our expert counselors have helped hundreds of students get into their dream colleges. Your turn is next.',
    whatsappButton: { label: 'WhatsApp Now', href: 'https://wa.me/916200325137', newTab: true },
    callbackLabel: 'Request Free Counselling',
    backLink: { label: 'Back to all stories', href: '/#testimonials', newTab: false },
  },
};

export type TestimonialsContent = typeof testimonialsDefaults;
