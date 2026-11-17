import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Building2, TrendingUp, Users, ArrowRight } from "lucide-react";
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { getContent } from "@/lib/cms/content";
import { buildMetadata } from "@/lib/cms/seo";
import { CmsIcon } from "@/components/cms/CmsIcon";
import { accentClass } from "@/content/listing-shared";
import type { MbaContent } from "@/content/mba";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const KNOWN_ICONS = {
  briefcase: Briefcase,
  "building-2": Building2,
  "trending-up": TrendingUp,
  users: Users,
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<MbaContent>("mba");
  return buildMetadata(content.seo, { path: "/mba" });
}

export default async function MBAPage() {
  const content = await getContent<MbaContent>("mba");
  const { hero, benefits, cta } = content;

  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
      {/* Hero Section — matches Homepage */}
      <section className="relative min-h-[650px] flex flex-col items-center justify-center overflow-hidden bg-d2c-navy text-white py-20 pt-32">
        <AnimatedPatternBg opacity={0.1} speed={160} />

        {/* Decorative background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-d2c-royal/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-d2c-sky/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(42,48,128,0.4)_0%,transparent_60%)]" />
        </div>

        <div className="content-boundary relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <CmsIcon name={hero.badgeIcon} known={KNOWN_ICONS} fallback={Briefcase} className="w-4 h-4 text-d2c-sky" />
                <span className="text-sm font-medium tracking-wide">{hero.badge}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold tracking-tight mb-6 leading-[1.1]">
                {hero.heading}
              </h1>
              <p className="text-lg text-d2c-ice/80 leading-relaxed mb-8 max-w-lg">
                {hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={hero.browseHref} className="px-8 py-4 bg-white text-d2c-navy font-semibold text-lg hover:bg-d2c-ice transition-colors flex items-center justify-center gap-2 group shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  {hero.browseLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <ApplyButton className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2" context={hero.ctaContext}>
                  {hero.ctaLabel}
                </ApplyButton>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-d2c-royal/20 to-transparent rounded-full blur-3xl" />
              <img src={hero.image} alt={hero.imageAlt} className="shadow-2xl border border-white/10 relative z-10" />
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 pt-10 mt-10 border-t border-white/10 max-w-4xl mx-auto">
            {hero.stats?.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-d2c-ice">
                <div className="p-2 bg-white/5"><CmsIcon name={stat.icon} known={KNOWN_ICONS} fallback={Briefcase} className={`w-5 h-5 ${accentClass(stat.accent)}`} /></div>
                <div className="text-left">
                  <div className="text-xl font-bold font-sora">{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="content-boundary py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-sora font-bold text-d2c-navy mb-4">{benefits.heading}</h2>
          <p className="text-d2c-muted">{benefits.subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {benefits.items?.map((item, idx) => (
            <div key={idx} className="bg-white p-8 border border-gray-100 shadow-sm flex gap-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-14 h-14 bg-d2c-ice flex items-center justify-center shrink-0">
                <CmsIcon name={item.icon} known={KNOWN_ICONS} fallback={Briefcase} className="w-6 h-6 text-d2c-royal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-d2c-navy mb-2 font-sora">{item.title}</h3>
                <p className="text-d2c-muted leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-d2c-navy p-12 text-center text-white relative overflow-hidden">
          <AnimatedPatternBg opacity={0.08} speed={180} />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-d2c-royal to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl font-sora font-bold mb-6">{cta.heading}</h2>
            <p className="text-d2c-ice mb-8 max-w-2xl mx-auto">
              {cta.text}
            </p>
            <ApplyButton className="inline-block bg-white text-d2c-navy hover:bg-d2c-ice px-8 py-4 font-bold transition-colors" context={cta.buttonContext}>
              {cta.buttonLabel}
            </ApplyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
