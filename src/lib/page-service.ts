import fs from 'fs';
import path from 'path';
import defaultPagesData from '@/data/pages-cms-data.json';

const PAGES_FILE = path.join(process.cwd(), 'src', 'data', 'pages-cms-data.json');
const TMP_PAGES_FILE = path.join('/tmp', 'd2c-pages-cms-data.json');

declare global {
  // eslint-disable-next-line no-var
  var __d2c_pages_store__: Record<string, any> | undefined;
}

function initPagesStore(): Record<string, any> {
  if (globalThis.__d2c_pages_store__) {
    return globalThis.__d2c_pages_store__;
  }

  // 1. Try reading from /tmp (serverless)
  try {
    if (fs.existsSync(TMP_PAGES_FILE)) {
      const content = fs.readFileSync(TMP_PAGES_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed.pages) {
        globalThis.__d2c_pages_store__ = parsed.pages;
        return parsed.pages;
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
        globalThis.__d2c_pages_store__ = parsed.pages;
        return parsed.pages;
      }
    }
  } catch {
    // Ignore
  }

  // 3. Fallback to default
  const initial = (defaultPagesData as any).pages || {};
  globalThis.__d2c_pages_store__ = initial;
  return initial;
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
  const store = initPagesStore();
  const page = store[slug];
  if (page) return page;

  // If not found in store, fallback to default import
  const defaults = (defaultPagesData as any).pages || {};
  return defaults[slug] || null;
}

export async function savePageData(slug: string, data: any): Promise<any> {
  const store = initPagesStore();
  store[slug] = {
    ...store[slug],
    ...data,
    slug,
    updatedAt: new Date().toISOString(),
  };
  persistPagesStore(store);
  return store[slug];
}

export async function getAllPages(): Promise<any[]> {
  const store = initPagesStore();
  return Object.values(store);
}
