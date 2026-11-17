import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getDefinition } from '@/lib/cms/registry';
import { deepMerge, isPlainObject } from '@/lib/cms/merge';
import {
  getRecord,
  saveDraft,
  publish,
  cmsErrorResponse,
  isTableMissing,
  userFromSession,
  CMS_TABLE_MISSING_MESSAGE,
} from '@/lib/cms/store';
import type { ContentRecord } from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ key: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key } = await params;
  const def = getDefinition(key);
  if (!def) return NextResponse.json({ error: 'Unknown content key' }, { status: 404 });

  let record: ContentRecord = { key, data: null, draft: null, updated_at: null, updated_by: null };
  let tableMissing = false;
  try {
    record = await getRecord(key);
  } catch (err) {
    // Let the editor open on defaults before the migration is run; saving still returns 503.
    if (isTableMissing(err)) tableMissing = true;
    else return cmsErrorResponse(err);
  }

  const merged = deepMerge(def.defaults, record.data);
  const mergedDraft = deepMerge(def.defaults, record.draft ?? record.data);
  return NextResponse.json({
    definition: { key: def.key, title: def.title, group: def.group, previewPath: def.previewPath, sections: def.sections },
    defaults: def.defaults,
    record,
    merged,
    mergedDraft,
    ...(tableMissing ? { tableMissing, warning: CMS_TABLE_MISSING_MESSAGE } : {}),
  });
}

export async function PUT(req: Request, { params }: Ctx) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key } = await params;
  if (!getDefinition(key)) return NextResponse.json({ error: 'Unknown content key' }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!isPlainObject(body)) return NextResponse.json({ error: 'Body must be an object' }, { status: 400 });
  const { data, mode } = body;
  if (mode !== 'draft' && mode !== 'publish') {
    return NextResponse.json({ error: "mode must be 'draft' or 'publish'" }, { status: 400 });
  }
  if (!isPlainObject(data)) return NextResponse.json({ error: 'data must be an object' }, { status: 400 });

  try {
    const user = userFromSession(session);
    const record = mode === 'publish' ? await publish(key, data, user) : await saveDraft(key, data, user);
    return NextResponse.json({ ok: true, record });
  } catch (err) {
    return cmsErrorResponse(err);
  }
}
