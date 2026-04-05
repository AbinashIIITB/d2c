"use client";

import Link from "next/link";
import { MapPin, Star, ArrowUpRight, ChevronRight } from "lucide-react";

export interface College {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  link: string;
}

export function CollegeCard({ college }: { college: College }) {
  return (
    <Link
      href={college.link}
      className="group relative block bg-white border border-gray-100 overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-400 rounded-2xl"
    >
      {/* ── IMAGE SECTION ── */}
      <div className="relative h-52 w-full overflow-hidden">
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-d2c-navy/0 group-hover:bg-d2c-navy/25 transition-colors duration-400 z-10" />

        <img
          src={college.imageUrl}
          alt={college.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Arrow icon on hover */}
        <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all duration-400 shadow-lg">
          <ArrowUpRight className="w-4 h-4 text-d2c-navy" />
        </div>

        {/* Premium badge */}
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-d2c-gold to-[#F5D061] px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-d2c-navy tracking-wider uppercase shadow-md">
          <Star className="w-3 h-3 fill-d2c-navy" />
          Premium
        </div>

        {/* Location pill */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-d2c-sky" />
          {college.location}
        </div>
      </div>

      {/* ── CONTENT SECTION — name only ── */}
      <div className="p-5">
        <h3 className="text-lg font-sora font-bold text-d2c-navy line-clamp-2 leading-snug group-hover:text-d2c-royal transition-colors duration-300">
          {college.name}
        </h3>

        {/* CTA bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm font-semibold text-d2c-royal group-hover:text-d2c-navy transition-colors">
            Explore Admissions
          </span>
          <div className="flex items-center gap-1 text-d2c-royal group-hover:translate-x-1.5 transition-transform duration-300">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-d2c-royal via-d2c-sky to-d2c-royal translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300" />
    </Link>
  );
}
