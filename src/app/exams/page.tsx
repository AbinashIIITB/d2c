import { Metadata } from "next"
import { ExamsList } from "./ExamsList"
import examsData from "@/data/exams.json"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { BookOpen, GraduationCap, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Engineering & Medical Entrance Exams | Direct2Campus",
  description: "Comprehensive guides, patterns, out-of-syllabus insights, and cutoff analysis for major Indian entrance exams.",
}

export default function ExamsPage() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero-style header matching homepage */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-d2c-navy text-white py-20 pt-32">
        <AnimatedPatternBg opacity={0.1} speed={160} />

        {/* Decorative background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-d2c-royal/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-d2c-sky/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(42,48,128,0.4)_0%,transparent_60%)]" />
        </div>

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <BookOpen className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide">Comprehensive Exam Guides</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 text-balance leading-[1.1]">
            Entrance Exam{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Masterguides
            </span>
          </h1>
          <p className="text-lg md:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Detailed insights on paper patterns, application deadlines, and admission pipelines for India&apos;s most competitive tests.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 pt-8 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5">
                <GraduationCap className="w-5 h-5 text-d2c-sky" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">{examsData.length}+</div>
                <div className="text-xs text-white/50">Exams Covered</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5">
                <FileText className="w-5 h-5 text-d2c-gold" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">In-Depth</div>
                <div className="text-xs text-white/50">Pattern Analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5">
                <BookOpen className="w-5 h-5 text-d2c-success" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">Free</div>
                <div className="text-xs text-white/50">Study Resources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-boundary py-12">
        <ExamsList initialExams={examsData} />
      </div>
    </div>
  )
}
