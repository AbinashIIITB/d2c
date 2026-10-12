"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Search, Loader2, X, AlertCircle } from "lucide-react";

interface ExamItem {
  id: string;
  name: string;
  slug: string;
  full_name?: string;
  date?: string;
}

export function ExamsTable({ initialExams }: { initialExams: ExamItem[] }) {
  const router = useRouter();
  const [exams, setExams] = useState<ExamItem[]>(initialExams || []);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [newExam, setNewExam] = useState({
    name: "",
    slug: "",
    fullName: "",
    aboutExam: "",
    date: "",
    applicationLink: "",
  });

  const filtered = exams.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.slug.toLowerCase().includes(search.toLowerCase()) ||
    (e.full_name && e.full_name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/exams/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete exam");
      }

      setExams(prev => prev.filter(e => e.id !== id));
      router.refresh();
    } catch (err: any) {
      alert(`Error deleting exam: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError(null);

    try {
      const slug = newExam.slug.trim() || newExam.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const payload = {
        name: newExam.name.trim(),
        slug,
        full_name: newExam.fullName.trim() || newExam.name.trim(),
        about_exam: newExam.aboutExam.trim(),
        description: newExam.aboutExam.trim().slice(0, 200),
        date: newExam.date.trim(),
        application_link: newExam.applicationLink.trim(),
      };

      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Failed to create exam");
      }

      if (data.exam) {
        setExams(prev => [data.exam, ...prev]);
      }
      setIsAddModalOpen(false);
      setNewExam({ name: "", slug: "", fullName: "", aboutExam: "", date: "", applicationLink: "" });
      router.refresh();
    } catch (err: any) {
      setAddError(err.message || "Failed to create exam");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-sora font-bold text-d2c-navy">Manage Exams</h1>
          <p className="text-sm text-gray-500 mt-1">{exams.length} examinations listed</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-sm bg-white"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow"
          >
            <Plus className="w-5 h-5" /> Add Exam
          </button>
        </div>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-400">
                  No exams found matching &ldquo;{search}&rdquo;
                </td>
              </tr>
            ) : (
              filtered.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-d2c-navy">{exam.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5 font-mono">{exam.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm max-w-[320px] truncate">
                    {exam.full_name || "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/exams/${exam.id}`}
                        className="p-2 text-d2c-sky hover:bg-d2c-sky/10 rounded-lg transition-colors"
                        title="Edit Exam"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(exam.id, exam.name)}
                        disabled={deletingId === exam.id}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete Exam"
                      >
                        {deletingId === exam.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Exam Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-sora font-bold text-d2c-navy">Add New Exam</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                {addError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Exam Short Name *</label>
                <input
                  required
                  value={newExam.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setNewExam(prev => ({ ...prev, name, slug }));
                  }}
                  placeholder="e.g. WBJEE 2027"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Slug *</label>
                <input
                  required
                  value={newExam.slug}
                  onChange={(e) => setNewExam(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="e.g. wbjee-2027"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Full Exam Name *</label>
                <input
                  required
                  value={newExam.fullName}
                  onChange={(e) => setNewExam(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="e.g. West Bengal Joint Entrance Examination"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Date / Session</label>
                <input
                  value={newExam.date}
                  onChange={(e) => setNewExam(prev => ({ ...prev, date: e.target.value }))}
                  placeholder="e.g. April 2027"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">About Exam</label>
                <textarea
                  rows={3}
                  value={newExam.aboutExam}
                  onChange={(e) => setNewExam(prev => ({ ...prev, aboutExam: e.target.value }))}
                  placeholder="Detailed about text..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:text-d2c-navy text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="bg-d2c-royal hover:bg-d2c-navy text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Create Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
