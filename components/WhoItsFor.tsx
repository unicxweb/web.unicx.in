"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    title: "Founders building a sharper presence",
    description:
      "When the business has momentum but the brand, website, or product experience no longer reflects the level you want to operate at.",
  },
  {
    title: "Teams needing execution across multiple fronts",
    description:
      "When design, marketing, web, and app work cannot stay fragmented because every channel now affects conversion and trust.",
  },
  {
    title: "Brands preparing for a launch, reposition, or growth push",
    description:
      "When you need clearer direction, stronger delivery, and a digital system that can support the next stage properly.",
  },
];

export function WhoItsFor() {
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
          <div className="section-label">Who It Is For</div>
          <h2 className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
            Built for brands that need more than a one-off fix.
          </h2>
        </div>

        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-[15px] leading-8 text-slate-400 sm:text-[17px]">
            UNICX is for businesses that need digital work to feel aligned,
            credible, and commercially useful across brand, growth, product,
            and web.
          </p>
        </div>
      </motion.div>

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {audiences.map((audience, index) => (
          <motion.article
            key={audience.title}
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
              0{index + 1}
            </div>
            <h3 className="mt-6 text-[1.9rem] font-semibold tracking-[-0.05em] text-white">
              {audience.title}
            </h3>
            <p className="mt-5 text-[15px] leading-7 text-slate-400">
              {audience.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
