import { NextResponse } from "next/server";
import { getAllExams } from "@/lib/data-service";

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
