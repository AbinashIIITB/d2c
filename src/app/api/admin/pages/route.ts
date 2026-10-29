import { NextResponse } from 'next/server';
import { getAllPages } from '@/lib/page-service';

export async function GET() {
  try {
    const pages = await getAllPages();
    return NextResponse.json({ success: true, pages });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
