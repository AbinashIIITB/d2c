// SEO helpers: turn a SeoFields block into Next Metadata and JSON-LD <script> tags.
// Only fields that are set are emitted (empty strings count as unset), so defaults that mirror
// today's metadata produce today's tags. Server-safe (no hooks, no client APIs).
import { createElement, Fragment, type ReactElement } from 'react';
import type { Metadata } from 'next';
import type { SeoFields } from './types';

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined;
}

/**
 * `opts.path` is accepted for call-site symmetry but is not used to invent tags: nothing is
 * emitted unless it is set in `seo`.
 */
export function buildMetadata(seo: SeoFields | undefined, opts?: { path?: string }): Metadata {
  void opts;
  const meta: Metadata = {};
  if (!seo) return meta;

  const title = str(seo.title);
  if (title) meta.title = { absolute: title };

  const description = str(seo.description);
  if (description) meta.description = description;

  const keywords = Array.isArray(seo.keywords)
    ? seo.keywords.filter((k): k is string => typeof k === 'string' && k.trim() !== '')
    : [];
  if (keywords.length) meta.keywords = keywords;

  const canonical = str(seo.canonical);
  if (canonical) meta.alternates = { canonical };

  const robots = seo.robots;
  if (robots && (typeof robots.index === 'boolean' || typeof robots.follow === 'boolean')) {
    const r: { index?: boolean; follow?: boolean } = {};
    if (typeof robots.index === 'boolean') r.index = robots.index;
    if (typeof robots.follow === 'boolean') r.follow = robots.follow;
    meta.robots = r;
  }

  if (seo.og) {
    const og: Record<string, unknown> = {};
    const t = str(seo.og.title);
    const d = str(seo.og.description);
    const img = str(seo.og.image);
    if (t) og.title = t;
    if (d) og.description = d;
    if (img) og.images = [img];
    if (seo.og.type === 'website' || seo.og.type === 'article') og.type = seo.og.type;
    if (Object.keys(og).length) meta.openGraph = og as NonNullable<Metadata['openGraph']>;
  }

  if (seo.twitter) {
    const tw: Record<string, unknown> = {};
    const t = str(seo.twitter.title);
    const d = str(seo.twitter.description);
    const img = str(seo.twitter.image);
    if (seo.twitter.card === 'summary' || seo.twitter.card === 'summary_large_image') tw.card = seo.twitter.card;
    if (t) tw.title = t;
    if (d) tw.description = d;
    if (img) tw.images = [img];
    if (Object.keys(tw).length) meta.twitter = tw as NonNullable<Metadata['twitter']>;
  }

  return meta;
}

function scriptTag(json: string, key: string): ReactElement {
  return createElement('script', {
    key,
    type: 'application/ld+json',
    // `</` is escaped so the payload can never close the script element.
    dangerouslySetInnerHTML: { __html: json.replace(/<\//g, '<\\/') },
  });
}

/**
 * Renders <script type="application/ld+json"> for `data` (structured objects the page builds in
 * code; an array is rendered as one script holding the array) and for `seo.jsonLd` (raw JSON text
 * from the admin, skipped when it is not valid JSON).
 */
export function JsonLd(props: { seo?: SeoFields; data?: unknown | unknown[] }): ReactElement | null {
  const scripts: ReactElement[] = [];

  if (props.data !== undefined && props.data !== null) {
    try {
      const json = JSON.stringify(props.data);
      if (json) scripts.push(scriptTag(json, 'data'));
    } catch {
      // unserialisable data: render nothing for it
    }
  }

  const raw = str(props.seo?.jsonLd);
  if (raw) {
    try {
      JSON.parse(raw);
      scripts.push(scriptTag(raw.trim(), 'seo'));
    } catch {
      // invalid JSON from the admin: render nothing
    }
  }

  if (scripts.length === 0) return null;
  return createElement(Fragment, null, ...scripts);
}
