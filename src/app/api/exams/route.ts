import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: exams, error } = await supabaseAdmin
      .from('exams')
      .select('*')
      .order('name');

    if (error) throw error;
    
    // Map snake_case back to camelCase
    const mapped = exams.map(e => ({
      ...e,
      fullName: e.full_name,
      logoUrl: e.logo_url,
      applicationLink: e.application_link,
      aboutExam: e.about_exam,
      importantDates: e.important_dates,
      applicationProcess: e.application_process,
      examPattern: e.exam_pattern,
    }));

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
