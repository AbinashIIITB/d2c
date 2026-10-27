export default function BlogLoading() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero skeleton */}
      <section className="relative isolate flex flex-col items-center justify-center min-h-[605px] min-[1025px]:min-h-[800px] overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40 bg-d2c-navy">
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />
        <div className="content-boundary relative z-10 text-center space-y-6 py-24">
          <div className="mx-auto h-8 w-44 rounded-lg skeleton-shimmer opacity-30" />
          <div className="mx-auto h-12 w-72 sm:w-96 rounded-xl skeleton-shimmer opacity-20" />
          <div className="mx-auto h-12 w-48 sm:w-64 rounded-xl skeleton-shimmer opacity-20" />
          <div className="mx-auto h-5 w-64 rounded-lg skeleton-shimmer opacity-15" />
        </div>
      </section>

      {/* Blog cards */}
      <div className="content-boundary pt-52 sm:pt-64 lg:pt-72">
        {/* Search skeleton */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="h-12 w-full rounded-xl skeleton-shimmer" />
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              {/* Image skeleton */}
              <div className="h-48 w-full skeleton-shimmer" />
              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 rounded-full skeleton-shimmer" />
                <div className="h-6 w-full rounded-lg skeleton-shimmer" />
                <div className="h-5 w-4/5 rounded-lg skeleton-shimmer" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full rounded skeleton-shimmer" />
                  <div className="h-4 w-5/6 rounded skeleton-shimmer" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                  <div className="h-4 w-24 rounded skeleton-shimmer" />
                  <div className="h-4 w-16 rounded skeleton-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
