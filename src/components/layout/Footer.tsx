"use client"

import { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSiteContent } from "@/components/cms/SiteContentProvider"
import { footerDefaults, type FooterContent } from "@/content/footer"

const SOCIAL_PATHS: Record<string, string> = {
  facebook: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  instagram: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
  linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
}
const OTHER_SOCIAL_PATH = "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c1.1 0 2.2 1.9 2.7 5h-5.4C9.8 5.9 10.9 4 12 4zM4.3 11a8 8 0 011.9-4.2c-.1.9-.2 2.5-.2 4.2H4.3zm0 2H6c0 1.7.1 3.3.2 4.2A8 8 0 014.3 13zm5 0h5.4c-.5 3.1-1.6 5-2.7 5s-2.2-1.9-2.7-5zm0-2c0-1.7.1-3.3.2-4.2.1.9.2 2.5.2 4.2H9.3zm7.7 0c0-1.7-.1-3.3-.2-4.2A8 8 0 0119.7 11H17zm0 2h2.7a8 8 0 01-1.9 4.2c.1-.9.2-2.5.2-4.2z"

export function Footer({ content = footerDefaults }: { content?: FooterContent }) {
  const { site } = useSiteContent()
  const brand = site.brand
  const contact = site.contact
  const headingClass = "font-sora font-bold text-lg mb-6 relative pb-2 inline-block text-white after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-d2c-gold"
  const linkClass = "hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"

  return (
    <footer className="bg-d2c-navy text-white pt-16 md:pt-24 pb-28 md:pb-12 border-t-4 border-d2c-royal relative overflow-hidden">
      <div className="content-boundary relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-16 mb-14 md:mb-20">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="inline-block block w-full">
              <Image 
                src={content.logo} 
                alt={content.logoAlt} 
                width={240}
                height={96}
                className="h-20 md:h-24 w-auto object-contain object-left drop-shadow-lg -ml-2"
              />
            </Link>
            <p className="text-d2c-ice/80 text-sm leading-relaxed max-w-sm mt-2">
              {content.about}
            </p>
            <div className="flex gap-4 mt-2">
              {site.social.map((social, i) => (
                <a key={`${social.platform}-${i}`} href={social.href} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-d2c-royal hover:border-d2c-royal hover:scale-110 transition-all duration-300" aria-label={social.label}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d={SOCIAL_PATHS[social.platform] ?? OTHER_SOCIAL_PATH} clipRule="evenodd" /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {content.columns.map((column, index) => (
            <div key={`${column.title}-${index}`} className={index === 0 ? "lg:ml-12" : undefined}>
              <h4 className={headingClass}>
                {column.title}
              </h4>
              <ul className="flex flex-col gap-4 text-d2c-ice/80 text-sm font-medium">
                {column.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}><Link href={link.href} className={linkClass}><span className="text-d2c-royal text-[10px]">▶</span> {link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className={headingClass}>
              {content.contact.title}
            </h4>
            <ul className="flex flex-col gap-5 text-d2c-ice/80 text-sm">
              <li className="flex flex-col gap-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider text-d2c-sky">{content.contact.addressLabel}</span>
                <span className="leading-relaxed">{contact.addressLines.map((line, i) => (
                  <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
                ))}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider text-d2c-sky">{content.contact.phoneLabel}</span>
                <a href={`tel:${contact.phoneTel}`} className="hover:text-white font-medium transition-colors text-lg">{contact.phoneDisplay}</a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider text-d2c-sky">{content.contact.emailLabel}</span>
                <a href={`mailto:${contact.email}`} className="hover:text-white font-medium transition-colors">{contact.email}</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Office Location Map */}
        {content.map.show && content.map.embedUrl && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 w-full h-[250px] md:h-[300px] relative mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
            <div className="absolute inset-0 bg-d2c-navy/20 pointer-events-none z-10" />
            <iframe 
              src={content.map.embedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={content.map.title}
              className="filter grayscale-[50%] contrast-125"
            ></iframe>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-d2c-muted">
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} {brand.before}<span className="text-d2c-royal font-bold">{brand.accent}</span>{brand.after}. {content.copyrightSuffix}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {content.bottomLinks.map((link, i) => (
              <Link key={`${link.href}-${i}`} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
            ))}
            {content.adminLink.show && (
              <Link href={content.adminLink.href} className="text-d2c-royal hover:text-white transition-colors font-bold ml-4 border-l border-white/20 pl-6">{content.adminLink.label}</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
