"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin, Building, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg";

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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-d2c-navy text-d2c-white py-20">
      {/* Animated floral pattern overlay */}
      <AnimatedPatternBg opacity={0.12} speed={150} />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-d2c-royal/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-d2c-sky/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(42,48,128,0.4)_0%,transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >


          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sora font-bold tracking-tight mb-6 text-balance leading-[1.1]">
            Your Shortcut to <br />
            the <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">Right Campus</span>
          </h1>

          <p className="text-xl md:text-3xl text-d2c-ice/80 mb-10 font-medium">
            Expert Counselling for Engineering, Medical, MBA & more
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/colleges"
            className="w-full sm:w-auto px-8 py-4 bg-white text-d2c-navy font-semibold text-lg hover:bg-d2c-ice transition-colors flex items-center justify-center gap-2 group shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Explore Colleges
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="https://wa.me/919876543210" // Replace with real number
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 bg-d2c-success text-white font-semibold text-lg hover:bg-[#1DA84B] transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Talk to Expert
          </Link>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12 py-8 border-t border-white/10"
        >
          <div className="flex items-center gap-3 text-d2c-ice">
            <div className="p-3 rounded-full bg-white/5">
              <Users className="w-6 h-6 text-d2c-sky" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold font-sora">500+</div>
              <div className="text-sm text-white/50">Students Placed</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-d2c-ice">
            <div className="p-3 rounded-full bg-white/5">
              <Building className="w-6 h-6 text-d2c-gold" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold font-sora">50+</div>
              <div className="text-sm text-white/50">Partner Colleges</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-d2c-ice">
            <div className="p-3 rounded-full bg-white/5">
              <MapPin className="w-6 h-6 text-d2c-success" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold font-sora">7</div>
              <div className="text-sm text-white/50">States Covered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
