'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Shapes, X } from 'lucide-react';
import { CmsIcon } from '@/components/cms/CmsIcon';
import { ICON_NAMES } from '@/lib/cms/icons';
import { cn } from './util';
import { Modal, btnGhost, btnPrimary, inputCls } from './ui';
import { ImageField } from './ImageField';

const PAGE = 96;

function isUrl(v: string): boolean {
  return /^https?:\/\//i.test(v) || v.startsWith('/');
}

export function IconPickerModal({
  open,
  onClose,
  value,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  value: string;
  onPick: (v: string) => void;
}) {
  const [tab, setTab] = useState<'lucide' | 'custom'>('lucide');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [custom, setCustom] = useState(isUrl(value) ? value : '');
  const sentinel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase().replace(/\s+/g, '-');
    return s ? ICON_NAMES.filter((n) => n.includes(s)) : ICON_NAMES;
  }, [q]);

  useEffect(() => {
    setLimit(PAGE);
    scroller.current?.scrollTo({ top: 0 });
  }, [q, open]);

  useEffect(() => {
    if (!open || tab !== 'lucide') return;
    const el = sentinel.current;
    const root = scroller.current;
    if (!el || !root) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setLimit((l) => l + PAGE);
      },
      { root, rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [open, tab, matches, limit]);

  const shown = matches.slice(0, limit);

  return (
    <Modal open={open} onClose={onClose} title="Choose an icon" wide>
      <div className="flex flex-col h-[70vh]">
        <div className="px-5 pt-4 flex items-center gap-2 border-b border-gray-100">
          {(['lucide', 'custom'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'px-3 py-2 text-xs font-bold border-b-2 -mb-px outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 rounded-t-lg',
                tab === t ? 'border-d2c-royal text-d2c-royal' : 'border-transparent text-gray-500 hover:text-d2c-navy',
              )}
            >
              {t === 'lucide' ? `Icon library (${ICON_NAMES.length})` : 'Custom image / SVG'}
            </button>
          ))}
        </div>
        {tab === 'lucide' ? (
          <>
            <div className="px-5 py-3 relative">
              <Search className="w-4 h-4 absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search icons, e.g. graduation, phone, shield"
                aria-label="Search icons"
                className={cn(inputCls, 'pl-9')}
              />
            </div>
            <div ref={scroller} className="flex-1 min-h-0 overflow-y-auto px-5 pb-5">
              {matches.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-16">No icons match &quot;{q}&quot;</p>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2">
                  {shown.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        onPick(n);
                        onClose();
                      }}
                      title={n}
                      className={cn(
                        'flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-[10px] text-gray-600 hover:border-d2c-royal hover:bg-d2c-royal/5 outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40',
                        value === n ? 'border-d2c-royal bg-d2c-royal/10 text-d2c-royal' : 'border-gray-200',
                      )}
                    >
                      <CmsIcon name={n} size={22} className="text-d2c-navy" />
                      <span className="w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{n}</span>
                    </button>
                  ))}
                </div>
              )}
              {shown.length < matches.length && <div ref={sentinel} className="h-8" />}
              <p className="text-[11px] text-gray-400 text-center pt-3">
                Showing {shown.length} of {matches.length}
              </p>
            </div>
          </>
        ) : (
          <div className="p-5 space-y-4 overflow-y-auto">
            <p className="text-xs text-gray-500">Upload or pick your own icon (SVG or PNG works best). It will be used in place of a library icon.</p>
            <ImageField value={custom} onChange={setCustom} folder="icons" />
            <button
              type="button"
              className={btnPrimary}
              disabled={!custom}
              onClick={() => {
                onPick(custom);
                onClose();
              }}
            >
              Use this image
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export function IconField({ value, onChange }: { value: string | undefined; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const v = value || '';
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Change icon"
        className="w-14 h-14 rounded-xl border border-gray-200 bg-gray-50 hover:border-d2c-royal flex items-center justify-center text-d2c-navy outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 transition-colors"
      >
        {v ? <CmsIcon name={v} size={26} className="text-d2c-navy" fallback={Shapes} /> : <Shapes className="w-5 h-5 text-gray-300" aria-hidden />}
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-mono text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap" title={v}>
          {v || 'No icon selected'}
        </p>
        <div className="flex gap-1.5 mt-1.5">
          <button type="button" className={btnGhost} onClick={() => setOpen(true)}>
            {v ? 'Change icon' : 'Choose icon'}
          </button>
          {v && (
            <button type="button" className={cn(btnGhost, 'text-red-600 hover:bg-red-50')} onClick={() => onChange('')}>
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>
      <IconPickerModal open={open} onClose={() => setOpen(false)} value={v} onPick={onChange} />
    </div>
  );
}
