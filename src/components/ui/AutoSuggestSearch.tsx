"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Building2, BookOpen } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SearchItem, searchAndRank } from "@/lib/search"
import { sortCollegesWithIEMFirst } from "@/lib/iem-priority"

type SearchMode = "all" | "colleges" | "exams"

interface AutoSuggestItem extends SearchItem {
  matchedHighlight?: string
  matchedBy?: string
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
  
  const [dbColleges, setDbColleges] = useState<any[]>([])
  const [dbExams, setDbExams] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/colleges").then(res => res.json()).then(data => setDbColleges(data || []));
    fetch("/api/exams").then(res => res.json()).then(data => setDbExams(data || []));
  }, []);

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
    dbColleges.forEach(c => allItems.push({
      id: `c_${c.id}`,
      title: c.name,
      subtitle: c.location || "College",
      url: `/colleges/${c.slug}`,
      icon: "college",
      imageUrl: c.imageUrl,
      slug: c.slug,
      tags: c.tags,
      courses: c.courses,
      location: c.location,
      state: c.state
    }))
  }
  
  if (mode === "all" || mode === "exams") {
    dbExams.forEach(e => allItems.push({
      id: `e_${e.id}`,
      title: e.name,
      subtitle: e.fullName || "Entrance Exam",
      url: `/exams/${e.slug}`,
      icon: "exam",
      imageUrl: e.logoUrl,
      slug: e.slug,
      fullName: e.fullName
    }))
  }

  // Filter and rank items based on query
  const collegeCandidates = allItems.filter(i => i.icon === "college")
  const examCandidates = allItems.filter(i => i.icon === "exam")

  const rankedColleges = query.trim() === ""
    ? collegeCandidates.slice(0, 4).map(item => ({ item, score: 1, matchedBy: "title_exact" as const, matchedHighlight: undefined as string | undefined }))
    : searchAndRank(collegeCandidates, query, 5);

  const rankedExams = query.trim() === ""
    ? examCandidates.slice(0, 4).map(item => ({ item, score: 1, matchedBy: "title_exact" as const, matchedHighlight: undefined as string | undefined }))
    : searchAndRank(examCandidates, query, 3);

  const filteredColleges: AutoSuggestItem[] = sortCollegesWithIEMFirst(
    rankedColleges.map(r => ({
      ...r.item,
      matchedHighlight: r.matchedHighlight,
      matchedBy: r.matchedBy
    }))
  );

  const filteredExams: AutoSuggestItem[] = rankedExams.map(r => ({
    ...r.item,
    matchedHighlight: r.matchedHighlight,
    matchedBy: r.matchedBy
  }));

  const filteredItems = [...filteredColleges, ...filteredExams];
  const showDropdown = isOpen && filteredItems.length > 0;

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
      <div 
        className={`relative z-10 bg-white border border-gray-200 transition-all ${
          showDropdown 
            ? 'rounded-t-xl border-b-transparent shadow-[0_4px_20px_rgb(0,0,0,0.08)]' 
            : 'rounded-xl focus-within:ring-2 focus-within:ring-d2c-royal/20 focus-within:border-d2c-royal shadow-sm'
        }`}
      >
        <input 
          type="text"
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-4 py-3 bg-transparent outline-none rounded-xl"
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
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-[0_12px_30px_rgb(0,0,0,0.12)] border border-t-0 border-gray-200 overflow-hidden z-50">
          <div className="max-h-[28rem] overflow-y-auto">
            {filteredColleges.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Colleges
                </div>
                <ul>
                  {filteredColleges.map((item) => {
                    const index = filteredItems.indexOf(item);
                    return (
                      <li key={item.id}>
                        <Link 
                          href={item.url}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                            index === activeIndex ? "bg-d2c-ice" : "hover:bg-gray-50"
                          }`}
                          onMouseEnter={() => setActiveIndex(index)}
                        >
                          <div className="w-10 h-10 rounded-md bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                            ) : (
                              <Building2 className="w-5 h-5 text-d2c-muted" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-d2c-navy truncate text-sm">
                              {item.title}
                            </div>
                            <div className="text-xs text-d2c-muted truncate flex items-center gap-1.5">
                              <Building2 className="w-3 h-3 shrink-0" />
                              <span className="truncate">{item.location || item.subtitle}</span>
                              {item.matchedHighlight && (item.matchedBy === 'acronym' || item.matchedBy === 'alias' || item.matchedBy === 'slug') && (
                                <span className="ml-auto shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-d2c-royal/10 text-d2c-royal border border-d2c-royal/20">
                                  {item.matchedHighlight}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {filteredExams.length > 0 && (
              <div className={`py-2 ${filteredColleges.length > 0 ? "border-t border-gray-100 bg-gray-50/50" : ""}`}>
                <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Exams
                </div>
                <ul>
                  {filteredExams.map((item) => {
                    const index = filteredItems.indexOf(item);
                    return (
                      <li key={item.id}>
                        <Link 
                          href={item.url}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                            index === activeIndex ? "bg-d2c-ice" : "hover:bg-gray-50"
                          }`}
                          onMouseEnter={() => setActiveIndex(index)}
                        >
                          <div className="w-10 h-10 rounded-md bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                            ) : (
                              <BookOpen className="w-5 h-5 text-d2c-muted" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-d2c-navy truncate text-sm">
                              {item.title}
                            </div>
                            <div className="text-xs text-d2c-muted truncate flex items-center gap-1.5">
                              <BookOpen className="w-3 h-3 shrink-0" />
                              <span className="truncate">{item.fullName || item.subtitle}</span>
                              {item.matchedHighlight && (item.matchedBy === 'acronym' || item.matchedBy === 'alias') && (
                                <span className="ml-auto shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                                  {item.matchedHighlight}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
