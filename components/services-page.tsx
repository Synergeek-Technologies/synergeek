"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mail, MapPin, Phone, ArrowUp, Share2, ArrowRight, ArrowUpRight, Plus, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SanityImage } from "@/components/sanity-image"
import { StructuredData } from "@/components/structured-data"
import { clients, getClient } from "@/lib/clients"
import { serviceDetails, serviceStages } from "@/lib/service-details"

export interface ServicesPageProps {
  services: Array<{
    title: string
    description: string
    section: string
  }>
  portfolio: Array<{
    _id: string
    title: string
    description: string
    image: any
    tags: string[]
    aspectRatio: string
    order: number
  }>
  settings: {
    contactEmail: string
    phone1: string
    phone2: string
    address: string
    instagramUrl: string
    orgName: string
    companyDescription: string
  }
}

const processSteps = [
  { when: "Day 1", title: "Discovery call", body: "We learn your business, customers, and what a good month looks like for you." },
  { when: "Week 1–2", title: "Strategy & calendar", body: "Audit, competitor scan, brand direction, and your first month of content planned." },
  { when: "Week 3–4", title: "Shoot & launch", body: "Shoots, reels, and campaigns go live across social, search, and ads." },
  { when: "Every month", title: "Report & refine", body: "Review call on enquiries and sales, then we double down on what works." },
]

const engagements = [
  {
    name: "Monthly Partnership",
    fit: "For brands that want one team running growth",
    includes: ["Strategy & content calendar", "Monthly shoot", "Social media management", "Ads or SEO add-on", "Monthly review call"],
    featured: true,
  },
  {
    name: "Launch Project",
    fit: "For a new brand, collection, or location",
    includes: ["Brand direction", "Launch shoot & reels", "Campaign concept", "4-week launch rollout"],
  },
  {
    name: "Ads & Search Only",
    fit: "For teams that already make content",
    includes: ["Meta & Google Ads", "Local SEO & Google Business Profile", "Lead tracking", "Fortnightly optimisation"],
  },
]

const servicesFaq = [
  {
    question: "Which service should I start with?",
    answer: "Most brands start with social media management plus one monthly shoot. Once the content engine is running, we layer on ads to scale what works, and SEO or Google Business Profile for search demand.",
  },
  {
    question: "Do you handle shoots and video production?",
    answer: "Yes. We plan and run product, collection, clinic, and on-site shoots — including reels, founder-led explainers, and drone walkthroughs.",
  },
  {
    question: "How do you measure results?",
    answer: "We track enquiries, calls, DMs, walk-ins, and sales from each channel — not just likes and reach — and walk you through it every month.",
  },
  {
    question: "Can I combine services?",
    answer: "Yes. Most clients combine social media with shoots, ads, or SEO. We build the package around your goal and budget instead of a fixed plan.",
  },
  {
    question: "Do you take one-time projects?",
    answer: "Yes. Brand launches, collection shoots, festive campaigns, and SEO projects — many of which turn into ongoing partnerships.",
  },
]

const condensed = { fontFamily: "var(--font-condensed)" }

export function ServicesPage({ services, portfolio, settings }: ServicesPageProps) {
  const letters = "SERVICES".split("")
  const [activeService, setActiveService] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${settings.orgName} - Creative Marketing Services`,
    "description": settings.companyDescription || "Synergeek is a creative marketing agency in India turning social media, ads, and content into measurable growth.",
    "provider": {
      "@type": "Organization",
      "name": settings.orgName,
      "url": "https://www.synergeek.in",
      "logo": "https://www.synergeek.in/synergeek-logo.png"
    },
    "serviceType": "Creative Marketing & Growth",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Core Services",
      "itemListElement": services.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description,
        }
      }))
    }
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": servicesFaq.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <StructuredData data={servicesStructuredData} />
      <StructuredData data={faqStructuredData} />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8">
              <span className="block text-balance flex justify-center gap-1">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + index * 0.08,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.3 },
                    }}
                    className="inline-block cursor-pointer text-white"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-md md:text-lg mt-[-30px] lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed text-balance"
            style={{ fontFamily: "var(--font-roboto-condensed)" }}
          >
            {settings.companyDescription || "A creative marketing agency that turns content, ads, and social into customers — every day."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
          >
            {services.map((service, index) => (
              <a
                key={service.title}
                href="#our-services"
                onClick={() => setActiveService(index)}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:border-primary hover:text-primary"
              >
                {service.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="our-services" className="relative bg-black scroll-mt-20">
        <div className="relative z-10 flex items-center justify-center py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-7xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - "OUR SERVICES" Text */}
              <div className="lg:w-[40%] bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between gap-10">
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] text-black"
                  style={condensed}
                >
                  <span className="block">OUR</span>
                  <span className="block">SERVICES</span>
                </h2>
                <p className="text-gray-500 max-w-xs leading-relaxed">
                  Six services, one team. Pick one to start, or combine them into a single growth plan.
                </p>
              </div>

              {/* Right Side - Expandable Services List */}
              <div className="lg:w-[60%] bg-white p-6 md:p-8 lg:p-12 xl:p-16">
                {services.map((service, index) => {
                  const detail = serviceDetails[service.title]
                  const client = detail ? getClient(detail.clientSlug) : undefined
                  const isOpen = activeService === index
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="border-b border-gray-200"
                    >
                      <button
                        onClick={() => setActiveService(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        className="group w-full flex items-center gap-4 md:gap-6 py-5 md:py-6 text-left"
                      >
                        <span className="text-2xl md:text-3xl text-gray-300 tabular-nums w-10" style={condensed}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={`flex-1 text-lg md:text-xl lg:text-2xl font-medium transition-colors ${isOpen ? "text-black" : "text-gray-700 group-hover:text-black"}`}>
                          {service.title}
                        </span>
                        <span className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-primary text-black" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}>
                          <Plus className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-8 md:pl-16 grid sm:grid-cols-[1fr_auto] gap-6">
                              <div>
                                <p className="text-gray-900 text-lg leading-relaxed">{detail?.outcome ?? service.description}</p>
                                {detail && <p className="mt-2 text-gray-500">{service.description}</p>}
                                {detail && (
                                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                    {detail.deliverables.map((item) => (
                                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              {client && (
                                <div className="relative w-32 sm:w-36 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
                                  <Image src={client.images[0]} alt={`${client.name} work`} fill sizes="144px" className="object-cover object-top" />
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                    <span className="block text-[11px] text-white/70">Seen in</span>
                                    <span className="block text-sm font-semibold text-white leading-tight">{client.name}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Growth Stages */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 text-center"
            style={condensed}
          >
            HOW IT ALL FITS
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-center mb-14">
            Every service plays one role in the same funnel — from the first search to the repeat order.
          </p>
          <div className="space-y-4">
            {serviceStages.map((stage, index) => {
              const stageServices = services.filter((service) => service.section === stage.key)
              return (
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className={`mx-auto rounded-[28px] p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 ${
                    ["bg-primary text-black w-full", "bg-white text-black md:w-[88%]", "bg-[#1A1A1A] text-white border border-white/10 md:w-[76%]"][index]
                  }`}
                >
                  <div className="md:w-[42%] shrink-0">
                    <span className="text-sm font-mono opacity-60">Stage {index + 1}</span>
                    <h3 className="text-5xl md:text-6xl leading-none mt-1 md:whitespace-nowrap" style={condensed}>
                      {stage.label.toUpperCase()}
                    </h3>
                    <p className="mt-2 opacity-70">{stage.line}</p>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-3">
                    {stageServices.map((service) => (
                      <span
                        key={service.title}
                        className={`rounded-full px-5 py-3 text-base font-medium ${index === 2 ? "bg-white/10" : "bg-black/[0.07]"}`}
                      >
                        {service.title}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-black py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9]"
              style={condensed}
            >
              KICKOFF TO<br />
              <span className="text-primary">FIRST RESULTS</span>
            </motion.h2>
            <p className="text-gray-400 max-w-sm text-lg">No six-month onboarding. Here&apos;s what your first month with us looks like.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[28px] overflow-hidden">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-black p-8 md:p-10 min-h-[300px] flex flex-col hover:bg-[#111] transition-colors"
              >
                <span className="text-7xl md:text-8xl text-white/10 group-hover:text-primary transition-colors leading-none" style={condensed}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-auto pt-8 text-sm font-mono text-primary">{step.when}</span>
                <h3 className="text-2xl font-semibold text-white mt-2">{step.title}</h3>
                <p className="text-gray-400 mt-3 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative min-h-screen bg-black py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Portfolio Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
              style={condensed}
            >
              PORTFOLIO
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Campaigns, content, and brand work we've shipped for our partners.
            </p>
          </motion.div>

          {/* Portfolio Grid - Masonry Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {portfolio.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{
                  opacity: 0,
                  y: -200,
                  scale: 0.8,
                  rotateX: -90
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  mass: 0.8,
                  bounce: 0.3
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="break-inside-avoid mb-4 group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
                  initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                  whileInView={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    transition: { duration: 0.8, delay: index * 0.1 }
                  }}
                >
                  {/* Portfolio Image */}
                  <div
                    className="w-full relative overflow-hidden"
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    <SanityImage
                      source={item.image}
                      alt={item.image?.alt || item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Hover overlay - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white w-full">
                        <h4 className="font-bold text-xl mb-2 drop-shadow-lg">{item.title}</h4>
                        <p className="text-sm text-gray-100 mb-3 leading-relaxed drop-shadow-md">
                          {item.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {(item.tags ?? []).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full shadow-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients by Service */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-14 text-center"
            style={condensed}
          >
            WHO WE DO IT FOR
          </motion.h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {clients.map((client, index) => (
              <motion.a
                key={client.slug}
                href={`https://www.instagram.com/${client.handle}/`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1.2fr_2fr_auto] items-center gap-4 md:gap-8 py-5 md:py-6"
              >
                <span className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white ring-1 ring-white/15">
                  <Image src={client.logo} alt={`${client.name} logo`} fill sizes="56px" className="object-cover scale-[1.08]" />
                </span>
                <div>
                  <p className="text-2xl md:text-4xl text-white group-hover:text-primary transition-colors leading-none" style={condensed}>
                    {client.name.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{client.industry} · {client.location}</p>
                </div>
                <div className="hidden md:flex flex-wrap gap-2">
                  {client.work.map((item) => (
                    <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-sm text-gray-300">
                      {item}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-primary group-hover:rotate-45 transition-all" />
                <div className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 w-28 aspect-[4/5] rounded-xl overflow-hidden opacity-0 scale-90 rotate-6 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 hidden lg:block z-10 shadow-2xl">
                  <Image src={client.images[1]} alt={`${client.name} work`} fill sizes="112px" className="object-cover" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 text-center"
            style={condensed}
          >
            WAYS TO WORK WITH US
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-center mb-14">
            Every plan is quoted around your goal and budget — start small and grow from there.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {engagements.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-[28px] p-8 md:p-10 flex flex-col ${plan.featured ? "bg-primary text-black" : "bg-white text-black"}`}
              >
                {plan.featured && (
                  <span className="self-start rounded-full bg-black text-primary px-3 py-1 text-xs font-semibold mb-4">Most chosen</span>
                )}
                <h3 className="text-4xl md:text-5xl leading-none" style={condensed}>
                  {plan.name.toUpperCase()}
                </h3>
                <p className="mt-3 text-black/60">{plan.fit}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-transform hover:scale-[1.02] ${
                    plan.featured ? "bg-black text-white" : "bg-black/[0.06] text-black hover:bg-black/10"
                  }`}
                >
                  Get a quote <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto bg-white rounded-[32px] overflow-hidden flex flex-col lg:flex-row"
        >
          <div className="lg:w-[40%] p-8 md:p-12 lg:p-16">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.85] text-black" style={condensed}>
              <span className="block">GOT</span>
              <span className="block">QUESTIONS?</span>
            </h2>
          </div>
          <div className="lg:w-[60%] p-6 md:p-8 lg:p-12 xl:p-16">
            {servicesFaq.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div key={item.question} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left"
                  >
                    <h3 className="text-lg md:text-xl font-medium text-gray-900">{item.question}</h3>
                    <span className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-primary text-black" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}>
                      <Plus className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden text-gray-600 leading-relaxed pr-12"
                      >
                        <span className="block pb-6">{item.answer}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-black px-6 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.82]"
            style={condensed}
          >
            LET&apos;S GROW<br />YOUR BRAND
          </motion.h2>
          <div className="lg:max-w-sm">
            <p className="text-lg text-black/70 mb-6">
              Tell us where you want to be in 90 days. We&apos;ll come back with a plan and a quote — free.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black text-white px-8 py-4 text-base font-semibold transition-transform hover:scale-[1.03]"
            >
              Book a free strategy call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white relative z-20">
        {/* Upper Tier - Contact Information */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="mb-4">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-yellow-500 transition-colors" />
                </motion.div>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-base md:text-lg hover:text-yellow-500 transition-colors"
                >
                  {settings.contactEmail}
                </a>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="mb-4">
                  <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-yellow-500 transition-colors" />
                </motion.div>
                <p className="text-base md:text-lg max-w-xs">{settings.address}</p>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="mb-4">
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-yellow-500 transition-colors" />
                </motion.div>
                <div className="space-y-1">
                  <a
                    href={`tel:${settings.phone1?.replace(/\s/g, '')}`}
                    className="block text-base md:text-lg hover:text-yellow-500 transition-colors"
                  >
                    {settings.phone1}
                  </a>
                  <a
                    href={`tel:${settings.phone2?.replace(/\s/g, '')}`}
                    className="block text-base md:text-lg hover:text-yellow-500 transition-colors"
                  >
                    {settings.phone2}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Lower Tier - Footer Bar */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Back Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm md:text-base hover:text-yellow-500 transition-colors group"
              >
                <span>Back Top</span>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
                  <ArrowUp className="w-4 h-4 group-hover:text-yellow-500 transition-colors" />
                </motion.div>
              </motion.button>

              {/* Copyright */}
              <p className="text-sm md:text-base text-gray-400 text-center">
                2026 {settings.orgName}. All rights reserved.
              </p>

              {/* Follow Us */}
              <Link href={settings.instagramUrl || '#'} target="_blank" className="flex items-center gap-2 text-sm md:text-base hover:text-yellow-500 transition-colors group">
                <span>Follow Us</span>
                <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.3 }}>
                  <Share2 className="w-4 h-4 group-hover:text-yellow-500 transition-colors" />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
