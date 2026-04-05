import { Metadata } from "next"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { Shield, Award, Users, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Direct2Campus",
  description: "Learn about India's most trusted educational bridge. Connecting talent to premium institutions.",
}

export default function AboutPage() {
  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
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
            <Shield className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide">India&apos;s Trusted Education Partner</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 text-balance leading-[1.1]">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Direct2Campus
            </span>
          </h1>
          <p className="text-lg md:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bridging the gap between aspiring students and premium educational institutions across India since 2012.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 pt-8 border-t border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5"><Users className="w-5 h-5 text-d2c-sky" /></div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">12,000+</div>
                <div className="text-xs text-white/50">Students Placed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5"><Award className="w-5 h-5 text-d2c-gold" /></div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">150+</div>
                <div className="text-xs text-white/50">Partner Institutions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5"><Clock className="w-5 h-5 text-d2c-success" /></div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">10+ Years</div>
                <div className="text-xs text-white/50">Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-boundary py-16">
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
