"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin, Building, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { CountUp } from "@/components/ui/CountUp";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { CallbackModal } from "@/components/layout/CallbackModal";
const TEXTS = ["B.Tech", "MBA", "Medical"];

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setIsModalOpen(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[75vh] lg:min-h-[90vh] text-d2c-white pt-20 pb-20 md:pt-40 md:pb-20 overflow-hidden pointer-events-none -mb-24 sm:-mb-36 lg:-mb-40">
      {/* ── Split Background Engine ── */}
      <div className="absolute top-0 left-0 right-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy -z-20 border-b-4 border-d2c-royal" />

      {/* ── Geometric Background ── */}
      <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

      {/* ── Mobile-only Background Image ── */}
      <div className="lg:hidden absolute inset-0 -z-10">
        <Image
          src="/images/hero-graduation-bg.png"
          alt="Graduating students celebrating"
          fill
          className="object-cover object-center opacity-[0.12]"
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
              src="/logo-footer.png"
              alt="Direct2Campus"
              fill
              className="object-contain object-center"
            />
          </div>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-sora font-bold tracking-tight mb-3 leading-[1.15]">
            Get Direct Admission <br />
            Guidance for{" "}
            <span className="relative inline-block min-w-[5ch]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={TEXTS[textIndex]}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-d2c-solid-blue"
                >
                  {TEXTS[textIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-[13px] sm:text-[14.5px] text-d2c-ice/75 mb-8 font-medium leading-relaxed max-w-sm mx-auto">
            Compare colleges, check eligibility, and secure your seat with expert counselling.
          </p>
        </div>

        {/* ── Counselling Bar ── */}
        <div className="w-full pointer-events-auto">
          <form
            className="relative flex items-center w-full bg-white rounded-full p-1.5 shadow-[0_4px_24px_rgba(255,255,255,0.12)] ring-4 ring-white/10"
            onSubmit={handleHeroSubmit}
          >
            <div className="flex items-center pl-3.5 pr-2.5 text-neutral-500 font-semibold text-[12px] sm:text-[13px]">
              +91
            </div>
            <div className="w-[1px] h-5 bg-neutral-200"></div>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className="flex-1 bg-transparent px-2.5 py-2 text-d2c-navy font-semibold placeholder:text-neutral-400 placeholder:font-medium focus:outline-none text-[12px] sm:text-[13px] w-full min-w-0"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-2.5 bg-d2c-solid-blue hover:bg-blue-700 text-white font-bold text-[12px] sm:text-[13px] transition-colors flex items-center justify-center rounded-full shadow-[0_4px_14px_rgba(74,144,226,0.3)] shrink-0 gap-1.5 whitespace-nowrap"
            >
              Counselling
            </button>
          </form>
        </div>

        {/* ── Trust Badges — inline, matching counselling bar width ── */}
        <div className="w-full pointer-events-auto mt-3.5">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full px-3 py-2.5 flex items-center justify-around">
            {/* Stat 1 */}
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="w-3 h-3 text-d2c-royal" />
              </div>
              <div>
                <div className="text-sm font-bold font-sora text-d2c-navy leading-tight">
                  <CountUp end={500} suffix="+" duration={2200} />
                </div>
                <div className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">Students</div>
              </div>
            </div>
            <div className="w-px h-7 bg-neutral-200" />
            {/* Stat 2 */}
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Building className="w-3 h-3 text-d2c-gold" />
              </div>
              <div>
                <div className="text-sm font-bold font-sora text-d2c-navy leading-tight">
                  <CountUp end={90} suffix="+" duration={1800} />
                </div>
                <div className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">Colleges</div>
              </div>
            </div>
            <div className="w-px h-7 bg-neutral-200" />
            {/* Stat 3 */}
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <MapPin className="w-3 h-3 text-d2c-success" />
              </div>
              <div>
                <div className="text-sm font-bold font-sora text-d2c-navy leading-tight">
                  <CountUp end={12} duration={1500} />
                </div>
                <div className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">States</div>
              </div>
            </div>
          </div>

          {/* ── Explore link ── */}
          <div className="mt-5 flex justify-center">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold text-white/80 hover:text-white transition-colors"
            >
              Explore 90+ Colleges
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════ DESKTOP LAYOUT (>= lg) ═══════════ */}
      <div className="hidden lg:block content-boundary relative z-20 w-full pointer-events-none -mt-16">
        <div className="w-full relative pointer-events-none flex items-center">
          {/* Left side: text content */}
          <div className="w-[50%] flex flex-col items-start relative z-10 pointer-events-none">
            <div className="w-full max-w-4xl pointer-events-auto">
              <div className="relative w-56 lg:w-72 h-16 lg:h-20 mb-6 mix-blend-screen opacity-90">
                <Image
                  src="/logo-footer.png"
                  alt="Direct2Campus"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <h1 className="text-[4.25rem] font-sora font-bold tracking-tight mb-5 text-balance leading-[1.05]">
                Get Direct Admission <br />
                Guidance from <br />
                <span className="text-d2c-solid-blue">Verified Experts</span>
              </h1>

              <p className="text-[17px] text-d2c-ice/80 mb-8 font-medium max-w-lg leading-snug">
                Compare colleges, check eligibility, and secure your seat with expert counselling. Your path to a premium education simplified.
              </p>
            </div>

            <div className="w-full max-w-xl pointer-events-auto mt-2">
              <form
                className="relative flex items-center w-full bg-white rounded-full p-1.5 shadow-[0_4px_30px_rgba(255,255,255,0.15)] ring-4 ring-white/10"
                onSubmit={handleHeroSubmit}
              >
                <div className="flex items-center pl-4 pr-3 text-neutral-500 font-semibold text-sm">
                  +91
                </div>
                <div className="w-[1px] h-5 bg-neutral-200"></div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="flex-1 bg-transparent px-3 py-2 text-d2c-navy font-semibold placeholder:text-neutral-400 placeholder:font-medium focus:outline-none text-sm w-full"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-d2c-solid-blue hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center rounded-full shadow-[0_4px_14px_rgba(74,144,226,0.3)] shrink-0 gap-2"
                >
                  Get Free Counselling
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
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
                src="/images/hero-student-male.png"
                alt="Indian male college student"
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
                src="/images/hero-student-female.png"
                alt="Indian female college student"
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
      <div className="hidden sm:flex absolute bottom-16 lg:bottom-20 left-0 right-0 mx-auto translate-y-1/2 z-30 w-full content-boundary pointer-events-auto justify-center">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full px-6 md:px-10 py-3 md:py-5 flex items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {/* Stat 1 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-d2c-royal" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold font-sora text-d2c-navy leading-tight">
                <CountUp end={500} suffix="+" duration={2200} />
              </div>
              <div className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Students</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-neutral-200" />

          {/* Stat 2 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Building className="w-4 h-4 text-d2c-gold" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold font-sora text-d2c-navy leading-tight">
                <CountUp end={90} suffix="+" duration={1800} />
              </div>
              <div className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Colleges</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-neutral-200" />

          {/* Stat 3 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-d2c-success" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold font-sora text-d2c-navy leading-tight">
                <CountUp end={12} duration={1500} />
              </div>
              <div className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">States</div>
            </div>
          </div>
        </div>
      </div>

      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialPhone={phone} 
      />
    </section>
  );
}
