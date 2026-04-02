"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Search, Star, Building2, ArrowUpRight, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CollegeCard } from "@/components/ui/CollegeCard"

type College = {
  id: number
  name: string
  location: string
  description: string
  imageUrl: string
  link: string
}

export function CollegesGrid({ initialColleges }: { initialColleges: College[] }) {
  const [search, setSearch] = useState("")

  const filteredColleges = initialColleges.filter(col => 
    col.name.toLowerCase().includes(search.toLowerCase()) || 
    col.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="max-w-xl mx-auto mb-12 relative">
        <input 
          type="text"
          placeholder="Search by college name or city..."
          className="w-full pl-12 pr-4 py-4 border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none bg-white shadow-sm transition-all"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-d2c-muted w-5 h-5" />
      </div>

      {filteredColleges.length === 0 ? (
        <div className="text-center py-24 text-d2c-muted">
          <Building2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-sora font-semibold mb-2">No colleges found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredColleges.map((college) => (
              <motion.div
                key={college.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <CollegeCard college={college} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
