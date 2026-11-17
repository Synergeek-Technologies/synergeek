"use client"

import { motion } from "framer-motion"
import { ArrowUp, Mail, MapPin, Phone, Share2 } from "lucide-react"
import Link from "next/link"
import { LEAD_EVENTS, trackEvent } from "@/lib/analytics"
import { BUSINESS, FOOTER_LINKS, toTelHref, type SiteSettings } from "@/lib/site-config"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

type FooterSettings = Pick<SiteSettings, "contactEmail" | "phone1" | "phone2" | "address" | "instagramUrl">

export function SiteFooter({ settings }: { settings: FooterSettings }) {
  const phones = [settings.phone1, settings.phone2].filter((phone) => phone && phone.trim())
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const trackEmail = () => trackEvent(LEAD_EVENTS.emailClick, { link_location: "footer" })
  const trackCall = () => trackEvent(LEAD_EVENTS.phoneClick, { link_location: "footer" })

  return (
    <footer className="bg-black text-white relative z-20">
      <div className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <motion.div {...fadeUp()} className="text-center">
              <a href={`mailto:${settings.contactEmail}`} onClick={trackEmail} className="inline-block" aria-label="Email Synergeek">
                <Mail className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${settings.contactEmail}`}
                onClick={trackEmail}
                className="text-white hover:text-primary transition-colors text-sm md:text-base block"
              >
                {settings.contactEmail}
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="text-center">
              <MapPin className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.5} />
              <address className="not-italic text-white text-sm md:text-base leading-relaxed whitespace-pre-line">
                {settings.address}
              </address>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="text-center">
              <Phone className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.5} />
              <div className="space-y-1">
                {phones.map((phone) => (
                  <a
                    key={phone}
                    href={toTelHref(phone)}
                    onClick={trackCall}
                    className="text-white hover:text-primary transition-colors text-sm md:text-base block"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <nav aria-label="Footer" className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-6 text-center text-white/60 text-xs md:text-sm">
            {BUSINESS.tagline}. Serving {BUSINESS.areaServed.slice(0, -1).join(", ")} and across Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center md:text-left">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center justify-center md:justify-start gap-2 text-white hover:text-primary transition-colors text-sm"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back Top</span>
          </button>

          <p className="text-white/70 text-xs md:text-sm text-center">
            {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>

          <Link
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center md:justify-end gap-2 text-white hover:text-primary transition-colors text-sm"
          >
            <span>Follow Us</span>
            <Share2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
