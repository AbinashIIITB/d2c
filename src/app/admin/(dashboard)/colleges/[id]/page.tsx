import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { CollegeEditForm } from "@/components/admin/CollegeEditForm";
import { mapDbToCollege } from "@/lib/admin-mappers";
import { getCollegeByIdOrSlug } from "@/lib/data-service";

type Params = Promise<{ id: string }>;

export const dynamic = "force-dynamic";

export default async function EditCollegePage({ params }: { params: Params }) {
  const { id } = await params;

  let collegeData: any = null;

  const { data: college } = await supabaseAdmin
    .from('colleges')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (college) {
    collegeData = mapDbToCollege(college);
  } else {
    // Fallback to local data service (colleges that only exist in the bundled data)
    const local = await getCollegeByIdOrSlug(id);
    if (local) {
      collegeData = local;
    }
  }

  if (!collegeData) {
    notFound();
  }

  return <CollegeEditForm initialData={collegeData} isNew={false} />;
}
