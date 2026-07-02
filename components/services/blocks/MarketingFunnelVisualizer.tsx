"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IndexLabel } from "./IndexLabel";

interface FunnelStage {
  id: string;
  num: string;
  label: string;
  description: string;
  channels: string[];
  metricLabel: string;
  metricValue: string;
  subLabel: string;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: "acquisition",
    num: "01",
    label: "Traffic Acquisition",
    description: "Multi-channel intent capturing. Directing high-relevance traffic via targeted Technical SEO, organic rank dominance, and optimized Paid Search/Social ad creatives.",
    channels: ["Technical SEO", "Google Ads", "Meta Paid Social"],
    metricLabel: "Traffic Velocity",
    metricValue: "124,820/mo",
    subLabel: "Active session ingress // +14.2% YoY"
  },
  {
    id: "engagement",
    num: "02",
    label: "User Engagement",
    description: "Nurturing interest. Capturing prospects with high-contrast copy, interactive content hubs, speed-optimized reading viewports, and zero layout frictions.",
    channels: ["Copywriting", "Interactive Demos", "UX Optimization"],
    metricLabel: "Session Hold",
    metricValue: "4m 12s avg",
    subLabel: "98% Scroll depth heatmap hotspot"
  },
  {
    id: "conversion",
    num: "03",
    label: "Conversion Engine",
    description: "Maximizing yield. Structuring robust A/B testing on call-to-actions, value propositions, checkout funnels, and trust indicators to drive conversions.",
    channels: ["A/B Testing", "Frictionless Forms", "Checkout Optim"],
    metricLabel: "Conversion Yield",
    metricValue: "4.82% CVR",
    subLabel: "Checkout conversion lift // +210% increase"
  },
  {
    id: "retention",
    num: "04",
    label: "Retention & LTV Loops",
    description: "Re-activating value. Automated post-purchase messaging flows, segment behavior email triggers, and SMS retargeting cycles to drive lifetime loyalty.",
    channels: ["Klaviyo Flows", "Loyalty Rewards", "Behavior Triggers"],
    metricLabel: "LTV Multiplier",
    metricValue: "3.5x Value",
    subLabel: "Automated segment loops active"
  }
];



export function MarketingFunnelVisualizer({ title, indexLabel }: { title: string; indexLabel?: string }) {
  const [activeStage, setActiveStage] = useState<FunnelStage>(FUNNEL_STAGES[0]);



  return (
    <section className="py-24 sm:py-32 bg-black overflow-hidden relative">
      <div className="w-full px-[5vw] flex flex-col lg:flex-row gap-20 lg:items-center relative z-10">
        
        {/* Left Column: Minimalist Typographic Accordion List */}
        <div className="lg:w-[45%] flex flex-col justify-start select-none">
          <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/40 uppercase mb-8 flex items-center gap-2">
            <IndexLabel label={indexLabel || "04 / Pipeline"} />
          </div>
          <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white mb-16">
            {title}
          </h2>
          
          <div className="flex flex-col w-full border-b border-white/10">
            {FUNNEL_STAGES.map((stage) => {
              const isActive = activeStage.id === stage.id;
              return (
                <div 
                  key={stage.id} 
                  onClick={() => setActiveStage(stage)}
                  className="group cursor-pointer border-t border-white/10 py-6 flex flex-col transition-all duration-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <span className={cn(
                        "text-xs font-mono transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {stepNum(stage.id)}
                      </span>
                      <span className={cn(
                        "text-xl lg:text-2xl font-bold uppercase tracking-tight transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {stage.label}
                      </span>
                    </div>
                    
                    {/* Minimalist interactive indicator dot */}
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <div 
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-500 bg-white",
                          isActive ? "scale-100 animate-pulse" : "scale-50 opacity-0 group-hover:opacity-30 group-hover:scale-75"
                        )}
                      />
                    </div>
                  </div>

                  {/* Expandable description block */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[14px] leading-[1.6] text-zinc-400 font-light max-w-md pl-12 pr-4 mb-4">
                          {stage.description}
                        </p>
                        
                        {/* Channels Chips */}
                        <div className="flex flex-wrap gap-2 pl-12">
                          {stage.channels.map((chan) => (
                            <span 
                              key={chan} 
                              className="text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-zinc-400"
                            >
                              {chan}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 3D Animated Loader */}
        <div className="lg:w-[55%] flex justify-center items-center lg:pt-0">
          <Loader />
        </div>

      </div>
    </section>
  );
}

// Utility to fetch stage numbers
function stepNum(id: string) {
  switch (id) {
    case "acquisition": return "01";
    case "engagement": return "02";
    case "conversion": return "03";
    case "retention": return "04";
    default: return "01";
  }
}

const Loader: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[300px]">
      <style>{`
        .boxes {
          --size: 64px;
          --duration: 800ms;
          height: calc(var(--size) * 2);
          width: calc(var(--size) * 3);
          position: relative;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          margin-top: calc(var(--size) * 1.5 * -1);
          transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
        }

        .boxes .box {
          width: var(--size);
          height: var(--size);
          top: 0;
          left: 0;
          position: absolute;
          transform-style: preserve-3d;
        }

        .boxes .box:nth-child(1) {
          transform: translate(100%, 0);
          animation: box1 var(--duration) linear infinite;
        }

        .boxes .box:nth-child(2) {
          transform: translate(0, 100%);
          animation: box2 var(--duration) linear infinite;
        }

        .boxes .box:nth-child(3) {
          transform: translate(100%, 100%);
          animation: box3 var(--duration) linear infinite;
        }

        .boxes .box:nth-child(4) {
          transform: translate(200%, 0);
          animation: box4 var(--duration) linear infinite;
        }

        .boxes .box > div {
          --background: #1A3DE8;
          --top: auto;
          --right: auto;
          --bottom: auto;
          --left: auto;
          --translateZ: calc(var(--size) / 2);
          --rotateY: 0deg;
          --rotateX: 0deg;
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--background);
          top: var(--top);
          right: var(--right);
          bottom: var(--bottom);
          left: var(--left);
          transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
        }

        .boxes .box > div.face-right {
          --background: #111111;
          --right: 0;
          --rotateY: 90deg;
        }

        .boxes .box > div.face-back {
          --background: #fd5200;
          --bottom: 0;
          --rotateX: -90deg;
        }

        .boxes .box > div.face-top {
          --background: #F4F4F4;
          --translateZ: calc(var(--size) / 2);
        }

        @keyframes box1 {
          0%, 50% { transform: translate(100%, 0); }
          100% { transform: translate(200%, 0); }
        }

        @keyframes box2 {
          0% { transform: translate(0, 100%); }
          50% { transform: translate(0, 0); }
          100% { transform: translate(100%, 0); }
        }

        @keyframes box3 {
          0%, 50% { transform: translate(100%, 100%); }
          100% { transform: translate(0, 100%); }
        }

        @keyframes box4 {
          0% { transform: translate(200%, 0); }
          50% { transform: translate(200%, 100%); }
          100% { transform: translate(100%, 100%); }
        }
      `}</style>
      <div className="boxes scale-[2]">
        <div className="box box-1">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
        <div className="box box-2">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
        <div className="box box-3">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
        <div className="box box-4">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
      </div>
    </div>
  );
};
