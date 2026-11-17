import { NextResponse } from 'next/server';
import { getAllPages, savePageData, getPageData, getManagedContentKey, clearPagesCache } from '@/lib/page-service';
import { checkAdminAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { normalizeSeo } from '@/lib/record-seo';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const pages = await getAllPages({ includeManaged: true });
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
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!slug) {
      return NextResponse.json({ error: 'Valid URL slug is required' }, { status: 400 });
    }

    const managed = getManagedContentKey(slug);
    if (managed) {
      return NextResponse.json(
        { error: `The URL "/${slug}" belongs to a built-in page. Edit it at /admin/content/${managed}.` },
        { status: 409 },
      );
    }
    if (await getPageData(slug)) {
      return NextResponse.json({ error: `A page with the URL "/${slug}" already exists.` }, { status: 409 });
    }

    if (body.seo) body.seo = normalizeSeo(body.seo);
    const saved = await savePageData(slug, {
      ...body,
      slug,
      isCustomPage: true,
      published: body.published ?? true
    });

    clearPagesCache();
    try {
      revalidatePath(`/${slug}`);
      revalidatePath('/[slug]', 'page');
      revalidatePath('/admin/pages');
      revalidatePath('/admin/seo');
      revalidatePath('/sitemap.xml');
    } catch {}

    return NextResponse.json({ success: true, page: saved }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
