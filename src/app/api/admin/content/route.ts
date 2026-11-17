import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { CONTENT_DEFINITIONS } from '@/lib/cms/registry';
import { listRecords, cmsErrorResponse, isTableMissing, CMS_TABLE_MISSING_MESSAGE } from '@/lib/cms/store';
import type { ContentRecord } from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let records: ContentRecord[] = [];
  let tableMissing = false;
  try {
    records = await listRecords();
  } catch (err) {
    if (isTableMissing(err)) tableMissing = true;
    else return cmsErrorResponse(err);
  }
  const byKey = new Map(records.map((r) => [r.key, r]));
  const items = CONTENT_DEFINITIONS.map((d) => {
    const r = byKey.get(d.key);
    return {
      key: d.key,
      title: d.title,
      group: d.group,
      previewPath: d.previewPath,
      updated_at: r?.updated_at ?? null,
      hasDraft: Boolean(r?.draft),
    };
  });
  // The list still works before the migration is run; `tableMissing` lets the UI show a banner.
  return NextResponse.json(tableMissing ? { items, tableMissing, warning: CMS_TABLE_MISSING_MESSAGE } : { items });
}
