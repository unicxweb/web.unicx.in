import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { IndexLabel } from "./IndexLabel";

export type TechItem = {
  name: string;
  iconUrl?: string; 
  iconFallback?: React.ReactNode;
};

export function TechStack({ title, stack, indexLabel = "07 / Technologies" }: { title: string, stack: TechItem[], indexLabel?: string }) {
  return (
    <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col">
        {/* Editorial Section Header centered to match the dock alignment */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/50 uppercase mb-8 flex items-center gap-2">
            <IndexLabel label={indexLabel} />
          </div>
          <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white">
            {title}
          </h2>
        </div>
        
        {/* Mobile: clean wrap-around flex list of badges */}
        <div className="flex md:hidden flex-wrap justify-center gap-3 py-4 w-full">
          {stack.map((item, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2.5 hover:bg-white/[0.08] active:scale-95 transition-all"
            >
              {item.iconUrl ? (
                <img src={item.iconUrl} alt={item.name} className="h-6 w-6 object-contain" />
              ) : (
                item.iconFallback || <div className="h-6 w-6 rounded-full bg-white/10" />
              )}
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop: Dynamic MagicUI Magnification Dock */}
        <div className="hidden md:flex justify-center items-center py-6 w-full mx-auto max-w-5xl h-36">
          <Dock 
            className="bg-transparent border-0 gap-4 py-1 items-center h-32" 
            iconSize={80} 
            iconMagnification={110} 
            iconDistance={160}
          >
            {stack.map((item, i) => (
              <DockIcon
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center hover:bg-white/[0.08] hover:border-white/20 group relative cursor-pointer transition-colors"
              >
                {item.iconUrl ? (
                  <img 
                    src={item.iconUrl} 
                    alt={item.name} 
                    className="h-10 w-10 sm:h-12 sm:w-12 opacity-100 transition-transform duration-200 group-hover:scale-110" 
                  />
                ) : (
                  item.iconFallback || <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10" />
                )}

                {/* Floating Tooltip */}
                <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-[11px] font-semibold tracking-wide text-black opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 shadow-xl transition-all duration-200">
                  {item.name}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
                </div>
              </DockIcon>
            ))}
          </Dock>
        </div>
      </div>
    </section>
  );
}
