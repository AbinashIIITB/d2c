"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { MapPin, ChevronRight, Star, ArrowUpRight } from "lucide-react"
import collegesData from "@/data/colleges.json"
import { CollegeCard } from "@/components/ui/CollegeCard"

export function FeaturedColleges() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredColleges = collegesData.slice(0, 6)

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-sora font-bold text-d2c-navy mb-4"
            >
              Top Partner Colleges
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-d2c-muted text-lg"
            >
              Explore premium institutions where we have a track record of securing guaranteed direct admissions.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/colleges"
              className="group inline-flex items-center gap-2 text-d2c-royal font-semibold hover:text-d2c-navy transition-colors whitespace-nowrap"
            >
              View All Colleges
              <span className="p-1 bg-d2c-ice group-hover:bg-d2c-royal/10 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredColleges.map((college, idx) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="h-full"
            >
              <CollegeCard college={college} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
