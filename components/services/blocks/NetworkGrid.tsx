import React from "react";

export function NetworkGrid({ title, items }: { title: string, items: string[] }) {
  return (
    <section className="py-24 sm:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase text-center mb-16">{title}</h2>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
           {items.map((item, i) => (
              <div 
                key={i} 
                className="px-6 py-4 border border-white/10 bg-black/50 backdrop-blur-md rounded-[14px] text-white font-medium text-sm sm:text-base transition-colors hover:bg-white/[0.05] hover:border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.02)]"
              >
                {item}
              </div>
           ))}
        </div>
        
        {/* Decorative background connecting lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl pointer-events-none -z-10 opacity-20">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 10 L 90 90 M 90 10 L 10 90 M 50 10 L 50 90 M 10 50 L 90 50" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
           </svg>
        </div>
      </div>
    </section>
  );
}
