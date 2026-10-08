import { supabaseAdmin } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

type Params = Promise<{ id: string }>

export default async function EditExamPage({ params }: { params: Params }) {
  const { id } = await params;
  
  // Fetch exam data
  const { data: exam, error } = await supabaseAdmin
    .from('exams')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !exam) {
    return <div className="p-8 text-red-500">Exam not found or error loading.</div>;
  }

  // Handle form submission
  async function updateExam(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const full_name = formData.get('full_name') as string;
    const about_exam = formData.get('about_exam') as string;
    const tagsString = formData.get('tags') as string;
    
    // Parse comma separated tags
    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);

    const { error: updateError } = await supabaseAdmin
      .from('exams')
      .update({
        name,
        slug,
        full_name,
        about_exam,
        tags
      })
      .eq('id', id);

    if (updateError) {
      console.error("Failed to update exam:", updateError);
    } else {
      revalidatePath(`/exams/${slug}`);
      revalidatePath(`/admin/exams`);
      redirect('/admin/exams');
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/exams" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-d2c-navy transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-sora font-bold text-d2c-navy">Edit Exam</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form action={updateExam} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">Exam Short Name</label>
              <input 
                name="name"
                defaultValue={exam.name}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">URL Slug</label>
              <input 
                name="slug"
                defaultValue={exam.slug}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">Full Name</label>
            <input 
              name="full_name"
              defaultValue={exam.full_name}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">About / Description</label>
            <textarea 
              name="about_exam"
              defaultValue={exam.about_exam}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">SEO Tags (comma separated)</label>
            <input 
              name="tags"
              defaultValue={(exam.tags || []).join(', ')}
              placeholder="e.g. engineering, jee main, entrance exam 2027"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">These tags will automatically be injected into the page metadata for better Google Rankings.</p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="bg-d2c-royal hover:bg-d2c-navy text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
