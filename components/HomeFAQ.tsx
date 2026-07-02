"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What does Studio UnicX actually do?",
    answer:
      "Studio UnicX combines design, marketing, app development, and website development into one connected digital partner.",
  },
  {
    question: "Can you handle only one part of a project?",
    answer:
      "Yes. Some engagements are tightly scoped to one area, while others combine multiple services under a shared direction.",
  },
  {
    question: "Is this for new brands or established businesses?",
    answer:
      "Both. The common thread is that the business needs clearer execution, stronger presentation, or a more scalable digital foundation.",
  },
  {
    question: "How do projects usually start?",
    answer:
      "Most starts begin with a short brief over email, followed by scope alignment around the clearest next step.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn(
        "h-4 w-4 transition-all duration-300 transform",
        open ? "text-white" : "text-slate-500 group-hover:text-white group-hover:rotate-90"
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 5v14"
        className="transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <path d="M5 12h14" />
    </svg>
  );
}

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mt-[30vh] md:mt-[75vh] pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-32">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">

        {/* Left — heading block */}
        <div className="max-w-xl">
          <motion.div
            className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-dot" />
            <span>FAQ</span>
          </motion.div>

          <motion.h2
            className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.02em] text-white"
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            The main questions visitors usually have.
          </motion.h2>

          <motion.p
            className="mt-6 max-w-lg text-[15px] leading-8 text-slate-400 sm:text-[17px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Enough clarity to understand the offer, the fit, and the starting
            point without having to piece it together across the whole site.
          </motion.p>
        </div>

        {/* Right — FAQ list */}
        <div className="border-t border-white/10">
          {faqs.map((item, index) => (
            <motion.article
              key={item.question}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-white/10 py-2"
            >
              <button
                type="button"
                aria-expanded={openIndex === index}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? -1 : index))
                }
                className="group grid w-full gap-4 py-5 text-left grid-cols-[28px_1fr_24px] sm:grid-cols-[120px_minmax(0,1fr)_24px] sm:gap-6"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  0{index + 1}
                </div>
                <h3 className="text-[1.15rem] sm:text-[1.3rem] font-semibold tracking-[-0.03em] text-white transition-all duration-300 group-hover:text-zinc-300 group-hover:underline">
                  {item.question}
                </h3>
                <span className="flex items-start justify-start pt-1 text-slate-500 sm:justify-end">
                  <span className="inline-flex">
                    <PlusIcon open={openIndex === index} />
                  </span>
                </span>
              </button>
 
              <AnimatePresence initial={false}>
                {openIndex === index ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-[44px] sm:pl-[144px]">
                      <p className="max-w-2xl text-[14px] sm:text-[15px] leading-7 text-slate-400">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
