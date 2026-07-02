"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type InteractiveGridPatternProps = {
  className?: string;
  squaresClassName?: string;
  width?: number;
  height?: number;
  squares?: [number, number];
};

export function InteractiveGridPattern({
  className,
  squaresClassName,
  width = 40,
  height = 40,
  squares = [24, 24],
}: InteractiveGridPatternProps) {
  const [activeSquare, setActiveSquare] = useState<number | null>(null);
  const [columns, rows] = squares;

  return (
    <div
      className={cn("pointer-events-auto absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, ${width}px)`,
          gridTemplateRows: `repeat(${rows}, ${height}px)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, index) => {
          const isActive = activeSquare === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setActiveSquare(index)}
              onMouseLeave={() => setActiveSquare(null)}
              className={cn(
                "border border-white/[0.08] bg-white/[0.015] transition duration-300",
                isActive && "bg-white/[0.18] duration-75",
                squaresClassName
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
