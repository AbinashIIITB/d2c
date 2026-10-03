import { supabaseAdmin } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

type Params = Promise<{ id: string }>

export default async function EditCollegePage({ params }: { params: Params }) {
  const { id } = await params;
  
  // Fetch college data
  const { data: college, error } = await supabaseAdmin
    .from('colleges')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !college) {
    return <div className="p-8 text-red-500">College not found or error loading.</div>;
  }

  // Handle form submission (Server Action)
  async function updateCollege(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const tagsString = formData.get('tags') as string;
    
    // Parse comma separated tags
    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);

    const { error: updateError } = await supabaseAdmin
      .from('colleges')
      .update({
        name,
        slug,
        description,
        tags
      })
      .eq('id', id);

    if (updateError) {
      console.error("Failed to update college:", updateError);
    } else {
      revalidatePath(`/colleges/${slug}`);
      revalidatePath(`/admin/colleges`);
      redirect('/admin/colleges');
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/colleges" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-d2c-navy transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-sora font-bold text-d2c-navy">Edit College</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form action={updateCollege} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">College Name</label>
              <input 
                name="name"
                defaultValue={college.name}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">URL Slug</label>
              <input 
                name="slug"
                defaultValue={college.slug}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">Description / About</label>
            <textarea 
              name="description"
              defaultValue={college.description}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">SEO Tags (comma separated)</label>
            <input 
              name="tags"
              defaultValue={(college.tags || []).join(', ')}
              placeholder="e.g. btech, engineering, top college, direct admission"
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
