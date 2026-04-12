"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { MapPin, Search, Star, Building2, ArrowUpRight, ChevronRight, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CollegeCard } from "@/components/ui/CollegeCard"
import { AutoSuggestSearch } from "@/components/ui/AutoSuggestSearch"
import { College } from "@/lib/data"

export function CollegesGrid({ initialColleges }: { initialColleges: College[] }) {
  const [search, setSearch] = useState("")
  const [selectedDept, setSelectedDept] = useState("All Colleges")
  const [selectedState, setSelectedState] = useState("All States")

  const uniqueStates = useMemo(() => {
    const states = initialColleges.map((c) => {
      const parts = c.location.split(",")
      return parts[parts.length - 1].trim()
    })
    return Array.from(new Set(states)).sort()
  }, [initialColleges])

  const filteredColleges = initialColleges.filter((col) => {
    // 1. Search Query
    const searchLower = search.toLowerCase()
    const matchesSearch =
      col.name.toLowerCase().includes(searchLower) ||
      col.location.toLowerCase().includes(searchLower)

    // 2. Department filter
    let matchesDept = true
    if (selectedDept !== "All Colleges") {
      const combinedText = (col.name + " " + (col.about || col.description || "")).toLowerCase()
      if (selectedDept === "Engineering") {
        matchesDept = combinedText.includes("engineering") || combinedText.includes("technology")
      } else if (selectedDept === "Medical") {
        matchesDept = combinedText.includes("medical") || combinedText.includes("health") || combinedText.includes("hospital")
      } else if (selectedDept === "Management") {
        matchesDept = combinedText.includes("management") || combinedText.includes("business") || combinedText.includes("mba")
      }
    }

    // 3. State filter
    let matchesState = true
    if (selectedState !== "All States") {
      matchesState = col.location.includes(selectedState)
    }

    return matchesSearch && matchesDept && matchesState
  })

  return (
    <div>
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 relative z-40">
        <div className="flex-1">
          <AutoSuggestSearch 
            mode="colleges" 
            placeholder="Search by college name or city..." 
            onSearchChange={setSearch} 
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative min-w-[160px]">
             <select 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none bg-white shadow-sm text-gray-700 h-[50px]"
            >
              <option value="All Colleges">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Management">Management</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-d2c-muted pointer-events-none" />
          </div>

          <div className="relative min-w-[160px]">
             <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none bg-white shadow-sm text-gray-700 h-[50px]"
            >
              <option value="All States">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-d2c-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {filteredColleges.length === 0 ? (
        <div className="text-center py-24 text-d2c-muted relative z-10">
          <Building2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-sora font-semibold mb-2">No colleges found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
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
