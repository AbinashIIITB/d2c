"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { MapPin, ArrowRight, TrendingUp, GraduationCap, Building2, Users } from "lucide-react"
import { CountUp } from "@/components/ui/CountUp"

const STATES = [
  { name: "Karnataka", count: 45, ref: "karnataka", icon: Building2 },
  { name: "West Bengal", count: 50, ref: "west-bengal", icon: Building2 },
  { name: "Maharashtra", count: 32, ref: "maharashtra", icon: Building2 },
  { name: "Tamil Nadu", count: 28, ref: "tamil-nadu", icon: Building2 },
  { name: "Uttar Pradesh", count: 24, ref: "uttar-pradesh", icon: Building2 },
  { name: "Odisha", count: 18, ref: "odisha", icon: Building2 },
  { name: "Uttarakhand", count: 12, ref: "uttarakhand", icon: Building2 },
  { name: "Punjab", count: 15, ref: "punjab", icon: Building2 },
  { name: "Andhra Pradesh", count: 14, ref: "andhra-pradesh", icon: Building2 },
  { name: "Telangana", count: 12, ref: "telangana", icon: Building2 },
  { name: "Gujarat", count: 10, ref: "gujarat", icon: Building2 },
  { name: "Madhya Pradesh", count: 8, ref: "madhya-pradesh", icon: Building2 },
]

// Big aggregate stats for the hero row
const HERO_STATS = [
  { value: 500, suffix: "+", label: "Students Placed", icon: Users },
  { value: 90, suffix: "+", label: "Partner Colleges", icon: GraduationCap },
  { value: 12, suffix: "", label: "States Covered", icon: MapPin },
  { value: 98, suffix: "%", label: "Success Rate", icon: TrendingUp },
]

// Animated counter component
function AnimatedCounter({ value, suffix = "", isInView }: { value: number; suffix?: string; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return <>{displayValue}{suffix}</>
}

export function StatesCoverage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative overflow-hidden" ref={ref}>
      {/* ── DARK HERO STATS BAR — Stripe "Backbone of Commerce" style ── */}
      <div className="bg-d2c-navy relative overflow-hidden">
        {/* Decorative gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-d2c-royal/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-d2c-sky/10 rounded-full blur-[100px]" />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="content-boundary relative z-10 py-16 md:py-24">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-d2c-sky/40" />
              <span className="text-d2c-sky/70 font-semibold text-sm tracking-widest uppercase">
                Our Impact
              </span>
              <div className="h-px w-8 bg-d2c-sky/40" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-white text-center leading-[1.1] mb-16 md:mb-20"
          >
            The backbone of{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky via-d2c-ice to-d2c-sky">
              direct admissions
            </span>
          </motion.h2>

          {/* ── BIG STAT COUNTERS — 4 columns ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            {HERO_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-5 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-d2c-sky" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-2 tabular-nums">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2200} />
                </div>
                <div className="text-sm md:text-base text-white/50 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="max-w-5xl mx-auto mt-16 md:mt-20 pt-16 md:pt-20 border-t border-white/10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl md:text-3xl font-sora font-bold text-white text-center mb-4"
            >
              Admissions across top states
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-white/40 text-center max-w-lg mx-auto mb-12"
            >
              Official partnerships with premier institutions in India&apos;s top educational hubs.
            </motion.p>

            {/* ── STATE CARDS — Clean grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {STATES.map((state, idx) => (
                <motion.div
                  key={state.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + idx * 0.06
                  }}
                >
                  <Link
                    href={`/colleges?state=${state.ref}`}
                    className="group block bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 rounded-xl p-5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-d2c-royal/20 flex items-center justify-center group-hover:bg-d2c-royal/30 transition-colors">
                        <MapPin className="w-4 h-4 text-d2c-sky" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-d2c-sky group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <h4 className="font-sora font-bold text-white text-base mb-1 group-hover:text-d2c-sky transition-colors">
                      {state.name}
                    </h4>
                    <p className="text-white/40 text-sm font-medium">
                      {state.count}+ Colleges
                    </p>
                  </Link>
                </motion.div>
              ))}

              {/* "View All" CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <Link
                  href="/colleges"
                  className="group flex flex-col items-center justify-center h-full min-h-[130px] bg-gradient-to-br from-d2c-royal/20 to-d2c-sky/10 hover:from-d2c-royal/30 hover:to-d2c-sky/20 border border-d2c-royal/30 hover:border-d2c-royal/50 rounded-xl p-5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-5 h-5 text-d2c-sky group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-d2c-sky font-semibold text-sm text-center">
                    View All Colleges
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
