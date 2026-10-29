import { notFound } from "next/navigation";
import { getPageData } from "@/lib/page-service";
import { VisualStaticPageEditor } from "@/components/admin/visual-editor/VisualStaticPageEditor";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export default async function AdminEditStaticPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    notFound();
  }

  return <VisualStaticPageEditor slug={slug} initialData={page} />;
}
