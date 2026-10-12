import { getExamByIdOrSlug, saveExam } from "@/lib/data-service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { revalidatePath } from "next/cache";
import { ExamEditForm } from "./ExamEditForm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ id: string }>;

export default async function EditExamPage({ params }: { params: Params }) {
  const { id } = await params;

  // Fetch exam data using fresh query with automatic fallback
  const exam = await getExamByIdOrSlug(id);

  if (!exam) {
    return (
      <div className="max-w-2xl mx-auto p-12 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ArrowLeft className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-2">Exam Not Found</h2>
        <p className="text-gray-500 mb-6">The requested examination record could not be loaded from the database.</p>
        <Link
          href="/admin/exams"
          className="inline-flex items-center gap-2 bg-d2c-royal text-white font-bold px-6 py-3 rounded-xl hover:bg-d2c-navy transition-colors"
        >
          Return to Exams List
        </Link>
      </div>
    );
  }

  // Server Action fallback for form submission
  async function updateExamAction(formData: FormData) {
    'use server';

    const examId = (formData.get('id') as string) || id;
    const name = (formData.get('name') as string)?.trim();
    const slug = (formData.get('slug') as string)?.trim();
    const fullName = (formData.get('fullName') as string)?.trim();
    const aboutExam = (formData.get('aboutExam') as string)?.trim();
    const description = (formData.get('description') as string)?.trim();
    const date = (formData.get('date') as string)?.trim();
    const applicationLink = (formData.get('applicationLink') as string)?.trim();
    const logoUrl = (formData.get('logoUrl') as string)?.trim();

    const updatePayload: Record<string, any> = {
      id: examId,
      name,
      slug,
      fullName,
      aboutExam,
    };

    if (description) updatePayload.description = description;
    if (date) updatePayload.date = date;
    if (applicationLink) updatePayload.applicationLink = applicationLink;
    if (logoUrl) updatePayload.logoUrl = logoUrl;

    try {
      await saveExam(updatePayload);
    } catch (updateError: any) {
      console.error("Failed to update exam via Server Action:", updateError);
      return { error: updateError.message, success: false };
    }

    revalidatePath(`/exams/${slug}`);
    revalidatePath(`/exams`);
    revalidatePath(`/admin/exams`);
    revalidatePath(`/admin/exams/${examId}`);
    revalidatePath(`/`);
    redirect('/admin/exams');
  }

  return (
    <ExamEditForm
      exam={exam}
      serverAction={updateExamAction}
    />
  );
}
