"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall, Zap, MessageCircle } from "lucide-react";
import { CollegeEnquiryForm } from "./CollegeEnquiryForm";

export function CollegeAdmissionModal({ isOpen, onClose, collegeName }: { isOpen: boolean, onClose: () => void, collegeName: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 py-8 pointer-events-auto h-[100vh] overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1120]/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#0B1120] rounded-[1.25rem] w-full max-w-md relative z-10 shadow-[0_24px_48px_-12px_rgba(11,17,32,0.8)] border border-white/10"
          >
            {/* We add inner overflow-hidden to clip the background patterns cleanly without breaking external shadows */}
            <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(246,200,4,0.06),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,76,192,0.1),transparent_50%)]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f6c804]/30 to-transparent" />
            </div>
            
            <div className="p-6 relative z-10 max-h-[90vh] overflow-y-auto min-h-0 custom-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-20 bg-white/5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#22c55e]/10 text-[#22c55e] rounded-lg text-[10px] font-bold tracking-[0.1em] uppercase border border-[#22c55e]/20 mb-3">
                <Zap className="w-3 h-3" /> Admission Open
              </span>
              <h3 className="text-xl font-sora font-bold text-white mb-1.5 pr-8">Apply for {collegeName}</h3>
              <p className="text-white/40 text-[11px] sm:text-xs mb-6 leading-relaxed hidden sm:block">
                Enter your details. Our admission counselor will reach out within 24 hours to help you secure a seat.
              </p>
              
              <CollegeEnquiryForm collegeName={collegeName} />
              
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-white/[0.06]"></div>
                <span className="flex-shrink-0 mx-4 text-white/40 text-xs tracking-wider uppercase font-bold">OR</span>
                <div className="flex-grow border-t border-white/[0.06]"></div>
              </div>

              <div className="flex gap-3 w-full">
                <a
                  href="tel:+916200325137"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] border border-white/[0.06] rounded-xl transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#f6c804]" />
                  Call Us
                </a>
                <a
                  href="https://wa.me/916200325137"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25D366]/10 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
