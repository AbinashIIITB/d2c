"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Target, HeadphonesIcon, Briefcase } from "lucide-react"

const features = [
  {
    icon: <Target className="w-8 h-8 text-d2c-navy" />,
    title: "100% Guaranteed Admissions",
    desc: "We don't deal in probabilities. Once we commit, your college seat is guaranteed without any hidden hurdles.",
    delay: 0.1
  },
  {
    icon: <Award className="w-8 h-8 text-d2c-gold" />,
    title: "No Hidden Capitation Fees",
    desc: "Transparent processing. We ensure you only pay the legitimate college fees with complete financial accountability.",
    delay: 0.2
  },
  {
    icon: <Briefcase className="w-8 h-8 text-d2c-royal" />,
    title: "Direct College Tie-ups",
    desc: "We represent over 50+ premier institutions across India officially, ensuring a smooth and legitimate admission process.",
    delay: 0.3
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-d2c-success" />,
    title: "Dedicated Counsellor",
    desc: "From shortlisting to document verification and paying fees, get 1-on-1 support for your entire journey.",
    delay: 0.4
  }
]

export function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-d2c-ice/50 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-d2c-white rounded-full blur-3xl opacity-60 mix-blend-overlay" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-d2c-sky/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-sora font-bold text-d2c-navy mb-6"
          >
            Why Thousands of Students Trust Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-d2c-muted leading-relaxed"
          >
            We eliminate the stress and uncertainty of the admission process.
            Experience a premium, end-to-end counselling service designed for your success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -8, scale: 1.02, rotateY: 3, rotateX: 3 }}
              style={{ perspective: 1000 }}
              className="group relative bg-white h-full"
            >
              <div className="p-8 border border-gray-100 shadow-xl shadow-d2c-navy/5 transition-all duration-500 h-full overflow-hidden relative" style={{ transformStyle: "preserve-3d" }}>
                {/* Colorful Glowing Background Gradient on Hover */}
                {idx === 0 && <div className="absolute -top-10 -right-10 w-40 h-40 bg-d2c-navy/10 rounded-full blur-3xl group-hover:bg-d2c-navy/20 transition-colors duration-500" />}
                {idx === 1 && <div className="absolute -top-10 -right-10 w-40 h-40 bg-d2c-gold/20 rounded-full blur-3xl group-hover:bg-d2c-gold/40 transition-colors duration-500" />}
                {idx === 2 && <div className="absolute -top-10 -right-10 w-40 h-40 bg-d2c-royal/20 rounded-full blur-3xl group-hover:bg-d2c-royal/40 transition-colors duration-500" />}
                {idx === 3 && <div className="absolute -top-10 -right-10 w-40 h-40 bg-d2c-success/20 rounded-full blur-3xl group-hover:bg-d2c-success/40 transition-colors duration-500" />}

                {/* Bottom interactive accent line */}
                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-d2c-navy to-d2c-royal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div
                  className="w-16 h-16 rounded-xl bg-d2c-ice flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-300 relative z-10"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: feature.delay }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
                  <h3 className="text-xl font-sora font-bold text-d2c-navy mb-4 pr-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-d2c-navy group-hover:to-d2c-royal transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-d2c-muted text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
