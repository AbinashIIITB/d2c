'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, Copy, ImageIcon, Loader2, Search, Trash2, UploadCloud } from 'lucide-react';
import { api, cn, jsonInit } from './util';
import { Modal, Skeleton, btnGhost, inputCls } from './ui';

export interface MediaItem {
  name: string;
  path: string;
  url: string;
  size: number;
  created_at: string;
}

function fmtSize(n: number): string {
  if (!n) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export async function uploadFile(file: File, folder = 'cms'): Promise<{ url: string; path: string }> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('folder', folder);
  return api<{ url: string; path: string }>('/api/admin/upload', { method: 'POST', body: fd });
}

export function MediaLibrary({
  onSelect,
  folder = 'cms',
  className,
}: {
  /** When set, the library is in picker mode and shows a "Use" button per item. */
  onSelect?: (url: string) => void;
  folder?: string;
  className?: string;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [uploading, setUploading] = useState(0);
  const [drag, setDrag] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(search.trim()), 250);
    return () => window.clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = debounced ? `?search=${encodeURIComponent(debounced)}` : '';
      const res = await api<{ items: MediaItem[] }>(`/api/admin/media${q}`);
      setItems(res.items || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load media');
    } finally {
      setLoading(false);
    }
  }, [debounced]);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(() => {
    const q = debounced.toLowerCase();
    return q ? items.filter((i) => i.name.toLowerCase().includes(q) || i.path.toLowerCase().includes(q)) : items;
  }, [items, debounced]);

  async function handleFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/') || /\.(svg|ico|avif)$/i.test(f.name));
    if (!list.length) return;
    setError(null);
    for (const f of list) {
      setUploading((n) => n + 1);
      try {
        await uploadFile(f, folder);
      } catch (e) {
        setError(`${f.name}: ${e instanceof Error ? e.message : 'upload failed'}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
    void load();
  }

  async function remove(item: MediaItem) {
    try {
      await api('/api/admin/media', jsonInit('DELETE', { path: item.path }));
      setItems((prev) => prev.filter((i) => i.path !== item.path));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setConfirmDel(null);
    }
  }

  async function copy(url: string) {
    try {
      const abs = url.startsWith('http') ? url : `${window.location.origin}${url}`;
      await navigator.clipboard.writeText(abs);
      setCopied(url);
      window.setTimeout(() => setCopied((c) => (c === url ? null : c)), 1500);
    } catch {
      setError('Copy failed. Select the URL manually.');
    }
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images by name"
            aria-label="Search media"
            className={cn(inputCls, 'pl-9')}
          />
        </div>
        <button type="button" className={btnGhost} onClick={() => fileRef.current?.click()}>
          {uploading > 0 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
          Upload images
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.svg"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) void handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          void handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          'rounded-2xl border-2 border-dashed px-4 py-5 text-center text-xs transition-colors',
          drag ? 'border-d2c-royal bg-d2c-royal/5 text-d2c-royal' : 'border-gray-200 text-gray-500',
        )}
      >
        {uploading > 0 ? `Uploading ${uploading} file${uploading > 1 ? 's' : ''}...` : 'Drop images here to upload'}
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-14 text-gray-400">
          <ImageIcon className="w-10 h-10" aria-hidden />
          <p className="text-sm font-semibold text-gray-500">{debounced ? 'No images match your search' : 'No images yet'}</p>
          <p className="text-xs">Upload an image to get started.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {visible.map((it) => (
            <li key={it.path} className="group rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col">
              <div className="aspect-square bg-[repeating-conic-gradient(#f1f1f5_0%_25%,#fff_0%_50%)] bg-[length:16px_16px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.url} alt={it.name} loading="lazy" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="p-2.5 space-y-2">
                <p className="text-[11px] font-semibold text-d2c-navy truncate" title={it.name}>
                  {it.name}
                </p>
                <p className="text-[10px] text-gray-400">{fmtSize(it.size)}</p>
                <div className="flex items-center gap-1.5">
                  {onSelect && (
                    <button
                      type="button"
                      onClick={() => onSelect(it.url)}
                      className="flex-1 text-[11px] font-bold rounded-lg bg-d2c-royal text-white py-1.5 hover:bg-d2c-navy focus-visible:ring-2 focus-visible:ring-d2c-royal/40 outline-none"
                    >
                      Use
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => void copy(it.url)}
                    aria-label={`Copy URL of ${it.name}`}
                    title="Copy URL"
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40"
                  >
                    {copied === it.url ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  {confirmDel === it.path ? (
                    <button
                      type="button"
                      onClick={() => void remove(it)}
                      className="px-2 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold"
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDel(it.path)}
                      aria-label={`Delete ${it.name}`}
                      title="Delete"
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MediaLibraryModal({
  open,
  onClose,
  onSelect,
  folder,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  folder?: string;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Media library" wide>
      <div className="p-5">
        <MediaLibrary
          folder={folder}
          onSelect={(url) => {
            onSelect(url);
            onClose();
          }}
        />
      </div>
    </Modal>
  );
}
