import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default async function AdminExams() {
  const { data: exams, error } = await supabaseAdmin
    .from('exams')
    .select('id, name, slug, full_name')
    .order('name');

  if (error) {
    return <div className="text-red-500">Error loading exams: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-sora font-bold text-d2c-navy">Manage Exams</h1>
        <button className="bg-d2c-royal hover:bg-d2c-navy text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Exam
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">Exam Name</th>
              <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">Full Name</th>
              <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {exams?.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-d2c-navy">{exam.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{exam.slug}</div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm max-w-[300px] truncate">{exam.full_name}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/exams/${exam.id}`} className="p-2 text-d2c-sky hover:bg-d2c-sky/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
