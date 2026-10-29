export interface ServiceDetail {
  deliverables: string[]
  outcome: string
  clientSlug: string
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "Search Engine Optimization (SEO)": {
    deliverables: ["Keyword & competitor research", "On-page fixes", "Service & blog pages", "Technical audits"],
    outcome: "Show up when customers search for what you sell — without paying for every click.",
    clientSlug: "no1-fence",
  },
  "Local SEO & Google Business Profile": {
    deliverables: ["Profile setup & optimisation", "Review strategy", "Maps ranking", "Location pages"],
    outcome: "Own the map pack in your city so nearby customers call you first.",
    clientSlug: "dentiq",
  },
  "Social Media Lead Generation": {
    deliverables: ["Lead magnets & offers", "DM & WhatsApp funnels", "Enquiry tracking", "Follow-up scripts"],
    outcome: "Turn followers into enquiries, site visits, and booked appointments.",
    clientSlug: "kumaraguru-properties",
  },
  "Performance Marketing (Ads)": {
    deliverables: ["Meta & Google Ads", "Creative testing", "Audience building", "Retargeting"],
    outcome: "Scale what already works with ads that pay for themselves.",
    clientSlug: "fd-sports",
  },
  "Social Media Management": {
    deliverables: ["Monthly content calendar", "Posting & scheduling", "Community management", "Monthly reports"],
    outcome: "A feed that looks like a brand people want to buy from — every single week.",
    clientSlug: "jwaala",
  },
  "Content Strategy & Branding": {
    deliverables: ["Brand identity", "Shoots & reels", "Campaign concepts", "Copywriting"],
    outcome: "One clear story and a look that makes every post unmistakably yours.",
    clientSlug: "velvette-martini",
  },
}

export const serviceStages = [
  { key: "tier1", label: "Get Found", line: "Be there when they search." },
  { key: "tier2", label: "Get Leads", line: "Turn attention into enquiries." },
  { key: "tier3", label: "Get Remembered", line: "Build a brand they come back to." },
]

export interface WebsiteProject {
  slug: string
  name: string
  industry: string
  location: string
  logo: string
  preview: string
  href: string
  work: string[]
}

export const websiteProjects: WebsiteProject[] = [
  {
    slug: "studio-miradia",
    name: "Studio Miradia",
    industry: "Saree Label",
    location: "",
    logo: "/clients/studio-miradia-logo.png",
    preview: "/clients/studio-miradia-site.jpg",
    href: "https://www.instagram.com/studiomiradia/",
    work: ["E-commerce Website", "SEO", "Social Growth"],
  },
  {
    slug: "trilok-omshri-jewels",
    name: "Trilok Omshri Jewels",
    industry: "Jewellery Store",
    location: "Coimbatore",
    logo: "/clients/trilok-omshri-logo.png",
    preview: "/clients/trilok-omshri-1.jpg",
    href: "https://www.instagram.com/trilok_omsrijewel/",
    work: ["Website", "Product Shoots", "Social Growth"],
  },
]
