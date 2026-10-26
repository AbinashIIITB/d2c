import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ExamEditForm } from "@/components/admin/ExamEditForm";
import { mapDbToExam } from "@/lib/admin-mappers";

type Params = Promise<{ id: string }>;

export default async function EditExamPage({ params }: { params: Params }) {
  const { id } = await params;

  const { data: exam, error } = await supabaseAdmin
    .from('exams')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !exam) {
    notFound();
  }

  const mappedExam = mapDbToExam(exam);

  return <ExamEditForm initialData={mappedExam} isNew={false} />;
}
