"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, ExternalLink, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface CollegeEditFormProps {
  college: any;
  serverAction?: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>;
}

export function CollegeEditForm({ college, serverAction }: CollegeEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: college.name || "",
    slug: college.slug || "",
    location: college.location || "",
    state: college.state || "",
    type: college.type || "Private",
    fees: college.fees || "",
    rating: college.rating !== undefined ? String(college.rating) : "4.0",
    reviews: college.reviews !== undefined ? String(college.reviews) : "100",
    established: college.established || "",
    imageUrl: college.image_url || college.imageUrl || "",
    description: college.description || college.about || "",
    tags: Array.isArray(college.tags) ? college.tags.join(", ") : (college.tags || ""),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        id: college.id,
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        location: formData.location.trim(),
        state: formData.state.trim(),
        type: formData.type,
        fees: formData.fees.trim(),
        rating: parseFloat(formData.rating) || 4.0,
        reviews: parseInt(formData.reviews, 10) || 0,
        established: formData.established.trim(),
        image_url: formData.imageUrl.trim(),
        description: formData.description.trim(),
        about: formData.description.trim(), // Keep about synced with description
        tags: formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      };

      // 1. Send update request to our REST API endpoint
      const res = await fetch(`/api/colleges/${encodeURIComponent(college.id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Failed to update college in database");
      }

      setSuccessMsg("College successfully updated!");
      router.refresh();

      setTimeout(() => {
        router.push("/admin/colleges");
      }, 800);
    } catch (err: any) {
      console.error("College update failed:", err);
      setErrorMsg(err.message || "An unexpected error occurred while updating the college.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/colleges"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-d2c-navy transition-colors border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-sora font-bold text-d2c-navy">Edit College</h1>
            <p className="text-xs text-gray-500 mt-1">ID: <code className="bg-gray-100 px-2 py-0.5 rounded">{college.id}</code></p>
          </div>
        </div>

        {college.slug && (
          <Link
            href={`/colleges/${college.slug}`}
            target="_blank"
            className="hidden sm:flex items-center gap-2 text-sm text-d2c-royal hover:underline font-semibold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
          >
            <ExternalLink className="w-4 h-4" /> View Live Page
          </Link>
        )}
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
          <div>
            <p className="font-bold text-sm">Failed to Update College</p>
            <p className="text-xs mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 shrink-0 text-green-500" />
          <div>
            <p className="font-bold text-sm">{successMsg}</p>
            <p className="text-xs mt-0.5">Redirecting to colleges list...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="id" value={college.id} />

          {/* Basic Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Basic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">College Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Institute of Engineering & Management"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">URL Slug *</label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="e.g. iem-salt-lake"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-mono text-sm text-d2c-navy"
                />
              </div>
            </div>
          </div>

          {/* Location & Type */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Location & Institution Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Salt Lake, Kolkata"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">State</label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. West Bengal"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">College Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy bg-white"
                >
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                  <option value="Deemed">Deemed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fees & Metrics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Fees & Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Fee Structure String</label>
                <input
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  placeholder="e.g. ₹ 7.65L - 8.70L Total"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Rating (0 - 5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Reviews Count</label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
            </div>
          </div>

          {/* Media & Established */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">Established Year</label>
              <input
                name="established"
                value={formData.established}
                onChange={handleChange}
                placeholder="e.g. 1989"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">Image URL</label>
              <input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="/images/colleges/... or https://..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
              />
            </div>
          </div>

          {/* Description & SEO */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Content & SEO
            </h3>
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">Description / About</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Full description and overview for this college..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy leading-relaxed"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">This updates both the overview description and about section on the college detail page.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">SEO Tags (comma separated)</label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. btech, engineering, top college, direct admission"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
            />
            <p className="text-xs text-gray-500 mt-2">These tags will automatically be injected into page metadata for better Google Rankings.</p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/admin/colleges"
              className="text-gray-500 hover:text-d2c-navy text-sm font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-d2c-royal hover:bg-d2c-navy text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
