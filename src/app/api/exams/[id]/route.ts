import { NextResponse } from "next/server";
import { getExamByIdOrSlug, saveExam, deleteExam } from "@/lib/data-service";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const exam = await getExamByIdOrSlug(id);

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const saved = await saveExam({ ...body, id });

    revalidatePath('/exams');
    revalidatePath('/admin/exams');
    revalidatePath(`/admin/exams/${id}`);
    if (saved.slug) revalidatePath(`/exams/${saved.slug}`);
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      exam: saved
    });
  } catch (error: any) {
    console.error(`API PUT /api/exams/[id] error:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Params }) {
  return PUT(req, context);
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    await deleteExam(id);

    revalidatePath('/exams');
    revalidatePath('/admin/exams');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: `Exam ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
