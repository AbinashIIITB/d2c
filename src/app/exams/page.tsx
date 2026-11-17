import { Metadata } from "next"
import { ExamsList } from "./ExamsList"
import { getAllExams } from "@/lib/data-service"
import { HeroBackground } from "@/components/ui/HeroBackground"
import { BookOpen, GraduationCap, FileText, Clock } from "lucide-react"
import { getContent } from "@/lib/cms/content"
import { buildMetadata } from "@/lib/cms/seo"
import { CmsIcon } from "@/components/cms/CmsIcon"
import { accentClass, withCount } from "@/content/listing-shared"
import type { ExamsIndexContent } from "@/content/exams-index"

const KNOWN_ICONS = {
  "book-open": BookOpen,
  "graduation-cap": GraduationCap,
  "file-text": FileText,
  clock: Clock,
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<ExamsIndexContent>("exams-index")
  return buildMetadata(content.seo, { path: "/exams" })
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ExamsPage() {
  const [exams, content] = await Promise.all([getAllExams(), getContent<ExamsIndexContent>("exams-index")]);

  return (
    <div className="pb-16 bg-d2c-white min-h-screen page-fade-in">
      {/* Hero-style header matching homepage */}
      <section className="relative isolate flex flex-col items-center justify-center min-[1025px]:justify-start max-[340px]:min-h-[756px] min-h-[605px] min-[1025px]:min-h-[800px] text-d2c-white pt-12 pb-12 sm:pt-6 min-[1025px]:pt-48 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        {/* ── Split Background Engine ── */}
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />

        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 min-[1025px]:px-4 min-[1025px]:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8 sm:mb-4 min-[1025px]:mb-12 lg:mb-10 rounded-lg">
            <CmsIcon name={content.hero.badgeIcon} known={KNOWN_ICONS} fallback={BookOpen} className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">{content.hero.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl min-[1025px]:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 sm:mb-4 min-[1025px]:mb-10 lg:mb-8 text-balance leading-[1.1] text-white">
            {content.hero.titlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              {content.hero.titleHighlight}
            </span>
          </h1>
          <p className="text-base min-[1025px]:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
            {content.hero.subheading}
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-5 min-[1025px]:gap-14 pt-5 min-[1025px]:pt-12 border-t border-white/10 max-w-3xl mx-auto">
            {content.hero.stats?.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-d2c-ice">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <CmsIcon name={stat.icon} known={KNOWN_ICONS} fallback={GraduationCap} className={`w-5 h-5 ${accentClass(stat.accent)}`} />
                </div>
                <div className="text-left">
                  <div className="text-base min-[1025px]:text-xl font-bold font-sora text-white">{withCount(stat.value, exams.length)}</div>
                  <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="content-boundary py-12 relative z-20">
        <ExamsList initialExams={exams as any} content={content.list} />
      </div>
    </div>
  )
}
