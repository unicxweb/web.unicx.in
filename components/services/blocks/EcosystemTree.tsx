import React from "react";

export function EcosystemTree({ title }: { title: string }) {
  return (
    <section className="py-24 sm:py-32 bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase text-center mb-20">{title}</h2>
        
        <div className="relative w-full max-w-3xl flex flex-col items-center">
           {/* Top Node */}
           <div className="relative z-10 bg-white/10 border border-white/30 px-10 py-5 rounded-xl backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.05)]">
             <span className="text-white font-semibold tracking-wide text-lg">Mobile App</span>
           </div>
           
           {/* Stem */}
           <div className="h-12 w-px bg-white/20 relative" />
           
           {/* Horizontal Branch Line */}
           <div className="w-full max-w-lg h-px bg-white/20 relative">
              <div className="absolute top-0 left-0 w-px h-8 bg-white/20" />
              <div className="absolute top-0 left-1/2 w-px h-8 bg-white/20" />
              <div className="absolute top-0 right-0 w-px h-8 bg-white/20" />
           </div>
           
           {/* Level 2 Nodes */}
           <div className="flex justify-between w-full max-w-xl mt-8 z-10 px-4">
              <div className="flex flex-col items-center">
                 <div className="bg-white/5 border border-white/20 px-6 py-3 rounded-lg backdrop-blur-md w-32 text-center mb-6">
                    <span className="text-white text-sm font-medium">Backend</span>
                 </div>
                 <div className="h-8 w-px bg-white/20 mb-6 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45" />
                 </div>
                 <div className="bg-[#050505] border border-white/10 px-6 py-3 rounded-lg w-32 text-center text-xs text-slate-300">
                    Payments
                 </div>
              </div>
              
              <div className="flex flex-col items-center">
                 <div className="bg-white/5 border border-white/20 px-6 py-3 rounded-lg backdrop-blur-md w-32 text-center mb-6">
                    <span className="text-white text-sm font-medium">Analytics</span>
                 </div>
                 <div className="h-8 w-px bg-white/20 mb-6 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45" />
                 </div>
                 <div className="bg-[#050505] border border-white/10 px-6 py-3 rounded-lg w-32 text-center text-xs text-slate-300">
                    CRM
                 </div>
              </div>
              
              <div className="flex flex-col items-center">
                 <div className="bg-white/5 border border-white/20 px-6 py-3 rounded-lg backdrop-blur-md w-32 text-center mb-6">
                    <span className="text-white text-sm font-medium">Notifications</span>
                 </div>
                 <div className="h-8 w-px bg-white/20 mb-6 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45" />
                 </div>
                 <div className="bg-[#050505] border border-white/10 px-6 py-3 rounded-lg w-32 text-center text-xs text-slate-300">
                    Integrations
                 </div>
              </div>
           </div>
           
        </div>
      </div>
    </section>
  );
}
