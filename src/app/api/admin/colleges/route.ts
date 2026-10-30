import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';
import { mapCollegeToDb, mapDbToCollege } from '@/lib/admin-mappers';
import { sortCollegesWithIEMFirst } from '@/lib/iem-priority';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: colleges, error } = await supabaseAdmin
      .from('colleges')
      .select('*')
      .order('name');

    if (error) throw error;

    const mapped = (colleges || []).map(mapDbToCollege);
    return NextResponse.json(sortCollegesWithIEMFirst(mapped));
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
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    // Check slug uniqueness
    const { data: existing } = await supabaseAdmin
      .from('colleges')
      .select('id')
      .eq('slug', body.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: `A college with slug "${body.slug}" already exists.` }, { status: 409 });
    }

    // If ID is not provided, generate a safe unique ID
    const collegeId = body.id || String(Date.now());
    const dbPayload = mapCollegeToDb({ ...body, id: collegeId });

    const { data, error } = await supabaseAdmin
      .from('colleges')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;

    // Revalidate paths
    revalidatePath('/colleges');
    revalidatePath(`/colleges/${dbPayload.slug}`);
    revalidatePath('/admin/colleges');

    return NextResponse.json({
      success: true,
      college: mapDbToCollege(data),
      id: data.id,
      slug: data.slug
    });
  } catch (error: any) {
    console.error('Error creating college:', error);
    return NextResponse.json({ error: error.message || 'Failed to create college' }, { status: 500 });
  }
}
