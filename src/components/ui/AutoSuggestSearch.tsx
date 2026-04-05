"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Building2, BookOpen } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import collegesData from "@/data/colleges.json"
import examsData from "@/data/exams.json"

type SearchMode = "all" | "colleges" | "exams"

interface SearchItem {
  id: string
  title: string
  subtitle: string
  url: string
  icon: "college" | "exam"
  imageUrl?: string
}

interface AutoSuggestSearchProps {
  mode?: SearchMode
  placeholder?: string
  className?: string
  onSearchChange?: (val: string) => void
  initialValue?: string
  autoFocus?: boolean
}

export function AutoSuggestSearch({ 
  mode = "all", 
  placeholder = "Search...", 
  className = "", 
  onSearchChange,
  initialValue = "",
  autoFocus = false
}: AutoSuggestSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  // External query state tracking (for grid filtering)
  useEffect(() => {
    if (onSearchChange) onSearchChange(query)
  }, [query, onSearchChange])

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Build the dataset depending on the mode
  const allItems: SearchItem[] = []
  
  if (mode === "all" || mode === "colleges") {
    collegesData.forEach(c => allItems.push({
      id: `c_${c.id}`,
      title: c.name,
      subtitle: c.location,
      url: `/colleges/${c.link.split("/").pop()}`, // Safe check since some links might be absolute/relative
      icon: "college",
      imageUrl: c.imageUrl
    }))
  }
  
  if (mode === "all" || mode === "exams") {
    examsData.forEach(e => allItems.push({
      id: `e_${e.id}`,
      title: e.title,
      subtitle: "Entrance Exam",
      url: e.link,
      icon: "exam",
      imageUrl: e.logoUrl
    }))
  }

  // Filter items based on query
  const filteredItems = query.trim() === "" 
    ? allItems.slice(0, 6) 
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6) // Limit to top 6 results

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredItems.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1))
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault()
      const item = filteredItems[activeIndex]
      if (item) {
        setIsOpen(false)
        router.push(item.url)
      }
    }
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <input 
        type="text"
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none bg-white shadow-sm transition-all rounded-lg"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
          setActiveIndex(-1)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-d2c-muted w-5 h-5 pointer-events-none" />

      {/* Dropdown */}
      {isOpen && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <ul className="max-h-80 overflow-y-auto py-2">
            {filteredItems.map((item, index) => (
              <li key={item.id}>
                <Link 
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    index === activeIndex ? "bg-d2c-ice" : "hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="w-10 h-10 rounded-md bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                    ) : item.icon === "college" ? (
                      <Building2 className="w-5 h-5 text-d2c-muted" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-d2c-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-d2c-navy truncate text-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-d2c-muted truncate mt-0.5 flex items-center gap-1">
                      {item.icon === "college" ? <Building2 className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                      {item.subtitle}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
