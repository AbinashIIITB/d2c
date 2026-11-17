import { notFound, redirect } from "next/navigation";
import { getPageData, getManagedContentKey } from "@/lib/page-service";
import { WordPressPageEditor } from "@/components/admin/WordPressPageEditor";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export default async function AdminEditStaticPage({ params }: { params: Params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug || '').toLowerCase().trim();

  // Core pages (home, about, contact, mba, privacy, terms) and the IEM landing pages are edited
  // in the content editor; the old page editors no longer write to them.
  const contentKey = getManagedContentKey(decodedSlug);
  if (contentKey) {
    redirect(`/admin/content/${contentKey}`);
  }

  const page = await getPageData(decodedSlug);

  if (!page) {
    notFound();
  }

  return <WordPressPageEditor initialData={page} isNew={false} />;
}
