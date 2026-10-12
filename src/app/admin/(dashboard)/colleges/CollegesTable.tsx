"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Search, Loader2, X, AlertCircle } from "lucide-react";

interface CollegeItem {
  id: string;
  name: string;
  slug: string;
  location?: string;
  type?: string;
}

export function CollegesTable({ initialColleges }: { initialColleges: CollegeItem[] }) {
  const router = useRouter();
  const [colleges, setColleges] = useState<CollegeItem[]>(initialColleges || []);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [newCollege, setNewCollege] = useState({
    name: "",
    slug: "",
    location: "",
    type: "Private",
    description: "",
  });

  const filtered = colleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase()) ||
    (c.location && c.location.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/colleges/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete college");
      }

      setColleges(prev => prev.filter(c => c.id !== id));
      router.refresh();
    } catch (err: any) {
      alert(`Error deleting college: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError(null);

    try {
      const slug = newCollege.slug.trim() || newCollege.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const payload = {
        name: newCollege.name.trim(),
        slug,
        location: newCollege.location.trim(),
        type: newCollege.type,
        description: newCollege.description.trim(),
        about: newCollege.description.trim(),
        rating: 4.2,
        reviews: 100,
        courses: ["B.Tech"],
      };

      const res = await fetch("/api/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Failed to create college");
      }

      if (data.college) {
        setColleges(prev => [data.college, ...prev]);
      }
      setIsAddModalOpen(false);
      setNewCollege({ name: "", slug: "", location: "", type: "Private", description: "" });
      router.refresh();
    } catch (err: any) {
      setAddError(err.message || "Failed to create college");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-sora font-bold text-d2c-navy">Manage Colleges</h1>
          <p className="text-sm text-gray-500 mt-1">{colleges.length} institutions in database</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-sm bg-white"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow"
          >
            <Plus className="w-5 h-5" /> Add College
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">Location</th>
              <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">Type</th>
              <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  No colleges found matching &ldquo;{search}&rdquo;
                </td>
              </tr>
            ) : (
              filtered.map((college) => (
                <tr key={college.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-d2c-navy">{college.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5 font-mono">{college.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{college.location || "—"}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    <span className="px-3 py-1 bg-gray-100 text-d2c-navy rounded-full text-xs font-semibold">
                      {college.type || "Private"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/colleges/${college.id}`}
                        className="p-2 text-d2c-sky hover:bg-d2c-sky/10 rounded-lg transition-colors"
                        title="Edit College"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(college.id, college.name)}
                        disabled={deletingId === college.id}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete College"
                      >
                        {deletingId === college.id ? (
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

      {/* Add College Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-sora font-bold text-d2c-navy">Add New College</h2>
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
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">College Name *</label>
                <input
                  required
                  value={newCollege.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setNewCollege(prev => ({ ...prev, name, slug }));
                  }}
                  placeholder="e.g. Heritage Institute of Technology"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Slug *</label>
                  <input
                    required
                    value={newCollege.slug}
                    onChange={(e) => setNewCollege(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="e.g. hitk-kolkata"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Type</label>
                  <select
                    value={newCollege.type}
                    onChange={(e) => setNewCollege(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm bg-white"
                  >
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="Deemed">Deemed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Location</label>
                <input
                  value={newCollege.location}
                  onChange={(e) => setNewCollege(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g. Kolkata, West Bengal"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-d2c-navy uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newCollege.description}
                  onChange={(e) => setNewCollege(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Overview of the college..."
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
                  Create College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
