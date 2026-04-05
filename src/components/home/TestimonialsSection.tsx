"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Quote, Star, ChevronDown, GraduationCap } from "lucide-react"
import testimonialsData from "@/data/testimonials.json"

// Group testimonials into "featured" (expanded card with stats) and "list" items
const FEATURED = testimonialsData[0] // First testimonial gets the hero card
const LIST_ITEMS = testimonialsData.slice(1)

// Fake stat data tied to the featured testimonial
const FEATURED_STATS = [
  { label: "Branch Secured", value: "CSE" },
  { label: "Admission Year", value: "2025" },
  { label: "Counselling Sessions", value: "3" },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-d2c-ice relative overflow-hidden" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-white/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-d2c-sky/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="content-boundary relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-d2c-royal" />
            <span className="text-d2c-royal font-semibold text-sm tracking-widest uppercase">
              Success Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-d2c-navy leading-[1.1] mb-6"
          >
            Students trust Direct2Campus for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-royal to-d2c-sky">
              life-changing results.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg text-d2c-muted leading-relaxed max-w-xl"
          >
            From first consultation to campus day — hear directly from the students and parents who made it happen.
          </motion.p>
        </div>

        {/* ── FEATURED TESTIMONIAL CARD — Stripe "Hero Story" style ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
            {/* Top bar with avatar, name, and a "Read story" link */}
            <div className="flex items-center justify-between px-6 py-5 md:px-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-d2c-ice border-2 border-d2c-royal/20 shrink-0">
                  <img
                    src={FEATURED.avatarUrl}
                    alt={FEATURED.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(FEATURED.name)}&background=3B4CC0&color=fff`
                    }}
                  />
                </div>
                <p className="text-lg md:text-xl font-semibold text-d2c-navy">
                  {FEATURED.name} secured admission through Direct2Campus.
                </p>
              </div>
              <span className="hidden md:inline-flex items-center gap-1 text-d2c-royal text-sm font-semibold hover:underline cursor-pointer shrink-0">
                Read the story
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>

            {/* Hero image area */}
            <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden bg-gradient-to-br from-d2c-navy via-d2c-royal to-d2c-sky">
              {/* Overlay content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <Quote className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white text-xl md:text-2xl lg:text-3xl font-sora font-bold max-w-3xl leading-snug">
                    &ldquo;{FEATURED.message.replace("Akash Talks", "Direct2Campus")}&rdquo;
                  </p>
                  <div className="flex gap-1 justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-d2c-gold text-d2c-gold" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-white/5 rounded-2xl rotate-12 backdrop-blur-sm" />
              <div className="absolute bottom-12 left-12 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm" />
            </div>

            {/* Stats row — Stripe-style key metrics */}
            <div className="px-6 md:px-8 py-5 flex flex-wrap gap-x-12 gap-y-3 border-t border-gray-100">
              {FEATURED_STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-d2c-navy">{stat.value}</span>
                  <span className="text-sm text-d2c-muted">{stat.label}</span>
                </div>
              ))}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-d2c-navy">{FEATURED.role}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── ACCORDION LIST — Stripe-style expandable rows ── */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white divide-y divide-gray-100">
          {LIST_ITEMS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === testimonial.id ? null : testimonial.id)
                }
                className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left hover:bg-gray-50/50 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-d2c-ice border border-d2c-royal/10 shrink-0">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3B4CC0&color=fff`
                      }}
                    />
                  </div>
                  <span className="text-base md:text-lg font-semibold text-d2c-navy group-hover:text-d2c-royal transition-colors">
                    {testimonial.name} — {testimonial.role}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: expandedId === testimonial.id ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-d2c-royal/30 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400 group-hover:text-d2c-royal transition-colors">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedId === testimonial.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 pt-0">
                      {/* Expanded content area */}
                      <div className="bg-d2c-ice/30 rounded-xl p-6 md:p-8">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-d2c-gold text-d2c-gold" />
                          ))}
                        </div>
                        <p className="text-d2c-navy text-lg leading-relaxed italic mb-6">
                          &ldquo;{testimonial.message.replace("Akash Talks", "Direct2Campus")}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-d2c-ice border-2 border-d2c-royal/20">
                            <img
                              src={testimonial.avatarUrl}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3B4CC0&color=fff`
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-sora font-bold text-d2c-navy">{testimonial.name}</h4>
                            <p className="text-d2c-muted text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
