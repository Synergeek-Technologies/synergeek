"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const steps = [
  { title: "Audit & Strategy", chips: ["Platform Analysis", "Competitor Benchmarks", "Customer Mapping"] },
  { title: "Content Production", chips: ["Calendar", "Design", "Copywriting", "Shoots & Video"] },
  { title: "Publishing & Engagement", chips: ["Scheduling", "Community Management", "DMs & Enquiries"] },
  { title: "Measure & Optimise", chips: ["Lead Attribution", "Engagement Metrics", "A/B Tests"] },
]

const cardStyles = [
  "border-neutral-300",
  "border-neutral-400",
  "border-neutral-700 shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
  "border-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
]

export function ExecutionWorkflowSection() {
  return (
    <section className="bg-white text-neutral-900 py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance">Social Media Execution Workflow</h2>
          <p className="mt-6 text-lg text-neutral-600 text-balance">
            From strategy to lead attribution — social media that drives business outcomes, not just likes.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.18 }}
                className={`relative flex-1 border bg-white px-6 pt-14 pb-10 text-center ${cardStyles[index]}`}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 + index * 0.18 }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#FF5C5C] text-white text-2xl flex items-center justify-center"
                >
                  {index + 1}
                </motion.span>
                <h3 className="text-2xl font-bold text-[#FF3B3B] mb-8 text-balance">{step.title}</h3>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {step.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm text-neutral-700">
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.18 }}
                  className="flex items-center justify-center lg:px-5 text-neutral-400"
                >
                  <ArrowRight className="w-8 h-8 rotate-90 lg:rotate-0" strokeWidth={1.5} />
                </motion.div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
