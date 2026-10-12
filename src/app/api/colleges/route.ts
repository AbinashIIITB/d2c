import { NextResponse } from "next/server";
import { getAllColleges, saveCollege, deleteCollege } from "@/lib/data-service";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const colleges = await getAllColleges();
    return NextResponse.json(colleges);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const saved = await saveCollege(body);

    revalidatePath('/colleges');
    revalidatePath('/admin/colleges');
    if (saved.slug) revalidatePath(`/colleges/${saved.slug}`);
    revalidatePath('/');

    return NextResponse.json({ success: true, college: saved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const saved = await saveCollege(body);

    revalidatePath('/colleges');
    revalidatePath('/admin/colleges');
    if (saved.slug) revalidatePath(`/colleges/${saved.slug}`);
    if (saved.id) revalidatePath(`/admin/colleges/${saved.id}`);
    revalidatePath('/');

    return NextResponse.json({ success: true, college: saved });
  } catch (error: any) {
    console.error("API update college error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  return PUT(req);
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {
        // no json body
      }
    }

    if (!id) {
      return NextResponse.json({ error: "Missing college id to delete" }, { status: 400 });
    }

    await deleteCollege(id);

    revalidatePath('/colleges');
    revalidatePath('/admin/colleges');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: `College ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
