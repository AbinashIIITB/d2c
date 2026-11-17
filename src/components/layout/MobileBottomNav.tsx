"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PhoneCall, GraduationCap, Building2, Info } from "lucide-react"
import { CmsIcon } from "@/components/cms/CmsIcon"
import { floatingDefaults, type FloatingContent } from "@/content/floating"

const KNOWN_ICONS = { home: Home, "phone-call": PhoneCall, "graduation-cap": GraduationCap, "building-2": Building2, info: Info }


export function MobileBottomNav({ content = floatingDefaults }: { content?: FloatingContent }) {
  const BOTTOM_LINKS = content.bottomNav
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe pt-2 px-4">
      <div className="flex items-center justify-between">
        {BOTTOM_LINKS.map((link) => {
          const isActive = pathname === link.href

          if (link.isCenter) {
            return (
              <button 
                key={link.label} 
                onClick={() => window.dispatchEvent(new CustomEvent("open-callback-modal"))}
                className="relative -top-6 flex flex-col items-center justify-center w-14 h-14 bg-d2c-royal rounded-full text-white shadow-xl shadow-d2c-royal/30 active:scale-95 transition-transform"
              >
                <CmsIcon name={link.icon} known={KNOWN_ICONS} fallback={PhoneCall} className="w-6 h-6 animate-pulse" />
              </button>
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
              <CmsIcon name={link.icon} known={KNOWN_ICONS} fallback={Home} className={`w-5 h-5 ${isActive ? "fill-d2c-royal/20" : ""}`} />
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
