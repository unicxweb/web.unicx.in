"use client";

import { motion, useTransform, useMotionValue } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business, audience, and goals to understand what success looks like and identify the clearest path forward."
  },
  {
    number: "02", 
    title: "Strategy",
    description: "We develop a comprehensive digital strategy that aligns design, marketing, and technology around your business objectives."
  },
  {
    number: "03",
    title: "Design & Build",
    description: "We create and implement premium digital experiences with precision, clarity, and attention to every detail."
  },
  {
    number: "04",
    title: "Optimize",
    description: "We continuously refine and improve based on performance data, user feedback, and evolving business needs."
  }
];

interface AboutProcessProps {
  scrollYProgress?: any;
  isDesktop?: boolean;
}

export function AboutProcess({ scrollYProgress, isDesktop = false }: AboutProcessProps) {
  const fallbackValue = useMotionValue(0);
  const activeScrollProgress = scrollYProgress || fallbackValue;

  const headerOpacity = useTransform(activeScrollProgress, [0, 0.35], [0, 1]);
  const headerY = useTransform(activeScrollProgress, [0, 0.35], [50, 0]);

  const showScrollAnimation = !!scrollYProgress && isDesktop;

  return (
    <section className="w-full">
      <motion.div
        style={showScrollAnimation ? { opacity: headerOpacity, y: headerY } : {}}
        initial={!showScrollAnimation ? { opacity: 0, y: 24 } : undefined}
        whileInView={!showScrollAnimation ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end"
      >
        <div className="max-w-xl">
          <div className="section-label">Our Approach</div>
          <h2 className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.02em] text-white">
            How we turn vision into digital reality.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-8 text-slate-400 sm:text-[17px]">
            Our process combines strategic thinking with meticulous execution to deliver digital systems that 
            drive measurable growth and lasting impact.
          </p>
        </div>

        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-[15px] leading-8 text-slate-400 sm:text-[17px]">
            We believe great digital work happens at the intersection of business strategy, 
            user-centered design, and technical excellence. Every project follows this proven 
            methodology to ensure clarity, quality, and results.
          </p>
        </div>
      </motion.div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {processSteps.map((step, index) => (
          <AboutProcessCard
            key={step.title}
            step={step}
            index={index}
            scrollYProgress={activeScrollProgress}
            showScrollAnimation={showScrollAnimation}
          />
        ))}
      </div>
    </section>
  );
}

interface AboutProcessCardProps {
  step: typeof processSteps[number];
  index: number;
  scrollYProgress: any;
  showScrollAnimation: boolean;
}

function AboutProcessCard({ step, index, scrollYProgress, showScrollAnimation }: AboutProcessCardProps) {
  const centerIndex = 1.5;
  const distanceFromCenter = index - centerIndex;

  const cardX = useTransform(scrollYProgress, [0.1, 0.5], [distanceFromCenter * 150, 0]);
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.5], [distanceFromCenter * 15, 0]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.5], [-Math.abs(distanceFromCenter) * 40, 0]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <motion.article
      style={
        showScrollAnimation
          ? {
              x: cardX,
              rotate: cardRotate,
              y: cardY,
              scale: cardScale,
              opacity: cardOpacity,
              transformOrigin: "center",
            }
          : {}
      }
      initial={!showScrollAnimation ? { opacity: 0, y: 24 } : undefined}
      whileInView={!showScrollAnimation ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="soft-border rounded-[28px] border border-white/10 bg-black/60 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)]"
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
        {step.number}
      </div>
      <h3 className="mt-6 text-[1.9rem] font-semibold tracking-[-0.025em] text-white">
        {step.title}
      </h3>
      <p className="mt-5 text-[15px] leading-7 text-slate-400">
        {step.description}
      </p>
    </motion.article>
  );
}

