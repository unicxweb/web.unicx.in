"use client";

import React from "react";
import { IconCloud } from "./IconCloud";

export type TechItem = {
  name: string;
  iconUrl?: string;
  iconFallback?: React.ReactNode;
};

export function PremiumTechStack({ title, stack }: { title: string; stack: TechItem[] }) {
  // Get all valid image URLs and duplicate them to populate the 3D rotating sphere beautifully
  let imageUrls = stack.map((item) => item.iconUrl).filter(Boolean) as string[];
  
  if (imageUrls.length > 0 && imageUrls.length < 15) {
    // Triple the array to make the sphere look rich and populated
    imageUrls = [...imageUrls, ...imageUrls, ...imageUrls];
  }

  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-500/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500 mb-8">{title}</h2>
        
        {/* 3D Rotating Icon Cloud Container */}
        <div className="relative flex w-full max-w-[450px] aspect-square items-center justify-center overflow-hidden rounded-full bg-white/[0.01] border border-white/5 shadow-2xl backdrop-blur-3xl">
          {imageUrls.length > 0 ? (
            <IconCloud images={imageUrls} />
          ) : (
            <div className="text-slate-500 text-sm">No icons loaded</div>
          )}
        </div>
      </div>
    </section>
  );
}
