"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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

/* ─── Desktop Step Card ─── */
function DesktopStepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex items-center gap-16 w-full ${isEven ? "flex-row" : "flex-row-reverse"
        }`}
    >
      {/* ── Image side ── */}
      <div className="flex-1 flex justify-center max-w-lg">
        <motion.div
          className={`relative rounded-3xl ${step.bg} border ${step.border} p-8 shadow-lg overflow-hidden w-full`}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-contain"
              sizes="400px"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Content side ── */}
      <div className={`flex-1 max-w-lg ${isEven ? "pl-14" : "pr-14"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isEven ? -30 : 30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            className={`inline-flex text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4 ${step.badge}`}
          >
            Step {step.id} — {step.subtitle}
          </span>

          <h3 className="text-4xl font-sora font-bold text-d2c-navy mb-3 leading-tight">
            {step.title}
          </h3>
          <p className="text-lg text-neutral-600 leading-relaxed mb-4">
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
            <div
              className="h-px flex-1 max-w-[80px]"
              style={{ backgroundColor: `${step.color}30` }}
            />
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: step.color }}
            >
              {step.subtitle}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function AdmissionProcedure3D() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let step = Math.floor(latest * 4);
    if (step >= 4) step = 3;
    setActiveStep(step);
  });

  const activeStepData = STEPS[activeStep];

  return (
    <section
      className="relative bg-neutral-50"
      id="admission-procedure"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(#0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] left-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px]" />
        <div className="absolute top-[80%] right-[10%] w-[400px] h-[400px] bg-green-100/30 rounded-full blur-[100px]" />
      </div>

      {/* ── MOBILE: simple stacked layout ── */}
      <div className="lg:hidden content-boundary py-16">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex px-4 py-1.5 bg-blue-100 text-blue-700 font-bold text-xs mb-4 rounded-full border border-blue-200 uppercase tracking-[0.2em]">
            Your Journey
          </div>
          <h2 className="text-3xl font-sora font-bold text-d2c-navy mb-3">
            How Direct Admission Works
          </h2>
          <p className="text-base text-neutral-500 leading-relaxed max-w-sm mx-auto">
            A streamlined 4‑step journey from consultation to confirmed
            admission
          </p>
        </div>

        {/* Mobile steps: simple vertical stack */}
        <div className="flex flex-col gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-5 top-full h-8 w-0.5"
                    style={{ backgroundColor: `${step.color}30` }}
                  />
                )}
                <div
                  className={`rounded-2xl ${step.bg} border ${step.border} p-5`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.id}
                    </div>
                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full ${step.badge}`}
                      >
                        Step {step.id}
                      </span>
                      <h3 className="text-xl font-sora font-bold text-d2c-navy mt-1">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-base text-neutral-600 leading-relaxed mb-3">
                    {step.desc}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}18` }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: step.color }}
                      />
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: step.color }}
                    >
                      {step.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DESKTOP: scroll-driven animation ── */}
      <div ref={containerRef} className="hidden lg:block relative h-[400vh] -mb-[30vh]">
        <div className="sticky top-[10vh] w-full flex flex-col items-center pb-4 content-boundary">
          {/* Section header */}
          <div className="text-center mb-14">
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
              className="text-5xl font-sora font-bold text-d2c-navy mb-3"
            >
              How Direct Admission Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto"
            >
              A streamlined 4‑step journey from consultation to confirmed
              admission
            </motion.p>
          </div>

          {/* Active step display */}
          <div className="relative max-w-5xl mx-auto min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeStep}>
                <DesktopStepCard
                  step={activeStepData}
                  index={activeStep}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-3 mt-14">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center gap-3">
                <button
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-500 ${activeStep === i
                      ? "bg-white shadow-lg scale-105"
                      : activeStep > i
                        ? "bg-white/80 shadow-sm"
                        : "bg-transparent"
                    }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${activeStep >= i
                        ? "text-white"
                        : "text-neutral-400 bg-neutral-200"
                      }`}
                    style={
                      activeStep >= i
                        ? { backgroundColor: step.color }
                        : {}
                    }
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
                  <div className="w-12 h-0.5 rounded-full overflow-hidden bg-neutral-200">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: STEPS[i].color }}
                      animate={{
                        width: activeStep > i ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div className="flex justify-center mt-6">
            <div className="w-48 h-1.5 bg-neutral-200/60 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                style={{
                  scaleX: scrollYProgress,
                  transformOrigin: "left",
                  backgroundImage:
                    "linear-gradient(to right, #3B4CC0, #5B9BD5, #D4A843, #22C55E)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
