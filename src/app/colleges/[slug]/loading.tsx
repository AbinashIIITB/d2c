import { ChevronRight, Shield, Sparkles, Star, MapPin, Building2, DollarSign, TrendingUp, CheckCircle2 } from "lucide-react";

export default function CollegeDetailLoading() {
  return (
    <div className="pb-6 lg:pb-12 min-h-screen bg-[#faf8ff] select-none pointer-events-none">
      {/* ═══════════════════════════════════════════
          HERO SECTION — Exact replica of CollegeHero
      ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-[#0B1120]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,76,192,0.25),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 border-b border-white/[0.12]" />

        <div className="content-boundary relative z-10 pt-28 pb-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-white/40">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span>Colleges</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <div className="h-4 w-32 rounded bg-white/20 skeleton-shimmer-dark" />
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Image Skeleton */}
            <div className="shrink-0 mt-2 w-full lg:w-auto">
              <div className="relative w-full aspect-video lg:aspect-auto lg:h-64 lg:w-96 bg-white/[0.08] backdrop-blur-2xl rounded-2xl p-2 border border-white/[0.12] overflow-hidden">
                <div className="w-full h-full rounded-xl bg-white/10 skeleton-shimmer-dark" />
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 w-full">
              {/* Badges row */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.06] rounded-lg border border-white/[0.06]">
                  <Shield className="w-3 h-3 text-sky-400/50" />
                  <div className="h-3 w-16 rounded bg-white/20 skeleton-shimmer-dark" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400/[0.08] rounded-lg border border-amber-400/[0.12]">
                  <Sparkles className="w-3 h-3 text-amber-400/50" />
                  <div className="h-3 w-20 rounded bg-amber-400/20 skeleton-shimmer-dark" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.06] rounded-lg border border-white/[0.06]">
                  <Star className="w-3 h-3 text-amber-400/50" />
                  <div className="h-3 w-24 rounded bg-white/20 skeleton-shimmer-dark" />
                </div>
              </div>

              {/* College Name (2 lines) */}
              <div className="space-y-3 mb-5">
                <div className="h-10 sm:h-12 w-[85%] rounded-xl bg-white/15 skeleton-shimmer-dark" />
                <div className="h-10 sm:h-12 w-[55%] rounded-xl bg-white/15 skeleton-shimmer-dark" />
              </div>

              {/* Location & Affiliation */}
              <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-400/60" />
                  <div className="h-4 w-36 rounded bg-white/20 skeleton-shimmer-dark" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-white/30" />
                  <div className="h-4 w-44 rounded bg-white/20 skeleton-shimmer-dark" />
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/[0.08]">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-2">
                    <div className="h-3 w-16 rounded bg-white/20 skeleton-shimmer-dark" />
                    <div className="h-6 w-20 rounded bg-white/30 skeleton-shimmer-dark" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — Tonal Layered Layout
      ═══════════════════════════════════════════ */}
      <div className="content-boundary mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Overview Card */}
            <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="p-3 rounded-xl bg-[#3B4CC0]/[0.08]">
                  <Building2 className="w-6 h-6 text-[#3B4CC0]/50" />
                </div>
                <div className="h-7 w-52 rounded-lg bg-slate-100 skeleton-shimmer" />
              </div>
              <div className="space-y-2.5">
                <div className="h-4 w-full rounded bg-slate-100 skeleton-shimmer" />
                <div className="h-4 w-[96%] rounded bg-slate-100 skeleton-shimmer" />
                <div className="h-4 w-[90%] rounded bg-slate-100 skeleton-shimmer" />
                <div className="h-4 w-[75%] rounded bg-slate-100 skeleton-shimmer" />
              </div>
              {/* Highlights 2x2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {[1, 2, 3, 4].map((h) => (
                  <div key={h} className="flex items-center gap-3.5 p-5 rounded-xl bg-[#f2f3ff]">
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e]/50 shrink-0" />
                    <div className="h-4 w-40 rounded bg-slate-200/70 skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Courses & Fees Card */}
            <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="p-3 rounded-xl bg-[#f6c804]/[0.1]">
                  <DollarSign className="w-6 h-6 text-[#b8960a]/50" />
                </div>
                <div>
                  <div className="h-7 w-60 rounded-lg bg-slate-100 skeleton-shimmer mb-1" />
                  <div className="h-4 w-40 rounded bg-slate-100 skeleton-shimmer" />
                </div>
              </div>
              {/* Table */}
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <div className="bg-[#f2f3ff] px-6 py-4 flex justify-between">
                  <div className="h-3 w-28 rounded bg-slate-200/80 skeleton-shimmer" />
                  <div className="h-3 w-20 rounded bg-slate-200/80 skeleton-shimmer" />
                </div>
                {[1, 2, 3, 4].map((r) => (
                  <div key={r} className="px-6 py-4 border-b border-slate-50 flex justify-between bg-white">
                    <div className="h-4 w-44 rounded bg-slate-100 skeleton-shimmer" />
                    <div className="h-4 w-24 rounded bg-slate-100 skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Placements Card */}
            <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="p-3 rounded-xl bg-[#22c55e]/[0.08]">
                  <TrendingUp className="w-6 h-6 text-[#22c55e]/50" />
                </div>
                <div className="h-7 w-56 rounded-lg bg-slate-100 skeleton-shimmer" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((st) => (
                  <div key={st} className="p-4 rounded-xl bg-[#faf8ff] space-y-2">
                    <div className="h-3 w-16 rounded bg-slate-200/60 skeleton-shimmer" />
                    <div className="h-6 w-20 rounded bg-slate-200/80 skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Enquiry Form Card */}
            <div className="bg-white rounded-[1.25rem] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-100 space-y-5">
              <div className="space-y-2">
                <div className="h-6 w-48 rounded-lg bg-slate-100 skeleton-shimmer" />
                <div className="h-4 w-full rounded bg-slate-100 skeleton-shimmer" />
              </div>
              <div className="space-y-3.5 pt-2">
                <div className="h-11 w-full rounded-xl bg-slate-50 border border-slate-100" />
                <div className="h-11 w-full rounded-xl bg-slate-50 border border-slate-100" />
                <div className="h-11 w-full rounded-xl bg-slate-50 border border-slate-100" />
                <div className="h-12 w-full rounded-xl bg-[#3B4CC0]/20 skeleton-shimmer mt-4" />
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="bg-white rounded-[1.25rem] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-100 space-y-4">
              <div className="h-5 w-32 rounded bg-slate-100 skeleton-shimmer mb-4" />
              {[1, 2, 3, 4, 5].map((q) => (
                <div key={q} className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div className="h-4 w-24 rounded bg-slate-100 skeleton-shimmer" />
                  <div className="h-4 w-28 rounded bg-slate-100 skeleton-shimmer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
