"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin, Building, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg";
import { HeroGraphic } from "@/components/home/HeroGraphic";
import { CountUp } from "@/components/ui/CountUp";

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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-d2c-navy text-d2c-white pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Animated starry night background overlay */}
      <AnimatedPatternBg opacity={0.15} speed={150} />

      {/* Full-section interactive starburst graphic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-auto z-[1]"
      >
        <HeroGraphic />
      </motion.div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-d2c-royal/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-d2c-sky/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(42,48,128,0.4)_0%,transparent_60%)]" />
      </div>

      <div className="content-boundary relative z-20 flex flex-col items-start text-left w-full">
        <div className="w-full relative">
          {/* Left side: text content (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col items-start relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-6 text-balance leading-[1.1]">
                Get Direct Admission <br />
                Guidance from <br />
                <span className="text-d2c-solid-blue">Verified Experts</span>
              </h1>

              <p className="text-base md:text-lg text-d2c-ice/80 mb-10 font-medium">
                Compare colleges, check eligibility, and secure your seat with expert counselling. Your path to a premium education simplified.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/contact" 
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-d2c-navy font-bold text-base hover:bg-d2c-ice transition-colors flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] rounded-xl"
              >
                Get Free Counselling
              </Link>
              <Link
                href="/colleges"
                className="w-full sm:w-auto px-8 py-3.5 bg-d2c-solid-blue text-white font-bold text-base hover:opacity-90 transition-all flex items-center justify-center rounded-xl shadow-[0_4px_14px_rgba(74,144,226,0.25)]"
              >
                Explore Colleges
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Trust Badges Bar — with animated counting numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 w-full max-w-4xl self-center flex flex-wrap justify-center gap-6 md:gap-12 py-8 border-t border-white/10"
        >
          <div className="flex items-center gap-3 text-d2c-ice">
            <div className="p-3 rounded-full bg-white/5">
              <Users className="w-6 h-6 text-d2c-sky" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold font-sora">
                <CountUp end={500} suffix="+" duration={2200} />
              </div>
              <div className="text-sm text-white/50">Students Placed</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-d2c-ice">
            <div className="p-3 rounded-full bg-white/5">
              <Building className="w-6 h-6 text-d2c-gold" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold font-sora">
                <CountUp end={90} suffix="+" duration={1800} />
              </div>
              <div className="text-sm text-white/50">Partner Colleges</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-d2c-ice">
            <div className="p-3 rounded-full bg-white/5">
              <MapPin className="w-6 h-6 text-d2c-success" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold font-sora">
                <CountUp end={12} duration={1500} />
              </div>
              <div className="text-sm text-white/50">States Covered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
