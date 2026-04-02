"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Star, ArrowUpRight, ChevronRight } from "lucide-react";
import React, { useRef } from "react";

export interface College {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  link: string;
}

export function CollegeCard({ college }: { college: College }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Mouse tracking for interactive 3D tilt & glare
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values to eliminate jitter
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const springOpacity = useSpring(0, { stiffness: 150, damping: 20 });

  // Map mouse coordinates to 3D rotation angles (-7.5 to 7.5 degrees)
  const rotateX = useMotionTemplate`calc(-7.5deg * (var(--mouse-y) - 0.5) * 2)`;
  const rotateY = useMotionTemplate`calc(7.5deg * (var(--mouse-x) - 0.5) * 2)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculate relative mouse position (0 to 1)
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    mouseX.set(xPct);
    mouseY.set(yPct);

    // Provide raw CSS variables for the rotation template if needed
    ref.current.style.setProperty("--mouse-x", xPct.toString());
    ref.current.style.setProperty("--mouse-y", yPct.toString());
  };

  const handleMouseEnter = () => {
    springOpacity.set(1);
    if (ref.current) {
      ref.current.style.transition = "none";
    }
  };

  const handleMouseLeave = () => {
    springOpacity.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
    if (ref.current) {
      ref.current.style.setProperty("--mouse-x", "0.5");
      ref.current.style.setProperty("--mouse-y", "0.5");
      // Add a slight transition so it smoothly snaps back to 0
      ref.current.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    }
  };

  return (
    <motion.div
      style={{ perspective: 1200 }}
      className="group h-full"
    >
      <motion.a
        href={college.link}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springOpacity.get() ? rotateX : 0,
          rotateY: springOpacity.get() ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative block bg-white border border-gray-100 overflow-hidden h-full shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Dynamic glare effect riding the mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            opacity: springOpacity,
            background: useMotionTemplate`radial-gradient(
              600px circle at calc(${springX} * 100%) calc(${springY} * 100%), 
              rgba(255,255,255,0.4), 
              transparent 40%
            )`,
          }}
        />

        {/* ── IMAGE SECTION ── */}
        <div className="relative h-56 w-full overflow-hidden" style={{ transform: "translateZ(30px)" }}>
          {/* Overlay to darken image on hover */}
          <div className="absolute inset-0 bg-d2c-navy/0 group-hover:bg-d2c-navy/30 transition-colors duration-500 z-10" />

          <img
            src={college.imageUrl}
            alt={college.name}
            className="object-cover w-full h-full group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            loading="lazy"
          />

          {/* Floating arrow pop-out */}
          <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl border border-white/50">
            <ArrowUpRight className="w-5 h-5 text-d2c-navy" />
          </div>

          {/* Glowing Premium badge */}
          <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-d2c-gold to-[#F5D061] px-3 py-1 flex items-center gap-1.5 text-xs font-bold text-d2c-navy tracking-wider uppercase shadow-[0_0_20px_rgba(212,168,67,0.6)] group-hover:shadow-[0_0_30px_rgba(212,168,67,1)] transition-shadow duration-300">
            <Star className="w-3.5 h-3.5 fill-d2c-navy" />
            Premium
          </div>

          {/* Bottom gradient fade for text overlap */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 to-transparent z-10" />

          {/* Location pill */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-d2c-sky" />
            {college.location}
          </div>
        </div>

        {/* ── CONTENT SECTION ── */}
        <div
          className="relative p-6 bg-white overflow-hidden"
          style={{ transform: "translateZ(40px)" }} // Pops the content forward in 3D
        >
          {/* Subtle colorful background slice on hover */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-d2c-sky/10 rounded-full blur-3xl group-hover:bg-d2c-sky/20 transition-colors duration-500" />

          <h3 className="relative z-10 text-xl font-sora font-bold text-d2c-navy mb-3 line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-d2c-royal group-hover:to-d2c-sky transition-all duration-300">
            {college.name}
          </h3>

          <p className="relative z-10 text-d2c-muted text-sm line-clamp-2 mb-6 leading-relaxed">
            {college.description}
          </p>

          {/* CTA bar */}
          <div className="relative z-10 flex items-center justify-between pt-5 border-t border-gray-100">
            <span className="text-sm font-semibold text-d2c-royal group-hover:text-d2c-navy transition-colors">
              Explore Admissions
            </span>
            <div className="flex items-center gap-1 text-d2c-royal group-hover:translate-x-2 transition-transform duration-300">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Bottom animated accent border */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-d2c-royal via-d2c-sky to-d2c-royal translate-y-1 group-hover:translate-y-0 transition-transform duration-300" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-d2c-gold to-[#F5D061] -translate-y-1 group-hover:translate-y-0 transition-transform duration-300 delay-100" />
      </motion.a>
    </motion.div>
  );
}
