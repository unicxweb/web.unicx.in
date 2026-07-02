"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ease = {
  ui: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hero: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const termSections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: "By accessing and using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services."
  },
  {
    number: "02",
    title: "Services Description",
    content: "Studio UnicX provides web design, development, digital marketing, app engineering, and consulting services. We work directly with clients to design, code, and deploy custom digital solutions tailored to their exact specifications."
  },
  {
    number: "03",
    title: "Client Responsibilities",
    content: "To maintain project momentum and quality, clients agree to provide accurate information, respond promptly to scope approvals, provide necessary creative assets/access in a timely manner, and make payments as outlined in project proposals."
  },
  {
    number: "04",
    title: "Payment Terms",
    content: "Payment terms are specified in individual project proposals. Typically, a deposit is required to initiate work, followed by milestone progress payments, and a final payment due upon completed delivery. All payments are non-refundable."
  },
  {
    number: "05",
    title: "Intellectual Property Rights",
    content: "Upon final payment, clients receive full ownership of the deliverables created specifically for their project. Studio UnicX retains the right to display completed projects in portfolios and marketing materials unless explicitly agreed otherwise in writing."
  },
  {
    number: "06",
    title: "Confidentiality",
    content: "Both parties agree to maintain strict confidentiality of sensitive business strategies, proprietary code, designs, and credentials shared during the course of the project."
  },
  {
    number: "07",
    title: "Limitation of Liability",
    content: "Studio UnicX is not liable for indirect, incidental, or consequential damages (such as profit losses, database issues, or third-party service downtime). Our maximum liability is capped at the amount paid for the specific service phase."
  },
  {
    number: "08",
    title: "Termination",
    content: "Either party may terminate the agreement with written notice. In the event of termination, the client will be billed for all work completed up to the termination date, and any completed deliverables will be transferred upon receipt of payment."
  },
  {
    number: "09",
    title: "Governing Law",
    content: "These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes will be resolved through good faith negotiation and, if necessary, binding arbitration."
  },
  {
    number: "10",
    title: "Contact Legal Team",
    content: "For questions about these Terms of Service, please reach out to our legal team:",
    link: {
      label: "hello@unicx.in",
      href: "mailto:hello@unicx.in"
    }
  }
];

export function TermsClient() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fafafa]">
      <div className="noise-overlay opacity-30 pointer-events-none" />
      <Navbar />

      <div className="font-sans">
        {/* ─── Hero Section (Light Theme) ─── */}
        <section className="relative w-full px-6 pt-40 pb-20 sm:px-8 sm:pt-52 sm:pb-28 lg:px-12 lg:pt-60 lg:pb-32 bg-[#fafafa]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: ease.ui }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="section-dot" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Legal
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.05, ease: ease.hero }}
                  className="text-[clamp(2.5rem,6.8vw,5.3rem)] font-light leading-[0.94] tracking-tight text-zinc-950"
                >
                  Terms of Service
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: ease.ui }}
                  className="mt-6 max-w-2xl text-[15px] leading-7 text-zinc-500 sm:text-[17px] sm:leading-8"
                >
                  These terms govern your relationship with Studio UnicX. By contracting our services or browsing our site, you agree to these legal conditions.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: ease.ui }}
                className="border-l border-zinc-200/80 pl-6 lg:justify-self-end"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-400">
                  Last Updated
                </div>
                <div className="mt-2 text-[20px] font-light tracking-tight text-zinc-950">
                  June 2026
                </div>
                <p className="mt-2 max-w-xs text-[13px] leading-5 text-zinc-400">
                  Applies to all active and future project scopes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Content Section (Dark Theme) ─── */}
        <section className="relative z-10 bg-black text-white py-24 sm:py-32 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-4xl space-y-16">
              {termSections.map((section, index) => (
                <motion.div
                  key={section.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease: ease.ui }}
                  className="grid grid-cols-1 gap-6 md:grid-cols-[80px_1fr] border-t border-white/10 pt-10 first:border-t-0 first:pt-0"
                >
                  <div className="text-[12px] font-mono tracking-widest text-[#fd5200]/80">
                    {section.number}
                  </div>
                  <div>
                    <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-light tracking-tight text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-[15px] leading-7 text-slate-300 font-light max-w-3xl">
                      {section.content}
                    </p>

                    {section.link && (
                      <div className="mt-6">
                        <Link
                          href={section.link.href}
                          className="inline-flex items-center gap-2 border-b border-[#fd5200] pb-0.5 text-[14px] font-medium text-white transition hover:text-[#fd5200]"
                        >
                          {section.link.label}
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 transition-transform duration-300 transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14" />
                            <path d="m13 5 7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
