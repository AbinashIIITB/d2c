import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getDefinition } from '@/lib/cms/registry';
import { discardDraft, cmsErrorResponse } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key } = await params;
  if (!getDefinition(key)) return NextResponse.json({ error: 'Unknown content key' }, { status: 404 });

  try {
    await discardDraft(key);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return cmsErrorResponse(err);
  }
}
