import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { checkAdminAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/** Only same-site absolute paths: "/x" yes, "//evil.com", "/\\evil.com" and full URLs no. */
function safePath(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return '/';
  return raw;
}

export async function GET(req: Request) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const path = safePath(new URL(req.url).searchParams.get('path'));
  (await draftMode()).enable();
  redirect(path);
}
