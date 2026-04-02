import { Metadata } from "next"
import Link from "next/link"
import { Briefcase, Building2, TrendingUp, Users, ArrowRight } from "lucide-react"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

export const metadata: Metadata = {
  title: "MBA & PGDM Admissions | Direct2Campus",
  description: "Secure your future with direct admission in top B-Schools across India for MBA and PGDM programs.",
}

export default function MBAPage() {
  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
      {/* Hero Section — matches Homepage */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-d2c-navy text-white py-20 pt-32">
        <AnimatedPatternBg opacity={0.1} speed={160} />

        {/* Decorative background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-d2c-royal/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-d2c-sky/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(42,48,128,0.4)_0%,transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Briefcase className="w-4 h-4 text-d2c-sky" />
                <span className="text-sm font-medium tracking-wide">Post-Graduate Programs</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold tracking-tight mb-6 leading-[1.1]">
                Elevate your career with a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
                  premium MBA
                </span>
              </h1>
              <p className="text-lg text-d2c-ice/80 leading-relaxed mb-8 max-w-lg">
                Skip the extreme competition of CAT/XAT. Secure guaranteed management quota seats in Tier-1 and Tier-2 B-Schools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/colleges" className="px-8 py-4 bg-white text-d2c-navy font-semibold text-lg hover:bg-d2c-ice transition-colors flex items-center justify-center gap-2 group shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  Browse B-Schools
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  Free Consultation
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-d2c-royal/20 to-transparent rounded-full blur-3xl" />
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="MBA Students" className="shadow-2xl border border-white/10 relative z-10" />
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 pt-10 mt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5"><Briefcase className="w-5 h-5 text-d2c-sky" /></div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">Top 50</div>
                <div className="text-xs text-white/50">B-Schools</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5"><TrendingUp className="w-5 h-5 text-d2c-gold" /></div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">₹12 LPA</div>
                <div className="text-xs text-white/50">Avg. Package</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5"><Users className="w-5 h-5 text-d2c-success" /></div>
              <div className="text-left">
                <div className="text-xl font-bold font-sora">100%</div>
                <div className="text-xs text-white/50">Placement Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-sora font-bold text-d2c-navy mb-4">Why choose Direct Admission for MBA?</h2>
          <p className="text-d2c-muted">Focus on your career progression rather than endless preparation cycles.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 border border-gray-100 shadow-sm flex gap-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-14 h-14 bg-d2c-ice flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-d2c-royal" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-d2c-navy mb-2 font-sora">Top Tier Placements</h3>
              <p className="text-d2c-muted leading-relaxed">Study in colleges that boast 100% placement records with Fortune 500 companies and high average packages.</p>
            </div>
          </div>

          <div className="bg-white p-8 border border-gray-100 shadow-sm flex gap-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-14 h-14 bg-d2c-ice flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-d2c-royal" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-d2c-navy mb-2 font-sora">Save 1 Academic Year</h3>
              <p className="text-d2c-muted leading-relaxed">Don&apos;t waste a year taking drops for entrance exams. Enroll immediately and accelerate your career trajectory.</p>
            </div>
          </div>
          
          <div className="bg-white p-8 border border-gray-100 shadow-sm flex gap-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-14 h-14 bg-d2c-ice flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-d2c-royal" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-d2c-navy mb-2 font-sora">Premium Infrastructure</h3>
              <p className="text-d2c-muted leading-relaxed">Gain access to top-notch facilities, case-study based pedagogy, and extensive alumni networks.</p>
            </div>
          </div>

          <div className="bg-white p-8 border border-gray-100 shadow-sm flex gap-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-14 h-14 bg-d2c-ice flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-d2c-royal" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-d2c-navy mb-2 font-sora">Expert Counseling</h3>
              <p className="text-d2c-muted leading-relaxed">Our experts profile your academics and career goals to suggest the exact B-School fit for your profile.</p>
            </div>
          </div>
        </div>

        <div className="bg-d2c-navy p-12 text-center text-white relative overflow-hidden">
          <AnimatedPatternBg opacity={0.08} speed={180} />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-d2c-royal to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl font-sora font-bold mb-6">Ready to accelerate your career?</h2>
            <p className="text-d2c-ice mb-8 max-w-2xl mx-auto">
              Speak to our MBA admissions expert to check your eligibility profile and explore available colleges based on your budget and desired location.
            </p>
            <Link href="/contact" className="inline-block bg-white text-d2c-navy hover:bg-d2c-ice px-8 py-4 font-bold transition-colors">
              Book Free Profile Evaluation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
