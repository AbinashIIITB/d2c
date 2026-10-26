import { supabaseAdmin } from "@/lib/supabase";
import { Users, GraduationCap, FileText, Database, Plus, Edit2, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { count: collegeCount } = await supabaseAdmin.from('colleges').select('*', { count: 'exact', head: true });
  const { count: examCount } = await supabaseAdmin.from('exams').select('*', { count: 'exact', head: true });

  const { data: recentColleges } = await supabaseAdmin
    .from('colleges')
    .select('id, name, slug, location, type, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5);

  const { data: recentExams } = await supabaseAdmin
    .from('exams')
    .select('id, name, slug, date, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sora font-bold text-d2c-navy">Dashboard Overview</h1>
          <p className="text-xs text-gray-500 mt-1">Direct2Campus Content & Admission Management Hub</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/colleges/new"
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-d2c-royal/20 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add College
          </Link>
          <Link
            href="/admin/exams/new"
            className="bg-white hover:bg-gray-50 border border-gray-200 text-d2c-navy px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-d2c-royal" /> Add Exam
          </Link>
        </div>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-d2c-royal/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-d2c-royal" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Colleges</p>
            <p className="text-2xl font-sora font-bold text-d2c-navy">{collegeCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-d2c-success/10 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-d2c-success" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Entrance Exams</p>
            <p className="text-2xl font-sora font-bold text-d2c-navy">{examCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Admission Leads</p>
            <p className="text-2xl font-sora font-bold text-d2c-navy">Active</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-d2c-sky/10 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-d2c-sky" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Supabase Storage</p>
            <p className="text-2xl font-sora font-bold text-emerald-600">Connected</p>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/colleges/new"
          className="p-6 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-d2c-royal text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="font-sora font-bold text-d2c-navy text-base group-hover:text-d2c-royal transition-colors">
            Publish New College
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Create college profile, add course fees, placement statistics, gallery images and FAQs.
          </p>
        </Link>

        <Link
          href="/admin/exams/new"
          className="p-6 bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="font-sora font-bold text-d2c-navy text-base group-hover:text-emerald-700 transition-colors">
            Publish New Exam Guide
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Configure examination pattern, dates, registration portal, eligibility criteria and syllabus.
          </p>
        </Link>

        <Link
          href="/admin/leads"
          className="p-6 bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-sora font-bold text-d2c-navy text-base group-hover:text-purple-700 transition-colors">
            Review Student Leads
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Track inquiries submitted through callback forms, filter by program and export CSV.
          </p>
        </Link>
      </div>

      {/* Recent Updates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colleges */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-sora font-bold text-d2c-navy">Recently Updated Colleges</h3>
            <Link
              href="/admin/colleges"
              className="text-xs text-d2c-royal hover:underline font-bold flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {(recentColleges || []).map((col) => (
              <div key={col.id} className="py-3 flex items-center justify-between gap-4">
                <div className="overflow-hidden">
                  <div className="font-bold text-xs text-d2c-navy truncate">{col.name}</div>
                  <div className="text-[11px] text-gray-400 font-mono">/colleges/{col.slug}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/colleges/${col.slug}`}
                    target="_blank"
                    className="p-1.5 text-gray-400 hover:text-d2c-royal"
                    title="View page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/admin/colleges/${col.id}`}
                    className="p-1.5 text-gray-400 hover:text-d2c-royal"
                    title="Edit college"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exams */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-sora font-bold text-d2c-navy">Recently Updated Exams</h3>
            <Link
              href="/admin/exams"
              className="text-xs text-d2c-royal hover:underline font-bold flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {(recentExams || []).map((exam) => (
              <div key={exam.id} className="py-3 flex items-center justify-between gap-4">
                <div className="overflow-hidden">
                  <div className="font-bold text-xs text-d2c-navy truncate">{exam.name}</div>
                  <div className="text-[11px] text-gray-400 font-mono">/exams/{exam.slug}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/exams/${exam.slug}`}
                    target="_blank"
                    className="p-1.5 text-gray-400 hover:text-d2c-royal"
                    title="View page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/admin/exams/${exam.id}`}
                    className="p-1.5 text-gray-400 hover:text-d2c-royal"
                    title="Edit exam"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
