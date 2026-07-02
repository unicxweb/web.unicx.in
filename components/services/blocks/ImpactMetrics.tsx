"use client";

import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { HyperText } from "@/components/ui/hyper-text";
import { IndexLabel } from "./IndexLabel";

export type Metric = {
  value: string;
  label: string;
  color?: string;
};

// Studio page theme colors to cycle through
const STUDIO_COLORS = ["#fd5200", "#1A3DE8", "#000000", "#1A3DE8"];

export function ImpactMetrics({ title, metrics, indexLabel = "04 / Impact" }: { title: string; metrics: Metric[]; indexLabel?: string }) {
  return (
    <section className="py-24 sm:py-32 bg-white text-zinc-950">
      {/* Full-width container with consistent edge padding */}
      <div className="w-full px-[5vw] relative z-10">
        
        {/* Category Label matching capabilities style */}
        <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-8 flex items-center gap-2">
          <IndexLabel label={indexLabel} />
        </div>
        
        {/* Main Title matching capabilities style */}
        <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-zinc-950 mb-16">
          {title}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-4">
          {metrics.map((metric, i) => {
            // Check if there is a number at the start of the value string
            const match = metric.value.match(/^[+-]?\d+(\.\d+)?/);
            
            // Cycle through the predefined Studio theme colors (Orange, Blue, Black)
            const displayColor = STUDIO_COLORS[i % STUDIO_COLORS.length];

            let content;
            if (match) {
              const numericStr = match[0];
              const numericValue = parseFloat(numericStr);
              const suffix = metric.value.slice(numericStr.length);
              
              // Calculate decimal places dynamically (e.g., 2.5x -> 1 decimal place)
              const decimalPart = numericStr.split(".")[1];
              const decimalPlaces = decimalPart ? decimalPart.length : 0;
              
              content = (
                <div className="flex items-baseline overflow-hidden">
                  <NumberTicker 
                    value={numericValue} 
                    decimalPlaces={decimalPlaces} 
                    className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-inherit"
                  />
                  {suffix && (
                    <span className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter ml-1">
                      {suffix}
                    </span>
                  )}
                </div>
              );
            } else {
              // Text values: render using scramble HyperText component
              content = (
                <HyperText 
                  className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-inherit"
                  startOnView={true}
                  animateOnHover={true}
                >
                  {metric.value}
                </HyperText>
              );
            }

            return (
              <div key={i} className="flex flex-col gap-4">
                <div 
                  className="tracking-tighter" 
                  style={{ color: displayColor }}
                >
                  {content}
                </div>
                <div className="h-px bg-zinc-200" />
                <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
