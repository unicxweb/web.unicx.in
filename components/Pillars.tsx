"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pillars = [
  {
    id: 1,
    number: "01",
    title: "Graphic Design",
    subtitle: "Design that functions",
    description: "We move beyond decoration to create interfaces that work. Logo systems, motion graphics, and UI/UX design that serves your users.",
    image: "/images/pillar-01.jpg",
    url: "/services/graphic-design",
  },
  {
    id: 2,
    number: "02",
    title: "Website Development",
    subtitle: "From static to complex",
    description: "SEO-optimized, clean code foundations. From simple landing pages to complex web applications that scale with your business.",
    image: "/images/pillar-02.jpg",
    url: "/services/website-development",
  },
  {
    id: 3,
    number: "03",
    title: "App Development",
    subtitle: "Native, hybrid, PWAs",
    description: "Scalable mobile applications built for performance. Native iOS, Android, hybrid, and progressive web apps that deliver seamless experiences.",
    image: "/images/pillar-03.jpg",
    url: "/services/app-development",
  },
  {
    id: 4,
    number: "04",
    title: "Software Development",
    subtitle: "Built to last",
    description: "Robust backend architecture and custom software solutions. Enterprise-grade applications designed for long-term scalability and maintenance.",
    image: "/images/pillar-04.jpg",
    url: "/services/software-development",
  },
  {
    id: 5,
    number: "05",
    title: "Marketing",
    subtitle: "Data-backed strategy",
    description: "Strategic marketing execution backed by analytics. SEO, paid campaigns, and growth strategies that deliver measurable results.",
    image: "/images/pillar-05.jpg",
    url: "/services/marketing",
  },
];

export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeItem, setActiveItem] = useState<number>(1);
  const activeItemRef = useRef<number>(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const accordion = accordionRef.current;
    const panels = panelRefs.current.filter(
      (panel): panel is HTMLButtonElement => Boolean(panel)
    );
    if (!section || !accordion || panels.length !== pillars.length) return;

    const ctx = gsap.context(() => {
      const expandedFlex = 4.8;
      const collapsedFlex = 0.38;
      const stepCount = pillars.length - 1;

      gsap.set(panels, { flex: collapsedFlex });
      gsap.set(panels[0], { flex: expandedFlex });

      const updateActiveItem = (progress: number) => {
        const currentItem = Math.min(
          pillars.length,
          Math.max(1, Math.round(progress * stepCount) + 1)
        );

        if (activeItemRef.current !== currentItem) {
          activeItemRef.current = currentItem;
          setActiveItem(currentItem);
        }
      };

      const timeline = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top 0%",
          end: () => `+=${window.innerHeight * stepCount * 0.78}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateActiveItem(self.progress),
        },
      });
      scrollTriggerRef.current = timeline.scrollTrigger ?? null;

      panels.forEach((panel, index) => {
        if (index === 0) return;

        timeline
          .to(panels[index - 1], { flex: collapsedFlex }, index - 1)
          .to(panel, { flex: expandedFlex }, index - 1);
      });
    }, section);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  const isExpanded = (id: number) => activeItem === id;
  const activateItem = (id: number) => {
    const panels = panelRefs.current.filter(
      (panel): panel is HTMLButtonElement => Boolean(panel)
    );
    const scrollTrigger = scrollTriggerRef.current;

    if (scrollTrigger) {
      const progress = (id - 1) / (pillars.length - 1);
      const scrollTop =
        scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
      return;
    }

    activeItemRef.current = id;
    setActiveItem(id);

    if (panels.length !== pillars.length) return;

    panels.forEach((panel, index) => {
      gsap.to(panel, {
        flex: index + 1 === id ? 4.8 : 0.38,
        duration: 0.55,
        ease: "power2.out",
      });
    });
  };

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="relative z-10 mt-16 min-h-screen bg-black py-16 sm:mt-24"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 px-6"
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
      <div ref={accordionRef} className="w-full px-6">
        <div className="flex w-full h-[500px] lg:h-[600px] border border-white/20 rounded-lg overflow-hidden">
          {pillars.map((pillar, index) => (
            <button
              type="button"
              key={pillar.id}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              aria-expanded={isExpanded(pillar.id)}
              aria-label={`${pillar.title} pillar`}
              className={`group relative overflow-hidden border-r border-white/10 bg-black text-left last:border-r-0 will-change-[flex] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0 ${
                index === 0 ? "flex-[4.8]" : "flex-[0.38]"
              }`}
              onClick={() => activateItem(pillar.id)}
            >
              <div className="absolute inset-y-0 left-0 z-20 flex w-14 flex-col items-center justify-between px-3 py-7 sm:w-16 lg:w-[88px]">
                <div className="text-[14px] font-semibold text-white sm:text-[15px]">
                  {pillar.number}
                </div>
                <div
                  className="mb-1 whitespace-nowrap text-[15px] font-semibold text-white sm:text-base"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {pillar.title}
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{
                  opacity: isExpanded(pillar.id) ? 1 : 0,
                  x: isExpanded(pillar.id) ? 0 : 18,
                }}
                transition={{
                  duration: 0.32,
                  delay: isExpanded(pillar.id) ? 0.06 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden={!isExpanded(pillar.id)}
                className={`relative h-full pl-20 pr-6 py-10 sm:pl-24 sm:pr-8 lg:pl-[120px] lg:pr-14 lg:py-12 ${
                  isExpanded(pillar.id) ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                  <div className="relative z-10 flex h-full max-w-[560px] flex-col">
                    <h3 className="max-w-[12ch] text-[clamp(1.55rem,2.9vw,2.35rem)] font-semibold leading-tight text-white sm:max-w-none">
                      {pillar.subtitle}
                    </h3>
                    <p className="mt-6 max-w-[460px] text-[15px] font-medium leading-7 text-white sm:text-base">
                      {pillar.description}
                    </p>

                    <div className="relative mt-6 h-44 w-full max-w-[460px] overflow-hidden bg-white/[0.03] sm:h-56 lg:h-72">
                      <Image
                        src={pillar.image}
                        alt=""
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 72vw, 460px"
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <a
                        href={pillar.url}
                        tabIndex={isExpanded(pillar.id) ? 0 : -1}
                        className="group inline-flex items-center text-white font-medium text-[14px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:underline"
                      >
                        Read more
                        <span className="inline-block ml-2 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-[5px]">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
              </motion.div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
