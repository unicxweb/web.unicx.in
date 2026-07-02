"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ContactPopup } from "@/components/ContactPopup";

const trustMarks = [
  { label: "Strategy", mark: "ST" },
  { label: "Design", mark: "DS" },
  { label: "Websites", mark: "WB" },
  { label: "Software", mark: "SW" },
];

const pricingFactors = [
  "Service pillar",
  "Timeline",
  "Project complexity",
  "Integrations",
  "Ongoing support",
  "Content and assets",
  "Platform requirements",
  "Launch needs",
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function PricingPlans() {
  return (
    <section id="pricing" className="pt-10 pb-20 md:py-16 border-0">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">

        {/* Left — heading block */}
        <div>
          <motion.div
            className="mb-3 md:mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-dot" />
            <span>Pricing</span>
          </motion.div>

          <motion.h2
            className="text-[clamp(1.75rem,5vw,4.35rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-zinc-950"
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Flexible engagement
          </motion.h2>

          <motion.p
            className="mt-2 md:mt-6 max-w-xl text-[14px] leading-7 text-zinc-600 sm:text-[15px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Pricing is shaped around service mix, scope, and level of execution your project needs.
          </motion.p>

          <motion.div
            className="mt-4 md:mt-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-[13px] font-semibold text-zinc-950">
              Trusted by companies that demand results
            </h3>
            <div className="mt-3 md:mt-6 flex flex-wrap items-center gap-x-6 md:gap-x-8 gap-y-2 md:gap-y-4">
              {trustMarks.map((mark, i) => (
                <motion.div
                  key={mark.label}
                  className="flex items-center gap-3 text-zinc-950"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.32 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-none border border-white/20 bg-white text-[10px] font-bold uppercase tracking-[-0.03em] text-black">
                    {mark.mark}
                  </div>
                  <span className="text-sm font-semibold tracking-[-0.02em]">
                    {mark.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — pricing card */}
        <motion.div
          className="lg:justify-self-end"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <article className="w-full rounded-none border border-white/20 bg-[#1A3DE8] p-4 sm:p-8 transition-all duration-300 ease-out hover:border-white/35 lg:w-[560px] shadow-[0_30px_90px_rgba(26,61,232,0.25)]">
            <div className="flex items-start justify-between gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Scope-based pricing
                </h3>
                <p className="mt-2 text-[12px] text-blue-200/80">
                  after discovery
                </p>
              </div>
              <div className="text-right text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-white">
                Custom Quote
              </div>
            </div>

            <div className="my-3 md:my-5 h-px bg-white/20" />

            <p className="text-[12px] text-blue-100/70">Pricing depends on:</p>
            <ul className="mt-2 md:mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 md:gap-y-2">
              {pricingFactors.map((factor, i) => (
                <motion.li
                  key={factor}
                  className="flex items-start gap-2.5 text-[12.5px] md:text-[13px] leading-5 md:leading-6 text-white/90"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CheckIcon />
                  <span>{factor}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-4 md:mt-6 grid grid-cols-2 gap-2.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ContactPopup>
                <span className="inline-flex w-full items-center justify-center bg-white px-3 py-2 md:py-3 text-[11px] sm:text-[12px] font-semibold text-[#1A3DE8] transition hover:bg-slate-200">
                  Request Quote
                </span>
              </ContactPopup>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center border border-white/30 px-3 py-2 md:py-3 text-[11px] sm:text-[12px] font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                Explore Services
              </Link>
            </motion.div>
          </article>
        </motion.div>

      </div>
    </section>
  );
}
