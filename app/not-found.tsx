"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("../components/Galaxy"), { ssr: false });

type ArrowRightIconProps = {
  className?: string;
};

function ArrowRightIcon({ className = "" }: ArrowRightIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${className}`}
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

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Galaxy 
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      <div className="noise-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(0,0,0,0.02),rgba(0,0,0,0.58)_66%,rgba(0,0,0,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/55 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex min-h-screen flex-col items-start justify-center max-w-5xl mx-auto px-8 md:px-16 text-left"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 blur-3xl" style={{ background: "rgba(255, 255, 255, 0.05)" }} />
          <h1 className="text-[7rem] font-black leading-none tracking-normal text-white sm:text-[10rem] md:text-[12rem] lg:text-[13rem]">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-slate-400">Lost signal</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Page Not Found</h2>
          <p className="mt-4 max-w-[38rem] text-[14px] leading-6 text-slate-300 sm:text-[16px] sm:leading-7">
            You have drifted beyond the mapped universe. This planet has not been discovered yet.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-none border border-white/20 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-950 shadow-[0_0_38px_rgba(255,255,255,0.12)] transition hover:bg-slate-200"
            >
              <ArrowRightIcon />
              Return Home
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-none border border-white/10 bg-white/5 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
            >
              <ArrowRightIcon className="rotate-180" />
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

