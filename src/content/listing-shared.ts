// Shared helpers for the page documents that have a hero with an icon + stat bar
// (about, contact, colleges-index, exams-index, blog-index).
import type { Field } from '@/lib/cms/types';

export type Accent = 'sky' | 'gold' | 'success' | 'green';

/** Tailwind classes for the stat icon colours used on the hero stat bars (full strings so Tailwind keeps them). */
export const ACCENT_CLASS: Record<string, string> = {
  sky: 'text-d2c-sky',
  gold: 'text-d2c-gold',
  success: 'text-d2c-success',
  green: 'text-[#22c55e]',
};

export function accentClass(accent: string | undefined, fallback = 'text-d2c-sky'): string {
  return (accent && ACCENT_CLASS[accent]) || fallback;
}

export interface HeroStat {
  value: string;
  label: string;
  icon: string;
  accent: Accent;
}

export const accentField: Field = {
  key: 'accent',
  label: 'Icon colour',
  type: 'select',
  options: [
    { label: 'Sky blue', value: 'sky' },
    { label: 'Gold', value: 'gold' },
    { label: 'Green', value: 'success' },
    { label: 'Bright green', value: 'green' },
  ],
};

export const statFields: Field[] = [
  { key: 'value', label: 'Value', type: 'text' },
  { key: 'label', label: 'Label', type: 'text' },
  { key: 'icon', label: 'Icon', type: 'icon' },
  accentField,
];

/** Replaces {count} in a template string with a number (used for live counts such as number of colleges). */
export function withCount(template: string | undefined, count: number): string {
  return (template ?? '').replace(/\{count\}/g, String(count));
}
