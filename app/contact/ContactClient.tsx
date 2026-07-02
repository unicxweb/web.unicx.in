"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

const ease = {
  ui: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hero: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const contactPaths = [
  {
    label: "Email",
    value: "hello@unicx.in",
    href: "mailto:hello@unicx.in",
    note: "Best for project briefs, scope notes, and references.",
  },
  {
    label: "Focus",
    value: "Design, marketing, apps, and websites",
    note: "We work across brand systems, growth, product, and launch work.",
  },
  {
    label: "Engagement",
    value: "Project-based work or ongoing support",
    note: "Good fit for teams that need delivery, not just recommendations.",
  },
];

const projectInputs = [
  "What your business does and who it serves",
  "What you need help with right now",
  "Any launch timing, deadline, or internal constraint",
  "Relevant links, references, or existing materials",
];

const nextSteps = [
  "We review your brief and map the clearest next move.",
  "If the fit is right, we align on scope, priorities, and pace.",
  "Then we move into a focused delivery plan with momentum.",
];

const contactFaqs = [
  {
    question: "What's the best way to reach out?",
    answer: "Email is usually the fastest way to start. Send your project brief or initial thoughts to hello@unicx.in and we'll respond within 24 hours.",
  },
  {
    question: "Do I need a detailed project scope?",
    answer: "Not at all. We're used to working with ideas at different stages. Even a rough outline of what you're trying to achieve is enough to get started.",
  },
  {
    question: "How quickly can we start?",
    answer: "Depending on project complexity and current workload, we can typically begin within 1-2 weeks of scope alignment. Rush projects may be accommodated when possible.",
  },
  {
    question: "What if I only need one service?",
    answer: "We're flexible. Whether you need just website development, design work, or a full digital partnership, we can scope the engagement to match your specific needs.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, we work with clients globally. Our communication and project management systems are set up for seamless remote collaboration across time zones.",
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

export function ContactClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fafafa]">
      <div className="noise-overlay opacity-30 pointer-events-none" />
      <Navbar />

      <div className="font-sans">
        {/* ═══════════════════════════════════════════════════
           LIGHT-THEMED HERO SECTION
           ═══════════════════════════════════════════════════ */}
        <section className="relative w-full px-6 pt-40 pb-20 sm:px-8 sm:pt-52 sm:pb-28 lg:px-12 lg:pt-60 lg:pb-32 bg-[#fafafa]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: ease.ui }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="section-dot" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Connect
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: ease.hero }}
                  className="max-w-4xl text-[clamp(2.2rem,6vw,5.3rem)] font-light leading-[0.94] tracking-tight text-zinc-950"
                >
                  Start with the project, not the pitch.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: ease.ui }}
                  className="mt-6 max-w-2xl text-[15px] leading-7 text-zinc-500 sm:text-[17px] sm:leading-8"
                >
                  Share what you are building, what is stuck, or where you want
                  to grow next. We will help turn that into a clear next step
                  across design, marketing, apps, or websites.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: ease.ui }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="mailto:hello@unicx.in"
                    className="inline-flex items-center gap-2 bg-zinc-950 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-zinc-800"
                  >
                    <ArrowRightIcon />
                    hello@unicx.in
                  </Link>
                  <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-zinc-400">
                    Usually the fastest way to get started
                  </div>
                </motion.div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 border-t border-zinc-200/80 pt-10 lg:border-t-0 lg:pt-0">
                {contactPaths.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: ease.ui }}
                    className="border-l border-zinc-200/80 pl-4"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-400">
                      {item.label}
                    </div>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="mt-2.5 inline-block text-[18px] font-medium tracking-tight text-zinc-950 transition hover:text-zinc-600"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <div className="mt-2.5 text-[16px] font-medium tracking-tight text-zinc-900">
                        {item.value}
                      </div>
                    )}
                    <p className="mt-2 max-w-sm text-[13px] leading-6 text-zinc-500">
                      {item.note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           DARK-THEMED FORM SECTION
           ═══════════════════════════════════════════════════ */}
        <section className="relative z-10 bg-black text-white py-24 sm:py-32 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7, ease: ease.ui }}
                className="lg:sticky lg:top-[120px] h-fit self-start"
              >
                <div className="space-y-12">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-zinc-500">
                      What to include
                    </div>
                    <div className="mt-6 space-y-4">
                      {projectInputs.map((item, index) => (
                        <div
                          key={item}
                          className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                        >
                          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                            0{index + 1}
                          </div>
                          <p className="text-[15px] leading-7 text-slate-200 font-light">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-8">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-zinc-500">
                      What happens next
                    </div>
                    <div className="mt-6 space-y-5">
                      {nextSteps.map((step, index) => (
                        <div key={step} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                            0{index + 1}
                          </div>
                          <p className="max-w-md text-[14px] leading-6 text-slate-300 font-light">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: ease.ui }}
                data-right-side
                className="border-t border-white/10 pt-8 lg:pt-0 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-12"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           LIGHT-THEMED FAQ SECTION
           ═══════════════════════════════════════════════════ */}
        <section className="relative w-full py-24 sm:py-32 bg-[#fafafa] border-t border-zinc-200/80">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.8, ease: ease.ui }}
              className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-6">
                  <span className="section-dot" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    FAQ
                  </span>
                </div>
                <h2 className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-light leading-none tracking-tight text-zinc-950">
                  Common questions about working together.
                </h2>
                <p className="mt-6 max-w-lg text-[15px] leading-7 text-zinc-500">
                  Quick answers about process, timing, scope, and what to expect when you reach out.
                </p>
              </div>

              <div className="border-t border-zinc-200/80">
                {contactFaqs.map((item, index) => (
                  <motion.article
                    key={item.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.06,
                      ease: ease.ui,
                    }}
                    className="border-b border-zinc-200/80 py-2"
                  >
                    <button
                      type="button"
                      aria-expanded={openFaqIndex === index}
                      onClick={() =>
                        setOpenFaqIndex((current) => (current === index ? -1 : index))
                      }
                      className="flex w-full items-start justify-between gap-4 py-5 text-left group"
                    >
                      <div className="flex gap-4 sm:gap-6">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400 w-8 shrink-0">
                          0{index + 1}
                        </div>
                        <h3 className="text-[1.1rem] sm:text-[1.3rem] font-light tracking-tight text-zinc-950 group-hover:text-zinc-600 transition-colors">
                          {item.question}
                        </h3>
                      </div>
                      <span className="flex items-start justify-end pt-1 text-zinc-400 shrink-0">
                        <span className="inline-flex">
                          <PlusIcon open={openFaqIndex === index} />
                        </span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaqIndex === index ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: ease.hero }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-12 sm:pl-[144px]">
                            <p className="max-w-2xl text-[15px] leading-7 text-zinc-500 font-light">
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
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
