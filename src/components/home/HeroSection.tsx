"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin, Building, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { CountUp } from "@/components/ui/CountUp";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { CallbackModal } from "@/components/layout/CallbackModal";
import { CmsIcon } from "@/components/cms/CmsIcon";
import { homeDefaults, type HomeContent } from "@/content/home.defaults";

const KNOWN_ICONS = { users: Users, building: Building, "map-pin": MapPin };

const STAT_TONES: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-d2c-royal" },
  gold: { bg: "bg-amber-50", text: "text-d2c-gold" },
  green: { bg: "bg-green-50", text: "text-d2c-success" },
};

export function HeroSection({ content = homeDefaults.hero }: { content?: HomeContent["hero"] } = {}) {
  const dynamicTexts: string[] = content.rotatingWords?.length ? content.rotatingWords : [""];
  const stats = content.stats ?? [];
  const [textIndex, setTextIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [dynamicTexts.length]);

  return (
    <section className="relative flex flex-col items-center justify-center max-[370px]:min-h-[774px] min-h-[704px] lg:min-h-[850px] text-d2c-white pt-20 pb-20 md:pt-20 lg:pt-40 md:pb-20 overflow-hidden pointer-events-none -mb-24 sm:-mb-36 lg:-mb-40">
      {/* ── Split Background Engine ── */}
      <div className="absolute top-0 left-0 right-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy -z-20 border-b-4 border-d2c-royal" />

      {/* ── Geometric Background ── */}
      <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

      {/* ── Background Image (Mobile & Desktop) ── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.backgroundImage}
          alt={content.backgroundImageAlt}
          fill
          className="object-cover object-center opacity-[0.12] lg:opacity-[0.08]"
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-d2c-navy/60 via-transparent to-d2c-navy/80" />
      </div>

      {/* ═══════════ MOBILE LAYOUT (< lg) ═══════════ */}
      <div className="lg:hidden content-boundary relative z-20 flex flex-col items-center w-full pointer-events-none">

        {/* ── Heading + Description ── */}
        <div className="w-full pointer-events-auto text-center -mt-8">
          {/* Logo Showcase */}
          <div className="relative w-48 sm:w-64 h-14 sm:h-16 mx-auto mix-blend-screen opacity-90 mb-4">
            <Image
              src={content.logoImage}
              alt={content.logoImageAlt}
              fill
              className="object-contain object-center"
            />
          </div>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-sora font-bold tracking-tight mb-3 leading-[1.15]">
            {`${content.titleLine1} `}<br />
            {content.mobileTitleLine2}{" "}
            <span className="relative inline-block min-w-[5ch]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={dynamicTexts[textIndex]}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-d2c-solid-blue"
                >
                  {dynamicTexts[textIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-[13px] sm:text-[14.5px] text-d2c-ice/75 mb-8 font-medium leading-relaxed max-w-sm mx-auto">
            {content.mobileDescription}
          </p>
        </div>

        {/* ── Action Buttons ── */}
        <div className="w-full pointer-events-auto flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-6 py-3.5 bg-d2c-solid-blue hover:bg-blue-700 text-white font-bold text-[13px] transition-all flex items-center justify-center rounded-full shadow-[0_4px_14px_rgba(74,144,226,0.3)] gap-2"
          >
            {content.primaryButtonLabel}
            <MessageCircle className="w-4 h-4" />
          </button>
          <Link
            href={content.secondaryButton.href}
            target={content.secondaryButton.newTab ? "_blank" : undefined}
            className="w-full px-6 py-3.5 bg-white text-d2c-navy hover:text-d2c-royal font-bold text-[13px] transition-all flex items-center justify-center rounded-full shadow-md gap-2"
          >
            {content.secondaryButton.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Trust Badges — inline, matching counselling bar width ── */}
        <div className="w-full pointer-events-auto mt-3.5">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full px-3 py-2.5 flex items-center justify-around">
            {stats.map((stat, i) => {
              const tone = STAT_TONES[stat.tone] ?? STAT_TONES.blue;
              return (
                <Fragment key={i}>
                  {i > 0 && <div className="w-px h-7 bg-neutral-200" />}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-xl ${tone.bg} flex items-center justify-center shrink-0`}>
                      <CmsIcon name={stat.icon} known={KNOWN_ICONS} className={`w-3 h-3 ${tone.text}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold font-sora text-d2c-navy leading-tight">
                        <CountUp end={stat.value} suffix={stat.suffix || undefined} duration={stat.duration} />
                      </div>
                      <div className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>

        </div>
      </div>

      {/* ═══════════ DESKTOP LAYOUT (>= lg) ═══════════ */}
      <div className="hidden lg:block content-boundary relative z-20 w-full pointer-events-none -mt-16">
        <div className="w-full relative pointer-events-none flex items-center">
          {/* Left side: text content */}
          <div className="w-[50%] flex flex-col items-start relative z-10 pointer-events-none">
            <div className="w-full max-w-4xl pointer-events-auto">
              <h1 className="text-[4.25rem] font-sora font-bold tracking-tight mb-5 text-balance leading-[1.05]">
                {`${content.titleLine1} `}<br />
                {`${content.desktopTitleLine2} `}<br />
                <span className="text-d2c-solid-blue">{content.desktopTitleHighlight}</span>
              </h1>

              <p className="text-[17px] text-d2c-ice/80 mb-8 font-medium max-w-lg leading-snug lg:max-[1046px]:hidden">
                {content.desktopDescription}
              </p>
            </div>

            <div className="w-full max-w-xl pointer-events-auto mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-d2c-solid-blue hover:bg-blue-700 text-white font-bold text-sm transition-all flex items-center justify-center rounded-full shadow-[0_4px_14px_rgba(74,144,226,0.3)] shrink-0 gap-2"
              >
                {content.primaryButtonLabel}
                <MessageCircle className="w-5 h-5" />
              </button>
              <Link
                href={content.secondaryButton.href}
                target={content.secondaryButton.newTab ? "_blank" : undefined}
                className="px-8 py-3.5 bg-white text-d2c-navy hover:text-d2c-royal hover:shadow-lg font-bold text-sm transition-all flex items-center justify-center rounded-full shrink-0 gap-2"
              >
                {content.secondaryButton.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right side: Overlapping student composite */}
          <div className="w-[50%] flex justify-center items-end relative pointer-events-none" style={{ minHeight: 640 }}>
            {/* Decorative pulsing circle — behind both */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 440,
                height: 440,
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(circle, rgba(59,76,192,0.18) 0%, rgba(42,48,128,0.06) 70%, transparent 100%)",
              }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Male student — positioned left-back */}
            <div
              className="absolute z-10"
              style={{ left: "5%", bottom: "40px" }}
            >
              <Image
                src={content.maleStudentImage}
                alt={content.maleStudentImageAlt}
                width={370}
                height={470}
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>

            {/* Female student — positioned right-front, overlapping */}
            <div
              className="absolute z-20"
              style={{ right: "-2%", bottom: "40px" }}
            >
              <Image
                src={content.femaleStudentImage}
                alt={content.femaleStudentImageAlt}
                width={330}
                height={450}
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Badges Floating Card — desktop only (mobile is inline above) ── */}
      <div className="hidden lg:flex absolute bottom-16 lg:bottom-20 left-0 right-0 mx-auto translate-y-1/2 z-30 w-full content-boundary pointer-events-auto justify-center">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full px-6 md:px-10 py-3 md:py-5 flex items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {stats.map((stat, i) => {
            const tone = STAT_TONES[stat.tone] ?? STAT_TONES.blue;
            return (
              <Fragment key={i}>
                {i > 0 && <div className="w-px h-8 bg-neutral-200" />}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${tone.bg} flex items-center justify-center shrink-0`}>
                    <CmsIcon name={stat.icon} known={KNOWN_ICONS} className={`w-4 h-4 ${tone.text}`} />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold font-sora text-d2c-navy leading-tight">
                      <CountUp end={stat.value} suffix={stat.suffix || undefined} duration={stat.duration} />
                    </div>
                    <div className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
