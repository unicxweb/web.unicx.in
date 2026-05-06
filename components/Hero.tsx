"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MediaFrame } from "@/components/MediaFrame";

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

export function Hero() {
  return (
    <section
      id="top"
      className="relative -mx-6 grid min-h-[calc(100svh-6rem)] items-center gap-8 bg-black px-6 pt-8 pb-6 sm:-mx-8 sm:px-8 sm:pt-12 sm:pb-8 md:min-h-[calc(100svh-7rem)] md:gap-8 md:pt-10 md:pb-6 lg:-mx-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.82fr)] lg:gap-10 lg:px-12 lg:pt-16 lg:pb-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-[44rem] md:max-w-[40rem]"
      >
        <div className="section-label">UNIFY</div>
        <h1 className="max-w-4xl text-[clamp(2.3rem,5.3vw,4.35rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white md:max-w-[36rem]">
          Where Design, Marketing, Apps, and Web Work Together.
        </h1>
        <p className="mt-5 max-w-[38rem] text-[14px] leading-6 text-slate-400 sm:text-[16px] sm:leading-7">
          studio.unicx brings strategy, design, marketing, app development, and
          website execution into one connected system for modern growth-focused
          brands.
        </p>

        <div className="mt-6 flex items-center md:mt-5">
          <div className="relative inline-flex">
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">
                <ArrowRightIcon />
              </span>
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex w-full max-w-[500px] items-center justify-center md:max-w-[360px] lg:max-w-[470px]"
      >
        <div className="absolute h-64 w-64 rounded-full bg-white/8 blur-[130px]" />
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/6 blur-[110px]" />

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-[460px] md:max-w-[340px] lg:max-w-[440px]"
        >
          <MediaFrame
            alt="studio.unicx hero visual"
            label="System Preview"
            aspectClassName="aspect-[1.08]"
            className="rounded-[32px] shadow-card"
          />

          <div className="pointer-events-none absolute bottom-3 left-1/2 w-[74%] -translate-x-1/2 md:w-[82%] md:-bottom-2 lg:w-[74%] lg:-bottom-3">
            <div className="soft-border rounded-full border border-white/10 bg-black/75 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Integrated Delivery
                  </div>
                  <div className="mt-1.5 text-[13px] font-medium text-white sm:text-sm">
                    Design, growth, apps, and web aligned in one system
                  </div>
                </div>
                <div className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.04] sm:h-10 sm:w-10" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
