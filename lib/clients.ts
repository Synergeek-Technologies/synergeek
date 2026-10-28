export interface Client {
  slug: string
  name: string
  handle: string
  industry: string
  location: string
  logo: string
  images: [string, string]
  accent: string
  work: string[]
  testimonial: {
    quote: string
    author: string
  }
}

export const clients: Client[] = [
  {
    slug: "velvette-martini",
    name: "Velvette Martini",
    handle: "velvette.martini",
    industry: "Luxury Fusion Wear",
    location: "Coimbatore",
    logo: "/clients/velvette-martini-logo.png",
    images: ["/clients/velvette-martini-1.jpg", "/clients/velvette-martini-2.jpg"],
    accent: "#C9A46A",
    work: ["Collection Shoots", "Launch Campaigns", "Social Content"],
    testimonial: {
      quote: "They shot our collections like a luxury label. Every drop now sells out in the DMs.",
      author: "Founder, Velvette Martini",
    },
  },
  {
    slug: "jwaala",
    name: "Jwaala",
    handle: "the_jwaala_",
    industry: "Women's Ethnic Wear",
    location: "Coimbatore",
    logo: "/clients/jwaala-logo.png",
    images: ["/clients/jwaala-1.jpg", "/clients/jwaala-2.jpg"],
    accent: "#9B2C2C",
    work: ["Brand Identity", "Product Shoots", "Instagram Growth"],
    testimonial: {
      quote: "Synergeek gave Jwaala a look that finally matches the clothes. Customers recognise us instantly.",
      author: "Founder, Jwaala by Kreative Sketch",
    },
  },
  {
    slug: "dentiq",
    name: "DentiQ",
    handle: "dentiq_erode",
    industry: "Dental & TMJ Clinic",
    location: "Erode",
    logo: "/clients/dentiq-logo.png",
    images: ["/clients/dentiq-1.jpg", "/clients/dentiq-2.jpg"],
    accent: "#7AB648",
    work: ["Doctor-led Reels", "Patient Education", "Local SEO"],
    testimonial: {
      quote: "Patients walk in saying they saw our videos. The content explains what I do better than I could.",
      author: "Lead Dentist, DentiQ Erode",
    },
  },
  {
    slug: "kumaraguru-properties",
    name: "Kumaraguru Properties",
    handle: "kumaraguruproperties_",
    industry: "Real Estate Developer",
    location: "Coimbatore",
    logo: "/clients/kumaraguru-logo.png",
    images: ["/clients/kumaraguru-1.jpg", "/clients/kumaraguru-2.jpg"],
    accent: "#1F4FA3",
    work: ["Drone Walkthroughs", "Meta Lead Ads", "Site-visit Funnels"],
    testimonial: {
      quote: "The drone reels and lead ads keep our site-visit calendar full. Serious buyers, not window shoppers.",
      author: "Managing Director, Kumaraguru Properties",
    },
  },
  {
    slug: "no1-fence",
    name: "No.1 Fence",
    handle: "no1fence",
    industry: "Fencing Manufacturer",
    location: "Coimbatore",
    logo: "/clients/no1fence-logo.png",
    images: ["/clients/no1fence-1.jpg", "/clients/no1fence-2.jpg"],
    accent: "#E0157A",
    work: ["Customer Stories", "Factory Reels", "B2B Lead Generation"],
    testimonial: {
      quote: "They turned a factory into a story. Enquiries now come from across India, not just Coimbatore.",
      author: "Owner, No.1 Fence",
    },
  },
  {
    slug: "fd-sports",
    name: "FD Sports Infra",
    handle: "fdsports.in",
    industry: "Sports Infrastructure",
    location: "Tamil Nadu",
    logo: "/clients/fdsports-logo.png",
    images: ["/clients/fdsports-1.jpg", "/clients/fdsports-2.jpg"],
    accent: "#F2171B",
    work: ["Aerial Videography", "Project Showcases", "Paid Social"],
    testimonial: {
      quote: "Our turfs look world-class on camera now. Clients call us after watching a single reel.",
      author: "Founder, FD Sports Infra",
    },
  },
  {
    slug: "yalee",
    name: "Yalee",
    handle: "yalee.india",
    industry: "Handloom Ethnic Wear",
    location: "India",
    logo: "/clients/yalee-logo.png",
    images: ["/clients/yalee-1.jpg", "/clients/yalee-2.jpg"],
    accent: "#1E2A55",
    work: ["Brand Launch", "Festive Campaigns", "WhatsApp Commerce"],
    testimonial: {
      quote: "From the first post, Yalee felt premium. Our festive sale did better than we planned.",
      author: "Co-founder, Yalee",
    },
  },
]

export function getClient(slug: string) {
  return clients.find((client) => client.slug === slug)!
}
