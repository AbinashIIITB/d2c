import { notFound } from "next/navigation";
import { getPageData } from "@/lib/page-service";
import { VisualStaticPageEditor } from "@/components/admin/visual-editor/VisualStaticPageEditor";
import { WordPressPageEditor } from "@/components/admin/WordPressPageEditor";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export default async function AdminEditStaticPage({ params }: { params: Params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug || '').toLowerCase().trim();
  const page = await getPageData(decodedSlug);

  if (!page) {
    notFound();
  }

  // Core visual homepage & legacy editors use VisualStaticPageEditor
  if (['home', 'about', 'contact'].includes(decodedSlug)) {
    return <VisualStaticPageEditor slug={decodedSlug} initialData={page} />;
  }

  // All other pages (MBA, Privacy, Terms, and Custom SEO Landing Pages) use the WordPress block editor
  return <WordPressPageEditor initialData={page} isNew={false} />;
}
