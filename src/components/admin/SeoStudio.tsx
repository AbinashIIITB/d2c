'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronDown,
  EyeOff,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Loader2,
  Newspaper,
  Pencil,
  Search,
  Sparkles,
} from 'lucide-react';
import type { SeoFields } from '@/lib/cms/types';
import { seoOverrides, seoStatus, type LengthState } from '@/lib/record-seo';
import { SeoField } from './cms/SeoField';
import { btnPrimary, inputCls } from './cms/ui';
import { cn } from './cms/util';

export type StudioKind = 'content' | 'college' | 'exam' | 'blog' | 'page';

export interface StudioRow {
  id: string;
  kind: StudioKind;
  label: string;
  /** Public path ("" when the document has no page of its own). */
  path: string;
  editHref: string;
  /** Effective SEO (what the site emits). */
  seo: SeoFields;
  /** What the site derives on its own from the record; stored overrides are measured against it. */
  derived: SeoFields;
  /** True when the SEO block can be edited inline (records); documents link to their editor instead. */
  inline: boolean;
}

const KIND_META: Record<StudioKind, { label: string; plural: string; icon: typeof FileText; endpoint?: string }> = {
  content: { label: 'Page', plural: 'Site pages', icon: Layers },
  college: { label: 'College', plural: 'Colleges', icon: Building2, endpoint: '/api/admin/colleges' },
  exam: { label: 'Exam', plural: 'Exams', icon: FileText, endpoint: '/api/admin/exams' },
  blog: { label: 'Blog', plural: 'Blogs', icon: Newspaper, endpoint: '/api/admin/blogs' },
  page: { label: 'Custom page', plural: 'Custom pages', icon: Globe, endpoint: '/api/admin/pages' },
};

type StatusFilter = 'all' | 'attention' | 'noindex' | 'no-title' | 'no-description';

const STATE_CLASS: Record<LengthState, string> = {
  empty: 'bg-red-50 text-red-700 border-red-100',
  short: 'bg-amber-50 text-amber-700 border-amber-100',
  good: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  long: 'bg-amber-50 text-amber-700 border-amber-100',
};

function LengthBadge({ label, n, state }: { label: string; n: number; state: LengthState }) {
  const hint =
    state === 'empty' ? `${label} is missing` : state === 'good' ? `${label} length is good` : state === 'short' ? `${label} is short` : `${label} is too long`;
  return (
    <span
      className={cn('inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border tabular-nums', STATE_CLASS[state])}
      title={hint}
    >
      {label} {n}
    </span>
  );
}

function RowEditor({ row, onSaved }: { row: StudioRow; onSaved: (id: string, kind: StudioKind, seo: SeoFields) => void }) {
  const [draft, setDraft] = useState<SeoFields>(row.seo);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const endpoint = KIND_META[row.kind].endpoint;

  async function save() {
    if (!endpoint) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`${endpoint}/${encodeURIComponent(row.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seoMeta: seoOverrides(draft, row.derived) }),
      });
      let body: any = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      if (!res.ok || body?.success === false || body?.error) {
        throw new Error(body?.error || `Save failed (${res.status})`);
      }
      onSaved(row.id, row.kind, draft);
      setMessage({ ok: true, text: 'Saved. The change is live.' });
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-4 pb-5 pt-4 border-t border-gray-100 bg-[#faf8ff] space-y-4">
      <SeoField value={draft} onChange={setDraft} />
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={btnPrimary} onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />} Save SEO
        </button>
        <Link href={row.editHref} className="text-xs font-semibold text-d2c-royal hover:underline">
          Open full editor
        </Link>
        {message && (
          <span role="status" className={cn('text-xs font-medium', message.ok ? 'text-emerald-600' : 'text-red-600')}>
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}

export function SeoStudio({ rows: initialRows }: { rows: StudioRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [kind, setKind] = useState<StudioKind | 'all'>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [openKey, setOpenKey] = useState<string | null>(null);

  const withStatus = useMemo(() => rows.map((r) => ({ row: r, st: seoStatus(r.seo) })), [rows]);

  const counts = useMemo(() => {
    const c = { total: withStatus.length, attention: 0, noindex: 0, noTitle: 0, noDescription: 0 };
    for (const { st } of withStatus) {
      if (st.issues.length) c.attention += 1;
      if (st.noindex) c.noindex += 1;
      if (st.titleState === 'empty') c.noTitle += 1;
      if (st.descriptionState === 'empty') c.noDescription += 1;
    }
    return c;
  }, [withStatus]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return withStatus.filter(({ row, st }) => {
      if (kind !== 'all' && row.kind !== kind) return false;
      if (status === 'attention' && st.issues.length === 0) return false;
      if (status === 'noindex' && !st.noindex) return false;
      if (status === 'no-title' && st.titleState !== 'empty') return false;
      if (status === 'no-description' && st.descriptionState !== 'empty') return false;
      if (q) {
        const hay = `${row.label} ${row.path} ${row.seo.title || ''} ${row.seo.description || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [withStatus, kind, status, query]);

  function handleSaved(id: string, k: StudioKind, seo: SeoFields) {
    setRows((prev) => prev.map((r) => (r.id === id && r.kind === k ? { ...r, seo } : r)));
  }

  const kindCounts = useMemo(() => {
    const m: Record<string, number> = { all: rows.length };
    for (const r of rows) m[r.kind] = (m[r.kind] || 0) + 1;
    return m;
  }, [rows]);

  const summary = [
    { id: 'all' as const, label: 'All pages', value: counts.total, tone: 'text-d2c-navy' },
    { id: 'attention' as const, label: 'Need attention', value: counts.attention, tone: counts.attention ? 'text-amber-600' : 'text-emerald-600' },
    { id: 'no-title' as const, label: 'Missing title', value: counts.noTitle, tone: counts.noTitle ? 'text-red-600' : 'text-emerald-600' },
    { id: 'no-description' as const, label: 'Missing description', value: counts.noDescription, tone: counts.noDescription ? 'text-red-600' : 'text-emerald-600' },
  ];

  return (
    <div className="space-y-6 font-dm-sans max-w-7xl pb-20">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-d2c-royal/10 text-d2c-royal flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-sora text-d2c-navy tracking-tight">SEO Studio</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Every page on the site with its search title, description and visibility. Open a college, exam, blog or custom page to edit its SEO here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summary.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setStatus(card.id)}
            aria-pressed={status === card.id}
            className={cn(
              'text-left rounded-2xl border bg-white px-4 py-3 shadow-xs transition-colors',
              status === card.id ? 'border-d2c-royal ring-2 ring-d2c-royal/15' : 'border-gray-200 hover:border-gray-300',
            )}
          >
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400">{card.label}</p>
            <p className={cn('text-2xl font-bold font-sora', card.tone)}>{card.value}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, URL, title or description"
            aria-label="Search pages"
            className={cn(inputCls, 'pl-10')}
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Page type">
          {(['all', 'content', 'college', 'exam', 'blog', 'page'] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                'px-3 py-2 rounded-xl text-xs font-semibold border transition-colors',
                kind === k ? 'bg-d2c-royal text-white border-d2c-royal' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
              )}
            >
              {k === 'all' ? 'All' : KIND_META[k].plural} <span className="opacity-70">({kindCounts[k] || 0})</span>
            </button>
          ))}
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          aria-label="Status filter"
          className={cn(inputCls, 'lg:w-52')}
        >
          <option value="all">Any status</option>
          <option value="attention">Needs attention</option>
          <option value="noindex">Hidden from search (noindex)</option>
          <option value="no-title">Missing title</option>
          <option value="no-description">Missing description</option>
        </select>
      </div>

      <p className="text-xs text-gray-500" aria-live="polite">
        Showing {filtered.length} of {rows.length}
      </p>

      <ul className="space-y-2">
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center text-sm font-semibold text-gray-500">
            No pages match these filters.
          </li>
        )}
        {filtered.map(({ row, st }) => {
          const k = `${row.kind}:${row.id}`;
          const open = openKey === k;
          const meta = KIND_META[row.kind];
          const Icon = meta.icon;
          return (
            <li key={k} className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
              <div className="flex items-start gap-3 px-4 py-3">
                <span className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-sora font-bold text-sm text-d2c-navy truncate max-w-full">{row.label}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">{meta.label}</span>
                    {st.noindex && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                        <EyeOff className="w-3 h-3" /> noindex
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#1a0dab] truncate mt-0.5">{row.seo.title || <span className="text-red-600">No title</span>}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{row.seo.description || <span className="text-red-600">No description</span>}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <LengthBadge label="Title" n={st.titleLength} state={st.titleState} />
                    <LengthBadge label="Description" n={st.descriptionLength} state={st.descriptionState} />
                    {row.path && <span className="text-[11px] font-mono text-gray-400 truncate">{row.path}</span>}
                    {st.issues.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-700">
                        <AlertTriangle className="w-3 h-3" /> {st.issues.length} to check
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {row.path && (
                    <a
                      href={row.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${row.label} on the site`}
                      className="p-2 rounded-lg text-gray-400 hover:text-d2c-navy hover:bg-gray-100"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {row.inline ? (
                    <button
                      type="button"
                      onClick={() => setOpenKey(open ? null : k)}
                      aria-expanded={open}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-d2c-navy hover:bg-gray-50"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit SEO
                      <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link
                      href={row.editHref}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-d2c-navy hover:bg-gray-50"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit page
                    </Link>
                  )}
                </div>
              </div>
              {open && row.inline && <RowEditor row={row} onSaved={handleSaved} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
