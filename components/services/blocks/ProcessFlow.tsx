import React from "react";

export function ProcessFlow({ title, steps }: { title: string, steps: string[] }) {
  return (
    <section className="py-24 sm:py-32 bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase text-center mb-20">{title}</h2>
        
        <div className="relative w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex items-center min-w-max gap-4 px-4">
             {steps.map((step, index) => (
               <React.Fragment key={index}>
                 <div className="relative z-10 bg-white/5 border border-white/20 px-8 py-4 rounded-xl backdrop-blur-md shrink-0 transition-all hover:-translate-y-1 hover:bg-white/10">
                   <span className="text-white font-medium tracking-wide">{step}</span>
                 </div>
                 
                 {index < steps.length - 1 && (
                   <div className="w-8 sm:w-16 h-px bg-white/20 shrink-0 relative">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 border-r border-t border-white/40 rotate-45" />
                   </div>
                 )}
               </React.Fragment>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
