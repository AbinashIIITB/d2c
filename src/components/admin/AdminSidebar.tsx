'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageSwitcher } from '@/components/admin/cms/PageSwitcher';
import { 
  Home, 
  GraduationCap, 
  FileText, 
  BarChart3, 
  ImageIcon, 
  Users, 
  ExternalLink,
  LogOut,
  Layers,
  Sparkles,
  Newspaper,
  Globe,
  PenSquare,
  SlidersHorizontal,
  PanelTop,
  LayoutTemplate
} from 'lucide-react';

const CONTENT_SHORTCUTS = ['/admin/content/site', '/admin/content/navbar', '/admin/content/home'];

const NAV_ITEMS: { href: string; label: string; icon: typeof Home; exact?: boolean; contentRoot?: boolean }[] = [
  { href: '/admin', label: 'Dashboard', icon: Home, exact: true },
  { href: '/admin/content', label: 'Website content', icon: PenSquare, contentRoot: true },
  { href: '/admin/content/site', label: 'Site settings', icon: SlidersHorizontal },
  { href: '/admin/content/navbar', label: 'Navigation & footer', icon: PanelTop },
  { href: '/admin/content/home', label: 'Home page', icon: LayoutTemplate },
  { href: '/admin/colleges', label: 'Colleges', icon: GraduationCap },
  { href: '/admin/exams', label: 'Exams', icon: FileText },
  { href: '/admin/blogs', label: 'Blogs', icon: Newspaper },
  { href: '/admin/pages', label: 'Custom pages', icon: Globe },
  { href: '/admin/seo', label: 'SEO Studio', icon: Sparkles },
  { href: '/admin/media', label: 'Media library', icon: ImageIcon },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    if (item.contentRoot) {
      return (
        (pathname === item.href || pathname.startsWith(`${item.href}/`)) &&
        !CONTENT_SHORTCUTS.some((h) => pathname === h || pathname.startsWith(`${h}/`))
      );
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <aside className="w-64 bg-d2c-navy text-white flex flex-col fixed inset-y-0 left-0 z-50 shadow-xl border-r border-white/5 font-dm-sans">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-d2c-royal flex items-center justify-center font-bold text-white shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-sora font-bold text-white tracking-tight">
              D2C <span className="text-d2c-gold">Admin</span>
            </h2>
          </div>
          <p className="text-[11px] text-d2c-ice/60 mt-1 uppercase tracking-widest font-semibold">
            Content Management
          </p>
        </div>
      </div>
      
      <div className="px-3 pt-4">
        <PageSwitcher variant="sidebar" hotkey={!/^\/admin\/content\/[^/]+/.test(pathname)} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active 
                  ? 'bg-d2c-royal text-white shadow-md font-semibold' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-d2c-sky'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-d2c-gold" />
              <span>View Public Site</span>
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/60">Live</span>
          </Link>
        </div>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/10 bg-black/10">
        <form action="/api/admin/logout" method="POST">
          <button 
            type="submit" 
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl hover:bg-red-500/20 text-red-300 hover:text-red-200 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> 
            <span>Log Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
