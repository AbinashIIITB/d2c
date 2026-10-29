import { Metadata } from "next"
import Image from "next/image"
import { HeroBackground } from "@/components/ui/HeroBackground"
import { Shield, Award, Users, Clock, CheckCircle2 } from "lucide-react"
import { getPageData } from "@/lib/page-service"

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getPageData("about");
  return {
    title: aboutData?.title || "About Us – India's Trusted Education Partner",
    description:
      aboutData?.description ||
      "Learn about Direct2Campus — India's trusted education bridge with 12,000+ successful admissions, 150+ partner institutions & 10+ years of proven excellence.",
    keywords: ["about Direct2Campus", "education consultancy India", "trusted admission partner", "management quota admissions"],
    alternates: { canonical: "https://direct2campus.com/about" },
  };
}

export default async function AboutPage() {
  const aboutData = await getPageData("about");

  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
      {/* Hero-style header matching homepage */}
      <section className="relative isolate flex flex-col items-center justify-center min-[1025px]:justify-start max-[340px]:min-h-[756px] min-h-[605px] min-[1025px]:min-h-[800px] text-d2c-white pt-12 pb-12 sm:pt-6 min-[1025px]:pt-48 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        {/* ── Split Background Engine ── */}
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />

        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 min-[1025px]:px-4 min-[1025px]:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8 sm:mb-4 min-[1025px]:mb-12 lg:mb-10 rounded-lg">
            <Shield className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">
              {aboutData?.badge || "India's Trusted Education Partner"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl min-[1025px]:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 sm:mb-4 min-[1025px]:mb-10 lg:mb-8 text-balance leading-[1.1] text-white">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Direct2Campus
            </span>
          </h1>
          <p className="text-base min-[1025px]:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-6 min-[1025px]:block lg:mb-12 leading-relaxed font-medium">
            {aboutData?.subheading || "Bridging the gap between aspiring students and premium educational institutions across India since 2012."}
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-5 min-[1025px]:gap-10 pt-5 min-[1025px]:pt-12 lg:gap-14 lg:pt-10 border-t border-white/10 max-w-4xl mx-auto">
            {aboutData?.stats?.map((stat: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3 text-d2c-ice">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {idx === 0 && <Users className="w-5 h-5 text-d2c-sky" />}
                  {idx === 1 && <Award className="w-5 h-5 text-d2c-gold" />}
                  {idx === 2 && <Clock className="w-5 h-5 text-d2c-success" />}
                  {idx > 2 && <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />}
                </div>
                <div className="text-left">
                  <div className="text-base min-[1025px]:text-xl font-bold font-sora text-white">{stat.value}</div>
                  <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            )) || (
              <>
                <div className="flex items-center gap-3 text-d2c-ice">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Users className="w-5 h-5 text-d2c-sky" /></div>
                  <div className="text-left">
                    <div className="text-base min-[1025px]:text-xl font-bold font-sora text-white">12,000+</div>
                    <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Students Placed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-d2c-ice">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Award className="w-5 h-5 text-d2c-gold" /></div>
                  <div className="text-left">
                    <div className="text-base min-[1025px]:text-xl font-bold font-sora text-white">150+</div>
                    <div className="text-[10px] min-[1025px]:text-xs text-white/50 font-medium uppercase tracking-wider">Partner Institutions</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-boundary mt-32 sm:mt-48 lg:mt-52">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-sora font-bold text-d2c-navy mb-6">
            {aboutData?.heading || "Bridging Dreams to Reality"}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-base sm:text-lg">
            <p>
              {aboutData?.storyParagraph1 ||
                "Direct2Campus was founded with a singular mission: to eliminate confusion, non-transparency, and bureaucratic delays in higher education admissions across India. Whether you are aiming for prestigious private engineering institutes, medical seats, or premier business schools, our vetted network of 150+ colleges provides legitimate, direct counseling routes."}
            </p>
            <p>
              {aboutData?.storyParagraph2 ||
                "From document verification to fee negotiations and scholarship allocation, our team of seasoned advisors stands beside you every step of the way."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
