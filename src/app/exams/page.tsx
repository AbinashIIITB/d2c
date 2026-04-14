import { Metadata } from "next"
import { ExamsList } from "./ExamsList"
import examsData from "@/data/exams.json"
import { HeroBackground } from "@/components/ui/HeroBackground"
import { BookOpen, GraduationCap, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Engineering & Medical Entrance Exams | Direct2Campus",
  description: "Comprehensive guides, patterns, out-of-syllabus insights, and cutoff analysis for major Indian entrance exams.",
}

export default function ExamsPage() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero-style header matching homepage */}
      <section className="relative isolate flex flex-col items-center justify-center lg:justify-start min-h-[75vh] lg:min-h-[90vh] text-d2c-white pt-16 pb-12 md:pt-28 md:pb-20 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        {/* ── Split Background Engine ── */}
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />

        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6 md:mb-10 rounded-lg">
            <BookOpen className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">Comprehensive Exam Guides</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-5 md:mb-8 text-balance leading-[1.1] text-white">
            Entrance Exam{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Masterguides
            </span>
          </h1>
          <p className="text-base md:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium">
            Detailed insights on paper patterns, application deadlines, and admission pipelines for India&apos;s most competitive tests.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-14 pt-6 md:pt-10 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <GraduationCap className="w-5 h-5 text-d2c-sky" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">{examsData.length}+</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Exams Covered</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <FileText className="w-5 h-5 text-d2c-gold" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">In-Depth</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Pattern Analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <BookOpen className="w-5 h-5 text-d2c-success" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">Free</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Study Resources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-boundary py-12 relative z-20">
        <ExamsList initialExams={examsData} />
      </div>
    </div>
  )
}
