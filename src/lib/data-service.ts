import fs from 'fs';
import path from 'path';
import { colleges as staticColleges, exams as staticExams, College, Exam } from './data';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';
import { sortCollegesWithIEMFirst } from './iem-priority';

export { sortCollegesWithIEMFirst } from './iem-priority';

// Persistent local file paths for storing admin edits when Supabase is not connected
const LOCAL_STORE_FILE = path.join(process.cwd(), 'src', 'data', 'local-cms-data.json');
const TMP_STORE_FILE = path.join('/tmp', 'd2c-local-cms-data.json');

interface LocalCmsData {
  colleges: any[];
  exams: any[];
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
    return;
  } catch {
    // Expected to fail on read-only serverless filesystems (e.g. Vercel)
  }

  // Fallback to /tmp write in serverless containers
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
  return {
    ...c,
    imageUrl: c.image_url ?? c.imageUrl,
    logoUrl: c.logo_url ?? c.logoUrl,
    coverUrl: c.cover_url ?? c.coverUrl,
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
    seo: c.contact?.seo || c.seo || {},
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

  if (body.seo) {
    result.contact = {
      ...(result.contact || {}),
      seo: body.seo
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
// High-Level Data Service Methods (Automatic Supabase + Local Fallback)
// ----------------------------------------------------------------------

export async function getAllColleges(): Promise<any[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('colleges')
        .select('*')
        .order('name');
      if (!error && data && data.length > 0) {
        return sortCollegesWithIEMFirst(data.map(mapCollegeToCamelCase));
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local cms store:", err);
    }
  }

  const store = initLocalStore();
  return sortCollegesWithIEMFirst(store.colleges.map(mapCollegeToCamelCase));
}

export async function getCollegeByIdOrSlug(identifier: string): Promise<any | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('colleges')
        .select('*')
        .or(`id.eq.${identifier},slug.eq.${identifier}`)
        .maybeSingle();

      if (!error && data) {
        return mapCollegeToCamelCase(data);
      }
    } catch (err) {
      console.warn("Supabase query failed for college, checking local store:", err);
    }
  }

  const store = initLocalStore();
  const found = store.colleges.find(c => c.id === identifier || c.slug === identifier);
  return found ? mapCollegeToCamelCase(found) : null;
}

export async function saveCollege(data: any): Promise<any> {
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
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('exams')
        .select('*')
        .order('name');
      if (!error && data && data.length > 0) {
        return data.map(mapExamToCamelCase);
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local cms store:", err);
    }
  }

  const store = initLocalStore();
  return store.exams.map(mapExamToCamelCase);
}

export async function getExamByIdOrSlug(identifier: string): Promise<any | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('exams')
        .select('*')
        .or(`id.eq.${identifier},slug.eq.${identifier}`)
        .maybeSingle();

      if (!error && data) {
        return mapExamToCamelCase(data);
      }
    } catch (err) {
      console.warn("Supabase query failed for exam, checking local store:", err);
    }
  }

  const store = initLocalStore();
  const found = store.exams.find(e => e.id === identifier || e.slug === identifier);
  return found ? mapExamToCamelCase(found) : null;
}

export async function saveExam(data: any): Promise<any> {
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
