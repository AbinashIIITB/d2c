import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, HelpCircle, AlertCircle } from "lucide-react"
import examsData from "@/data/exams.json"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const exam = examsData.find(e => e.link === `/exams/${slug}`)
  
  if (!exam) {
    return { title: "Exam Not Found" }
  }
  
  return {
    title: `${exam.title} Admission & Pattern Guide | Direct2Campus`,
    description: exam.description,
  }
}

export default async function ExamDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const exam = examsData.find(e => e.link === `/exams/${slug}`)

  if (!exam) {
    notFound()
  }

  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
      <div className="bg-d2c-navy pt-32 pb-32 px-4 shadow-xl border-b-4 border-d2c-royal relative overflow-hidden">
        <AnimatedPatternBg opacity={0.1} speed={160} />
        <div className="content-boundary relative z-10">
          <Link href="/exams" className="inline-flex items-center gap-2 text-d2c-sky hover:text-white transition-colors mb-8 text-sm font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Back to Exams
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-2xl bg-white p-4 shadow-2xl flex-shrink-0 flex items-center justify-center">
              <img src={exam.logoUrl} alt={exam.title} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-sora font-bold text-white mb-4 line-tight">
                {exam.title}
              </h1>
              <p className="text-xl text-d2c-ice/90 leading-relaxed max-w-2xl">
                {exam.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-boundary -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          {/* Main Info Blocks */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 flex flex-col md:flex-row gap-6">
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-center gap-2 text-d2c-muted mb-2 font-semibold">
                <Calendar className="w-5 h-5 text-d2c-royal" /> Important Dates
              </div>
              <div className="font-sora font-semibold text-d2c-navy text-lg">Tentatively April/May 2026</div>
              <div className="text-sm text-d2c-muted mt-1">Check official notification</div>
            </div>
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:px-6">
              <div className="flex items-center gap-2 text-d2c-muted mb-2 font-semibold">
                <BookOpen className="w-5 h-5 text-d2c-success" /> Mode of Exam
              </div>
              <div className="font-sora font-semibold text-d2c-navy text-lg">Computer Based Test (CBT)</div>
              <div className="text-sm text-d2c-muted mt-1">Multi-session format</div>
            </div>
            <div className="flex-1 md:pl-6">
              <div className="flex items-center gap-2 text-d2c-muted mb-2 font-semibold">
                <HelpCircle className="w-5 h-5 text-d2c-gold" /> Counseling
              </div>
              <div className="font-sora font-semibold text-d2c-navy text-lg">Centralized</div>
              <div className="text-sm text-d2c-muted mt-1">Choice filling via rank</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-6 text-center md:text-left">Paper Pattern</h2>
              <ul className="flex flex-col gap-4">
                <li className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-d2c-muted font-medium">Physics</span>
                  <span className="font-bold text-d2c-navy bg-d2c-ice px-3 py-1 rounded-full text-sm">30+ MCQs</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-d2c-muted font-medium">Chemistry</span>
                  <span className="font-bold text-d2c-navy bg-d2c-ice px-3 py-1 rounded-full text-sm">30+ MCQs</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-d2c-muted font-medium">Mathematics/Biology</span>
                  <span className="font-bold text-d2c-navy bg-d2c-ice px-3 py-1 rounded-full text-sm">40+ MCQs</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-d2c-muted font-medium">Negative Marking</span>
                  <span className="font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full text-sm">Applicable (-1)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-d2c-ice to-white rounded-3xl p-8 shadow-sm border border-d2c-royal/10 flex flex-col justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-d2c-navy/5 mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-d2c-royal" />
              </div>
              <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4">Didn't score well?</h2>
              <p className="text-d2c-muted mb-8 leading-relaxed">
                Direct admission via management quota is available in the top private colleges associated with this exam. Secure your seat legally and officially.
              </p>
              <Link 
                href="/contact"
                className="w-full bg-d2c-navy hover:bg-d2c-royal text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-d2c-navy/20"
              >
                Check Management Quota Eligibility
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
