import fs from 'fs';
import path from 'path';
import { colleges as staticColleges, exams as staticExams, College, Exam } from './data';
import staticBlogs from '@/data/blog.json';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';
import { sortCollegesWithIEMFirst, isIEMCollege } from './iem-priority';

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
        const blogMap = new Map<string, any>();
        for (const b of staticBlogs) {
          blogMap.set(String(b.id || b.slug), b);
        }
        if (Array.isArray(parsed.blogs)) {
          for (const b of parsed.blogs) {
            blogMap.set(String(b.id || b.slug), b);
          }
        }
        parsed.blogs = Array.from(blogMap.values());
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
        const blogMap = new Map<string, any>();
        for (const b of staticBlogs) {
          blogMap.set(String(b.id || b.slug), b);
        }
        if (Array.isArray(parsed.blogs)) {
          for (const b of parsed.blogs) {
            blogMap.set(String(b.id || b.slug), b);
          }
        }
        parsed.blogs = Array.from(blogMap.values());
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
    blogs: [...staticBlogs],
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
const CMS_CACHE_TTL = 60 * 1000; // 60 seconds TTL

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
  collegesCache = null; // Invalidate cache immediately on edit
  const snakeData = mapCollegeToSnakeCase(data);
  const collegeId = snakeData.id || snakeData.slug || `college_${Date.now()}`;
  snakeData.id = collegeId;

  if (isSupabaseConfigured) {
    try {
      const { data: saved, error } = await supabaseAdmin
        .from('colleges')
        .upsert(snakeData, { onConflict: 'id' })
        .select()
        .single();

      if (!error && saved) {
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
    } catch (err) {
      console.warn("Supabase upsert failed, saving to local store:", err);
    }
  }

  // Local store save
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
  collegesCache = null; // Invalidate cache immediately on delete
  if (isSupabaseConfigured) {
    try {
      await supabaseAdmin.from('colleges').delete().eq('id', id);
    } catch (err) {
      console.warn("Supabase delete error:", err);
    }
  }

  const store = initLocalStore();
  const initialLength = store.colleges.length;
  store.colleges = store.colleges.filter(c => c.id !== id && c.slug !== id);
  if (store.colleges.length !== initialLength) {
    persistLocalStore(store);
  }
  return true;
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
  examsCache = null; // Invalidate cache immediately on edit
  const snakeData = mapExamToSnakeCase(data);
  const examId = snakeData.id || snakeData.slug || `exam_${Date.now()}`;
  snakeData.id = examId;

  if (isSupabaseConfigured) {
    try {
      const { data: saved, error } = await supabaseAdmin
        .from('exams')
        .upsert(snakeData, { onConflict: 'id' })
        .select()
        .single();

      if (!error && saved) {
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
    } catch (err) {
      console.warn("Supabase upsert failed, saving to local store:", err);
    }
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
  examsCache = null; // Invalidate cache immediately on delete
  if (isSupabaseConfigured) {
    try {
      await supabaseAdmin.from('exams').delete().eq('id', id);
    } catch (err) {
      console.warn("Supabase delete exam error:", err);
    }
  }

  const store = initLocalStore();
  const initialLength = store.exams.length;
  store.exams = store.exams.filter(e => e.id !== id && e.slug !== id);
  if (store.exams.length !== initialLength) {
    persistLocalStore(store);
  }
  return true;
}

// ----------------------------------------------------------------------
// Blogs CRUD Methods & Mappers
// ----------------------------------------------------------------------

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
    date: b.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: b.read_time ?? b.readTime ?? '5 min read',
    imageUrl: b.image_url ?? b.imageUrl ?? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    tags: Array.isArray(b.tags) ? b.tags : [],
    published: b.published !== false,
    seoTitle: b.seo_title ?? b.seoTitle ?? b.title ?? '',
    metaDescription: b.meta_description ?? b.metaDescription ?? b.excerpt ?? '',
    updatedAt: b.updated_at ?? b.updatedAt ?? new Date().toISOString()
  };
}

export function mapBlogToSnakeCase(body: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  const keyMap: Record<string, string> = {
    readTime: 'read_time',
    imageUrl: 'image_url',
    seoTitle: 'seo_title',
    metaDescription: 'meta_description',
    updatedAt: 'updated_at'
  };

  for (const [key, value] of Object.entries(body)) {
    const targetKey = keyMap[key] || key;
    result[targetKey] = value;
  }

  return result;
}

// ----------------------------------------------------------------------
// Supabase Persistent Backup Store & Helpers
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

async function saveBlogsToSupabaseBackup(blogsList: any[]): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    await supabaseAdmin
      .from('exams')
      .upsert({
        id: '__d2c_cms_blogs_store__',
        slug: '__d2c_cms_blogs_store__',
        name: '__d2c_cms_blogs_store__',
        description: JSON.stringify(blogsList)
      }, { onConflict: 'id' });
    return true;
  } catch (err) {
    console.warn("Could not save to __d2c_cms_blogs_store__ in Supabase:", err);
    return false;
  }
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

export async function getAllBlogs(): Promise<any[]> {
  const now = Date.now();
  if (blogsCache && now - blogsCache.timestamp < CMS_CACHE_TTL) {
    return blogsCache.data;
  }

  const store = initLocalStore();
  const localList = (store.blogs || []).map(mapBlogToCamelCase);
  const blogMap = new Map<string, any>();

  // 1. Add static blogs first
  for (const b of staticBlogs) {
    const mapped = mapBlogToCamelCase(b);
    if (mapped.slug) blogMap.set(mapped.slug, mapped);
    if (mapped.id) blogMap.set(String(mapped.id), mapped);
  }

  // 2. Add local store blogs
  for (const b of localList) {
    if (b.slug) blogMap.set(b.slug, b);
    if (b.id) blogMap.set(String(b.id), b);
  }

  // 3. Add Supabase blogs (check native table and persistent backup)
  if (isSupabaseConfigured) {
    let nativeLoaded = false;
    try {
      const { data, error } = await supabaseAdmin
        .from('blogs')
        .select('*')
        .order('date', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        nativeLoaded = true;
        for (const item of data) {
          const mapped = mapBlogToCamelCase(item);
          blogMap.set(mapped.slug || mapped.id, mapped);
        }
      }
    } catch {
      nativeLoaded = false;
    }

    if (!nativeLoaded) {
      const backupBlogs = await fetchBlogsFromSupabaseBackup();
      for (const item of backupBlogs) {
        blogMap.set(item.slug || item.id, item);
      }
    }
  }

  const result = Array.from(new Set(blogMap.values()));
  blogsCache = { data: result, timestamp: now };
  return result;
}

export async function getBlogByIdOrSlug(identifier: string): Promise<any | null> {
  if (!identifier) return null;

  // 1. Check memory cache
  if (blogsCache && Date.now() - blogsCache.timestamp < CMS_CACHE_TTL) {
    const cached = blogsCache.data.find(b => matchesBlog(b, identifier));
    if (cached) return mapBlogToCamelCase(cached);
  }

  // 2. Check local store
  const store = initLocalStore();
  const foundLocal = (store.blogs || []).find(b => matchesBlog(b, identifier));
  if (foundLocal) {
    return mapBlogToCamelCase(foundLocal);
  }

  // 3. Check Supabase (safe lookup)
  if (isSupabaseConfigured) {
    const raw = String(identifier).trim();
    let decoded = raw;
    try { decoded = decodeURIComponent(raw).trim(); } catch {}

    try {
      const { data: slugData } = await supabaseAdmin
        .from('blogs')
        .select('*')
        .or(`slug.eq.${decoded},slug.eq.${raw},id.eq.${decoded},id.eq.${raw}`)
        .maybeSingle();

      if (slugData) {
        return mapBlogToCamelCase(slugData);
      }
    } catch {
      // Native query failed or table not found
    }

    // Check backup store in Supabase
    const backupBlogs = await fetchBlogsFromSupabaseBackup();
    const foundBackup = backupBlogs.find(b => matchesBlog(b, identifier));
    if (foundBackup) {
      return mapBlogToCamelCase(foundBackup);
    }
  }

  // 4. Fallback to static blogs
  const foundStatic = staticBlogs.find(b => matchesBlog(b, identifier));
  return foundStatic ? mapBlogToCamelCase(foundStatic) : null;
}

export async function saveBlog(data: any): Promise<any> {
  blogsCache = null; // Invalidate cache immediately on edit
  const rawSlug = String(data.slug || data.title || '')
    .trim()
    .toLowerCase()
    .replace(/^\/?blog\//, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
  const slug = rawSlug || `article-${Date.now()}`;
  const blogId = data.id ? String(data.id) : (slug || `blog_${Date.now()}`);

  const camelPayload = mapBlogToCamelCase({
    ...data,
    id: blogId,
    slug,
    updatedAt: new Date().toISOString()
  });

  const snakePayload = mapBlogToSnakeCase(camelPayload);

  // 1. Update Supabase if configured
  if (isSupabaseConfigured) {
    try {
      await supabaseAdmin
        .from('blogs')
        .upsert(snakePayload, { onConflict: 'id' });
    } catch (err) {
      console.warn("Supabase native blogs upsert error:", err);
    }

    // Also update Supabase backup store (__d2c_cms_blogs_store__)
    try {
      const backupList = await fetchBlogsFromSupabaseBackup();
      const store = initLocalStore();
      const existingList = backupList.length > 0 ? backupList : (store.blogs || [...staticBlogs]);
      const idx = existingList.findIndex(b => matchesBlog(b, blogId) || matchesBlog(b, slug));
      if (idx >= 0) {
        existingList[idx] = camelPayload;
      } else {
        existingList.unshift(camelPayload);
      }
      await saveBlogsToSupabaseBackup(existingList);
    } catch (err) {
      console.warn("Failed to backup blog in Supabase:", err);
    }
  }

  // 2. Persist to local store
  const store = initLocalStore();
  if (!store.blogs) store.blogs = [];
  const idx = store.blogs.findIndex(b => matchesBlog(b, blogId) || matchesBlog(b, slug));
  if (idx >= 0) {
    store.blogs[idx] = camelPayload;
  } else {
    store.blogs.unshift(camelPayload);
  }
  persistLocalStore(store);

  // 3. Sync to src/data/blog.json if writable
  try {
    const blogJsonPath = path.join(process.cwd(), 'src', 'data', 'blog.json');
    if (fs.existsSync(blogJsonPath)) {
      fs.writeFileSync(blogJsonPath, JSON.stringify(store.blogs, null, 2), 'utf-8');
    }
  } catch {}

  return camelPayload;
}

export async function deleteBlog(id: string): Promise<boolean> {
  blogsCache = null; // Invalidate cache immediately on delete
  const target = String(id).trim();

  if (isSupabaseConfigured) {
    try {
      await supabaseAdmin.from('blogs').delete().or(`id.eq.${target},slug.eq.${target}`);
    } catch (err) {
      console.warn("Supabase delete blog error:", err);
    }

    try {
      const backupList = await fetchBlogsFromSupabaseBackup();
      const filtered = backupList.filter(b => !matchesBlog(b, target));
      await saveBlogsToSupabaseBackup(filtered);
    } catch {}
  }

  const store = initLocalStore();
  if (store.blogs) {
    const initialLength = store.blogs.length;
    store.blogs = store.blogs.filter(b => !matchesBlog(b, target));
    if (store.blogs.length !== initialLength) {
      persistLocalStore(store);
    }
  }

  try {
    const blogJsonPath = path.join(process.cwd(), 'src', 'data', 'blog.json');
    if (fs.existsSync(blogJsonPath) && store.blogs) {
      fs.writeFileSync(blogJsonPath, JSON.stringify(store.blogs, null, 2), 'utf-8');
    }
  } catch {}

  return true;
}

