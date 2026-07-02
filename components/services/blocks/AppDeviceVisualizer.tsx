"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IndexLabel } from "./IndexLabel";

interface AppStep {
  id: string;
  num: string;
  label: string;
  description: string;
  features: string[];
}

const APP_STEPS: AppStep[] = [
  {
    id: "ui",
    num: "01",
    label: "Client Interface",
    description: "The mobile viewport. Implemented with native widgets or high-performance cross-platform frameworks to ensure a buttery-smooth 120Hz scrolling feel.",
    features: ["SwiftUI / Kotlin", "React Native", "120Hz Animation"]
  },
  {
    id: "native",
    num: "02",
    label: "Hardware & Native API",
    description: "Deep native access. Interfaces with device biometrics, secure storage vaults, push notification centers, and hardware sensors.",
    features: ["FaceID Secure", "Background Push", "Sensor Bridge"]
  },
  {
    id: "sync",
    num: "03",
    label: "Real-time Sync & Cache",
    description: "Offline-first databases. Automatically caches data locally, resolving conflicts and syncing to the cloud when connectivity returns.",
    features: ["SQLite Cache", "Conflict Resolution", "Sub-10ms Queries"]
  },
  {
    id: "security",
    num: "04",
    label: "Cloud Gateway & Security",
    description: "Secure data pipelines. Standardized with OAuth2, rate limiters, end-to-end payload encryption, and microservices compute routing.",
    features: ["E2E Encryption", "OAuth2 Protocol", "Compute Gateway"]
  }
];

export function AppDeviceVisualizer({ title, indexLabel }: { title: string; indexLabel?: string }) {
  const [activeStep, setActiveStep] = useState<AppStep>(APP_STEPS[0]);

  // Screen content renderer based on active step
  const renderScreenContent = (id: string) => {
    switch (id) {
      case "ui":
        return (
          <motion.div 
            key="ui-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col p-5 pt-16 bg-[#0a0a0a] text-white select-none"
          >
            {/* Header bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Dashboard</span>
                <span className="text-sm font-bold tracking-tight mt-0.5">Overview</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                UA
              </div>
            </div>

            {/* Main chart visual */}
            <div className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl mb-4 flex flex-col">
              <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-500">Weekly Usage</span>
              <span className="text-xl font-bold tracking-tight mt-0.5">$14,240</span>
              
              {/* Graphic bars */}
              <div className="flex gap-2 items-end h-16 mt-4">
                <div className="flex-1 bg-zinc-800 h-[30%] rounded-sm" />
                <div className="flex-1 bg-zinc-800 h-[55%] rounded-sm" />
                <div className="flex-1 bg-zinc-700 h-[40%] rounded-sm" />
                <div className="flex-1 bg-zinc-600 h-[75%] rounded-sm" />
                <div className="flex-1 bg-white h-[95%] rounded-sm" />
              </div>
            </div>

            {/* List items */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 p-2.5 bg-zinc-900/30 border border-white/5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <div className="flex-1 flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wide">Sync Complete</span>
                  <span className="text-[9px] text-zinc-500">All data backed up</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-zinc-900/30 border border-white/5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <div className="flex-1 flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wide">Processing Pipeline</span>
                  <span className="text-[9px] text-zinc-500">Edge database active</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "native":
        return (
          <motion.div 
            key="native-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col justify-between p-5 pt-16 bg-[#0a0a0a] text-white select-none relative"
          >
            {/* Custom Push Notification sliding in from Dynamic Island */}
            <motion.div 
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-12 left-4 right-4 bg-zinc-900 border border-white/10 rounded-xl p-3 shadow-2xl flex gap-3 items-center"
            >
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-extrabold text-[10px]">
                UA
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[10px] font-bold">Push Notification</span>
                <span className="text-[9px] text-zinc-400">Security authorization complete</span>
              </div>
            </motion.div>

            {/* Central Face Scanner Graphics */}
            <div className="flex-1 flex flex-col items-center justify-center mt-12">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Scanner circle outline */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-dashed border-white/20 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-24 h-24 border border-white/10 rounded-full flex items-center justify-center"
                />
                {/* FaceID Vector icon */}
                <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h.01M9 9h.01M9 15h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-4">Biometric Vault</span>
            </div>

            <div className="text-center py-4">
              <span className="text-[10px] text-zinc-600 font-mono">SECURE HARDWARE API ACCESSED</span>
            </div>
          </motion.div>
        );

      case "sync":
        return (
          <motion.div 
            key="sync-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col justify-between p-5 pt-16 bg-[#0a0a0a] text-white select-none"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Sync Status</span>
              <span className="text-sm font-bold tracking-tight mt-0.5">Offline Sync Cache</span>
            </div>

            {/* Offline diagram nodes */}
            <div className="flex flex-col items-center justify-center my-auto gap-8">
              
              {/* Local Device Cache */}
              <div className="w-36 border border-white/10 bg-zinc-950 p-2.5 rounded-lg text-center flex flex-col">
                <span className="text-[10px] font-bold">SQLite Store</span>
                <span className="text-[8px] font-mono text-zinc-500 mt-0.5">Local Storage</span>
              </div>

              {/* Connected pipeline indicator */}
              <div className="h-10 w-px bg-white/20 relative flex items-center justify-center">
                <div className="absolute w-2 h-2 rounded-full bg-white animate-[ping_2s_infinite]" />
                {/* Arrow up/down flow */}
                <div className="absolute top-1 -translate-y-1/2 w-1.5 h-1.5 border-r border-t border-white/40 -rotate-45" />
                <div className="absolute bottom-1 translate-y-1/2 w-1.5 h-1.5 border-r border-b border-white/40 rotate-45" />
              </div>

              {/* Cloud DB */}
              <div className="w-36 border border-white/10 bg-white text-black p-2.5 rounded-lg text-center flex flex-col">
                <span className="text-[10px] font-bold">Synchronizer Cloud</span>
                <span className="text-[8px] font-mono text-black/50 mt-0.5">Active Server Connection</span>
              </div>

            </div>

            <div className="text-center py-4">
              <span className="text-[9px] text-emerald-400 font-mono tracking-wider">OFFLINE-FIRST CONFLICTS RESOLVED</span>
            </div>
          </motion.div>
        );

      case "security":
        return (
          <motion.div 
            key="security-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col justify-between p-5 pt-16 bg-[#0a0a0a] text-white select-none"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Security Protocol</span>
              <span className="text-sm font-bold tracking-tight mt-0.5">Payload Gateway</span>
            </div>

            {/* Cryptographic key lock visuals */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center relative">
                {/* Shield Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                
                {/* Orbit key nodes */}
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-zinc-950 border border-white/20 flex items-center justify-center text-[8px]">K1</div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-zinc-950 border border-white/20 flex items-center justify-center text-[8px]">K2</div>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-4">256-bit AES Vault</span>
            </div>

            <div className="flex flex-col gap-1.5 bg-zinc-900/30 border border-white/5 p-3 rounded-lg text-center">
              <span className="text-[10px] font-bold">OAuth 2.0 Identity Token</span>
              <span className="text-[8px] font-mono text-zinc-500 truncate">SHA256: 09c3...8fa1-bdfa-3bf5</span>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

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
            {APP_STEPS.map((step) => {
              const isActive = activeStep.id === step.id;
              return (
                <div 
                  key={step.id} 
                  onClick={() => setActiveStep(step)}
                  className="group cursor-pointer border-t border-white/10 py-6 flex flex-col transition-all duration-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <span className={cn(
                        "text-xs font-mono transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {step.num}
                      </span>
                      <span className={cn(
                        "text-xl lg:text-2xl font-bold uppercase tracking-tight transition-all duration-500",
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                      )}>
                        {step.label}
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
                        <p className="text-[14px] leading-[1.6] text-zinc-400 font-light max-w-md pl-12 pr-4">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Pristine Mobile Phone Device Mockup Visualizer */}
        <div className="lg:w-[55%] flex justify-center lg:pt-0">
          
          {/* Main phone body frame */}
          <div className="relative w-[300px] h-[600px] rounded-[52px] border-[5px] border-white/10 bg-black shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex items-center justify-center p-[7px]">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full bg-black border border-white/5 flex items-center justify-between px-3 z-30 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-850" />
              <div className="w-3.5 h-1 rounded-full bg-zinc-900" />
            </div>

            {/* Screen Viewport with Rounded Corners */}
            <div className="w-full h-full rounded-[42px] overflow-hidden bg-[#050505] relative border border-white/5">
              
              {/* Dynamic screen content container */}
              <AnimatePresence mode="wait">
                {renderScreenContent(activeStep.id)}
              </AnimatePresence>

            </div>

            {/* Glass reflection gradient highlight */}
            <div className="absolute inset-0 rounded-[52px] border border-white/10 pointer-events-none bg-[linear-gradient(130deg,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
          </div>

        </div>

      </div>
    </section>
  );
}
