import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';
import { mapExamToDb, mapDbToExam } from '@/lib/admin-mappers';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: exams, error } = await supabaseAdmin
      .from('exams')
      .select('id, name, slug, full_name, logo_url, date, updated_at')
      .order('name');

    if (error) throw error;

    return NextResponse.json(exams || []);
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

    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Exam name and slug are required' }, { status: 400 });
    }

    // Check slug uniqueness
    const { data: existing } = await supabaseAdmin
      .from('exams')
      .select('id')
      .eq('slug', body.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: `An exam with slug "${body.slug}" already exists.` }, { status: 409 });
    }

    const examId = body.id || String(Date.now());
    const dbPayload = mapExamToDb({ ...body, id: examId });

    const { data, error } = await supabaseAdmin
      .from('exams')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;

    // Revalidate paths
    revalidatePath('/exams');
    revalidatePath(`/exams/${dbPayload.slug}`);
    revalidatePath('/admin/exams');

    return NextResponse.json({
      success: true,
      exam: mapDbToExam(data),
      id: data.id,
      slug: data.slug
    });
  } catch (error: any) {
    console.error('Error creating exam:', error);
    return NextResponse.json({ error: error.message || 'Failed to create exam' }, { status: 500 });
  }
}
