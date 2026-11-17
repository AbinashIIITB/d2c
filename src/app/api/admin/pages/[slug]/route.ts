import { NextRequest, NextResponse } from 'next/server';
import { getPageData, savePageData, deletePage, isCorePage, getManagedContentKey, clearPagesCache } from '@/lib/page-service';
import { checkAdminAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { normalizeSeo } from '@/lib/record-seo';

export const dynamic = 'force-dynamic';

function revalidatePage(slug: string) {
  clearPagesCache();
  try {
    revalidatePath(`/${slug}`);
    revalidatePath('/[slug]', 'page');
    revalidatePath(`/admin/pages/${slug}`);
    revalidatePath('/admin/pages');
    revalidatePath('/admin/seo');
    revalidatePath('/sitemap.xml');
  } catch (err) {
    console.warn('revalidatePath failed', err);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { slug } = await params;
    const page = await getPageData(slug);
    if (!page) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, page });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

function managedResponse(slug: string): NextResponse | null {
  const key = getManagedContentKey(slug);
  if (!key) return null;
  return NextResponse.json(
    { success: false, error: `This page is edited in the content editor: /admin/content/${key}`, contentKey: key },
    { status: 400 },
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const blocked = managedResponse(slug);
    if (blocked) return blocked;

    const body = await req.json();
    if (body && body.seo) body.seo = normalizeSeo(body.seo);
    const updated = await savePageData(slug, body);
    revalidatePage(updated.slug || slug);

    return NextResponse.json({ success: true, page: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/** Body { seoMeta }: stores only the SEO block (used by the SEO Studio). */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { slug } = await params;
    const blocked = managedResponse(slug);
    if (blocked) return blocked;

    const body = await req.json();
    if (!body || typeof body.seoMeta !== 'object') {
      return NextResponse.json({ error: 'seoMeta is required' }, { status: 400 });
    }
    const existing = await getPageData(slug);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }
    const seo = normalizeSeo(body.seoMeta);
    const updated = await savePageData(slug, { ...existing, seo: Object.keys(seo).length ? seo : undefined });
    revalidatePage(updated.slug || slug);
    return NextResponse.json({ success: true, page: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    if (isCorePage(slug)) {
      return NextResponse.json({ error: 'Core system pages cannot be deleted.' }, { status: 400 });
    }

    const deleted = await deletePage(slug);
    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete page or page not found.' }, { status: 404 });
    }

    revalidatePage(slug);
    return NextResponse.json({ success: true, message: 'Page deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
