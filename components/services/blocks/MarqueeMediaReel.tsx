"use client";

import React from "react";

export type ReelItem = {
  label: string;
  type: "ui" | "brand" | "motion";
};

export function MarqueeMediaReel({ items, title }: { items: ReelItem[], title: string }) {
  return (
    <section className="py-24 sm:py-32 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-12">
         <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase">{title}</h2>
      </div>
      
      <div className="relative flex w-full flex-col gap-4">
        <div className="flex w-max gap-4 px-6 sm:px-8 lg:px-12 animate-[marquee_40s_linear_infinite]">
          {items.map((item, i) => (
             <div key={i} className="group relative h-[400px] w-[300px] sm:w-[450px] shrink-0 overflow-hidden bg-white/5 border border-white/10 rounded-none">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity group-hover:opacity-50" />
                
                <div className="absolute inset-0 flex flex-col p-8">
                   {item.type === "ui" && (
                     <div className="w-full flex-1 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-white/10" />
                   )}
                   {item.type === "brand" && (
                     <div className="w-full flex-1 flex items-center justify-center">
                        <div className="h-32 w-32 rounded-full bg-white/10 backdrop-blur-xl border border-white/20" />
                     </div>
                   )}
                   {item.type === "motion" && (
                     <div className="w-full flex-1 bg-gradient-to-br from-rose-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
                         <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                            <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent" />
                         </div>
                     </div>
                   )}
                </div>
                
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-white" />
                   <span className="text-[10px] uppercase tracking-widest text-white font-medium">{item.label}</span>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
