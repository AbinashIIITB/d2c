import { NextResponse } from "next/server";
import { getCollegeByIdOrSlug, saveCollege, deleteCollege } from "@/lib/data-service";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const college = await getCollegeByIdOrSlug(id);

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const saved = await saveCollege({ ...body, id });

    revalidatePath('/colleges');
    revalidatePath('/admin/colleges');
    revalidatePath(`/admin/colleges/${id}`);
    if (saved.slug) revalidatePath(`/colleges/${saved.slug}`);
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      college: saved
    });
  } catch (error: any) {
    console.error(`API PUT /api/colleges/[id] error:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Params }) {
  return PUT(req, context);
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    await deleteCollege(id);

    revalidatePath('/colleges');
    revalidatePath('/admin/colleges');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: `College ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
