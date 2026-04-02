"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { PhoneCall, MessageCircle } from "lucide-react"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-d2c-navy overflow-hidden">
        {/* Animated floral pattern overlay */}
        <AnimatedPatternBg opacity={0.12} speed={170} />

        {/* Large accent glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-d2c-royal/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-d2c-sky/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative bg-d2c-navy/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-16 max-w-6xl mx-auto shadow-2xl flex flex-col md:flex-row items-center gap-12 overflow-hidden">

          {/* Card inner glowing elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-d2c-sky/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-d2c-gold/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex-1 text-center md:text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex px-4 py-1.5 bg-d2c-gold/20 text-[#F5D061] font-bold text-xs mb-6 rounded-full border border-d2c-gold/30 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,168,67,0.3)]"
            >
              Slots filling fast
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-sora font-extrabold text-white mb-6 leading-tight"
            >
              Ready to Secure <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky via-white to-d2c-sky">Your Future?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-d2c-ice/80 leading-relaxed max-w-xl mx-auto md:mx-0 mb-10"
            >
              Connect with our veteran counsellors today. Get a free, data-backed profile evaluation and find out which premium colleges perfectly perfectly match your academic ambitions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6"
            >
              <Link
                href="https://wa.me/919876543210" // Replace with real WhatsApp
                target="_blank"
                className="w-full sm:w-auto px-8 py-4 bg-d2c-success text-white font-bold text-lg hover:bg-[#1DA84B] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:-translate-y-1 rounded-sm"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                WhatsApp Now
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/20 font-bold text-lg hover:bg-white hover:text-d2c-navy transition-all duration-300 flex items-center justify-center gap-3 group rounded-sm hover:-translate-y-1"
              >
                <PhoneCall className="w-5 h-5 group-hover:text-d2c-royal transition-colors" />
                Request Callback
              </Link>
            </motion.div>
          </div>

          {/* Decorative illustration or image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ perspective: 1000 }}
            className="flex-1 w-full max-w-md relative hidden lg:block z-10"
          >
            <div className="relative aspect-square rounded-full bg-gradient-to-tr from-d2c-royal to-d2c-sky p-2 shadow-[0_0_80px_rgba(59,76,192,0.4)]">
              {/* Spinning border effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[3px] border-dashed border-white/30"
              />

              <div className="w-full h-full rounded-full bg-d2c-navy overflow-hidden relative border-4 border-d2c-navy shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop"
                  alt="Student Success"
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700 hover:scale-110"
                />
              </div>
            </div>

            {/* Popups over image */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -left-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-d2c-success/20 flex items-center justify-center text-d2c-success">
                  <span className="text-xl font-black tracking-tighter">✓</span>
                </div>
                <div className="pr-4">
                  <div className="text-sm font-bold text-d2c-navy">100% Verified</div>
                  <div className="text-xs text-d2c-muted font-medium">Direct Admissions</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-10 -right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-d2c-gold/20 flex items-center justify-center text-[#D4A843]">
                  <span className="text-lg font-black tracking-tighter">★</span>
                </div>
                <div className="pr-2">
                  <div className="text-sm font-bold text-d2c-navy">Premium</div>
                  <div className="text-xs text-d2c-muted font-medium">Institutions</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
