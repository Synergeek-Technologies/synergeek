/**
 * Single source of truth for business identity (NAP) and sitewide SEO values.
 * Sanity `siteSettings` can override display values, but these fallbacks
 * guarantee the name, address and phone never render empty.
 */

export const SITE_URL = "https://www.synergeek.in"
export const BUSINESS_ID = `${SITE_URL}/#business`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const BUSINESS = {
  name: "Synergeek",
  legalName: "Synergeek Technologies",
  tagline: "Digital Marketing, Web Design & Video Agency in Coimbatore",
  description:
    "Synergeek is a digital marketing and creative agency in Coimbatore building websites, mobile apps, videos, SEO and social media campaigns that turn attention into customers.",
  email: "company@synergeek.in",
  phones: ["+91 96777 41597", "+91 97867 63705"],
  address: {
    street: "182, Subramanium Road, RS Puram",
    locality: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "641002",
    country: "IN",
  },
  instagramUrl: "https://www.instagram.com/synergeek.in",
  logo: `${SITE_URL}/synergeek-logo.png`,
  foundingYear: "2020",
  founders: ["Sri Manikandan R", "Sai Sidharthan H"],
  areaServed: ["Coimbatore", "Tiruppur", "Erode", "Salem", "Tamil Nadu"],
} as const

export const SAME_AS: readonly string[] = [BUSINESS.instagramUrl]

export const formattedAddress = (): string => {
  const { street, locality, postalCode, region } = BUSINESS.address
  return `${street}, ${locality}, ${region} ${postalCode}`
}

export const toTelHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, "")}`

export interface SiteSettings {
  orgName: string
  companyDescription: string
  contactEmail: string
  phone1: string
  phone2: string
  address: string
  instagramUrl: string
  mission?: string
  vision?: string
}

/** Merge Sanity settings over the hard-coded fallbacks, ignoring empty strings. */
type RawSettings = { [K in keyof SiteSettings]?: string | null }

export function withSettingsFallback(settings: RawSettings | null | undefined): SiteSettings {
  const pick = (value: string | null | undefined, fallback: string): string =>
    value && value.trim() ? value : fallback

  return {
    orgName: pick(settings?.orgName, BUSINESS.name),
    mission: settings?.mission ?? undefined,
    vision: settings?.vision ?? undefined,
    companyDescription: pick(settings?.companyDescription, BUSINESS.description),
    contactEmail: pick(settings?.contactEmail, BUSINESS.email),
    phone1: pick(settings?.phone1, BUSINESS.phones[0]),
    phone2: pick(settings?.phone2, BUSINESS.phones[1]),
    address: pick(settings?.address, formattedAddress()),
    instagramUrl: pick(settings?.instagramUrl, BUSINESS.instagramUrl),
  }
}

/** Sitewide ProfessionalService (LocalBusiness subtype) entity, referenced by @id elsewhere. */
export function buildBusinessSchema() {
  const { address } = BUSINESS
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    description: BUSINESS.description,
    email: BUSINESS.email,
    telephone: BUSINESS.phones[0].replace(/\s/g, ""),
    logo: BUSINESS.logo,
    image: `${SITE_URL}/synergeek-og.png`,
    foundingDate: BUSINESS.foundingYear,
    founder: BUSINESS.founders.map((name) => ({ "@type": "Person", name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": name === "Tamil Nadu" ? "State" : "City",
      name,
    })),
    sameAs: SAME_AS,
  }
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-IN",
  }
}

export function buildFaqSchema(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}

/** Footer / nav links to service pages. Extended as new service pages ship. */
export const FOOTER_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]
