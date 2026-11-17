'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Copy, GripVertical, Plus, RotateCcw, Search, Trash2, X } from 'lucide-react';
import type { Field, SchemaSection } from '@/lib/cms/types';
import { clone, cn, deepEqual, emptyForFields, getIn, pathId, stripHtml, type Path } from './util';
import { btnGhost } from './ui';
import { ImageField } from './ImageField';
import { IconField } from './IconField';
import { SeoField } from './SeoField';
import {
  ColorWidget,
  DateWidget,
  LinkWidget,
  NumberWidget,
  RichTextWidget,
  SelectWidget,
  StringListWidget,
  SwitchWidget,
  TextareaWidget,
  TextWidget,
} from './widgets';

interface FormCtxValue {
  root: any;
  defaults: any;
  onChange: (path: Path, value: any) => void;
}
const FormCtx = createContext<FormCtxValue | null>(null);
function useForm(): FormCtxValue {
  const c = useContext(FormCtx);
  if (!c) throw new Error('FormCtx missing');
  return c;
}

// ---------------------------------------------------------------- search

function fieldMatches(f: Field, q: string): boolean {
  if (!q) return true;
  if (f.label.toLowerCase().includes(q) || f.key.toLowerCase().includes(q)) return true;
  if (f.type === 'group' || f.type === 'list') return f.fields.some((c) => fieldMatches(c, q));
  return false;
}

// ---------------------------------------------------------------- field shell

function FieldShell({ field, path, children, inline }: { field: Field; path: Path; children: React.ReactNode; inline?: boolean }) {
  const { root, defaults, onChange } = useForm();
  const value = getIn(root, path);
  const def = getIn(defaults, path);
  const changed = def !== undefined && !deepEqual(def, value);
  const id = `f-${pathId(path)}`;
  return (
    <div className="group/field" data-field={pathId(path)}>
      <div className="flex items-center justify-between gap-2 mb-1.5 min-h-[20px]">
        <label htmlFor={id} className="text-xs font-bold text-d2c-navy tracking-wide">
          {field.label}
        </label>
        <div className="flex items-center gap-2">
          {changed && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Differs from the original content" aria-hidden />}
          {changed && (
            <button
              type="button"
              onClick={() => onChange(path, clone(def))}
              title="Reset to default"
              aria-label={`Reset ${field.label} to default`}
              className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-d2c-royal opacity-0 group-hover/field:opacity-100 focus:opacity-100 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 rounded"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>
      {inline ? <div id={id}>{children}</div> : children}
      {field.help && <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">{field.help}</p>}
    </div>
  );
}

// ---------------------------------------------------------------- field renderer

function FieldRenderer({ field, path, q }: { field: Field; path: Path; q: string }) {
  const { root, onChange } = useForm();
  const value = getIn(root, path);
  const set = (v: any) => onChange(path, v);
  const id = `f-${pathId(path)}`;

  switch (field.type) {
    case 'text':
      return (
        <FieldShell field={field} path={path}>
          <TextWidget id={id} value={value} onChange={set} placeholder={field.placeholder} />
        </FieldShell>
      );
    case 'url':
      return (
        <FieldShell field={field} path={path}>
          <TextWidget id={id} type="url" value={value} onChange={set} placeholder={field.placeholder ?? 'https://... or /path'} />
        </FieldShell>
      );
    case 'textarea':
      return (
        <FieldShell field={field} path={path}>
          <TextareaWidget id={id} value={value} onChange={set} placeholder={field.placeholder} />
        </FieldShell>
      );
    case 'richtext':
      return (
        <FieldShell field={field} path={path}>
          <RichTextWidget id={id} value={value} onChange={set} placeholder={field.placeholder} />
        </FieldShell>
      );
    case 'color':
      return (
        <FieldShell field={field} path={path}>
          <ColorWidget id={id} value={value} onChange={set} />
        </FieldShell>
      );
    case 'number':
      return (
        <FieldShell field={field} path={path}>
          <NumberWidget id={id} value={value} onChange={set} placeholder={field.placeholder} />
        </FieldShell>
      );
    case 'boolean':
      return (
        <FieldShell field={field} path={path} inline>
          <SwitchWidget value={value} onChange={set} label={field.label} />
        </FieldShell>
      );
    case 'date':
      return (
        <FieldShell field={field} path={path}>
          <DateWidget id={id} value={value} onChange={set} />
        </FieldShell>
      );
    case 'select':
      return (
        <FieldShell field={field} path={path}>
          <SelectWidget id={id} value={value} onChange={set} options={field.options} />
        </FieldShell>
      );
    case 'stringList':
      return (
        <FieldShell field={field} path={path} inline>
          <StringListWidget value={value} onChange={set} placeholder={field.placeholder} />
        </FieldShell>
      );
    case 'link':
      return (
        <FieldShell field={field} path={path} inline>
          <LinkWidget value={value} onChange={set} />
        </FieldShell>
      );
    case 'image':
      return (
        <FieldShell field={field} path={path} inline>
          <ImageField value={value} onChange={set} label={field.label} />
        </FieldShell>
      );
    case 'icon':
      return (
        <FieldShell field={field} path={path} inline>
          <IconField value={value} onChange={set} />
        </FieldShell>
      );
    case 'seo':
      return (
        <FieldShell field={field} path={path} inline>
          <SeoField value={value} onChange={set} />
        </FieldShell>
      );
    case 'group':
      return (
        <FieldShell field={field} path={path} inline>
          <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
            <FieldList fields={field.fields} path={path} q={fieldMatches(field, q) && !field.fields.some((c) => fieldMatches(c, q)) ? '' : q} />
          </div>
        </FieldShell>
      );
    case 'list':
      return <ListField field={field} path={path} />;
    default:
      return null;
  }
}

function FieldList({ fields, path, q }: { fields: Field[]; path: Path; q: string }) {
  const visible = fields.filter((f) => fieldMatches(f, q));
  return (
    <div className="space-y-5">
      {visible.map((f) => (
        <FieldRenderer key={f.key} field={f} path={[...path, f.key]} q={q} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- list

let idSeq = 1;

function ListField({ field, path }: { field: Extract<Field, { type: 'list' }>; path: Path }) {
  const { root, onChange } = useForm();
  const raw = getIn(root, path);
  const items: any[] = Array.isArray(raw) ? raw : [];
  const idsRef = useRef<number[]>([]);
  if (idsRef.current.length !== items.length) idsRef.current = items.map((_, i) => idsRef.current[i] ?? idSeq++);
  const ids = idsRef.current;
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [confirm, setConfirm] = useState<number | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const noun = field.itemLabel || 'item';

  const commit = (nextItems: any[], nextIds: number[]) => {
    idsRef.current = nextIds;
    onChange(path, nextItems);
  };
  const toggle = (id: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    const ni = [...items];
    const nd = [...ids];
    const [a] = ni.splice(from, 1);
    const [b] = nd.splice(from, 1);
    ni.splice(to, 0, a);
    nd.splice(to, 0, b);
    commit(ni, nd);
  };
  const add = () => {
    const id = idSeq++;
    commit([...items, emptyForFields(field.fields)], [...ids, id]);
    setOpen((s) => new Set(s).add(id));
  };
  const duplicate = (i: number) => {
    const id = idSeq++;
    const ni = [...items];
    const nd = [...ids];
    ni.splice(i + 1, 0, clone(items[i]));
    nd.splice(i + 1, 0, id);
    commit(ni, nd);
    setOpen((s) => new Set(s).add(id));
  };
  const remove = (i: number) => {
    commit(items.filter((_, j) => j !== i), ids.filter((_, j) => j !== i));
    setConfirm(null);
  };

  const titleOf = (it: any, i: number): string => {
    const t = field.titleKey ? it?.[field.titleKey] : undefined;
    if (typeof t === 'string' && t.trim()) return stripHtml(t);
    if (t && typeof t === 'object' && typeof t.label === 'string' && t.label) return t.label;
    return `${noun.charAt(0).toUpperCase()}${noun.slice(1)} ${i + 1}`;
  };

  const allOpen = items.length > 0 && ids.every((id) => open.has(id));

  return (
    <FieldShell field={field} path={path} inline>
      <div className="space-y-2">
        {items.length > 0 && (
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span>
              {items.length} {noun}
              {items.length === 1 ? '' : 's'}
            </span>
            <button type="button" className="font-semibold hover:text-d2c-royal" onClick={() => setOpen(allOpen ? new Set() : new Set(ids))}>
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
        )}
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 py-6 text-center text-xs text-gray-400">No {noun}s yet.</div>
        )}
        {items.map((it, i) => {
          const id = ids[i];
          const isOpen = open.has(id);
          return (
            <div
              key={id}
              onDragOver={(e) => {
                if (dragIdx === null) return;
                e.preventDefault();
                setOverIdx(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIdx !== null) move(dragIdx, i);
                setDragIdx(null);
                setOverIdx(null);
              }}
              className={cn(
                'rounded-xl border bg-white transition-shadow',
                overIdx === i && dragIdx !== null && dragIdx !== i ? 'border-d2c-royal shadow-md' : 'border-gray-200',
                dragIdx === i && 'opacity-50',
              )}
            >
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <span
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = 'move';
                    setDragIdx(i);
                  }}
                  onDragEnd={() => {
                    setDragIdx(null);
                    setOverIdx(null);
                  }}
                  title="Drag to reorder"
                  className="p-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4" aria-hidden />
                </span>
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-expanded={isOpen}
                  className="flex-1 min-w-0 flex items-center gap-2 text-left py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 rounded-lg"
                >
                  <span className="text-[10px] font-mono text-gray-400 w-5 shrink-0 text-right">{i + 1}</span>
                  <span className="text-sm font-semibold text-d2c-navy overflow-hidden text-ellipsis whitespace-nowrap">{titleOf(it, i)}</span>
                  <ChevronDown className={cn('w-4 h-4 text-gray-400 shrink-0 transition-transform', isOpen && 'rotate-180')} />
                </button>
                <IconBtn label="Move up" onClick={() => move(i, i - 1)} disabled={i === 0}>
                  <ArrowUp className="w-3.5 h-3.5" />
                </IconBtn>
                <IconBtn label="Move down" onClick={() => move(i, i + 1)} disabled={i === items.length - 1}>
                  <ArrowDown className="w-3.5 h-3.5" />
                </IconBtn>
                <IconBtn label={`Duplicate ${noun}`} onClick={() => duplicate(i)}>
                  <Copy className="w-3.5 h-3.5" />
                </IconBtn>
                {confirm === i ? (
                  <span className="flex items-center gap-1">
                    <button type="button" onClick={() => remove(i)} className="px-2 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold">
                      Delete
                    </button>
                    <IconBtn label="Cancel delete" onClick={() => setConfirm(null)}>
                      <X className="w-3.5 h-3.5" />
                    </IconBtn>
                  </span>
                ) : (
                  <IconBtn label={`Delete ${noun}`} onClick={() => setConfirm(i)} danger>
                    <Trash2 className="w-3.5 h-3.5" />
                  </IconBtn>
                )}
              </div>
              {isOpen && (
                <div className="px-4 pb-4 pt-3 border-t border-gray-100">
                  <FieldList fields={field.fields} path={[...path, i]} q="" />
                </div>
              )}
            </div>
          );
        })}
        <button type="button" onClick={add} className={cn(btnGhost, 'w-full justify-center border-dashed py-2.5')}>
          <Plus className="w-3.5 h-3.5" /> Add {noun}
        </button>
      </div>
    </FieldShell>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'p-1.5 rounded-lg text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 disabled:opacity-30 disabled:cursor-not-allowed',
        danger ? 'hover:text-red-600 hover:bg-red-50' : 'hover:text-d2c-royal hover:bg-gray-100',
      )}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------- sections

export interface SchemaFormProps {
  sections: SchemaSection[];
  value: any;
  defaults: any;
  onChange: (path: Path, value: any) => void;
}

export function SchemaForm({ sections, value, defaults, onChange }: SchemaFormProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(sections.slice(0, 1).map((s) => s.id)));
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const ctx = useMemo<FormCtxValue>(() => ({ root: value, defaults, onChange }), [value, defaults, onChange]);

  const filtered = useMemo(
    () =>
      sections
        .map((s) => {
          const titleHit = !!q && s.title.toLowerCase().includes(q);
          return { section: s, titleHit, fields: titleHit ? s.fields : s.fields.filter((f) => fieldMatches(f, q)) };
        })
        .filter((x) => !q || x.fields.length > 0),
    [sections, q],
  );

  // Track the section nearest the top of the scroll area.
  useEffect(() => {
    const els = Object.values(refs.current).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive((hit.target as HTMLElement).dataset.section || '');
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  const jump = (id: string) => {
    setOpenIds((s) => new Set(s).add(id));
    setActive(id);
    requestAnimationFrame(() => refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const toggle = (id: string) =>
    setOpenIds((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <FormCtx.Provider value={ctx}>
      <div className="@container">
        <div className="sticky top-0 z-20 -mx-1 px-1 pb-3 pt-1 bg-[#faf8ff]/95 backdrop-blur">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a field by name (e.g. heading, image, button)"
              aria-label="Find a field"
              className="w-full text-sm pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <nav aria-label="Sections" className="hidden @3xl:block w-48 shrink-0 sticky top-16 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 px-2">Sections</p>
            <ul className="space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => jump(s.id)}
                    className={cn(
                      'w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40',
                      active === s.id ? 'bg-d2c-royal/10 text-d2c-royal font-semibold' : 'text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1 min-w-0 space-y-4">
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
                <Search className="w-8 h-8 mx-auto text-gray-300 mb-2" aria-hidden />
                <p className="text-sm font-semibold text-gray-500">No fields match &quot;{query}&quot;</p>
              </div>
            )}
            {filtered.map(({ section, fields, titleHit }) => {
              const isOpen = !!q || openIds.has(section.id);
              return (
                <section
                  key={section.id}
                  id={`section-${section.id}`}
                  data-section={section.id}
                  ref={(el) => {
                    refs.current[section.id] = el;
                  }}
                  className="rounded-2xl border border-gray-200 bg-white shadow-xs scroll-mt-20"
                >
                  <button
                    type="button"
                    onClick={() => toggle(section.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-d2c-royal/40 rounded-2xl"
                  >
                    <span>
                      <span className="block font-sora font-bold text-d2c-navy text-[15px]">{section.title}</span>
                      {section.description && <span className="block text-xs text-gray-500 mt-0.5 font-normal">{section.description}</span>}
                    </span>
                    <ChevronDown className={cn('w-4 h-4 text-gray-400 shrink-0 transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 pt-1 border-t border-gray-100">
                      <div className="pt-5">
                        <FieldList fields={fields} path={[]} q={titleHit ? '' : q} />
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </FormCtx.Provider>
  );
}
