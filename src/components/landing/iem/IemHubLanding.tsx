import { Fragment } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Building2,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { IemEnquiryForm } from './IemEnquiryForm';
import { I, IemFaqs, IemJsonLd } from './iemShared';
import { AnimatedPatternBg } from '@/components/ui/AnimatedPatternBg';
import { iemHubDefaults, type IemHubContent } from '@/content/iem-hub.defaults';

export function IemHubLanding({ content = iemHubDefaults }: { content?: IemHubContent }) {
  const { hero, about, courses, eligibility, process, whyIem, whyD2c } = content;

  return (
    <div className="min-h-screen bg-d2c-white font-dm-sans text-gray-800 antialiased selection:bg-d2c-royal selection:text-white">
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
            {/* Left Column */}
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

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#iem-enquiry"
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

                <a
                  href={hero.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-sora font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  <I n={hero.whatsappIcon} f={MessageSquare} c="w-4 h-4" />
                  <span>{hero.whatsappLabel}</span>
                </a>
              </div>
            </div>

            {/* Right Column Visual Card */}
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

                <div className="grid grid-cols-2 gap-2 text-xs text-d2c-ice/90">
                  {hero.stats.map((stat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-white font-bold text-sm">{stat.value}</p>
                      <p className="text-[11px] text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Guidance Notice */}
      <div className="bg-amber-50/80 border-b border-amber-200 py-3 px-4 text-center">
        <p className="text-xs text-amber-900 max-w-4xl mx-auto leading-relaxed">
          <strong>{content.notice.label}</strong> {content.notice.text}
        </p>
      </div>

      <main className="content-boundary max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* SECTION B — ABOUT IEM KOLKATA */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{about.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {about.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="md:col-span-8 space-y-4">
              {about.paragraphs.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
            </div>

            <div className="md:col-span-4 bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-3">
              <h3 className="font-sora font-bold text-base text-d2c-navy flex items-center gap-2">
                <I n={about.factsIcon} f={Building2} c="w-4 h-4 text-d2c-royal" />
                <span>{about.factsTitle}</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                {about.facts.map((fact, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <I n={about.factsBulletIcon} f={CheckCircle2} c="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link
                  href={about.profileHref}
                  className="text-xs font-bold text-d2c-royal hover:underline flex items-center gap-1"
                >
                  <span>{about.profileLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C — COURSES */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{courses.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {courses.heading}
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl">
              {courses.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.items.map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-d2c-royal flex items-center justify-center group-hover:bg-d2c-royal group-hover:text-white transition-colors duration-300">
                      <I n={course.icon} f={Briefcase} c="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-d2c-royal uppercase tracking-wider">
                      {course.badge}
                    </span>
                    <h3 className="text-xl font-sora font-bold text-d2c-navy group-hover:text-d2c-royal transition-colors mt-1">
                      {course.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="#iem-enquiry"
                    className="px-5 py-2.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    {course.enquireLabel}
                  </a>

                  <Link
                    href={course.link}
                    className="text-xs font-bold text-gray-600 hover:text-d2c-navy flex items-center gap-1"
                  >
                    <span>{courses.detailsLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-d2c-gold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION D — ELIGIBILITY */}
        <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200/80 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{eligibility.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {eligibility.heading}
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
              {eligibility.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs md:text-sm">
            {eligibility.items.map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
                <span className={item.labelClass}>{item.title}</span>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION E — ADMISSION PROCESS */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{process.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {process.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.steps.map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-d2c-royal">{step.label}</span>
                <h4 className="font-sora font-bold text-base text-d2c-navy">{step.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <a
              href="#iem-enquiry"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white font-sora font-bold text-sm shadow-md transition-all"
            >
              <span>{process.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* SECTION F & G — WHY CONSIDER IEM & WHY DIRECT2CAMPUS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy">{whyIem.title}</h3>
            <ul className="space-y-3 text-xs md:text-sm text-gray-700">
              {whyIem.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <I n={whyIem.bulletIcon} f={CheckCircle2} c="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4">
            <h3 className="font-sora font-bold text-xl text-d2c-navy">{whyD2c.title}</h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {whyD2c.text}
            </p>
            <ul className="space-y-2 text-xs text-gray-700 pt-1">
              {whyD2c.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <I n={whyD2c.bulletIcon} f={Sparkles} c="w-3.5 h-3.5 text-d2c-royal shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION H — ENQUIRY FORM */}
        <IemEnquiryForm
          sectionId="iem-enquiry"
          showCourseSelector={true}
          defaultCourse="B.Tech"
          content={content.form}
        />

        {/* SECTION I — FAQS */}
        <IemFaqs content={content.faqs} />

      </main>
    </div>
  );
}
