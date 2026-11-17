import { getBlogByIdOrSlug } from "@/lib/data-service";
import { BlogEditForm } from "@/components/admin/BlogEditForm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminEditBlogPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || '').trim();
  const blog = await getBlogByIdOrSlug(decodedId);

  if (!blog) {
    notFound();
  }

  return <BlogEditForm initialData={blog} isNew={false} />;
}
