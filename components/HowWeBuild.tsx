"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const buildSteps = [
  {
    number: "01",
    eyebrow: "Listen",
    title: "Clarity before creation.",
    text: "We understand the business, audience, and friction first so every decision starts from the real problem.",
    imageLabel: "Discovery Map",
    stats: ["Goals", "Users", "Friction"],
  },
  {
    number: "02",
    eyebrow: "Design",
    title: "Structure the experience.",
    text: "We define the flow, content, interface direction, and visual language that make the product feel clear and intentional.",
    imageLabel: "System Draft",
    stats: ["Flow", "Layout", "Motion"],
  },
  {
    number: "03",
    eyebrow: "Build",
    title: "Build with precision.",
    text: "We turn the approved direction into responsive, performant, scalable code with the details handled properly.",
    imageLabel: "Build Layer",
    stats: ["Code", "Speed", "Scale"],
  },
  {
    number: "04",
    eyebrow: "Execute",
    title: "Launch with confidence.",
    text: "We test, refine, deploy, and hand over a polished system that is ready to run beyond launch day.",
    imageLabel: "Launch Board",
    stats: ["QA", "Deploy", "Handoff"],
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ProcessVisual({
  label,
  number,
  stats,
}: {
  label: string;
  number: string;
  stats: string[];
}) {
  return (
    <div className="relative flex h-full min-h-[280px] items-center justify-center overflow-hidden bg-white/[0.035] p-8 md:min-h-0">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      <div className="absolute left-8 top-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-600">
        {label}
      </div>
      <div className="absolute right-8 top-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-600">
        {number}
      </div>

      <div className="relative h-44 w-56 sm:h-52 sm:w-72">
        <motion.div
          className="absolute inset-0 rounded-lg border border-white/20 bg-black"
          initial={{ rotate: -3 }}
          whileInView={{ rotate: -6 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-5 rounded-lg border border-white/20 bg-black"
          initial={{ rotate: 4, y: 10 }}
          whileInView={{ rotate: 2, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-px w-20 bg-white/10" />
            </div>
            <div>
              <div className="mb-4 h-12 w-12 rounded-lg border border-white/20 bg-black p-3 text-slate-500">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 15 4.5-4.5 4 4L14 12l7 7" />
                  <circle cx="16.5" cy="9.5" r="1.5" />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-32 rounded-full bg-white/18" />
                <div className="h-2 w-44 rounded-full bg-white/10" />
                <div className="h-2 w-24 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat}
            className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500"
          >
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessCard({
  step,
  index,
  isLast,
}: {
  step: (typeof buildSteps)[number];
  index: number;
  isLast: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isReversed = index % 2 === 1;
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "center center", "end 15%"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isLast ? [0.92, 1.035, 1.035] : [0.92, 1.035, 0.94],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isLast ? [56, 0, 0] : [56, 0, -42],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    isLast ? [0.45, 1, 1, 1] : [0.45, 1, 1, 0.55],
  );
  const springScale = useSpring(scale, { stiffness: 240, damping: 28 });
  const springY = useSpring(y, { stiffness: 220, damping: 30 });

  return (
    <motion.article
      ref={cardRef}
      style={{ scale: springScale, y: springY, opacity }}
      className="sticky top-0 flex min-h-screen origin-center items-center py-8 will-change-transform"
    >
      <div className="grid overflow-hidden rounded-lg border border-white/20 bg-black md:h-[500px] md:grid-cols-2">
        <div
          className={`${
            isReversed
              ? "md:order-2 md:border-l md:border-white/10"
              : "md:border-r md:border-white/10"
          }`}
        >
          <ProcessVisual
            label={step.imageLabel}
            number={step.number}
            stats={step.stats}
          />
        </div>

        <div className="relative flex min-h-[340px] flex-col justify-center bg-black p-7 sm:p-10 md:min-h-0 lg:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:hidden" />
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">
              {step.eyebrow}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-600">
              {step.number}
            </span>
          </div>
          <h3 className="max-w-xl text-[clamp(1.85rem,3.2vw,3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.065em] text-white">
            {step.title}
          </h3>
          <p className="mt-6 max-w-lg text-[14px] leading-7 text-slate-400 sm:text-[15px]">
            {step.text}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-slate-200"
            >
              Start
              <ArrowRightIcon />
            </Link>
            <a
              href="#selected-work"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-white"
            >
              Proof
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function HowWeBuild() {
  return (
    <section id="process" className="relative isolate -mb-16 pt-24 text-white sm:-mb-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-0 max-w-3xl text-center"
      >
        <div className="section-label justify-center">Process</div>
        <h2 className="text-[clamp(2.25rem,5vw,4.4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.07em] text-white">
          A process made for momentum.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[14px] leading-7 text-slate-400 sm:text-[15px]">
          From first conversation to final launch, every phase is built to reduce noise and move the work forward.
        </p>
      </motion.div>

      <div className="relative -mt-16 space-y-8 pb-0 sm:-mt-24">
        {buildSteps.map((step, index) => (
          <ProcessCard
            key={step.number}
            step={step}
            index={index}
            isLast={index === buildSteps.length - 1}
          />
        ))}
        <div aria-hidden="true" className="h-[18vh]" />
      </div>
    </section>
  );
}
