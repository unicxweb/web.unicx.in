"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

type WobbleCardProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  href?: string;
  "aria-label"?: string;
};

export function WobbleCard({
  children,
  className,
  containerClassName,
  href,
  "aria-label": ariaLabel,
}: WobbleCardProps) {
  const ref = React.useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 170, damping: 28, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 170, damping: 28, mass: 0.8 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["1.4deg", "-1.4deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-1.6deg", "1.6deg"]);
  const sheenX = useTransform(springX, [-0.5, 0.5], ["18%", "82%"]);
  const sheenY = useTransform(springY, [-0.5, 0.5], ["18%", "82%"]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.12), transparent 34%)`;

  const onMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const onMouseLeave = React.useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const content = (
    <motion.div
      className={cn(
        "soft-border group relative h-full overflow-hidden rounded-[30px] border border-white/10 bg-zinc-950 text-left shadow-[0_18px_60px_rgba(0,0,0,0.18)] outline-none transition-colors duration-500 hover:border-white/20 hover:bg-zinc-900/70",
        containerClassName
      )}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: sheen }} />
      <div className={cn("relative h-full p-6 sm:p-8", className)}>
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className="block h-full outline-none"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </div>
  );
}
