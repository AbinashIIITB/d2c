"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import {
  MessageCircle,
  Search,
  FileText,
  GraduationCap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

/* ─── step data ─── */
export const STEPS = [
  {
    id: 1,
    title: "Free Consultation",
    subtitle: "Tell us your goals",
    desc: "Start with a one-on-one session with our expert counsellors to build a personalised roadmap.",
    bullets: [
      "Profile & score assessment",
      "Career-path mapping",
    ],
    icon: MessageCircle,
    color: "#3B4CC0",
    gradient: "from-[#3B4CC0] to-[#5B6FE0]",
  },
  {
    id: 2,
    title: "College Shortlisting",
    subtitle: "We do the research",
    desc: "We curate a shortlist with placement records, fee breakdowns, and campus insights.",
    bullets: [
      "Data-backed ranking analysis",
      "Fee & scholarship mapping",
    ],
    icon: Search,
    color: "#5B9BD5",
    gradient: "from-[#5B9BD5] to-[#7BB5E5]",
  },
  {
    id: 3,
    title: "Application & Docs",
    subtitle: "We handle the paperwork",
    desc: "No missed deadlines, no incorrect submissions — we ensure a flawless application process.",
    bullets: [
      "Error-free document submission",
      "Deadline tracking & reminders",
    ],
    icon: FileText,
    color: "#D4A843",
    gradient: "from-[#D4A843] to-[#E4C067]",
  },
  {
    id: 4,
    title: "Confirmed Admission",
    subtitle: "Seat secured. Dream achieved.",
    desc: "Once accepted, we guide you through fee payment, hostel allotment, and orientation.",
    bullets: [
      "Seat confirmation & allotment text",
      "Hostel & transport assistance",
    ],
    icon: GraduationCap,
    color: "#22C55E",
    gradient: "from-[#22C55E] to-[#4ADE80]",
  },
];

/* ─── 3D Hover Card Component ─── */
function ProcedureCard({ step, index }: { step: typeof STEPS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = step.icon;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const springOpacity = useSpring(0, { stiffness: 150, damping: 20 });

  const rotateX = useMotionTemplate`calc(-10deg * (${springY} - 0.5) * 2)`;
  const rotateY = useMotionTemplate`calc(10deg * (${springX} - 0.5) * 2)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => springOpacity.set(1);
  const handleMouseLeave = () => {
    springOpacity.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full flex flex-col bg-white border border-gray-100 shadow-[0_15px_40px_-15px_rgba(27,31,94,0.1)] group transition-shadow duration-300 hover:shadow-[0_30px_60px_-15px_rgba(27,31,94,0.2)]"
      >
        {/* Dynamic Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            opacity: springOpacity,
            background: useMotionTemplate`radial-gradient(
              400px circle at calc(${springX} * 100%) calc(${springY} * 100%), 
              rgba(255,255,255,0.4), 
              transparent 40%
            )`,
          }}
        />

        {/* ── Header Strip ── */}
        <div
          className={`bg-gradient-to-r ${step.gradient} p-6 text-white relative overflow-hidden shrink-0 transition-transform duration-300`}
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full" />

          <div className="relative z-10 flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 bg-white/20 backdrop-blur-sm shadow-inner flex items-center justify-center transform group-hover:rotate-[360deg] transition-transform duration-700"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase">
                  Step {step.id} of 4
                </p>
                <h3 className="text-lg font-sora font-bold leading-tight">
                  {step.title}
                </h3>
              </div>
            </div>
            <div className="text-4xl font-black text-white/10 hidden sm:block">
              0{step.id}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-6 flex-1 flex flex-col bg-white" style={{ transform: "translateZ(20px)" }}>
          <p className="text-sm font-semibold text-d2c-royal mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-6 top-4">
            {step.subtitle}
          </p>
          <p className="text-d2c-muted text-sm leading-relaxed mb-6 flex-1">
            {step.desc}
          </p>

          <ul className="space-y-3 relative z-10">
            {step.bullets.map((bullet, bi) => (
              <li key={bi} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 delay-100"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: step.color }} />
                </span>
                <span className="text-xs md:text-sm text-d2c-text leading-snug font-medium">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fancy Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-d2c-royal to-d2c-sky scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function AdmissionProcedure3D() {
  return (
    <section className="py-24 bg-d2c-white relative overflow-hidden" id="admission-procedure">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-d2c-royal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-d2c-sky/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-sora font-bold text-d2c-navy mb-4"
          >
            How Direct Admission Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-d2c-muted leading-relaxed"
          >
            A powerful, streamlined 4-step process designed to eliminate stress and guarantee your seat at a premium institution.
          </motion.p>
        </div>

        {/* 2x2 Grid of Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto">
          {STEPS.map((step, i) => (
            <ProcedureCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
