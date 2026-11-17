"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, ArrowUp, PhoneCall } from "lucide-react"
import { CallbackModal } from "./CallbackModal"
import { CmsIcon } from "@/components/cms/CmsIcon"
import { useSiteContent, whatsappHref } from "@/components/cms/SiteContentProvider"
import { floatingDefaults, type FloatingContent } from "@/content/floating"

export function FloatingActions({ content = floatingDefaults }: { content?: FloatingContent }) {
  const { site } = useSiteContent()
  const waNumber = content.whatsapp.number?.trim() || site.contact.whatsappNumber
  const waLink = whatsappHref(waNumber, content.whatsapp.message?.trim() || site.contact.whatsappMessage)
  const KNOWN_ICONS = { "message-circle": MessageCircle, "phone-call": PhoneCall, "arrow-up": ArrowUp }
  const pathname = usePathname()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    
    // Listen for custom event to open callback modal
    const handleOpenModal = () => setIsModalOpen(true)
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("open-callback-modal", handleOpenModal)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("open-callback-modal", handleOpenModal)
    }
  }, [])

  const scrollToTop = () => {
    // Custom smooth scroll to overcome native browser smooth scroll distance limits
    const startY = window.scrollY
    const duration = Math.min(800, startY / 3) // Scale duration based on distance, max 800ms
    let startTime: number | null = null
    
    // Ease-out cubic function for smooth deceleration
    const easeOutCubic = (t: number) => --t * t * t + 1
    
    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percent = Math.min(progress / duration, 1)
      
      window.scrollTo(0, startY * (1 - easeOutCubic(percent)))
      
      if (progress < duration) {
        window.requestAnimationFrame(animateScroll)
      } else {
        // Enforce an absolute 0 at the end just in case of rounding errors
        window.scrollTo(0, 0)
      }
    }
    
    window.requestAnimationFrame(animateScroll)
  }

  return (
    <>
      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Right Center Sticky Actions (Desktop mostly) */}
      <div className="fixed top-1/2 -translate-y-1/2 right-0 z-50 flex flex-col gap-1 items-end pointer-events-none drop-shadow-2xl hidden md:flex">
        
        {/* WhatsApp Button */}
        {content.whatsapp.enabled && (
        <motion.a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          whileHover={{ x: -8 }}
          className="pointer-events-auto flex items-center bg-[#25D366] text-white p-3 shadow-lg hover:shadow-xl transition-all group overflow-hidden"
          title={content.whatsapp.title}
        >
          <CmsIcon name={content.whatsapp.icon} known={KNOWN_ICONS} fallback={MessageCircle} className="w-6 h-6 shrink-0 fill-current" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] font-semibold tracking-wide flex-shrink-0">
            {content.whatsapp.label}
          </span>
        </motion.a>
        )}

        {/* Request Callback Button */}
        {content.callback.enabled && (
        <motion.button
          onClick={() => setIsModalOpen(true)}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ x: -8 }}
          className="pointer-events-auto flex items-center bg-d2c-sky text-white p-3 shadow-lg hover:shadow-xl transition-all group overflow-hidden"
          title={content.callback.title}
        >
          <CmsIcon name={content.callback.icon} known={KNOWN_ICONS} fallback={PhoneCall} className="w-6 h-6 shrink-0 fill-current" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[150px] group-hover:ml-3 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] font-semibold tracking-wide flex-shrink-0">
            {content.callback.label}
          </span>
        </motion.button>
        )}
      </div>

      {/* Mobile WhatsApp Action */}
      {content.whatsapp.enabled && (
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center text-white rounded-full"
        >
          <CmsIcon name={content.whatsapp.icon} known={KNOWN_ICONS} fallback={MessageCircle} className="w-5 h-5 fill-current" />
        </a>
      </div>
      )}

      {/* Mobile Go To Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            onClick={scrollToTop}
            className={`fixed ${pathname?.startsWith("/colleges/") ? "bottom-[200px]" : "bottom-[140px]"} right-4 z-40 w-12 h-12 bg-white shadow-[0_4px_20px_rgba(30,58,138,0.2)] flex items-center justify-center text-d2c-navy border border-gray-100 rounded-full md:hidden`}
            aria-label={content.scrollTopLabel}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to Top (Desktop Only - Kept for consistency if hidden manually elsewhere) */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:flex">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white shadow-xl flex items-center justify-center hover:bg-d2c-ice text-d2c-navy border border-gray-100 transition-colors"
              aria-label={content.scrollTopLabel}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
