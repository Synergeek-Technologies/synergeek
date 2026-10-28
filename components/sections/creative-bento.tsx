"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { getClient } from "@/lib/clients"

const velvette = getClient("velvette-martini")
const jwaala = getClient("jwaala")
const dentiq = getClient("dentiq")
const kumaraguru = getClient("kumaraguru-properties")
const no1fence = getClient("no1-fence")
const fdsports = getClient("fd-sports")
const yalee = getClient("yalee")

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[22px] border-[5px] border-neutral-900 bg-neutral-900 shadow-2xl ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[17px]">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10 h-3 w-12 rounded-full bg-neutral-900" />
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
      </div>
    </div>
  )
}

function AdCard({ src, alt, label, className = "" }: { src: string; alt: string; label: string; className?: string }) {
  return (
    <div className={`rounded-xl bg-white p-2 shadow-xl ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image src={src} alt={alt} fill sizes="160px" className="object-cover" />
      </div>
      <div className="pt-2 px-1">
        <span className="block text-[10px] font-semibold text-neutral-900 truncate">{label}</span>
        <span className="block text-[8px] text-neutral-500">Sponsored</span>
      </div>
    </div>
  )
}

const cardMotion = (index: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: index * 0.08 },
})

export function CreativeBentoSection() {
  return (
    <section className="bg-[#F6F5F0] text-neutral-900 py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...cardMotion(0)} className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-500 mb-5">Made for social</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance leading-[1.05]">
            Social media creative built for{" "}
            <span className="font-serif italic font-normal tracking-normal">every platform and goal</span>
          </h2>
          <p className="mt-6 text-neutral-600 text-lg text-balance">
            Our creative team ships scroll-stopping content, ads, and video that drive clicks, shares, and walk-ins —
            for brands like the ones below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {/* Organic social */}
          <motion.div
            {...cardMotion(1)}
            className="relative md:col-span-6 lg:col-span-6 h-[420px] rounded-3xl overflow-hidden bg-[#3B2A1E] text-white"
          >
            <Image
              src={velvette.images[0]}
              alt={`${velvette.name} collection shoot`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="relative p-8 max-w-sm">
              <h3 className="text-2xl font-semibold mb-3">Organic social content</h3>
              <p className="text-white/80 leading-relaxed">
                Storytelling that builds a following — from editorial collection shoots to educational reel series.
              </p>
            </div>
            <Phone
              src={velvette.images[1]}
              alt={`${velvette.name} reel`}
              className="absolute bottom-6 right-8 w-36 h-64 rotate-[8deg]"
            />
            <span className="absolute bottom-6 left-8 font-mono text-[11px] tracking-widest uppercase text-white/70">
              @{velvette.handle}
            </span>
          </motion.div>

          {/* Paid social */}
          <motion.div
            {...cardMotion(2)}
            className="relative md:col-span-3 lg:col-span-3 h-[420px] rounded-3xl overflow-hidden bg-[#2563EB] text-white"
          >
            <div className="p-7">
              <h3 className="text-2xl font-semibold mb-3">Paid social ads</h3>
              <p className="text-white/85 leading-relaxed text-[15px]">
                Test new ideas, multiply what works, and keep the algorithm happy with every size and format.
              </p>
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-end gap-2 px-3">
              <AdCard src={kumaraguru.images[0]} alt={kumaraguru.name} label={kumaraguru.name} className="w-24 -rotate-6 translate-y-2" />
              <AdCard src={no1fence.images[0]} alt={no1fence.name} label={no1fence.name} className="w-28 z-10" />
              <AdCard src={yalee.images[1]} alt={yalee.name} label={yalee.name} className="w-24 rotate-6 translate-y-2" />
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            {...cardMotion(3)}
            className="relative md:col-span-3 lg:col-span-3 h-[420px] rounded-3xl overflow-hidden bg-[#FFD60A]"
          >
            <div className="p-7 relative z-10">
              <h3 className="text-2xl font-semibold mb-3">Video & reels</h3>
              <p className="text-neutral-800 leading-relaxed text-[15px]">
                Doctor-led explainers, UGC-style testimonials, and drone walkthroughs.
              </p>
            </div>
            <Phone
              src={fdsports.images[0]}
              alt={`${fdsports.name} turf reel`}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-72 -rotate-[4deg]"
            />
          </motion.div>

          {/* Expert-led content */}
          <motion.div
            {...cardMotion(4)}
            className="relative md:col-span-3 lg:col-span-3 h-[420px] rounded-3xl overflow-hidden bg-[#141821] text-white"
          >
            <div className="p-7">
              <h3 className="text-2xl font-semibold mb-3">Expert-led content</h3>
              <p className="text-white/75 leading-relaxed text-[15px]">
                We put founders and specialists on camera — and turn their expertise into trust.
              </p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-44 rounded-2xl overflow-hidden border border-white/10">
              <Image src={dentiq.images[0]} alt={`${dentiq.name} doctor reel`} fill sizes="300px" className="object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <span className="text-sm font-medium">{dentiq.name} · {dentiq.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Campaign concepts */}
          <motion.div
            {...cardMotion(5)}
            className="relative md:col-span-3 lg:col-span-3 h-[420px] rounded-3xl overflow-hidden bg-neutral-800 text-white"
          >
            <Image
              src={jwaala.images[1]}
              alt={`${jwaala.name} campaign`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/10 to-transparent" />
            <div className="relative p-7">
              <h3 className="text-2xl font-semibold mb-3">Campaign concepts</h3>
              <p className="text-white/85 leading-relaxed text-[15px]">
                Make every asset more impactful — connected by one big campaign idea.
              </p>
            </div>
          </motion.div>

          {/* Aerial & immersive */}
          <motion.div
            {...cardMotion(6)}
            className="relative md:col-span-6 lg:col-span-6 h-[420px] rounded-3xl overflow-hidden bg-[#FF5C1F] text-white"
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: "linear-gradient(115deg, transparent 30%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.35) 55%, transparent 55%)" }}
            />
            <div className="relative p-8 max-w-md">
              <h3 className="text-2xl font-semibold mb-3">Aerial & immersive experiences</h3>
              <p className="text-white/85 leading-relaxed">
                Scroll-breaking drone cinematography, location reveals, and interactive formats that make people stop.
              </p>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-4">
              <Phone src={kumaraguru.images[1]} alt={`${kumaraguru.name} drone reel`} className="w-32 h-56 -rotate-6 translate-y-6 hidden sm:block" />
              <Phone src={fdsports.images[1]} alt={`${fdsports.name} aerial reel`} className="w-40 h-72 translate-y-8" />
              <Phone src={no1fence.images[1]} alt={`${no1fence.name} factory reel`} className="w-32 h-56 rotate-6 translate-y-6 hidden sm:block" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
