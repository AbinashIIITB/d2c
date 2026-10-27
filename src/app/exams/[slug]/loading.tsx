export default function ExamDetailLoading() {
  return (
    <div className="min-h-screen bg-d2c-white">
      {/* Hero / header skeleton */}
      <div className="relative bg-d2c-navy py-20 overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer opacity-10" />
        <div className="content-boundary relative z-10">
          {/* Back button skeleton */}
          <div className="h-8 w-24 rounded-full skeleton-shimmer opacity-30 mb-8" />
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo skeleton */}
            <div className="w-20 h-20 rounded-xl skeleton-shimmer opacity-30 shrink-0" />
            <div className="space-y-3 flex-1">
              <div className="h-8 w-64 rounded-xl skeleton-shimmer opacity-25" />
              <div className="h-5 w-48 rounded-lg skeleton-shimmer opacity-20" />
              <div className="flex flex-wrap gap-2 pt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-7 w-24 rounded-full skeleton-shimmer opacity-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-boundary py-10 space-y-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-100 p-8 space-y-4">
            <div className="h-6 w-40 rounded-lg skeleton-shimmer" />
            <div className="h-4 w-full rounded skeleton-shimmer" />
            <div className="h-4 w-5/6 rounded skeleton-shimmer" />
            <div className="h-4 w-3/4 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
