"use client";

import { motion } from "framer-motion";
import { LivePreview } from "@/components/LivePreview";

const projects = [
  {
    title: "Furnext",
    metric: "+148% qualified leads",
    imageLabel: "Furnext",
    imageSrc: "https://furnext.in/",
    description:
      "Rebuilt the acquisition flow into a sharper, faster system with cleaner messaging and conversion paths.",
    link: "https://furnext.in/",
  },
  {
    title: "Paeg",
    metric: "3.2x demo conversion",
    imageLabel: "Paeg",
    imageSrc: "https://paeg.in/",
    description:
      "Designed a premium product narrative and site architecture that aligned trust, clarity, and growth.",
    link: "https://paeg.in/",
  },
];

interface SelectedWorkProps {
  showTitle?: boolean;
  className?: string;
}

export function SelectedWork({ showTitle = true, className = "" }: SelectedWorkProps) {
  return (
    <section id="selected-work" className={`pt-24 sm:pt-32 ${className}`}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="section-label">Selected Work</div>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
              Proof that clarity compounds.
            </h2>
          </div>
          <p className="max-w-lg text-[15px] leading-8 text-slate-400 sm:text-base">
            A preview of the kind of outcomes that happen when product, brand,
            and growth systems are designed as one.
          </p>
        </motion.div>
      )}

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.75,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="soft-border relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-9 shadow-[0_20px_70px_rgba(0,0,0,0.16)] transition hover:border-white/20 hover:bg-white/[0.05] cursor-pointer"
            onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_36%)]" />
            <div className="relative flex h-full min-h-[300px] flex-col justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.34em] text-slate-500">
                  Project 0{index + 1}
                </div>
                <div className="mt-6">
                  <LivePreview
                    src={project.imageSrc}
                    alt={project.title}
                    label={project.imageLabel}
                    aspectClassName="aspect-[4/3]"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-[2rem] font-semibold tracking-[-0.06em] text-white inline-flex items-center gap-2 relative group/title pb-1">
                  {project.title}
                  <svg 
                    className="w-4 h-4 transition-all duration-300 rotate-[-45deg] group-hover/title:rotate-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="absolute -bottom-1 left-0 h-px bg-white w-full transition-all duration-300 origin-left scale-x-100 group-hover/title:scale-x-0"></span>
                </h3>
                <div className="mt-6 text-[11px] font-medium uppercase tracking-[0.34em] text-slate-300">
                  {project.metric}
                </div>
                <p className="mt-6 max-w-md text-[15px] leading-7 text-slate-400">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
