"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CmsIcon } from "@/components/cms/CmsIcon";
import { homeDefaults, type HomeContent } from "@/content/home.defaults";
import {
  MessageCircle,
  Search,
  FileText,
  GraduationCap,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

/* ─── step data (content comes from the CMS; see src/content/home.defaults.ts) ─── */
const KNOWN_ICONS = {
  "message-circle": MessageCircle,
  search: Search,
  "file-text": FileText,
  "graduation-cap": GraduationCap,
};

const STEP_TONES: Record<string, { bg: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  sky: { bg: "bg-sky-50", border: "border-sky-200", badge: "bg-sky-100 text-sky-700" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
  green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100 text-green-700" },
};

type StepContent = HomeContent["procedure"]["steps"][number];
type Step = StepContent & { id: number; bg: string; border: string; badge: string };

/* ─── Animated Arrow Connector ─── */
function ArrowConnector({ color, nextColor }: { color: string; nextColor: string }) {
  return (
    <div className="flex flex-col items-center py-4 lg:py-6">
      {/* Gradient line */}
      <motion.div
        className="w-0.5 h-10 lg:h-14 rounded-full"
        style={{
          background: `linear-gradient(to bottom, ${color}, ${nextColor})`,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Bouncing arrow */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="w-6 h-6 lg:w-7 lg:h-7"
            style={{ color: nextColor }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Step Card (unified for mobile + desktop) ─── */
function StepCard({
  step,
  index,
  stepLabel,
}: {
  step: Step;
  index: number;
  stepLabel: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* ── MOBILE card ── */}
      <div className="lg:hidden">
        <div className={`rounded-2xl ${step.bg} border ${step.border} p-5`}>
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
                {stepLabel} {step.id}
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
              <CmsIcon name={step.icon} known={KNOWN_ICONS} className="w-4 h-4" style={{ color: step.color }} />
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

      {/* ── DESKTOP card — alternating image left/right ── */}
      <div className={`hidden lg:flex items-center gap-14 w-full ${isEven ? "flex-row" : "flex-row-reverse"}`}>
        {/* Image side */}
        <motion.div
          className={`flex-1 max-w-lg`}
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className={`relative rounded-3xl ${step.bg} border ${step.border} p-8 shadow-lg overflow-hidden`}>
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-contain"
                sizes="400px"
              />
            </div>
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          className={`flex-1 max-w-lg ${isEven ? "pl-8" : "pr-8"}`}
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span
            className={`inline-flex text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4 ${step.badge}`}
          >
            {stepLabel} {step.id} — {step.subtitle}
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
              <CmsIcon name={step.icon} known={KNOWN_ICONS} className="w-5 h-5" style={{ color: step.color }} />
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
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function AdmissionProcedure3D({ content = homeDefaults.procedure }: { content?: HomeContent["procedure"] } = {}) {
  const steps: Step[] = (content.steps ?? []).map((st, i) => ({
    ...st,
    id: i + 1,
    ...(STEP_TONES[st.tone] ?? STEP_TONES.blue),
  }));
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      className="relative bg-neutral-50 py-16 lg:py-24"
      id="admission-procedure"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      <div className="content-boundary relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex px-4 py-1.5 bg-blue-100 text-blue-700 font-bold text-xs mb-4 rounded-full border border-blue-200 uppercase tracking-[0.2em]"
          >
            {content.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-sora font-bold text-d2c-navy mb-3"
          >
            {content.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base lg:text-lg text-neutral-500 leading-relaxed max-w-sm lg:max-w-2xl mx-auto"
          >
            {content.subheading}
          </motion.p>
        </div>

        {/* Steps with arrow connectors */}
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.id} className="w-full">
              <StepCard step={step} index={i} stepLabel={content.stepLabel} />
              {i < steps.length - 1 && (
                <ArrowConnector
                  color={step.color}
                  nextColor={steps[i + 1].color}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
