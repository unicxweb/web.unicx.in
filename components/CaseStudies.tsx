"use client";

import { motion } from "framer-motion";
import { MediaFrame } from "@/components/MediaFrame";

const studies = [
  {
    title: "Nova Commerce",
    metric: "+148% qualified leads",
    imageLabel: "Nova Commerce",
    imageSrc: "",
    description:
      "Rebuilt the acquisition flow into a sharper, faster system with cleaner messaging and conversion paths.",
  },
  {
    title: "Aether Health",
    metric: "3.2x demo conversion",
    imageLabel: "Aether Health",
    imageSrc: "",
    description:
      "Designed a premium product narrative and site architecture that aligned trust, clarity, and growth.",
  },
];

export function CaseStudies() {
  return (
    <section id="work" className="pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-3xl">
          <div className="section-label">Selected Work</div>
          <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            Proof that clarity compounds.
          </h2>
        </div>
        <p className="max-w-lg text-[15px] leading-8 text-slate-400 sm:text-base">
          A preview of the kind of outcomes that happen when product, brand,
          and growth systems are designed as one.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {studies.map((study, index) => (
          <motion.article
            key={study.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.75,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="soft-border relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-9 shadow-[0_20px_70px_rgba(0,0,0,0.16)] transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_36%)]" />
            <div className="relative flex h-full min-h-[300px] flex-col justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.34em] text-slate-500">
                  Case Study 0{index + 1}
                </div>
                <div className="mt-6">
                  <MediaFrame
                    src={study.imageSrc}
                    alt={study.title}
                    label={study.imageLabel}
                    aspectClassName="aspect-[16/10]"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-[2rem] font-semibold tracking-[-0.03em] text-white">
                  {study.title}
                </h3>
                <div className="mt-6 text-[11px] font-medium uppercase tracking-[0.34em] text-slate-300">
                  {study.metric}
                </div>
                <p className="mt-6 max-w-md text-[15px] leading-7 text-slate-400">
                  {study.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
