export default function ExamsLoading() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero skeleton */}
      <section className="relative isolate flex flex-col items-center justify-center max-[340px]:min-h-[756px] min-h-[605px] min-[1025px]:min-h-[800px] overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40 bg-d2c-navy">
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />
        <div className="content-boundary relative z-10 text-center space-y-6 py-24">
          <div className="mx-auto h-8 w-44 rounded-lg skeleton-shimmer opacity-30" />
          <div className="mx-auto h-12 w-72 sm:w-96 rounded-xl skeleton-shimmer opacity-20" />
          <div className="mx-auto h-12 w-48 sm:w-64 rounded-xl skeleton-shimmer opacity-20" />
          <div className="mx-auto h-5 w-64 rounded-lg skeleton-shimmer opacity-15" />
        </div>
      </section>

      {/* Exam cards section */}
      <div className="content-boundary pt-52 sm:pt-64 lg:pt-72">
        {/* Search skeleton */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="h-12 w-full rounded-xl skeleton-shimmer" />
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="h-1.5 w-full skeleton-shimmer" />
              <div className="p-7 space-y-4">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-lg skeleton-shimmer shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-3/4 rounded-lg skeleton-shimmer" />
                    <div className="h-4 w-1/2 rounded skeleton-shimmer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded skeleton-shimmer" />
                  <div className="h-4 w-4/5 rounded skeleton-shimmer" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((t) => (
                    <div key={t} className="h-6 w-20 rounded-full skeleton-shimmer" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
