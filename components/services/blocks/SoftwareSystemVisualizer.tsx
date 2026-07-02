"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IndexLabel } from "./IndexLabel";

interface SystemStage {
  id: string;
  num: string;
  label: string;
  description: string;
  technologies: string[];
}

const SYSTEM_STAGES: SystemStage[] = [
  {
    id: "ingestion",
    num: "01",
    label: "Ingestion & Gateways",
    description: "Multi-channel data entry points. Standardized with reverse proxies, SSL/TLS terminates, API Gateway routers, and token verifiers to handle heavy traffic spikes.",
    technologies: ["NGINX", "GraphQL API", "AWS Gateway"]
  },
  {
    id: "processing",
    num: "02",
    label: "Queue & Compute Core",
    description: "Asynchronous task execution. Microservices consume messages from durable transaction queues, executing background tasks, media transcoding, and PDF generation.",
    technologies: ["Redis Queue", "Node.js Workers", "Docker Clusters"]
  },
  {
    id: "storage",
    num: "03",
    label: "Relational & Cache Vault",
    description: "High-integrity ACID databases. Primary write-master databases synchronized with read-replicas, secured inside private networks with sub-millisecond key-value caches.",
    technologies: ["PostgreSQL", "Redis Cache", "E2E Isolation"]
  },
  {
    id: "reporting",
    num: "04",
    label: "Aggregation & BI Hub",
    description: "Data warehousing. ETL (Extract, Transform, Load) pipelines process raw operational tables into denormalized schemas optimized for ultra-fast business intelligence charts.",
    technologies: ["ClickHouse DB", "Metabase Reports", "CSV Exporter"]
  }
];

export function SoftwareSystemVisualizer({ title, indexLabel }: { title: string; indexLabel?: string }) {
  const [activeStage, setActiveStage] = useState<SystemStage>(SYSTEM_STAGES[0]);

  // Renders different diagram setups depending on active step
  const renderDiagram = (id: string) => {
    switch (id) {
      case "ingestion":
        return (
          <motion.div 
            key="ingestion-diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col justify-center items-center p-8 text-white relative font-mono text-[11px]"
          >
            {/* Diagram Title */}
            <div className="absolute top-6 left-6 flex flex-col">
              <span className="text-[10px] uppercase text-zinc-500 tracking-widest">Pipeline Layer</span>
              <span className="text-xs font-bold tracking-tight text-white mt-0.5">Data Ingest Node</span>
            </div>

            {/* Simple schematic of gateway nodes */}
            <div className="flex items-center gap-10 z-10">
              
              {/* Clients */}
              <div className="flex flex-col gap-3">
                <div className="border border-white/10 bg-zinc-950 px-3 py-1.5 rounded text-center text-[10px] text-zinc-400">Web App</div>
                <div className="border border-white/10 bg-zinc-950 px-3 py-1.5 rounded text-center text-[10px] text-zinc-400">Mobile API</div>
                <div className="border border-white/10 bg-zinc-950 px-3 py-1.5 rounded text-center text-[10px] text-zinc-400">Webhooks</div>
              </div>

              {/* Data paths (animated arrows) */}
              <div className="flex flex-col gap-6 items-center">
                <div className="w-12 h-px bg-white/20 relative">
                  <motion.div 
                    animate={{ left: ["0%", "100%"] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute -top-1 w-2 h-2 rounded-full bg-white" 
                  />
                </div>
                <div className="w-12 h-px bg-white/20 relative">
                  <motion.div 
                    animate={{ left: ["0%", "100%"] }} 
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 0.3 }}
                    className="absolute -top-1 w-2 h-2 rounded-full bg-white" 
                  />
                </div>
                <div className="w-12 h-px bg-white/20 relative">
                  <motion.div 
                    animate={{ left: ["0%", "100%"] }} 
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear", delay: 0.6 }}
                    className="absolute -top-1 w-2 h-2 rounded-full bg-white" 
                  />
                </div>
              </div>

              {/* Gateway Core */}
              <div className="w-40 border border-white bg-white text-black p-4 rounded text-center shadow-[0_15px_30px_rgba(255,255,255,0.1)] flex flex-col justify-center">
                <span className="font-extrabold text-xs">REVERSE PROXY</span>
                <span className="text-[9px] font-bold text-black/60 tracking-wider mt-1">NGINX / SSL LOAD BALANCER</span>
                <div className="border-t border-black/10 mt-3 pt-2 text-[8px] font-mono text-black/50">
                  RATE LIMIT: 10k/sec OK
                </div>
              </div>

            </div>

            <div className="absolute bottom-6 text-center text-[9px] text-zinc-600 tracking-widest uppercase">
              Ingress validation protocol: SSL/TLS handshakes stable
            </div>
          </motion.div>
        );

      case "processing":
        return (
          <motion.div 
            key="processing-diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col justify-center items-center p-8 text-white relative font-mono text-[11px]"
          >
            {/* Diagram Title */}
            <div className="absolute top-6 left-6 flex flex-col">
              <span className="text-[10px] uppercase text-zinc-500 tracking-widest">Pipeline Layer</span>
              <span className="text-xs font-bold tracking-tight text-white mt-0.5">Asynchronous Compute</span>
            </div>

            {/* Queue structure and workers */}
            <div className="flex flex-col gap-6 items-center z-10 mt-4">
              
              {/* Redis Queue Container */}
              <div className="w-56 border border-white/10 bg-zinc-950 p-3.5 rounded flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Redis Broker Queue</span>
                  <span className="text-[9px] text-emerald-400">ACTIVE</span>
                </div>
                
                {/* Horizontal buffered queue items */}
                <div className="flex gap-1.5 h-6 items-center border border-white/5 p-1 bg-[#050505] rounded">
                  <div className="flex-1 bg-white/40 h-full rounded-sm" />
                  <div className="flex-1 bg-white/60 h-full rounded-sm" />
                  <div className="flex-1 bg-white/80 h-full rounded-sm animate-pulse" />
                  <div className="flex-1 bg-white h-full rounded-sm" />
                  <div className="w-8 flex items-center justify-center text-[8px] text-zinc-500 font-mono">BULL</div>
                </div>
              </div>

              {/* Workers pool */}
              <div className="flex gap-4">
                <div className="w-24 border border-white/10 bg-zinc-900 p-2.5 rounded text-center">
                  <span className="text-[10px] font-bold text-zinc-400">WORKER 01</span>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div animate={{ x: [-30, 96] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-8 h-full bg-white rounded-full" />
                  </div>
                </div>
                <div className="w-24 border border-white/10 bg-zinc-900 p-2.5 rounded text-center">
                  <span className="text-[10px] font-bold text-zinc-400">WORKER 02</span>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div animate={{ x: [-30, 96] }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear", delay: 0.4 }} className="w-8 h-full bg-white rounded-full" />
                  </div>
                </div>
              </div>

            </div>

            <div className="absolute bottom-6 text-center text-[9px] text-zinc-600 tracking-widest uppercase">
              Broker health: 0 failed tasks // worker threads idle
            </div>
          </motion.div>
        );

      case "storage":
        return (
          <motion.div 
            key="storage-diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col justify-center items-center p-8 text-white relative font-mono text-[11px]"
          >
            {/* Diagram Title */}
            <div className="absolute top-6 left-6 flex flex-col">
              <span className="text-[10px] uppercase text-zinc-500 tracking-widest">Pipeline Layer</span>
              <span className="text-xs font-bold tracking-tight text-white mt-0.5">ACID Database Isolation</span>
            </div>

            {/* Relational database layout */}
            <div className="flex gap-8 items-center z-10">
              
              {/* PostgreSQL Schema Node */}
              <div className="w-40 border border-white/10 bg-zinc-950 p-4 rounded flex flex-col">
                <div className="border-b border-white/10 pb-2 mb-2 flex items-center justify-between">
                  <span className="font-bold text-zinc-300">PostgreSQL</span>
                  <span className="text-[8px] bg-white/10 px-1 rounded text-white/50">Port 5432</span>
                </div>
                <div className="flex flex-col gap-1.5 text-[9px] text-zinc-500">
                  <div className="flex justify-between"><span>[schema] users</span><span className="text-emerald-400">SELECT</span></div>
                  <div className="flex justify-between"><span>[schema] ledger</span><span className="text-white">COMMIT</span></div>
                  <div className="flex justify-between"><span>[schema] tokens</span><span className="text-zinc-600">IDLE</span></div>
                </div>
              </div>

              {/* Cache bridge */}
              <div className="flex flex-col gap-2 items-center text-[8px] text-zinc-600">
                <div className="w-8 h-px bg-white/20" />
                <span>CACHE REFRESH</span>
                <div className="w-8 h-px bg-white/20" />
              </div>

              {/* Redis Key Value Cluster */}
              <div className="w-36 border border-white/10 bg-zinc-950 p-4 rounded flex flex-col">
                <div className="border-b border-white/10 pb-2 mb-2">
                  <span className="font-bold text-zinc-300">Redis Cache</span>
                </div>
                <div className="flex flex-col gap-1 text-[8px] text-zinc-500">
                  <div className="truncate">GET session:active:9810</div>
                  <div className="truncate">SET auth:token:8a92</div>
                  <div className="text-[8px] font-mono text-emerald-400 mt-2">HIT RATE: 99.4%</div>
                </div>
              </div>

            </div>

            <div className="absolute bottom-6 text-center text-[9px] text-zinc-600 tracking-widest uppercase">
              Private Subnet Isolation: VPC access restriction active
            </div>
          </motion.div>
        );

      case "reporting":
        return (
          <motion.div 
            key="reporting-diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col justify-between p-8 text-white relative font-mono text-[11px]"
          >
            {/* Diagram Title */}
            <div className="absolute top-6 left-6 flex flex-col">
              <span className="text-[10px] uppercase text-zinc-500 tracking-widest">Pipeline Layer</span>
              <span className="text-xs font-bold tracking-tight text-white mt-0.5">Aggregated BI Warehousing</span>
            </div>

            {/* Metric charts and CSV pipeline */}
            <div className="flex-1 flex flex-col justify-center items-center mt-12 gap-5 z-10">
              
              {/* ClickHouse Columnar DB representation */}
              <div className="w-64 border border-white bg-white text-black p-3.5 rounded flex flex-col">
                <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">OLAP Columnar DB</span>
                  <span className="text-[8px] font-mono bg-black/10 px-1 rounded text-black/60">Fast Queries</span>
                </div>
                
                {/* Simulated table column weights */}
                <div className="flex gap-2 items-end h-12 mt-1">
                  <div className="flex-1 bg-black/20 h-[50%]" />
                  <div className="flex-1 bg-black/40 h-[70%]" />
                  <div className="flex-1 bg-black/60 h-[40%]" />
                  <div className="flex-1 bg-black h-[95%]" />
                </div>
              </div>

              {/* Data aggregate metrics */}
              <div className="flex gap-4">
                <div className="border border-white/10 bg-zinc-950 p-2.5 rounded text-center w-28">
                  <div className="text-[8px] text-zinc-500 uppercase tracking-widest">Aggregated</div>
                  <div className="text-xs font-bold mt-0.5">4.2M Rows</div>
                </div>
                <div className="border border-white/10 bg-zinc-950 p-2.5 rounded text-center w-28">
                  <div className="text-[8px] text-zinc-500 uppercase tracking-widest">ETL Interval</div>
                  <div className="text-xs font-bold mt-0.5">60s Sync</div>
                </div>
              </div>

            </div>

            <div className="text-center text-[9px] text-zinc-600 tracking-widest uppercase">
              OLAP status: denormalized read schemas compiled
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-black overflow-hidden relative">
      <div className="w-full px-[5vw] flex flex-col lg:flex-row gap-16 lg:items-center relative z-10">
        
        {/* Left Column: Minimalist Typographic Accordion List */}
        <div className="lg:w-[45%] flex flex-col justify-start select-none">
          <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/40 uppercase mb-8 flex items-center gap-2">
            <IndexLabel label={indexLabel || "04 / Core Engine"} />
          </div>
          <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white mb-16">
            {title}
          </h2>
          
          <div className="flex flex-col w-full border-b border-white/10">
            {SYSTEM_STAGES.map((stage) => {
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
                        {stage.num}
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
                        
                        {/* Render associated technologies chips */}
                        <div className="flex flex-wrap gap-2 pl-12">
                          {stage.technologies.map((tech) => (
                            <span 
                              key={tech} 
                              className="text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-zinc-400"
                            >
                              {tech}
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

        {/* Right Column: MacBook Pro Mockup with Interactive Blueprint System Diagrams */}
        <div className="lg:w-[55%] flex flex-col items-center justify-center lg:pt-0">
          
          {/* Laptop scale wrapper to handle mobile/tablet viewports cleanly */}
          <div className="flex flex-col items-center justify-center scale-[0.55] xs:scale-[0.7] sm:scale-[0.85] md:scale-100 lg:scale-[0.85] xl:scale-100 origin-center my-[-60px] sm:my-0">
            
            {/* MacBook Screen Bezel */}
            <div className="relative w-[480px] h-[300px] rounded-t-2xl border-[10px] border-zinc-900 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
              
              {/* Screen Inner Viewport */}
              <div className="w-full h-full relative z-10 bg-[#050505] overflow-hidden">
                {/* Blueprint Grid Lines Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

                {/* Dynamic screen content container */}
                <div className="w-full h-full relative z-10">
                  <AnimatePresence mode="wait">
                    {renderDiagram(activeStage.id)}
                  </AnimatePresence>
                </div>
              </div>

              {/* Glass reflection highlight */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(130deg,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
            </div>

            {/* MacBook Base (Thicker keyboard deck and nested wedge tray for realistic 3D display) */}
            <div className="relative flex flex-col items-center">
              {/* Upper Deck */}
              <div className="w-[540px] h-[16px] bg-zinc-800 rounded-b-xl border-t-[1.5px] border-zinc-600 relative flex justify-center shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-10">
                {/* Thumb Groove */}
                <div className="absolute top-0 w-20 h-2 bg-zinc-950 rounded-b-md" />
              </div>
              {/* Lower Tapered Wedge Tray */}
              <div className="w-[500px] h-[6px] bg-zinc-900 rounded-b-lg border-t border-zinc-800/80 mt-[-1px] shadow-[0_15px_30px_rgba(0,0,0,0.9)]" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
