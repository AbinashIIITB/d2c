'use client';

import { useRef, useState } from 'react';
import { ImageOff, Library, Link2, Loader2, Trash2, Upload } from 'lucide-react';
import { cn } from './util';
import { btnGhost, inputCls } from './ui';
import { MediaLibraryModal, uploadFile } from './MediaLibrary';

export function ImageField({
  value,
  onChange,
  folder = 'cms',
  compact,
  label,
}: {
  value: string | undefined;
  onChange: (v: string) => void;
  folder?: string;
  compact?: boolean;
  label?: string;
}) {
  const [libOpen, setLibOpen] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [broken, setBroken] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const v = value || '';

  async function onFile(f: File) {
    setError(null);
    setUploading(true);
    try {
      const res = await uploadFile(f, folder);
      onChange(res.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  const showBroken = !v || broken === v;

  return (
    <div className="space-y-2.5">
      <div className="flex gap-3 items-start">
        <div
          className={cn(
            'shrink-0 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center bg-[repeating-conic-gradient(#f1f1f5_0%_25%,#fff_0%_50%)] bg-[length:14px_14px]',
            compact ? 'w-16 h-16' : 'w-28 h-20',
          )}
        >
          {showBroken ? (
            <ImageOff className="w-5 h-5 text-gray-300" aria-label={v ? 'Image failed to load' : 'No image'} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v} alt={label || 'Preview'} onError={() => setBroken(v)} className="max-w-full max-h-full object-contain" />
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            <button type="button" className={btnGhost} onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />} Upload
            </button>
            <button type="button" className={btnGhost} onClick={() => setLibOpen(true)}>
              <Library className="w-3.5 h-3.5" /> Library
            </button>
            <button type="button" className={btnGhost} onClick={() => setUrlMode((m) => !m)} aria-pressed={urlMode}>
              <Link2 className="w-3.5 h-3.5" /> Paste URL
            </button>
            {v && (
              <button
                type="button"
                className={cn(btnGhost, 'text-red-600 hover:bg-red-50')}
                onClick={() => {
                  onChange('');
                  setBroken(null);
                }}
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
          {(urlMode || (v && !compact)) && (
            <input
              value={v}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... or /images/photo.jpg"
              aria-label="Image URL"
              className={cn(inputCls, 'text-xs py-2 font-mono')}
            />
          )}
          {error && (
            <p role="alert" className="text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.svg"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void onFile(f);
          e.target.value = '';
        }}
      />
      <MediaLibraryModal open={libOpen} onClose={() => setLibOpen(false)} onSelect={onChange} folder={folder} />
    </div>
  );
}
