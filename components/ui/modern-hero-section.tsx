"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ 
          width: `min(${width}px, 80vw)`, 
          height: `min(${height}px, 20vw)` 
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.15] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric({
  badge = "UNICX Studio",
  title1 = "Elevate Your",
  title2 = "Digital Vision",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  breadcrumbItems,
  activeMockupSrc,
  hideMockupUntilReady = false,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  activeMockupSrc?: string;
  hideMockupUntilReady?: boolean;
}) {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden bg-[#030303]">
      {/* Ambient background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Floating elegant shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3} width={600} height={140} rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5} width={500} height={120} rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4} width={300} height={80} rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />
        <ElegantShape
          delay={0.6} width={200} height={60} rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7} width={150} height={40} rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
        />
      </div>

      {/* ── Desktop Layout (lg:grid) ── */}
      <div className="relative z-10 hidden lg:grid w-full min-h-screen lg:grid-cols-[4fr_1.5fr]">
        {/* LEFT — marked as CSS container */}
        <div className="[container-type:inline-size] flex flex-col px-[5vw]">
          {/* Viewport content: Label & Heading (ends at bottom of viewport) */}
          <div className="flex min-h-screen flex-col justify-end pb-[8vh] pt-24">
            {breadcrumbItems && breadcrumbItems.length > 0 && (
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="mb-4"
              >
                <Breadcrumbs items={breadcrumbItems} className="mb-0" />
              </motion.div>
            )}
            {/* Label */}
            <motion.p
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-xs font-bold uppercase tracking-[0.2em] text-white"
            >
              {badge}
            </motion.p>

            {/* Giant heading */}
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-[5vw]"
            >
              {/* cqi = % of container inline size — long words auto-fit column */}
              <h1
                className="font-bold uppercase leading-[0.85] tracking-tight text-white"
                style={{ fontSize: 'clamp(2.2rem, 15cqi, 14rem)' }}
              >
                {`${title1} ${title2}`
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((word, idx, arr) => (
                    <span key={idx}>
                      {word}
                      {idx < arr.length - 1 && <br />}
                    </span>
                  ))}
              </h1>
            </motion.div>
          </div>

          {/* Description — pushed below the viewport fold */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="py-[12vh]"
          >
            <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-white/80">
              {description}
            </p>
          </motion.div>
        </div>

        {/* RIGHT — sticky screen centered container: image NEVER moves when text pushes layout */}
        {activeMockupSrc ? (
          <div className="relative hidden lg:block h-full w-full">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-indigo-500/[0.04] to-transparent" />
            <div className="sticky top-0 flex h-screen items-center justify-center px-4">
              <div
                data-detail-mockup
                className={cn(
                  "relative w-full overflow-hidden",
                  "aspect-[3/4] rounded-none",
                  "border border-white/[0.10]",
                  "shadow-[0_60px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]",
                  "translate-y-[3vw]",
                  hideMockupUntilReady ? "opacity-0" : "opacity-100"
                )}
              >
                <img src={activeMockupSrc} alt={`${title1} ${title2} Mockup`} className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block" />
        )}
      </div>

      {/* ── Mobile Layout (lg:hidden) ── */}
      <div className="relative z-10 block lg:hidden w-full">
        {/* TOP HALF: Text Container */}
        <div className="flex min-h-[70vh] flex-col justify-end px-6 pb-12 pt-28">
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-4"
            >
              <Breadcrumbs items={breadcrumbItems} className="mb-0" />
            </motion.div>
          )}
          {/* Label */}
          <motion.p
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-6"
          >
            {badge}
          </motion.p>

          {/* Title */}
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold uppercase tracking-tight text-white leading-[1.1] mb-8"
          >
            {`${title1} ${title2}`}
          </motion.h1>

          {/* Description (in place of metadata) */}
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-base font-normal leading-[1.4] text-white max-w-md border-t border-white/10 pt-6"
          >
            {description}
          </motion.p>
        </div>

        {/* BOTTOM HALF: Mockup Image Container */}
        {activeMockupSrc && (
          <div className="relative w-full bg-[#f5f5f7] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.03] to-transparent" />
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <div
                className={cn(
                  "relative w-full",
                  hideMockupUntilReady ? "opacity-0" : "opacity-100"
                )}
              >
                <img src={activeMockupSrc} alt={`${title1} ${title2} Mockup`} className="w-full h-auto block" />
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Page-edge vignette */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </section>
  );
}
