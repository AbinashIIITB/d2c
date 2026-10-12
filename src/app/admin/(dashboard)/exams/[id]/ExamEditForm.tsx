"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, ExternalLink, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface ExamEditFormProps {
  exam: any;
  serverAction?: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>;
}

export function ExamEditForm({ exam, serverAction }: ExamEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: exam.name || "",
    slug: exam.slug || "",
    fullName: exam.full_name || exam.fullName || "",
    aboutExam: exam.about_exam || exam.aboutExam || "",
    description: exam.description || "",
    date: exam.date || "",
    applicationLink: exam.application_link || exam.applicationLink || "",
    logoUrl: exam.logo_url || exam.logoUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        id: exam.id,
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        full_name: formData.fullName.trim(),
        about_exam: formData.aboutExam.trim(),
        description: formData.description.trim(),
        date: formData.date.trim(),
        application_link: formData.applicationLink.trim(),
        logo_url: formData.logoUrl.trim(),
      };

      // Send update request to our REST API endpoint
      const res = await fetch(`/api/exams/${encodeURIComponent(exam.id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Failed to update exam in database");
      }

      setSuccessMsg("Exam successfully updated!");
      router.refresh();

      setTimeout(() => {
        router.push("/admin/exams");
      }, 800);
    } catch (err: any) {
      console.error("Exam update failed:", err);
      setErrorMsg(err.message || "An unexpected error occurred while updating the exam.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/exams"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-d2c-navy transition-colors border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-sora font-bold text-d2c-navy">Edit Exam</h1>
            <p className="text-xs text-gray-500 mt-1">ID: <code className="bg-gray-100 px-2 py-0.5 rounded">{exam.id}</code></p>
          </div>
        </div>

        {exam.slug && (
          <Link
            href={`/exams/${exam.slug}`}
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
            <p className="font-bold text-sm">Failed to Update Exam</p>
            <p className="text-xs mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 shrink-0 text-green-500" />
          <div>
            <p className="font-bold text-sm">{successMsg}</p>
            <p className="text-xs mt-0.5">Redirecting to exams list...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="id" value={exam.id} />

          {/* Basic Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Exam Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Exam Short Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. BITSAT 2027"
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
                  placeholder="e.g. bitsat-2027"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-mono text-sm text-d2c-navy"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">Full Examination Name *</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="e.g. Birla Institute of Technology and Science Admission Test"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
            />
          </div>

          {/* Dates & Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Schedule & Application
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Exam Dates / Session Details</label>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="e.g. Session 1: May 2027 | Session 2: June 2027"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Official Application Link</label>
                <input
                  name="applicationLink"
                  value={formData.applicationLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">Logo URL</label>
            <input
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              placeholder="/images/... or https://..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
            />
          </div>

          {/* Content & Descriptions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Exam Details & Overview
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Concise overview of the entrance exam..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">About / Detailed Overview</label>
                <textarea
                  name="aboutExam"
                  value={formData.aboutExam}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Detailed information regarding the exam, eligibility, scoring, and history..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy leading-relaxed"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/admin/exams"
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
