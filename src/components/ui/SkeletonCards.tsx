/** Skeleton shimmer card matching CollegeCard dimensions */
export function CollegeCardSkeleton() {
  return (
    <div className="relative flex flex-col bg-white border border-slate-100 overflow-hidden h-full shadow-sm rounded-2xl">
      {/* Image skeleton */}
      <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />
        {/* Premium badge skeleton */}
        <div className="absolute top-4 left-4 h-6 w-20 rounded-full bg-slate-200/70 skeleton-shimmer" />
        {/* Location pill skeleton */}
        <div className="absolute bottom-4 left-4 h-6 w-28 rounded-full bg-slate-300/50 skeleton-shimmer" />
      </div>
      {/* Content skeleton */}
      <div className="flex flex-col p-6 flex-grow space-y-3">
        <div className="h-5 w-3/4 rounded-lg bg-slate-100 skeleton-shimmer" />
        <div className="h-4 w-1/2 rounded-lg bg-slate-100 skeleton-shimmer" />
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="h-4 w-32 rounded bg-slate-100 skeleton-shimmer" />
          <div className="w-8 h-8 rounded-full bg-slate-100 skeleton-shimmer" />
        </div>
      </div>
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
