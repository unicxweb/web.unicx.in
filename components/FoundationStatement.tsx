"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const trustMetrics = [
  { label: "5+ Service Pillars", icon: "layers" },
  { label: "End-to-end Delivery", icon: "path" },
  { label: "Custom Systems", icon: "cube" },
  { label: "Launch Support", icon: "rocket" },
];

function MetricIcon({ icon }: { icon: string }) {
  const commonProps = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "1.8",
  };

  if (icon === "layers") {
    return (
      <svg {...commonProps}>
        <path d="m12 3 9 4.5-9 4.5L3 7.5 12 3Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </svg>
    );
  }

  if (icon === "path") {
    return (
      <svg {...commonProps}>
        <path d="M5 6h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h10" />
        <path d="m17 18 3 3-3 3" />
      </svg>
    );
  }

  if (icon === "cube") {
    return (
      <svg {...commonProps}>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="M12 12 4 7.5" />
        <path d="m12 12 8-4.5" />
        <path d="M12 12v9" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M12 3c3.5 1.5 5.5 4 6 8l-4 4-5-5 4-4c-4 .5-6.5 2.5-8 6" />
      <path d="M8 16 5 19" />
      <path d="M10 18 7 21" />
      <path d="M14 15l-5-5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function FoundationStatement() {
  return (
    <section className="pt-24 text-center sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="section-label justify-center">
          Foundation
        </div>

        <h2 className="mx-auto max-w-3xl rounded-lg border border-white/20 px-5 py-3 text-[clamp(2rem,5vw,4.35rem)] font-semibold uppercase leading-[0.9] tracking-[-0.07em] text-white">
          We build what lasts
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-7 text-slate-400 sm:text-[15px]">
          studio.unicx combines strategy, design, development, and execution
          so every project has a clear purpose, a strong technical foundation,
          and the support needed to move beyond launch.
        </p>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden">
          <motion.div
            className="flex w-max items-center gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...trustMetrics, ...trustMetrics].map((metric, index) => (
              <div
                key={`${metric.label}-${index}`}
                className="flex shrink-0 items-center gap-3 text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white text-black">
                  <MetricIcon icon={metric.icon} />
                </div>
                <span className="whitespace-nowrap text-lg font-semibold tracking-[-0.04em]">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-none border border-white/30 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 transition hover:text-white"
          >
            Start A Project
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
