import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getBlogByIdOrSlug, saveBlog, deleteBlog, saveBlogSeoMeta, clearCmsMemoryCache } from '@/lib/data-service';
import { normalizeSeo } from '@/lib/record-seo';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

function revalidateBlog(slugs: (string | undefined | null)[]) {
  clearCmsMemoryCache();
  try {
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    for (const s of new Set(slugs.filter(Boolean) as string[])) revalidatePath(`/blog/${s}`);
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin/blogs');
    revalidatePath('/admin/seo');
  } catch (err) {
    console.warn('revalidatePath failed', err);
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const blog = await getBlogByIdOrSlug(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const before = await getBlogByIdOrSlug(id);
    const saved = await saveBlog({ ...body, id: before?.id ?? id });
    revalidateBlog([saved.slug, before?.slug, body.slug]);

    return NextResponse.json({ success: true, blog: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** Body { seoMeta } stores only the SEO block (SEO Studio); any other body is treated like PUT. */
export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.clone().json();
    if (body && typeof body.seoMeta === 'object') {
      const { id } = await props.params;
      const saved = await saveBlogSeoMeta(id, normalizeSeo(body.seoMeta));
      revalidateBlog([saved.slug]);
      return NextResponse.json({ success: true, blog: saved });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return PUT(req, props);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const before = await getBlogByIdOrSlug(id);
    await deleteBlog(id);
    revalidateBlog([before?.slug, id]);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
