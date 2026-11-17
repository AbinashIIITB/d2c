import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'super_secret_d2c_admin_key_2027'
);

export async function createSession(role: string) {
  const token = await new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY);
  
  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function checkAdminAuth() {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return null;
    return await verifySession(token);
  } catch {
    return null;
  }
}

// The repository is public, so these fallback passwords are visible to anyone.
// Set ADMIN_PASSWORD / EDITOR_PASSWORD (and ADMIN_JWT_SECRET) in the Vercel environment to override them.
export const ADMIN_CREDENTIALS = {
  admin: {
    username: 'admin',
    password: process.env.ADMIN_PASSWORD || 'securepassword123',
    role: 'SUPER_ADMIN'
  },
  editor: {
    username: 'editor',
    password: process.env.EDITOR_PASSWORD || 'editorpassword123',
    role: 'EDITOR'
  }
};
