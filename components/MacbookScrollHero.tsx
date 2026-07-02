"use client";
import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export function MacbookScrollHero() {
  return (
    <div className="w-full overflow-hidden bg-black py-10 md:py-20">
      <MacbookScroll
        title={
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Crafting digital products. <br />
            <span className="text-neutral-400">Strategy, design, development.</span>
          </span>
        }
        badge={
          <a href="/" className="block">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg border border-neutral-200/50 -rotate-12 transform transition-all duration-300 hover:rotate-0 hover:scale-110 active:scale-95">
              <img 
                src="/images/optimized/US.3.webp" 
                alt="UniCX Logo" 
                className="h-6 w-6 object-contain"
              />
            </div>
          </a>
        }
        src={`/linear.webp`}
        showGradient={false}
      />
    </div>
  );
}

