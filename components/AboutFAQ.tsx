"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const aboutFaqs = [
  {
    question: "What makes UNICX different from other digital agencies?",
    answer: "We focus on creating cohesive digital systems rather than isolated projects. Our approach combines strategy, design, marketing, and development under one unified direction to ensure every touchpoint works together.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We work across various industries but focus on businesses that need premium digital execution. Our experience spans tech startups, e-commerce, professional services, and established brands looking to elevate their digital presence.",
  },
  {
    question: "How long has UNICX been in business?",
    answer: "UNICX was founded to address the gap between fragmented digital services and cohesive business growth. We bring together experienced professionals with deep expertise in design, marketing, and technical development.",
  },
  {
    question: "What's your team structure?",
    answer: "We operate as a multidisciplinary team with specialists in design, development, marketing, and strategy. This allows us to provide comprehensive solutions without the coordination overhead of multiple agencies.",
  },
  {
    question: "Do you work with startups and enterprises?",
    answer: "Yes, we work with both. For startups, we focus on building scalable foundations. For enterprises, we help streamline complex digital ecosystems and improve conversion across multiple touchpoints.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
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
      <path
        d="M12 5v14"
        className="transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <path d="M5 12h14" />
    </svg>
  );
}

export function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="pt-24 sm:pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
      >
        <div className="max-w-xl">
          <div className="section-label">Learn More</div>
          <h2 className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
            Questions about who we are and how we work.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-8 text-slate-400 sm:text-[17px]">
            Understanding our approach, expertise, and what drives our work to help you make an informed decision.
          </p>
        </div>

        <div className="border-t border-white/10">
          {aboutFaqs.map((item, index) => (
            <motion.article
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.06,
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
                className="grid w-full gap-4 py-5 text-left sm:grid-cols-[120px_minmax(0,1fr)_24px] sm:gap-6"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  0{index + 1}
                </div>
                <h3 className="text-[1.3rem] font-semibold tracking-[-0.03em] text-white">
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
                    <div className="pb-6 sm:pl-[144px]">
                      <p className="max-w-2xl text-[15px] leading-7 text-slate-400">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
