import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { VisualExamEditor } from "@/components/admin/visual-editor/VisualExamEditor";
import { mapDbToExam } from "@/lib/admin-mappers";
import { getExamByIdOrSlug } from "@/lib/data-service";

type Params = Promise<{ id: string }>;

export default async function EditExamPage({ params }: { params: Params }) {
  const { id } = await params;

  let examData: any = null;

  const { data: exam, error } = await supabaseAdmin
    .from('exams')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (exam) {
    examData = mapDbToExam(exam);
  } else {
    const local = await getExamByIdOrSlug(id);
    if (local) {
      examData = local;
    }
  }

  if (!examData) {
    notFound();
  }

  return <VisualExamEditor initialData={examData} isNew={false} />;
}

