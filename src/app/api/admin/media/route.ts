import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const BUCKET = 'public-images';
const MAX_DEPTH = 4;
const MAX_ITEMS = 2000;

interface MediaItem {
  name: string;
  path: string;
  url: string;
  size: number;
  created_at: string | null;
}

interface StorageEntry {
  name: string;
  id: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  metadata?: { size?: number } | null;
}

async function walk(prefix: string, depth: number, out: MediaItem[]): Promise<void> {
  if (out.length >= MAX_ITEMS) return;
  const { data, error } = await supabaseAdmin.storage.from(BUCKET).list(prefix, {
    limit: 1000,
    sortBy: { column: 'created_at', order: 'desc' },
  });
  if (error) throw error;
  const folders: string[] = [];
  for (const entry of (data ?? []) as StorageEntry[]) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.id === null) {
      // Folders come back without an id.
      folders.push(path);
      continue;
    }
    if (entry.name === '.emptyFolderPlaceholder') continue;
    out.push({
      name: entry.name,
      path,
      url: supabaseAdmin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl,
      size: entry.metadata?.size ?? 0,
      created_at: entry.created_at ?? entry.updated_at ?? null,
    });
  }
  if (depth < MAX_DEPTH) {
    for (const folder of folders) await walk(folder, depth + 1, out);
  }
}

export async function GET(req: Request) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const prefix = (searchParams.get('prefix') || '').replace(/^\/+|\/+$/g, '');
    if (prefix.includes('..')) return NextResponse.json({ error: 'Invalid prefix' }, { status: 400 });
    const search = (searchParams.get('search') || '').trim().toLowerCase();

    const items: MediaItem[] = [];
    await walk(prefix, 0, items);

    const filtered = search ? items.filter((i) => i.name.toLowerCase().includes(search)) : items;
    filtered.sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''));
    return NextResponse.json({ items: filtered });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not list media';
    console.error('Media list error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await checkAdminAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body: unknown = await req.json().catch(() => null);
    const path =
      body && typeof body === 'object' && typeof (body as { path?: unknown }).path === 'string'
        ? ((body as { path: string }).path).replace(/^\/+/, '')
        : '';
    if (!path || path.includes('..')) return NextResponse.json({ error: 'A valid path is required' }, { status: 400 });

    const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not delete file';
    console.error('Media delete error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
