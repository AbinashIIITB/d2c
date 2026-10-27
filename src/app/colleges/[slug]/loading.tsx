export default function CollegeDetailLoading() {
  return (
    <div className="min-h-screen bg-d2c-white">
      {/* Hero skeleton */}
      <div className="relative h-[340px] sm:h-[420px] lg:h-[500px] bg-d2c-navy overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer opacity-20" />
        {/* Back link skeleton */}
        <div className="absolute top-6 left-6 h-8 w-28 rounded-full skeleton-shimmer opacity-30" />
        {/* Title area skeleton */}
        <div className="absolute bottom-10 left-6 right-6 space-y-3">
          <div className="h-6 w-32 rounded-full skeleton-shimmer opacity-30" />
          <div className="h-10 w-3/4 sm:w-1/2 rounded-xl skeleton-shimmer opacity-25" />
          <div className="h-5 w-1/3 rounded-lg skeleton-shimmer opacity-20" />
          <div className="flex gap-2 pt-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-7 w-20 rounded-full skeleton-shimmer opacity-20" />
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="content-boundary py-10 lg:flex lg:gap-10">
        {/* Main content */}
        <div className="flex-1 space-y-8">
          {/* TOC skeleton */}
          <div className="h-12 w-full rounded-xl skeleton-shimmer" />

          {/* Section blocks */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-7 w-48 rounded-lg skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-5/6 rounded skeleton-shimmer" />
              <div className="h-4 w-4/6 rounded skeleton-shimmer" />
              {/* Table skeleton */}
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                {[1, 2, 3, 4].map((r) => (
                  <div key={r} className="flex gap-4 p-4 border-b border-slate-50">
                    <div className="h-5 flex-1 rounded skeleton-shimmer" />
                    <div className="h-5 w-28 rounded skeleton-shimmer" />
                    <div className="h-5 w-28 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-72 xl:w-80 shrink-0 space-y-6">
          {/* CTA card */}
          <div className="rounded-2xl border border-slate-100 p-6 space-y-4">
            <div className="h-6 w-2/3 rounded-lg skeleton-shimmer" />
            <div className="h-4 w-full rounded skeleton-shimmer" />
            <div className="h-4 w-4/5 rounded skeleton-shimmer" />
            <div className="h-12 w-full rounded-xl skeleton-shimmer" />
            <div className="h-12 w-full rounded-xl skeleton-shimmer" />
          </div>
          {/* Quick facts card */}
          <div className="rounded-2xl border border-slate-100 p-6 space-y-3">
            <div className="h-5 w-1/2 rounded-lg skeleton-shimmer" />
            {[1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="flex justify-between">
                <div className="h-4 w-24 rounded skeleton-shimmer" />
                <div className="h-4 w-20 rounded skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
