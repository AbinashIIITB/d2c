"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, PhoneCall, ShieldCheck, CheckCircle2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeLeadModalProps {
  config?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    badge?: string;
    offerText?: string;
    buttonText?: string;
    courseOptions?: string[];
    autoOpenDelaySeconds?: number;
  };
}

export function WelcomeLeadModal({ config }: WelcomeLeadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "B.Tech Computer Science & Engineering",
    location: "",
  });

  const isEnabled = Boolean(config?.enabled);
  const delaySec = config?.autoOpenDelaySeconds ?? 3;

  useEffect(() => {
    // If modal is disabled, do not open
    if (!isEnabled) {
      return;
    }

    // Check if dismissed in current session
    const dismissed = sessionStorage.getItem("d2c_welcome_modal_dismissed");
    if (dismissed === "true") {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delaySec * 1000);

    return () => clearTimeout(timer);
  }, [isEnabled, delaySec]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("d2c_welcome_modal_dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "Welcome Modal Form",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          course: formData.course,
          preferredLocation: formData.location,
        }),
      });

      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem("d2c_welcome_modal_dismissed", "true");
      }, 3000);
    } catch {
      // Fallback close on error
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isEnabled) {
    return null;
  }

  const courseList = config?.courseOptions || [
    "B.Tech Computer Science & Engineering",
    "B.Tech (Other Branches)",
    "MBBS / BDS Medical",
    "MBA / PGDM Management",
    "BCA / MCA Computer Applications",
    "BBA / Law / Pharmacy",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0B1120]/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#0B1120] text-white rounded-[1.75rem] border border-white/[0.12] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] p-6 sm:p-8 overflow-hidden z-10 my-auto"
          >
            {/* Ambient background glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#3B4CC0]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#f6c804]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-all z-20"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-12 text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center mx-auto mb-5 text-[#22c55e]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-sora font-bold text-white mb-2">
                  Request Received!
                </h3>
                <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                  Our chief admission counselor will call you shortly on{" "}
                  <span className="text-[#f6c804] font-semibold">{formData.phone}</span> with seat availability and fee guidance.
                </p>
              </div>
            ) : (
              <div className="relative z-10">
                {/* Header Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6c804]/10 border border-[#f6c804]/25 text-[#f6c804] text-[11px] font-bold tracking-wider uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{config?.badge || "SESSION 2026-27"}</span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-2xl sm:text-[1.75rem] font-sora font-bold text-white leading-tight mb-2">
                  {config?.title || "Get 1-on-1 Direct Admission Guidance"}
                </h2>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6">
                  {config?.subtitle ||
                    "Speak directly with senior academic counselors to check eligibility, fee structure, and seat availability."}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#3B4CC0] focus:ring-1 focus:ring-[#3B4CC0] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#3B4CC0] focus:ring-1 focus:ring-[#3B4CC0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#3B4CC0] focus:ring-1 focus:ring-[#3B4CC0] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                      Interested Course *
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#0f172a] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#3B4CC0] transition-colors"
                    >
                      {courseList.map((course, idx) => (
                        <option key={idx} value={course} className="bg-[#0f172a] text-white">
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {config?.offerText && (
                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-[#f6c804] text-center font-medium">
                      {config.offerText}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#f6c804] to-[#e5b703] hover:from-[#e5b703] hover:to-[#d4a802] text-[#0B1120] font-bold text-sm tracking-wide shadow-[0_8px_20px_-4px_rgba(246,200,4,0.35)] transition-all hover:scale-[1.01]"
                  >
                    {loading ? (
                      "Connecting with Counselor..."
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4 mr-2" />
                        {config?.buttonText || "Request Free Counseling Call"}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/40 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>100% Confidential • Official Direct Admission Partner</span>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
