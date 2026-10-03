import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const url = new URL('/admin/login', req.url);
  const response = NextResponse.redirect(url, { status: 302 });
  response.cookies.delete('admin_token');
  return response;
}
