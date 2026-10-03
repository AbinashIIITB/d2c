import Link from 'next/link';
import { LogOut, Home, GraduationCap, FileText, Settings, Database } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-dm-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-d2c-navy text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-sora font-bold text-white tracking-tight">D2C <span className="text-d2c-gold">Admin</span></h2>
          <p className="text-xs text-d2c-ice/60 mt-1 uppercase tracking-widest">Control Panel</p>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Home className="w-5 h-5 text-d2c-sky" /> Dashboard
          </Link>
          <Link href="/admin/colleges" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <GraduationCap className="w-5 h-5 text-d2c-royal" /> Manage Colleges
          </Link>
          <Link href="/admin/exams" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <FileText className="w-5 h-5 text-d2c-success" /> Manage Exams
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400 transition-colors">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
