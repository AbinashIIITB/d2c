// Deep-merge used by the server runtime (content.ts / store.ts) and by the admin editor (client).
// No server-only imports in this file.
//
// Rules:
//  - plain objects merge recursively (keys only in the stored doc are kept)
//  - arrays and scalars in the stored doc replace the default
//  - null / undefined in the stored doc keep the default

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function cloneObjects(value: unknown): unknown {
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value)) out[k] = cloneObjects(value[k]);
    return out;
  }
  // Arrays are returned by reference (never mutated by the runtime); scalars are immutable.
  return value;
}

function mergeValue(base: unknown, stored: unknown): unknown {
  if (stored === null || stored === undefined) return cloneObjects(base);
  if (isPlainObject(stored) && isPlainObject(base)) {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(base)) out[k] = cloneObjects(base[k]);
    for (const k of Object.keys(stored)) {
      out[k] = mergeValue(base[k], stored[k]);
    }
    return out;
  }
  return cloneObjects(stored);
}

/** Returns `defaults` deep-merged with `stored`. Neither argument is mutated. */
export function deepMerge<T>(defaults: T, stored: unknown): T {
  return mergeValue(defaults, stored) as T;
}
