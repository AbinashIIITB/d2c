"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, GraduationCap, ChevronRight, ArrowUpRight, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AutoSuggestSearch } from "@/components/ui/AutoSuggestSearch"

type Exam = {
  id: number
  title: string
  description: string
  logoUrl: string
  link: string
}

const ACCENT_COLORS = [
  { from: "from-blue-600", to: "to-indigo-700", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
  { from: "from-emerald-600", to: "to-teal-700", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" },
  { from: "from-amber-500", to: "to-orange-600", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
  { from: "from-violet-600", to: "to-purple-700", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-100" },
  { from: "from-rose-500", to: "to-pink-600", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100" },
  { from: "from-cyan-500", to: "to-blue-600", bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-100" },
]

export function ExamsList({ initialExams }: { initialExams: Exam[] }) {
  const [search, setSearch] = useState("")

  const filteredExams = initialExams.filter(exam => 
    exam.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="max-w-xl mx-auto mb-16 relative z-40">
        <AutoSuggestSearch 
          mode="exams"
          placeholder="Search for an exam..."
          onSearchChange={setSearch}
        />
      </div>

      {filteredExams.length === 0 ? (
        <div className="text-center py-16 text-d2c-muted">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-sora font-semibold mb-2">No exams found</h3>
          <p>We&apos;re constantly adding new guides.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredExams.map((exam, idx) => {
              const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length]
              return (
                <motion.div
                  key={exam.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    href={exam.link}
                    className="group relative block bg-white border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(27,31,94,0.12)] hover:-translate-y-1 h-full"
                  >
                    {/* Top accent gradient bar */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${accent.from} ${accent.to}`} />
                    
                    <div className="p-7">
                      {/* Logo + Title header */}
                      <div className="flex items-start gap-5 mb-5">
                        <div className={`w-16 h-16 ${accent.bg} ${accent.border} border p-2.5 flex items-center justify-center shrink-0 group-hover:shadow-md transition-shadow duration-300`}>
                          <img 
                            src={exam.logoUrl} 
                            alt={`${exam.title} Logo`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-xl font-sora font-bold text-d2c-navy group-hover:${accent.text} transition-colors duration-300 mb-1`}>
                            {exam.title}
                          </h3>
                          <div className={`inline-flex items-center gap-1 text-xs font-semibold ${accent.text} ${accent.bg} px-2 py-0.5`}>
                            <BookOpen className="w-3 h-3" />
                            Masterguide
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-d2c-muted leading-relaxed text-sm mb-6 line-clamp-3">
                        {exam.description}
                      </p>
                      
                      {/* CTA footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-semibold text-d2c-royal flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                          Read the Masterguide
                          <ChevronRight className="w-4 h-4" />
                        </span>
                        <div className="w-8 h-8 bg-d2c-ice flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-d2c-royal">
                          <ArrowUpRight className="w-4 h-4 text-d2c-navy group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line on hover */}
                    <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r ${accent.from} ${accent.to} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
