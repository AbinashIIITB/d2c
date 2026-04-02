import { Metadata } from "next"
import Link from "next/link"
import { Building2, GraduationCap, MapPin } from "lucide-react"
import collegesData from "@/data/colleges.json"
import { CollegesGrid } from "./CollegesGrid"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

export const metadata: Metadata = {
  title: "Top Colleges in India | Direct2Campus",
  description: "Browse premium engineering, medical, and management institutions for direct admission.",
}

export default function CollegesPage() {
  return (
    <div className="pb-16 bg-d2c-white min-h-screen">
      {/* Hero-style header matching homepage */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-d2c-navy text-white py-20 pt-32">
        <AnimatedPatternBg opacity={0.1} speed={150} />

        {/* Decorative background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-d2c-royal/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-d2c-sky/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(42,48,128,0.4)_0%,transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Building2 className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide">50+ Partner Institutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 text-balance leading-[1.1]">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Dream Campus
            </span>
          </h1>
          <p className="text-lg md:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Filter through India&apos;s premier engineering, medical, and management colleges and secure your seat with expert guidance.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 pt-8 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5">
                <Building2 className="w-5 h-5 text-d2c-sky" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">{collegesData.length}+</div>
                <div className="text-xs text-white/50">Colleges Listed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5">
                <GraduationCap className="w-5 h-5 text-d2c-gold" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">500+</div>
                <div className="text-xs text-white/50">Students Placed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5">
                <MapPin className="w-5 h-5 text-d2c-success" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">7</div>
                <div className="text-xs text-white/50">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <CollegesGrid initialColleges={collegesData} />
      </div>
    </div>
  )
}
