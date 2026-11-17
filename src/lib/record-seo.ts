// SEO for database-backed records (colleges, exams, blogs, custom pages).
//
// Lane B5 helper. Pure functions only (no server-only imports) so the public pages, the admin
// editors and the SEO Studio can all share them.
//
// Model
//   derived   = what the site emits today, rebuilt from the record's legacy fields
//               (seoTitle, metaDescription, canonicalUrl, primaryKeyword, ... see the *DerivedSeo fns).
//   overrides = the new SeoFields block stored on the record (colleges: contact.seo.meta,
//               exams: exam_pattern.seo.meta, blogs: blogs.seo, custom pages: page.seo).
//   effective = derived overlaid with overrides. This is what the page emits and what the admin shows.
//
// `title` in an effective SeoFields is the FINAL <title> text (the root layout's " | Direct2Campus"
// template is applied here, not by Next, because buildMetadata() emits absolute titles). OG and
// Twitter titles fall back to the title minus that one trailing suffix, exactly like today.
import type { Metadata } from 'next';
import type { SeoFields } from '@/lib/cms/types';
import { buildMetadata } from '@/lib/cms/seo';
import { isIEMCollege } from '@/lib/iem-priority';

export const SITE_ORIGIN = 'https://direct2campus.com';
export const TITLE_SUFFIX = ' | Direct2Campus';
const SITE_NAME = 'Direct2Campus';

function str(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() !== '' ? v : undefined;
}

export function withTitleSuffix(title: string): string {
  return `${title}${TITLE_SUFFIX}`;
}

/** Removes ONE trailing " | Direct2Campus" (the layout template) from a final title. */
export function stripTitleSuffix(title: string | undefined): string | undefined {
  if (!title) return title;
  return title.endsWith(TITLE_SUFFIX) ? title.slice(0, -TITLE_SUFFIX.length) : title;
}

// ---------------------------------------------------------------- merge / diff

function cleanKeywords(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const out = v.filter((k): k is string => typeof k === 'string' && k.trim() !== '');
  return out.length ? out : undefined;
}

/** Coerces anything stored in the database into a safe SeoFields (unknown shapes become {}). */
export function normalizeSeo(raw: unknown): SeoFields {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const r = raw as Record<string, any>;
  const out: SeoFields = {};
  if (str(r.title)) out.title = r.title;
  if (str(r.description)) out.description = r.description;
  const kw = cleanKeywords(r.keywords);
  if (kw) out.keywords = kw;
  if (str(r.canonical)) out.canonical = r.canonical;
  if (r.robots && typeof r.robots === 'object') {
    const robots: { index?: boolean; follow?: boolean } = {};
    if (typeof r.robots.index === 'boolean') robots.index = r.robots.index;
    if (typeof r.robots.follow === 'boolean') robots.follow = r.robots.follow;
    if (Object.keys(robots).length) out.robots = robots;
  }
  if (r.og && typeof r.og === 'object') {
    const og: NonNullable<SeoFields['og']> = {};
    if (str(r.og.title)) og.title = r.og.title;
    if (str(r.og.description)) og.description = r.og.description;
    if (str(r.og.image)) og.image = r.og.image;
    if (r.og.type === 'website' || r.og.type === 'article') og.type = r.og.type;
    if (Object.keys(og).length) out.og = og;
  }
  if (r.twitter && typeof r.twitter === 'object') {
    const tw: NonNullable<SeoFields['twitter']> = {};
    if (str(r.twitter.title)) tw.title = r.twitter.title;
    if (str(r.twitter.description)) tw.description = r.twitter.description;
    if (str(r.twitter.image)) tw.image = r.twitter.image;
    if (r.twitter.card === 'summary' || r.twitter.card === 'summary_large_image') tw.card = r.twitter.card;
    if (Object.keys(tw).length) out.twitter = tw;
  }
  if (str(r.jsonLd)) out.jsonLd = r.jsonLd;
  return out;
}

/** `over` wins field by field when it has a non-empty value. */
export function mergeSeo(base: SeoFields | undefined, over: SeoFields | undefined): SeoFields {
  const b = normalizeSeo(base);
  const o = normalizeSeo(over);
  const out: SeoFields = { ...b, ...o };
  if (b.robots || o.robots) out.robots = { ...(b.robots || {}), ...(o.robots || {}) };
  if (b.og || o.og) out.og = { ...(b.og || {}), ...(o.og || {}) };
  if (b.twitter || o.twitter) out.twitter = { ...(b.twitter || {}), ...(o.twitter || {}) };
  return out;
}

function sameJson(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

/**
 * What must be stored so that mergeSeo(derived, result) === effective: only the fields where the
 * editor's value differs from what the site derives on its own. Blank fields are never stored.
 */
export function seoOverrides(effective: SeoFields | undefined, derived: SeoFields | undefined): SeoFields {
  const e = normalizeSeo(effective);
  const d = normalizeSeo(derived);
  const out: SeoFields = {};
  if (e.title && e.title !== d.title) out.title = e.title;
  if (e.description && e.description !== d.description) out.description = e.description;
  if (e.keywords && !sameJson(e.keywords, d.keywords)) out.keywords = e.keywords;
  if (e.canonical && e.canonical !== d.canonical) out.canonical = e.canonical;
  if (e.jsonLd) out.jsonLd = e.jsonLd;

  const er = { index: e.robots?.index ?? true, follow: e.robots?.follow ?? true };
  const dr = { index: d.robots?.index ?? true, follow: d.robots?.follow ?? true };
  if (er.index !== dr.index || er.follow !== dr.follow) out.robots = er;

  if (e.og) {
    const og: NonNullable<SeoFields['og']> = {};
    if (e.og.title && e.og.title !== d.og?.title) og.title = e.og.title;
    if (e.og.description && e.og.description !== d.og?.description) og.description = e.og.description;
    if (e.og.image && e.og.image !== d.og?.image) og.image = e.og.image;
    if (e.og.type && e.og.type !== d.og?.type) og.type = e.og.type;
    if (Object.keys(og).length) out.og = og;
  }
  if (e.twitter) {
    const tw: NonNullable<SeoFields['twitter']> = {};
    if (e.twitter.title && e.twitter.title !== d.twitter?.title) tw.title = e.twitter.title;
    if (e.twitter.description && e.twitter.description !== d.twitter?.description) tw.description = e.twitter.description;
    if (e.twitter.image && e.twitter.image !== d.twitter?.image) tw.image = e.twitter.image;
    if (e.twitter.card && e.twitter.card !== (d.twitter?.card || 'summary_large_image')) tw.card = e.twitter.card;
    if (Object.keys(tw).length) out.twitter = tw;
  }
  return out;
}

// ---------------------------------------------------------------- metadata builder

export interface RecordMetaOpts {
  ogType?: 'website' | 'article';
  /** Image used when the SEO block has no og/twitter image. */
  fallbackImage?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  /** Extra openGraph keys (article:published_time, authors, tags...). */
  openGraphExtra?: Record<string, unknown>;
  /** Extra top-level Metadata keys (authors...). */
  extra?: Partial<Metadata>;
}

function defined<T extends Record<string, unknown>>(o: T): T {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(o)) if (o[k] !== undefined) out[k] = o[k];
  return out as T;
}

/** Final Metadata for a record from its effective SeoFields. Mirrors the head tags the site emits today. */
export function buildRecordMetadata(seo: SeoFields, opts: RecordMetaOpts = {}): Metadata {
  const s = normalizeSeo(seo);
  const meta: Metadata = buildMetadata(s);

  const index = s.robots?.index ?? true;
  const follow = s.robots?.follow ?? true;
  meta.robots = {
    index,
    follow,
    googleBot: { index, follow, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  };

  const ogTitle = s.og?.title ?? stripTitleSuffix(s.title);
  const ogDesc = s.og?.description ?? s.description;
  const ogImage = s.og?.image ?? opts.fallbackImage;
  const images = ogImage
    ? [defined({ url: ogImage, width: opts.imageWidth, height: opts.imageHeight, alt: opts.imageAlt })]
    : undefined;

  meta.openGraph = defined({
    title: ogTitle,
    description: ogDesc,
    url: s.canonical,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: s.og?.type ?? opts.ogType ?? 'website',
    ...(opts.openGraphExtra || {}),
    images,
  }) as NonNullable<Metadata['openGraph']>;

  const twImage = s.twitter?.image ?? ogImage;
  meta.twitter = defined({
    card: s.twitter?.card ?? 'summary_large_image',
    title: s.twitter?.title ?? ogTitle,
    description: s.twitter?.description ?? ogDesc,
    images: twImage ? [twImage] : undefined,
  }) as NonNullable<Metadata['twitter']>;

  return opts.extra ? { ...meta, ...opts.extra } : meta;
}

// ---------------------------------------------------------------- colleges

/** Alt text of the hero / OG image (the old default said "Campus Direct Admission"). */
export function collegeHeroAlt(college: any): string {
  const seo = college?.seo || college?.contact?.seo || {};
  return seo.images?.heroAlt || seo.heroAlt || `${college?.name} Campus`;
}

export function collegeImageUrl(college: any): string {
  return college?.imageUrl || college?.image_url || '/images/colleges/default-college.jpg';
}

/** Where the new SeoFields live on a college record. */
export function collegeSeoMeta(college: any): SeoFields {
  const seo = college?.seo || college?.contact?.seo || {};
  return normalizeSeo(seo.meta);
}

export function collegeDerivedSeo(college: any): SeoFields {
  const isIem = isIEMCollege(college);
  const legacy = college?.seo || college?.contact?.seo || {};
  const name = college?.name;
  const primaryDegree = college?.courses?.[0] || 'Degree';
  const defaultTitle = isIem
    ? 'IEM Kolkata: Admission, Fees & Placements | Direct2Campus'
    : `${name}: Admission, Fees & Placements | Direct2Campus`;
  const defaultDesc = isIem
    ? 'Explore IEM Kolkata admission, B.Tech courses, fees, eligibility, placements and the application process. Get expert admission guidance from Direct2Campus.'
    : `Explore ${name} admission, ${primaryDegree} courses, fees, eligibility, placements and the application process. Get expert admission guidance from Direct2Campus.`;
  const pageTitle = str(legacy.seoTitle?.trim?.()) || defaultTitle;
  const keywords = [
    ...(legacy.primaryKeyword ? [legacy.primaryKeyword] : []),
    ...(Array.isArray(legacy.secondaryKeywords)
      ? legacy.secondaryKeywords
      : [
          `${name} admission`,
          `${name} fees`,
          `${name} placement`,
          `${name} admission process`,
          `${name} courses fee structure`,
          `${name} ${primaryDegree} fees`,
          `${name} campus`,
        ]),
    name,
    college?.type,
    college?.location,
    ...(college?.tags || []),
  ].filter((k) => typeof k === 'string' && k.trim() !== '');
  return {
    title: withTitleSuffix(pageTitle),
    description: str(legacy.metaDescription?.trim?.()) || defaultDesc,
    keywords,
    canonical: str(legacy.canonicalUrl?.trim?.()) || `${SITE_ORIGIN}/colleges/${college?.slug}`,
    og: { image: collegeImageUrl(college), type: 'website' },
  };
}

export function collegeSeo(college: any): SeoFields {
  return mergeSeo(collegeDerivedSeo(college), collegeSeoMeta(college));
}

export function collegeMetadata(college: any): Metadata {
  return buildRecordMetadata(collegeSeo(college), {
    fallbackImage: collegeImageUrl(college),
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: collegeHeroAlt(college),
  });
}

// ---------------------------------------------------------------- exams

export function examSeoMeta(exam: any): SeoFields {
  const seo = exam?.seo || exam?.exam_pattern?.seo || exam?.examPattern?.seo || {};
  return normalizeSeo(seo.meta);
}

export function examLogoUrl(exam: any): string {
  return exam?.logoUrl || exam?.logo_url || '/logo-footer.png';
}

export function examLogoAlt(exam: any): string {
  const seo = exam?.seo || exam?.exam_pattern?.seo || exam?.examPattern?.seo || {};
  return seo.images?.logoAlt || `${exam?.name} Logo`;
}

export function examDerivedSeo(exam: any): SeoFields {
  const legacy = exam?.seo || exam?.exam_pattern?.seo || exam?.examPattern?.seo || {};
  const name = exam?.name;
  const pageTitle = str(legacy.seoTitle?.trim?.()) || `${name} – Admission & Pattern Guide 2027`;
  const metaDesc =
    str(legacy.metaDescription?.trim?.()) ||
    `${(exam?.aboutExam || exam?.about_exam || exam?.description || '').slice(0, 155)}…`;
  const keywords = [
    ...(legacy.primaryKeyword ? [legacy.primaryKeyword] : []),
    ...(Array.isArray(legacy.secondaryKeywords) ? legacy.secondaryKeywords : []),
    name,
    `${name} exam`,
    `${name} pattern`,
    `${name} eligibility`,
    `${name} cutoff`,
    ...(exam?.tags || []),
  ].filter((k) => typeof k === 'string' && k.trim() !== '');
  return {
    title: withTitleSuffix(pageTitle),
    description: metaDesc,
    keywords,
    canonical: str(legacy.canonicalUrl?.trim?.()) || `${SITE_ORIGIN}/exams/${exam?.slug}`,
    og: { image: examLogoUrl(exam), type: 'website' },
  };
}

export function examSeo(exam: any): SeoFields {
  return mergeSeo(examDerivedSeo(exam), examSeoMeta(exam));
}

export function examMetadata(exam: any): Metadata {
  return buildRecordMetadata(examSeo(exam), {
    fallbackImage: examLogoUrl(exam),
    imageWidth: 800,
    imageHeight: 600,
    imageAlt: examLogoAlt(exam),
  });
}

// ---------------------------------------------------------------- blogs

export function blogImageUrl(blog: any): string {
  return blog?.imageUrl || blog?.image_url || '/images/blog/default.jpg';
}

/** The new SeoFields stored on a blog (blogs.seo jsonb plus the canonical_url / og_* columns). */
export function blogSeoMeta(blog: any): SeoFields {
  const fromColumns: SeoFields = {
    canonical: str(blog?.canonicalUrl) ?? str(blog?.canonical_url),
    og: {
      title: str(blog?.ogTitle) ?? str(blog?.og_title),
      description: str(blog?.ogDescription) ?? str(blog?.og_description),
      image: str(blog?.ogImage) ?? str(blog?.og_image),
    },
  };
  return mergeSeo(fromColumns, normalizeSeo(blog?.seo));
}

export function blogDerivedSeo(blog: any, fallbackSlug = ''): SeoFields {
  const pageTitle = str(blog?.seoTitle) || blog?.title || '';
  const published = blog?.published !== false;
  return {
    title: withTitleSuffix(pageTitle),
    description:
      str(blog?.metaDescription) ||
      str(blog?.excerpt) ||
      `Read ${blog?.title} on Direct2Campus for latest admission insights, cutoffs, and guidance.`,
    keywords: [
      ...(Array.isArray(blog?.tags) ? blog.tags : []),
      blog?.category || 'Admission Guide',
      'college admissions',
      'engineering admission',
      'Direct2Campus',
    ],
    canonical: `${SITE_ORIGIN}/blog/${blog?.slug || fallbackSlug}`,
    robots: published ? undefined : { index: false, follow: true },
    og: { image: blogImageUrl(blog), type: 'article' },
  };
}

export function blogSeo(blog: any, fallbackSlug = ''): SeoFields {
  return mergeSeo(blogDerivedSeo(blog, fallbackSlug), blogSeoMeta(blog));
}

export function blogMetadata(blog: any, fallbackSlug = ''): Metadata {
  const authorName = blog?.author || 'Direct2Campus Editorial Team';
  return buildRecordMetadata(blogSeo(blog, fallbackSlug), {
    ogType: 'article',
    fallbackImage: blogImageUrl(blog),
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: blog?.title,
    openGraphExtra: { publishedTime: blog?.date, authors: [authorName], tags: blog?.tags || [] },
    extra: { authors: [{ name: authorName, url: SITE_ORIGIN }] },
  });
}

// ---------------------------------------------------------------- custom pages

export function pageSeoMeta(page: any): SeoFields {
  return normalizeSeo(page?.seo);
}

export function pageDerivedSeo(page: any, fallbackSlug = ''): SeoFields {
  const slug = page?.slug || fallbackSlug;
  const pageTitle = page?.seoTitle || page?.title || `${page?.h1 || fallbackSlug} | Direct2Campus`;
  const isIndexed = page?.published !== false && page?.noIndex !== true;
  const rawKeywords = Array.isArray(page?.keywords) ? page.keywords : page?.keywords ? [page.keywords] : ['Direct2Campus', 'College Admissions'];
  return {
    title: withTitleSuffix(pageTitle),
    description:
      page?.metaDescription ||
      page?.description ||
      `Explore ${page?.title || fallbackSlug} on Direct2Campus for latest higher education admission insights.`,
    keywords: rawKeywords,
    canonical: page?.canonicalUrl || `${SITE_ORIGIN}/${slug}`,
    robots: isIndexed ? undefined : { index: false, follow: false },
    og: page?.featuredImage ? { image: page.featuredImage, type: 'website' } : { type: 'website' },
  };
}

export function pageSeo(page: any, fallbackSlug = ''): SeoFields {
  return mergeSeo(pageDerivedSeo(page, fallbackSlug), pageSeoMeta(page));
}

export function pageMetadata(page: any, fallbackSlug = ''): Metadata {
  const seo = pageSeo(page, fallbackSlug);
  return buildRecordMetadata(seo, {
    fallbackImage: page?.featuredImage || undefined,
    imageAlt: page?.imageAlt || stripTitleSuffix(seo.title),
  });
}

// ---------------------------------------------------------------- SEO Studio status

export type LengthState = 'empty' | 'short' | 'good' | 'long';

export interface SeoStatus {
  titleLength: number;
  descriptionLength: number;
  titleState: LengthState;
  descriptionState: LengthState;
  noindex: boolean;
  /** Human-readable problems, empty when everything is fine. */
  issues: string[];
}

function lengthState(n: number, min: number, max: number): LengthState {
  return n === 0 ? 'empty' : n < min ? 'short' : n > max ? 'long' : 'good';
}

export function seoStatus(seo: SeoFields | undefined): SeoStatus {
  const s = normalizeSeo(seo);
  const titleLength = (s.title || '').length;
  const descriptionLength = (s.description || '').length;
  const titleState = lengthState(titleLength, 30, 65);
  const descriptionState = lengthState(descriptionLength, 70, 160);
  const noindex = s.robots?.index === false;
  const issues: string[] = [];
  if (titleState === 'empty') issues.push('Missing title');
  else if (titleState === 'short') issues.push('Title is short');
  else if (titleState === 'long') issues.push('Title is too long');
  if (descriptionState === 'empty') issues.push('Missing description');
  else if (descriptionState === 'short') issues.push('Description is short');
  else if (descriptionState === 'long') issues.push('Description is too long');
  if (noindex) issues.push('Hidden from search (noindex)');
  return { titleLength, descriptionLength, titleState, descriptionState, noindex, issues };
}
