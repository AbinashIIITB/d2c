import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';
import { mapCollegeToDb, mapDbToCollege } from '@/lib/admin-mappers';
import { revalidatePath } from 'next/cache';
import { clearCmsMemoryCache, getCollegeByIdOrSlug, saveCollegeSeoMeta } from '@/lib/data-service';
import { normalizeSeo } from '@/lib/record-seo';

export const dynamic = 'force-dynamic';

function revalidateCollege(slugs: (string | undefined | null)[], id?: string) {
  clearCmsMemoryCache();
  try {
    revalidatePath('/colleges');
    for (const s of new Set(slugs.filter(Boolean) as string[])) revalidatePath(`/colleges/${s}`);
    revalidatePath('/sitemap.xml');
    if (id) revalidatePath(`/admin/colleges/${id}`);
    revalidatePath('/admin/colleges');
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
    const { data: college } = await supabaseAdmin
      .from('colleges')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (college) return NextResponse.json(mapDbToCollege(college));

    // Colleges that only exist in the bundled data are served from the data service.
    const fallback = await getCollegeByIdOrSlug(id);
    if (!fallback) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
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
      .from('colleges')
      .select('id')
      .eq('slug', body.slug)
      .neq('id', id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: `The slug "${body.slug}" is already in use by another college.` }, { status: 409 });
    }

    const dbPayload = mapCollegeToDb({ ...body, id });

    const { data: before } = await supabaseAdmin.from('colleges').select('slug').eq('id', id).maybeSingle();

    // Upsert: a college that only exists in the bundled data has no row to update yet.
    const { data, error } = await supabaseAdmin
      .from('colleges')
      .upsert(dbPayload, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    revalidateCollege([dbPayload.slug, before?.slug], id);

    return NextResponse.json({
      success: true,
      college: mapDbToCollege(data),
      id: data.id,
      slug: data.slug
    });
  } catch (error: any) {
    console.error('Error updating college:', error);
    return NextResponse.json({ error: error.message || 'Failed to update college' }, { status: 500 });
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
    const saved = await saveCollegeSeoMeta(id, normalizeSeo(body.seoMeta));
    revalidateCollege([saved.slug], saved.id);
    return NextResponse.json({ success: true, id: saved.id, slug: saved.slug });
  } catch (error: any) {
    console.error('Error saving college SEO:', error);
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
    const { data: college } = await supabaseAdmin
      .from('colleges')
      .select('slug')
      .eq('id', id)
      .maybeSingle();

    const { error } = await supabaseAdmin
      .from('colleges')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidateCollege([college?.slug], id);

    return NextResponse.json({ success: true, message: 'College deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting college:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete college' }, { status: 500 });
  }
}
