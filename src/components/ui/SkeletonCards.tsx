import { Star, MapPin, ArrowUpRight, ChevronRight, BookOpen, Calendar, Clock, User, ArrowRight } from "lucide-react";

/** Exact pixel-accurate skeleton matching CollegeCard component */
export function CollegeCardSkeleton() {
  return (
    <div className="relative flex flex-col bg-white border border-slate-100 overflow-hidden h-full shadow-sm rounded-2xl select-none pointer-events-none">
      {/* ── IMAGE SECTION ── */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
        <div className="absolute inset-0 skeleton-shimmer" />

        {/* Premium Badge skeleton */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-widest uppercase shadow-sm border border-slate-100">
          <Star className="w-3 h-3 fill-amber-300/60 text-amber-300/60" />
          <div className="h-2.5 w-12 rounded bg-slate-200/80 skeleton-shimmer" />
        </div>

        {/* Location Pill skeleton */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium">
          <MapPin className="w-3.5 h-3.5 text-sky-300/70" />
          <div className="h-2.5 w-20 rounded bg-white/30 skeleton-shimmer" />
        </div>

        {/* Arrow Up Right Button skeleton */}
        <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-70">
          <ArrowUpRight className="w-5 h-5 text-slate-300" />
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Title (2 lines) */}
        <div className="space-y-2 mb-4">
          <div className="h-5 w-[85%] rounded-lg bg-slate-100 skeleton-shimmer" />
          <div className="h-5 w-[55%] rounded-lg bg-slate-100 skeleton-shimmer" />
        </div>

        {/* Action Button Area */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="h-4 w-28 rounded-md bg-slate-100 skeleton-shimmer" />
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </div>

      {/* Top gold stripe placeholder */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-200/50" />
    </div>
  );
}

export function CollegesGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
      {Array.from({ length: count }).map((_, i) => (
        <CollegeCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Exact pixel-accurate skeleton matching Exam card in ExamsList */
export function ExamCardSkeleton() {
  return (
    <div className="relative block bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm h-full select-none pointer-events-none">
      {/* Top accent gradient bar */}
      <div className="h-1.5 w-full bg-slate-200 skeleton-shimmer" />

      <div className="p-7">
        {/* Logo + Title header */}
        <div className="flex items-start gap-5 mb-5">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-center shrink-0 overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-slate-200/60 skeleton-shimmer" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-6 w-3/4 rounded-lg bg-slate-100 skeleton-shimmer" />
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100">
              <BookOpen className="w-3 h-3 text-slate-300" />
              <div className="h-3 w-16 rounded bg-slate-200/70 skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Description (3 lines) */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full rounded bg-slate-100 skeleton-shimmer" />
          <div className="h-4 w-[90%] rounded bg-slate-100 skeleton-shimmer" />
          <div className="h-4 w-[65%] rounded bg-slate-100 skeleton-shimmer" />
        </div>

        {/* CTA footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="h-4 w-32 rounded bg-slate-100 skeleton-shimmer" />
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExamsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <ExamCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Exact pixel-accurate skeleton matching Blog article in BlogsList */
export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full select-none pointer-events-none">
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 skeleton-shimmer" />
        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 shadow-sm border border-slate-100">
          <div className="h-3 w-16 rounded bg-slate-200 skeleton-shimmer" />
        </div>
      </div>

      {/* Body Content */}
      <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Meta row (date + read time) */}
          <div className="flex items-center gap-4 mb-3.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-300" />
              <div className="h-3 w-16 rounded bg-slate-100 skeleton-shimmer" />
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <div className="h-3 w-14 rounded bg-slate-100 skeleton-shimmer" />
            </div>
          </div>

          {/* Title (2 lines) */}
          <div className="space-y-2 mb-3">
            <div className="h-5 w-[90%] rounded-lg bg-slate-100 skeleton-shimmer" />
            <div className="h-5 w-[65%] rounded-lg bg-slate-100 skeleton-shimmer" />
          </div>

          {/* Excerpt (3 lines) */}
          <div className="space-y-1.5 mb-6">
            <div className="h-3.5 w-full rounded bg-slate-100 skeleton-shimmer" />
            <div className="h-3.5 w-[92%] rounded bg-slate-100 skeleton-shimmer" />
            <div className="h-3.5 w-[70%] rounded bg-slate-100 skeleton-shimmer" />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <div className="h-3 w-20 rounded bg-slate-100 skeleton-shimmer" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-14 rounded bg-slate-100 skeleton-shimmer" />
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
