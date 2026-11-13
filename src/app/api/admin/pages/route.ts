import { NextResponse } from 'next/server';
import { getAllPages, savePageData } from '@/lib/page-service';
import { checkAdminAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const pages = await getAllPages();
    return NextResponse.json({ success: true, pages });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title?.trim()) {
      return NextResponse.json({ error: 'Page Title is required' }, { status: 400 });
    }

    const rawSlug = body.slug || body.title;
    const slug = String(rawSlug)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-');

    if (!slug) {
      return NextResponse.json({ error: 'Valid URL slug is required' }, { status: 400 });
    }

    const saved = await savePageData(slug, {
      ...body,
      slug,
      isCustomPage: true,
      published: body.published ?? true
    });

    revalidatePath(`/${slug}`);
    revalidatePath('/admin/pages');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, page: saved }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
