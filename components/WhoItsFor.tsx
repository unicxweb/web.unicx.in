"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const audiences = [
  {
    title: "Founders building a sharper presence",
    description:
      "When the business has momentum but the brand, website, or product experience no longer reflects the level you want to operate at.",
  },
  {
    title: "Teams needing execution across multiple fronts",
    description:
      "When graphic design, marketing, web, and app work cannot stay fragmented because every channel now affects conversion and trust.",
  },
  {
    title: "Brands preparing for a launch, reposition, or growth push",
    description:
      "When you need clearer direction, stronger delivery, and a digital system that can support the next stage properly.",
  },
];

export function WhoItsFor() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const progress = progressRef.current;

    if (!section || !header || !cards || !progress) return;

    const ctx = gsap.context(() => {
      const cardElements = gsap.utils.toArray<HTMLElement>(
        cards.querySelectorAll("article")
      );
      const contentBlocks = cardElements.map((card) =>
        card.querySelectorAll("[data-card-content]")
      );

      gsap.set(cards, { perspective: 1200 });
      gsap.set(header, { y: 34, opacity: 0 });
      gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(cardElements, {
        y: 96,
        scale: 0.92,
        rotateX: 8,
        opacity: 0,
        transformOrigin: "center bottom",
        borderColor: "rgba(255,255,255,0.14)",
      });
      contentBlocks.forEach((blocks) => {
        gsap.set(blocks, { y: 18, opacity: 0 });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 42%",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(header, { y: 0, opacity: 1, duration: 0.35 }, 0)
        .to(progress, { scaleY: 1, duration: 1.05, ease: "none" }, 0.04);

      cardElements.forEach((card, index) => {
        const start = 0.12 + index * 0.18;

        timeline
          .to(
            card,
            {
              y: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              borderColor: "rgba(255,255,255,0.3)",
              duration: 0.42,
            },
            start
          )
          .to(
            contentBlocks[index],
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.3,
            },
            start + 0.06
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-0 overflow-visible pt-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <div
        ref={headerRef}
        className="grid gap-10 will-change-transform lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end"
      >
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="section-label"
          >
            Who It Is For
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white"
          >
            Built for brands that need more than a one-off fix.
          </motion.h2>
        </div>

        <div className="max-w-2xl lg:justify-self-end">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] leading-8 text-slate-400 sm:text-[17px]"
          >
            studio.unicx is for businesses that need digital work to feel aligned,
            credible, and commercially useful across brand, growth, product,
            and web.
          </motion.p>
        </div>
      </div>

      <div className="relative mt-10 lg:mt-12">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 hidden h-full w-px overflow-hidden bg-white/10 lg:block"
        >
          <div ref={progressRef} className="h-full w-full bg-white" />
        </div>
        <div ref={cardsRef} className="grid gap-5 lg:grid-cols-3 lg:pl-8">
          {audiences.map((audience, index) => (
            <article
              key={audience.title}
              className="relative min-h-[260px] overflow-hidden rounded-lg border border-white/20 bg-black p-6 will-change-transform hover:bg-white/[0.025] sm:min-h-[300px] sm:p-8 lg:min-h-[320px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/40 via-white/10 to-transparent"
              />
              <div data-card-content className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                0{index + 1}
              </div>
              <h3 data-card-content className="mt-6 text-[clamp(1.45rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.05em] text-white">
                {audience.title}
              </h3>
              <p data-card-content className="mt-5 text-[15px] leading-7 text-slate-400">
                {audience.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
