"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const models = [
  {
    label: "01",
    title: "Focused Projects",
    description:
      "Best when you need a defined outcome such as a website, brand system, campaign build, app interface, or product delivery sprint.",
    fit: "Clear scope, defined timeline, and a specific business objective.",
  },
  {
    label: "02",
    title: "Launch Support",
    description:
      "Built for brands preparing to launch, reposition, or grow with coordinated work across design, messaging, marketing, and digital execution.",
    fit: "Multiple moving parts that need one aligned direction.",
  },
  {
    label: "03",
    title: "Ongoing Partnership",
    description:
      "For teams that need consistent execution over time across updates, optimization, campaigns, product improvements, and growth support.",
    fit: "A longer horizon with recurring digital priorities.",
  },
];

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

export function EngagementModels() {
  return (
    <section className="pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end"
      >
        <div className="max-w-xl">
          <div className="section-label">Engagement Models</div>
          <h2 className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
            Different ways to work together, depending on the stage you are in.
          </h2>
        </div>

        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-[15px] leading-8 text-slate-400 sm:text-[17px]">
            Some teams need one sharp delivery. Others need coordinated support
            across launch, growth, and ongoing execution. UNICX is structured
            to handle both.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition hover:text-slate-300"
            >
              Discuss the right fit
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {models.map((model, index) => (
          <motion.article
            key={model.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="soft-border rounded-[28px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)]"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              {model.label}
            </div>
            <h3 className="mt-6 text-[1.9rem] font-semibold tracking-[-0.05em] text-white">
              {model.title}
            </h3>
            <p className="mt-5 text-[15px] leading-7 text-slate-400">
              {model.description}
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Best Fit
              </div>
              <p className="mt-3 text-[14px] leading-6 text-slate-200">
                {model.fit}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
