"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IndexLabel } from "./IndexLabel";

interface StackLayer {
  id: string;
  num: string;
  label: string;
  description: string;
  technologies: string[];
  yPosition: number;
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: "presentation",
    num: "01",
    label: "Presentation Layer",
    description: "The interface layer. Engineered with Next.js Server Components for lightning-fast client hydration and buttery-smooth layout paint times.",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    yPosition: -120
  },
  {
    id: "edge",
    num: "02",
    label: "Edge Routing Layer",
    description: "The global routing engine. Leverages Edge Middleware and global CDN points to intercept requests, process cookies, and serve localized static assets in sub-10ms.",
    technologies: ["Vercel Edge", "Cloudflare CDN", "Auth JWT"],
    yPosition: -30
  },
  {
    id: "logic",
    num: "03",
    label: "Logic & API Layer",
    description: "The compute engine. Serverless functions and type-safe routing APIs that compute business logic, sanitize requests, and interface with microservices.",
    technologies: ["Node.js", "GraphQL API", "TRPC Schema"],
    yPosition: 60
  },
  {
    id: "database",
    num: "04",
    label: "Data Infrastructure",
    description: "The state engine. Secure PostgreSQL and key-value Redis structures optimized with connection pooling and query scaling algorithms.",
    technologies: ["PostgreSQL", "Redis Store", "Prisma ORM"],
    yPosition: 150
  }
];

export function ArchitectureVisualizer({ title, indexLabel }: { title: string; indexLabel?: string }) {
  const [activeLayer, setActiveLayer] = useState<StackLayer>(STACK_LAYERS[0]);
  const [isMobile, setIsMobile] = useState(false);
  const activeIndex = STACK_LAYERS.findIndex((l) => l.id === activeLayer.id);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-black overflow-hidden relative">
      <div className="w-full px-[5vw] flex flex-col lg:flex-row gap-20 lg:items-center relative z-10">
        
        {/* Left Column: Minimalist Typographic Accordion List */}
        <div className="lg:w-[45%] flex flex-col justify-center select-none w-full">
          <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/40 uppercase mb-8 flex items-center gap-2">
            <IndexLabel label={indexLabel || "04 / Ecosystem"} />
          </div>
          <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white mb-10 sm:mb-16">
            {title}
          </h2>
          
          <div className="flex flex-col w-full border-b border-white/10">
            {STACK_LAYERS.map((layer) => {
              const isActive = activeLayer.id === layer.id;
              return (
                <div 
                  key={layer.id} 
                  onClick={() => setActiveLayer(layer)}
                  className="group cursor-pointer border-t border-white/10 py-6 flex flex-col transition-all duration-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className={cn(
                        "text-xs font-mono transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {layer.num}
                      </span>
                      <span className={cn(
                        "text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-tight transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {layer.label}
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
                        <p className="text-[14px] leading-[1.6] text-zinc-400 font-light max-w-md pl-6 sm:pl-12 pr-4">
                          {layer.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Pristine Isometric Stack Visualizer */}
        <div className="lg:w-[55%] h-[350px] sm:h-[600px] relative overflow-hidden flex items-center justify-center w-full mt-10 lg:mt-0">
          
          {/* Perspective Container */}
          <div className="relative w-[340px] sm:w-[450px] h-[380px] sm:h-[480px] flex items-center justify-center select-none scale-[0.8] sm:scale-100 origin-center">
            
            {/* Render isometric stack layers */}
            {STACK_LAYERS.map((layer, index) => {
              const isActive = activeLayer.id === layer.id;
              
              // Calculate dynamic Y position with vertical push-offset gap
              let targetY = layer.yPosition;
              if (isMobile) {
                // Squeeze vertical spacing slightly on mobile viewports
                targetY = layer.yPosition * 0.75;
              }

              if (!isActive) {
                if (index < activeIndex) {
                  targetY -= isMobile ? 35 : 45; // Push preceding cards upward
                } else {
                  targetY += isMobile ? 35 : 45; // Push subsequent cards downward
                }
              }
              
              return (
                <motion.div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  className={cn(
                    "absolute w-[290px] sm:w-[420px] h-[72px] sm:h-[88px] rounded-none border-[1.5px] flex items-center px-4 sm:px-8 gap-4 sm:gap-8 cursor-pointer select-none transition-[background-color,border-color,box-shadow,color] duration-500 ease-out",
                    isActive 
                      ? "border-white/90 bg-white text-black shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] z-20" 
                      : "border-white/15 bg-white/[0.01] text-zinc-400 hover:border-white/25 hover:bg-white/[0.03] hover:text-zinc-200 backdrop-blur-md z-10"
                  )}
                  animate={{
                    // Use 2D isometric rotation and skew to preserve subpixel antialiasing and prevent font blurring
                    rotate: isActive ? 0 : -10,
                    skewX: isActive ? 0 : 18,
                    x: isActive ? (isMobile ? -20 : -60) : 0, // slide out slightly on mobile, more on desktop
                    y: targetY,
                    scale: 1
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{
                    outline: "1px solid transparent",
                    backfaceVisibility: "hidden"
                  }}
                >
                  {/* Layer index label */}
                  <span className={cn(
                    "text-xs font-mono tracking-wider transition-colors duration-500",
                    isActive ? "text-zinc-500" : "text-white/20"
                  )}>
                    {layer.num}
                  </span>

                  {/* Layer text content */}
                  <div className="flex-1 flex flex-col justify-center pointer-events-none">
                    <span className={cn(
                      "text-[12px] sm:text-[14px] uppercase tracking-wider transition-colors duration-500",
                      isActive ? "text-black font-bold" : "text-white/90 font-medium"
                    )}>
                      {layer.label}
                    </span>
                    
                    {/* Technologies tags fade/scale in smoothly without shifting layout heights */}
                    <span className={cn(
                      "text-[9px] sm:text-[10px] font-mono tracking-widest uppercase transition-all duration-500 origin-left mt-0.5",
                      isActive ? "opacity-100 scale-100 text-zinc-600" : "opacity-0 scale-95 text-white/0 pointer-events-none"
                    )}>
                      {layer.technologies.join(" // ")}
                    </span>
                  </div>

                  {/* Arrow vector matching agency standards */}
                  <svg className={cn(
                    "w-3.5 h-3.5 transition-all duration-500 pointer-events-none",
                    isActive ? "text-black/80 translate-x-1" : "text-white/10"
                  )} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="2" y1="8" x2="14" y2="8" strokeLinecap="round" />
                    <polyline points="10 4 14 8 10 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
