import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';
import { mapExamToDb, mapDbToExam } from '@/lib/admin-mappers';
import { revalidatePath } from 'next/cache';
import { clearCmsMemoryCache, getExamByIdOrSlug, saveExamSeoMeta } from '@/lib/data-service';
import { normalizeSeo } from '@/lib/record-seo';

export const dynamic = 'force-dynamic';

function revalidateExam(slugs: (string | undefined | null)[], id?: string) {
  clearCmsMemoryCache();
  try {
    revalidatePath('/exams');
    for (const s of new Set(slugs.filter(Boolean) as string[])) revalidatePath(`/exams/${s}`);
    revalidatePath('/sitemap.xml');
    if (id) revalidatePath(`/admin/exams/${id}`);
    revalidatePath('/admin/exams');
    revalidatePath('/admin/seo');
  } catch (err) {
    console.warn('revalidatePath failed', err);
  }
}

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
    const { data: exam } = await supabaseAdmin
      .from('exams')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (exam) return NextResponse.json(mapDbToExam(exam));

    const fallback = await getExamByIdOrSlug(id);
    if (!fallback) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }
    return NextResponse.json(fallback);
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

    const { data: before } = await supabaseAdmin.from('exams').select('slug').eq('id', id).maybeSingle();

    // Upsert: an exam that only exists in the bundled data has no row to update yet.
    const { data, error } = await supabaseAdmin
      .from('exams')
      .upsert(dbPayload, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    revalidateExam([dbPayload.slug, before?.slug], id);

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

/** Body { seoMeta }: stores only the SEO block (used by the SEO Studio). */
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const body = await req.json();
    if (!body || typeof body.seoMeta !== 'object') {
      return NextResponse.json({ error: 'seoMeta is required' }, { status: 400 });
    }
    const saved = await saveExamSeoMeta(id, normalizeSeo(body.seoMeta));
    revalidateExam([saved.slug], saved.id);
    return NextResponse.json({ success: true, id: saved.id, slug: saved.slug });
  } catch (error: any) {
    console.error('Error saving exam SEO:', error);
    return NextResponse.json({ error: error.message || 'Failed to save SEO' }, { status: 500 });
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
      .maybeSingle();

    const { error } = await supabaseAdmin
      .from('exams')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidateExam([exam?.slug], id);

    return NextResponse.json({ success: true, message: 'Exam deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting exam:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete exam' }, { status: 500 });
  }
}
