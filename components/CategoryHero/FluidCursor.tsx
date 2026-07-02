"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface FluidCursorProps {
  isHoveringPill: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function FluidCursor({ isHoveringPill, containerRef }: FluidCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-driven cursor position
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-[100] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        width: isHoveringPill ? 64 : 12,
        height: isHoveringPill ? 28 : 12,
        borderRadius: isHoveringPill ? 14 : 6,
      }}
      transition={{
        width: { type: "spring", stiffness: 400, damping: 25 },
        height: { type: "spring", stiffness: 400, damping: 25 },
        borderRadius: { type: "spring", stiffness: 400, damping: 25 },
        opacity: { duration: 0.15 },
      }}
    >
      <div
        className="absolute inset-0 rounded-full bg-white"
        style={{
          borderRadius: isHoveringPill ? 14 : 6,
          transition: "border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <motion.span
        className="relative z-10 text-[9px] font-semibold uppercase tracking-[0.15em] text-black"
        animate={{ opacity: isHoveringPill ? 1 : 0, scale: isHoveringPill ? 1 : 0.5 }}
        transition={{ duration: 0.2, delay: isHoveringPill ? 0.08 : 0 }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
