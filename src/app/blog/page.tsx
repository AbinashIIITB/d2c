import { Suspense } from "react"
import { Metadata } from "next"
import { Newspaper, BookOpen, Users, Award } from "lucide-react"
import { getAllBlogs } from "@/lib/data-service"
import { BlogsList } from "./BlogsList"
import { HeroBackground } from "@/components/ui/HeroBackground"

export const metadata: Metadata = {
  title: "Blogs & Admission Insights 2027 – Direct2Campus",
  description: "Expert guides on college admissions, entrance exams, management quota procedures, and career counseling. Stay ahead with Direct2Campus insights.",
  keywords: ["college admission blog", "management quota guide", "entrance exam tips", "engineering admissions Kolkata", "career counseling blog"],
  alternates: { canonical: "https://direct2campus.com/blog" },
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogListingPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero-style header matching /colleges and /exams */}
      <section className="relative isolate flex flex-col items-center justify-center min-[1025px]:justify-start max-[340px]:min-h-[756px] min-h-[605px] min-[1025px]:min-h-[800px] text-d2c-white pt-12 pb-12 sm:pt-6 min-[1025px]:pt-48 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        {/* Split Background Engine */}
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />

        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 min-[1025px]:px-4 min-[1025px]:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8 sm:mb-4 min-[1025px]:mb-12 lg:mb-10 rounded-lg">
            <Newspaper className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">Articles & Admission Insights</span>
          </div>

          <h1 className="text-2xl sm:text-4xl min-[1025px]:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 sm:mb-4 min-[1025px]:mb-10 lg:mb-8 text-balance leading-[1.1] text-white">
            Admission & Career{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Insights
            </span>
          </h1>

          <p className="text-base min-[1025px]:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
            Stay informed with verified guidance on entrance exams, quota eligibility, college cutoffs, and counseling blueprints.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-5 min-[1025px]:gap-14 pt-5 min-[1025px]:pt-12 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <BookOpen className="w-5 h-5 text-d2c-sky" />
              </div>
              <div className="text-left">
                <div className="text-base min-[1025px]:text-xl font-bold font-sora text-white">{blogs.length}+</div>
                <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Guides Published</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Users className="w-5 h-5 text-d2c-gold" />
              </div>
              <div className="text-left">
                <div className="text-base min-[1025px]:text-xl font-bold font-sora text-white">15,000+</div>
                <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Students Guided</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Award className="w-5 h-5 text-d2c-success" />
              </div>
              <div className="text-left">
                <div className="text-base min-[1025px]:text-xl font-bold font-sora text-white">100%</div>
                <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Verified Insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Grid */}
      <div className="content-boundary py-12 relative z-20">
        <Suspense fallback={<div className="text-center py-24 text-d2c-muted">Loading articles...</div>}>
          <BlogsList initialBlogs={blogs as any} />
        </Suspense>
      </div>
    </div>
  )
}
