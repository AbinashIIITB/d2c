'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  History,
  Loader2,
  Monitor,
  PanelRightClose,
  PanelRightOpen,
  RefreshCw,
  Rocket,
  Save,
  Smartphone,
  Tablet,
  Undo2,
} from 'lucide-react';
import type { ContentRecord, ContentVersion, SchemaSection } from '@/lib/cms/types';
import { ApiError, api, clone, cn, deepEqual, diffFromDefaults, fmtDate, jsonInit, setIn, type Path } from './util';
import { Modal, Skeleton, Toaster, btnGhost, btnPrimary, useToasts } from './ui';
import { SchemaForm } from './SchemaForm';
import { PageSwitcher } from './PageSwitcher';

interface EditorPayload {
  definition: { key: string; title: string; group: string; previewPath: string | null; sections: SchemaSection[] };
  defaults: any;
  record: ContentRecord;
  merged: any;
  mergedDraft: any;
}

type Device = 'desktop' | 'tablet' | 'mobile';
const DEVICE_WIDTH: Record<Device, string> = { desktop: '100%', tablet: '820px', mobile: '390px' };

const SPLIT_KEY = 'd2c-cms-split';
const PREVIEW_KEY = 'd2c-cms-preview-open';

function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStore(key: string, v: string) {
  try {
    window.localStorage.setItem(key, v);
  } catch {
    /* ignore */
  }
}

export function ContentEditor({ contentKey }: { contentKey: string }) {
  const [payload, setPayload] = useState<EditorPayload | null>(null);
  const [loadError, setLoadError] = useState<{ message: string; status: number } | null>(null);
  const [value, setValue] = useState<any>(null);
  const [baseline, setBaseline] = useState<any>(null);
  const [record, setRecord] = useState<ContentRecord | null>(null);
  const [busy, setBusy] = useState<null | 'draft' | 'publish' | 'discard'>(null);
  const [tableMissing, setTableMissing] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [versions, setVersions] = useState<ContentVersion[] | null>(null);
  const [versionsError, setVersionsError] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<number | null>(null);
  const [device, setDevice] = useState<Device>('desktop');
  const [previewOpen, setPreviewOpen] = useState(true);
  const [splitPx, setSplitPx] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState(true);
  const { toasts, push, dismiss } = useToasts();

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pendingScroll = useRef<number | null>(null);
  const valueRef = useRef<any>(null);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const res = await api<EditorPayload>(`/api/admin/content/${encodeURIComponent(contentKey)}`);
      const doc = clone(res.mergedDraft ?? res.merged ?? res.defaults);
      setPayload(res);
      setRecord(res.record);
      setValue(doc);
      setBaseline(clone(doc));
      setTableMissing(false);
    } catch (e) {
      const status = e instanceof ApiError ? e.status : 0;
      if (status === 503) setTableMissing(true);
      setLoadError({ message: e instanceof Error ? e.message : 'Failed to load', status });
    }
  }, [contentKey]);

  useEffect(() => {
    void load();
  }, [load]);

  valueRef.current = value;
  const dirtyRef = useRef(false);

  const dirty = useMemo(() => value !== null && baseline !== null && !deepEqual(value, baseline), [value, baseline]);
  dirtyRef.current = dirty;
  const hasDraft = !!record?.draft;
  const status: 'unsaved' | 'draft' | 'published' = dirty ? 'unsaved' : hasDraft ? 'draft' : 'published';

  const onChange = useCallback((path: Path, v: any) => {
    setValue((prev: any) => setIn(prev, path, v));
  }, []);

  // ------------------------------------------------------------ preview
  const previewPath = payload ? payload.definition.previewPath ?? '/' : '/';
  const previewSrc = `/api/admin/preview?path=${encodeURIComponent(previewPath)}`;

  const reloadPreview = useCallback(() => {
    const frame = iframeRef.current;
    if (!frame) return;
    try {
      pendingScroll.current = frame.contentWindow?.scrollY ?? 0;
      setPreviewLoading(true);
      frame.contentWindow?.location.reload();
    } catch {
      setPreviewLoading(true);
      frame.src = previewSrc;
    }
  }, [previewSrc]);

  const onFrameLoad = useCallback(() => {
    setPreviewLoading(false);
    const y = pendingScroll.current;
    pendingScroll.current = null;
    if (y === null) return;
    try {
      const win = iframeRef.current?.contentWindow;
      win?.scrollTo(0, y);
      // Content may grow after load (images, lazy sections): retry once.
      window.setTimeout(() => win?.scrollTo(0, y), 400);
    } catch {
      /* cross-origin: ignore */
    }
  }, []);

  // Exit draft mode when leaving the editor.
  useEffect(() => {
    return () => {
      void fetch(`/api/admin/preview/exit?path=${encodeURIComponent('/')}`, { keepalive: true, redirect: 'manual', credentials: 'same-origin' }).catch(() => undefined);
    };
  }, []);

  // ------------------------------------------------------------ persistence
  const save = useCallback(
    async (mode: 'draft' | 'publish') => {
      if (!payload || valueRef.current === null || busy) return;
      setBusy(mode);
      try {
        const data = diffFromDefaults(payload.defaults, valueRef.current) ?? {};
        const res = await api<{ ok: boolean; record: ContentRecord }>(`/api/admin/content/${encodeURIComponent(contentKey)}`, jsonInit('PUT', { data, mode }));
        setRecord(res.record);
        setBaseline(clone(valueRef.current));
        setTableMissing(false);
        push('success', mode === 'publish' ? 'Published. The live site now shows these changes.' : 'Draft saved. Preview updated.');
        reloadPreview();
      } catch (e) {
        if (e instanceof ApiError && e.status === 503) setTableMissing(true);
        push('error', e instanceof Error ? e.message : 'Save failed');
      } finally {
        setBusy(null);
      }
    },
    [payload, busy, contentKey, push, reloadPreview],
  );

  const discard = useCallback(async () => {
    if (busy) return;
    if (!window.confirm('Discard the saved draft and unsaved edits? The editor will go back to the published content.')) return;
    setBusy('discard');
    try {
      await api(`/api/admin/content/${encodeURIComponent(contentKey)}/discard`, { method: 'POST' });
      await load();
      push('success', 'Draft discarded.');
      reloadPreview();
    } catch (e) {
      push('error', e instanceof Error ? e.message : 'Could not discard draft');
    } finally {
      setBusy(null);
    }
  }, [busy, contentKey, load, push, reloadPreview]);

  // Cmd/Ctrl+S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        void save('draft');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save]);

  // Unsaved changes guards
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a || !a.href || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (!window.confirm('You have unsaved changes. Leave without saving?')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.removeEventListener('click', onClick, true);
    };
  }, [dirty]);

  // ------------------------------------------------------------ history
  const openHistory = useCallback(async () => {
    setHistoryOpen(true);
    setVersions(null);
    setVersionsError(null);
    try {
      const res = await api<{ versions: ContentVersion[] }>(`/api/admin/content/${encodeURIComponent(contentKey)}/versions`);
      setVersions(res.versions || []);
    } catch (e) {
      setVersionsError(e instanceof Error ? e.message : 'Could not load history');
    }
  }, [contentKey]);

  const restore = useCallback(
    async (v: ContentVersion) => {
      if (dirty && !window.confirm('Restoring replaces your unsaved edits. Continue?')) return;
      setRestoring(v.id);
      try {
        await api(`/api/admin/content/${encodeURIComponent(contentKey)}/versions/${v.id}`, { method: 'POST' });
        await load();
        setHistoryOpen(false);
        push('success', 'Version restored into the draft. Review it, then publish.');
        reloadPreview();
      } catch (e) {
        push('error', e instanceof Error ? e.message : 'Restore failed');
      } finally {
        setRestoring(null);
      }
    },
    [dirty, contentKey, load, push, reloadPreview],
  );

  // ------------------------------------------------------------ split resize
  useEffect(() => {
    const s = readStore(SPLIT_KEY);
    if (s && Number(s) > 0) setSplitPx(Number(s));
    if (readStore(PREVIEW_KEY) === '0') setPreviewOpen(false);
  }, []);

  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    const box = containerRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const frame = iframeRef.current;
    if (frame) frame.style.pointerEvents = 'none';
    const move = (ev: PointerEvent) => {
      const px = Math.min(Math.max(ev.clientX - rect.left, 380), rect.width - 320);
      setSplitPx(px);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      if (frame) frame.style.pointerEvents = '';
      setSplitPx((p) => {
        if (p) writeStore(SPLIT_KEY, String(Math.round(p)));
        return p;
      });
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const togglePreview = () => {
    setPreviewOpen((o) => {
      writeStore(PREVIEW_KEY, o ? '0' : '1');
      return !o;
    });
  };

  // ------------------------------------------------------------ render
  const title = payload?.definition.title ?? contentKey;
  const liveHref = payload?.definition.previewPath ?? '/';

  if (loadError && !payload) {
    return (
      <div className="-m-6 md:-m-8 p-8 font-dm-sans">
        <Link href="/admin/content" className="inline-flex items-center gap-1.5 text-xs font-semibold text-d2c-royal mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Website content
        </Link>
        {tableMissing ? <TableMissingBanner /> : (
          <div role="alert" className="max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p className="font-bold mb-1">Could not open this document</p>
            <p>{loadError.message}</p>
            <button type="button" className={cn(btnGhost, 'mt-4')} onClick={() => void load()}>
              <RefreshCw className="w-3.5 h-3.5" /> Try again
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="-m-6 md:-m-8 h-screen flex flex-col font-dm-sans bg-[#faf8ff]">
      {/* top bar */}
      <header className="shrink-0 z-30 bg-white border-b border-gray-200 px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/admin/content" className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40" aria-label="Back to website content">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="font-sora font-bold text-d2c-navy text-lg leading-tight overflow-hidden text-ellipsis whitespace-nowrap">{payload ? title : <Skeleton className="h-5 w-40" />}</h1>
            {payload && <StatusPill status={status} />}
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {record?.updated_at ? `Last saved ${fmtDate(record.updated_at)}` : 'Showing original site content'}
            {payload && <span className="hidden md:inline"> &middot; Ctrl/Cmd + S saves a draft</span>}
          </p>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <PageSwitcher beforeNavigate={() => !dirtyRef.current || window.confirm('You have unsaved changes. Leave without saving?')} />
          <a href={liveHref} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            <ExternalLink className="w-3.5 h-3.5" /> Open live page
          </a>
          <button type="button" className={btnGhost} onClick={() => void openHistory()} disabled={!payload}>
            <History className="w-3.5 h-3.5" /> History
          </button>
          <button type="button" className={cn(btnGhost, 'text-red-600 hover:bg-red-50')} onClick={() => void discard()} disabled={!payload || !!busy || (!hasDraft && !dirty)}>
            {busy === 'discard' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Undo2 className="w-3.5 h-3.5" />} Discard draft
          </button>
          <button type="button" className={btnGhost} onClick={togglePreview} aria-pressed={previewOpen} title={previewOpen ? 'Hide preview' : 'Show preview'}>
            {previewOpen ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />} Preview
          </button>
          <button type="button" className={btnGhost} onClick={() => void save('draft')} disabled={!payload || !!busy}>
            {busy === 'draft' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save draft
          </button>
          <button type="button" className={btnPrimary} onClick={() => void save('publish')} disabled={!payload || !!busy || (!dirty && !hasDraft)}>
            {busy === 'publish' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Rocket className="w-3.5 h-3.5" />} Publish
          </button>
        </div>
      </header>

      {tableMissing && (
        <div className="shrink-0 px-5 pt-4">
          <TableMissingBanner />
        </div>
      )}

      <div ref={containerRef} className="flex-1 min-h-0 flex">
        {/* form pane */}
        <div
          className="min-w-0 overflow-y-auto px-5 py-4"
          style={previewOpen ? { width: splitPx ?? '55%', flexShrink: 0 } : { flex: 1 }}
        >
          {!payload ? (
            <div className="space-y-4">
              <Skeleton className="h-11" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : (
            <SchemaForm sections={payload.definition.sections} value={value} defaults={payload.defaults} onChange={onChange} />
          )}
          <div className="h-24" />
        </div>

        {/* resizer + preview */}
        {previewOpen && (
          <>
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize preview"
              tabIndex={0}
              onPointerDown={startDrag}
              onKeyDown={(e) => {
                const w = containerRef.current?.getBoundingClientRect().width ?? 1200;
                const cur = splitPx ?? w * 0.55;
                if (e.key === 'ArrowLeft') setSplitPx(Math.max(380, cur - 30));
                if (e.key === 'ArrowRight') setSplitPx(Math.min(w - 320, cur + 30));
              }}
              className="w-1.5 shrink-0 cursor-col-resize bg-gray-200 hover:bg-d2c-royal/60 focus-visible:bg-d2c-royal outline-none transition-colors"
            />
            <div className="flex-1 min-w-0 flex flex-col bg-gray-100">
              <div className="shrink-0 flex items-center justify-between gap-2 px-3 py-2 bg-white border-b border-gray-200">
                <div className="flex rounded-lg bg-gray-100 p-0.5" role="group" aria-label="Preview device">
                  {([
                    ['desktop', Monitor, 'Desktop'],
                    ['tablet', Tablet, 'Tablet'],
                    ['mobile', Smartphone, 'Mobile'],
                  ] as const).map(([d, Icon, label]) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDevice(d)}
                      aria-pressed={device === d}
                      aria-label={label}
                      title={label}
                      className={cn('p-1.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40', device === d ? 'bg-white shadow-sm text-d2c-royal' : 'text-gray-500')}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 truncate hidden md:block">
                  Preview shows the <strong>saved draft</strong>. Save draft to refresh.
                </p>
                <button type="button" className={btnGhost} onClick={reloadPreview}>
                  <RefreshCw className={cn('w-3.5 h-3.5', previewLoading && 'animate-spin')} /> Refresh
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-auto flex justify-center p-0 md:p-3 relative">
                {payload && (
                  <iframe
                    ref={iframeRef}
                    title="Live preview"
                    src={previewSrc}
                    onLoad={onFrameLoad}
                    style={{ width: DEVICE_WIDTH[device] }}
                    className={cn('h-full bg-white border-0 transition-[width] duration-200', device !== 'desktop' && 'rounded-xl shadow-lg border border-gray-300')}
                  />
                )}
                {previewLoading && payload && (
                  <div className="absolute top-5 right-6 bg-white/90 rounded-full p-1.5 shadow">
                    <Loader2 className="w-4 h-4 animate-spin text-d2c-royal" />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* history drawer */}
      {historyOpen && (
        <Modal open={historyOpen} onClose={() => setHistoryOpen(false)} title="Version history">
          <div className="p-5">
            {versionsError ? (
              <p role="alert" className="text-sm text-red-600">{versionsError}</p>
            ) : versions === null ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : versions.length === 0 ? (
              <div className="py-10 text-center text-gray-400">
                <History className="w-8 h-8 mx-auto mb-2" aria-hidden />
                <p className="text-sm font-semibold text-gray-500">No versions yet</p>
                <p className="text-xs">A version is recorded every time you publish.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {versions.map((v) => (
                  <li key={v.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-semibold text-d2c-navy">{fmtDate(v.created_at)}</p>
                      <p className="text-[11px] text-gray-400">{v.created_by ? `by ${v.created_by}` : 'Version #' + v.id}</p>
                    </div>
                    <button type="button" className={btnGhost} onClick={() => void restore(v)} disabled={restoring !== null}>
                      {restoring === v.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Undo2 className="w-3.5 h-3.5" />} Restore
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal>
      )}

      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  );
}

function StatusPill({ status }: { status: 'unsaved' | 'draft' | 'published' }) {
  const map = {
    published: { label: 'Published', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    draft: { label: 'Draft changes', cls: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    unsaved: { label: 'Unsaved', cls: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
  }[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold', map.cls)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', map.dot)} aria-hidden /> {map.label}
    </span>
  );
}

function TableMissingBanner() {
  return (
    <div role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-5 flex gap-3 text-sm text-amber-900 max-w-3xl">
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" aria-hidden />
      <div>
        <p className="font-bold mb-1">One-time database setup needed</p>
        <p className="leading-relaxed">
          The content table does not exist yet, so edits cannot be saved. Ask your developer to run{' '}
          <code className="bg-white/70 px-1.5 py-0.5 rounded font-mono text-xs">supabase/migrations/20261117_cms.sql</code> in the Supabase SQL editor, then reload this page.
        </p>
      </div>
    </div>
  );
}
