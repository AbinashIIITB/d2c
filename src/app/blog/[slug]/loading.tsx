export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-d2c-white">
      {/* Hero/header */}
      <div className="relative bg-d2c-navy py-20 overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer opacity-10" />
        <div className="content-boundary relative z-10 max-w-3xl">
          <div className="h-8 w-24 rounded-full skeleton-shimmer opacity-30 mb-8" />
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full skeleton-shimmer opacity-25" />
              <div className="h-6 w-24 rounded-full skeleton-shimmer opacity-25" />
            </div>
            <div className="h-10 w-full rounded-xl skeleton-shimmer opacity-20" />
            <div className="h-10 w-3/4 rounded-xl skeleton-shimmer opacity-20" />
            <div className="h-5 w-40 rounded-lg skeleton-shimmer opacity-15" />
          </div>
        </div>
      </div>

      {/* Blog content */}
      <div className="content-boundary py-12 max-w-3xl mx-auto space-y-6">
        {/* Cover image */}
        <div className="h-72 w-full rounded-2xl skeleton-shimmer" />

        {/* Body paragraphs */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            {i % 3 === 1 && <div className="h-7 w-1/2 rounded-lg skeleton-shimmer" />}
            <div className="h-4 w-full rounded skeleton-shimmer" />
            <div className="h-4 w-11/12 rounded skeleton-shimmer" />
            <div className="h-4 w-4/5 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
