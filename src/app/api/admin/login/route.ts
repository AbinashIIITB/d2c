import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS, createSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    let role = null;
    if (username === ADMIN_CREDENTIALS.admin.username && password === ADMIN_CREDENTIALS.admin.password) {
      role = ADMIN_CREDENTIALS.admin.role;
    } else if (username === ADMIN_CREDENTIALS.editor.username && password === ADMIN_CREDENTIALS.editor.password) {
      role = ADMIN_CREDENTIALS.editor.role;
    }

    if (!role) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // Create session JWT
    const token = await createSession(role);

    const response = NextResponse.json({ success: true });
    
    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}
