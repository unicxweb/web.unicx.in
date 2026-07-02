import React from "react";

export function SuccessMetrics({ title, metrics }: { title: string, metrics: string[] }) {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white uppercase text-center mb-16">{title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-12 w-full max-w-4xl">
           {metrics.map((metric, i) => (
             <div key={i} className="flex flex-col items-center text-center border-t border-white/10 pt-6 group">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mb-4 transition-transform group-hover:scale-150" />
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-200">{metric}</h3>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
