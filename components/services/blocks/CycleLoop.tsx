import React from "react";

export function CycleLoop({ title, steps }: { title: string, steps: string[] }) {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase text-center mb-20">{title}</h2>
        
        <div className="relative w-full max-w-4xl flex flex-wrap justify-center gap-4 sm:gap-6">
           {steps.map((step, index) => (
             <div key={index} className="flex items-center">
               <div className="relative z-10 bg-white/5 border border-white/20 px-6 py-3 sm:px-8 sm:py-4 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-colors hover:bg-white/10">
                 <span className="text-white font-medium tracking-wide text-sm sm:text-base whitespace-nowrap">{step}</span>
               </div>
               
               {index < steps.length - 1 && (
                 <div className="hidden md:flex w-8 sm:w-12 h-px bg-white/20 relative mx-2">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 border-r border-t border-white/40 rotate-45" />
                 </div>
               )}
             </div>
           ))}
           
           {/* Loop back arrow (decorative) */}
           <div className="hidden md:block absolute -bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-[120px] rounded-[100%] border-b border-l border-r border-dashed border-white/20 opacity-50 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
