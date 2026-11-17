"use client"

import { ShieldCheck, GraduationCap, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"
import { CmsIcon } from "@/components/cms/CmsIcon"
import { homeDefaults, type HomeContent } from "@/content/home.defaults"

const KNOWN_ICONS = { "shield-check": ShieldCheck, "graduation-cap": GraduationCap, "badge-check": BadgeCheck }

const TONES: Record<string, { color: string; iconBg: string; iconText: string }> = {
  navy: { color: "bg-d2c-ice/50", iconBg: "bg-d2c-ice", iconText: "text-d2c-navy" },
  royal: { color: "bg-blue-50/50", iconBg: "bg-blue-50", iconText: "text-d2c-royal" },
  success: { color: "bg-emerald-50/50", iconBg: "bg-emerald-50", iconText: "text-d2c-success" },
}

export function TrustFeatures({ content = homeDefaults.trust }: { content?: HomeContent["trust"] } = {}) {
  return (
    <section className="pt-10 pb-4 md:pt-16 md:pb-6 bg-d2c-white relative">
      <div className="content-boundary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {content.items.map((item, idx) => {
            const tone = TONES[item.tone] ?? TONES.navy
            const icon = <CmsIcon name={item.icon} known={KNOWN_ICONS} className={`w-8 h-8 ${tone.iconText}`} />
            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex flex-col p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Glassmorphic Background */}
              <div className={`absolute inset-0 ${tone.color} backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10`} />
              
              <div className={`w-16 h-16 rounded-2xl ${tone.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>
              
              <h3 className="text-xl font-sora font-extrabold text-d2c-navy mb-3 group-hover:text-d2c-royal transition-colors">
                {item.title}
              </h3>
              
              <p className="text-d2c-muted text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                {icon}
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
