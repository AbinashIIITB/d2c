# Admin CMS (developer notes)

Every editable part of the public site is a **content document** stored under a key in the Supabase
table `site_content`. A page always renders `defaults` (what the site shows today) deep-merged with the
stored document, so an empty or unreachable database renders the site exactly as before.

## Pieces

| File | Role |
|---|---|
| `src/lib/cms/types.ts` | Field schema types, `SeoFields`, API shapes (contract) |
| `src/lib/cms/registry.ts` | `CONTENT_DEFINITIONS`, `getDefinition(key)` |
| `src/content/<key>.ts` | One definition per key: `sections` (admin form) + `defaults` |
| `src/lib/cms/content.ts` | `getContent(key)`, `getContents(keys)` (server, never throw) |
| `src/lib/cms/merge.ts` | `deepMerge` (objects merge, arrays/scalars replace, null keeps default) |
| `src/lib/cms/store.ts` | Admin persistence: `getRecord`, `saveDraft`, `publish`, `discardDraft`, `listVersions`, `restoreVersion` |
| `src/lib/cms/seo.ts` | `buildMetadata(seo)`, `<JsonLd seo data />` |
| `src/components/cms/CmsIcon.tsx` | Icon by name (static `known` map, image URL, or lucide `DynamicIcon`) |

## Reading content in a page

```tsx
const content = await getContent<HomeContent>('home');   // server component / generateMetadata
export async function generateMetadata() { return buildMetadata((await getContent('home')).seo); }
```

Pages that read content must be dynamic (`export const dynamic = 'force-dynamic'`). Reads are deduped per
request (React `cache`) and cached in memory for about 5 seconds per server instance; every admin write clears
the cache and calls `revalidatePath('/', 'layout')`. When Next draft mode is on (admin preview) the draft is
shown instead of the published document. If Supabase is not configured, the table is missing or a query fails,
defaults are returned and one warning is logged.

## Adding an editable field

1. Add the value to `defaults` in `src/content/<key>.ts` (exactly what the site shows today).
2. Add a matching field to the `sections` schema (`text`, `textarea`, `image`, `icon`, `list`, ...).
3. Read it from the content prop in the component instead of the hardcoded value.

No migration is needed: new keys in `defaults` appear in the editor, and old stored documents keep working
because missing keys fall back to the default.

## Admin API (all require the admin session cookie; 401 otherwise)

- `GET /api/admin/content` list documents (`updated_at`, `hasDraft`)
- `GET /api/admin/content/[key]` `{ definition, defaults, record, merged, mergedDraft }`
- `PUT /api/admin/content/[key]` body `{ data, mode: 'draft' | 'publish' }` (payload limit 2 MB)
- `POST /api/admin/content/[key]/discard` drop the draft
- `GET /api/admin/content/[key]/versions`, `POST /api/admin/content/[key]/versions/[id]` (restore into draft)
- `GET /api/admin/preview?path=/x`, `GET /api/admin/preview/exit?path=/x` toggle draft mode, redirect
- `GET /api/admin/media?prefix=&search=`, `DELETE /api/admin/media` (`{ path }`), bucket `public-images`

Unknown key: 404. Missing tables: 503 `CMS table missing: run supabase/migrations/20261117_cms.sql`
(the two GET document routes still answer with defaults and `tableMissing: true`).

## Database setup (one-off)

Open the Supabase SQL editor and run `supabase/migrations/20261117_cms.sql`. It is idempotent. It creates
`site_content` and `site_content_versions` (RLS on, no public policies), extends `blogs` with SEO columns and
creates `leads` if absent. The site works without it (defaults), but nothing can be saved until it is run.

## Notes

- Public write endpoints on `/api/colleges`, `/api/exams`, `/api/blogs` were removed; use `/api/admin/*`.
  `/api/migrate` was deleted.
- `import 'server-only'` is not used because the `server-only` package is not in `package-lock.json`.
