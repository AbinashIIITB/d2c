import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Field } from '@/lib/cms/types';

export type Path = (string | number)[];

export function cn(...a: ClassValue[]): string {
  return twMerge(clsx(a));
}

export function pathId(path: Path): string {
  return path.join('.');
}

export function isPlainObject(v: unknown): v is Record<string, any> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function getIn(obj: any, path: Path): any {
  let cur = obj;
  for (const k of path) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[k as any];
  }
  return cur;
}

/** Immutable set. Creates objects/arrays along the path as needed. */
export function setIn(obj: any, path: Path, val: any): any {
  if (path.length === 0) return val;
  const [head, ...rest] = path;
  const base = obj ?? (typeof head === 'number' ? [] : {});
  const copy: any = Array.isArray(base) ? [...base] : { ...base };
  copy[head as any] = setIn(base[head as any], rest, val);
  return copy;
}

export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((x, i) => deepEqual(x, b[i]));
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ka = Object.keys(a).filter((k) => a[k] !== undefined);
    const kb = Object.keys(b).filter((k) => b[k] !== undefined);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

export function clone<T>(v: T): T {
  return v === undefined ? v : (JSON.parse(JSON.stringify(v)) as T);
}

/** Minimal document to store so that deepMerge(defaults, result) === value. */
export function diffFromDefaults(defaults: any, value: any): any {
  if (value === undefined) return undefined;
  if (deepEqual(defaults, value)) return undefined;
  if (isPlainObject(defaults) && isPlainObject(value)) {
    const out: Record<string, any> = {};
    for (const k of Object.keys(value)) {
      const r = diffFromDefaults(defaults[k], value[k]);
      if (r !== undefined) out[k] = r;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return value;
}

export function emptyForFields(fields: Field[]): Record<string, any> {
  const out: Record<string, any> = {};
  for (const f of fields) out[f.key] = emptyForField(f);
  return out;
}

export function emptyForField(f: Field): any {
  switch (f.type) {
    case 'boolean':
      return false;
    case 'number':
      return undefined;
    case 'stringList':
    case 'list':
      return [];
    case 'link':
      return { label: '', href: '', newTab: false };
    case 'seo':
      return {};
    case 'group':
      return emptyForFields(f.fields);
    case 'select':
      return f.options[0]?.value ?? '';
    default:
      return '';
  }
}

export function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return 'Never';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Unknown';
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: 'same-origin', ...init });
  let body: any = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (!res.ok) {
    throw new ApiError((body && body.error) || `Request failed (${res.status})`, res.status);
  }
  return body as T;
}

export function jsonInit(method: string, body: unknown): RequestInit {
  return { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}
