"use client"

import { motion } from "framer-motion"
import { CornerDownRight } from "lucide-react"

const oldWay = [
  "Nobody owns the growth number",
  "Posting for the sake of posting",
  "Ads, SEO, and content optimised in silos",
  "Freelancers you have to chase every week",
  "You can't tell which post brought the customer",
  "More time managing vendors than growing",
]

const newWay = [
  "We own the outcome, not just the activity",
  "Strategy, shoot, edit, and ads — run end to end",
  "Every channel pulls toward the same lead number",
  "Content shot like a brand, built to sell",
  "Clear reporting on what drove every enquiry",
  "One team, one point of contact, one outcome",
]

function DottedRule({ color }: { color: string }) {
  return (
    <div
      className="h-1.5 w-full my-8"
      style={{ backgroundImage: `radial-gradient(${color} 2.5px, transparent 3px)`, backgroundSize: "26px 6px" }}
    />
  )
}

function List({ items, delay }: { items: string[]; delay: number }) {
  return (
    <ul className="space-y-5">
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + index * 0.07 }}
          className="flex items-start gap-4 text-lg md:text-xl"
        >
          <CornerDownRight className="w-5 h-5 mt-1 shrink-0 text-[#FFD60A]" />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

export function OldVsNewSection() {
  return (
    <section className="bg-[#FFD60A] pt-16 md:pt-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#2E2E2E] text-white p-8 md:p-12 lg:mt-28"
        >
          <span className="inline-block rounded-full border border-white/70 px-4 py-1.5 text-xs font-semibold tracking-wider">
            OLD WAY
          </span>
          <DottedRule color="#111" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
            The Old
            <br />
            Model
          </h2>
          <div className="h-px bg-white/15 my-10" />
          <List items={oldWay} delay={0.1} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative bg-[#76766A] text-white p-8 md:p-12 pb-40"
        >
          <span className="inline-block rounded-full border border-[#FFD60A] text-[#FFD60A] px-4 py-1.5 text-xs font-semibold tracking-wider">
            NEW WAY
          </span>
          <DottedRule color="#1E293B" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-[#FFD60A]">
            The Synergeek
            <br />
            Model
          </h2>
          <div className="h-px bg-white/20 my-10" />
          <List items={newWay} delay={0.25} />

          <motion.div
            initial={{ rotate: 20, y: 80, opacity: 0 }}
            whileInView={{ rotate: -6, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.6 }}
            className="absolute bottom-0 right-8 w-32 rounded-t-2xl border-4 border-white bg-black px-3 pt-4 pb-8 text-center shadow-2xl"
          >
            <span className="block font-mono text-[11px] tracking-[0.25em] text-[#FF5C5C]">POLE</span>
            <span className="block text-6xl font-black text-white leading-none my-1">1</span>
            <span className="block font-mono text-[10px] tracking-[0.2em] text-[#FFD60A]">SYNERGEEK</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
