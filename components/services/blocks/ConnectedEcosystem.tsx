import React from "react";

export function ConnectedEcosystem({ title }: { title: string }) {
  return (
    <section className="py-24 sm:py-32 bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase text-center mb-20">{title}</h2>
        
        <div className="relative w-full max-w-2xl flex flex-col items-center">
           {/* Step 1 */}
           <div className="relative z-10 bg-white/5 border border-white/20 px-8 py-4 rounded-xl backdrop-blur-md">
             <span className="text-white font-medium tracking-wide">Brand Strategy</span>
           </div>
           
           {/* Arrow Down */}
           <div className="h-12 w-px bg-white/20 relative">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45" />
           </div>
           
           {/* Step 2 */}
           <div className="relative z-10 bg-white/5 border border-white/20 px-8 py-4 rounded-xl backdrop-blur-md">
             <span className="text-white font-medium tracking-wide">Visual Identity</span>
           </div>
           
           {/* Arrow Down */}
           <div className="h-12 w-px bg-white/20 relative">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45" />
           </div>
           
           {/* Step 3 */}
           <div className="relative z-10 bg-white/10 border border-white/30 px-10 py-5 rounded-xl backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.05)]">
             <span className="text-white font-semibold tracking-wide text-lg">Design System</span>
           </div>
           
           {/* Branching Lines */}
           <div className="relative h-12 w-full max-w-md mt-1">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/20" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
              
              <div className="absolute bottom-0 left-0 w-px h-8 bg-white/20 translate-y-full" />
              <div className="absolute bottom-0 left-1/3 w-px h-8 bg-white/20 translate-y-full" />
              <div className="absolute bottom-0 left-2/3 w-px h-8 bg-white/20 translate-y-full" />
              <div className="absolute bottom-0 right-0 w-px h-8 bg-white/20 translate-y-full" />
           </div>
           
           {/* Branches */}
           <div className="flex justify-between w-full max-w-lg mt-8 z-10">
              <div className="bg-[#050505] border border-white/10 px-4 py-2 rounded-lg text-xs text-slate-300">UI Assets</div>
              <div className="bg-[#050505] border border-white/10 px-4 py-2 rounded-lg text-xs text-slate-300">Social Assets</div>
              <div className="bg-[#050505] border border-white/10 px-4 py-2 rounded-lg text-xs text-slate-300">Motion Assets</div>
              <div className="bg-[#050505] border border-white/10 px-4 py-2 rounded-lg text-xs text-slate-300">Presentations</div>
           </div>
        </div>
      </div>
    </section>
  );
}
