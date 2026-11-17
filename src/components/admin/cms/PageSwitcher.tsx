'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown, Loader2, Search } from 'lucide-react';
import { cn } from './util';

interface Entry {
  id: string;
  group: string;
  title: string;
  secondary: string;
  href: string;
}

const GROUP_ORDER = ['Site', 'Pages', 'Landing pages', 'Colleges', 'Exams', 'Blogs', 'Custom pages'];
const MAX_PER_GROUP = 40;

async function getJson(url: string): Promise<any> {
  const res = await fetch(url, { credentials: 'same-origin' });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

function asArray(v: any, ...keys: string[]): any[] {
  if (Array.isArray(v)) return v;
  for (const k of keys) if (Array.isArray(v?.[k])) return v[k];
  return [];
}

async function loadEntries(): Promise<Entry[]> {
  const [content, colleges, exams, blogs, pages] = await Promise.allSettled([
    getJson('/api/admin/content'),
    getJson('/api/colleges'),
    getJson('/api/exams'),
    getJson('/api/admin/blogs').catch(() => getJson('/api/blogs')),
    getJson('/api/admin/pages'),
  ]);
  const out: Entry[] = [];
  const val = (r: PromiseSettledResult<any>) => (r.status === 'fulfilled' ? r.value : null);

  for (const i of asArray(val(content), 'items')) {
    out.push({ id: `c-${i.key}`, group: i.group, title: i.title, secondary: i.previewPath ?? 'site-wide', href: `/admin/content/${i.key}` });
  }
  for (const c of asArray(val(colleges), 'colleges', 'items')) {
    if (c?.id === undefined) continue;
    out.push({ id: `col-${c.id}`, group: 'Colleges', title: c.name || c.title || String(c.id), secondary: c.location || c.state || '', href: `/admin/colleges/${c.id}` });
  }
  for (const e of asArray(val(exams), 'exams', 'items')) {
    if (e?.id === undefined) continue;
    out.push({ id: `ex-${e.id}`, group: 'Exams', title: e.name || e.title || String(e.id), secondary: e.date || '', href: `/admin/exams/${e.id}` });
  }
  for (const b of asArray(val(blogs), 'blogs', 'items')) {
    if (b?.id === undefined) continue;
    out.push({ id: `bl-${b.id}`, group: 'Blogs', title: b.title || b.name || String(b.id), secondary: b.slug ? `/blog/${b.slug}` : '', href: `/admin/blogs/${b.id}` });
  }
  for (const p of asArray(val(pages), 'pages', 'items')) {
    if (!p?.slug) continue;
    out.push({ id: `pg-${p.slug}`, group: 'Custom pages', title: p.title || p.slug, secondary: `/${p.slug}`, href: `/admin/pages/${p.slug}` });
  }
  return out;
}

function matches(e: Entry, q: string): boolean {
  if (!q) return true;
  const hay = `${e.title} ${e.secondary}`.toLowerCase();
  return q.split(/\s+/).every((t) => hay.includes(t));
}

export function PageSwitcher({
  variant = 'bar',
  hotkey = true,
  beforeNavigate,
}: {
  variant?: 'bar' | 'sidebar';
  hotkey?: boolean;
  /** Return false to cancel the navigation (e.g. unsaved changes). */
  beforeNavigate?: () => boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const loadedRef = useRef(false);

  const openIt = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setPos({ left: Math.max(8, Math.min(r.left, window.innerWidth - 408)), top: r.bottom + 6 });
    setQ('');
    setCursor(0);
    setOpen(true);
    if (!loadedRef.current) {
      loadedRef.current = true;
      setLoading(true);
      loadEntries()
        .then(setEntries)
        .catch(() => {
          loadedRef.current = false;
          setEntries([]);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) setOpen(false);
        else openIt();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hotkey, open, openIt]);

  const flat = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = (entries || []).filter((e) => matches(e, s));
    const groups = Array.from(new Set([...GROUP_ORDER, ...list.map((e) => e.group)]));
    const res: Entry[] = [];
    for (const g of groups) res.push(...list.filter((e) => e.group === g).slice(0, MAX_PER_GROUP));
    return res;
  }, [entries, q]);

  useEffect(() => setCursor(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const go = (e: Entry) => {
    if (beforeNavigate && !beforeNavigate()) return;
    setOpen(false);
    router.push(e.href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(flat.length - 1, c + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flat[cursor]) go(flat[cursor]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
    }
  };

  const dark = variant === 'sidebar';

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openIt())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 rounded-xl text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/50 transition-colors',
          dark
            ? 'w-full px-3.5 py-2.5 bg-white/10 text-white/80 hover:bg-white/15 border border-white/10'
            : 'px-3 py-2 bg-white border border-gray-200 text-d2c-navy hover:bg-gray-50 min-w-[190px]',
        )}
      >
        <Search className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden />
        <span className="flex-1 text-left">Jump to page…</span>
        <kbd className={cn('hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded', dark ? 'bg-white/10' : 'bg-gray-100 text-gray-500')}>
          Ctrl K
        </kbd>
        <ChevronsUpDown className="w-3 h-3 opacity-50 sm:hidden" aria-hidden />
      </button>

      {open && pos && (
        <div className="fixed inset-0 z-[110]" onMouseDown={() => setOpen(false)}>
          <div
            onMouseDown={(e) => e.stopPropagation()}
            style={{ left: pos.left, top: pos.top }}
            className="fixed w-[400px] max-w-[calc(100vw-16px)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden font-dm-sans text-d2c-text"
          >
            <div className="flex items-center gap-2 px-3.5 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400" aria-hidden />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search pages, colleges, exams, blogs"
                role="combobox"
                aria-expanded
                aria-controls="page-switcher-list"
                aria-activedescendant={flat[cursor] ? `ps-${flat[cursor].id}` : undefined}
                aria-label="Jump to page"
                className="flex-1 py-3 text-sm outline-none bg-transparent"
              />
              {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" aria-hidden />}
            </div>
            <ul id="page-switcher-list" ref={listRef} role="listbox" className="max-h-[55vh] overflow-y-auto py-1">
              {!loading && flat.length === 0 && <li className="px-4 py-8 text-center text-xs text-gray-400">No matching pages</li>}
              {flat.map((e, i) => (
                <li key={e.id} role="presentation">
                  {(i === 0 || flat[i - 1].group !== e.group) && (
                    <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest font-bold text-gray-400">{e.group}</p>
                  )}
                  <button
                    type="button"
                    id={`ps-${e.id}`}
                    role="option"
                    aria-selected={i === cursor}
                    data-idx={i}
                    tabIndex={-1}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => go(e)}
                    className={cn('w-full text-left px-4 py-2 flex items-baseline justify-between gap-3', i === cursor ? 'bg-d2c-royal/10' : '')}
                  >
                    <span className="text-sm font-semibold text-d2c-navy overflow-hidden text-ellipsis whitespace-nowrap">{e.title}</span>
                    <span className="text-[11px] text-gray-400 font-mono shrink-0 max-w-[45%] overflow-hidden text-ellipsis whitespace-nowrap">{e.secondary}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-4 py-2 border-t border-gray-100 text-[10px] text-gray-400 flex gap-3">
              <span>↑↓ navigate</span>
              <span>Enter open</span>
              <span>Esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
