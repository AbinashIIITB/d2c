"use client"

// Client-side access to site-wide CMS content (popups/forms text, contact details) for components
// that sit deep inside other pages and cannot receive props from the root layout.
// Falls back to the built-in defaults when no provider is mounted.
import { createContext, useContext, type ReactNode } from "react"
import { siteDefaults, type SiteContent } from "@/content/site"
import { modalsDefaults, type ModalsContent } from "@/content/modals"

export interface SiteContentValue {
  site: SiteContent
  modals: ModalsContent
}

const DEFAULT_VALUE: SiteContentValue = { site: siteDefaults, modals: modalsDefaults }

const SiteContentContext = createContext<SiteContentValue>(DEFAULT_VALUE)

export function SiteContentProvider({
  site,
  modals,
  children,
}: {
  site?: SiteContent
  modals?: ModalsContent
  children: ReactNode
}) {
  return (
    <SiteContentContext.Provider value={{ site: site ?? siteDefaults, modals: modals ?? modalsDefaults }}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent(): SiteContentValue {
  return useContext(SiteContentContext)
}

/** Replaces `{name}` in a template string. */
export function fillTemplate(template: string, name: string): string {
  return template.replace(/\{name\}/g, name)
}

/** wa.me link from the contact settings (adds ?text= only when a message is set). */
export function whatsappHref(number: string, message?: string): string {
  const base = `https://wa.me/${number}`
  return message && message.trim() ? `${base}?text=${encodeURIComponent(message)}` : base
}
