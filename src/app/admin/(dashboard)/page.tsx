import { getAllColleges, getAllExams, getAllBlogs } from "@/lib/data-service";
import { getAllPages } from "@/lib/page-service";
import { 
  Users, 
  GraduationCap, 
  FileText, 
  Database, 
  Plus, 
  Edit2, 
  ExternalLink, 
  ArrowRight,
  Newspaper,
  Globe,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { sortCollegesWithIEMFirst } from "@/lib/iem-priority";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let colleges: any[] = [];
  let exams: any[] = [];
  let blogs: any[] = [];
  let pages: any[] = [];

  try {
    [colleges, exams, blogs, pages] = await Promise.all([
      getAllColleges(),
      getAllExams(),
      getAllBlogs(),
      getAllPages()
    ]);
  } catch (err) {
    console.warn("Dashboard overview fetch:", err);
  }

  const recentColleges = sortCollegesWithIEMFirst(colleges.slice(0, 5));
  const recentExams = exams.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl font-dm-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">Dashboard Overview</h1>
          <p className="text-xs text-gray-500 mt-1">Direct2Campus Content, SEO Pages & Admission Management Hub</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/blogs/new"
            className="bg-white hover:bg-gray-50 border border-gray-200 text-d2c-navy px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Newspaper className="w-3.5 h-3.5 text-d2c-royal" /> New Blog
          </Link>
          <Link
            href="/admin/pages/new"
            className="bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> New SEO Page
          </Link>
          <Link
            href="/admin/colleges/new"
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-d2c-royal/20 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add College
          </Link>
        </div>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/colleges" className="bg-white p-5 rounded-2xl shadow-xs border border-gray-150 flex items-center gap-4 hover:border-d2c-royal/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-d2c-royal/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-d2c-royal" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Colleges</p>
            <p className="text-2xl font-sora font-bold text-d2c-navy">{colleges.length}</p>
          </div>
        </Link>

        <Link href="/admin/exams" className="bg-white p-5 rounded-2xl shadow-xs border border-gray-150 flex items-center gap-4 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Entrance Exams</p>
            <p className="text-2xl font-sora font-bold text-d2c-navy">{exams.length}</p>
          </div>
        </Link>

        <Link href="/admin/blogs" className="bg-white p-5 rounded-2xl shadow-xs border border-gray-150 flex items-center gap-4 hover:border-blue-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Blog Articles</p>
            <p className="text-2xl font-sora font-bold text-d2c-navy">{blogs.length}</p>
          </div>
        </Link>

        <Link href="/admin/leads" className="bg-white p-5 rounded-2xl shadow-xs border border-gray-150 flex items-center gap-4 hover:border-purple-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Student Leads</p>
            <p className="text-2xl font-sora font-bold text-d2c-navy">Categorized</p>
          </div>
        </Link>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/blogs/new"
          className="p-6 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-d2c-royal text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Newspaper className="w-5 h-5" />
          </div>
          <h3 className="font-sora font-bold text-d2c-navy text-base group-hover:text-d2c-royal transition-colors">
            Compose Blog Article
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Write admission insights with live device preview before publication.
          </p>
        </Link>

        <Link
          href="/admin/pages/new"
          className="p-6 bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-sora font-bold text-d2c-navy text-base group-hover:text-purple-700 transition-colors">
            WordPress-Style SEO Page
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Create landing pages with dedicated H1/H2/H3 tags, image alt text, and automatic sitemap inclusion.
          </p>
        </Link>

        <Link
          href="/admin/leads"
          className="p-6 bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-sora font-bold text-d2c-navy text-base group-hover:text-emerald-700 transition-colors">
            Form Submissions Listing
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            View individual submissions for B.Tech, MBA, Medical, and Callback inquiries.
          </p>
        </Link>
      </div>

      {/* Recent Colleges and Exams Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colleges */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="font-sora font-bold text-base text-d2c-navy flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-d2c-royal" /> Recent Colleges
            </h2>
            <Link href="/admin/colleges" className="text-xs font-semibold text-d2c-royal hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentColleges.map((c: any) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-d2c-navy leading-snug">{c.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{c.location || c.state}</p>
                </div>
                <Link
                  href={`/admin/colleges/${c.id}`}
                  className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Exams */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="font-sora font-bold text-base text-d2c-navy flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" /> Recent Exams
            </h2>
            <Link href="/admin/exams" className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentExams.map((e: any) => (
              <div key={e.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-d2c-navy leading-snug">{e.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{e.date || 'Exam Guide'}</p>
                </div>
                <Link
                  href={`/admin/exams/${e.id}`}
                  className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
