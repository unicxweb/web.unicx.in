"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// Sub-categories list
const CATEGORIES = [
  { id: "ui-ux", label: "UI/UX Design", headline: "We shape experiences." },
  { id: "logo", label: "Logo Design", headline: "We define identity." },
  { id: "brand", label: "Brand Identity", headline: "We build systems." },
  { id: "motion", label: "Motion Graphics", headline: "We create energy." },
  { id: "packaging", label: "Packaging Design", headline: "We form structure." },
  { id: "illustration", label: "Illustration", headline: "We draw stories." },
  { id: "marketing", label: "Marketing Creatives", headline: "We drive action." }
];

export function MetalabHero() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [cursorText, setCursorText] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  // Custom cursor motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Timezone clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse relative to the hero section
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  // Scroll to CTA
  const handleGetInTouch = () => {
    const ctaSection = document.getElementById("contact");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursorText("")}
      className="relative w-full min-h-[95vh] lg:h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-12 border-b border-white/5 cursor-none"
    >
      {/* 1. Background Fluid Gradient Spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse duration-[10s]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse duration-[15s]" />
        
        {/* Subtle grid lines for high-end blueprint aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Custom Scoped Cursor */}
      <motion.div
        className="hidden lg:flex pointer-events-none absolute z-50 items-center justify-center rounded-full bg-white text-black font-semibold text-[10px] uppercase tracking-widest shadow-2xl"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          width: cursorText ? 70 : 12,
          height: cursorText ? 70 : 12,
          mixBlendMode: cursorText ? "normal" : "difference"
        }}
        animate={{
          scale: cursorText ? 1 : 1,
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cursorText}
      </motion.div>

      {/* 2. TOP ZONE */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Q3 Projects</span>
          </div>
          <div className="hidden sm:block">
            IST {time} (NEW DELHI)
          </div>
        </div>

        <button 
          onClick={handleGetInTouch}
          className="group relative px-6 py-2.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] text-[10px] tracking-[0.22em] uppercase font-bold transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 transition-colors group-hover:text-black">Get in Touch</span>
          <span className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </div>

      {/* 3. MAIN INTERACTIVE GRID */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 my-auto items-center flex-grow py-8 w-full">
        
        {/* Mobile-Only Headline Area (Placed at the top of the content flow) */}
        <div className="lg:hidden w-full space-y-2">
          <span className="text-[9px] tracking-[0.3em] uppercase text-slate-500 font-semibold block">
            Creative Direction
          </span>
          <h1 className="text-3.5xl sm:text-4xl font-light tracking-tight font-serif italic text-white/90 leading-tight">
            {activeCategory.headline}
          </h1>
        </div>

        {/* Left Sidebar Panel (Sub-capabilities list) */}
        <div className="w-full lg:col-span-3 flex flex-col items-start gap-2.5">
          <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-semibold mb-1 hidden lg:block">
            Capabilities
          </span>
          
          {/* Scrollable Container: Vertical list on desktop, Swipeable horizontal list on mobile */}
          <div className="flex flex-row lg:flex-col gap-2 w-full overflow-x-auto pb-2 lg:pb-0 scrollbar-none snap-x snap-mandatory">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setCursorText("View")}
                  onMouseLeave={() => setCursorText("")}
                  className={cn(
                    "px-4.5 py-2.5 rounded-full text-[10.5px] font-bold tracking-wider text-left transition-all duration-300 whitespace-nowrap snap-start border shrink-0",
                    isActive
                      ? "bg-white text-black border-white shadow-xl scale-[1.02]"
                      : "bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white border-white/5 hover:border-white/15"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Presentation Canvas (Dynamic Asset Swap) */}
        <div className="w-full lg:col-span-6 flex items-center justify-center min-h-[280px] sm:min-h-[380px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <PresentationAsset categoryId={activeCategory.id} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Info Panel (Context / Focus) */}
        <div className="w-full lg:col-span-3 flex flex-col justify-center gap-5 sm:gap-6 border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
          <div className="border-l border-white/10 pl-5 lg:pl-6 space-y-2 lg:space-y-4">
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-slate-500 font-semibold block">
              Perspective
            </span>
            <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed font-light">
              Since 2021, we have helped disruptive brands stand out with world-class design systems, digital interfaces, and high-impact visual direction.
            </p>
          </div>
          <div className="border-l border-white/10 pl-5 lg:pl-6 space-y-1 lg:space-y-2">
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-slate-500 font-semibold block">
              Focus
            </span>
            <span className="text-white text-xs sm:text-[13px] font-bold">
              {activeCategory.label}
            </span>
          </div>
        </div>

      </div>

      {/* 4. DESKTOP BOTTOM ZONE (Headline shown only on large viewports) */}
      <div className="relative z-10 flex flex-row justify-between items-end border-t border-white/5 pt-6 mt-auto w-full">
        <div className="max-w-2xl hidden lg:block">
          <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-semibold block mb-2">
            Creative Direction
          </span>
          <h1 className="text-5xl lg:text-7xl font-light tracking-tight font-serif italic text-white/90">
            {activeCategory.headline}
          </h1>
        </div>
        
        <div className="text-[10px] tracking-[0.2em] text-slate-400 font-medium uppercase text-right">
          UNICX STUDIO © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

// Subcomponents to render high-fidelity premium visual assets for each capability
function PresentationAsset({ categoryId }: { categoryId: string }) {
  switch (categoryId) {
    case "ui-ux":
      return <UIUXAsset />;
    case "logo":
      return <LogoAsset />;
    case "brand":
      return <BrandAsset />;
    case "motion":
      return <MotionAsset />;
    case "packaging":
      return <PackagingAsset />;
    case "illustration":
      return <IllustrationAsset />;
    case "marketing":
      return <MarketingAsset />;
    default:
      return null;
  }
}

// 1. UI/UX Asset (Glassmorphic code/dashboard view)
function UIUXAsset() {
  return (
    <div className="relative w-full max-w-[380px] aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 p-4 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col gap-3">
      {/* Header bar */}
      <div className="flex justify-between items-center pb-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-[9px] font-mono text-slate-500">unicx-dashboard.app</div>
        <div className="w-4 h-4 rounded-full bg-white/5" />
      </div>
      
      {/* Content layout */}
      <div className="grid grid-cols-3 gap-2.5 flex-grow">
        <div className="col-span-1 rounded-xl bg-white/[0.01] border border-white/5 p-2.5 flex flex-col justify-between">
          <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
          <div className="space-y-1">
            <div className="h-1.5 w-3/4 rounded bg-white/10" />
            <div className="h-1.5 w-1/2 rounded bg-white/10" />
          </div>
        </div>
        <div className="col-span-2 rounded-xl bg-white/[0.02] border border-white/15 p-3 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 rounded bg-white/10" />
            <div className="text-[10px] font-mono text-indigo-400 font-bold">+28.4%</div>
          </div>
          {/* Neon trendline graph */}
          <div className="h-20 w-full relative mt-2 flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,35 Q15,10 30,28 T60,5 T90,20 T100,8"
                fill="none"
                stroke="#818cf8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,35 Q15,10 30,28 T60,5 T90,20 T100,8 L100,40 L0,40 Z"
                fill="url(#chartGrad)"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Footer statistics */}
      <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 rounded-xl p-2 px-3">
        <div className="h-2 w-20 rounded bg-white/10" />
        <div className="flex gap-2">
          <div className="h-2.5 w-6 rounded-full bg-indigo-500/20 border border-indigo-500/30" />
          <div className="h-2.5 w-6 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// 2. Logo Asset (Rotating glowing central emblem)
function LogoAsset() {
  return (
    <div className="relative w-full max-w-[380px] aspect-[4/3] flex items-center justify-center">
      {/* Background radial spotlight */}
      <div className="absolute w-[200px] h-[200px] bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />
      
      {/* Animated geometric wireframe logo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="relative w-36 h-36 border border-white/10 rounded-full flex items-center justify-center"
      >
        <div className="absolute w-24 h-24 border border-dashed border-white/20 rounded-full" />
        <div className="absolute w-12 h-12 border border-white/30 rotate-45" />
        <div className="absolute w-12 h-12 border border-indigo-400/50 -rotate-45 shadow-[0_0_20px_rgba(129,140,248,0.2)]" />
        
        {/* Core emblem */}
        <svg className="w-8 h-8 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
        </svg>
      </motion.div>
    </div>
  );
}

// 3. Brand Asset (Grid displaying type sheets, colors, grids)
function BrandAsset() {
  return (
    <div className="w-full max-w-[380px] aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 p-5 shadow-2xl backdrop-blur-md grid grid-cols-2 gap-4">
      {/* Typography block */}
      <div className="border border-white/5 rounded-xl p-3 flex flex-col justify-between bg-white/[0.01]">
        <div className="text-[10px] font-mono text-slate-500">Font System</div>
        <div className="text-4xl font-serif font-light text-indigo-200 my-2">Aa</div>
        <div className="space-y-1">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-1.5 w-3/4 rounded bg-white/5" />
        </div>
      </div>
      
      {/* Colors block */}
      <div className="border border-white/5 rounded-xl p-3 flex flex-col justify-between bg-white/[0.01]">
        <div className="text-[10px] font-mono text-slate-500">Color Spec</div>
        <div className="flex gap-1.5 my-2">
          <div className="w-6 h-6 rounded-full bg-white border border-white/20" />
          <div className="w-6 h-6 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          <div className="w-6 h-6 rounded-full bg-purple-600" />
          <div className="w-6 h-6 rounded-full bg-[#111115] border border-white/10" />
        </div>
        <div className="text-[8px] font-mono text-slate-400">UNICX Palette v1.0</div>
      </div>

      {/* Brand grid guidelines */}
      <div className="col-span-2 border border-white/5 rounded-xl p-3 flex items-center justify-between relative overflow-hidden bg-white/[0.01] h-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:10px] opacity-50" />
        <div className="text-[10px] font-mono text-slate-500 z-10">Layout System</div>
        <div className="flex gap-3 items-center z-10">
          <div className="h-1 w-20 bg-white/20 relative rounded">
            <div className="absolute left-0 top-0 h-full w-[65%] bg-indigo-400 rounded" />
          </div>
          <span className="text-[9px] font-mono text-slate-300">GRID-8px</span>
        </div>
      </div>
    </div>
  );
}

// 4. Motion Asset (Looping Canvas Orbit / Particle Loop)
function MotionAsset() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw orbit rings
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.stroke();

      // Outer glowing floating particles
      const p1 = {
        x: cx + Math.cos(angle) * 60,
        y: cy + Math.sin(angle) * 60
      };
      const p2 = {
        x: cx + Math.cos(-angle * 1.5) * 90,
        y: cy + Math.sin(-angle * 1.5) * 90
      };

      // Draw glowing connection lines
      ctx.strokeStyle = "rgba(129, 140, 248, 0.15)";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p1.x, p1.y);
      ctx.moveTo(cx, cy);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Draw center core
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow

      // Draw particles
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#818cf8";
      ctx.shadowColor = "#818cf8";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(p2.x, p2.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#c084fc";
      ctx.shadowColor = "#c084fc";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      angle += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full max-w-[380px] aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-5 shadow-2xl backdrop-blur-md overflow-hidden">
      <canvas ref={canvasRef} width={300} height={220} className="w-full h-full object-contain" />
    </div>
  );
}

// 5. Packaging Asset (Isometric 3D product silhouette/wireframe)
function PackagingAsset() {
  return (
    <div className="relative w-full max-w-[380px] aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 p-5 shadow-2xl backdrop-blur-md flex items-center justify-center overflow-hidden">
      <div className="absolute w-[220px] h-[220px] bg-rose-500/5 blur-[50px] rounded-full pointer-events-none" />
      
      {/* Elegant isometric wireframe box representing luxury packaging */}
      <svg className="w-48 h-48 text-white/40 overflow-visible" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="50" cy="85" rx="35" ry="8" fill="rgba(0,0,0,0.5)" />

        {/* Wireframe box path */}
        {/* Left Side */}
        <polygon points="15,45 50,62 50,85 15,68" fill="url(#boxGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        
        {/* Right Side */}
        <polygon points="50,62 85,45 85,68 50,85" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        
        {/* Top Lid */}
        <polygon points="15,45 50,28 85,45 50,62" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        
        {/* Internal grid lines for technical high-end feel */}
        <line x1="50" y1="28" x2="50" y2="62" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="15" y1="45" x2="85" y2="45" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>
      <div className="absolute bottom-4 left-4 text-[9px] font-mono text-slate-500">PACK-D_2026.obj</div>
    </div>
  );
}

// 6. Illustration Asset (Bauhaus geometric abstract composition)
function IllustrationAsset() {
  return (
    <div className="w-full max-w-[380px] aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 p-5 shadow-2xl backdrop-blur-md flex items-center justify-center relative overflow-hidden">
      <div className="grid grid-cols-4 grid-rows-3 gap-2 w-full h-full relative z-10">
        <div className="col-span-2 row-span-2 rounded-xl border border-white/10 bg-white/[0.01] flex items-center justify-center overflow-hidden relative">
          <div className="absolute w-20 h-20 rounded-full border border-indigo-500/20 bg-indigo-500/5 -bottom-5 -right-5" />
          <div className="text-[9px] font-mono text-slate-400 absolute top-2 left-2">FIG_01</div>
        </div>
        <div className="col-span-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 relative" />
        <div className="rounded-xl border border-white/15 bg-white/[0.03] flex items-center justify-center">
          <div className="w-6 h-6 border-b border-r border-white/30 rotate-45" />
        </div>
        <div className="rounded-xl bg-white/[0.01] border border-white/5" />
        <div className="col-span-4 rounded-xl border border-white/10 bg-white/[0.01] flex items-center justify-between p-3">
          <div className="h-2 w-32 rounded bg-white/10" />
          <div className="h-4 w-4 rounded-full bg-indigo-400/80 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// 7. Marketing Asset (Ad Layout / Poster Typography structure)
function MarketingAsset() {
  return (
    <div className="w-full max-w-[380px] aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/5 blur-[50px] pointer-events-none rounded-full" />
      
      {/* Editorial layout block */}
      <div className="flex justify-between items-start border-b border-white/5 pb-3">
        <div className="text-[10px] font-mono text-slate-500">M-CAMPAIGN</div>
        <div className="text-[9px] font-mono text-slate-400">BATCH_B</div>
      </div>
      
      {/* Central Bold Display Typography */}
      <div className="my-auto py-2">
        <span className="text-[10px] tracking-[0.25em] text-indigo-400 uppercase font-bold block mb-1">
          Launch Event
        </span>
        <h2 className="text-3xl font-extrabold tracking-tighter uppercase leading-none text-white/90">
          THE FUTURE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-white">
            IS DIGITAL.
          </span>
        </h2>
      </div>

      {/* Footer layout */}
      <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 border-t border-white/5 pt-3">
        <span>UNICX OUTCOME METRICS</span>
        <span>CONVERSION rate +45%</span>
      </div>
    </div>
  );
}
