import fs from 'fs';
import path from 'path';
import defaultPagesData from '@/data/pages-cms-data.json';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';

// Custom pages ("WordPress-style" landing pages served by src/app/[slug]).
//
// Resolution order (highest priority first):
//   1. Supabase copy   the JSON map kept in the description column of the `exams` row
//                      `__d2c_cms_pages_store__` (existing storage; live custom pages live there)
//   2. local store     dev only: /tmp or src/data file, used when Supabase is not configured
//   3. bundled         src/data/pages-cms-data.json defaults
// Deleting a page that also exists in the bundled defaults stores a tombstone ({ deleted: true })
// in the Supabase copy so the bundled page does not come back.

const PAGES_FILE = path.join(process.cwd(), 'src', 'data', 'pages-cms-data.json');
const TMP_PAGES_FILE = path.join('/tmp', 'd2c-pages-cms-data.json');
const CLOUD_ROW_ID = '__d2c_cms_pages_store__';
const CLOUD_TTL_MS = 10_000;

declare global {
  // eslint-disable-next-line no-var
  var __d2c_pages_store__: Record<string, any> | undefined;
  // eslint-disable-next-line no-var
  var __d2c_pages_cloud__: { at: number; pages: Record<string, any> } | undefined;
}

export const CORE_PAGE_SLUGS = ['home', 'about', 'contact', 'mba', 'privacy', 'terms'];

/** Landing pages that moved to the content CMS (`/admin/content/<key>`) and static routes. */
export const IEM_PAGE_CONTENT_KEYS: Record<string, string> = {
  'btech-direct-admission-in-iem-kolkata': 'iem-btech',
  'direct-admission-in-iem-kolkata': 'iem-hub',
  'iem-kolkata-cse-direct-admission': 'iem-cse',
  'iem-kolkata-cse-ai-ml-direct-admission': 'iem-cse-ai-ml',
  'iem-kolkata-ece-direct-admission': 'iem-ece',
  'iem-kolkata-it-direct-admission': 'iem-it',
  'iem-kolkata-electrical-engineering-direct-admission': 'iem-electrical',
  'iem-kolkata-mechanical-engineering-direct-admission': 'iem-mechanical',
};

/** New public URL of each IEM landing page (the old direct-admission URLs redirect here). */
export const IEM_PAGE_PUBLIC_PATHS: Record<string, string> = {
  'btech-direct-admission-in-iem-kolkata': '/btech-admission-in-iem-kolkata',
  'direct-admission-in-iem-kolkata': '/admission-in-iem-kolkata',
  'iem-kolkata-cse-direct-admission': '/iem-kolkata-cse-admission',
  'iem-kolkata-cse-ai-ml-direct-admission': '/iem-kolkata-cse-ai-ml-admission',
  'iem-kolkata-ece-direct-admission': '/iem-kolkata-ece-admission',
  'iem-kolkata-it-direct-admission': '/iem-kolkata-it-admission',
  'iem-kolkata-electrical-engineering-direct-admission': '/iem-kolkata-electrical-engineering-admission',
  'iem-kolkata-mechanical-engineering-direct-admission': '/iem-kolkata-mechanical-engineering-admission',
};

const CORE_CONTENT_KEYS: Record<string, string> = Object.fromEntries(CORE_PAGE_SLUGS.map((s) => [s, s]));

export function isCorePage(slug: string): boolean {
  return CORE_PAGE_SLUGS.includes(normalizePageSlug(slug));
}

/** True for the IEM landing pages that must never render through the generic [slug] route. */
export function isIemManagedPage(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(IEM_PAGE_CONTENT_KEYS, normalizePageSlug(slug));
}

/** Content document key that now owns this page (core pages and IEM landing pages), or null. */
export function getManagedContentKey(slug: string): string | null {
  const s = normalizePageSlug(slug);
  if (Object.prototype.hasOwnProperty.call(IEM_PAGE_CONTENT_KEYS, s)) return IEM_PAGE_CONTENT_KEYS[s];
  if (Object.prototype.hasOwnProperty.call(CORE_CONTENT_KEYS, s)) return CORE_CONTENT_KEYS[s];
  return null;
}

/** Public path of a managed page (core pages live at /<slug>, home at /). */
export function getManagedPublicPath(slug: string): string {
  const s = normalizePageSlug(slug);
  if (Object.prototype.hasOwnProperty.call(IEM_PAGE_PUBLIC_PATHS, s)) return IEM_PAGE_PUBLIC_PATHS[s];
  return s === 'home' ? '/' : `/${s}`;
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

function isTombstone(p: any): boolean {
  return !!p && typeof p === 'object' && p.deleted === true;
}

function bundledPages(): Record<string, any> {
  return ((defaultPagesData as any).pages || {}) as Record<string, any>;
}

// ----------------------------------------------------------------------
// Supabase copy
// ----------------------------------------------------------------------
async function fetchCloudPages(force = false): Promise<Record<string, any> | null> {
  if (!isSupabaseConfigured) return null;
  const cached = globalThis.__d2c_pages_cloud__;
  if (!force && cached && Date.now() - cached.at < CLOUD_TTL_MS) return cached.pages;
  try {
    const { data, error } = await supabaseAdmin
      .from('exams')
      .select('description')
      .eq('id', CLOUD_ROW_ID)
      .maybeSingle();
    if (error) {
      console.warn('Could not read custom pages from Supabase:', error.message);
      return cached ? cached.pages : null;
    }
    let pages: Record<string, any> = {};
    if (data && data.description) {
      const parsed = JSON.parse(data.description);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) pages = parsed;
    }
    globalThis.__d2c_pages_cloud__ = { at: Date.now(), pages };
    return pages;
  } catch (err) {
    console.warn('Could not read custom pages from Supabase:', err);
    return cached ? cached.pages : null;
  }
}

async function writeCloudPages(pagesRecord: Record<string, any>): Promise<void> {
  const { error } = await supabaseAdmin
    .from('exams')
    .upsert(
      {
        id: CLOUD_ROW_ID,
        slug: CLOUD_ROW_ID,
        name: CLOUD_ROW_ID,
        description: JSON.stringify(pagesRecord),
      },
      { onConflict: 'id' },
    );
  if (error) throw new Error(`Could not save page to Supabase: ${error.message}`);
  globalThis.__d2c_pages_cloud__ = { at: Date.now(), pages: pagesRecord };
}

/** Drops this instance's page caches (call after every admin write). */
export function clearPagesCache(): void {
  globalThis.__d2c_pages_cloud__ = undefined;
}

// ----------------------------------------------------------------------
// Local store (development without Supabase)
// ----------------------------------------------------------------------
function initLocalPagesStore(): Record<string, any> {
  if (globalThis.__d2c_pages_store__) return globalThis.__d2c_pages_store__;

  const defaults = bundledPages();
  for (const file of [TMP_PAGES_FILE, PAGES_FILE]) {
    try {
      if (fs.existsSync(file)) {
        const parsed = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (parsed.pages) {
          const merged = { ...defaults, ...parsed.pages };
          globalThis.__d2c_pages_store__ = merged;
          return merged;
        }
      }
    } catch {
      // try the next location
    }
  }

  const fallback = { ...defaults };
  globalThis.__d2c_pages_store__ = fallback;
  return fallback;
}

function persistLocalPagesStore(pages: Record<string, any>) {
  globalThis.__d2c_pages_store__ = pages;
  const payload = JSON.stringify({ pages, updatedAt: new Date().toISOString() }, null, 2);

  try {
    const dir = path.dirname(PAGES_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PAGES_FILE, payload, 'utf-8');
  } catch {
    // read-only filesystem
  }
  try {
    fs.writeFileSync(TMP_PAGES_FILE, payload, 'utf-8');
  } catch {
    // ignore
  }
}

/** Every page by slug: bundled, then local store (no Supabase), then the Supabase copy. Tombstones removed. */
async function resolveAllPages(): Promise<Record<string, any>> {
  const out: Record<string, any> = {};
  const apply = (source: Record<string, any>) => {
    for (const [key, val] of Object.entries(source)) {
      if (!val || typeof val !== 'object') continue;
      const k = key.toLowerCase();
      if (isTombstone(val)) delete out[k];
      else out[k] = { ...val, slug: (val as any).slug || key };
    }
  };
  apply(bundledPages());
  if (isSupabaseConfigured) {
    const cloud = await fetchCloudPages();
    if (cloud) apply(cloud);
    else apply(initLocalPagesStore()); // Supabase unreachable: best effort from this instance
  } else {
    apply(initLocalPagesStore());
  }
  return out;
}

export async function getPageData(slug: string): Promise<any | null> {
  if (!slug) return null;
  const raw = String(slug).trim().replace(/^\/+|\/+$/g, '');
  const normSlug = normalizePageSlug(raw);
  if (!normSlug) return null;
  // IEM landing pages are served by their own static routes, never by the generic [slug] page.
  if (isIemManagedPage(normSlug)) return null;

  const all = await resolveAllPages();
  if (all[normSlug]) return all[normSlug];
  if (all[raw.toLowerCase()]) return all[raw.toLowerCase()];
  for (const [key, val] of Object.entries(all)) {
    if (key === normSlug || (val && (val as any).slug === normSlug)) return val;
  }
  return null;
}

export async function savePageData(slug: string, data: any): Promise<any> {
  const normalizedSlug = normalizePageSlug(slug || data.slug || data.title || '') || `page-${Date.now()}`;

  const all = await resolveAllPages();
  const existing = all[normalizedSlug] || {};

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
  delete (updatedPage as any).deleted;
  // An empty SEO block is stored as no block at all.
  if (updatedPage.seo && Object.keys(updatedPage.seo).length === 0) delete (updatedPage as any).seo;

  if (isSupabaseConfigured) {
    const cloud = (await fetchCloudPages(true)) || {};
    await writeCloudPages({ ...cloud, [normalizedSlug]: updatedPage });
  } else {
    const store = initLocalPagesStore();
    store[normalizedSlug] = updatedPage;
    persistLocalPagesStore(store);
  }
  return updatedPage;
}

export async function deletePage(slug: string): Promise<boolean> {
  const normalizedSlug = normalizePageSlug(slug);
  if (isCorePage(normalizedSlug)) {
    // Do not delete core system pages
    return false;
  }

  const all = await resolveAllPages();
  if (!all[normalizedSlug]) return false;
  const bundled = !!bundledPages()[normalizedSlug];

  if (isSupabaseConfigured) {
    const cloud = (await fetchCloudPages(true)) || {};
    const next = { ...cloud };
    if (bundled) next[normalizedSlug] = { slug: normalizedSlug, deleted: true };
    else delete next[normalizedSlug];
    await writeCloudPages(next);
  } else {
    const store = initLocalPagesStore();
    if (bundled) store[normalizedSlug] = { slug: normalizedSlug, deleted: true };
    else delete store[normalizedSlug];
    persistLocalPagesStore(store);
  }
  return true;
}

export async function getAllPages(opts: { includeManaged?: boolean } = {}): Promise<any[]> {
  const all = await resolveAllPages();
  const list = Object.values(all);
  // The IEM landing pages are owned by the content CMS; the public sitemap must not list them
  // through the custom-page path. The admin passes includeManaged to show them with a link.
  return opts.includeManaged ? list : list.filter((p: any) => !isIemManagedPage(p.slug || ''));
}
