// Renders a CMS icon value. Works in server AND client components (no hooks, no 'use client').
//  - name in `known`            -> that statically imported icon (identical SSR output to hardcoded JSX)
//  - name starts with http(s):// or /  -> <img>
//  - otherwise                  -> lucide DynamicIcon (lazy, client) with `fallback` while loading
//  - name empty                 -> `fallback`, or null
import type { CSSProperties, ReactElement } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { IconValue } from '@/lib/cms/types';
import DynamicLucide from './DynamicLucide';

export interface CmsIconProps {
  name?: IconValue;
  known?: Record<string, LucideIcon>;
  fallback?: LucideIcon;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  style?: CSSProperties;
  'aria-hidden'?: boolean;
}

/** True when an icon value is an image URL/path rather than a lucide icon name. */
export function isImageIcon(name: string | undefined | null): boolean {
  return typeof name === 'string' && /^(https?:\/\/|\/)/i.test(name.trim());
}

export function CmsIcon({ name, known, fallback: Fallback, className, size, strokeWidth, style, ...aria }: CmsIconProps): ReactElement | null {
  const value = typeof name === 'string' ? name.trim() : '';
  // Only pass props that are set so lucide's own defaults (size, aria-hidden) stay untouched.
  const svgProps = {
    ...(className !== undefined ? { className } : {}),
    ...(size !== undefined ? { size } : {}),
    ...(strokeWidth !== undefined ? { strokeWidth } : {}),
    ...(style !== undefined ? { style } : {}),
    ...(aria['aria-hidden'] !== undefined ? { 'aria-hidden': aria['aria-hidden'] } : {}),
  };
  const fallbackEl = Fallback ? <Fallback {...svgProps} /> : null;

  if (!value) return fallbackEl;

  const Known = known && Object.prototype.hasOwnProperty.call(known, value) ? known[value] : undefined;
  if (Known) return <Known {...svgProps} />;

  if (isImageIcon(value)) {
    const px = size !== undefined ? size : undefined;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={value} alt="" className={className} style={style} width={px} height={px} aria-hidden={aria['aria-hidden']} />;
  }

  return (
    <DynamicLucide name={value} {...svgProps}>
      {fallbackEl}
    </DynamicLucide>
  );
}

export default CmsIcon;
