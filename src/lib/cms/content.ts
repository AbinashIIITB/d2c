// Runtime read API for CMS content documents. Server-only (do not import from client components).
// NOTE: `import 'server-only'` is intentionally omitted: the `server-only` package is not in
// package-lock.json. This module imports next/headers and the service-role client, so it cannot be
// bundled for the browser anyway.
import { cache } from 'react';
import { draftMode } from 'next/headers';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getDefinition } from './registry';
import { deepMerge, isPlainObject } from './merge';

interface Row {
  data: Record<string, unknown> | null;
  draft: Record<string, unknown> | null;
}

const TTL_MS = 5_000;
/** After a DB failure (missing table, network) serve defaults for this long without retrying. */
const FAILURE_BACKOFF_MS = 30_000;

// Kept on globalThis so route handlers (which clear it after a save) and pages share one cache
// even when the bundler loads this module more than once in the same server process.
type CacheState = { memory: Map<string, { at: number; row: Row | null }>; failedUntil: number; warned: boolean };
const g = globalThis as typeof globalThis & { __d2cCmsCache?: CacheState };
const state: CacheState = (g.__d2cCmsCache ??= { memory: new Map(), failedUntil: 0, warned: false });
const memory = state.memory;

function warnOnce(message: string, err?: unknown): void {
  if (state.warned) return;
  state.warned = true;
  console.warn(`[cms] ${message}; serving built-in defaults.`, err ?? '');
}

/** Drops the per-instance cache. Called by store.ts after every write. */
export function clearContentCache(key?: string): void {
  if (key) memory.delete(key);
  else memory.clear();
  state.failedUntil = 0;
}

function toRow(raw: { data?: unknown; draft?: unknown } | undefined): Row | null {
  if (!raw) return null;
  return {
    data: isPlainObject(raw.data) ? raw.data : null,
    draft: isPlainObject(raw.draft) ? raw.draft : null,
  };
}

async function isDraft(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // Outside a request scope (generateStaticParams, sitemap, build).
    return false;
  }
}

async function fetchRows(keys: string[], bypassTtl: boolean): Promise<Map<string, Row | null>> {
  const result = new Map<string, Row | null>();
  if (!isSupabaseConfigured || Date.now() < state.failedUntil) return result;

  const now = Date.now();
  const missing: string[] = [];
  for (const key of keys) {
    const hit = memory.get(key);
    if (!bypassTtl && hit && now - hit.at < TTL_MS) result.set(key, hit.row);
    else missing.push(key);
  }
  if (missing.length === 0) return result;

  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('key, data, draft')
      .in('key', missing);
    if (error) throw error;
    const found = new Map<string, Row | null>();
    for (const r of (data ?? []) as { key: string; data: unknown; draft: unknown }[]) {
      found.set(r.key, toRow(r));
    }
    const at = Date.now();
    for (const key of missing) {
      const row = found.get(key) ?? null;
      memory.set(key, { at, row });
      result.set(key, row);
    }
  } catch (err) {
    state.failedUntil = Date.now() + FAILURE_BACKOFF_MS;
    warnOnce('could not read site_content', err);
  }
  return result;
}

// Per-request dedupe: the argument is a primitive so React cache() matches by value.
const loadRows = cache(async (joinedKeys: string, bypassTtl: boolean) =>
  fetchRows(joinedKeys.split('\n').filter(Boolean), bypassTtl),
);

function resolve(key: string, row: Row | null | undefined, draft: boolean): unknown {
  const def = getDefinition(key);
  if (!def) {
    warnOnce(`unknown content key "${key}"`);
    return {};
  }
  try {
    const stored = draft && row?.draft ? row.draft : (row?.data ?? null);
    return deepMerge(def.defaults, stored);
  } catch (err) {
    warnOnce(`could not merge content "${key}"`, err);
    return def.defaults;
  }
}

/** Defaults deep-merged with the published doc (or the draft when Next draftMode is on). Never throws. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContent<T = any>(key: string): Promise<T> {
  try {
    const draft = await isDraft();
    const rows = await loadRows(key, draft);
    return resolve(key, rows.get(key), draft) as T;
  } catch (err) {
    warnOnce(`getContent("${key}") failed`, err);
    return (getDefinition(key)?.defaults ?? {}) as T;
  }
}

/** Same as getContent for several keys, using a single database round-trip. Never throws. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContents(keys: string[]): Promise<Record<string, any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: Record<string, any> = {};
  const unique = Array.from(new Set(keys));
  let rows = new Map<string, Row | null>();
  let draft = false;
  try {
    draft = await isDraft();
    rows = await loadRows([...unique].sort().join('\n'), draft);
  } catch (err) {
    warnOnce('getContents failed', err);
  }
  for (const key of unique) out[key] = resolve(key, rows.get(key), draft);
  return out;
}
