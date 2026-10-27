import { ArrowLeft, Calendar, User, Clock, PhoneCall } from "lucide-react";

export default function BlogDetailLoading() {
  return (
    <div className="pb-24 bg-d2c-white min-h-screen font-dm-sans select-none pointer-events-none">
      {/* ── Hero Header matching blog/[slug]/page.tsx ── */}
      <div className="bg-d2c-navy pt-32 pb-24 px-4 shadow-xl border-b-4 border-d2c-royal relative overflow-hidden">
        <div className="content-boundary relative z-10 max-w-5xl mx-auto">
          {/* Back button */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 mb-8">
            <ArrowLeft className="w-3.5 h-3.5 text-d2c-sky/60" /> Back to All Articles
          </div>

          <div>
            {/* Category badge */}
            <div className="inline-block px-3 py-1 bg-d2c-sky/15 border border-d2c-sky/30 rounded-md mb-4">
              <div className="h-3 w-24 rounded bg-d2c-sky/30 skeleton-shimmer-dark" />
            </div>

            {/* Title (2 lines) */}
            <div className="space-y-3 mb-6 max-w-4xl">
              <div className="h-10 md:h-14 w-[90%] rounded-xl bg-white/15 skeleton-shimmer-dark" />
              <div className="h-10 md:h-14 w-[60%] rounded-xl bg-white/15 skeleton-shimmer-dark" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2 mb-8 max-w-3xl">
              <div className="h-4 w-full rounded bg-white/10 skeleton-shimmer-dark" />
              <div className="h-4 w-[80%] rounded bg-white/10 skeleton-shimmer-dark" />
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-d2c-sky/60" />
                </div>
                <div className="h-3.5 w-24 rounded bg-white/20 skeleton-shimmer-dark" />
              </div>
              <div className="flex items-center gap-1.5 text-white/40">
                <Calendar className="w-4 h-4" />
                <div className="h-3.5 w-20 rounded bg-white/20 skeleton-shimmer-dark" />
              </div>
              <div className="flex items-center gap-1.5 text-white/40">
                <Clock className="w-4 h-4" />
                <div className="h-3.5 w-16 rounded bg-white/20 skeleton-shimmer-dark" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Cover Image & Content ── */}
      <div className="content-boundary max-w-5xl mx-auto -mt-12 px-4 relative z-20">
        {/* Cover Image Skeleton */}
        <div className="w-full h-[320px] md:h-[460px] rounded-3xl bg-slate-200 overflow-hidden shadow-2xl border border-white/20 relative mb-12">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main article content */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="h-7 w-60 rounded-xl bg-slate-100 skeleton-shimmer mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-100 skeleton-shimmer" />
              <div className="h-4 w-[96%] rounded bg-slate-100 skeleton-shimmer" />
              <div className="h-4 w-[90%] rounded bg-slate-100 skeleton-shimmer" />
              <div className="h-4 w-[75%] rounded bg-slate-100 skeleton-shimmer" />
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="h-5 w-48 rounded bg-slate-200/80 skeleton-shimmer" />
              <div className="h-4 w-full rounded bg-slate-100 skeleton-shimmer" />
              <div className="h-4 w-[85%] rounded bg-slate-100 skeleton-shimmer" />
            </div>

            <div className="h-7 w-48 rounded-xl bg-slate-100 skeleton-shimmer pt-4 mb-2" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-100 skeleton-shimmer" />
              <div className="h-4 w-[94%] rounded bg-slate-100 skeleton-shimmer" />
              <div className="h-4 w-[82%] rounded bg-slate-100 skeleton-shimmer" />
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-d2c-royal/10 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-d2c-royal" />
                </div>
                <div className="space-y-1">
                  <div className="h-4 w-32 rounded bg-slate-100 skeleton-shimmer" />
                  <div className="h-3 w-24 rounded bg-slate-100 skeleton-shimmer" />
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="h-10 w-full rounded-xl bg-slate-50 border border-slate-100" />
                <div className="h-10 w-full rounded-xl bg-slate-50 border border-slate-100" />
                <div className="h-10 w-full rounded-xl bg-slate-50 border border-slate-100" />
                <div className="h-11 w-full rounded-xl bg-d2c-royal/20 skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
