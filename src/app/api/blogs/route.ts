import { NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/data-service";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Public endpoint: never expose drafts or deleted posts.
    const blogs = (await getAllBlogs()).filter((b: { published?: boolean }) => b.published !== false);
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
