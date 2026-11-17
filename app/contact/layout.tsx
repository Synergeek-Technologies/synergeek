import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"

const TITLE = "Contact Synergeek — Digital Agency in RS Puram, Coimbatore"
const DESCRIPTION =
  "Talk to Synergeek in RS Puram, Coimbatore about your website, app, video, SEO or ads. Call +91 96777 41597 or send a message for a free consultation."
const URL = `${SITE_URL}/contact`
const OG_IMAGE = { url: "/synergeek-og.png", width: 1600, height: 900, alt: "Contact Synergeek, Coimbatore" }

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, images: [OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
  alternates: { canonical: URL },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
