"use client"

import { motion } from "framer-motion"
import { Telescope, Target } from "lucide-react"

const motions = [
  {
    tag: "PLG",
    title: "Product Led Growth",
    problem:
      "Product-led growth has a specific marketing problem. The product sells itself once someone tries it. The gap is getting the right buyers into the trial in the first place.",
    solution:
      "We build SEO, content, and paid systems for PLG companies — designed to capture buyers already evaluating solutions and get them into your product before a competitor does.",
    icon: Telescope,
    color: "#7C3AED",
    art: "Spotting buyers before they shortlist",
  },
  {
    tag: "SLG",
    title: "Sales Led Growth",
    problem:
      "Sales-led growth has a different problem. The sales team can close. What they need is a pipeline worth working.",
    solution:
      "We build paid and organic systems for SLG companies — designed around your real customer profile and buying triggers, so what reaches sales is qualified and worth picking up the phone for.",
    icon: Target,
    color: "#FF5C5C",
    art: "Every lead aimed at your ideal customer",
  },
]

export function GrowthMotionSection() {
  return (
    <section className="bg-black py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">● Two motions, two playbooks</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance">
            How your company grows <span className="text-white/40">shapes how we work.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            PLG and SLG aren&apos;t just labels. They represent fundamentally different marketing problems. We build the
            strategy around your motion, not a standard playbook.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {motions.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.tag}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col"
              >
                <div
                  className="relative h-56 md:h-64 overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div className="absolute bottom-0 left-8 right-8 flex items-end gap-3 h-32">
                    {[30, 45, 60, 78, 100].map((height, barIndex) => (
                      <motion.div
                        key={barIndex}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + barIndex * 0.08 }}
                        className="flex-1 rounded-t-md bg-black/25"
                      />
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    className="relative z-10 w-24 h-24 rounded-2xl bg-white shadow-2xl flex items-center justify-center rotate-6 transition-transform"
                  >
                    <Icon className="w-12 h-12" style={{ color: item.color }} strokeWidth={1.75} />
                  </motion.div>
                  <span className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.25em] uppercase text-white/90">
                    {item.art}
                  </span>
                  <span className="absolute top-4 right-5 rounded-full border border-white/60 px-3 py-1 font-mono text-xs text-white">
                    {item.tag}
                  </span>
                </div>
                <div className="p-8 md:p-10 flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-5">
                    {item.title} <span className="text-white/40">({item.tag})</span>
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-4">{item.problem}</p>
                  <p className="text-muted-foreground leading-relaxed">{item.solution}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
