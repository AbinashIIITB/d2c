import Link from "next/link";
import { getAllPages, isCorePage } from "@/lib/page-service";
import { 
  Globe, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  FileEdit, 
  Layers, 
  Megaphone, 
  FormInput,
  ArrowRight,
  Plus,
  Trash2,
  FileText,
  Search,
  Check
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPagesListPage() {
  const pagesList = await getAllPages();

  const corePages = pagesList.filter((p: any) => isCorePage(p.slug));
  const customPages = pagesList.filter((p: any) => !isCorePage(p.slug));

  return (
    <div className="space-y-10 font-dm-sans max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-d2c-royal/10 text-d2c-royal flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-sora text-d2c-navy tracking-tight">
                Website Pages & Live Editor
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage all core website pages, edit banners, and compose WordPress-like SEO landing pages
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-d2c-navy bg-white hover:bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
            <span>View Live Site</span>
          </Link>

          <Link
            href="/admin/pages/new"
            className="text-xs font-bold text-white bg-d2c-royal hover:bg-blue-700 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New SEO Page</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: Core Website Pages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-sora text-d2c-navy flex items-center gap-2">
              <Layers className="w-4 h-4 text-d2c-royal" />
              <span>Core Website Pages ({corePages.length})</span>
            </h2>
            <p className="text-xs text-gray-500">
              Primary navigational pages across the Direct2Campus portal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corePages.map((page: any) => {
            const isHome = page.slug === "home";
            const publicUrl = isHome ? "/" : `/${page.slug}`;

            return (
              <div
                key={page.slug}
                className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-d2c-royal px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100">
                      {page.slug.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" /> Live
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-sora text-gray-900 group-hover:text-d2c-royal transition-colors">
                      {page.h1 || page.heading || page.title?.split("–")[0]?.trim() || page.slug}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {page.description || "Public portal page."}
                    </p>
                  </div>

                  {isHome && (
                    <div className="pt-2 border-t border-gray-100 space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2 text-xs">
                        <Megaphone className="w-3.5 h-3.5 text-d2c-gold" />
                        <span>Ticker: <strong>{page.announcement?.enabled ? "Active" : "Disabled"}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Layers className="w-3.5 h-3.5 text-d2c-royal" />
                        <span>Banners: <strong>{page.banners?.length || 0} Slides</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <FormInput className="w-3.5 h-3.5 text-purple-600" />
                        <span>Lead Modal: <strong>{page.welcomeLeadModal?.enabled ? "ON" : "OFF"}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <Link
                    href={publicUrl}
                    target="_blank"
                    className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Live</span>
                  </Link>

                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Edit Page</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Custom SEO Pages (WordPress Style) */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-sora text-d2c-navy flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Custom SEO Pages ({customPages.length})</span>
            </h2>
            <p className="text-xs text-gray-500">
              WordPress-like landing pages created by SEO analysts with dedicated H1/H2/H3 tags and image alt text
            </p>
          </div>

          <Link
            href="/admin/pages/new"
            className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Page</span>
          </Link>
        </div>

        {customPages.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-dashed border-gray-300 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-d2c-navy">No Custom SEO Pages Yet</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              SEO analysts can compose landing pages similar to WordPress with dedicated H1, H2, H3 tags, image alt text, and automatic sitemap inclusion.
            </p>
            <Link
              href="/admin/pages/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-d2c-royal text-white rounded-xl text-xs font-bold shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First SEO Page</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customPages.map((page: any) => (
              <div
                key={page.slug}
                className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100">
                      CUSTOM SEO PAGE
                    </span>
                    {page.published ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                        Draft
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-sora text-gray-900 group-hover:text-purple-700 transition-colors">
                      {page.h1 || page.title || page.slug}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {page.description || page.subheading || `Landing page at /${page.slug}`}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>URL:</span>
                      <span className="font-mono text-gray-800">/{page.slug}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>In Sitemap:</span>
                      <span className="font-semibold text-emerald-600">
                        {page.includeInSitemap !== false ? "Yes (Active)" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/${String(page.slug || '').replace(/^\/+|\/+$/g, '')}`}
                    target="_blank"
                    className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>

                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Edit Blocks</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
