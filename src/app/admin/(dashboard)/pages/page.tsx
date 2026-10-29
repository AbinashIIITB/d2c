import Link from "next/link";
import { getAllPages } from "@/lib/page-service";
import { 
  Globe, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  FileEdit, 
  Layers, 
  Megaphone, 
  FormInput,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminPagesListPage() {
  const pagesObj = await getAllPages();
  const pagesList = Object.values(pagesObj);

  return (
    <div className="space-y-8 font-dm-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-d2c-royal/10 text-d2c-royal flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-sora text-gray-900 tracking-tight">
                Website Pages & Live Editor
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Customize Homepage banners, announcements, welcome lead modal, and static marketing pages
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold text-d2c-navy bg-white hover:bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
          Preview Live Website
        </Link>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pagesList.map((page: any) => {
          const isHome = page.slug === "home";
          const publicUrl = isHome ? "/" : `/${page.slug}`;

          return (
            <div
              key={page.slug}
              className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-d2c-royal px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100">
                    {page.slug.toUpperCase()} PAGE
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3" /> Live
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-sora text-gray-900 group-hover:text-d2c-royal transition-colors">
                    {page.title?.split("–")[0]?.trim() || page.slug}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {page.description || "Marketing and public admissions page."}
                  </p>
                </div>

                {isHome && (
                  <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-xs">
                      <Megaphone className="w-3.5 h-3.5 text-d2c-gold" />
                      <span>Announcement Ticker: <strong>{page.announcement?.enabled ? "Active" : "Disabled"}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Layers className="w-3.5 h-3.5 text-d2c-royal" />
                      <span>Interactive Banners: <strong>{page.banners?.length || 0} Slides</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FormInput className="w-3.5 h-3.5 text-purple-600" />
                      <span>Welcome Lead Modal: <strong>{page.welcomeLeadModal?.enabled ? "Active (ON)" : "Disabled (OFF)"}</strong></span>
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
                  View
                </Link>

                <Link
                  href={`/admin/pages/${page.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  Live Preview Editor
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
