"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PhoneCall, MessageCircle, Sparkles, ArrowUpRight } from "lucide-react";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-d2c-sky/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-d2c-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="mx-auto max-w-[80%] relative z-10">
        <div className="relative group overflow-hidden rounded-[3rem] bg-d2c-navy p-10 md:p-20 shadow-[0_32px_64px_-16px_rgba(2,6,23,0.4)] border border-white/5">
          
          {/* ── 3D GRAPHIC BACKGROUND ── */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
            <img 
              src="/images/cta-3d-graphic.png" 
              alt="Background mesh" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-1000"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-d2c-sky/10 border border-d2c-sky/20 rounded-full text-d2c-sky text-xs font-bold mb-8 backdrop-blur-sm uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4" />
              Your Premium Path
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-sora font-extrabold text-white mb-8 leading-tight"
            >
              Ready to Secure Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-gold via-[#FBD46D] to-d2c-gold">Future?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-xl font-inter"
            >
              Connect with our veteran counsellors today. Get a free, data-backed profile evaluation and find out which premium colleges perfectly match your academic ambitions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link
                href="https://wa.me/916200325137"
                target="_blank"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(37,211,102,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(37,211,102,0.5)] transform hover:-translate-y-1"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                WhatsApp Now
                <ArrowUpRight className="w-5 h-5" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              >
                <PhoneCall className="w-5 h-5" />
                Request Callback
              </Link>
            </motion.div>
          </div>

          {/* Additional Decorative Glows */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-d2c-sky/10 rounded-full blur-[100px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-d2c-gold/5 rounded-full blur-[120px]" />
        </div>
      </div>
    </section>
  );
}
