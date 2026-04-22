import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneCall } from "lucide-react"
import { usePathname } from "next/navigation"

interface NavLink {
  label: string
  href: string
  dropdown?: { label: string; href: string }[]
}

interface NavbarMobileMenuProps {
  isOpen: boolean
  navLinks: NavLink[]
}

export function NavbarMobileMenu({ isOpen, navLinks }: NavbarMobileMenuProps) {
  const pathname = usePathname()

  return (
    <div className="content-boundary mt-2 w-full min-[1025px]:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden origin-top"
          >
            <div className="py-4 px-2 flex flex-col gap-1">
              {navLinks.map((link) => (
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
  )
}
