import fs from 'fs';
import path from 'path';
import { colleges as staticColleges, exams as staticExams, College, Exam } from './data';
import staticBlogs from '@/data/blog.json';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';
import { sortCollegesWithIEMFirst, isIEMCollege } from './iem-priority';
import type { SeoFields } from './cms/types';
import { normalizeSeo } from './record-seo';
import { mapCollegeToDb, mapExamToDb } from './admin-mappers';

export { sortCollegesWithIEMFirst, isIEMCollege } from './iem-priority';

// Persistent local file paths for storing admin edits when Supabase is not connected
const LOCAL_STORE_FILE = path.join(process.cwd(), 'src', 'data', 'local-cms-data.json');
const TMP_STORE_FILE = path.join('/tmp', 'd2c-local-cms-data.json');

interface LocalCmsData {
  colleges: any[];
  exams: any[];
  blogs?: any[];
  updatedAt: string;
}

// In-memory global store to survive Next.js HMR reloads
declare global {
  // eslint-disable-next-line no-var
  var __d2c_cms_store__: LocalCmsData | undefined;
}

function initLocalStore(): LocalCmsData {
  if (globalThis.__d2c_cms_store__) {
    return globalThis.__d2c_cms_store__;
  }

  // 1. Try reading from /tmp if updated in serverless container
  try {
    if (fs.existsSync(TMP_STORE_FILE)) {
      const content = fs.readFileSync(TMP_STORE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed.colleges) && Array.isArray(parsed.exams)) {
        // Blogs in the local store are edits only (bundled blogs are layered underneath at read time).
        if (!Array.isArray(parsed.blogs)) parsed.blogs = [];
        globalThis.__d2c_cms_store__ = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore /tmp read error
  }

  // 2. Try reading from project repo
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const content = fs.readFileSync(LOCAL_STORE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed.colleges) && Array.isArray(parsed.exams)) {
        // Blogs in the local store are edits only (bundled blogs are layered underneath at read time).
        if (!Array.isArray(parsed.blogs)) parsed.blogs = [];
        globalThis.__d2c_cms_store__ = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not load local cms data from disk, using static data defaults:", err);
  }

  // 3. Fallback to static data
  const initialData: LocalCmsData = {
    colleges: [...staticColleges],
    exams: [...staticExams],
    blogs: [],
    updatedAt: new Date().toISOString()
  };

  globalThis.__d2c_cms_store__ = initialData;
  return initialData;
}

function persistLocalStore(data: LocalCmsData) {
  globalThis.__d2c_cms_store__ = data;
  const payload = JSON.stringify(data, null, 2);

  // Attempt local repo write (for local development)
  try {
    const dir = path.dirname(LOCAL_STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORE_FILE, payload, 'utf-8');
  } catch {
    // Expected to fail on read-only serverless filesystems (e.g. Vercel)
  }

  // Also write to /tmp in serverless containers
  try {
    fs.writeFileSync(TMP_STORE_FILE, payload, 'utf-8');
  } catch (err) {
    console.warn("Could not persist to /tmp store in serverless environment:", err);
  }
}

// ----------------------------------------------------------------------
// Field Mappers (CamelCase <-> SnakeCase for Supabase compatibility)
// ----------------------------------------------------------------------
export function mapCollegeToCamelCase(c: any): any {
  if (!c) return c;
  const isIem = isIEMCollege(c);
  const defaultH1 = isIem
    ? "IEM Kolkata Admission, Courses, Fees and Placements"
    : `${c.name} Admission, Courses, Fees and Placements`;

  const rawImage = c.imageUrl || c.image_url;
  const fallbackImage = rawImage && rawImage.trim().length > 0
    ? rawImage
    : (isIem
        ? "/images/colleges/iem-saltlake.jpg"
        : c.slug
        ? `/images/colleges/${c.slug}.jpg`
        : "/images/colleges/iem-saltlake.jpg");

  const resolvedH1 = c.seo?.h1Title || c.contact?.seo?.h1Title || c.h1 || defaultH1;

  return {
    ...c,
    imageUrl: fallbackImage,
    image_url: fallbackImage,
    logoUrl: c.logo_url ?? c.logoUrl ?? "/footer-logo.jpg",
    coverUrl: c.cover_url ?? c.coverUrl ?? fallbackImage,
    h1: resolvedH1,
    coursesDetails: c.courses_details ?? c.coursesDetails,
    feesDetails: c.fees_details ?? c.feesDetails,
    keyDates: c.key_dates ?? c.keyDates,
    whyChoose: c.why_choose ?? c.whyChoose,
    galleryImages: c.gallery_images ?? c.galleryImages,
    whyChooseAkashTalks: c.why_choose_akash_talks ?? c.whyChooseAkashTalks,
    neetCutoffs: c.neet_cutoffs ?? c.neetCutoffs,
    mqFees: c.mq_fees ?? c.mqFees,
    hostelFees: c.hostel_fees ?? c.hostelFees,
    miscFees: c.misc_fees ?? c.miscFees,
    securityDeposit: c.security_deposit ?? c.securityDeposit,
    coursesSeats: c.courses_seats ?? c.coursesSeats,
    facultyDepartments: c.faculty_departments ?? c.facultyDepartments,
    admissionProcess: c.admission_process ?? c.admissionProcess,
    sectionHeadings: c.sectionHeadings || c.contact?.seo?.sectionHeadings || c.seo?.sectionHeadings || {},
    seo: {
      ...(c.contact?.seo || c.seo || {}),
      h1Title: resolvedH1,
      sectionHeadings: c.sectionHeadings || c.contact?.seo?.sectionHeadings || c.seo?.sectionHeadings || {},
    },
  };
}

export function mapCollegeToSnakeCase(body: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  const keyMap: Record<string, string> = {
    imageUrl: 'image_url',
    logoUrl: 'logo_url',
    coverUrl: 'cover_url',
    coursesDetails: 'courses_details',
    feesDetails: 'fees_details',
    keyDates: 'key_dates',
    whyChoose: 'why_choose',
    galleryImages: 'gallery_images',
    whyChooseAkashTalks: 'why_choose_akash_talks',
    neetCutoffs: 'neet_cutoffs',
    mqFees: 'mq_fees',
    hostelFees: 'hostel_fees',
    miscFees: 'misc_fees',
    securityDeposit: 'security_deposit',
    coursesSeats: 'courses_seats',
    facultyDepartments: 'faculty_departments',
    admissionProcess: 'admission_process'
  };

  for (const [key, value] of Object.entries(body)) {
    const targetKey = keyMap[key] || key;
    result[targetKey] = value;
  }

  if (body.seo || body.sectionHeadings || body.h1Title || body.h1) {
    result.contact = {
      ...(result.contact || {}),
      seo: {
        ...(result.contact?.seo || body.seo || {}),
        ...(body.sectionHeadings ? { sectionHeadings: body.sectionHeadings } : {}),
        ...(body.h1Title ? { h1Title: body.h1Title } : {}),
        ...(body.h1 ? { h1Title: body.h1 } : {}),
      }
    };
  }

  if (result.description && !result.about) {
    result.about = result.description;
  } else if (result.about && !result.description) {
    result.description = result.about;
  }

  return result;
}

export function mapExamToCamelCase(e: any): any {
  if (!e) return e;
  return {
    ...e,
    fullName: e.full_name ?? e.fullName,
    logoUrl: e.logo_url ?? e.logoUrl,
    applicationLink: e.application_link ?? e.applicationLink,
    aboutExam: e.about_exam ?? e.aboutExam,
    importantDates: e.important_dates ?? e.importantDates,
    applicationProcess: e.application_process ?? e.applicationProcess,
    examPattern: e.exam_pattern ?? e.examPattern,
    seo: e.exam_pattern?.seo ?? e.examPattern?.seo ?? e.seo ?? {},
  };
}

export function mapExamToSnakeCase(body: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  const keyMap: Record<string, string> = {
    fullName: 'full_name',
    logoUrl: 'logo_url',
    applicationLink: 'application_link',
    aboutExam: 'about_exam',
    importantDates: 'important_dates',
    applicationProcess: 'application_process',
    examPattern: 'exam_pattern',
  };

  for (const [key, value] of Object.entries(body)) {
    if (key === 'tags') continue; // exams table does not have tags in Supabase schema
    const targetKey = keyMap[key] || key;
    result[targetKey] = value;
  }

  if (body.seo) {
    result.exam_pattern = {
      ...(result.exam_pattern || {}),
      seo: body.seo
    };
  }

  return result;
}

// ----------------------------------------------------------------------
// High-Performance In-Memory Cache (Sub-millisecond responses for visitors)
// ----------------------------------------------------------------------
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let collegesCache: CacheEntry<any[]> | null = null;
let examsCache: CacheEntry<any[]> | null = null;
let blogsCache: CacheEntry<any[]> | null = null;
// Short TTL: the cache is per server instance, so other instances catch up within this window
// after an admin write (the writing instance is cleared immediately via clearCmsMemoryCache).
const CMS_CACHE_TTL = 15 * 1000;

export function clearCmsMemoryCache() {
  collegesCache = null;
  examsCache = null;
  blogsCache = null;
}

// ----------------------------------------------------------------------
// High-Level Data Service Methods (Automatic Supabase + Local Fallback)
// ----------------------------------------------------------------------

export async function getAllColleges(): Promise<any[]> {
  const now = Date.now();
  if (collegesCache && now - collegesCache.timestamp < CMS_CACHE_TTL) {
    return collegesCache.data;
  }

  let result: any[] = [];
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('colleges')
        .select('*')
        .order('name');
      if (!error && data && data.length > 0) {
        result = sortCollegesWithIEMFirst(data.map(mapCollegeToCamelCase));
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local cms store:", err);
    }
  }

  if (result.length === 0) {
    const store = initLocalStore();
    result = sortCollegesWithIEMFirst(store.colleges.map(mapCollegeToCamelCase));
  }

  collegesCache = { data: result, timestamp: now };
  return result;
}

export async function getCollegeByIdOrSlug(identifier: string): Promise<any | null> {
  const normId = identifier.toLowerCase().replace(/[-_\s]/g, '');
  const isIemLookup = normId === 'iemsaltlake' || normId === '1';
  const hyphenated = identifier.replace(/_/g, '-');
  const underscored = identifier.replace(/-/g, '_');

  // 1. Fast in-memory lookup if available
  if (collegesCache && Date.now() - collegesCache.timestamp < CMS_CACHE_TTL) {
    const cached = collegesCache.data.find(c => 
      c.id === identifier || 
      c.slug === identifier ||
      c.slug === hyphenated ||
      c.slug === underscored ||
      (isIemLookup && (c.id === '1' || c.slug === 'iem-saltlake' || c.slug === 'iem_saltlake' || c.slug === 'iem-salt-lake')) ||
      (c.slug && c.slug.toLowerCase().replace(/[-_\s]/g, '') === normId)
    );
    if (cached) return cached;
  }

  if (isSupabaseConfigured) {
    try {
      const orFilter = isIemLookup
        ? `id.eq.${identifier},slug.eq.${identifier},slug.eq.${hyphenated},slug.eq.${underscored},id.eq.1,slug.eq.iem-saltlake,slug.eq.iem_saltlake,slug.eq.iem-salt-lake`
        : `id.eq.${identifier},slug.eq.${identifier},slug.eq.${hyphenated},slug.eq.${underscored}`;

      const { data, error } = await supabaseAdmin
        .from('colleges')
        .select('*')
        .or(orFilter)
        .maybeSingle();

      if (!error && data) {
        return mapCollegeToCamelCase(data);
      }
    } catch (err) {
      console.warn("Supabase query failed for college, checking local store:", err);
    }
  }

  const store = initLocalStore();
  const found = store.colleges.find(c => 
    c.id === identifier || 
    c.slug === identifier ||
    c.slug === hyphenated ||
    c.slug === underscored ||
    (isIemLookup && (c.id === '1' || c.slug === 'iem-saltlake' || c.slug === 'iem_saltlake' || c.slug === 'iem-salt-lake')) ||
    (c.slug && c.slug.toLowerCase().replace(/[-_\s]/g, '') === normId)
  );
  return found ? mapCollegeToCamelCase(found) : null;
}

export async function saveCollege(data: any): Promise<any> {
  clearCmsMemoryCache(); // Invalidate cache immediately on edit
  const snakeData = mapCollegeToSnakeCase(data);
  const collegeId = snakeData.id || snakeData.slug || `college_${Date.now()}`;
  snakeData.id = collegeId;

  if (isSupabaseConfigured) {
    const { data: saved, error } = await supabaseAdmin
      .from('colleges')
      .upsert(mapCollegeToDb({ ...data, id: collegeId }), { onConflict: 'id' })
      .select()
      .single();

    if (error || !saved) {
      throw new Error(`Could not save college: ${error?.message || 'no row returned'}`);
    }
    // Also update local store so it stays in sync
    const store = initLocalStore();
    const existingIdx = store.colleges.findIndex(c => c.id === collegeId || c.slug === snakeData.slug);
    const camelSaved = mapCollegeToCamelCase(saved);
    if (existingIdx >= 0) {
      store.colleges[existingIdx] = { ...store.colleges[existingIdx], ...camelSaved };
    } else {
      store.colleges.unshift(camelSaved);
    }
    persistLocalStore(store);
    return camelSaved;
  }

  // Local store save (Supabase not configured: local development)
  const store = initLocalStore();
  const camelData = mapCollegeToCamelCase({ ...snakeData, id: collegeId });
  const existingIdx = store.colleges.findIndex(c => c.id === collegeId || (c.slug && c.slug === camelData.slug));

  if (existingIdx >= 0) {
    store.colleges[existingIdx] = { ...store.colleges[existingIdx], ...camelData };
  } else {
    store.colleges.unshift(camelData);
  }

  persistLocalStore(store);
  return camelData;
}

export async function deleteCollege(id: string): Promise<boolean> {
  clearCmsMemoryCache(); // Invalidate cache immediately on delete
  if (isSupabaseConfigured) {
    const { error } = await supabaseAdmin.from('colleges').delete().eq('id', id);
    if (error) throw new Error(`Could not delete college: ${error.message}`);
  }

  const store = initLocalStore();
  const initialLength = store.colleges.length;
  store.colleges = store.colleges.filter(c => c.id !== id && c.slug !== id);
  if (store.colleges.length !== initialLength) {
    persistLocalStore(store);
  }
  return true;
}

/**
 * Stores the new SeoFields block (`contact.seo.meta`) without touching any other column.
 * Colleges that only exist in the bundled data are upserted into Supabase first.
 */
export async function saveCollegeSeoMeta(idOrSlug: string, meta: SeoFields): Promise<any> {
  const record = await getCollegeByIdOrSlug(idOrSlug);
  if (!record) throw new Error('College not found');
  const clean = normalizeSeo(meta);
  const withMeta = (seo: any) => {
    const next = { ...(seo || {}) };
    if (Object.keys(clean).length) next.meta = clean;
    else delete next.meta;
    return next;
  };

  if (isSupabaseConfigured) {
    const { data: row, error } = await supabaseAdmin
      .from('colleges')
      .select('id, contact')
      .eq('id', record.id)
      .maybeSingle();
    if (error) throw new Error(`Could not read college: ${error.message}`);
    if (row) {
      const contact = { ...(row.contact || {}), seo: withMeta(row.contact?.seo) };
      const { error: upErr } = await supabaseAdmin.from('colleges').update({ contact }).eq('id', record.id);
      if (upErr) throw new Error(`Could not save SEO: ${upErr.message}`);
      clearCmsMemoryCache();
      return { id: record.id, slug: record.slug };
    }
  }
  const saved = await saveCollege({ ...record, seo: withMeta(record.seo) });
  return { id: saved.id, slug: saved.slug };
}

// ----------------------------------------------------------------------
// Exams Data Service Methods
// ----------------------------------------------------------------------

export async function getAllExams(): Promise<any[]> {
  const now = Date.now();
  if (examsCache && now - examsCache.timestamp < CMS_CACHE_TTL) {
    return examsCache.data;
  }

  let result: any[] = [];
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('exams')
        .select('*')
        .order('name');
      if (!error && data && data.length > 0) {
        result = data
          .filter(e => !String(e.id || '').startsWith('__d2c_') && !String(e.slug || '').startsWith('__d2c_'))
          .map(mapExamToCamelCase);
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local cms store:", err);
    }
  }

  if (result.length === 0) {
    const store = initLocalStore();
    result = store.exams
      .filter(e => !String(e.id || '').startsWith('__d2c_') && !String(e.slug || '').startsWith('__d2c_'))
      .map(mapExamToCamelCase);
  }

  examsCache = { data: result, timestamp: now };
  return result;
}

export async function getExamByIdOrSlug(identifier: string): Promise<any | null> {
  if (!identifier || String(identifier).startsWith('__d2c_')) return null;

  if (examsCache && Date.now() - examsCache.timestamp < CMS_CACHE_TTL) {
    const cached = examsCache.data.find(e => e.id === identifier || e.slug === identifier);
    if (cached) return cached;
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('exams')
        .select('*')
        .or(`id.eq.${identifier},slug.eq.${identifier}`)
        .maybeSingle();

      if (!error && data && !String(data.id || '').startsWith('__d2c_')) {
        return mapExamToCamelCase(data);
      }
    } catch (err) {
      console.warn("Supabase query failed for exam, checking local store:", err);
    }
  }

  const store = initLocalStore();
  const found = store.exams.find(e => 
    !String(e.id || '').startsWith('__d2c_') && (e.id === identifier || e.slug === identifier)
  );
  return found ? mapExamToCamelCase(found) : null;
}

export async function saveExam(data: any): Promise<any> {
  clearCmsMemoryCache(); // Invalidate cache immediately on edit
  const snakeData = mapExamToSnakeCase(data);
  const examId = snakeData.id || snakeData.slug || `exam_${Date.now()}`;
  snakeData.id = examId;

  if (isSupabaseConfigured) {
    const { data: saved, error } = await supabaseAdmin
      .from('exams')
      .upsert(mapExamToDb({ ...data, id: examId }), { onConflict: 'id' })
      .select()
      .single();

    if (error || !saved) {
      throw new Error(`Could not save exam: ${error?.message || 'no row returned'}`);
    }
    const store = initLocalStore();
    const existingIdx = store.exams.findIndex(e => e.id === examId || e.slug === snakeData.slug);
    const camelSaved = mapExamToCamelCase(saved);
    if (existingIdx >= 0) {
      store.exams[existingIdx] = { ...store.exams[existingIdx], ...camelSaved };
    } else {
      store.exams.unshift(camelSaved);
    }
    persistLocalStore(store);
    return camelSaved;
  }

  const store = initLocalStore();
  const camelData = mapExamToCamelCase({ ...snakeData, id: examId });
  const existingIdx = store.exams.findIndex(e => e.id === examId || (e.slug && e.slug === camelData.slug));

  if (existingIdx >= 0) {
    store.exams[existingIdx] = { ...store.exams[existingIdx], ...camelData };
  } else {
    store.exams.unshift(camelData);
  }

  persistLocalStore(store);
  return camelData;
}

export async function deleteExam(id: string): Promise<boolean> {
  clearCmsMemoryCache(); // Invalidate cache immediately on delete
  if (isSupabaseConfigured) {
    const { error } = await supabaseAdmin.from('exams').delete().eq('id', id);
    if (error) throw new Error(`Could not delete exam: ${error.message}`);
  }

  const store = initLocalStore();
  const initialLength = store.exams.length;
  store.exams = store.exams.filter(e => e.id !== id && e.slug !== id);
  if (store.exams.length !== initialLength) {
    persistLocalStore(store);
  }
  return true;
}

/** Stores the new SeoFields block (`exam_pattern.seo.meta`) without touching any other column. */
export async function saveExamSeoMeta(idOrSlug: string, meta: SeoFields): Promise<any> {
  const record = await getExamByIdOrSlug(idOrSlug);
  if (!record) throw new Error('Exam not found');
  const clean = normalizeSeo(meta);
  const withMeta = (seo: any) => {
    const next = { ...(seo || {}) };
    if (Object.keys(clean).length) next.meta = clean;
    else delete next.meta;
    return next;
  };

  if (isSupabaseConfigured) {
    const { data: row, error } = await supabaseAdmin
      .from('exams')
      .select('id, exam_pattern')
      .eq('id', record.id)
      .maybeSingle();
    if (error) throw new Error(`Could not read exam: ${error.message}`);
    if (row) {
      const exam_pattern = { ...(row.exam_pattern || {}), seo: withMeta(row.exam_pattern?.seo) };
      const { error: upErr } = await supabaseAdmin.from('exams').update({ exam_pattern }).eq('id', record.id);
      if (upErr) throw new Error(`Could not save SEO: ${upErr.message}`);
      clearCmsMemoryCache();
      return { id: record.id, slug: record.slug };
    }
  }
  const saved = await saveExam({ ...record, seo: withMeta(record.seo) });
  return { id: saved.id, slug: saved.slug };
}

// ----------------------------------------------------------------------
// Blogs
//
// Layering (lowest to highest priority):
//   1. bundled src/data/blog.json
//   2. the persistent store:  Supabase `blogs` table  (or, until the migration has run, the legacy
//      `__d2c_cms_blogs_store__` backup row; or, with no Supabase at all, the local dev store)
// A stored row replaces the bundled blog with the same id or slug. Bundled blogs that have no stored
// row still show. Deleting a bundled blog stores a tombstone row (published=false, seo.deleted=true)
// that hides it everywhere; deleting any other blog removes its row.
// ----------------------------------------------------------------------

function formatBlogDate(iso: unknown): string {
  if (typeof iso !== 'string' || !iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function isBlogTombstone(b: any): boolean {
  return !!b && typeof b.seo === 'object' && b.seo !== null && b.seo.deleted === true;
}

export function mapBlogToCamelCase(b: any): any {
  if (!b) return b;
  return {
    ...b,
    id: String(b.id ?? b.slug ?? `blog_${Date.now()}`),
    title: b.title || '',
    slug: b.slug || '',
    excerpt: b.excerpt || '',
    content: b.content || '',
    category: b.category || 'Admission Guide',
    author: b.author || 'Direct2Campus Editorial Team',
    // Never invent a date: use the stored one, else the row's creation date, else nothing.
    date: b.date || formatBlogDate(b.created_at ?? b.createdAt),
    readTime: b.read_time ?? b.readTime ?? '5 min read',
    imageUrl: b.image_url ?? b.imageUrl ?? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    tags: Array.isArray(b.tags) ? b.tags : [],
    published: b.published !== false,
    seoTitle: b.seo_title ?? b.seoTitle ?? b.title ?? '',
    metaDescription: b.meta_description ?? b.metaDescription ?? b.excerpt ?? '',
    seo: b.seo && typeof b.seo === 'object' && !Array.isArray(b.seo) ? b.seo : undefined,
    canonicalUrl: b.canonical_url ?? b.canonicalUrl ?? '',
    ogTitle: b.og_title ?? b.ogTitle ?? '',
    ogDescription: b.og_description ?? b.ogDescription ?? '',
    ogImage: b.og_image ?? b.ogImage ?? '',
    updatedAt: b.updated_at ?? b.updatedAt ?? '',
  };
}

/** Explicit column list for the `blogs` table (never send unknown keys to PostgREST). */
export function mapBlogToSnakeCase(body: Record<string, any>): Record<string, any> {
  const seo = body.seo && typeof body.seo === 'object' && !Array.isArray(body.seo) ? body.seo : null;
  const row: Record<string, any> = {
    id: String(body.id),
    slug: body.slug,
    title: body.title || '',
    excerpt: body.excerpt ?? '',
    content: body.content ?? '',
    category: body.category ?? 'Admission Guide',
    author: body.author ?? 'Direct2Campus Editorial Team',
    date: body.date ?? '',
    read_time: body.readTime ?? body.read_time ?? '5 min read',
    image_url: body.imageUrl ?? body.image_url ?? '',
    tags: Array.isArray(body.tags) ? body.tags : [],
    published: body.published !== false,
    seo_title: body.seoTitle ?? body.seo_title ?? '',
    meta_description: body.metaDescription ?? body.meta_description ?? '',
    seo,
    // These columns mirror the SEO block so they can be filtered in SQL; the SEO block is the source of truth.
    canonical_url: seo?.canonical || null,
    og_title: seo?.og?.title || null,
    og_description: seo?.og?.description || null,
    og_image: seo?.og?.image || null,
    updated_at: body.updatedAt ?? body.updated_at ?? new Date().toISOString(),
  };
  return row;
}

function isTableMissingError(err: any): boolean {
  if (!err) return false;
  const msg = String(err.message || '');
  return (
    err.code === 'PGRST205' ||
    err.code === '42P01' ||
    /could not find the table|relation .* does not exist|schema cache/i.test(msg)
  );
}

// ----------------------------------------------------------------------
// Legacy Supabase backup row (used only while the `blogs` table does not exist yet)
// ----------------------------------------------------------------------
async function fetchBlogsFromSupabaseBackup(): Promise<any[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabaseAdmin
      .from('exams')
      .select('description')
      .eq('id', '__d2c_cms_blogs_store__')
      .maybeSingle();

    if (!error && data && data.description) {
      const parsed = JSON.parse(data.description);
      if (Array.isArray(parsed)) {
        return parsed.map(mapBlogToCamelCase);
      }
    }
  } catch {
    // Ignore backup fetch error
  }
  return [];
}

async function saveBlogsToSupabaseBackup(blogsList: any[]): Promise<void> {
  const { error } = await supabaseAdmin
    .from('exams')
    .upsert({
      id: '__d2c_cms_blogs_store__',
      slug: '__d2c_cms_blogs_store__',
      name: '__d2c_cms_blogs_store__',
      description: JSON.stringify(blogsList)
    }, { onConflict: 'id' });
  if (error) throw new Error(`Could not save blog: ${error.message}`);
}

export function matchesBlog(b: any, identifier: string): boolean {
  if (!b || !identifier) return false;
  const raw = String(identifier).trim().replace(/^\/+|\/+$/g, '');
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw).trim().replace(/^\/+|\/+$/g, '');
  } catch {
    // ignore
  }

  const lower = decoded.toLowerCase();
  const rawLower = raw.toLowerCase();
  const cleanSlug = lower.replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-');
  const stripped = lower.replace(/[-_\s/]/g, '');

  const bId = String(b.id || '').trim().toLowerCase();
  const bSlug = String(b.slug || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  const bSlugStripped = bSlug.replace(/[-_\s/]/g, '');

  return (
    bId === lower ||
    bSlug === lower ||
    bId === rawLower ||
    bSlug === rawLower ||
    bSlug === cleanSlug ||
    (bSlugStripped.length > 0 && bSlugStripped === stripped)
  );
}

function exactBlogMatch(b: any, identifier: string): boolean {
  const raw = String(identifier || '').trim();
  let decoded = raw;
  try { decoded = decodeURIComponent(raw).trim(); } catch {}
  const id = String(b?.id ?? '');
  const slug = String(b?.slug ?? '');
  return id === raw || slug === raw || id === decoded || slug === decoded;
}

function blogTime(b: any): number {
  const t = Date.parse(String(b?.date || ''));
  return Number.isNaN(t) ? 0 : t;
}

/** Stored rows (tombstones included) from whichever persistent store is active. */
async function loadStoredBlogs(): Promise<any[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin.from('blogs').select('*');
      if (!error && Array.isArray(data)) return data.map(mapBlogToCamelCase);
      if (error && !isTableMissingError(error)) console.warn('Supabase blogs query failed:', error.message);
    } catch (err) {
      console.warn('Supabase blogs query failed:', err);
    }
    return fetchBlogsFromSupabaseBackup();
  }
  const store = initLocalStore();
  return (store.blogs || []).map(mapBlogToCamelCase);
}

/** Bundled blogs overlaid by stored rows; tombstoned blogs removed. */
function layerBlogs(stored: any[]): any[] {
  const byId = new Map<string, any>();
  const bySlug = new Map<string, any>();
  for (const r of stored) {
    if (r.id) byId.set(String(r.id), r);
    if (r.slug) bySlug.set(String(r.slug), r);
  }
  const used = new Set<any>();
  const out: any[] = [];
  for (const raw of staticBlogs as any[]) {
    const b = mapBlogToCamelCase(raw);
    const row = byId.get(String(b.id)) || bySlug.get(String(b.slug));
    if (row) {
      used.add(row);
      if (!isBlogTombstone(row)) out.push(row);
    } else {
      out.push(b);
    }
  }
  const extra = stored.filter(r => !used.has(r) && !isBlogTombstone(r));
  extra.sort((a, b) => blogTime(b) - blogTime(a));
  return [...out, ...extra];
}

export async function getAllBlogs(): Promise<any[]> {
  const now = Date.now();
  if (blogsCache && now - blogsCache.timestamp < CMS_CACHE_TTL) {
    return blogsCache.data;
  }
  const result = layerBlogs(await loadStoredBlogs());
  blogsCache = { data: result, timestamp: now };
  return result;
}

export async function getBlogByIdOrSlug(identifier: string): Promise<any | null> {
  if (!identifier) return null;
  const list = await getAllBlogs();
  const found = list.find(b => exactBlogMatch(b, identifier)) || list.find(b => matchesBlog(b, identifier));
  return found ? mapBlogToCamelCase(found) : null;
}

function slugifyBlog(raw: string): string {
  return String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/^\/?blog\//, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

/** A tombstone from another id may hold the slug (unique column): remove it so the slug can be reused. */
async function freeTombstoneSlug(slug: string, ownId: string): Promise<void> {
  const { data, error } = await supabaseAdmin.from('blogs').select('id, seo').eq('slug', slug).neq('id', ownId).maybeSingle();
  if (error || !data) return;
  if (isBlogTombstone(data)) {
    await supabaseAdmin.from('blogs').delete().eq('id', data.id);
  }
}

export async function saveBlog(data: any): Promise<any> {
  clearCmsMemoryCache(); // Invalidate cache immediately on edit
  const slug = slugifyBlog(data.slug || data.title) || `article-${Date.now()}`;
  const blogId = data.id ? String(data.id) : slug;

  const existing = await getBlogByIdOrSlug(blogId);
  const seo = data.seo && typeof data.seo === 'object' && !Array.isArray(data.seo)
    ? (() => { const { deleted: _deleted, ...rest } = data.seo; return rest; })()
    : undefined;

  const camelPayload = mapBlogToCamelCase({
    ...data,
    id: blogId,
    slug,
    seo,
    date: data.date || existing?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    updatedAt: new Date().toISOString()
  });

  if (isSupabaseConfigured) {
    await freeTombstoneSlug(slug, blogId);
    const { error } = await supabaseAdmin
      .from('blogs')
      .upsert(mapBlogToSnakeCase(camelPayload), { onConflict: 'id' });
    if (error) {
      if (!isTableMissingError(error)) throw new Error(`Could not save blog: ${error.message}`);
      // The blogs table has not been created yet: keep the legacy backup row working.
      const list = await fetchBlogsFromSupabaseBackup();
      const idx = list.findIndex(b => String(b.id) === blogId);
      if (idx >= 0) list[idx] = camelPayload; else list.unshift(camelPayload);
      await saveBlogsToSupabaseBackup(list);
    }
  } else {
    const store = initLocalStore();
    if (!store.blogs) store.blogs = [];
    const idx = store.blogs.findIndex(b => String(b.id) === blogId);
    if (idx >= 0) store.blogs[idx] = camelPayload; else store.blogs.unshift(camelPayload);
    persistLocalStore(store);
  }

  clearCmsMemoryCache();
  return camelPayload;
}

/** Stores the new SeoFields block of a blog without touching its other fields. */
export async function saveBlogSeoMeta(idOrSlug: string, meta: SeoFields): Promise<any> {
  const blog = await getBlogByIdOrSlug(idOrSlug);
  if (!blog) throw new Error('Blog not found');
  // The blog's seo block also carries non-SEO helpers (imageAlt); keep them when replacing the SEO fields.
  const next: Record<string, any> = { ...normalizeSeo(meta) };
  if (blog.seo && typeof blog.seo.imageAlt === 'string' && blog.seo.imageAlt) next.imageAlt = blog.seo.imageAlt;
  return saveBlog({ ...blog, seo: Object.keys(next).length ? next : undefined });
}

export async function deleteBlog(id: string): Promise<boolean> {
  clearCmsMemoryCache(); // Invalidate cache immediately on delete
  const target = String(id).trim();
  const bundled = (staticBlogs as any[]).find(b => exactBlogMatch(b, target)) || (staticBlogs as any[]).find(b => matchesBlog(b, target));

  const tombstone = bundled
    ? mapBlogToCamelCase({
        id: String(bundled.id),
        slug: bundled.slug,
        title: bundled.title,
        published: false,
        seo: { deleted: true },
        updatedAt: new Date().toISOString(),
      })
    : null;

  if (isSupabaseConfigured) {
    const removeRows = async () => {
      for (const col of ['id', 'slug'] as const) {
        const { error } = await supabaseAdmin.from('blogs').delete().eq(col, target);
        if (error) throw error;
      }
      if (bundled) {
        // Remove a row that replaced the bundled blog under a changed slug, then write the tombstone.
        const { error } = await supabaseAdmin.from('blogs').delete().eq('id', String(bundled.id));
        if (error) throw error;
        const { error: slugErr } = await supabaseAdmin.from('blogs').delete().eq('slug', bundled.slug);
        if (slugErr) throw slugErr;
      }
    };
    try {
      await removeRows();
      if (tombstone) {
        const { error } = await supabaseAdmin.from('blogs').upsert(mapBlogToSnakeCase(tombstone), { onConflict: 'id' });
        if (error) throw error;
      }
    } catch (err: any) {
      if (!isTableMissingError(err)) throw new Error(`Could not delete blog: ${err?.message || err}`);
      const list = (await fetchBlogsFromSupabaseBackup()).filter(b => !exactBlogMatch(b, target) && !(bundled && String(b.id) === String(bundled.id)));
      if (tombstone) list.unshift(tombstone);
      await saveBlogsToSupabaseBackup(list);
    }
  } else {
    const store = initLocalStore();
    const list = (store.blogs || []).filter(b => !exactBlogMatch(b, target) && !(bundled && String(b.id) === String(bundled.id)));
    if (tombstone) list.unshift(tombstone);
    store.blogs = list;
    persistLocalStore(store);
  }

  clearCmsMemoryCache();
  return true;
}
