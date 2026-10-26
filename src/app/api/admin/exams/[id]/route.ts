import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';
import { mapExamToDb, mapDbToExam } from '@/lib/admin-mappers';
import { revalidatePath } from 'next/cache';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, { params }: RouteContext) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { data: exam, error } = await supabaseAdmin
      .from('exams')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    return NextResponse.json(mapDbToExam(exam));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    // Check slug collision with other records
    const { data: existing } = await supabaseAdmin
      .from('exams')
      .select('id')
      .eq('slug', body.slug)
      .neq('id', id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: `The slug "${body.slug}" is already in use by another exam.` }, { status: 409 });
    }

    const dbPayload = mapExamToDb({ ...body, id });

    const { data, error } = await supabaseAdmin
      .from('exams')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Revalidate paths
    revalidatePath('/exams');
    revalidatePath(`/exams/${dbPayload.slug}`);
    revalidatePath(`/admin/exams/${id}`);
    revalidatePath('/admin/exams');

    return NextResponse.json({
      success: true,
      exam: mapDbToExam(data),
      id: data.id,
      slug: data.slug
    });
  } catch (error: any) {
    console.error('Error updating exam:', error);
    return NextResponse.json({ error: error.message || 'Failed to update exam' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Fetch slug first for revalidation
    const { data: exam } = await supabaseAdmin
      .from('exams')
      .select('slug')
      .eq('id', id)
      .single();

    const { error } = await supabaseAdmin
      .from('exams')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/exams');
    if (exam?.slug) {
      revalidatePath(`/exams/${exam.slug}`);
    }
    revalidatePath('/admin/exams');

    return NextResponse.json({ success: true, message: 'Exam deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting exam:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete exam' }, { status: 500 });
  }
}
