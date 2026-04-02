"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { PlayCircle, Video } from "lucide-react"

const VIDEOS = [
  {
    id: "dQw4w9WgXcQ", // Replace with real D2C video IDs
    title: "How to get Direct Admission in Top Engineering Colleges?",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "MBA Admissions 2026 Strategy Guide",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Medical Admissions without NEET Score?",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=600&auto=format&fit=crop"
  }
]

export function YouTubeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-d2c-ice/30 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-d2c-ice pb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 font-semibold text-sm mb-6 uppercase tracking-wider"
            >
              <Video className="w-4 h-4" /> Watch & Learn
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-sora font-bold text-d2c-navy mb-4"
            >
              Counselling Masterclasses
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-d2c-muted text-lg"
            >
              Free resources, college reviews, and admission roadmaps from our expert panel.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="https://youtube.com/" // Replace with real channel URL
              target="_blank"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
            >
              Subscribe Now
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEOS.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-xl hover:shadow-2xl hover:shadow-d2c-royal/20 transition-all duration-300"
            >
              <Link href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank">
                <div className="aspect-video w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                      <PlayCircle className="w-8 h-8 text-white fill-white/80 group-hover:fill-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-sora font-semibold text-d2c-navy line-clamp-2 leading-snug group-hover:text-d2c-royal transition-colors">
                    {video.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
