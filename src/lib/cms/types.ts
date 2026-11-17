// CMS contract shared by the public site, the admin editor and the content store.
// Every editable thing on the site is a "content document" stored under a key in the
// Supabase `site_content` table. The public page always renders `defaults` deep-merged
// with the stored document, so an empty database renders the site exactly as it is today.

/** Icon value: a lucide icon name in kebab-case ("graduation-cap") or an image URL / path ("https://…", "/icons/x.svg"). */
export type IconValue = string;

/** Image value: a URL or a public path ("/images/hero.jpg"). Alt text lives in a sibling `…Alt` text field. */
export type ImageValue = string;

export interface LinkValue {
  label: string;
  href: string;
  newTab?: boolean;
}

/** Full SEO block. Used by every page document, and by colleges, exams, blogs and custom pages. */
export interface SeoFields {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  robots?: { index?: boolean; follow?: boolean };
  og?: { title?: string; description?: string; image?: ImageValue; type?: 'website' | 'article' };
  twitter?: { card?: 'summary' | 'summary_large_image'; title?: string; description?: string; image?: ImageValue };
  /** Extra JSON-LD: raw JSON text (one object or an array). Rendered verbatim in a ld+json script after validation. */
  jsonLd?: string;
}

// ---------------------------------------------------------------- field schema (drives the admin form)

interface FieldBase {
  /** Property name inside the parent object. */
  key: string;
  label: string;
  help?: string;
  placeholder?: string;
}

export type ScalarFieldType =
  | 'text'
  | 'textarea'
  | 'richtext' // HTML string
  | 'url'
  | 'color' // CSS color string
  | 'image' // ImageValue
  | 'icon' // IconValue
  | 'number'
  | 'boolean'
  | 'date'; // ISO date string

export type Field =
  | (FieldBase & { type: ScalarFieldType })
  | (FieldBase & { type: 'select'; options: { label: string; value: string }[] })
  | (FieldBase & { type: 'stringList' }) // string[]
  | (FieldBase & { type: 'link' }) // LinkValue
  | (FieldBase & { type: 'seo' }) // SeoFields
  | (FieldBase & { type: 'group'; fields: Field[] }) // nested object
  | (FieldBase & {
      type: 'list'; // array of objects, reorderable
      fields: Field[];
      /** Singular name for the "Add …" button, e.g. "card". */
      itemLabel?: string;
      /** Key of the field shown as each item's title in the collapsed list. */
      titleKey?: string;
    });

export interface SchemaSection {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

export type ContentGroup = 'Site' | 'Pages' | 'Landing pages';

export interface ContentDefinition<T = any> {
  key: string;
  title: string;
  group: ContentGroup;
  /** Public path the admin preview iframe opens (null for site-wide documents like navbar). */
  previewPath: string | null;
  sections: SchemaSection[];
  /** What the site shows today. Must reproduce the current public output exactly. */
  defaults: T;
}

// ---------------------------------------------------------------- store / API shapes

export interface ContentRecord<T = any> {
  key: string;
  /** Published document (partial; merged over defaults on read). */
  data: Partial<T> | null;
  /** Unpublished draft, shown only in admin preview (draft mode). */
  draft: Partial<T> | null;
  updated_at: string | null;
  updated_by: string | null;
}

export interface ContentVersion {
  id: number;
  key: string;
  created_at: string;
  created_by: string | null;
}

/*
Admin HTTP API (all under /api/admin, all require the existing admin session via checkAdminAuth):
  GET    /api/admin/content                     -> { items: { key, title, group, previewPath, updated_at, hasDraft }[] }
  GET    /api/admin/content/[key]               -> { definition: { key,title,group,previewPath,sections }, defaults, record: ContentRecord, merged, mergedDraft }
  PUT    /api/admin/content/[key]               body { data, mode: 'draft' | 'publish' } -> { ok, record }
  POST   /api/admin/content/[key]/discard       -> { ok }        (drops the draft)
  GET    /api/admin/content/[key]/versions      -> { versions: ContentVersion[] }
  POST   /api/admin/content/[key]/versions/[id] -> { ok, record } (restore a version into the draft)
  GET    /api/admin/preview?path=/about         -> enables Next draftMode and redirects to path
  GET    /api/admin/preview/exit?path=/about    -> disables draftMode and redirects
  GET    /api/admin/media?prefix=&search=       -> { items: { name, path, url, size, created_at }[] }
  POST   /api/admin/upload  (existing)          -> { url, path }
  DELETE /api/admin/media   body { path }       -> { ok }
Errors: { error: string } with a 4xx/5xx status. A missing `site_content` table returns 503 with
error "CMS table missing: run supabase/migrations/20261117_cms.sql".
*/
