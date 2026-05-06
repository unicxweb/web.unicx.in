"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "They delivered exactly what we needed without the noise. The software runs clean and scales without breaking.",
    name: "Marcus Chen",
    role: "CTO, Velocity Labs",
    initials: "MC",
  },
  {
    quote:
      "They understood the problem before we finished explaining it, built the system without cutting corners, and delivered on time.",
    name: "Sarah Mitchell",
    role: "VP Engineering, Nexust",
    initials: "SM",
  },
  {
    quote:
      "They built our platform right the first time, no shortcuts, no excuses.",
    name: "James Rivera",
    role: "Founder, Catalyst",
    initials: "JR",
  },
  {
    quote:
      "Their design process brought clarity to a messy product and helped our team make decisions faster.",
    name: "Anika Rao",
    role: "Product Lead, Northstar",
    initials: "AR",
  },
  {
    quote:
      "The handoff was as strong as the build. We knew exactly how to run the system after launch.",
    name: "Dev Patel",
    role: "Operations, Gridline",
    initials: "DP",
  },
];

function ArrowIcon({ direction = "next" }: { direction?: "prev" | "next" }) {
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
      {direction === "prev" ? (
        <>
          <path d="M19 12H5" />
          <path d="m11 5-7 7 7 7" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-sm leading-none text-white" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>*</span>
      ))}
    </div>
  );
}

export function ClientTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setActiveIndex(index);
    scrollRef.current?.scrollTo({
      left: index * 340,
      behavior: "smooth",
    });
  };

  const next = () => {
    goTo((activeIndex + 1) % testimonials.length);
  };

  const previous = () => {
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <div className="section-label">Testimonials</div>
        <h2 className="text-[clamp(2.1rem,4vw,3.6rem)] font-semibold uppercase leading-[0.95] tracking-[-0.065em] text-white">
          What clients say
        </h2>
        <p className="mt-4 max-w-xl text-[13px] leading-7 text-slate-500 sm:text-[15px]">
          Real work. Real results. Real partnerships.
        </p>
      </motion.div>

      <div ref={scrollRef} className="overflow-hidden">
        <div className="flex gap-5">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex min-h-[210px] w-[320px] shrink-0 flex-col justify-between rounded-lg border border-white/20 bg-black p-6"
            >
              <div>
                <Stars />
                <blockquote className="mt-6 text-[14px] font-medium leading-7 text-slate-200">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-9 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={previous}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-slate-300 transition hover:bg-white hover:text-black"
            aria-label="Previous testimonial"
          >
            <ArrowIcon direction="prev" />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-slate-300 transition hover:bg-white hover:text-black"
            aria-label="Next testimonial"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
