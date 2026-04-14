import { Metadata } from "next"
import Image from "next/image"
import { HeroBackground } from "@/components/ui/HeroBackground"
import { Shield, Award, Users, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Direct2Campus",
  description: "Learn about India's most trusted educational bridge. Connecting talent to premium institutions.",
}

export default function AboutPage() {
  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
      {/* Hero-style header matching homepage */}
      <section className="relative isolate flex flex-col items-center justify-center lg:justify-start min-h-[75vh] lg:min-h-[90vh] text-d2c-white pt-16 pb-12 md:pt-28 md:pb-20 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        {/* ── Split Background Engine ── */}
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />

        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          {/* Logo Showcase */}
          <div className="relative w-48 sm:w-64 h-14 sm:h-16 mx-auto mix-blend-screen opacity-90 mb-4 sm:mb-6">
            <Image
              src="/logo-footer.png"
              alt="Direct2Campus"
              fill
              className="object-contain object-center"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6 md:mb-10 rounded-lg">
            <Shield className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">India&apos;s Trusted Education Partner</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-5 md:mb-8 text-balance leading-[1.1] text-white">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Direct2Campus
            </span>
          </h1>
          <p className="text-base md:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium">
            Bridging the gap between aspiring students and premium educational institutions across India since 2012.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-14 pt-6 md:pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Users className="w-5 h-5 text-d2c-sky" /></div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">12,000+</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Students Placed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Award className="w-5 h-5 text-d2c-gold" /></div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">150+</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Partner Institutions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Clock className="w-5 h-5 text-d2c-success" /></div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">10+ Years</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-boundary py-16 relative z-20">
        <div className="prose prose-lg max-w-none text-d2c-text">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200" alt="Campus Building" className="w-full h-[400px] object-cover mb-12 shadow-md" />
          
          <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4">Our Mission</h2>
          <p className="mb-8 leading-relaxed">
            At Direct2Campus, we believe that extreme competition should not be the sole barrier to high-quality education. Our mission is to provide transparent, secure, and officially recognized management quota admissions guidance to students who missed the extremely narrow marks margins in entrance exams.
          </p>

          <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4">Why Trust Us?</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12 not-prose">
            <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="text-3xl font-sora font-bold text-d2c-royal mb-2">12,000+</div>
              <p className="text-d2c-muted">Successful Admissions Facilitated</p>
            </div>
            <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="text-3xl font-sora font-bold text-d2c-royal mb-2">150+</div>
              <p className="text-d2c-muted">Partner Institutions & Universities</p>
            </div>
            <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="text-3xl font-sora font-bold text-d2c-royal mb-2">10 Years</div>
              <p className="text-d2c-muted">Of Proven Excellence and Trust</p>
            </div>
            <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="text-3xl font-sora font-bold text-d2c-royal mb-2">100%</div>
              <p className="text-d2c-muted">Transparent & Secure Process</p>
            </div>
          </div>

          <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4">The D2C Guarantee</h2>
          <p className="mb-4 leading-relaxed">
            Unlike fly-by-night agents, Direct2Campus operates as an authorized consulting body. We verify candidate profiles against official institutional eligibility criteria, ensuring that any admission secured through us is legitimate, permanent, and recognized by the respective governing bodies like UGC, AICTE, or NMC.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3">
              <span className="text-d2c-success font-bold">✓</span> No hidden donation charges.
            </li>
            <li className="flex gap-3">
              <span className="text-d2c-success font-bold">✓</span> Direct fee payments to the college accounts only.
            </li>
            <li className="flex gap-3">
              <span className="text-d2c-success font-bold">✓</span> End-to-end documentation assistance and physical presence during admission rounds.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
