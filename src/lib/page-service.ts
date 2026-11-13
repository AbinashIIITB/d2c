import fs from 'fs';
import path from 'path';
import defaultPagesData from '@/data/pages-cms-data.json';

const PAGES_FILE = path.join(process.cwd(), 'src', 'data', 'pages-cms-data.json');
const TMP_PAGES_FILE = path.join('/tmp', 'd2c-pages-cms-data.json');

declare global {
  // eslint-disable-next-line no-var
  var __d2c_pages_store__: Record<string, any> | undefined;
}

export const CORE_PAGE_SLUGS = ['home', 'about', 'contact', 'mba', 'privacy', 'terms'];

export function isCorePage(slug: string): boolean {
  return CORE_PAGE_SLUGS.includes(slug.toLowerCase());
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
        // Merge defaults with stored custom pages
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
  globalThis.__d2c_pages_store__ = defaults;
  return defaults;
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
  const normalizedSlug = slug.toLowerCase().trim();
  const store = initPagesStore();
  const page = store[normalizedSlug];
  if (page) return page;

  // If not found in store, fallback to default import
  const defaults = (defaultPagesData as any).pages || {};
  return defaults[normalizedSlug] || null;
}

export async function savePageData(slug: string, data: any): Promise<any> {
  const normalizedSlug = String(slug || data.slug || data.title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-');

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
  return updatedPage;
}

export async function deletePage(slug: string): Promise<boolean> {
  const normalizedSlug = slug.toLowerCase().trim();
  if (isCorePage(normalizedSlug)) {
    // Do not delete core system pages
    return false;
  }

  const store = initPagesStore();
  if (store[normalizedSlug]) {
    delete store[normalizedSlug];
    persistPagesStore(store);
    return true;
  }
  return false;
}

export async function getAllPages(): Promise<any[]> {
  const store = initPagesStore();
  return Object.values(store);
}
