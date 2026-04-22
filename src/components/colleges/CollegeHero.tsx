import Link from "next/link"
import { ChevronRight, Shield, Sparkles, Star, MapPin, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { ApplyNowButton } from "@/components/ui/ApplyNowButton"

// We expect a robust college object matching the schema from data.ts
export function CollegeHero({ college }: { college: any }) {
  return (
    <div className="relative overflow-hidden bg-[#0B1120]">
      {/* Dark overlays and border */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,76,192,0.25),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.06),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 border-b border-white/[0.12] shadow-[0_4px_12px_rgba(0,0,0,0.1)]" />
      <AnimatedPatternBg opacity={0.02} speed={200} />

      <div className="content-boundary relative z-10 pt-28 pb-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <Link href="/colleges" className="text-white/40 hover:text-white/70 transition-colors">Colleges</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <span className="text-[#f6c804]/80 font-medium truncate max-w-[200px] md:max-w-none">{college.name}</span>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Image — Glassmorphic container */}
          {(college.imageUrl || college.logoUrl) && (
            <div className="relative group shrink-0 mt-2 w-full lg:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#3B4CC0]/40 to-[#f6c804]/20 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full aspect-video lg:aspect-auto lg:h-64 lg:w-96 bg-white/[0.08] backdrop-blur-2xl rounded-2xl p-2 border border-white/[0.12] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={college.imageUrl || college.logoUrl} alt={`${college.name} Visual`} className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.06] backdrop-blur-sm text-white/80 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-white/[0.06]">
                <Shield className="w-3 h-3 text-[#60A5FA]" />
                {college.type}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f6c804]/[0.08] backdrop-blur-sm text-[#f6c804] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-[#f6c804]/[0.12]">
                <Sparkles className="w-3 h-3" />
                EST. {college.established || "N/A"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.06] backdrop-blur-sm text-white/80 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-white/[0.06]">
                <Star className="w-3 h-3 fill-[#f6c804] text-[#f6c804]" />
                {college.rating} ({college.reviews} Reviews)
              </span>
            </div>

            {/* College Name — Display size */}
            <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] font-sora font-bold text-white leading-[1.1] tracking-[-0.02em] mb-5">
              {college.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2.5 text-[#60A5FA] mb-8">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium">{college.location}, {college.state}</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <ApplyNowButton collegeName={college.name} />
              <Button variant="outline" asChild className="bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.08] h-12 px-8 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
                <Link href="https://wa.me/916200325137" target="_blank">
                  <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Dashboard Bar ── */}
      <div className="relative z-10 mt-6 pb-12">
        <div className="content-boundary">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] backdrop-blur-xl">
            {college.placements?.stats?.slice(0, 4).map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center group hover:bg-white/[0.04] transition-colors duration-300">
                <p className="text-2xl md:text-3xl font-bold font-sora tracking-tight text-[#f6c804] mb-1">
                  {stat.value}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">
                  {stat.label}
                </p>
              </div>
            )) || (
              <>
                <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                  <p className="text-2xl md:text-3xl font-bold font-sora text-[#f6c804] mb-1">{college.rating}★</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Rating</p>
                </div>
                <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                  <p className="text-2xl md:text-3xl font-bold font-sora text-[#22c55e] mb-1">{college.type}</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Institute Type</p>
                </div>
                <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                  <p className="text-2xl md:text-3xl font-bold font-sora text-white mb-1">{college.courses?.length || 0}+</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Programs</p>
                </div>
                <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                  <p className="text-2xl md:text-3xl font-bold font-sora text-[#60A5FA] mb-1">{college.fees || "N/A"}</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Starting Fee</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
