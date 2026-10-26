import { supabaseAdmin } from "@/lib/supabase";
import { ExamsTable } from "@/components/admin/ExamsTable";

export const dynamic = 'force-dynamic';

export default async function AdminExams() {
  const { data: exams, error } = await supabaseAdmin
    .from('exams')
    .select('id, name, slug, full_name, logo_url, date')
    .order('name');

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-600 rounded-2xl border border-red-200">
        Error loading exams: {error.message}
      </div>
    );
  }

  return <ExamsTable exams={exams || []} />;
}
