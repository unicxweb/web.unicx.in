"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ContactPopup } from "@/components/ContactPopup";
import BentoCard from "@/components/BentoCard";

const trustMetrics = [
  {
    label: "5+ Service Pillars",
    detail: "Strategy, design, web, software, and growth systems working together.",
    icon: "layers",
  },
  {
    label: "End-to-end Delivery",
    detail: "A clear path from discovery and structure to launch and iteration.",
    icon: "path",
  },
  {
    label: "Custom Systems",
    detail: "Digital products shaped around the way your business actually runs.",
    icon: "cube",
  },
  {
    label: "Launch Support",
    detail: "Post-launch care so the foundation keeps improving after release.",
    icon: "rocket",
  },
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
    <section className="mt-[30vh] md:mt-[75vh] pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-32 border-0">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500"
          >
            <span className="section-dot" />
            <span>Foundation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[clamp(2.25rem,5vw,4.35rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-zinc-950"
          >
            We build what lasts
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-[14px] leading-7 text-zinc-600 sm:text-[15px]"
          >
            Studio UnicX combines strategy, design, development, and execution
            so every project has a clear purpose, a strong technical foundation,
            and support needed to move beyond launch.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-zinc-950 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-zinc-800"
            >
              Explore Services
            </Link>
            <ContactPopup>
              <span className="inline-flex items-center gap-2 px-1 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500 transition hover:text-zinc-900">
                Start A Project
                <ArrowRightIcon />
              </span>
            </ContactPopup>
          </motion.div>
        </div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <BentoCard />
        </motion.div>
      </div>

      <motion.div 
        className="mt-14 overflow-hidden border-none md:border-y md:border-solid md:border-zinc-200/80 py-5"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex w-max items-center gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...trustMetrics, ...trustMetrics].map((metric, index) => (
            <div
              key={`${metric.label}-marquee-${index}`}
              className="flex shrink-0 items-center gap-3 text-zinc-950"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-zinc-950">
                <MetricIcon icon={metric.icon} />
              </div>
              <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
