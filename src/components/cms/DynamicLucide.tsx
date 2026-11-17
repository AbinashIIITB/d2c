'use client';
// Client-only half of CmsIcon: loads an icon by name with lucide's DynamicIcon (lazy chunk per icon).
// lucide-react@1.x: `import { DynamicIcon, iconNames } from 'lucide-react/dynamic'`; DynamicIcon takes
// `name` (kebab-case IconName), the usual SVG props, and `fallback` (a component rendered while loading).
import type { CSSProperties, ReactNode } from 'react';
import { DynamicIcon, iconNames } from 'lucide-react/dynamic';

type IconName = Parameters<typeof DynamicIcon>[0]['name'];

const NAMES = new Set<string>(iconNames as readonly string[]);

export interface DynamicLucideProps {
  name: string;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  style?: CSSProperties;
  'aria-hidden'?: boolean;
  /** Rendered while the icon chunk loads, and when the name is not a lucide icon. */
  children?: ReactNode;
}

export default function DynamicLucide({ name, children, ...rest }: DynamicLucideProps) {
  const fallbackNode = <>{children ?? null}</>;
  if (!NAMES.has(name)) return fallbackNode;
  return <DynamicIcon name={name as IconName} fallback={() => fallbackNode} {...rest} />;
}
