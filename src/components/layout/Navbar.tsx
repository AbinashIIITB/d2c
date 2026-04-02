"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, PhoneCall, ArrowRight } from "lucide-react"

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
  { label: "MBA Direct", href: "/mba" },
  { label: "About", href: "/about" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Determine visual state: scrolled always wins, hover only applies on homepage when not scrolled
  const showSolidBg = isScrolled || (isHovered && isHomePage)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidBg
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border-b border-gray-200/50"
          : isHomePage
            ? "bg-transparent"
            : "bg-d2c-navy"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* ── BRAND ── */}
          <Link href="/" className="flex items-center gap-2 z-50 shrink-0">
            <span
              className={`font-sora font-bold text-2xl tracking-tight transition-colors duration-300 ${
                showSolidBg ? "text-d2c-navy" : "text-white"
              }`}
            >
              Direct<span className="text-d2c-royal">2</span>Campus
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-1">
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
                        : "text-d2c-gold"
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
            <Link
              href="/contact"
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300
                ${showSolidBg
                  ? "bg-d2c-royal text-white hover:bg-d2c-navy"
                  : "border border-white/40 text-white hover:bg-white/10"
                }
              `}
            >
              <PhoneCall className="w-4 h-4" />
              Apply Now
            </Link>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            className="md:hidden p-2 z-50 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${showSolidBg || mobileMenuOpen ? "text-d2c-navy" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${showSolidBg ? "text-d2c-navy" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
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
    </header>
  )
}
