import { NextRequest, NextResponse } from 'next/server';
import { getPageData, savePageData } from '@/lib/page-service';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const updated = await savePageData(slug, body);

    // Revalidate relevant public paths
    if (slug === 'home') {
      revalidatePath('/');
    } else {
      revalidatePath(`/${slug}`);
    }
    revalidatePath(`/admin/pages/${slug}`);

    return NextResponse.json({ success: true, page: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
