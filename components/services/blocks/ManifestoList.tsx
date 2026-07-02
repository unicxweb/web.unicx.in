import React from "react";

export function ManifestoList({ title, items }: { title: string, items: string[] }) {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        <div className="md:w-1/3">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-6 leading-tight">{title}</h2>
        </div>
        
        <div className="md:w-2/3 flex flex-col gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-6 border-b border-white/10 pb-6 last:border-0 last:pb-0">
               <div className="h-3 w-3 rounded-full bg-white" />
               <span className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
