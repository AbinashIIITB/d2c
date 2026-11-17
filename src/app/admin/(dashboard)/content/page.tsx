'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Globe,
  GraduationCap,
  ImageIcon,
  Newspaper,
  Search,
  Sparkles,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { api, cn, fmtDate } from '@/components/admin/cms/util';
import { Skeleton, inputCls } from '@/components/admin/cms/ui';

interface Item {
  key: string;
  title: string;
  group: string;
  previewPath: string | null;
  updated_at: string | null;
  hasDraft: boolean;
}

const GROUP_ORDER = ['Site', 'Pages', 'Landing pages'];
const GROUP_BLURB: Record<string, string> = {
  Site: 'Shared across every page: navigation, footer, contact details, popups.',
  Pages: 'The main pages of the website.',
  'Landing pages': 'Campaign and admission landing pages.',
};

const QUICK_LINKS = [
  { href: '/admin/colleges', label: 'Colleges', icon: GraduationCap },
  { href: '/admin/exams', label: 'Exams', icon: FileText },
  { href: '/admin/blogs', label: 'Blogs', icon: Newspaper },
  { href: '/admin/pages', label: 'Custom pages', icon: Globe },
  { href: '/admin/seo', label: 'SEO Studio', icon: Sparkles },
  { href: '/admin/media', label: 'Media library', icon: ImageIcon },
];

export default function ContentHubPage() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<{ message: string; status: number } | null>(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    let alive = true;
    api<{ items: Item[] }>('/api/admin/content')
      .then((r) => alive && setItems(r.items || []))
      .catch((e: Error & { status?: number }) => alive && setError({ message: e.message, status: e.status ?? 0 }));
    return () => {
      alive = false;
    };
  }, []);

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = (items || []).filter((i) => !s || i.title.toLowerCase().includes(s) || i.key.toLowerCase().includes(s));
    const names = Array.from(new Set([...GROUP_ORDER, ...list.map((i) => i.group)]));
    return names.map((g) => ({ name: g, items: list.filter((i) => i.group === g) })).filter((g) => g.items.length);
  }, [items, q]);

  return (
    <div className="w-full max-w-7xl font-dm-sans pb-20 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">Website content</h1>
          <p className="text-xs text-gray-500 mt-1">Pick a page or section to edit every heading, image, icon, link and SEO tag, with a live preview.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pages and sections" aria-label="Search content" className={cn(inputCls, 'pl-9')} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {QUICK_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-3.5 py-3 text-xs font-bold text-d2c-navy hover:border-d2c-royal/50 hover:shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40"
          >
            <l.icon className="w-4 h-4 text-d2c-royal" aria-hidden /> {l.label}
          </Link>
        ))}
      </div>

      {error && (
        <div role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-5 flex gap-3 text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
          <div>
            <p className="font-bold mb-1">{error.status === 503 ? 'One-time database setup needed' : 'Could not load content'}</p>
            <p>
              {error.status === 503
                ? 'The content table does not exist yet. Ask your developer to run supabase/migrations/20261117_cms.sql in the Supabase SQL editor, then reload.'
                : error.message}
            </p>
          </div>
        </div>
      )}

      {!items && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      )}

      {items && groups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
          <Layers className="w-8 h-8 mx-auto text-gray-300 mb-2" aria-hidden />
          <p className="text-sm font-semibold text-gray-500">Nothing matches &quot;{q}&quot;</p>
        </div>
      )}

      {groups.map((g) => (
        <section key={g.name} aria-labelledby={`grp-${g.name}`}>
          <div className="mb-3">
            <h2 id={`grp-${g.name}`} className="font-sora font-bold text-d2c-navy text-lg">
              {g.name}
            </h2>
            {GROUP_BLURB[g.name] && <p className="text-xs text-gray-500">{GROUP_BLURB[g.name]}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {g.items.map((it) => (
              <Link
                key={it.key}
                href={`/admin/content/${it.key}`}
                className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md hover:border-d2c-royal/40 transition-all outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sora font-bold text-d2c-navy text-[15px] group-hover:text-d2c-royal transition-colors">{it.title}</h3>
                  {it.hasDraft && <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Draft</span>}
                </div>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">{it.previewPath ?? 'site-wide'}</p>
                <div className="flex items-center justify-between mt-4 text-[11px] text-gray-500">
                  <span>{it.updated_at ? `Updated ${fmtDate(it.updated_at)}` : 'Original content'}</span>
                  <span className="flex items-center gap-1 font-semibold text-d2c-royal opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    Edit <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
