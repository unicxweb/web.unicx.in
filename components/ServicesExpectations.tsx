"use client";

import {
  CardCurtain,
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  useCardCurtainRevealContext,
} from "@/components/ui/card-curtain-reveal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";

const expectationCards = [
  {
    number: "01",
    title: "Strategy, Design, Execution",
    description:
      "Unified delivery across planning, design systems, development, and growth.",
    image: "/images/optimized/process-01.webp",
  },
  {
    number: "02",
    title: "Clear Service Scope",
    description:
      "Structured offerings across branding, products, web, software, and acquisition.",
    image: "/images/optimized/process-02.webp",
  },
  {
    number: "03",
    title: "Flexible Collaboration",
    description:
      "Project-based delivery or long-term operational support depending on business needs.",
    image: "/images/optimized/process-03.webp",
  },
];

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ExpectationArrow() {
  const { isMouseIn, toggle } = useCardCurtainRevealContext();
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle?.();
      }}
      animate={{ y: isMouseIn ? 0 : 56 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 mt-6 sm:mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-50 cursor-pointer outline-none hover:bg-zinc-700"
    >
      <ArrowUpRightIcon />
    </motion.button>
  );
}

export function ServicesExpectations() {
  return (
    <section className="pt-20 sm:pt-28 lg:pt-36 2xl:pt-40">
      <ScrollReveal
        className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end"
        amount={0.24}
      >
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500">
            <span className="section-dot" />
            <span>What Clients Can Expect</span>
          </div>
          <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            What clients can expect
          </h2>
        </div>
        <p className="max-w-xl text-[15px] leading-8 text-slate-400 sm:text-base lg:justify-self-end">
          Structured delivery across strategy, design, development, and growth
          - without fragmented workflows.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid justify-items-center gap-5 sm:mt-14 lg:mt-16 lg:grid-cols-3">
        {expectationCards.map((card) => (
          <ScrollReveal
            key={card.number}
            delay={0.06 * Number(card.number)}
            distance={36}
            className="w-full max-w-96"
          >
          <CardCurtainReveal
            tabIndex={0}
            className="h-[460px] sm:h-[500px] lg:h-[560px] w-full border border-zinc-100 bg-black text-zinc-50 shadow outline-none"
          >
            <CardCurtainRevealBody className="bg-black">
              <CardCurtainRevealTitle className="max-w-[18rem] font-sans text-[1.4rem] sm:text-[1.5rem] lg:text-[1.7rem] font-semibold leading-[1.08] tracking-tight text-zinc-50">
                {card.title}
              </CardCurtainRevealTitle>
              <CardCurtainRevealDescription className="mb-4 mt-3 min-h-[80px] sm:min-h-[96px] lg:min-h-[112px] max-w-[18rem] font-sans text-[13px] sm:text-[14px] font-medium leading-6 text-zinc-50">
                <p>{card.description}</p>
              </CardCurtainRevealDescription>

              <ExpectationArrow />

              <CardCurtain className="bg-zinc-50" />
            </CardCurtainRevealBody>

            <CardCurtainRevealFooter className="mt-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt=""
                width="100%"
                height="100%"
                className="h-36 sm:h-40 lg:h-48 w-full object-cover"
              />
            </CardCurtainRevealFooter>
          </CardCurtainReveal>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
