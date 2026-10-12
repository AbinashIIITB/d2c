import { getCollegeByIdOrSlug, saveCollege } from "@/lib/data-service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { revalidatePath } from "next/cache";
import { CollegeEditForm } from "./CollegeEditForm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ id: string }>;

export default async function EditCollegePage({ params }: { params: Params }) {
  const { id } = await params;

  // Fetch college data using fresh query with automatic fallback
  const college = await getCollegeByIdOrSlug(id);

  if (!college) {
    return (
      <div className="max-w-2xl mx-auto p-12 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ArrowLeft className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-2">College Not Found</h2>
        <p className="text-gray-500 mb-6">The requested college record could not be loaded from the database.</p>
        <Link
          href="/admin/colleges"
          className="inline-flex items-center gap-2 bg-d2c-royal text-white font-bold px-6 py-3 rounded-xl hover:bg-d2c-navy transition-colors"
        >
          Return to Colleges List
        </Link>
      </div>
    );
  }

  // Server Action for form submission fallback
  async function updateCollegeAction(formData: FormData) {
    'use server';

    const collegeId = (formData.get('id') as string) || id;
    const name = (formData.get('name') as string)?.trim();
    const slug = (formData.get('slug') as string)?.trim();
    const location = (formData.get('location') as string)?.trim();
    const state = (formData.get('state') as string)?.trim();
    const type = formData.get('type') as string;
    const fees = (formData.get('fees') as string)?.trim();
    const ratingStr = formData.get('rating') as string;
    const reviewsStr = formData.get('reviews') as string;
    const established = (formData.get('established') as string)?.trim();
    const imageUrl = (formData.get('imageUrl') as string)?.trim();
    const description = (formData.get('description') as string)?.trim();
    const tagsString = formData.get('tags') as string;

    const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : [];

    const updatePayload: Record<string, any> = {
      id: collegeId,
      name,
      slug,
      description,
      about: description, // Sync about and description
      tags,
    };

    if (location) updatePayload.location = location;
    if (state) updatePayload.state = state;
    if (type) updatePayload.type = type;
    if (fees) updatePayload.fees = fees;
    if (ratingStr && !isNaN(parseFloat(ratingStr))) updatePayload.rating = parseFloat(ratingStr);
    if (reviewsStr && !isNaN(parseInt(reviewsStr, 10))) updatePayload.reviews = parseInt(reviewsStr, 10);
    if (established) updatePayload.established = established;
    if (imageUrl) updatePayload.imageUrl = imageUrl;

    try {
      await saveCollege(updatePayload);
    } catch (updateError: any) {
      console.error("Failed to update college via Server Action:", updateError);
      return { error: updateError.message, success: false };
    }

    revalidatePath(`/colleges/${slug}`);
    revalidatePath(`/colleges`);
    revalidatePath(`/admin/colleges`);
    revalidatePath(`/admin/colleges/${collegeId}`);
    revalidatePath('/');
    redirect('/admin/colleges');
  }

  return (
    <CollegeEditForm
      college={college}
      serverAction={updateCollegeAction}
    />
  );
}
