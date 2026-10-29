import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { VisualCollegeEditor } from "@/components/admin/visual-editor/VisualCollegeEditor";
import { mapDbToCollege } from "@/lib/admin-mappers";
import { getCollegeByIdOrSlug } from "@/lib/data-service";

type Params = Promise<{ id: string }>;

export default async function EditCollegePage({ params }: { params: Params }) {
  const { id } = await params;

  let collegeData: any = null;

  const { data: college, error } = await supabaseAdmin
    .from('colleges')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (college) {
    collegeData = mapDbToCollege(college);
  } else {
    // Fallback to local data service
    const local = await getCollegeByIdOrSlug(id);
    if (local) {
      collegeData = local;
    }
  }

  if (!collegeData) {
    notFound();
  }

  return <VisualCollegeEditor initialData={collegeData} isNew={false} />;
}

