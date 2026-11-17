import { Fragment } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  GraduationCap,
  FileCheck2,
  Briefcase,
  ExternalLink,
  ChevronRight,
  CreditCard,
} from 'lucide-react';
import { IemEnquiryForm } from './IemEnquiryForm';
import { I, IemFaqs, IemJsonLd } from './iemShared';
import { AnimatedPatternBg } from '@/components/ui/AnimatedPatternBg';
import type { IemBranchContent } from '@/content/iem-branch.schema';
import { iemCseDefaults } from '@/content/iem-cse.defaults';

/** Back-compat alias: the template is now driven entirely by the CMS document. */
export type BranchPageConfig = IemBranchContent;

export function IemBranchLandingTemplate({ content = iemCseDefaults }: { content?: IemBranchContent }) {
  const { hero, about, eligibility, process, fees, careers, related, finalCta } = content;

  return (
    <div className="min-h-screen bg-d2c-white font-dm-sans text-gray-800 antialiased selection:bg-d2c-royal selection:text-white">
      <IemJsonLd seo={content.seo} faqs={content.faqs.items} breadcrumb={content.breadcrumbSchema} />

      {/* HERO SECTION */}
      <header className="bg-gradient-to-b from-d2c-navy via-[#0d223f] to-d2c-navy pt-28 md:pt-36 pb-20 px-4 relative overflow-hidden border-b-4 border-d2c-royal shadow-xl">
        <AnimatedPatternBg opacity={0.12} speed={140} />

        <div className="content-boundary relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center flex-wrap gap-2 text-xs text-d2c-ice/70 mb-6 font-medium">
            {content.crumbs.map((crumb, i) => (
              <Fragment key={i}>
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />}
                <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
              </Fragment>
            ))}
            <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
            <span className="text-white font-semibold truncate max-w-xs">{content.crumbLast}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-d2c-royal/20 border border-d2c-royal/40 text-d2c-sky text-xs font-bold uppercase tracking-widest shadow-sm">
                <I n={hero.badgeIcon} f={Sparkles} c="w-3.5 h-3.5 text-d2c-gold" />
                <span>{hero.badge}</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-5xl font-sora font-bold text-white tracking-tight leading-[1.18]">
                {hero.h1}
              </h1>

              <p className="text-sm md:text-base text-d2c-ice/90 leading-relaxed max-w-2xl">
                {hero.copy}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#admission-enquiry"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-d2c-gold to-yellow-400 hover:from-yellow-400 hover:to-d2c-gold text-d2c-navy font-sora font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 uppercase tracking-wide"
                >
                  <I n={hero.primaryIcon} f={GraduationCap} c="w-4 h-4 text-d2c-navy" />
                  <span>{hero.primaryLabel}</span>
                </a>

                <a
                  href="#eligibility"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sora font-semibold text-xs md:text-sm transition-all flex items-center gap-2 backdrop-blur-sm uppercase tracking-wide"
                >
                  <span>{hero.secondaryLabel}</span>
                  <ChevronRight className="w-4 h-4 text-d2c-sky" />
                </a>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                <div className="rounded-2xl overflow-hidden relative aspect-video sm:aspect-[4/3] bg-gray-900 border border-white/10">
                  <img
                    src={hero.image}
                    alt={hero.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-d2c-navy/90 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-d2c-gold">{hero.cardEyebrow}</p>
                      <p className="text-white font-sora font-bold text-base sm:text-lg">{hero.cardTitle}</p>
                      <p className="text-xs text-d2c-ice/80">{hero.cardSubtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-d2c-ice/90 space-y-1.5">
                  {hero.facts.map((fact, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span>{fact.label}</span>
                      <span className={fact.valueClass}>{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Advisory Bar */}
      <div className="bg-amber-50/80 border-b border-amber-200 py-3 px-4 text-center">
        <p className="text-xs text-amber-900 max-w-4xl mx-auto leading-relaxed">
          <strong>{content.notice.label}</strong> {content.notice.text}
        </p>
      </div>

      <main className="content-boundary max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* ABOUT THE PROGRAMME */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{about.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {about.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="md:col-span-8 space-y-4">
              <p>{about.intro}</p>

              <h3 className="font-sora font-bold text-lg text-d2c-navy pt-2">{about.whyHeading}</h3>
              <p>{about.why}</p>
            </div>

            <div className="md:col-span-4 bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-4">
              <h4 className="font-sora font-bold text-base text-d2c-navy flex items-center gap-2">
                <I n={about.highlightsIcon} f={Building2} c="w-4 h-4 text-d2c-royal" />
                <span>{about.highlightsTitle}</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-600">
                {about.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <I n={about.highlightsBulletIcon} f={CheckCircle2} c="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-gray-200">
                <Link
                  href={about.compareHref}
                  className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1"
                >
                  <span>{about.compareLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ELIGIBILITY SECTION */}
        <section id="eligibility" className="scroll-mt-28 bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200/80 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{eligibility.eyebrow}</span>
            <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              {eligibility.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm text-gray-700 leading-relaxed">
            <div className="md:col-span-8 space-y-4">
              <p>{eligibility.copy}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                {eligibility.boxes.map((box, i) => (
                  <div key={i} className="p-3.5 bg-white rounded-xl border border-gray-200">
                    <span className="font-bold text-d2c-navy block mb-1">{box.title}</span>
                    <span>{box.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center items-start space-y-3">
              <a
                href="#admission-enquiry"
                className="w-full py-3.5 px-6 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white font-sora font-bold text-xs text-center transition-all shadow-md"
              >
                {eligibility.ctaLabel}
              </a>
              <p className="text-[11px] text-gray-500 text-center w-full">
                {eligibility.ctaNote}
              </p>
            </div>
          </div>
        </section>

        {/* ADMISSION PROCESS & FEES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Process Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy flex items-center gap-2">
              <I n={process.icon} f={FileCheck2} c="w-5 h-5 text-d2c-royal" />
              <span>{process.title}</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {process.copy}
            </p>
            <ol className="space-y-2 text-xs text-gray-700 pt-2 list-decimal pl-4">
              {process.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Fees Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy flex items-center gap-2">
              <I n={fees.icon} f={CreditCard} c="w-5 h-5 text-d2c-royal" />
              <span>{fees.title}</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {fees.copy}
            </p>
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={fees.linkHref}
                className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1"
              >
                <span>{fees.linkLabel}</span>
                <I n={fees.linkIcon} f={ExternalLink} c="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CAREER OPPORTUNITIES */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{careers.eyebrow}</span>
            <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy flex items-center gap-2.5">
              <I n={careers.icon} f={Briefcase} c="w-6 h-6 text-d2c-royal" />
              <span>{careers.heading}</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              {careers.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs md:text-sm">
            {careers.items.map((career, cIdx) => (
              <div key={cIdx} className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center gap-2.5 shadow-sm">
                <I n={careers.bulletIcon} f={CheckCircle2} c="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-gray-800">{career}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION — ADMISSION ENQUIRY FORM */}
        <IemEnquiryForm
          sectionId="admission-enquiry"
          defaultCourse="B.Tech"
          defaultBranch={content.formDefaultBranch}
          content={content.form}
        />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <IemFaqs content={content.faqs} />

        {/* CROSS-PAGE INTERNAL LINKING MATRIX */}
        <section className="border-t border-gray-200 pt-12 space-y-6">
          <div className="space-y-1">
            <h3 className="font-sora font-bold text-lg text-d2c-navy">{related.title}</h3>
            <p className="text-xs text-gray-500">{related.intro}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[...related.links, ...related.branches].map((rel, rIdx) => (
              <Link
                key={rIdx}
                href={rel.href}
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
              >
                <span>{rel.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            ))}
          </div>
        </section>

        {/* FINAL CALL TO ACTION BANNER */}
        <section className="bg-gradient-to-r from-d2c-navy via-d2c-royal to-blue-900 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-sora font-bold text-white">
              {finalCta.heading}
            </h3>
            <p className="text-xs md:text-sm text-d2c-ice/85 max-w-xl">
              {finalCta.text}
            </p>
          </div>
          <a
            href="#admission-enquiry"
            className="px-8 py-3.5 rounded-xl bg-d2c-gold hover:bg-yellow-400 text-d2c-navy font-sora font-bold text-xs md:text-sm transition-all shadow-md shrink-0 uppercase tracking-wide"
          >
            {finalCta.label}
          </a>
        </section>

      </main>
    </div>
  );
}
