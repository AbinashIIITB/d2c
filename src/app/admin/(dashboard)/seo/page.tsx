import { getAllColleges, getAllExams, getAllBlogs } from "@/lib/data-service";
import { getAllPages, getManagedContentKey } from "@/lib/page-service";
import { CONTENT_DEFINITIONS } from "@/lib/cms/registry";
import { getContents } from "@/lib/cms/content";
import {
  collegeSeo,
  collegeDerivedSeo,
  examSeo,
  examDerivedSeo,
  blogSeo,
  blogDerivedSeo,
  pageSeo,
  pageDerivedSeo,
  normalizeSeo,
} from "@/lib/record-seo";
import { SeoStudio, type StudioRow } from "@/components/admin/SeoStudio";

export const dynamic = "force-dynamic";

export default async function SeoStudioPage() {
  const [colleges, exams, blogs, pages, contents] = await Promise.all([
    getAllColleges().catch(() => []),
    getAllExams().catch(() => []),
    getAllBlogs().catch(() => []),
    getAllPages().catch(() => []),
    getContents(CONTENT_DEFINITIONS.map((definition) => definition.key)).catch(() => ({} as Record<string, any>)),
  ]);

  const rows: StudioRow[] = [];

  // Content documents (core pages, landing pages, listing pages...): only those with an SEO block.
  for (const definition of CONTENT_DEFINITIONS) {
    const doc = contents[definition.key];
    if (!doc || typeof doc.seo !== "object" || doc.seo === null) continue;
    rows.push({
      id: definition.key,
      kind: "content",
      label: definition.title,
      path: definition.previewPath || "",
      editHref: `/admin/content/${definition.key}`,
      seo: normalizeSeo(doc.seo),
      derived: {},
      inline: false,
    });
  }

  for (const c of colleges as any[]) {
    rows.push({
      id: String(c.id),
      kind: "college",
      label: c.name || c.slug,
      path: `/colleges/${c.slug}`,
      editHref: `/admin/colleges/${c.id}`,
      seo: collegeSeo(c),
      derived: collegeDerivedSeo(c),
      inline: true,
    });
  }

  for (const e of exams as any[]) {
    rows.push({
      id: String(e.id),
      kind: "exam",
      label: e.name || e.slug,
      path: `/exams/${e.slug}`,
      editHref: `/admin/exams/${e.id}`,
      seo: examSeo(e),
      derived: examDerivedSeo(e),
      inline: true,
    });
  }

  for (const b of blogs as any[]) {
    rows.push({
      id: String(b.id),
      kind: "blog",
      label: b.title || b.slug,
      path: `/blog/${b.slug}`,
      editHref: `/admin/blogs/${b.id}`,
      seo: blogSeo(b, b.slug),
      derived: blogDerivedSeo(b, b.slug),
      inline: true,
    });
  }

  for (const p of pages as any[]) {
    // Core and IEM landing pages are content documents (listed above).
    if (!p.slug || getManagedContentKey(p.slug) || p.published === false) continue;
    rows.push({
      id: p.slug,
      kind: "page",
      label: p.h1 || p.title || p.slug,
      path: `/${p.slug}`,
      editHref: `/admin/pages/${p.slug}`,
      seo: pageSeo(p, p.slug),
      derived: pageDerivedSeo(p, p.slug),
      inline: true,
    });
  }

  return <SeoStudio rows={rows} />;
}
