import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { CollegeEditForm } from "@/components/admin/CollegeEditForm";
import { mapDbToCollege } from "@/lib/admin-mappers";

type Params = Promise<{ id: string }>;

export default async function EditCollegePage({ params }: { params: Params }) {
  const { id } = await params;

  const { data: college, error } = await supabaseAdmin
    .from('colleges')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !college) {
    notFound();
  }

  const mappedCollege = mapDbToCollege(college);

  return <CollegeEditForm initialData={mappedCollege} isNew={false} />;
}
