"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Quote } from "lucide-react"
import { clients, type Client } from "@/lib/clients"

function ClientLogo({ client, size = 56 }: { client: Client; size?: number }) {
  return (
    <span
      className="relative shrink-0 rounded-full overflow-hidden ring-1 ring-white/15 bg-white"
      style={{ width: size, height: size }}
    >
      <Image src={client.logo} alt={`${client.name} logo`} fill sizes={`${size}px`} className="object-cover scale-[1.08]" />
    </span>
  )
}

export function ClientMarquee() {
  const loop = [...clients, ...clients, ...clients]
  return (
    <section className="bg-black border-y border-white/10 py-10 overflow-hidden">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/50 text-center mb-8">
        Brands we&apos;ve built & grown
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black to-transparent" />
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ x: { repeat: Number.POSITIVE_INFINITY, repeatType: "loop", duration: 35, ease: "linear" } }}
          className="flex w-max gap-12"
        >
          {loop.map((client, index) => (
            <div key={`${client.slug}-${index}`} className="flex items-center gap-4">
              <ClientLogo client={client} size={52} />
              <div>
                <p className="text-lg font-semibold whitespace-nowrap">{client.name}</p>
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/50 whitespace-nowrap">
                  {client.industry}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ client, index, featured = false }: { client: Client; index: number; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-[#111] flex flex-col ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[420px] grid grid-cols-2" : "aspect-[4/3]"}`}>
        {(featured ? client.images : [client.images[0]]).map((src, imageIndex) => (
          <div key={src} className="relative h-full min-h-full">
            <Image
              src={src}
              alt={`${client.name} work ${imageIndex + 1}`}
              fill
              sizes={featured ? "(max-width: 1024px) 50vw, 25vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {client.work.map((item) => (
            <span key={item} className="rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] font-medium text-white/90">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className={`relative p-7 md:p-8 flex flex-col flex-1 ${featured ? "lg:justify-center" : ""}`}>
        <Quote className="w-8 h-8 mb-4" style={{ color: client.accent === "#1E2A55" ? "#8EA2E8" : client.accent }} />
        <p className={`leading-snug font-medium text-white ${featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
          &ldquo;{client.testimonial.quote}&rdquo;
        </p>
        <div className="mt-auto pt-8 flex items-center gap-4">
          <ClientLogo client={client} size={48} />
          <div className="min-w-0">
            <p className="font-semibold">{client.testimonial.author}</p>
            <p className="text-sm text-white/50">
              {client.industry} · {client.location}
            </p>
          </div>
          <a
            href={`https://www.instagram.com/${client.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${client.name} on Instagram`}
            className="ml-auto text-white/50 hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function TestimonialsSection() {
  return (
    <section id="clients" className="bg-black py-24 md:py-32 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-5">● In their words</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance">
              Founders who stopped being <span className="text-white/40">scrolled past.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Fashion labels, clinics, developers, and manufacturers — here&apos;s what the people behind them say.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <TestimonialCard key={client.slug} client={client} index={index} featured={index === 0 || index === clients.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
