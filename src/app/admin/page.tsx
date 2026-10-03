import { supabaseAdmin } from "@/lib/supabase";
import { Users, GraduationCap, FileText, Database } from "lucide-react";

export default async function AdminDashboard() {
  const { count: collegeCount } = await supabaseAdmin.from('colleges').select('*', { count: 'exact', head: true });
  const { count: examCount } = await supabaseAdmin.from('exams').select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1 className="text-3xl font-sora font-bold text-d2c-navy mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-d2c-royal/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7 text-d2c-royal" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Colleges</p>
            <p className="text-3xl font-bold text-d2c-navy">{collegeCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-d2c-success/10 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7 text-d2c-success" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Exams</p>
            <p className="text-3xl font-bold text-d2c-navy">{examCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-d2c-sky/10 flex items-center justify-center shrink-0">
            <Database className="w-7 h-7 text-d2c-sky" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Storage Status</p>
            <p className="text-3xl font-bold text-d2c-navy">Active</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
            <Users className="w-7 h-7 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Active Roles</p>
            <p className="text-3xl font-bold text-d2c-navy">2</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-d2c-navy mb-4">Quick Actions</h2>
        <p className="text-gray-500 mb-6">Use the sidebar to navigate to the specific management pages. You can add, edit, and delete entries. SEO tags and metadata can be updated directly within the edit forms.</p>
        
        {/* Placeholder for future activity feed */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center text-gray-400 font-medium">
          Activity log will appear here
        </div>
      </div>
    </div>
  );
}
