'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { CheckCircle2, ChevronDown, Globe, AlertTriangle } from 'lucide-react';
import type { SeoFields } from '@/lib/cms/types';
import { cn } from './util';
import { inputCls } from './ui';
import { ImageField } from './ImageField';
import { StringListWidget, SwitchWidget } from './widgets';

function Meter({ n, min, max }: { n: number; min: number; max: number }) {
  const state = n === 0 ? 'empty' : n < min ? 'short' : n > max ? 'long' : 'good';
  const pct = Math.min(100, (n / (max * 1.25)) * 100);
  const color = state === 'good' ? 'bg-emerald-500' : state === 'empty' ? 'bg-gray-300' : 'bg-amber-500';
  const text =
    state === 'good' ? 'Good length' : state === 'empty' ? 'Empty' : state === 'short' ? `Short (aim for ${min}-${max})` : `Too long (aim for ${min}-${max})`;
  return (
    <div className="mt-1.5" aria-live="polite">
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-[11px] mt-1">
        <span className={state === 'good' ? 'text-emerald-600' : 'text-gray-500'}>{text}</span>
        <span className="font-mono text-gray-400 tabular-nums">{n}</span>
      </div>
    </div>
  );
}

function Row({ label, children, htmlFor }: { label: string; children: ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-d2c-navy mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function SubPanel({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-xs font-bold text-d2c-navy outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 rounded-xl"
      >
        {title}
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  );
}

function clip(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
}

export function SeoField({ value, onChange }: { value: SeoFields | undefined; onChange: (v: SeoFields) => void }) {
  const v: SeoFields = value || {};
  const set = (patch: Partial<SeoFields>) => onChange({ ...v, ...patch });
  const setOg = (patch: NonNullable<SeoFields['og']>) => set({ og: { ...(v.og || {}), ...patch } });
  const setTw = (patch: NonNullable<SeoFields['twitter']>) => set({ twitter: { ...(v.twitter || {}), ...patch } });

  const jsonState = useMemo(() => {
    const raw = (v.jsonLd || '').trim();
    if (!raw) return { ok: true, msg: '' };
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null) return { ok: false, msg: 'Must be a JSON object or an array of objects' };
      return { ok: true, msg: Array.isArray(parsed) ? `Valid JSON-LD (${parsed.length} items)` : 'Valid JSON-LD' };
    } catch (e) {
      return { ok: false, msg: e instanceof Error ? e.message : 'Invalid JSON' };
    }
  }, [v.jsonLd]);

  const title = v.title || '';
  const desc = v.description || '';
  const canonical = v.canonical || '';
  const shownUrl = (canonical || 'https://www.direct2campus.com').replace(/^https?:\/\//, '').replace(/\/$/, '').split('/').join(' › ');
  const ogTitle = v.og?.title || title;
  const ogDesc = v.og?.description || desc;
  const ogImage = v.og?.image || '';
  const twCard = v.twitter?.card || 'summary_large_image';
  const twTitle = v.twitter?.title || ogTitle;
  const twDesc = v.twitter?.description || ogDesc;
  const twImage = v.twitter?.image || ogImage;
  const [socialTab, setSocialTab] = useState<'og' | 'twitter'>('og');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_minmax(0,380px)] gap-5">
        <div className="space-y-4 min-w-0">
          <Row label="Meta title">
            <input value={title} onChange={(e) => set({ title: e.target.value })} className={inputCls} placeholder="Page title shown in Google" />
            <Meter n={title.length} min={50} max={60} />
          </Row>
          <Row label="Meta description">
            <textarea value={desc} onChange={(e) => set({ description: e.target.value })} rows={3} className={cn(inputCls, 'resize-y')} placeholder="Short summary shown under the title in search results" />
            <Meter n={desc.length} min={120} max={160} />
          </Row>
          <Row label="Keywords">
            <StringListWidget value={v.keywords} onChange={(k) => set({ keywords: k })} placeholder="Add a keyword and press Enter" />
          </Row>
          <Row label="Canonical URL">
            <input value={canonical} onChange={(e) => set({ canonical: e.target.value })} className={cn(inputCls, 'font-mono text-xs')} placeholder="https://www.direct2campus.com/page" />
          </Row>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
              <SwitchWidget value={v.robots?.index ?? true} onChange={(b) => set({ robots: { ...(v.robots || {}), index: b } })} label="Allow indexing" />
              Allow search engines to index
            </label>
            <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
              <SwitchWidget value={v.robots?.follow ?? true} onChange={(b) => set({ robots: { ...(v.robots || {}), follow: b } })} label="Follow links" />
              Allow following links
            </label>
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3">Google preview</p>
            <div className="font-sans">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Globe className="w-3.5 h-3.5 text-gray-500" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-800 leading-tight">Direct2Campus</p>
                  <p className="text-[11px] text-gray-500 leading-tight overflow-hidden text-ellipsis whitespace-nowrap">{shownUrl}</p>
                </div>
              </div>
              <p className="text-[19px] leading-snug text-[#1a0dab] font-normal">{title ? clip(title, 60) : 'Untitled page'}</p>
              <p className="text-[13px] leading-snug text-[#4d5156] mt-0.5">{desc ? clip(desc, 160) : 'No description set. Search engines will pick text from the page.'}</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Social share preview</p>
              <div className="flex rounded-lg bg-gray-100 p-0.5 text-[11px] font-semibold" role="tablist">
                {(['og', 'twitter'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={socialTab === t}
                    onClick={() => setSocialTab(t)}
                    className={cn('px-2.5 py-1 rounded-md', socialTab === t ? 'bg-white shadow-sm text-d2c-navy' : 'text-gray-500')}
                  >
                    {t === 'og' ? 'Facebook / LinkedIn' : 'X / Twitter'}
                  </button>
                ))}
              </div>
            </div>
            {(() => {
              const img = socialTab === 'og' ? ogImage : twImage;
              const t = socialTab === 'og' ? ogTitle : twTitle;
              const d = socialTab === 'og' ? ogDesc : twDesc;
              const small = socialTab === 'twitter' && twCard === 'summary';
              return (
                <div className={cn('rounded-xl border border-gray-200 overflow-hidden bg-gray-50', small && 'flex')}>
                  <div className={cn('bg-gray-200 flex items-center justify-center text-[11px] text-gray-400', small ? 'w-28 h-28 shrink-0' : 'aspect-[1.91/1] w-full')}>
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    ) : (
                      'No image'
                    )}
                  </div>
                  <div className="p-3 min-w-0">
                    <p className="text-[10px] uppercase text-gray-500 tracking-wide">direct2campus.com</p>
                    <p className="text-sm font-bold text-gray-900 leading-snug">{t ? clip(t, 70) : 'Untitled page'}</p>
                    <p className="text-xs text-gray-600 leading-snug mt-0.5">{d ? clip(d, 120) : ''}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      <SubPanel title="Open Graph (Facebook, LinkedIn, WhatsApp)">
        <Row label="OG title (falls back to meta title)">
          <input value={v.og?.title || ''} onChange={(e) => setOg({ title: e.target.value })} className={inputCls} />
        </Row>
        <Row label="OG description (falls back to meta description)">
          <textarea value={v.og?.description || ''} onChange={(e) => setOg({ description: e.target.value })} rows={2} className={cn(inputCls, 'resize-y')} />
        </Row>
        <Row label="OG image (1200 x 630 recommended)">
          <ImageField value={v.og?.image} onChange={(img) => setOg({ image: img })} folder="seo" />
        </Row>
        <Row label="OG type">
          <select value={v.og?.type || 'website'} onChange={(e) => setOg({ type: e.target.value as 'website' | 'article' })} className={cn(inputCls, 'max-w-xs')}>
            <option value="website">website</option>
            <option value="article">article</option>
          </select>
        </Row>
      </SubPanel>

      <SubPanel title="Twitter / X card">
        <Row label="Card type">
          <select value={twCard} onChange={(e) => setTw({ card: e.target.value as 'summary' | 'summary_large_image' })} className={cn(inputCls, 'max-w-xs')}>
            <option value="summary_large_image">Large image</option>
            <option value="summary">Summary</option>
          </select>
        </Row>
        <Row label="Twitter title">
          <input value={v.twitter?.title || ''} onChange={(e) => setTw({ title: e.target.value })} className={inputCls} />
        </Row>
        <Row label="Twitter description">
          <textarea value={v.twitter?.description || ''} onChange={(e) => setTw({ description: e.target.value })} rows={2} className={cn(inputCls, 'resize-y')} />
        </Row>
        <Row label="Twitter image">
          <ImageField value={v.twitter?.image} onChange={(img) => setTw({ image: img })} folder="seo" />
        </Row>
      </SubPanel>

      <SubPanel title="Structured data (JSON-LD)">
        <Row label="Extra JSON-LD (one object or an array)">
          <textarea
            value={v.jsonLd || ''}
            onChange={(e) => set({ jsonLd: e.target.value })}
            rows={8}
            spellCheck={false}
            aria-invalid={!jsonState.ok}
            placeholder='{"@context":"https://schema.org","@type":"Organization"}'
            className={cn(inputCls, 'font-mono text-xs resize-y', !jsonState.ok && 'border-red-300 focus:border-red-400 focus:ring-red-200')}
          />
          {(v.jsonLd || '').trim() && (
            <p className={cn('mt-1.5 text-xs flex items-center gap-1.5', jsonState.ok ? 'text-emerald-600' : 'text-red-600')}>
              {jsonState.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              {jsonState.msg}
            </p>
          )}
        </Row>
      </SubPanel>
    </div>
  );
}
