"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

interface AnnouncementProps {
  announcement?: {
    enabled?: boolean;
    badge?: string;
    message?: string;
    link?: string;
    linkText?: string;
  };
}

export function AnnouncementTicker({ announcement }: AnnouncementProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!announcement?.enabled || dismissed) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-[#0B1120] via-[#1a2342] to-[#0B1120] border-b border-white/[0.08] text-white text-xs py-2.5 px-4 z-40 transition-all">
      <div className="content-boundary flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center truncate">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f6c804]/15 border border-[#f6c804]/30 text-[#f6c804] text-[10px] font-bold tracking-wider uppercase shrink-0">
            <Sparkles className="w-3 h-3" />
            {announcement.badge || "NEW"}
          </span>
          <span className="text-white/90 text-xs sm:text-sm font-medium truncate">
            {announcement.message}
          </span>
          {announcement.link && (
            <Link
              href={announcement.link}
              className="inline-flex items-center gap-1 text-[#f6c804] hover:text-white font-semibold underline underline-offset-4 shrink-0 transition-colors"
            >
              <span>{announcement.linkText || "Learn More"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/40 hover:text-white p-1 rounded-md transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
