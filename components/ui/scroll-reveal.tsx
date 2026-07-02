"use client";

import * as React from "react";
import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
};

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className,
      delay = 0,
      distance = 28,
      amount = 0.18,
      once = false,
      transition,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={cn("will-change-[transform,opacity,filter]", className)}
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: distance, filter: "blur(8px)" }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
        transition={{
          duration: 0.76,
          delay,
          ease: [0.22, 1, 0.36, 1],
          ...transition,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";
