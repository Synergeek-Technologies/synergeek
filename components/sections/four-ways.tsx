"use client"

import { motion } from "framer-motion"

type Mark = "yes" | "no" | "meh"

const options: Array<{
  title: string
  subtitle: string
  points: Array<[Mark, string]>
  verdict: string
  winner?: boolean
}> = [
  {
    title: "DIY & AI tools",
    subtitle: "A subscription and a prompt",
    points: [
      ["no", "Generic content that reads like every other feed"],
      ["no", "No strategy, no customer mapping, no revenue lens"],
      ["no", "No shoots, no faces, no real brand"],
      ["meh", "Ships fast, into posts nobody asked for"],
    ],
    verdict: "Stalls: volume without enquiries",
  },
  {
    title: "Other agencies",
    subtitle: "The same playbook, every client",
    points: [
      ["no", "Generalists running fashion, clinics, and factories from one template"],
      ["meh", "SEO and ads bolted on as an upsell"],
      ["no", "You meet the founder, then get handed to a junior"],
      ["no", "Reports likes and reach, not who called you"],
    ],
    verdict: "Stalls: generic strategy, borrowed from another industry",
  },
  {
    title: "In-house team",
    subtitle: "Four roles, two quarters",
    points: [
      ["yes", "Knows the product, sits in your meetings"],
      ["yes", "Full control of calendar and voice"],
      ["meh", "Designer, editor, shooter, ads — expensive and slow to hire"],
      ["meh", "SEO and performance still need specialists"],
    ],
    verdict: "Works, at a big payroll and month seven",
  },
  {
    title: "Synergeek",
    subtitle: "Creative + growth · one team",
    points: [
      ["yes", "Strategy, shoots, content, ads, and SEO as one program"],
      ["yes", "A clear plan set before kickoff, reviewed monthly"],
      ["yes", "Content made to rank on Google, AI search, and the feed"],
      ["yes", "Every enquiry traced back to the post or ad that drove it"],
    ],
    verdict: "Plan first · reported monthly",
    winner: true,
  },
]

const markStyles: Record<Mark, { symbol: string; className: string }> = {
  yes: { symbol: "✓", className: "text-primary" },
  no: { symbol: "×", className: "text-[#FF6B5C]" },
  meh: { symbol: "~", className: "text-[#F59E0B]" },
}

export function FourWaysSection() {
  return (
    <section className="bg-black py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-7xl font-bold tracking-tighter mb-16 text-balance"
        >
          Four ways to run your marketing.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, index) => (
            <motion.article
              key={option.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className={`relative rounded-3xl border p-8 flex flex-col ${
                option.winner
                  ? "border-primary/60 bg-gradient-to-b from-primary/15 to-[#14130C]"
                  : "border-white/10 bg-[#111410]"
              }`}
            >
              {option.winner && (
                <motion.span
                  initial={{ scale: 0, rotate: 0 }}
                  whileInView={{ scale: 1, rotate: 6 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.7 }}
                  className="absolute -top-5 right-4 rounded-full border-2 border-primary bg-black px-5 py-2 font-mono text-xs tracking-[0.2em] text-primary"
                >
                  THE WINNER
                </motion.span>
              )}
              <h3 className="text-2xl md:text-3xl font-bold">{option.title}</h3>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/60 mt-3 pb-6 border-b border-white/10">
                {option.subtitle}
              </p>
              <ul className="flex-1">
                {option.points.map(([mark, text]) => (
                  <li key={text} className="flex gap-4 py-5 border-b border-white/10 last:border-b-0 text-white/85 leading-snug">
                    <span className={`font-mono text-lg leading-none ${markStyles[mark].className}`}>{markStyles[mark].symbol}</span>
                    {text}
                  </li>
                ))}
              </ul>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/60 pt-6 mt-4 border-t border-white/15 leading-relaxed">
                {option.verdict}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
