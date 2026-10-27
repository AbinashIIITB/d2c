import { ArrowLeft, Calendar, BookOpen, HelpCircle, Info, PhoneCall } from "lucide-react";

export default function ExamDetailLoading() {
  return (
    <div className="pb-20 bg-d2c-white min-h-screen select-none pointer-events-none">
      {/* ── Hero Header matching exams/[slug]/page.tsx ── */}
      <div className="bg-d2c-navy pt-32 pb-32 px-4 shadow-xl border-b-4 border-d2c-royal relative overflow-hidden">
        <div className="content-boundary relative z-10">
          {/* Back button */}
          <div className="inline-flex items-center gap-2 text-d2c-sky/70 text-sm font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Exams
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Exam Logo Box Skeleton */}
            <div className="w-32 h-32 rounded-2xl bg-white p-4 shadow-2xl flex-shrink-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-xl bg-slate-100 skeleton-shimmer" />
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="inline-block px-3 py-1 bg-d2c-sky/10 border border-d2c-sky/20 rounded-md mb-4">
                <div className="h-3 w-28 rounded bg-d2c-sky/30 skeleton-shimmer-dark" />
              </div>
              <div className="space-y-3 mb-4">
                <div className="h-10 md:h-14 w-64 md:w-96 rounded-xl bg-white/15 skeleton-shimmer-dark mx-auto md:mx-0" />
              </div>
              <div className="h-5 w-80 rounded-lg bg-white/10 skeleton-shimmer-dark mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats Grid matching -mt-16 ── */}
      <div className="content-boundary -mt-16 relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 space-y-3">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-slate-400">
                <Calendar className="w-5 h-5 text-d2c-royal/50" /> Important Date
              </div>
              <div className="h-6 w-36 rounded-lg bg-slate-100 skeleton-shimmer" />
              <div className="h-3.5 w-44 rounded bg-slate-100 skeleton-shimmer" />
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 space-y-3">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-slate-400">
                <BookOpen className="w-5 h-5 text-emerald-500/50" /> Exam Mode
              </div>
              <div className="h-6 w-32 rounded-lg bg-slate-100 skeleton-shimmer" />
              <div className="h-3.5 w-40 rounded bg-slate-100 skeleton-shimmer" />
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 space-y-3">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-slate-400">
                <HelpCircle className="w-5 h-5 text-amber-500/50" /> Application
              </div>
              <div className="h-10 w-full rounded-xl bg-d2c-royal/20 skeleton-shimmer" />
              <div className="h-3.5 w-36 rounded bg-slate-100 skeleton-shimmer" />
            </div>
          </div>

          {/* ── 2-Column Content ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Content Column */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Info className="w-6 h-6 text-d2c-sky/50" />
                  <div className="h-7 w-48 rounded-lg bg-slate-100 skeleton-shimmer" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-slate-100 skeleton-shimmer" />
                  <div className="h-4 w-[95%] rounded bg-slate-100 skeleton-shimmer" />
                  <div className="h-4 w-[90%] rounded bg-slate-100 skeleton-shimmer" />
                  <div className="h-4 w-[75%] rounded bg-slate-100 skeleton-shimmer" />
                </div>
              </section>

              <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 space-y-6">
                <div className="h-7 w-40 rounded-lg bg-slate-100 skeleton-shimmer mb-2" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 space-y-2">
                      <div className="h-3.5 w-24 rounded bg-slate-200/80 skeleton-shimmer" />
                      <div className="h-5 w-32 rounded bg-slate-100 skeleton-shimmer" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-5">
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
                  <div className="h-11 w-full rounded-xl bg-d2c-royal/20 skeleton-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
