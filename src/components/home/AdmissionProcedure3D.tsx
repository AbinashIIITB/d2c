"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  MessageCircle,
  Search,
  FileText,
  GraduationCap,
  ArrowRight,
  Phone,
} from "lucide-react";

/* ─── step data ─── */
export const STEPS = [
  {
    id: 1,
    title: "Free Consultation",
    subtitle: "Tell us your goals",
    desc: "Start with a one-on-one session with our expert counsellors to build a personalised admission roadmap based on your profile.",
    image: "/images/steps/step-consultation.png",
    icon: MessageCircle,
    color: "#3B4CC0",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "College Shortlisting",
    subtitle: "Data-backed research",
    desc: "We curate a personalised shortlist of colleges with detailed placement records, fee breakdowns, and campus insights.",
    image: "/images/steps/step-shortlisting.png",
    icon: Search,
    color: "#5B9BD5",
    bg: "bg-sky-50",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    id: 3,
    title: "Application & Docs",
    subtitle: "Paperwork handled",
    desc: "No missed deadlines, no incorrect submissions — we ensure a flawless application process from start to finish.",
    image: "/images/steps/step-application.png",
    icon: FileText,
    color: "#D4A843",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    id: 4,
    title: "Confirmed Admission",
    subtitle: "Seat secured!",
    desc: "Once accepted, we guide you through fee payment, hostel allotment, orientation, and everything you need to start your journey.",
    image: "/images/steps/step-confirmed.png",
    icon: GraduationCap,
    color: "#22C55E",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
  },
];

/* ─── Animated arrow path SVG ─── */
function AnimatedArrowPath({ progress }: { progress: number }) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-0 -translate-x-1/2 hidden lg:block pointer-events-none z-0">
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2"
        width="120"
        height="100%"
        viewBox="0 0 120 2000"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: "100%" }}
      >
        {/* Background dashed line */}
        <path
          d="M60 0 Q60 120 30 200 Q0 280 60 360 Q120 440 90 520 Q60 600 60 680 Q60 760 30 840 Q0 920 60 1000 Q120 1080 90 1160 Q60 1240 60 1320 Q60 1400 30 1480 Q0 1560 60 1640 Q120 1720 90 1800 Q60 1880 60 2000"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="8 8"
          fill="none"
        />
        {/* Animated progress line */}
        <path
          d="M60 0 Q60 120 30 200 Q0 280 60 360 Q120 440 90 520 Q60 600 60 680 Q60 760 30 840 Q0 920 60 1000 Q120 1080 90 1160 Q60 1240 60 1320 Q60 1400 30 1480 Q0 1560 60 1640 Q120 1720 90 1800 Q60 1880 60 2000"
          stroke="url(#arrowGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2600,
            strokeDashoffset: 2600 - (2600 * progress),
            transition: "stroke-dashoffset 0.1s ease-out",
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="arrowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B4CC0" />
            <stop offset="33%" stopColor="#5B9BD5" />
            <stop offset="66%" stopColor="#D4A843" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Step Card component ─── */
function StepCard({
  step,
  index,
  isActive,
}: {
  step: (typeof STEPS)[0];
  index: number;
  isActive: boolean;
}) {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
      initial={{ opacity: 0, y: 80 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Image side ── */}
      <div className="flex-1 flex justify-center w-full max-w-md lg:max-w-lg">
        <motion.div
          className={`relative rounded-3xl ${step.bg} border ${step.border} p-6 md:p-8 shadow-lg overflow-hidden w-full`}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 400px"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Step number circle (center on desktop) ── */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-sora font-extrabold text-xl shadow-xl border-4 border-white"
          style={{ backgroundColor: step.color }}
          animate={isActive ? { scale: 1.15 } : { scale: 0.85 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {step.id}
        </motion.div>
      </div>

      {/* ── Content side ── */}
      <div className="flex-1 w-full max-w-md lg:max-w-lg">
        <motion.div
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isEven ? 30 : -30 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Mobile step badge */}
          <div className="flex lg:hidden items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: step.color }}
            >
              {step.id}
            </div>
            <span className={`text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full ${step.badge}`}>
              Step {step.id}
            </span>
          </div>

          {/* Desktop step badge */}
          <div className="hidden lg:block">
            <span className={`inline-flex text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4 ${step.badge}`}>
              Step {step.id} — {step.subtitle}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-sora font-bold text-d2c-navy mb-3 leading-tight">
            {step.title}
          </h3>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-4">
            {step.desc}
          </p>

          {/* Decorative icon row */}
          <div className="flex items-center gap-3 mt-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${step.color}18` }}
            >
              <Icon className="w-5 h-5" style={{ color: step.color }} />
            </div>
            <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: `${step.color}30` }} />
            <span className="text-xs font-semibold tracking-wide" style={{ color: step.color }}>
              {step.subtitle}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function AdmissionProcedure3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [progressVal, setProgressVal] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressVal(latest);
    // Map scroll progress to step index (0-3)
    const step = Math.min(3, Math.floor(latest * 5));
    setActiveStep(step);
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-neutral-50"
      id="admission-procedure"
      style={{ minHeight: "350vh" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] left-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px]" />
        <div className="absolute top-[80%] right-[10%] w-[400px] h-[400px] bg-green-100/30 rounded-full blur-[100px]" />
      </div>

      {/* Sticky inner viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="content-boundary relative z-10 w-full">
          {/* Section header */}
          <div className="text-center mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex px-4 py-1.5 bg-blue-100 text-blue-700 font-bold text-xs mb-4 rounded-full border border-blue-200 uppercase tracking-[0.2em]"
            >
              Your Journey
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-sora font-bold text-d2c-navy mb-3"
            >
              How Direct Admission Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto"
            >
              A streamlined 4‑step journey from consultation to confirmed admission
            </motion.p>
          </div>

          {/* Steps area */}
          <div className="relative max-w-5xl mx-auto">
            {/* Current active step */}
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                className={`transition-all duration-500 ${
                  activeStep === i
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none absolute inset-0"
                }`}
              >
                <StepCard step={step} index={i} isActive={activeStep === i} />
              </div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-3 mt-10 md:mt-14">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center gap-3">
                <button
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-500 ${
                    activeStep === i
                      ? "bg-white shadow-lg scale-105"
                      : activeStep > i
                      ? "bg-white/80 shadow-sm"
                      : "bg-transparent"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      activeStep >= i ? "text-white" : "text-neutral-400 bg-neutral-200"
                    }`}
                    style={activeStep >= i ? { backgroundColor: step.color } : {}}
                  >
                    {activeStep > i ? "✓" : step.id}
                  </div>
                  {activeStep === i && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      className="text-xs font-semibold text-d2c-navy whitespace-nowrap overflow-hidden pr-1"
                    >
                      {step.title}
                    </motion.span>
                  )}
                </button>
                {i < STEPS.length - 1 && (
                  <div className="w-8 md:w-12 h-0.5 rounded-full overflow-hidden bg-neutral-200">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: STEPS[i].color }}
                      animate={{ width: activeStep > i ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll hint (only visible at start) */}
          <motion.div
            className="flex flex-col items-center mt-6 text-neutral-400"
            animate={{ opacity: activeStep === 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-medium mb-1">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 border-2 border-neutral-300 rounded-full flex items-start justify-center p-1"
            >
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
