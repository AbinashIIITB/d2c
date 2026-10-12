import { useState, useRef, useEffect, ForwardedRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { searchAndRank } from "@/lib/search"

type MobileSearchItem = {
  id: string
  title: string
  subtitle: string
  url: string
  icon: "college" | "exam"
  imageUrl?: string
  slug?: string
  tags?: string[]
  courses?: string[]
  fullName?: string
  location?: string
  matchedHighlight?: string
  matchedBy?: string
}

function useMobileSearchData() {
  const [dbColleges, setDbColleges] = useState<any[]>([])
  const [dbExams, setDbExams] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/colleges").then(res => res.json()).then(data => setDbColleges(data || []));
    fetch("/api/exams").then(res => res.json()).then(data => setDbExams(data || []));
  }, []);

  return [
    ...dbColleges.map(c => ({
      id: `c_${c.id}`,
      title: c.name,
      subtitle: c.location || "College",
      url: `/colleges/${c.slug}`,
      icon: "college" as const,
      imageUrl: c.imageUrl,
      slug: c.slug,
      tags: c.tags,
      courses: c.courses,
      location: c.location,
      state: c.state,
    })),
    ...dbExams.map(e => ({
      id: `e_${e.id}`,
      title: e.name,
      subtitle: e.fullName || "Entrance Exam",
      url: `/exams/${e.slug}`,
      icon: "exam" as const,
      imageUrl: e.logoUrl,
      slug: e.slug,
      fullName: e.fullName,
    }))
  ] as MobileSearchItem[]
}

export function NavbarMobileSearch({ 
  isOpen, 
  onClose,
  mobileQuery
}: { 
  isOpen: boolean, 
  onClose: () => void,
  mobileQuery: string
}) {
  const router = useRouter()
  const allSearchItems = useMobileSearchData()
  const [mobileActiveIndex, setMobileActiveIndex] = useState(-1)

  const collegeItems = allSearchItems.filter(i => i.icon === "college")
  const examItems = allSearchItems.filter(i => i.icon === "exam")

  const rankedColleges = mobileQuery.trim() === ""
    ? collegeItems.slice(0, 4).map(item => ({ item, score: 1, matchedBy: "title_exact" as const, matchedHighlight: undefined as string | undefined }))
    : searchAndRank(collegeItems, mobileQuery, 5)

  const rankedExams = mobileQuery.trim() === ""
    ? examItems.slice(0, 3).map(item => ({ item, score: 1, matchedBy: "title_exact" as const, matchedHighlight: undefined as string | undefined }))
    : searchAndRank(examItems, mobileQuery, 3)

  const mobileFilteredColleges: MobileSearchItem[] = rankedColleges.map(r => ({
    ...r.item,
    matchedHighlight: r.matchedHighlight,
    matchedBy: r.matchedBy
  }))

  const mobileFilteredExams: MobileSearchItem[] = rankedExams.map(r => ({
    ...r.item,
    matchedHighlight: r.matchedHighlight,
    matchedBy: r.matchedBy
  }))

  const mobileFilteredItems = [...mobileFilteredColleges, ...mobileFilteredExams]


  const handleSelect = (url: string) => {
    onClose()
    router.push(url)
  }

  // Effect to reset active item on query change
  useEffect(() => {
    setMobileActiveIndex(-1)
  }, [mobileQuery])

  if (!isOpen || mobileFilteredItems.length === 0) return null

  return (
    <div className="content-boundary mt-2 w-full min-[1025px]:hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden origin-top"
        >
          <div className="py-3 px-2 max-h-[60vh] overflow-y-auto">
            {/* Colleges section */}
            {mobileFilteredColleges.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Colleges
                </div>
                {mobileFilteredColleges.map((item) => {
                  const index = mobileFilteredItems.indexOf(item)
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.url)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors text-left ${index === mobileActiveIndex ? "bg-d2c-ice" : "hover:bg-gray-50"
                        }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <Building2 className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sora font-semibold text-d2c-navy truncate text-sm">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400 truncate flex items-center gap-1.5">
                          <span className="truncate">{item.location || item.subtitle}</span>
                          {item.matchedHighlight && (item.matchedBy === 'acronym' || item.matchedBy === 'alias' || item.matchedBy === 'slug') && (
                            <span className="ml-auto shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-d2c-royal/10 text-d2c-royal">
                              {item.matchedHighlight}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Divider */}
            {mobileFilteredColleges.length > 0 && mobileFilteredExams.length > 0 && (
              <div className="h-px bg-gray-100 mx-3 my-2" />
            )}

            {/* Exams section */}
            {mobileFilteredExams.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Exams
                </div>
                {mobileFilteredExams.map((item) => {
                  const index = mobileFilteredItems.indexOf(item)
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.url)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors text-left ${index === mobileActiveIndex ? "bg-d2c-ice" : "hover:bg-gray-50"
                        }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sora font-semibold text-d2c-navy truncate text-sm">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400 truncate flex items-center gap-1.5">
                          <span className="truncate">{item.fullName || item.subtitle}</span>
                          {item.matchedHighlight && (item.matchedBy === 'acronym' || item.matchedBy === 'alias') && (
                            <span className="ml-auto shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                              {item.matchedHighlight}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
