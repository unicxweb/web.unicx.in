"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We map your current workflows, identify friction, and define the highest-value opportunities.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We design and implement the right system with precision, clarity, and a premium user experience.",
  },
  {
    number: "03",
    title: "Scale",
    description:
      "We refine the foundation so your business can expand with stronger operations and less complexity.",
  },
];

export function HowItWorks() {
  return (
    <section id="work" className="pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="section-label justify-center">How It Works</div>
        <h2 className="text-4xl font-semibold uppercase tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
          A focused path from idea to scale.
        </h2>
        <p className="mt-6 max-w-2xl text-[15px] leading-8 text-slate-400 sm:text-base">
          Every engagement moves through a simple, deliberate process designed
          to reduce noise and accelerate meaningful progress.
        </p>
      </motion.div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-stretch md:justify-center md:gap-0">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex w-full max-w-sm flex-col items-center md:max-w-none md:flex-1 md:flex-row"
          >
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.75,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full rounded-[28px] border border-white/10 bg-white/[0.025] px-8 py-10 text-center shadow-[0_18px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-medium uppercase tracking-[0.34em] text-slate-300">
                {step.number}
              </div>
              <h3 className="mt-7 text-[1.9rem] font-semibold tracking-[-0.055em] text-white">
                {step.title}
              </h3>
              <p className="mt-5 text-[15px] leading-7 text-slate-400">
                {step.description}
              </p>
            </motion.article>

            {index < steps.length - 1 ? (
              <div className="flex h-10 items-center md:h-auto md:flex-1 md:px-3">
                <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:hidden" />
                <div className="hidden h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
