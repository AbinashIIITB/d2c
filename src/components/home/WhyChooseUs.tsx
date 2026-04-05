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
    <section className="py-16 md:py-24 bg-d2c-white relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-d2c-ice/50 rounded-full blur-3xl opacity-60 mix-blend-overlay" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-d2c-sky/5 rounded-full blur-2xl" />
      </div>

      <div className="content-boundary relative z-10">
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
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative bg-white h-full rounded-2xl"
            >
              <div className="p-8 border border-gray-100 shadow-lg shadow-d2c-navy/5 transition-all duration-300 h-full overflow-hidden relative rounded-2xl">
                {/* Left accent border on hover */}
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-d2c-navy to-d2c-royal transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                <div className="w-16 h-16 rounded-xl bg-d2c-ice flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-md relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: feature.delay }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-sora font-bold text-d2c-navy mb-4 pr-4 group-hover:text-d2c-royal transition-colors duration-300">
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
