"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowRight, ArrowUp, Check, RotateCcw } from "lucide-react"

const PROMPT = "Best dental clinic in Erode for jaw pain?"

const assistants = ["ChatGPT", "Gemini", "Perplexity", "Claude", "Copilot", "Google AI"]

const proofPoints = ["Founder-led", "SEO + content + links, one team", "Built for local & national brands", "Graded on enquiries, not traffic"]

type Phase = "typing" | "thinking" | "before" | "after"

export function AiSearchSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const [run, setRun] = useState(0)
  const [typed, setTyped] = useState("")
  const [phase, setPhase] = useState<Phase>("typing")

  useEffect(() => {
    if (!inView) return
    setTyped("")
    setPhase("typing")
    const timers: ReturnType<typeof setTimeout>[] = []
    PROMPT.split("").forEach((_, index) => {
      timers.push(setTimeout(() => setTyped(PROMPT.slice(0, index + 1)), 40 * (index + 1)))
    })
    const typedAt = 40 * PROMPT.length
    timers.push(setTimeout(() => setPhase("thinking"), typedAt + 300))
    timers.push(setTimeout(() => setPhase("before"), typedAt + 1500))
    timers.push(setTimeout(() => setPhase("after"), typedAt + 5000))
    return () => timers.forEach(clearTimeout)
  }, [inView, run])

  const showResults = phase === "before" || phase === "after"
  const ranked = phase === "after"
    ? ["You", "Competitor 1", "Competitor 2", "Competitor 3"]
    : ["Competitor 1", "Competitor 2", "Competitor 3"]

  return (
    <section className="relative bg-black py-24 md:py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <div className="absolute -right-40 top-1/3 w-[520px] h-[520px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-white/80 mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary" /> SEO & AI search agency
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.02] text-balance">
            Be the brand AI recommends when buyers ask.
          </h2>
          <p className="mt-8 font-mono text-sm md:text-base tracking-[0.12em] uppercase leading-relaxed text-white/70">
            Your customers now ask ChatGPT and Google AI before they ask a friend. We{" "}
            <span className="text-primary font-semibold">map</span> the prompts that end in a shortlist, then build the
            content, reviews, and links that get you <span className="text-primary font-semibold">cited</span> — and we
            report on enquiries, not keywords.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Free AI Visibility Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#clients"
              className="inline-flex items-center rounded-full border border-primary/70 px-8 py-4 text-base font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              See Client Work
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-[0.15em] uppercase text-white/60">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary" /> {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl border border-primary/40 bg-[#0B0D0A] shadow-[0_0_60px_rgba(234,179,8,0.08)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 font-mono text-xs md:text-sm">
            <div className="flex items-center gap-3 text-white/80">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
                <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
              </span>
              AI Assistant · The buying prompt
            </div>
            <button
              onClick={() => setRun((value) => value + 1)}
              className="flex items-center gap-1.5 tracking-[0.2em] text-primary hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> REPLAY
            </button>
          </div>

          <div className="p-6 md:p-8 min-h-[420px]">
            <p className="text-center text-2xl md:text-3xl font-bold text-white/25 mb-6">Where should we begin?</p>
            <div className="flex items-center gap-3 rounded-full border-2 border-primary/80 px-5 py-3.5">
              <span className="text-white/60">+</span>
              <span className="flex-1 text-white/90 text-sm md:text-base truncate">
                {typed}
                {phase === "typing" && <span className="inline-block w-0.5 h-4 bg-white/80 ml-0.5 align-middle animate-pulse" />}
              </span>
              <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                <ArrowUp className="w-4 h-4" />
              </span>
            </div>

            <p className="font-mono text-xs text-white/50 mt-6 mb-4 h-4">
              {phase === "thinking" && "Thinking…"}
              {showResults && "Thought for 3s ›"}
            </p>

            <div className="space-y-2.5">
              <AnimatePresence mode="popLayout">
                {showResults &&
                  ranked.map((name, index) => {
                    const isYou = name === "You"
                    return (
                      <motion.div
                        layout
                        key={name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.12 }}
                        className={`flex items-center gap-4 rounded-2xl px-4 py-3 ${isYou ? "border border-primary/60 bg-primary/10" : ""}`}
                      >
                        <span className="w-7 h-7 rounded-full border border-white/20 font-mono text-xs flex items-center justify-center text-white/70">
                          {index + 1}
                        </span>
                        <span className={`w-5 h-5 rounded ${isYou ? "bg-primary" : "bg-white/10"}`} />
                        <span className={`font-mono text-sm ${isYou ? "text-white font-semibold" : "text-white/80"}`}>{name}</span>
                        {isYou ? (
                          <span className="ml-auto rounded-full border border-primary px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-primary">
                            RECOMMENDED
                          </span>
                        ) : (
                          <span className="h-2 rounded-full bg-white/10" style={{ width: `${30 + ((index * 17) % 25)}%` }} />
                        )}
                      </motion.div>
                    )
                  })}
              </AnimatePresence>

              {phase === "before" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/15 px-4 py-3"
                >
                  <span className="w-7 h-7 rounded-full border border-white/20 font-mono text-xs flex items-center justify-center text-white/50">
                    –
                  </span>
                  <span className="w-5 h-5 rounded bg-primary" />
                  <span className="font-semibold text-white">You</span>
                  <span className="ml-auto rounded-full border border-[#FF5C5C]/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#FF7A7A]">
                    NOT MENTIONED
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 px-6 md:px-8 py-4 font-mono text-xs md:text-sm tracking-[0.25em] text-white/70">
            {phase === "after" ? "DAY 90 · AFTER SYNERGEEK" : "DAY 0 · BASELINE SCAN"}
          </div>
          <div className="border-t border-white/10 px-6 md:px-8 py-5">
            <p className="font-mono text-xs tracking-[0.25em] text-primary mb-3">TRACKED ACROSS ALL MAJOR AI ASSISTANTS</p>
            <div className="flex flex-wrap gap-2">
              {assistants.map((name) => (
                <span key={name} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/70">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
