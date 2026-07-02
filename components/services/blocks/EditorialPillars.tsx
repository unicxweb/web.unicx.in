import React from "react";

export function EditorialPillars({ title, pillars }: { title: string, pillars: { title: string, description: string }[] }) {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase mb-16">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
           {pillars.map((pillar, i) => (
             <div key={i} className="flex flex-col border-t border-white/20 pt-6">
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-4">{pillar.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-400">{pillar.description}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
