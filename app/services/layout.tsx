import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"

const TITLE = "Digital Marketing Services in Coimbatore"
const DESCRIPTION =
  "Websites, mobile apps, video production, SEO, social media and Meta & Google Ads — digital marketing services in Coimbatore from Synergeek. See our work."
const URL = `${SITE_URL}/services`
const OG_IMAGE = { url: "/synergeek-og.png", width: 1600, height: 900, alt: "Synergeek digital marketing services in Coimbatore" }

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: `${TITLE} | Synergeek`, description: DESCRIPTION, url: URL, images: [OG_IMAGE] },
  twitter: { title: `${TITLE} | Synergeek`, description: DESCRIPTION, images: [OG_IMAGE.url] },
  alternates: { canonical: URL },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
