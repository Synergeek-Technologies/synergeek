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
