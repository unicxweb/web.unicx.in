"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="contact" className="pb-20 pt-24 sm:pb-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="panel soft-border relative overflow-hidden px-7 py-12 sm:px-12 sm:py-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="section-label mb-4">Contact</div>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
              Build smarter systems. Scale faster.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-slate-400 sm:text-base">
              From UI/UX and websites to SEO, ads, and mobile apps, UNICX
              helps brands move with more clarity, consistency, and momentum.
            </p>
          </div>

          <motion.div
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="inline-flex w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 shadow-[0_0_0_rgba(255,255,255,0)] transition-shadow duration-500 hover:shadow-[0_0_36px_rgba(255,255,255,0.12)] sm:w-auto"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
