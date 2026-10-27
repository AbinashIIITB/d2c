import { HeroBackground } from "@/components/ui/HeroBackground";
import { BookOpen, GraduationCap, FileText, Clock, Search } from "lucide-react";
import { ExamsGridSkeleton } from "@/components/ui/SkeletonCards";

export default function ExamsLoading() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* ── Split Background Hero matching exams/page.tsx ── */}
      <section className="relative isolate flex flex-col items-center justify-center min-[1025px]:justify-start max-[340px]:min-h-[756px] min-h-[605px] min-[1025px]:min-h-[800px] text-d2c-white pt-12 pb-12 sm:pt-6 min-[1025px]:pt-48 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />
        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 min-[1025px]:px-4 min-[1025px]:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8 sm:mb-4 min-[1025px]:mb-12 lg:mb-10 rounded-lg">
            <BookOpen className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">Comprehensive Exam Guides</span>
          </div>

          <h1 className="text-2xl sm:text-4xl min-[1025px]:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 sm:mb-4 min-[1025px]:mb-10 lg:mb-8 text-balance leading-[1.1] text-white">
            Entrance Exam{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Masterguides
            </span>
          </h1>

          <p className="text-base min-[1025px]:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
            Detailed insights on paper patterns, application deadlines, and admission pipelines for India&apos;s most competitive tests.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-5 min-[1025px]:gap-14 pt-5 min-[1025px]:pt-12 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <GraduationCap className="w-5 h-5 text-d2c-sky" />
              </div>
              <div className="text-left">
                <div className="h-6 w-12 rounded bg-white/20 skeleton-shimmer-dark mb-1" />
                <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Exams Covered</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <FileText className="w-5 h-5 text-d2c-gold" />
              </div>
              <div className="text-left">
                <div className="h-6 w-14 rounded bg-white/20 skeleton-shimmer-dark mb-1" />
                <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Sample Papers</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Clock className="w-5 h-5 text-d2c-success" />
              </div>
              <div className="text-left">
                <div className="h-6 w-12 rounded bg-white/20 skeleton-shimmer-dark mb-1" />
                <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <div className="content-boundary py-12 relative z-20">
        {/* Search bar matching ExamsList.tsx */}
        <div className="max-w-xl mx-auto mb-16 relative z-40">
          <div className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center">
            <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
            <div className="h-4 w-44 rounded bg-slate-100 skeleton-shimmer" />
          </div>
        </div>

        <ExamsGridSkeleton count={6} />
      </div>
    </div>
  );
}
