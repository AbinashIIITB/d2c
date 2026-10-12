import { getAllExams } from "@/lib/data-service";
import { ExamsTable } from "./ExamsTable";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminExams() {
  const exams = await getAllExams();
  return <ExamsTable initialExams={exams || []} />;
}
