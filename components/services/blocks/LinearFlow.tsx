import React from "react";

export function LinearFlow({ title, steps }: { title: string, steps: string[] }) {
  return (
    <section className="py-24 sm:py-32 bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase text-center mb-16">{title}</h2>
        
        <div className="relative w-full max-w-md flex flex-col items-center">
          {steps.map((step, index) => (
             <React.Fragment key={index}>
               {/* Step Node */}
               <div className="relative z-10 bg-white/5 border border-white/20 px-8 py-4 rounded-xl backdrop-blur-md transition-colors hover:bg-white/10 w-full text-center">
                 <span className="text-white font-medium tracking-wide">{step}</span>
               </div>
               
               {/* Arrow Down (except for last item) */}
               {index < steps.length - 1 && (
                 <div className="h-10 w-px bg-white/20 relative">
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45" />
                 </div>
               )}
             </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
