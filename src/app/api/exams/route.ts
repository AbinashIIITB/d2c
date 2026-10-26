import { NextResponse } from "next/server";
import { getAllExams, saveExam, deleteExam } from "@/lib/data-service";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const exams = await getAllExams();
    return NextResponse.json(exams);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const saved = await saveExam(body);

    revalidatePath('/exams');
    revalidatePath('/admin/exams');
    if (saved.slug) revalidatePath(`/exams/${saved.slug}`);
    revalidatePath('/');

    return NextResponse.json({ success: true, exam: saved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const saved = await saveExam(body);

    revalidatePath('/exams');
    revalidatePath('/admin/exams');
    if (saved.slug) revalidatePath(`/exams/${saved.slug}`);
    if (saved.id) revalidatePath(`/admin/exams/${saved.id}`);
    revalidatePath('/');

    return NextResponse.json({ success: true, exam: saved });
  } catch (error: any) {
    console.error("API update exam error:", error);
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
      return NextResponse.json({ error: "Missing exam id to delete" }, { status: 400 });
    }

    await deleteExam(id);

    revalidatePath('/exams');
    revalidatePath('/admin/exams');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: `Exam ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
