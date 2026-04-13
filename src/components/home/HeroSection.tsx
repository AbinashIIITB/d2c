"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin, Building, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { CountUp } from "@/components/ui/CountUp";
import { HeroBackground } from "@/components/ui/HeroBackground";
const TEXTS = ["B.Tech", "MBA", "Medical", "Abroad"];

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] lg:min-h-[90vh] text-d2c-white pt-28 pb-16 md:pt-40 md:pb-20 overflow-hidden pointer-events-none -mb-28 sm:-mb-36 lg:-mb-40">
      {/* ── Split Background Engine ── */}
      <div className="absolute top-0 left-0 right-0 bottom-28 sm:bottom-36 lg:bottom-40 bg-d2c-navy -z-20 border-b-4 border-d2c-royal" />

      {/* ── Geometric Background ── */}
      <HeroBackground bottomOffsetClass="bottom-28 sm:bottom-36 lg:bottom-40" />

      <div className="content-boundary relative z-20 flex flex-col items-start text-left w-full pointer-events-none -mt-6 lg:-mt-16">
        <div className="w-full relative pointer-events-none flex items-center">
          {/* Left side: text content */}
          <div className="w-full lg:w-[50%] flex flex-col items-start relative z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl pointer-events-auto"
            >
              <h1 className="text-[2.1rem] md:text-[3.5rem] lg:text-[4.25rem] font-sora font-bold tracking-tight mb-5 text-balance leading-[1.05]">
                Get Direct Admission <br />
                Guidance from <br />
                <span className="text-d2c-solid-blue">Verified Experts</span>
              </h1>

              <p className="text-[15px] md:text-[17px] text-d2c-ice/80 mb-8 font-medium max-w-lg leading-snug">
                Compare colleges, check eligibility, and secure your seat with expert counselling. Your path to a premium education simplified.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-lg lg:max-w-xl pointer-events-auto mt-2"
            >
              <form
                className="relative flex items-center w-full bg-white rounded-full p-1.5 shadow-[0_4px_30px_rgba(255,255,255,0.15)] ring-4 ring-white/10"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex items-center pl-4 pr-3 text-neutral-500 font-semibold text-[13px] md:text-sm">
                  +91
                </div>
                <div className="w-[1px] h-5 bg-neutral-200"></div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="flex-1 bg-transparent px-3 py-2 text-d2c-navy font-semibold placeholder:text-neutral-400 placeholder:font-medium focus:outline-none text-[13px] md:text-sm w-full"
                  maxLength={10}
                />
                <button
                  type="button"
                  className="px-6 sm:px-8 py-2.5 bg-d2c-solid-blue hover:bg-blue-700 text-white font-bold text-[13px] md:text-sm transition-colors flex items-center justify-center rounded-full shadow-[0_4px_14px_rgba(74,144,226,0.3)] shrink-0 gap-2"
                >
                  <span className="hidden sm:inline">Get Free</span> Counselling
                  <ArrowRight className="w-4 h-4 hidden sm:block" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right side: Overlapping student composite */}
          <div className="hidden lg:flex w-[50%] justify-center items-end relative pointer-events-none" style={{ minHeight: 640 }}>
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
            <motion.div
              className="absolute z-10"
              style={{ left: "5%", bottom: "40px" }}
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <Image
                src="/images/hero-student-male.png"
                alt="Indian male college student"
                width={370}
                height={470}
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                priority
              />
            </motion.div>

            {/* Female student — positioned right-front, overlapping */}
            <motion.div
              className="absolute z-20"
              style={{ right: "-2%", bottom: "40px" }}
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Image
                src="/images/hero-student-female.png"
                alt="Indian female college student"
                width={330}
                height={450}
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Trust Badges Floating Card — overlaps student images ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 sm:bottom-16 lg:bottom-20 left-0 right-0 mx-auto translate-y-1/2 z-30 w-full content-boundary pointer-events-auto flex justify-center"
      >
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full px-4 sm:px-6 md:px-10 py-3 md:py-5 flex items-center justify-around sm:justify-center sm:gap-8 md:gap-16 lg:gap-24">
          {/* Stat 1 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-d2c-royal" />
            </div>
            <div>
              <div className="text-base sm:text-lg md:text-xl font-bold font-sora text-d2c-navy leading-tight">
                <CountUp end={500} suffix="+" duration={2200} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Students</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-neutral-200" />

          {/* Stat 2 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-d2c-gold" />
            </div>
            <div>
              <div className="text-base sm:text-lg md:text-xl font-bold font-sora text-d2c-navy leading-tight">
                <CountUp end={90} suffix="+" duration={1800} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Colleges</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-neutral-200" />

          {/* Stat 3 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-d2c-success" />
            </div>
            <div>
              <div className="text-base sm:text-lg md:text-xl font-bold font-sora text-d2c-navy leading-tight">
                <CountUp end={12} duration={1500} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium uppercase tracking-wider">States</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
