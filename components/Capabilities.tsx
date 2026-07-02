"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const deliveryTracks = [
  {
    eyebrow: "Brand & Product",
    title: "Clearer digital direction from the first touchpoint.",
    description:
      "We shape interfaces, websites, and visual systems that make your business feel more credible, consistent, and easier to trust.",
    outcomes: [
      "Sharper brand presentation",
      "Stronger UI and UX foundations",
      "More cohesive web and product experiences",
    ],
  },
  {
    eyebrow: "Growth Execution",
    title: "Marketing systems built to attract and convert the right audience.",
    description:
      "From SEO to paid channels, we structure growth work around visibility, demand quality, and cleaner conversion paths.",
    outcomes: [
      "Better traffic quality",
      "More structured acquisition channels",
      "Higher conversion intent across campaigns",
    ],
  },
  {
    eyebrow: "Apps & Platforms",
    title: "Digital products designed to support scale, not just launch.",
    description:
      "We build app and web experiences that are easier to use, easier to maintain, and more aligned with long-term business goals.",
    outcomes: [
      "Usable app experiences",
      "Scalable product foundations",
      "Cleaner cross-device delivery",
    ],
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

function CheckIcon() {
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
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function Capabilities() {
  return (
    <section className="pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end"
      >
        <div className="max-w-xl">
          <div className="section-label">What You Get</div>
          <h2 className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.02em] text-white">
            More than services. A clearer system for growth.
          </h2>
        </div>

        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-[15px] leading-8 text-slate-400 sm:text-[17px]">
            UNICX is built for brands that want execution across design,
            marketing, apps, and web to feel connected, intentional, and ready
            to scale.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition hover:text-slate-300"
            >
              Start a conversation
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-16 border-t border-white/30">
        {deliveryTracks.map((track, index) => (
          <motion.article
            key={track.eyebrow}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-b border-white/30 py-10 sm:py-12"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] lg:items-start">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {track.eyebrow}
                </div>
                <h3 className="mt-4 max-w-md text-[2rem] font-semibold tracking-[-0.025em] text-white">
                  {track.title}
                </h3>
              </div>

              <div>
                <p className="max-w-2xl text-[15px] leading-7 text-slate-400">
                  {track.description}
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {track.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="border-l border-white/30 pl-4 text-[13px] font-medium leading-6 text-slate-200 flex items-start gap-2"
                    >
                      <span className="text-slate-500 mt-0.5">
                        <CheckIcon />
                      </span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
