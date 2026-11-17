// Second password for the Leads section of the admin panel (on top of the normal admin login),
// so content editors can't see student enquiries.
//
// The password lives ONLY in the LEADS_PASSWORD env var (the repository is public). The unlock
// cookie is a JWT signed with a key derived from that password, so it can't be forged even by
// someone who knows ADMIN_JWT_SECRET, and changing the password logs everyone out of Leads.
import { SignJWT, jwtVerify } from 'jose';
import { createHash, timingSafeEqual } from 'crypto';

export const LEADS_COOKIE = 'leads_unlock';
export const LEADS_COOKIE_PATH = '/api/admin/leads';
export const LEADS_UNLOCK_HOURS = 8;

function password(): string {
  return process.env.LEADS_PASSWORD || '';
}

export function isLeadsPasswordConfigured(): boolean {
  return password().length > 0;
}

function signingKey(): Uint8Array {
  return createHash('sha256').update(`d2c-leads-unlock:${password()}`).digest();
}

export function verifyLeadsPassword(attempt: unknown): boolean {
  if (!isLeadsPasswordConfigured() || typeof attempt !== 'string') return false;
  const a = createHash('sha256').update(attempt).digest();
  const b = createHash('sha256').update(password()).digest();
  return timingSafeEqual(a, b);
}

export async function createLeadsToken(): Promise<string> {
  return new SignJWT({ scope: 'leads' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${LEADS_UNLOCK_HOURS}h`)
    .sign(signingKey());
}

export async function checkLeadsUnlocked(): Promise<boolean> {
  if (!isLeadsPasswordConfigured()) return false;
  try {
    const { cookies } = await import('next/headers');
    const token = (await cookies()).get(LEADS_COOKIE)?.value;
    if (!token) return false;
    const { payload } = await jwtVerify(token, signingKey());
    return payload.scope === 'leads';
  } catch {
    return false;
  }
}

// Basic brute-force brake: per server instance, 5 wrong attempts per IP per 10 minutes.
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) return false;
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) attempts.set(ip, { count: 1, first: now });
  else entry.count += 1;
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}
