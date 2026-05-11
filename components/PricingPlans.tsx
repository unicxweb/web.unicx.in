"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };
  return (
    <section id="pricing" ref={sectionRef} className="pt-40 pb-24 sm:pt-56 sm:pb-32">
      <motion.div 
        className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div>
          <motion.div
            variants={itemVariants}
            className="section-label"
          >
            Plans
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-[clamp(2.25rem,5vw,4.35rem)] font-semibold uppercase leading-[0.92] tracking-[-0.07em] text-white"
          >
            Flexible engagement
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-[14px] leading-7 text-slate-400 sm:text-[15px]"
          >
            Pricing is shaped around service mix, scope, and level of execution your project needs.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-10"
          >
            <h3 className="text-[13px] font-semibold text-white">
              Trusted by companies that demand results
            </h3>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
              {trustMarks.map((mark) => (
                <div key={mark.label} className="flex items-center gap-3 text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white text-[10px] font-bold uppercase tracking-[-0.08em] text-black">
                    {mark.mark}
                  </div>
                  <span className="text-sm font-semibold tracking-[-0.04em]">
                    {mark.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={cardVariants} className="lg:justify-self-end">
          <motion.article 
            className="group w-full rounded-lg border border-white/20 bg-black p-8 transition-all duration-300 ease-out hover:border-white/35 hover:bg-white/[0.025] hover:transform hover:translate-y-[-2px] lg:w-[560px]"
            whileHover={{ 
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
          >
            <div className="flex items-start justify-between gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Scope-based pricing
                </h3>
                <p className="mt-2 text-[12px] text-slate-500">
                  after discovery
                </p>
              </div>
              <div className="text-right text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.08em] text-white">
                Custom Quote
              </div>
            </div>

            <div className="my-8 h-px bg-white/20" />

            <p className="text-[12px] text-slate-500">
              Pricing depends on:
            </p>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {pricingFactors.map((factor) => (
                <li
                  key={factor}
                  className="flex items-start gap-3 text-[13px] leading-6 text-slate-300"
                >
                  <CheckIcon />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <ContactPopup>
                <span className="inline-flex w-full items-center justify-center bg-white px-5 py-3 text-[12px] font-semibold text-black transition hover:bg-slate-200">
                  Request Quote
                </span>
              </ContactPopup>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center border border-white/20 px-5 py-3 text-[12px] font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.025]"
              >
                Explore Services
              </Link>
            </div>
          </motion.article>
        </motion.div>
      </motion.div>
    </section>
  );
}
