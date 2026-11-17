"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, EMAIL_TEMPLATE_PARAMS } from "@/lib/emailjs-config"
import { StructuredData } from "@/components/structured-data"
import { LEAD_EVENTS, trackEvent } from "@/lib/analytics"
import { SiteFooter } from "@/components/site-footer"
import { BUSINESS_ID, SITE_URL } from "@/lib/site-config"

export interface ContactPageProps {
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

export function ContactPage({ settings }: ContactPageProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${settings.orgName}`,
    "url": `${SITE_URL}/contact`,
    "about": { "@id": BUSINESS_ID },
    "mainEntity": { "@id": BUSINESS_ID },
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_CONFIG.publicKey)

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        organisation: formData.organisation,
        message: formData.message,
        to_email: EMAIL_TEMPLATE_PARAMS.to_email,
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      )

      if (response.status === 200) {
        trackEvent(LEAD_EVENTS.formSubmit, { form_name: "contact", page_path: "/contact" })
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you as soon as possible.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          organisation: "",
          message: "",
        })
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      toast({
        title: "Failed to Send Message",
        description: "Please try again or contact us directly at company@synergeek.in",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactLetters = "CONTACT".split("")

  return (
    <div ref={containerRef} className="bg-black text-white">
      <StructuredData data={contactStructuredData} />
      {/* Section 1 - Hero */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="h-screen flex items-center justify-center relative"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center">
          <span className="inline-flex">
          {contactLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 + index * 0.05 }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              className="inline-block cursor-pointer"
            >
              {letter}
            </motion.span>
          ))}
          </span>
          {" "}

          <span className="block mt-2 px-6 text-lg md:text-2xl lg:text-3xl font-semibold tracking-normal text-balance text-primary">
            Digital Agency in RS Puram, Coimbatore
          </span>
        </h1>

        <div className="absolute bottom-8 left-8 flex items-center gap-2 text-sm">
          <span>Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>

        <div className="absolute bottom-8 right-8 text-sm">Let's Connect</div>
      </motion.section>

      {/* Section 2 - Contact Form */}
      <motion.section
        ref={formRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="min-h-screen py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="font-condensed text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-16 tracking-tight"
          >
            LET'S GROW YOUR BRAND
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Two-column grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-white/30 py-3 px-0 focus:outline-none focus:border-white transition-colors placeholder:text-white/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="E-mail"
                  className="w-full bg-transparent border-b border-white/30 py-3 px-0 focus:outline-none focus:border-white transition-colors placeholder:text-white/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
              >
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full bg-transparent border-b border-white/30 py-3 px-0 focus:outline-none focus:border-white transition-colors placeholder:text-white/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false }}
              >
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Organisation"
                  className="w-full bg-transparent border-b border-white/30 py-3 px-0 focus:outline-none focus:border-white transition-colors placeholder:text-white/50"
                />
              </motion.div>
            </div>

            {/* Full-width textarea */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell Us About Your Project"
                className="w-full bg-transparent border-b border-white/30 py-3 px-0 focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/50"
              />
            </motion.div>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false }}
              className="flex justify-center pt-8"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 border-2 border-white rounded-full text-white bg-transparent transition-all duration-300 font-medium"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.section>
      <SiteFooter settings={settings} />
    </div>
  )
}
