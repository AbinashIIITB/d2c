"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowUpRight, Star, ChevronRight } from "lucide-react";

import { College } from "@/lib/data";

export function CollegeCard({ college }: { college: College }) {
  const [isOpening, setIsOpening] = useState(false);

  return (
    <Link
      href={`/colleges/${college.slug}`}
      prefetch={true}
      onClick={() => setIsOpening(true)}
      className="group relative flex flex-col bg-white border border-slate-100 overflow-hidden h-full shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl transform hover:-translate-y-2 card-ring"
    >
      {/* ── IMAGE SECTION ── */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
        {/* Interaction Overlay */}
        <div className="absolute inset-0 bg-d2c-navy/0 group-hover:bg-d2c-navy/10 transition-colors duration-500 z-10" />

        <img
          src={college.imageUrl}
          alt={college.name}
          className="object-cover w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Premium Badge */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-d2c-navy tracking-widest uppercase shadow-sm border border-slate-100">
          <Star className="w-3 h-3 fill-d2c-gold text-d2c-gold" />
          Premium
        </div>

        {/* Location Pill */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium transition-transform duration-500 group-hover:translate-x-1">
          <MapPin className="w-3.5 h-3.5 text-d2c-sky" />
          {college.location}
        </div>

        {/* Arrow Up Right Button */}
        <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          <ArrowUpRight className="w-5 h-5 text-d2c-navy" />
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="flex flex-col p-6 flex-grow">
        <h3 className="text-xl font-sora font-bold text-d2c-navy mb-3 line-clamp-2 leading-tight group-hover:text-d2c-royal transition-colors duration-300">
          {college.name}
        </h3>

        {/* Action Button Area */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-sm font-bold text-d2c-royal font-inter flex items-center gap-2">
            {isOpening ? "Opening campus..." : "Explore Admission"}
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-d2c-royal group-hover:text-white transition-colors duration-300">
            {isOpening ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 50 50"
                className="animate-circle-rotate text-d2c-royal group-hover:text-white"
              >
                <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                <circle
                  cx="25"
                  cy="25"
                  r="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-circle-dash"
                />
              </svg>
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* ── STITCH INTERACTION: GOLD STRIPE ── */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-d2c-gold via-[#F5D061] to-d2c-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* ── ACTIVE OPENING SMOOTH ANIMATION OVERLAY ── */}
      {isOpening && (
        <div className="absolute inset-0 bg-d2c-navy/20 backdrop-blur-[2px] z-30 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-white/80 animate-in fade-in zoom-in-95 duration-200">
            <svg
              width="18"
              height="18"
              viewBox="0 0 50 50"
              className="animate-circle-rotate text-d2c-royal shrink-0"
            >
              <defs>
                <linearGradient id="card-spin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B4CC0" />
                  <stop offset="100%" stopColor="#5B9BD5" />
                </linearGradient>
              </defs>
              <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(59,76,192,0.15)" strokeWidth="4" />
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="url(#card-spin-grad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                className="animate-circle-dash"
              />
            </svg>
            <span className="text-xs font-bold text-d2c-navy">Opening {college.name.split(' ')[0]}...</span>
          </div>
        </div>
      )}
    </Link>
  );
}
