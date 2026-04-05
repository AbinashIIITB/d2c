"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export function MidPageContact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const [formData, setFormData] = useState({ name: "", phone: "", course: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setTimeout(() => {
      setStatus("success")
      setFormData({ name: "", phone: "", course: "" })
      setTimeout(() => setStatus("idle"), 5000)
    }, 1500)
  }

  return (
    <section className="py-16 md:py-24 bg-d2c-ice relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-d2c-sky/5 rounded-full blur-3xl" />
      </div>

      <div className="content-boundary relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-d2c-royal" />
              <span className="text-d2c-royal font-semibold text-sm tracking-widest uppercase">
                Get in Touch
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-sora font-bold text-d2c-navy mb-6 leading-[1.15]">
              Start Your Admission{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-royal to-d2c-sky">
                Journey Today
              </span>
            </h2>

            <p className="text-d2c-muted text-lg leading-relaxed mb-8 max-w-lg">
              Fill out this quick form and our expert counsellors will get back to you within 2 hours with a
              personalised admission roadmap for your dream college.
            </p>

            {/* Quick contact options */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://wa.me/919876543210"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-3 bg-d2c-success text-white font-semibold text-sm rounded-xl hover:bg-d2c-success/90 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Us
              </Link>
              <Link
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-d2c-navy font-semibold text-sm rounded-xl border border-gray-200 hover:border-d2c-royal/30 hover:bg-d2c-ice transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Link>
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-d2c-navy/5 border border-gray-100">
              <h3 className="text-xl font-sora font-bold text-d2c-navy mb-6">
                Get Free Counselling
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all text-d2c-text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all text-d2c-text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">
                    Target Course
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white text-d2c-text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  >
                    <option value="">Select Course</option>
                    <option value="BTech">B.Tech / B.E.</option>
                    <option value="MBA">MBA / PGDM</option>
                    <option value="Medical">MBBS / BDS</option>
                    <option value="Law">Law (LLB / LLM)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-base ${
                    status === "success"
                      ? "bg-d2c-success text-white"
                      : "bg-d2c-navy hover:bg-d2c-royal text-white shadow-lg focus:ring-4 focus:ring-d2c-royal/30"
                  }`}
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : status === "success" ? (
                    "✓ We'll call you shortly!"
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Get Free Consultation
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
