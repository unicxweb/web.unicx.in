"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MacLaptop } from "@/components/MacLaptop";

export function HeroMinimal() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      setCurrentTime(`${displayHours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] w-screen bg-black overflow-hidden border-4 border-white m-0 p-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/70 to-black" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <MacLaptop />

      <div className="absolute top-6 left-6 z-20">
        <div className="text-white text-[10px] tracking-widest font-mono">
          Digital Product Company.
        </div>
      </div>

      <nav className="absolute top-6 left-1/2 z-20 flex -translate-x-1/2 transform items-center gap-8">
        <Link href="#think" className="text-white text-[11px] uppercase tracking-[0.25rem] font-mono hover:text-gray-400 transition-colors">
          THINK.
        </Link>
        <Link href="#design" className="text-white text-[11px] uppercase tracking-[0.25rem] font-mono hover:text-gray-400 transition-colors">
          DESIGN.
        </Link>
        <Link href="#develop" className="text-white text-[11px] uppercase tracking-[0.25rem] font-mono hover:text-gray-400 transition-colors">
          DEVELOP.
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <h1
          className="text-center font-normal text-white"
          style={{
            fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
            fontSize: "6vw",
            letterSpacing: "-3px",
            fontWeight: "400",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          We make digital products.
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-8 left-8 z-20 flex flex-col"
      >
        <div className="text-[#666] text-[10px] font-mono uppercase leading-[1.8]">
          ARTIFICIAL INTELLIGENCE
        </div>
        <div className="text-[#666] text-[10px] font-mono uppercase leading-[1.8]">
          E-COMMERCE
        </div>
        <div className="text-[#666] text-[10px] font-mono uppercase leading-[1.8]">
          MOBILE APPS
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-8 right-8 z-20"
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border-[0.5px] border-[rgba(255,255,255,0.2)] px-6 py-3 font-mono text-[12px] tracking-widest text-white transition-all duration-[0.3s] ease-in-out hover:bg-white hover:text-black"
        >
          Be the next ->
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute right-[40px] top-[40px] z-20"
      >
        <div className="text-[14px] font-mono tracking-wider text-white">
          {currentTime}
        </div>
      </motion.div>
    </section>
  );
}
