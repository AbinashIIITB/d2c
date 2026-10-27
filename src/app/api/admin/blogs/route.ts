import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getAllBlogs, saveBlog } from '@/lib/data-service';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const blogs = await getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: 'Blog title is required' }, { status: 400 });
    }

    const saved = await saveBlog(body);

    revalidatePath('/blog');
    revalidatePath('/admin/blogs');
    if (saved.slug) revalidatePath(`/blog/${saved.slug}`);

    return NextResponse.json({ success: true, blog: saved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
