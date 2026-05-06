"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    id: 1,
    number: "01",
    title: "Graphic Design",
    subtitle: "Design that functions",
    description: "We move beyond decoration to create interfaces that work. Logo systems, motion graphics, and UI/UX design that serves your users.",
  },
  {
    id: 2,
    number: "02",
    title: "Website Development",
    subtitle: "From static to complex",
    description: "SEO-optimized, clean code foundations. From simple landing pages to complex web applications that scale with your business.",
  },
  {
    id: 3,
    number: "03",
    title: "App Development",
    subtitle: "Native, hybrid, progressive",
    description: "Scalable mobile applications built for performance. Native iOS, Android, hybrid, and progressive web apps that deliver seamless experiences.",
  },
  {
    id: 4,
    number: "04",
    title: "Software Development",
    subtitle: "Built to last",
    description: "Robust backend architecture and custom software solutions. Enterprise-grade applications designed for long-term scalability and maintenance.",
  },
  {
    id: 5,
    number: "05",
    title: "Marketing",
    subtitle: "Data-backed strategy",
    description: "Strategic marketing execution backed by analytics. SEO, paid campaigns, and growth strategies that deliver measurable results.",
  },
];

export function Pillars() {
  const [activePillar, setActivePillar] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // Calculate scroll progress through the section
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        setScrollProgress(progress);
        
        // Dynamically expand pillars based on scroll progress
        const pillarIndex = Math.floor(progress * 5) + 1;
        if (pillarIndex <= 5) {
          setActivePillar(pillarIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="pillars" ref={sectionRef} className="pt-24 sm:pt-32 bg-black">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <div className="section-label">Pillars</div>
        <h2 className="max-w-4xl text-[clamp(2.15rem,4.6vw,3.8rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
          Five domains of expertise
        </h2>
        <p className="mt-4 text-[15px] leading-8 text-slate-400 sm:text-[17px] max-w-2xl">
          Each pillar strengthens your foundation
        </p>
      </motion.div>

      {/* Horizontal Accordion Container */}
      <div className="w-full overflow-hidden">
        <div className="flex w-full h-[500px] lg:h-[600px] border border-white/20 rounded-lg">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              className="relative overflow-hidden border-r border-white/10 last:border-r-0 cursor-pointer"
              style={{
                flex: activePillar === pillar.id ? 7 : 0.5,
                transition: "flex 0.6s ease-in-out",
              }}
              onClick={() => setActivePillar(pillar.id)}
            >
              
              {/* Collapsed State - Vertical Text */}
              {activePillar !== pillar.id && (
                <div className="flex flex-col h-full justify-between p-2">
                  {/* Number at top */}
                  <div className="text-[8px] font-semibold uppercase tracking-[0.28em] text-slate-500 text-center">
                    {pillar.number}
                  </div>
                  
                  {/* Rotated title at bottom */}
                  <div className="flex-1 flex items-end justify-center pb-2">
                    <div
                      className="text-white font-medium text-xs"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {pillar.title}
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded State */}
              {activePillar === pillar.id && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="relative h-full"
                >
                  {/* Large Number - Top Left */}
                  <div className="absolute top-8 left-8 text-[8rem] lg:text-[10rem] font-bold text-white/10 leading-none">
                    {pillar.number}
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 p-8 lg:p-12 pt-24 lg:pt-32 max-w-2xl h-full flex flex-col">
                    {/* Text Content */}
                    <div className="mb-8">
                      <h3 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.05em] text-white mb-2">
                        {pillar.title}
                      </h3>
                      <h4 className="text-lg font-medium text-white/80 mb-4">
                        {pillar.subtitle}
                      </h4>
                      <p className="text-[15px] leading-7 text-slate-400">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Image - Below text content */}
                    <div className="mt-auto">
                      <div className="w-full h-48 lg:h-56 rounded-lg overflow-hidden bg-black border border-white/20">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-amber-600/30 flex items-center justify-center">
                            <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

                          </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
