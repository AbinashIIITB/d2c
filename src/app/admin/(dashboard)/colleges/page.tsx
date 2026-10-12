import { getAllColleges } from "@/lib/data-service";
import { CollegesTable } from "./CollegesTable";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminColleges() {
  const colleges = await getAllColleges();
  return <CollegesTable initialColleges={colleges || []} />;
}
