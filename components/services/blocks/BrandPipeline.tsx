"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IndexLabel } from "./IndexLabel";

interface PipelineNode {
  id: string;
  num: string;
  label: string;
  description: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "identity",
    num: "01",
    label: "Strategy & Identity",
    description: "Architecting core brand DNA, signature vector systems, and strategic brand guidelines designed to command authority.",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.15)",
    icon: (
      <svg className="w-5 h-5 mb-1.5 opacity-90 animate-[spin_24s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m10.607 10.607l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    )
  },
  {
    id: "primitives",
    num: "02",
    label: "Design Primitives",
    description: "Calibrating fluid typography scales, strict optical grids, and responsive HSL color tokens chemically balanced for code.",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7V4h16v3M9 20h6M12 4v16" />
      </svg>
    )
  },
  {
    id: "ui-components",
    num: "03",
    label: "Component Systems",
    description: "Designing unified Figma libraries, component interaction rules, and modular UI tokens optimized for high-performance frontend code.",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18M3 9h18" />
      </svg>
    )
  },
  {
    id: "collateral",
    num: "04",
    label: "Kinetic Assets",
    description: "Producing premium campaign collateral, vector marketing modules, and physics-based motion templates to captivate audiences.",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    )
  }
];

export function BrandPipeline({ title, indexLabel }: { title: string; indexLabel?: string }) {
  const [activeNode, setActiveNode] = useState<PipelineNode>(PIPELINE_NODES[0]);

  return (
    <section className="py-24 sm:py-32 bg-black overflow-hidden relative">

      <div className="w-full px-[5vw] flex flex-col lg:flex-row gap-16 lg:items-center relative z-10">
        
        {/* Left Editorial Index List (Agency Editorial Standard) */}
        <div className="lg:w-[45%] flex flex-col justify-center select-none">
          <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/40 uppercase mb-8 flex items-center gap-2">
            <IndexLabel label={indexLabel || "04 / Ecosystem"} />
          </div>
          <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white mb-16">
            {title}
          </h2>
          
          <div className="flex flex-col w-full border-b border-white/10">
            {PIPELINE_NODES.map((node) => {
              const isActive = activeNode.id === node.id;
              return (
                <div 
                  key={node.id} 
                  onClick={() => setActiveNode(node)}
                  className="group cursor-pointer border-t border-white/10 py-6 flex flex-col transition-all duration-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <span className={cn(
                        "text-xs font-mono transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {node.num}
                      </span>
                      <span className={cn(
                        "text-xl lg:text-2xl font-bold uppercase tracking-tight transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {node.label}
                      </span>
                    </div>
                    
                    {/* Minimalist interactive indicator dot */}
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <div 
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-500 bg-white",
                          isActive ? "scale-100" : "scale-50 opacity-0 group-hover:opacity-30 group-hover:scale-75"
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
                        <p className="text-[14px] leading-[1.6] text-zinc-400 font-light max-w-md pl-8 sm:pl-12 pr-4">
                          {node.description}
                        </p>
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
      
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </section>
  );
}

const Loader: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[400px]">
      <style>{`
        .loader {
          --duration: 3s;
          --primary: #1A3DE8;
          --primary-light: #3b5ef1;
          --primary-rgba: rgba(26, 61, 232, 0);
          width: 200px;
          height: 320px;
          position: relative;
          transform-style: preserve-3d;
          transform: scale(1.0);
        }

        @media (max-width: 480px) {
          .loader {
            zoom: 0.85;
          }
        }

        .loader:before, .loader:after {
          --r: 20.5deg;
          content: "";
          width: 320px;
          height: 140px;
          position: absolute;
          right: 32%;
          bottom: -11px;
          background: #000;
          transform: translateZ(200px) rotate(var(--r));
          animation: mask var(--duration) linear forwards infinite;
        }

        .loader:after {
          --r: -20.5deg;
          right: auto;
          left: 32%;
        }



        .loader .ground {
          position: absolute;
          left: -50px;
          bottom: -120px;
          transform-style: preserve-3d;
          transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
        }

        .loader .ground div {
          transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
          width: 200px;
          height: 200px;
          background: #1A3DE8;
          background: linear-gradient(45deg, #1A3DE8 0%, #1A3DE8 50%, #3b5ef1 50%, #3b5ef1 100%);
          transform-style: preserve-3d;
          animation: ground var(--duration) linear forwards infinite;
        }

        .loader .ground div:before, .loader .ground div:after {
          --rx: 90deg;
          --ry: 0deg;
          --x: 44px;
          --y: 162px;
          --z: -50px;
          content: "";
          width: 156px;
          height: 300px;
          opacity: 0;
          background: linear-gradient(var(--primary), var(--primary-rgba));
          position: absolute;
          transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
          animation: ground-shine var(--duration) linear forwards infinite;
        }

        .loader .ground div:after {
          --rx: 90deg;
          --ry: 90deg;
          --x: 0;
          --y: 177px;
          --z: 150px;
        }

        .loader .box {
          --x: 0;
          --y: 0;
          position: absolute;
          animation: var(--duration) linear forwards infinite;
          transform: translate(var(--x), var(--y));
        }

        .loader .box div {
          background-color: #F4F4F4;
          width: 48px;
          height: 48px;
          position: relative;
          transform-style: preserve-3d;
          animation: var(--duration) ease forwards infinite;
          transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
        }

        .loader .box div:before, .loader .box div:after {
          --rx: 90deg;
          --ry: 0deg;
          --z: 24px;
          --y: -24px;
          --x: 0;
          content: "";
          position: absolute;
          background-color: #111111;
          width: inherit;
          height: inherit;
          transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
        }

        .loader .box div:after {
          --rx: 0deg;
          --ry: 90deg;
          --x: 24px;
          --y: 0;
          background-color: #fd5200;
        }

        .loader .box.box0 { --x: -220px; --y: -120px; left: 58px; top: 108px; }
        .loader .box.box1 { --x: -260px; --y: 120px; left: 25px; top: 120px; }
        .loader .box.box2 { --x: 120px; --y: -190px; left: 58px; top: 64px; }
        .loader .box.box3 { --x: 280px; --y: -40px; left: 91px; top: 120px; }
        .loader .box.box4 { --x: 60px; --y: 200px; left: 58px; top: 132px; }
        .loader .box.box5 { --x: -220px; --y: -120px; left: 25px; top: 76px; }
        .loader .box.box6 { --x: -260px; --y: 120px; left: 91px; top: 76px; }
        .loader .box.box7 { --x: -240px; --y: 200px; left: 58px; top: 87px; }

        .loader .box0 { animation-name: box-move0; }
        .loader .box0 div { animation-name: box-scale0; }
        .loader .box1 { animation-name: box-move1; }
        .loader .box1 div { animation-name: box-scale1; }
        .loader .box2 { animation-name: box-move2; }
        .loader .box2 div { animation-name: box-scale2; }
        .loader .box3 { animation-name: box-move3; }
        .loader .box3 div { animation-name: box-scale3; }
        .loader .box4 { animation-name: box-move4; }
        .loader .box4 div { animation-name: box-scale4; }
        .loader .box5 { animation-name: box-move5; }
        .loader .box5 div { animation-name: box-scale5; }
        .loader .box6 { animation-name: box-move6; }
        .loader .box6 div { animation-name: box-scale6; }
        .loader .box7 { animation-name: box-move7; }
        .loader .box7 div { animation-name: box-scale7; }

        @keyframes box-move0 { 12% { transform: translate(var(--x), var(--y)); } 25%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale0 { 6% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 14%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes box-move1 { 16% { transform: translate(var(--x), var(--y)); } 29%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale1 { 10% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 18%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes box-move2 { 20% { transform: translate(var(--x), var(--y)); } 33%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale2 { 14% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 22%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes box-move3 { 24% { transform: translate(var(--x), var(--y)); } 37%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale3 { 18% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 26%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes box-move4 { 28% { transform: translate(var(--x), var(--y)); } 41%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale4 { 22% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 30%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes box-move5 { 32% { transform: translate(var(--x), var(--y)); } 45%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale5 { 26% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 34%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes box-move6 { 36% { transform: translate(var(--x), var(--y)); } 49%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale6 { 30% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 38%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes box-move7 { 40% { transform: translate(var(--x), var(--y)); } 53%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
        @keyframes box-scale7 { 34% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 42%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
        @keyframes ground { 0%, 65% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); } 75%, 90% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1); } 100% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); } }
        @keyframes ground-shine { 0%, 70% { opacity: 0; } 75%, 87% { opacity: 0.2; } 100% { opacity: 0; } }
        @keyframes mask { 0%, 65% { opacity: 0; } 66%, 100% { opacity: 1; } }
      `}</style>
      <div className="loader">
        <div className="box box0">
          <div></div>
        </div>
        <div className="box box1">
          <div></div>
        </div>
        <div className="box box2">
          <div></div>
        </div>
        <div className="box box3">
          <div></div>
        </div>
        <div className="box box4">
          <div></div>
        </div>
        <div className="box box5">
          <div></div>
        </div>
        <div className="box box6">
          <div></div>
        </div>
        <div className="box box7">
          <div></div>
        </div>
        <div className="ground">
          <div></div>
        </div>
      </div>
    </div>
  );
};
