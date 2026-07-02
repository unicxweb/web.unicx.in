"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ContactPopup } from "@/components/ContactPopup";

const buildSteps = [
  {
    number: "01",
    eyebrow: "Listen",
    title: "Clarity before creation.",
    text: "We understand the business, audience, and friction first so every decision starts from the real problem.",
    imageLabel: "Discovery Map",
    image: "/images/optimized/process-01.webp",
    stats: ["Goals", "Users", "Friction"],
  },
  {
    number: "02",
    eyebrow: "Design",
    title: "Structure the experience.",
    text: "We define the flow, content, interface direction, and visual language that make the product feel clear and intentional.",
    imageLabel: "System Draft",
    image: "/images/optimized/process-02.webp",
    stats: ["Flow", "Layout", "Motion"],
  },
  {
    number: "03",
    eyebrow: "Build",
    title: "Build with precision",
    text: "We turn the approved direction into responsive, performant, scalable code with the details handled properly.",
    imageLabel: "Build Layer",
    image: "/images/optimized/Build%20with%20precision.%20(2).webp",
    stats: ["Code", "Speed", "Scale"],
  },
  {
    number: "04",
    eyebrow: "Execute",
    title: "Launch with confidence.",
    text: "We test, refine, deploy, and hand over a polished system that is ready to run beyond launch day.",
    imageLabel: "Launch Board",
    image: "/images/optimized/process-04.webp",
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
  image,
}: {
  image: string;
}) {
  return (
    <div className="relative flex h-full min-h-[200px] items-center justify-center overflow-hidden bg-white md:min-h-0">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
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
      className="sticky top-[92px] md:top-[96px] flex min-h-[70vh] md:min-h-screen items-center py-4 md:py-8"
    >
      <div className="grid overflow-hidden rounded-none border border-white/20 bg-black md:h-[500px] md:grid-cols-2">
        <div
          className={`${
            isReversed
              ? "md:order-2 md:border-l md:border-white/10"
              : "md:border-r md:border-white/10"
          }`}
        >
          <ProcessVisual
            image={step.image}
          />
        </div>

        <div className="relative flex min-h-[280px] flex-col justify-center bg-black p-7 sm:p-10 md:min-h-0 lg:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:hidden" />
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-400">
              {step.eyebrow}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
              {step.number}
            </span>
          </div>
          <h3 className="max-w-xl text-[clamp(1.85rem,3.2vw,3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-white">
            {step.title}
          </h3>
          <p className="mt-6 max-w-lg text-[14px] leading-7 text-slate-300 sm:text-[15px]">
            {step.text}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ContactPopup>
              <span className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-slate-200">
                Start
                <ArrowRightIcon />
              </span>
            </ContactPopup>
            <a
              href="#selected-work"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 transition hover:text-white"
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
    <section id="process" className="relative isolate mt-[30vh] md:mt-[75vh] -mb-8 pt-20 text-white sm:-mb-16 sm:pt-40 md:-mb-24 md:pt-56">
      <div className="mx-auto mb-0 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 inline-flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500"
        >
          <span className="section-dot" />
          <span>Our Process</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.25rem,5vw,4.4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-white"
        >
          A process made for momentum.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-xl text-[14px] leading-7 text-slate-400 sm:text-[15px]"
        >
          From first conversation to final launch, every phase is built to reduce noise and move the work forward.
        </motion.p>
      </div>

      <div className="relative -mt-8 space-y-4 md:space-y-8 pb-0 sm:-mt-16 md:-mt-24">
        {buildSteps.map((step, index) => (
          <ProcessCard
            key={step.number}
            step={step}
            index={index}
            isLast={index === buildSteps.length - 1}
          />
        ))}
        <div aria-hidden="true" className="h-[10vh] md:h-[18vh]" />
      </div>
    </section>
  );
}
