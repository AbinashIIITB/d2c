import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getDefinition } from '@/lib/cms/registry';
import { restoreVersion, cmsErrorResponse, userFromSession } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: Promise<{ key: string; id: string }> }) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key, id } = await params;
  if (!getDefinition(key)) return NextResponse.json({ error: 'Unknown content key' }, { status: 404 });
  const versionId = Number(id);
  if (!Number.isInteger(versionId) || versionId <= 0) {
    return NextResponse.json({ error: 'Invalid version id' }, { status: 400 });
  }

  try {
    const record = await restoreVersion(key, versionId, userFromSession(session));
    return NextResponse.json({ ok: true, record });
  } catch (err) {
    return cmsErrorResponse(err);
  }
}
