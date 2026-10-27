import { CollegesGridSkeleton } from "@/components/ui/SkeletonCards";

export default function CollegesLoading() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero skeleton */}
      <section className="relative isolate flex flex-col items-center justify-center max-[340px]:min-h-[756px] min-h-[605px] min-[1025px]:min-h-[800px] overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40 bg-d2c-navy">
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />
        <div className="content-boundary relative z-10 text-center space-y-6 py-24">
          {/* Badge skeleton */}
          <div className="mx-auto h-8 w-44 rounded-lg skeleton-shimmer opacity-30" />
          {/* Title skeleton */}
          <div className="mx-auto h-12 w-72 sm:w-96 rounded-xl skeleton-shimmer opacity-20" />
          <div className="mx-auto h-12 w-48 sm:w-64 rounded-xl skeleton-shimmer opacity-20" />
          {/* Subtitle skeleton */}
          <div className="mx-auto h-5 w-64 rounded-lg skeleton-shimmer opacity-15" />
          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10 max-w-xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-24 rounded-lg skeleton-shimmer opacity-20" />
            ))}
          </div>
        </div>
      </section>

      {/* Cards section */}
      <div className="content-boundary pt-52 sm:pt-64 lg:pt-72">
        {/* Filter row skeleton */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-12 rounded-xl skeleton-shimmer" />
          <div className="flex gap-4">
            <div className="h-12 w-40 rounded-lg skeleton-shimmer" />
            <div className="h-12 w-40 rounded-lg skeleton-shimmer" />
          </div>
        </div>
        <CollegesGridSkeleton count={9} />
      </div>
    </div>
  );
}
