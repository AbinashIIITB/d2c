import { Fragment } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Building2,
  Cpu,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';
import { IemEnquiryForm } from './IemEnquiryForm';
import { DownloadChecklistButton } from './DownloadChecklistButton';
import { I, IemFaqs, IemJsonLd } from './iemShared';
import { AnimatedPatternBg } from '@/components/ui/AnimatedPatternBg';
import { iemBtechDefaults, type IemBtechContent } from '@/content/iem-btech.defaults';

export function IemBtechLanding({ content = iemBtechDefaults }: { content?: IemBtechContent }) {
  const { hero, overview, specs, mapping, eligibility, process, documents, help, related, mobileBar } = content;

  return (
    <div className="min-h-screen bg-d2c-white font-dm-sans text-gray-800 antialiased selection:bg-d2c-royal selection:text-white">
      {/* Schema Markup */}
      <IemJsonLd seo={content.seo} faqs={content.faqs.items} breadcrumb={content.breadcrumbSchema} />

      {/* SECTION A — HERO BANNER */}
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
            <span className="text-white font-semibold">{content.crumbLast}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-d2c-royal/20 border border-d2c-royal/40 text-d2c-sky text-xs font-bold uppercase tracking-widest shadow-sm">
                <I n={hero.badgeIcon} f={Sparkles} c="w-3.5 h-3.5 text-d2c-gold" />
                <span>{hero.badge}</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-sora font-bold text-white tracking-tight leading-[1.15]">
                {hero.h1Before}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-d2c-ice to-d2c-sky">{hero.h1Highlight}</span>{' '}{hero.h1After}
              </h1>

              <p className="text-base md:text-xl font-medium text-d2c-gold font-sora">
                {hero.subtitle}
              </p>

              <p className="text-sm md:text-base text-d2c-ice/90 leading-relaxed max-w-2xl">
                {hero.copy}
              </p>

              {/* Icon Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs md:text-sm text-d2c-ice/90 font-medium">
                {hero.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <I n={hero.bulletIcon} f={CheckCircle2} c="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#btech-enquiry"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-d2c-gold to-yellow-400 hover:from-yellow-400 hover:to-d2c-gold text-d2c-navy font-sora font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <I n={hero.primaryIcon} f={GraduationCap} c="w-4 h-4 text-d2c-navy" />
                  <span>{hero.primaryLabel}</span>
                </a>

                <a
                  href={hero.callHref}
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sora font-semibold text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <I n={hero.callIcon} f={PhoneCall} c="w-4 h-4 text-d2c-sky" />
                  <span>{hero.callLabel}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Verified Campus Visual Card */}
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
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-d2c-ice/80 space-y-2">
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

      {/* Trust Advisory Notice */}
      <div className="bg-amber-50/80 border-b border-amber-200 py-3 px-4 text-center">
        <p className="text-xs text-amber-900 max-w-4xl mx-auto leading-relaxed">
          <strong>{content.notice.label}</strong> {content.notice.text}
        </p>
      </div>

      <main className="content-boundary max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* SECTION B — ABOUT IEM AND B.TECH */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{overview.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {overview.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="md:col-span-2 space-y-4">
              {overview.paragraphs.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
              <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-200">
                <strong>{overview.campusNote.label}</strong> {overview.campusNote.text}
              </p>
            </div>

            <div className="bg-blue-50/70 rounded-3xl p-6 border border-blue-100 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-d2c-royal text-white flex items-center justify-center font-bold">
                  <I n={overview.factsIcon} f={Building2} c="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-lg text-d2c-navy">{overview.factsTitle}</h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  {overview.facts.map((fact, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <I n={overview.factsBulletIcon} f={CheckCircle2} c="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={overview.profileHref}
                className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1.5"
              >
                <span>{overview.profileLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION C — B.TECH SPECIALISATIONS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{specs.eyebrow}</span>
              <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
                {specs.heading}
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl">
                {specs.intro}
              </p>
            </div>

            <a
              href="#btech-enquiry"
              className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1 self-start"
            >
              <span>{specs.preselectLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.items.map((spec, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-d2c-royal flex items-center justify-center group-hover:bg-d2c-royal group-hover:text-white transition-colors duration-300">
                      <I n={spec.icon} f={Cpu} c="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${spec.badgeColor}`}>
                      {spec.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-sora font-bold text-d2c-navy group-hover:text-d2c-royal transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <a
                    href="#btech-enquiry"
                    className="w-full py-2.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold text-center block transition-all shadow-sm"
                  >
                    {spec.enquireLabel}
                  </a>

                  <Link
                    href={spec.pageUrl}
                    className="text-xs font-semibold text-gray-500 hover:text-d2c-navy flex items-center justify-center gap-1 py-1"
                  >
                    <span>{specs.detailLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION D — WHY CONSIDER THESE ENGINEERING FIELDS */}
        <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200/80 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{mapping.eyebrow}</span>
            <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              {mapping.heading}
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              {mapping.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            {mapping.items.map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
                <h4 className="font-sora font-bold text-d2c-navy text-base">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION E — ELIGIBILITY CRITERIA */}
        <section id="eligibility" className="scroll-mt-28 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{eligibility.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {eligibility.heading}
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
              {eligibility.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-sora font-bold text-lg text-d2c-navy flex items-center gap-2">
                <I n={eligibility.academic.icon} f={FileCheck2} c="w-5 h-5 text-d2c-royal" />
                <span>{eligibility.academic.title}</span>
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-gray-700">
                {eligibility.academic.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <I n={eligibility.academic.bulletIcon} f={CheckCircle2} c="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{item.label}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-sora font-bold text-lg text-d2c-navy flex items-center gap-2">
                <I n={eligibility.routes.icon} f={GraduationCap} c="w-5 h-5 text-d2c-royal" />
                <span>{eligibility.routes.title}</span>
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-gray-700">
                {eligibility.routes.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <I n={eligibility.routes.bulletIcon} f={CheckCircle2} c="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{item.label}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <a
                  href="#btech-enquiry"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-d2c-royal text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <span>{eligibility.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F — IEMJEE 2027 ADMISSION PROCESS */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{process.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {process.heading}
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
              {process.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.steps.map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
                <span className="w-8 h-8 rounded-full bg-d2c-royal text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <h3 className="font-sora font-bold text-base text-d2c-navy">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-sora font-bold text-base text-d2c-navy">{process.portal.title}</h4>
              <p className="text-xs text-gray-600">{process.portal.text}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={process.portal.viewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-d2c-navy hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{process.portal.viewLabel}</span>
                <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
              </a>
              <a
                href="#btech-enquiry"
                className="px-5 py-2.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                {process.portal.guidanceLabel}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION G — DOCUMENTS CHECKLIST */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{documents.eyebrow}</span>
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
                {documents.heading}
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                {documents.intro}
              </p>
            </div>

            <DownloadChecklistButton content={documents.checklist} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm text-gray-700 pt-2">
            {documents.items.map((doc, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-start gap-2.5">
                <I n={documents.bulletIcon} f={CheckCircle2} c="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION H — WHY DIRECT2CAMPUS */}
        <section className="bg-gradient-to-r from-d2c-navy to-[#0e274a] text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-gold">{help.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-white">
              {help.heading}
            </h2>
            <p className="text-sm md:text-base text-d2c-ice/85 max-w-3xl leading-relaxed">
              {help.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 text-xs md:text-sm">
            {help.items.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="text-d2c-ice/80 text-xs">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION I — ENQUIRY FORM / LEAD CAPTURE */}
        <IemEnquiryForm
          sectionId="btech-enquiry"
          defaultCourse="B.Tech"
          defaultBranch="Computer Science & Engineering (CSE)"
          content={content.form}
        />

        {/* SECTION J — FREQUENTLY ASKED QUESTIONS */}
        <IemFaqs content={content.faqs} />

        {/* RELATED INTERNAL LINKS & BRANCH DIRECTORY */}
        <section className="border-t border-gray-200 pt-12 space-y-6">
          <div className="space-y-1">
            <h3 className="font-sora font-bold text-lg text-d2c-navy">{related.title}</h3>
            <p className="text-xs text-gray-500">{related.intro}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            {related.links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-d2c-royal hover:text-d2c-royal font-semibold transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* STICKY BOTTOM MOBILE CONTACT BAR */}
      <aside aria-label={mobileBar.ariaLabel} className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 flex items-center gap-2 shadow-2xl">
        <a
          href={mobileBar.callHref}
          className="flex-1 py-3 rounded-xl bg-d2c-navy text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
        >
          <PhoneCall className="w-3.5 h-3.5 text-d2c-gold" />
          <span>{mobileBar.callLabel}</span>
        </a>
        <a
          href={mobileBar.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-white" />
          <span>{mobileBar.whatsappLabel}</span>
        </a>
        <a
          href="#btech-enquiry"
          className="flex-1 py-3 rounded-xl bg-d2c-royal text-white text-xs font-bold text-center"
        >
          {mobileBar.enquireLabel}
        </a>
      </aside>
    </div>
  );
}
