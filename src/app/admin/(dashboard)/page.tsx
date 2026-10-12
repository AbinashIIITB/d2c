import { getAllColleges, getAllExams } from "@/lib/data-service";
import Link from "next/link";
import { GraduationCap, FileText, Globe, ShieldCheck, ArrowRight, Tag } from "lucide-react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  const colleges = await getAllColleges();
  const exams = await getAllExams();

  const collegeCount = colleges.length;
  const examCount = exams.length;
  const seoCoveredCount = colleges.filter(c => Array.isArray(c.tags) && c.tags.length > 0).length;

  const uniqueStates = new Set(
    colleges.map(c => {
      if (c.state) return c.state.trim();
      if (c.location) {
        const parts = c.location.split(',');
        return parts[parts.length - 1].trim();
      }
      return 'Other';
    })
  );
  const statesCount = uniqueStates.size;
  const seoCoveragePercent = Math.round((seoCoveredCount / (collegeCount || 1)) * 100);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-sora font-bold text-d2c-navy">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">SEO & GEO Management and Admission Intelligence Console</p>
        </div>

        <Link
          href="/admin/analytics"
          className="bg-d2c-royal hover:bg-d2c-navy text-white px-5 py-2.5 rounded-xl font-bold transition-all text-sm flex items-center gap-2 shadow-sm"
        >
          <Globe className="w-4 h-4" /> Open SEO & GEO Console
        </Link>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-d2c-royal/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7 text-d2c-royal" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Colleges</p>
            <p className="text-3xl font-bold text-d2c-navy">{collegeCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Active in database</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-d2c-success/10 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7 text-d2c-success" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Entrance Exams</p>
            <p className="text-3xl font-bold text-d2c-navy">{examCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">WBJEE, BITSAT, SRMJEEE</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">SEO Tag Coverage</p>
            <p className="text-3xl font-bold text-d2c-navy">{seoCoveragePercent}%</p>
            <p className="text-xs text-purple-600 font-semibold mt-0.5">{seoCoveredCount} of {collegeCount} tagged</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Globe className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">GEO Regions</p>
            <p className="text-3xl font-bold text-d2c-navy">{statesCount} States</p>
            <p className="text-xs text-gray-500 mt-0.5">Pan-India coverage</p>
          </div>
        </div>
      </div>

      {/* SEO & GEO Mission Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-[#0B1120] to-[#1e293b] rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-d2c-royal/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f6c804]">Core Feature</span>
            <h2 className="text-2xl font-sora font-bold mt-2 mb-3">SEO & GEO Analytics Suite</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Track live organic search impressions, inspect URL meta health, monitor regional geographical distributions, and target high-converting entrance exam keywords.
            </p>
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-2 bg-[#f6c804] hover:bg-[#e5b703] text-[#0B1120] font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm"
            >
              Launch Live Console <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-d2c-navy mb-2 flex items-center gap-2">
              <Tag className="w-5 h-5 text-d2c-royal" /> Quick Actions & Content Control
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Manage your colleges, exams, and platform preferences. All updates are synchronized in real-time.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/colleges"
                className="p-4 rounded-xl border border-gray-100 hover:border-d2c-royal/30 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
              >
                <GraduationCap className="w-5 h-5 text-d2c-royal mb-2" />
                <span className="font-bold text-sm text-d2c-navy">Manage Colleges</span>
                <span className="text-xs text-gray-400">Edit SEO & Details</span>
              </Link>

              <Link
                href="/admin/exams"
                className="p-4 rounded-xl border border-gray-100 hover:border-d2c-success/30 hover:bg-green-50/30 transition-all flex flex-col justify-between"
              >
                <FileText className="w-5 h-5 text-d2c-success mb-2" />
                <span className="font-bold text-sm text-d2c-navy">Manage Exams</span>
                <span className="text-xs text-gray-400">Deadlines & Patterns</span>
              </Link>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>Sitemap: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-d2c-navy font-semibold">/sitemap.xml</code></span>
            <Link href="/admin/settings" className="font-bold text-d2c-royal hover:underline">
              Platform Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
