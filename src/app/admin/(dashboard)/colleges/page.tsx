import { supabaseAdmin } from "@/lib/supabase";
import { CollegesTable } from "@/components/admin/CollegesTable";

export const dynamic = 'force-dynamic';

export default async function AdminColleges() {
  const { data: colleges, error } = await supabaseAdmin
    .from('colleges')
    .select('id, name, slug, location, state, type, logo_url')
    .order('name');

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-600 rounded-2xl border border-red-200">
        Error loading colleges: {error.message}
      </div>
    );
  }

  return <CollegesTable colleges={colleges || []} />;
}
