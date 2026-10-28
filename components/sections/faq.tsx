"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"

export function FaqSection({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-6 bg-[#161616]"
      style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0 2px, transparent 2px 6px)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 text-[#F2EFE6]"
        >
          FAQs
        </motion.h2>
        <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <AccordionPrimitive.Item value={`faq-${index}`} className="bg-[#2E2E2E] data-[state=open]:bg-[#333]">
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 px-6 md:px-14 py-6 md:py-8 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <h3 className="text-lg md:text-2xl text-[#F2EFE6]">{item.question}</h3>
                    <span className="shrink-0 w-11 h-11 bg-black flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-black group-data-[state=open]:bg-primary group-data-[state=open]:text-black">
                      <Plus className="w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-6 md:px-14 pb-8 max-w-4xl text-white/70 text-base md:text-lg leading-relaxed">{item.answer}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            </motion.div>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
