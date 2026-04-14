import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Building2, GraduationCap, MapPin } from "lucide-react"
import { colleges } from "@/lib/data"
import { CollegesGrid } from "./CollegesGrid"
import { HeroBackground } from "@/components/ui/HeroBackground"

export const metadata: Metadata = {
  title: "Top Colleges in India | Direct2Campus",
  description: "Browse premium engineering, medical, and management institutions for direct admission.",
}

export default function CollegesPage() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero-style header matching homepage */}
      <section className="relative isolate flex flex-col items-center justify-center min-[903px]:justify-start min-h-[65vh] lg:min-h-[85vh] text-d2c-white pt-12 pb-12 sm:pt-6 min-[903px]:pt-56 min-[1025px]:pt-48 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        {/* ── Split Background Engine ── */}
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />

        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 min-[903px]:px-4 min-[903px]:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-10 sm:mb-4 min-[903px]:mb-12 lg:mb-10 rounded-lg">
            <Building2 className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">{colleges.length}+ Partner Institutions</span>
          </div>
          <h1 className="text-2xl sm:text-4xl min-[903px]:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-8 sm:mb-4 min-[903px]:mb-10 lg:mb-8 text-balance leading-[1.1] text-white">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Dream Campus
            </span>
          </h1>
          <p className="text-base min-[903px]:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-6 min-[903px]:mb-12 lg:mb-12 leading-relaxed font-medium">
            Filter through India&apos;s premier engineering and medical colleges and secure your seat with expert guidance.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-5 min-[903px]:gap-10 pt-5 min-[903px]:pt-12 lg:gap-14 lg:pt-10 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Building2 className="w-5 h-5 text-d2c-sky" />
              </div>
              <div className="text-left">
                <div className="text-base min-[903px]:text-xl font-bold font-sora text-white">{colleges.length}+</div>
                <div className="text-[10px] min-[903px]:text-xs text-white/50 font-medium uppercase tracking-wider">Colleges Listed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <GraduationCap className="w-5 h-5 text-d2c-gold" />
              </div>
              <div className="text-left">
                <div className="text-base min-[903px]:text-xl font-bold font-sora text-white">500+</div>
                <div className="text-[10px] min-[903px]:text-xs text-white/50 font-medium uppercase tracking-wider">Students Placed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <MapPin className="w-5 h-5 text-d2c-success" />
              </div>
              <div className="text-left">
                <div className="text-base min-[903px]:text-xl font-bold font-sora text-white">12</div>
                <div className="text-[10px] min-[903px]:text-xs text-white/50 font-medium uppercase tracking-wider">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-boundary py-12 relative z-20">
        <Suspense fallback={<div className="text-center py-24 text-d2c-muted">Loading colleges...</div>}>
          <CollegesGrid initialColleges={colleges} />
        </Suspense>
      </div>
    </div>
  )
}
