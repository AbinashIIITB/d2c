import fs from 'fs';
import path from 'path';
import defaultPagesData from '@/data/pages-cms-data.json';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';

const PAGES_FILE = path.join(process.cwd(), 'src', 'data', 'pages-cms-data.json');
const TMP_PAGES_FILE = path.join('/tmp', 'd2c-pages-cms-data.json');

declare global {
  // eslint-disable-next-line no-var
  var __d2c_pages_store__: Record<string, any> | undefined;
}

export const CORE_PAGE_SLUGS = ['home', 'about', 'contact', 'mba', 'privacy', 'terms'];

export function isCorePage(slug: string): boolean {
  return CORE_PAGE_SLUGS.includes(normalizePageSlug(slug));
}

export function normalizePageSlug(raw: string): string {
  if (!raw) return '';
  let decoded = String(raw).trim();
  try {
    decoded = decodeURIComponent(decoded).trim();
  } catch {}

  return decoded
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

// ----------------------------------------------------------------------
// Supabase Persistent Cloud Backup Store for Pages
// ----------------------------------------------------------------------
async function fetchPagesFromSupabaseBackup(): Promise<Record<string, any>> {
  if (!isSupabaseConfigured) return {};
  try {
    const { data, error } = await supabaseAdmin
      .from('exams')
      .select('description')
      .eq('id', '__d2c_cms_pages_store__')
      .maybeSingle();

    if (!error && data && data.description) {
      const parsed = JSON.parse(data.description);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Ignore backup fetch error
  }
  return {};
}

async function savePagesToSupabaseBackup(pagesRecord: Record<string, any>): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    await supabaseAdmin
      .from('exams')
      .upsert({
        id: '__d2c_cms_pages_store__',
        slug: '__d2c_cms_pages_store__',
        name: '__d2c_cms_pages_store__',
        description: JSON.stringify(pagesRecord)
      }, { onConflict: 'id' });
    return true;
  } catch (err) {
    console.warn("Could not save to __d2c_cms_pages_store__ in Supabase:", err);
    return false;
  }
}

function initPagesStore(): Record<string, any> {
  if (globalThis.__d2c_pages_store__) {
    return globalThis.__d2c_pages_store__;
  }

  const defaults = (defaultPagesData as any).pages || {};

  // 1. Try reading from /tmp (serverless)
  try {
    if (fs.existsSync(TMP_PAGES_FILE)) {
      const content = fs.readFileSync(TMP_PAGES_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed.pages) {
        const merged = { ...defaults, ...parsed.pages };
        globalThis.__d2c_pages_store__ = merged;
        return merged;
      }
    }
  } catch {
    // Ignore /tmp error
  }

  // 2. Try reading from local project
  try {
    if (fs.existsSync(PAGES_FILE)) {
      const content = fs.readFileSync(PAGES_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed.pages) {
        const merged = { ...defaults, ...parsed.pages };
        globalThis.__d2c_pages_store__ = merged;
        return merged;
      }
    }
  } catch {
    // Ignore
  }

  // 3. Fallback to default
  const fallback = { ...defaults };
  globalThis.__d2c_pages_store__ = fallback;
  return fallback;
}

function persistPagesStore(pages: Record<string, any>) {
  globalThis.__d2c_pages_store__ = pages;
  const payload = JSON.stringify({ pages, updatedAt: new Date().toISOString() }, null, 2);

  try {
    const dir = path.dirname(PAGES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PAGES_FILE, payload, 'utf-8');
  } catch {
    // Serverless fallback
  }

  try {
    fs.writeFileSync(TMP_PAGES_FILE, payload, 'utf-8');
  } catch {
    // Ignore
  }
}

export async function getPageData(slug: string): Promise<any | null> {
  if (!slug) return null;
  const raw = String(slug).trim().replace(/^\/+|\/+$/g, '');
  const normSlug = normalizePageSlug(raw);

  const store = initPagesStore();
  
  // 1. Direct check in in-memory / local store
  if (store[normSlug]) return store[normSlug];
  if (store[raw.toLowerCase()]) return store[raw.toLowerCase()];

  // 2. Case-insensitive search across store keys
  for (const [key, val] of Object.entries(store)) {
    if (key.toLowerCase() === normSlug || key.toLowerCase() === raw.toLowerCase() || (val && (val as any).slug === normSlug)) {
      return val;
    }
  }

  // 3. Check Supabase cloud store
  if (isSupabaseConfigured) {
    const cloudPages = await fetchPagesFromSupabaseBackup();
    if (cloudPages[normSlug]) {
      store[normSlug] = cloudPages[normSlug];
      return cloudPages[normSlug];
    }
    if (cloudPages[raw.toLowerCase()]) {
      store[raw.toLowerCase()] = cloudPages[raw.toLowerCase()];
      return cloudPages[raw.toLowerCase()];
    }
    for (const [key, val] of Object.entries(cloudPages)) {
      if (key.toLowerCase() === normSlug || key.toLowerCase() === raw.toLowerCase() || (val && (val as any).slug === normSlug)) {
        store[normSlug] = val;
        return val;
      }
    }
  }

  // 4. Fallback to default static JSON data
  const defaults = (defaultPagesData as any).pages || {};
  if (defaults[normSlug]) return defaults[normSlug];
  if (defaults[raw.toLowerCase()]) return defaults[raw.toLowerCase()];

  return null;
}

export async function savePageData(slug: string, data: any): Promise<any> {
  const normalizedSlug = normalizePageSlug(slug || data.slug || data.title || '') || `page-${Date.now()}`;

  const store = initPagesStore();
  const existing = store[normalizedSlug] || {};

  const updatedPage = {
    ...existing,
    ...data,
    slug: normalizedSlug,
    title: data.title || existing.title || normalizedSlug,
    h1: data.h1 || data.heading || data.title || existing.h1 || '',
    includeInSitemap: data.includeInSitemap ?? existing.includeInSitemap ?? true,
    sitemapPriority: Number(data.sitemapPriority || existing.sitemapPriority || 0.8),
    changeFrequency: data.changeFrequency || existing.changeFrequency || 'weekly',
    published: data.published ?? existing.published ?? true,
    updatedAt: new Date().toISOString(),
  };

  store[normalizedSlug] = updatedPage;
  persistPagesStore(store);

  // Sync to Supabase cloud store so all serverless lambdas have immediate access
  if (isSupabaseConfigured) {
    try {
      const cloudPages = await fetchPagesFromSupabaseBackup();
      const merged = { ...store, ...cloudPages, [normalizedSlug]: updatedPage };
      await savePagesToSupabaseBackup(merged);
    } catch (err) {
      console.warn("Failed to backup page to Supabase:", err);
    }
  }

  return updatedPage;
}

export async function deletePage(slug: string): Promise<boolean> {
  const normalizedSlug = normalizePageSlug(slug);
  if (isCorePage(normalizedSlug)) {
    // Do not delete core system pages
    return false;
  }

  const store = initPagesStore();
  let deleted = false;
  if (store[normalizedSlug]) {
    delete store[normalizedSlug];
    deleted = true;
  }

  persistPagesStore(store);

  if (isSupabaseConfigured) {
    try {
      const cloudPages = await fetchPagesFromSupabaseBackup();
      if (cloudPages[normalizedSlug]) {
        delete cloudPages[normalizedSlug];
        await savePagesToSupabaseBackup(cloudPages);
        deleted = true;
      }
    } catch {}
  }

  return deleted;
}

export async function getAllPages(): Promise<any[]> {
  const store = initPagesStore();
  const pagesMap = new Map<string, any>();

  // 1. Defaults first
  const defaults = (defaultPagesData as any).pages || {};
  for (const [key, val] of Object.entries(defaults)) {
    if (val && typeof val === 'object') {
      pagesMap.set(key.toLowerCase(), { ...val, slug: (val as any).slug || key });
    }
  }

  // 2. In-memory / local store
  for (const [key, val] of Object.entries(store)) {
    if (val && typeof val === 'object') {
      pagesMap.set(key.toLowerCase(), { ...val, slug: (val as any).slug || key });
    }
  }

  // 3. Supabase cloud store
  if (isSupabaseConfigured) {
    try {
      const cloudPages = await fetchPagesFromSupabaseBackup();
      for (const [key, val] of Object.entries(cloudPages)) {
        if (val && typeof val === 'object') {
          pagesMap.set(key.toLowerCase(), { ...val, slug: (val as any).slug || key });
        }
      }
    } catch {}
  }

  return Array.from(pagesMap.values());
}
