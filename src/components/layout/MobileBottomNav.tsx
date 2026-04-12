"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PhoneCall, GraduationCap, Building2, Info } from "lucide-react"

const BOTTOM_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Colleges", href: "/colleges", icon: Building2 },
  { label: "Consult Us", href: "/contact", icon: PhoneCall, isCenter: true },
  { label: "Exams", href: "/exams", icon: GraduationCap },
  { label: "About", href: "/about", icon: Info },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe pt-2 px-4">
      <div className="flex items-center justify-between">
        {BOTTOM_LINKS.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon

          if (link.isCenter) {
            return (
              <Link 
                key={link.label} 
                href={link.href}
                className="relative -top-6 flex flex-col items-center justify-center w-14 h-14 bg-d2c-royal rounded-full text-white shadow-xl shadow-d2c-royal/30 active:scale-95 transition-transform"
              >
                <Icon className="w-6 h-6 animate-pulse" />
              </Link>
            )
          }

          return (
            <Link 
              key={link.label} 
              href={link.href}
              className={`flex flex-col items-center gap-1 p-2 min-w-[64px] ${
                isActive ? "text-d2c-royal" : "text-d2c-muted hover:text-d2c-navy"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "fill-d2c-royal/20" : ""}`} />
              <span className="text-[10px] font-semibold">{link.label}</span>
            </Link>
          )
        })}
      </div>
      {/* CSS variable for safe area bottom to support iOS swipe indicator spacing */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }
      `}} />
    </div>
  )
}
