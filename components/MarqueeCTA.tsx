"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MarqueeCTAProps = {
  label?: string;
  speed?: number;
  hoverSpeed?: number;
  className?: string;
};

const marqueeItems = [0, 1, 2, 3];

function MarqueeContent({ label }: { label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-6 pr-6">
      {marqueeItems.map((item) => (
        <span key={item} className="flex shrink-0 items-center gap-6">
          <span>{label}</span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-white/40"
          />
        </span>
      ))}
    </span>
  );
}

export function MarqueeCTA({
  label = "FREE CONSULTATION",
  speed = 28,
  hoverSpeed = 0,
  className,
}: MarqueeCTAProps) {
  const contentRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    const updateWidth = () => {
      setContentWidth(content.offsetWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(content);

    return () => resizeObserver.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || contentWidth === 0) {
      return;
    }

    const next = x.get() - (speed * delta) / 1000;
    x.set(next <= -contentWidth ? next + contentWidth : next);
  });

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative inline-flex h-10 w-[188px] cursor-pointer items-center overflow-hidden rounded-none",
        "border transition-all duration-300 ease-out",
        isHovered
          ? "border-white bg-white text-slate-950 shadow-[0_0_24px_rgba(255,255,255,0.25)]"
          : "border-white/20 bg-black text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className
      )}
    >
      {/* Moving Marquee Container */}
      <motion.span
        initial={false}
        animate={{
          opacity: isHovered ? 0 : 1,
          y: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
        }}
        className="absolute inset-0 flex items-center whitespace-nowrap"
      >
        <motion.span
          style={{ x }}
          className="flex w-max whitespace-nowrap will-change-transform text-[10px] font-semibold uppercase tracking-[0.24em]"
        >
          <span ref={contentRef} className="flex shrink-0">
            <MarqueeContent label={label} />
          </span>
          <MarqueeContent label={label} />
        </motion.span>
      </motion.span>

      {/* Hover Static Text */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-950"
      >
        <span>LET'S TALK</span>
        <motion.svg
          animate={{ x: isHovered ? [0, 4, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="h-3 w-3 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </motion.svg>
      </motion.span>
    </span>
  );
}
