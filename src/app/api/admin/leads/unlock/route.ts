import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import {
  LEADS_COOKIE,
  LEADS_COOKIE_PATH,
  LEADS_UNLOCK_HOURS,
  checkLeadsUnlocked,
  clearAttempts,
  createLeadsToken,
  isLeadsPasswordConfigured,
  isRateLimited,
  recordFailedAttempt,
  verifyLeadsPassword,
} from '@/lib/leads-lock';

export const dynamic = 'force-dynamic';

function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

// GET: is the Leads section unlocked for this browser?
export async function GET() {
  if (!(await checkAdminAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ configured: isLeadsPasswordConfigured(), unlocked: await checkLeadsUnlocked() });
}

// POST { password }: unlock Leads for LEADS_UNLOCK_HOURS.
export async function POST(req: Request) {
  if (!(await checkAdminAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isLeadsPasswordConfigured()) {
    return NextResponse.json(
      { error: 'The Leads password is not set up yet. Add LEADS_PASSWORD to the server environment.' },
      { status: 503 },
    );
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many wrong attempts. Try again in 10 minutes.' }, { status: 429 });
  }

  let body: { password?: unknown } = {};
  try {
    body = await req.json();
  } catch {}

  if (!verifyLeadsPassword(body.password)) {
    recordFailedAttempt(ip);
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: 'Wrong Leads password.' }, { status: 403 });
  }

  clearAttempts(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(LEADS_COOKIE, await createLeadsToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: LEADS_COOKIE_PATH,
    maxAge: LEADS_UNLOCK_HOURS * 60 * 60,
  });
  return res;
}

// DELETE: lock Leads again.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(LEADS_COOKIE, '', { httpOnly: true, path: LEADS_COOKIE_PATH, maxAge: 0 });
  return res;
}
