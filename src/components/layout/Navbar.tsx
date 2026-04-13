"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, PhoneCall, Search } from "lucide-react"

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
  const pathname = usePathname()
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
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
  }, [pathname])

  const showSolidBg = isScrolled || isHovered || mobileMenuOpen || searchOpen

  return (
    <header className="fixed top-4 md:top-5 left-0 right-0 z-50 transition-all duration-300">
      <div className="content-boundary">
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rounded-2xl transition-all duration-300 flex items-center justify-between h-14 md:h-16 px-5 md:px-6 ${
            showSolidBg 
              ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100" 
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* ── BRAND ── */}
          <Link href="/" className="flex items-center gap-2 z-50 shrink-0 pr-4">
            <span className={`font-sora font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 ${
              showSolidBg ? "text-d2c-navy" : "text-white"
            }`}>
              Direct<span className="text-d2c-royal">2</span>Campus
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
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
          <div className="hidden md:flex items-center gap-3">
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
              className={`flex items-center shrink-0 gap-2 px-5 py-2 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 border ${
                showSolidBg
                  ? "bg-d2c-royal border-d2c-royal text-white hover:bg-d2c-navy hover:border-d2c-navy shadow-md hover:shadow-lg"
                  : "border-white/40 text-white hover:bg-white/10"
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              Apply Now
            </Link>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            className="md:hidden p-2 z-50 rounded-lg relative w-10 h-10 flex items-center justify-center overflow-hidden"
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
                  <X className={`w-6 h-6 ${showSolidBg ? "text-d2c-navy" : "text-white"}`} />
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
                  <Menu className={`w-6 h-6 ${showSolidBg ? "text-d2c-navy" : "text-white"}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div className="content-boundary mt-2 w-full md:hidden">
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
