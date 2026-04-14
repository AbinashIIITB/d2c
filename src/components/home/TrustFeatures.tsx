"use client"

import { ShieldCheck, GraduationCap, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"

const trustItems = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-d2c-navy" />,
    title: "India's Trusted Partner",
    desc: "Bridging the gap between students and premium campuses since 2012.",
    color: "bg-d2c-ice/50",
    iconBg: "bg-d2c-ice",
    delay: 0.1
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-d2c-royal" />,
    title: "100% Admission Support",
    desc: "Dedicated 1-on-1 counseling from shortlisting to final enrollment.",
    color: "bg-blue-50/50",
    iconBg: "bg-blue-50",
    delay: 0.2
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-d2c-success" />,
    title: "Verified Institutions",
    desc: "Authorized partner for 150+ premium engineering & medical colleges.",
    color: "bg-emerald-50/50",
    iconBg: "bg-emerald-50",
    delay: 0.3
  }
]

export function TrustFeatures() {
  return (
    <section className="py-12 md:py-16 bg-white relative">
      <div className="content-boundary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {trustItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex flex-col p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Glassmorphic Background */}
              <div className={`absolute inset-0 ${item.color} backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10`} />
              
              <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              
              <h3 className="text-xl font-sora font-extrabold text-d2c-navy mb-3 group-hover:text-d2c-royal transition-colors">
                {item.title}
              </h3>
              
              <p className="text-d2c-muted text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                {item.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
