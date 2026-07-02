"use client";

import { motion } from "framer-motion";
import { ContactPopup } from "@/components/ContactPopup";

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function CTA() {
  return (
    <section
      id="contact"
      className="py-12 sm:py-24 md:py-32 bg-black relative z-10 px-[5vw]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.24, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-none bg-white px-7 py-12 sm:px-12 sm:py-16"
      >
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="section-label mb-4 text-zinc-500 before:!bg-black/20">Contact</div>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-zinc-950 sm:text-5xl md:text-6xl">
              Build smarter systems. Scale faster.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-zinc-600 sm:text-base">
              From UI/UX and websites to SEO, ads, and mobile apps, UNICX
              helps brands move with more clarity, consistency, and momentum.
            </p>
          </div>

          <div className="relative inline-flex w-full sm:w-auto">
            <ContactPopup>
              <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-none bg-black px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-white transition hover:bg-zinc-800">
                <span className="relative z-10">
                  <ArrowRightIcon />
                </span>
                <span className="relative z-10">Get Started</span>
              </span>
            </ContactPopup>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
