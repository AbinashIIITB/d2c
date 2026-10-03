import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'super_secret_d2c_admin_key_2026'
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

export const ADMIN_CREDENTIALS = {
  admin: {
    username: 'admin',
    password: 'securepassword123', // Hardcoded securely per requirements
    role: 'SUPER_ADMIN'
  },
  editor: {
    username: 'editor',
    password: 'editorpassword123',
    role: 'EDITOR'
  }
};
