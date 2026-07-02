"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: string[];
}

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  startOnView = true,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Triggers once when scrolled into view
  const isInView = useInView(containerRef, { once: true, margin: "0px" });

  const startScramble = () => {
    let iterations = 0;
    const textLength = children.length || 1;
    const intervalDuration = duration / textLength;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!containerRef.current) return;

      const scrambled = children
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iterations) {
            return children[index];
          }
          return characterSet[Math.floor(Math.random() * characterSet.length)];
        })
        .join("");

      containerRef.current.textContent = scrambled;
      iterations += 0.5;

      if (iterations >= children.length) {
        containerRef.current.textContent = children;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, intervalDuration);
  };

  useEffect(() => {
    if (startOnView && isInView) {
      const timer = setTimeout(() => {
        startScramble();
      }, delay);
      return () => {
        clearTimeout(timer);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isInView, startOnView, delay, children]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={cn("inline-block cursor-default", className)}
      onMouseEnter={() => {
        if (animateOnHover) {
          startScramble();
        }
      }}
    >
      {children}
    </span>
  );
}
