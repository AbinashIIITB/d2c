import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getDefinition } from '@/lib/cms/registry';
import { listVersions, cmsErrorResponse } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key } = await params;
  if (!getDefinition(key)) return NextResponse.json({ error: 'Unknown content key' }, { status: 404 });

  try {
    return NextResponse.json({ versions: await listVersions(key) });
  } catch (err) {
    return cmsErrorResponse(err);
  }
}
