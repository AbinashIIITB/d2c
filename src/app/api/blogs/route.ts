import { NextResponse } from "next/server";
import { getAllBlogs, saveBlog } from "@/lib/data-service";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const saved = await saveBlog(body);
    revalidatePath('/blog');
    if (saved.slug) revalidatePath(`/blog/${saved.slug}`);
    return NextResponse.json({ success: true, blog: saved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
