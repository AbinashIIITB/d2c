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
    <section className="py-16 md:py-24 relative overflow-hidden bg-neutral-50" ref={ref}>
      {/* Light subtle patterned background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Light colorful glow accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

      <div className="content-boundary relative z-10">
        <div className="relative bg-white border border-neutral-200 rounded-3xl p-8 md:p-16 w-full max-w-4xl mx-auto shadow-xl flex flex-col items-center text-center overflow-hidden">

          <div className="flex-1 text-center relative z-10 w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex px-4 py-1.5 bg-amber-100 text-amber-700 font-bold text-xs mb-6 rounded-full border border-amber-200 uppercase tracking-[0.2em]"
            >
              Slots filling fast
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-5xl font-sora font-extrabold text-d2c-navy mb-6 leading-tight"
            >
              Ready to Secure <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-royal to-blue-500">Your Future?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-xl mx-auto mb-10"
            >
              Connect with our veteran counsellors today. Get a free, data-backed profile evaluation and find out which premium colleges perfectly match your academic ambitions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
            >
              <Link
                href="https://wa.me/919876543210" // Replace with real WhatsApp
                target="_blank"
                className="w-full sm:w-auto px-8 py-4 bg-d2c-success text-white font-bold text-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-sm"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                WhatsApp Now
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white text-d2c-navy border-2 border-neutral-200 font-bold text-lg hover:border-d2c-royal hover:text-d2c-royal hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 group rounded-sm hover:-translate-y-1 shadow-sm"
              >
                <PhoneCall className="w-5 h-5 group-hover:text-d2c-royal transition-colors" />
                Request Callback
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
