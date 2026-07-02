"use client";

import React from "react";
import { IndexLabel } from "./IndexLabel";
import {
  ContainerScroll,
  ContainerSticky,
  ProcessCard,
} from "./ContainerScroll";

export type Principle = {
  title: string;
  description?: string;
};

interface DesignPrinciplesProps {
  title: string;
  subtitle?: string;
  principles: Principle[];
  indexLabel?: string;
}

const CARD_THEMES = [
  {
    bg: "#fd5200",
    label: "text-white/60",
    title: "text-white",
    desc: "text-white/75",
    divider: "bg-white/30",
    dot: "bg-white/40",
    watermark: "text-white/[0.08]",
    border: "border-white/10",
  },
  {
    bg: "#111111",
    label: "text-white/40",
    title: "text-white",
    desc: "text-white/60",
    divider: "bg-white/15",
    dot: "bg-white/20",
    watermark: "text-white/[0.05]",
    border: "border-white/8",
  },
  {
    bg: "#F4F4F4",
    label: "text-black/40",
    title: "text-zinc-900",
    desc: "text-zinc-500",
    divider: "bg-black/15",
    dot: "bg-black/20",
    watermark: "text-black/[0.05]",
    border: "border-black/10",
  },
  {
    bg: "#1A3DE8",
    label: "text-white/50",
    title: "text-white",
    desc: "text-white/70",
    divider: "bg-white/25",
    dot: "bg-white/35",
    watermark: "text-white/[0.07]",
    border: "border-white/10",
  },
];


export function DesignPrinciples({ title, subtitle, principles, indexLabel }: DesignPrinciplesProps) {
  return (
    <ContainerScroll className="relative bg-black min-h-[350vh]">
      {/* Noise background for texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />

      <ContainerSticky className="h-screen flex items-center px-[5vw]">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-20 lg:justify-between">
          
          {/* Left Column — width = longest word in title, each word stacks on its own line */}
          <div className="lg:w-max lg:shrink-0 flex flex-col justify-center">
            <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/50 uppercase mb-8 flex items-center gap-2">
              <IndexLabel label={indexLabel || "03 / Philosophy"} />
            </div>
            <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white">
              {title.split(" ").map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
            {subtitle && (
              <p className="mt-8 text-[clamp(14px,1.1vw,16px)] leading-[1.6] text-zinc-300 font-light tracking-wide max-w-xs">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Column — fixed width so card sizes are always consistent */}
          <div className="w-full lg:w-[62vw] lg:shrink-0 flex items-center overflow-visible pt-6 lg:pt-0">
            <div className="flex items-stretch gap-4 w-full overflow-visible relative">
              {principles.map((principle, index) => {
                const theme = CARD_THEMES[index % CARD_THEMES.length];
                return (
                  <ProcessCard
                    key={index}
                    index={index}
                    itemsLength={principles.length}
                    variant="indigo"
                    size="md"
                    className={`flex-col shrink-0 w-[76vw] min-w-[76vw] max-w-[76vw] md:w-[50%] md:min-w-[50%] md:max-w-[50%] relative overflow-hidden p-8 gap-0 h-[380px] md:min-h-[300px] md:h-full ${theme.border}`}
                    style={{ backgroundColor: theme.bg }}
                  >
                    {/* Ghost number watermark */}
                    <span className={`absolute -top-2 right-4 text-[7rem] font-black font-mono leading-none select-none pointer-events-none ${theme.watermark}`}>
                      0{index + 1}
                    </span>

                    {/* Top meta row */}
                    <div className="flex items-center justify-between mb-auto">
                      <span className={`text-[10px] font-mono tracking-[0.25em] uppercase ${theme.label}`}>
                        0{index + 1} — Principle
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                    </div>

                    {/* Principle title */}
                    <h3 className={`text-2xl sm:text-[1.65rem] font-bold tracking-tight leading-snug mt-10 ${theme.title}`}>
                      {principle.title}
                    </h3>

                    {/* Hairline divider */}
                    <div className={`w-8 h-px my-5 ${theme.divider}`} />

                    {/* Description — pushed to bottom with mt-auto when content is short */}
                    {principle.description && (
                      <p className={`text-sm leading-relaxed font-light mt-auto ${theme.desc}`}>
                        {principle.description}
                      </p>
                    )}
                  </ProcessCard>
                );
              })}
            </div>
          </div>

        </div>
      </ContainerSticky>
    </ContainerScroll>
  );
}
