"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, PhoneCall, Search, ArrowLeft, Building2, BookOpen } from "lucide-react"
import { colleges, exams } from "@/lib/data"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Colleges",
    href: "/colleges",
    dropdown: [
      { label: "Engineering", href: "/colleges?type=engineering" },
      { label: "Medical", href: "/colleges?type=medical" },
      { label: "Management", href: "/colleges?type=management" },
    ],
  },
  { label: "Exams", href: "/exams" },
  { label: "Contact Us", href: "/contact" },
  { label: "About", href: "/about" },
]

import { AutoSuggestSearch } from "@/components/ui/AutoSuggestSearch"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileQuery, setMobileQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null)

  // Build search items for mobile
  const allSearchItems = [
    ...colleges.map(c => ({
      id: `c_${c.id}`,
      title: c.name,
      subtitle: c.location,
      url: `/colleges/${c.slug}`,
      icon: "college" as const,
      imageUrl: c.imageUrl,
    })),
    ...exams.map(e => ({
      id: `e_${e.id}`,
      title: e.name,
      subtitle: "Entrance Exam",
      url: `/exams/${e.slug}`,
      icon: "exam" as const,
      imageUrl: e.logoUrl,
    })),
  ]

  const mobileFilteredColleges = mobileQuery.trim() === ""
    ? allSearchItems.filter(i => i.icon === "college").slice(0, 4)
    : allSearchItems.filter(item =>
        item.icon === "college" &&
        (item.title.toLowerCase().includes(mobileQuery.toLowerCase()) ||
         item.subtitle.toLowerCase().includes(mobileQuery.toLowerCase()))
      ).slice(0, 4)

  const mobileFilteredExams = mobileQuery.trim() === ""
    ? allSearchItems.filter(i => i.icon === "exam").slice(0, 3)
    : allSearchItems.filter(item =>
        item.icon === "exam" &&
        (item.title.toLowerCase().includes(mobileQuery.toLowerCase()) ||
         item.subtitle.toLowerCase().includes(mobileQuery.toLowerCase()))
      ).slice(0, 3)

  const mobileFilteredItems = [...mobileFilteredColleges, ...mobileFilteredExams]
  const [mobileActiveIndex, setMobileActiveIndex] = useState(-1)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
      if (mobileSearchContainerRef.current && !mobileSearchContainerRef.current.contains(event.target as Node)) {
        setMobileSearchOpen(false)
        setMobileQuery("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    // trigger once to check initial state
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
    setSearchOpen(false)
    setMobileSearchOpen(false)
    setMobileQuery("")
  }, [pathname])

  // Auto-focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchInputRef.current) {
      setTimeout(() => mobileSearchInputRef.current?.focus(), 100)
    }
  }, [mobileSearchOpen])

  const showSolidBg = isScrolled || isHovered || mobileMenuOpen || searchOpen || mobileSearchOpen

  const handleMobileSearchSelect = (url: string) => {
    setMobileSearchOpen(false)
    setMobileQuery("")
    router.push(url)
  }

  const handleMobileKeyDown = (e: React.KeyboardEvent) => {
    if (mobileFilteredItems.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setMobileActiveIndex(prev => (prev < mobileFilteredItems.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setMobileActiveIndex(prev => (prev > 0 ? prev - 1 : mobileFilteredItems.length - 1))
    } else if (e.key === "Enter" && mobileActiveIndex >= 0) {
      e.preventDefault()
      const item = mobileFilteredItems[mobileActiveIndex]
      if (item) handleMobileSearchSelect(item.url)
    }
  }

  return (
    <header className="fixed top-4 min-[903px]:top-5 left-0 right-0 z-50 transition-all duration-300" ref={mobileSearchContainerRef}>
      <div className="content-boundary">
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rounded-2xl transition-all duration-300 flex items-center justify-between h-14 min-[903px]:h-16 px-5 min-[903px]:px-6 ${
            showSolidBg 
              ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100" 
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* ── MOBILE SEARCH MODE ── */}
          <AnimatePresence mode="wait">
            {mobileSearchOpen ? (
              <motion.div
                key="mobile-search-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="min-[903px]:hidden flex items-center gap-3 w-full"
              >
                <button
                  onClick={() => {
                    setMobileSearchOpen(false)
                    setMobileQuery("")
                  }}
                  className="p-1.5 rounded-lg text-d2c-navy hover:bg-gray-100 transition-colors shrink-0"
                  aria-label="Close search"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    ref={mobileSearchInputRef}
                    type="text"
                    placeholder="Search colleges, exams..."
                    className="flex-1 bg-transparent outline-none text-sm text-d2c-navy placeholder:text-gray-400 font-medium w-full"
                    value={mobileQuery}
                    onChange={(e) => {
                      setMobileQuery(e.target.value)
                      setMobileActiveIndex(-1)
                    }}
                    onKeyDown={handleMobileKeyDown}
                  />
                  {mobileQuery && (
                    <button
                      onClick={() => setMobileQuery("")}
                      className="p-0.5 rounded-full text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-normal-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="min-[903px]:hidden flex items-center justify-between w-full"
              >
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 z-50 shrink-0">
                  <span className={`font-sora font-bold text-lg tracking-tight transition-colors duration-300 ${
                    showSolidBg ? "text-d2c-navy" : "text-white"
                  }`}>
                    Direct<span className="text-d2c-royal">2</span>Campus
                  </span>
                </Link>

                {/* Mobile right icons */}
                <div className="flex items-center gap-1">
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      showSolidBg ? "text-d2c-navy hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setMobileSearchOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1.5 z-50 rounded-lg relative w-8 h-8 flex items-center justify-center overflow-hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    <AnimatePresence mode="wait">
                      {mobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute"
                        >
                          <X className={`w-5 h-5 ${showSolidBg ? "text-d2c-navy" : "text-white"}`} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute"
                        >
                          <Menu className={`w-5 h-5 ${showSolidBg ? "text-d2c-navy" : "text-white"}`} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── DESKTOP BRAND ── */}
          <Link href="/" className="hidden min-[903px]:flex items-center gap-2 z-50 shrink-0 pr-4">
            <span className={`font-sora font-bold text-lg min-[903px]:text-xl tracking-tight transition-colors duration-300 ${
              showSolidBg ? "text-d2c-navy" : "text-white"
            }`}>
              Direct<span className="text-d2c-royal">2</span>Campus
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden min-[903px]:flex items-center justify-center gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`
                    flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${pathname === link.href
                      ? showSolidBg
                        ? "text-d2c-royal"
                        : "text-white"
                      : showSolidBg
                        ? "text-gray-600 hover:text-d2c-navy"
                        : "text-white/80 hover:text-white"
                    }
                  `}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* ── DROPDOWN ── */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 pt-2 z-50"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px]">
                          {link.dropdown.map((drop) => (
                            <Link
                              key={drop.label}
                              href={drop.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-d2c-ice hover:text-d2c-royal transition-colors"
                            >
                              {drop.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* ── DESKTOP CTA ── */}
          <div className="hidden min-[903px]:flex items-center gap-3">
            <div 
              className="relative flex items-center" 
              ref={searchContainerRef}
              onMouseEnter={() => setSearchOpen(true)}
              onMouseLeave={() => setSearchOpen(false)}
            >
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                  showSolidBg ? "text-d2c-navy hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 pt-3 z-[60] w-[340px]"
                  >
                    <AutoSuggestSearch mode="all" placeholder="Search colleges, exams..." className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl" autoFocus={true} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link
              href="/contact"
              className={`flex items-center shrink-0 gap-2 px-5 py-2 rounded-xl font-semibold text-xs min-[903px]:text-sm transition-all duration-300 border ${
                showSolidBg
                  ? "bg-d2c-royal border-d2c-royal text-white hover:bg-d2c-navy hover:border-d2c-navy shadow-md hover:shadow-lg"
                  : "border-white/40 text-white hover:bg-white/10"
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE SEARCH SUGGESTIONS (shown below navbar like menu bar) ── */}
      <div className="content-boundary mt-2 w-full min-[903px]:hidden">
        <AnimatePresence>
          {mobileSearchOpen && mobileFilteredItems.length > 0 && (
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
                          onClick={() => handleMobileSearchSelect(item.url)}
                          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors text-left ${
                            index === mobileActiveIndex ? "bg-d2c-ice" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                            ) : (
                              <Building2 className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-sora font-semibold text-d2c-navy truncate text-sm">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {item.subtitle}
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
                          onClick={() => handleMobileSearchSelect(item.url)}
                          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors text-left ${
                            index === mobileActiveIndex ? "bg-d2c-ice" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                            ) : (
                              <BookOpen className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-sora font-semibold text-d2c-navy truncate text-sm">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MOBILE MENU ── */}
      <div className="content-boundary mt-2 w-full min-[903px]:hidden">
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden origin-top"
            >
              <div className="py-4 px-2 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg font-sora font-semibold text-base transition-colors ${
                      pathname === link.href
                        ? "bg-d2c-ice text-d2c-royal"
                        : "text-d2c-navy hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-8 flex flex-col gap-1 mt-1">
                      {link.dropdown.map((drop) => (
                        <Link
                          key={drop.label}
                          href={drop.href}
                          className="text-gray-500 py-2 text-sm font-medium hover:text-d2c-royal transition-colors"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="mt-3 mx-2 flex items-center justify-center gap-2 px-6 py-4 bg-d2c-royal text-white font-semibold text-base rounded-xl"
              >
                <PhoneCall className="w-5 h-5" />
                Request Callback
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  )
}
