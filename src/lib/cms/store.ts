// Admin-side persistence for CMS documents. Server-only (service-role Supabase client).
// NOTE: `import 'server-only'` omitted: the package is not in package-lock.json.
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { clearContentCache } from './content';
import { isPlainObject } from './merge';
import type { ContentRecord, ContentVersion } from './types';

export const CMS_TABLE_MISSING_MESSAGE = 'CMS table missing: run supabase/migrations/20261117_cms.sql';
export const MAX_PAYLOAD_BYTES = 2 * 1024 * 1024;

/** Typed error carrying the HTTP status the API should answer with. */
export class CmsStoreError extends Error {
  readonly status: number;
  readonly code: 'table_missing' | 'payload' | 'not_found' | 'unavailable' | 'database';
  constructor(code: CmsStoreError['code'], status: number, message: string) {
    super(message);
    this.name = 'CmsStoreError';
    this.code = code;
    this.status = status;
  }
}

export type CmsData = Record<string, unknown>;

interface DbError {
  code?: string;
  message?: string;
}

function toStoreError(err: unknown): CmsStoreError {
  if (err instanceof CmsStoreError) return err;
  const e = (err ?? {}) as DbError;
  const message = typeof e.message === 'string' ? e.message : 'Database error';
  if (
    e.code === 'PGRST205' ||
    e.code === '42P01' ||
    /site_content/i.test(message)
  ) {
    return new CmsStoreError('table_missing', 503, CMS_TABLE_MISSING_MESSAGE);
  }
  return new CmsStoreError('database', 500, message);
}

function assertReady(): void {
  if (!isSupabaseConfigured) {
    throw new CmsStoreError('unavailable', 503, 'Supabase is not configured on this server');
  }
}

function assertPayload(data: unknown): asserts data is CmsData {
  if (!isPlainObject(data)) {
    throw new CmsStoreError('payload', 400, 'Content must be a JSON object');
  }
  if (Buffer.byteLength(JSON.stringify(data), 'utf8') > MAX_PAYLOAD_BYTES) {
    throw new CmsStoreError('payload', 413, 'Content is larger than 2 MB');
  }
}

function afterWrite(key: string): void {
  clearContentCache(key);
  try {
    revalidatePath('/', 'layout');
  } catch (err) {
    console.warn('[cms] revalidatePath failed', err);
  }
}

interface RawRow {
  key: string;
  data: unknown;
  draft: unknown;
  updated_at: string | null;
  updated_by: string | null;
}

function toRecord(key: string, row: RawRow | null | undefined): ContentRecord {
  return {
    key,
    data: row && isPlainObject(row.data) ? row.data : null,
    draft: row && isPlainObject(row.draft) ? row.draft : null,
    updated_at: row?.updated_at ?? null,
    updated_by: row?.updated_by ?? null,
  };
}

/** All stored rows (used by the admin list). */
export async function listRecords(): Promise<ContentRecord[]> {
  assertReady();
  const { data, error } = await supabaseAdmin
    .from('site_content')
    .select('key, data, draft, updated_at, updated_by');
  if (error) throw toStoreError(error);
  return ((data ?? []) as RawRow[]).map((r) => toRecord(r.key, r));
}

/** The stored record for a key; an empty record when nothing has been saved yet. */
export async function getRecord(key: string): Promise<ContentRecord> {
  assertReady();
  const { data, error } = await supabaseAdmin
    .from('site_content')
    .select('key, data, draft, updated_at, updated_by')
    .eq('key', key)
    .maybeSingle();
  if (error) throw toStoreError(error);
  return toRecord(key, data as RawRow | null);
}

/** Saves an unpublished draft (shown only in admin preview). Published data is untouched. */
export async function saveDraft(key: string, data: unknown, user: string): Promise<ContentRecord> {
  assertReady();
  assertPayload(data);
  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert({ key, draft: data, updated_at: new Date().toISOString(), updated_by: user }, { onConflict: 'key' });
  if (error) throw toStoreError(error);
  afterWrite(key);
  return getRecord(key);
}

/** Publishes `data`, clears the draft and appends a version row. */
export async function publish(key: string, data: unknown, user: string): Promise<ContentRecord> {
  assertReady();
  assertPayload(data);
  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert(
      { key, data, draft: null, updated_at: new Date().toISOString(), updated_by: user },
      { onConflict: 'key' },
    );
  if (error) throw toStoreError(error);
  const { error: vErr } = await supabaseAdmin
    .from('site_content_versions')
    .insert({ key, data, created_by: user });
  if (vErr) {
    // The document is already live; a failed history row must not fail the publish.
    console.warn('[cms] could not append version row', vErr);
  }
  afterWrite(key);
  return getRecord(key);
}

/** Drops the draft. */
export async function discardDraft(key: string): Promise<void> {
  assertReady();
  const { error } = await supabaseAdmin.from('site_content').update({ draft: null }).eq('key', key);
  if (error) throw toStoreError(error);
  afterWrite(key);
}

/** Latest 50 versions, newest first (without the payload). */
export async function listVersions(key: string): Promise<ContentVersion[]> {
  assertReady();
  const { data, error } = await supabaseAdmin
    .from('site_content_versions')
    .select('id, key, created_at, created_by')
    .eq('key', key)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(50);
  if (error) throw toStoreError(error);
  return (data ?? []) as ContentVersion[];
}

/** Copies a version's data into the draft (does not publish). */
export async function restoreVersion(key: string, id: number, user = 'admin'): Promise<ContentRecord> {
  assertReady();
  const { data, error } = await supabaseAdmin
    .from('site_content_versions')
    .select('data')
    .eq('key', key)
    .eq('id', id)
    .maybeSingle();
  if (error) throw toStoreError(error);
  const version = data as { data: unknown } | null;
  if (!version || !isPlainObject(version.data)) {
    throw new CmsStoreError('not_found', 404, 'Version not found');
  }
  return saveDraft(key, version.data, user);
}

/** Maps any thrown value to the JSON error response the admin API returns. */
export function cmsErrorResponse(err: unknown): NextResponse {
  const e = toStoreError(err);
  if (e.status >= 500 && e.code !== 'table_missing') console.error('[cms]', e.message);
  return NextResponse.json({ error: e.message }, { status: e.status });
}

/** True when the error means the CMS tables are not created yet. */
export function isTableMissing(err: unknown): boolean {
  return toStoreError(err).code === 'table_missing';
}

/** `updated_by` value for a session payload: its role, or 'admin'. */
export function userFromSession(session: Record<string, unknown> | null | undefined): string {
  const role = session?.role;
  return typeof role === 'string' && role ? role : 'admin';
}
