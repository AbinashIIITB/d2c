'use client';

import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Bold, Eye, Italic, Link2, List, Pilcrow, Plus, X } from 'lucide-react';
import type { LinkValue } from '@/lib/cms/types';
import { cn } from './util';
import { btnGhost, inputCls } from './ui';

export function CharCount({ n }: { n: number }) {
  return <span className="text-[11px] text-gray-400 font-mono tabular-nums">{n} chars</span>;
}

interface BaseProps<T> {
  value: T | undefined;
  onChange: (v: T) => void;
  placeholder?: string;
  id?: string;
}

export function TextWidget({ value, onChange, placeholder, id, type = 'text' }: BaseProps<string> & { type?: 'text' | 'url' }) {
  const v = value ?? '';
  return (
    <div>
      <input
        id={id}
        type={type === 'url' ? 'text' : 'text'}
        inputMode={type === 'url' ? 'url' : undefined}
        value={v}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(inputCls, type === 'url' && 'font-mono text-xs')}
      />
      <div className="flex justify-end mt-1">
        <CharCount n={v.length} />
      </div>
    </div>
  );
}

export function TextareaWidget({ value, onChange, placeholder, id, rows = 4 }: BaseProps<string> & { rows?: number }) {
  const v = value ?? '';
  return (
    <div>
      <textarea
        id={id}
        rows={rows}
        value={v}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(inputCls, 'leading-relaxed resize-y min-h-[88px]')}
      />
      <div className="flex justify-end mt-1">
        <CharCount n={v.length} />
      </div>
    </div>
  );
}

export function RichTextWidget({ value, onChange, placeholder, id }: BaseProps<string>) {
  const v = value ?? '';
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  function wrap(open: string, close: string, fallback = 'text') {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    const sel = v.slice(s, e) || fallback;
    const next = v.slice(0, s) + open + sel + close + v.slice(e);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + open.length, s + open.length + sel.length);
    });
  }

  const tools: { label: string; icon: React.ReactNode; run: () => void }[] = [
    { label: 'Bold', icon: <Bold className="w-3.5 h-3.5" />, run: () => wrap('<strong>', '</strong>') },
    { label: 'Italic', icon: <Italic className="w-3.5 h-3.5" />, run: () => wrap('<em>', '</em>') },
    {
      label: 'Link',
      icon: <Link2 className="w-3.5 h-3.5" />,
      run: () => {
        const href = window.prompt('Link URL', 'https://');
        if (href) wrap(`<a href="${href.replace(/"/g, '&quot;')}">`, '</a>', 'link text');
      },
    },
    { label: 'Paragraph', icon: <Pilcrow className="w-3.5 h-3.5" />, run: () => wrap('<p>', '</p>') },
    { label: 'Bullet list', icon: <List className="w-3.5 h-3.5" />, run: () => wrap('<ul>\n  <li>', '</li>\n</ul>', 'item') },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white focus-within:border-d2c-royal focus-within:ring-2 focus-within:ring-d2c-royal/20 transition-colors">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-100 bg-gray-50/70 rounded-t-xl">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            title={t.label}
            aria-label={t.label}
            onClick={t.run}
            className="p-1.5 rounded-md text-gray-600 hover:bg-white hover:text-d2c-royal outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40"
          >
            {t.icon}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          aria-pressed={preview}
          className={cn(
            'ml-auto flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40',
            preview ? 'bg-d2c-royal text-white' : 'text-gray-600 hover:bg-white',
          )}
        >
          <Eye className="w-3.5 h-3.5" /> Preview
        </button>
      </div>
      {preview ? (
        <div
          className="px-4 py-3 text-sm leading-relaxed min-h-[120px] [&_a]:text-d2c-royal [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2"
          dangerouslySetInnerHTML={{ __html: v }}
        />
      ) : (
        <textarea
          ref={ref}
          id={id}
          rows={6}
          value={v}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? 'HTML content'}
          className="w-full text-sm px-4 py-3 outline-none leading-relaxed font-mono text-[13px] resize-y min-h-[120px] rounded-b-xl bg-transparent"
        />
      )}
      <div className="flex justify-end px-3 pb-1.5">
        <CharCount n={v.length} />
      </div>
    </div>
  );
}

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function expandHex(h: string): string {
  if (/^#[0-9a-f]{3}$/i.test(h)) return '#' + h.slice(1).split('').map((c) => c + c).join('');
  return h;
}

export function ColorWidget({ value, onChange, id }: BaseProps<string>) {
  const v = value ?? '';
  const valid = HEX.test(v);
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        aria-label="Pick colour"
        value={valid ? expandHex(v) : '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="w-11 h-11 rounded-xl border border-gray-200 bg-white p-1 cursor-pointer"
      />
      <input id={id} value={v} onChange={(e) => onChange(e.target.value)} placeholder="#1B1F5E" className={cn(inputCls, 'font-mono text-xs max-w-[180px]')} />
      {v && !valid && <span className="text-[11px] text-gray-400">Custom CSS value</span>}
    </div>
  );
}

export function NumberWidget({ value, onChange, placeholder, id }: BaseProps<number | undefined>) {
  return (
    <input
      id={id}
      type="number"
      value={value === undefined || value === null || Number.isNaN(value) ? '' : value}
      onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
      placeholder={placeholder}
      className={cn(inputCls, 'max-w-[220px]')}
    />
  );
}

export function SwitchWidget({ value, onChange, label }: { value: boolean | undefined; onChange: (v: boolean) => void; label?: string }) {
  const on = !!value;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'relative w-11 h-6 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 focus-visible:ring-offset-2 shrink-0',
        on ? 'bg-d2c-royal' : 'bg-gray-300',
      )}
    >
      <span className={cn('absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', on && 'translate-x-5')} />
    </button>
  );
}

export function DateWidget({ value, onChange, id }: BaseProps<string>) {
  return (
    <input
      id={id}
      type="date"
      value={(value ?? '').slice(0, 10)}
      onChange={(e) => onChange(e.target.value)}
      className={cn(inputCls, 'max-w-[220px]')}
    />
  );
}

export function SelectWidget({
  value,
  onChange,
  options,
  id,
}: BaseProps<string> & { options: { label: string; value: string }[] }) {
  return (
    <select id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={cn(inputCls, 'max-w-sm')}>
      {!options.some((o) => o.value === (value ?? '')) && <option value={value ?? ''}>{value || 'Select...'}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function StringListWidget({
  value,
  onChange,
  placeholder,
}: {
  value: string[] | undefined;
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const items = Array.isArray(value) ? value : [];
  const [draft, setDraft] = useState('');
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  function add() {
    const parts = draft
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    onChange([...items, ...parts]);
    setDraft('');
  }
  function move(i: number, to: number) {
    if (to < 0 || to >= items.length || to === i) return;
    const next = [...items];
    const [it] = next.splice(i, 1);
    next.splice(to, 0, it);
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {items.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {items.map((it, i) => (
            <li
              key={`${i}-${it}`}
              draggable
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIdx !== null) move(dragIdx, i);
                setDragIdx(null);
              }}
              className="group/chip flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full bg-d2c-ice text-d2c-navy text-xs font-medium cursor-grab"
            >
              <input
                value={it}
                size={Math.max(4, it.length)}
                onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
                aria-label={`Item ${i + 1}`}
                className="bg-transparent outline-none"
              />
              <button type="button" aria-label="Move earlier" onClick={() => move(i, i - 1)} className="p-0.5 rounded-full text-gray-500 hover:text-d2c-royal opacity-0 group-hover/chip:opacity-100 focus:opacity-100">
                <ArrowUp className="w-3 h-3 -rotate-90" />
              </button>
              <button type="button" aria-label="Move later" onClick={() => move(i, i + 1)} className="p-0.5 rounded-full text-gray-500 hover:text-d2c-royal opacity-0 group-hover/chip:opacity-100 focus:opacity-100">
                <ArrowDown className="w-3 h-3 -rotate-90" />
              </button>
              <button type="button" aria-label={`Remove ${it}`} onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-0.5 rounded-full text-gray-500 hover:text-red-600 hover:bg-white">
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder ?? 'Type and press Enter (comma separates several)'}
          className={inputCls}
        />
        <button type="button" onClick={add} className={btnGhost} disabled={!draft.trim()}>
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </div>
  );
}

export function LinkWidget({ value, onChange }: { value: LinkValue | undefined; onChange: (v: LinkValue) => void }) {
  const v: LinkValue = { label: '', href: '', newTab: false, ...(value || {}) };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-[11px] font-semibold text-gray-500 mb-1">Label</label>
        <input value={v.label} onChange={(e) => onChange({ ...v, label: e.target.value })} className={inputCls} aria-label="Link label" />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-gray-500 mb-1">URL</label>
        <input value={v.href} onChange={(e) => onChange({ ...v, href: e.target.value })} placeholder="/page or https://" className={cn(inputCls, 'font-mono text-xs')} aria-label="Link URL" />
      </div>
      <label className="sm:col-span-2 flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer w-fit">
        <SwitchWidget value={v.newTab} onChange={(b) => onChange({ ...v, newTab: b })} label="Open in new tab" />
        Open in a new tab
      </label>
    </div>
  );
}
