"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const pillars = [
  {
    id: 1,
    number: "01",
    title: "Graphic Design",
    subtitle: "Design that functions",
    description: "We move beyond decoration to create interfaces that work. Logo systems, motion graphics, and UI/UX design that serves your users.",
    image: "/images/optimized/pillar-01.webp",
    url: "/services/graphic-design",
  },
  {
    id: 2,
    number: "02",
    title: "Website Development",
    subtitle: "From static to complex",
    description: "SEO-optimized, clean code foundations. From simple landing pages to complex web applications that scale with your business.",
    image: "/images/optimized/pillar-02.webp",
    url: "/services/website-development",
  },
  {
    id: 3,
    number: "03",
    title: "App Development",
    subtitle: "Native, hybrid, PWAs",
    description: "Scalable mobile applications built for performance. Native iOS, Android, hybrid, and progressive web apps that deliver seamless experiences.",
    image: "/images/optimized/pillar-03.webp",
    url: "/services/app-development",
  },
  {
    id: 4,
    number: "04",
    title: "Software Development",
    subtitle: "Built to last",
    description: "Robust backend architecture and custom software solutions. Enterprise-grade applications designed for long-term scalability and maintenance.",
    image: "/images/optimized/pillar-04.webp",
    url: "/services/software-development",
  },
  {
    id: 5,
    number: "05",
    title: "Marketing",
    subtitle: "Data-backed strategy",
    description: "Strategic marketing execution backed by analytics. SEO, paid campaigns, and growth strategies that deliver measurable results.",
    image: "/images/optimized/pillar-05.webp",
    url: "/services/marketing",
  },
];

/* ────────────────────────────────────────────────────────
   ScrollReveal-based in-view entrance & exit for headers
   ──────────────────────────────────────────────────────── */
function PillarsHeader() {
  return (
    <ScrollReveal
      className="mx-auto w-full max-w-7xl mb-8 md:mb-12 px-6 sm:px-8 lg:px-12"
      amount={0.15}
    >
      <div className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500">
        <span className="section-dot" />
        <span>Pillars</span>
      </div>
      <h2 className="max-w-4xl text-[clamp(1.75rem,4.6vw,3.8rem)] font-semibold uppercase leading-[0.98] tracking-[-0.02em] text-black">
        Five domains of expertise
      </h2>
      <p className="mt-2 md:mt-4 text-[14px] leading-7 md:leading-8 text-slate-600 sm:text-[17px] max-w-2xl">
        Each pillar strengthens your foundation
      </p>
    </ScrollReveal>
  );
}

/* ────────────────────────────────────────────────────────
   Mobile Pillar Card — optimised for paint performance.
   • `contain: content` isolates layout/paint per card
   • GPU-promoted via translate3d(0,0,0)
   • Only first 2 images load eagerly; rest are lazy
   • Correct `sizes` attribute for accurate srcset selection
   ──────────────────────────────────────────────────────── */
function MobilePillarCard({
  pillar,
  priority,
}: {
  pillar: typeof pillars[number];
  priority?: boolean;
}) {
  return (
    <article
      className="flex-shrink-0 w-[80vw] sm:w-[300px] md:w-[320px] snap-center flex flex-col"
      style={{
        contain: "content",
        contentVisibility: "auto",
        containIntrinsicSize: "auto 420px",
      } as React.CSSProperties}
    >
      <div className="relative flex w-full h-full flex-col overflow-hidden rounded-none border border-white/20 bg-[#0a0a0a] p-4 sm:p-6 md:p-8 shadow-xl transform-gpu">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-white/50">{pillar.number}</span>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-white/50 uppercase">{pillar.title}</span>
        </div>
        
        <h3 className="mb-2 sm:mb-3 text-[clamp(1.25rem,5vw,1.75rem)] sm:text-[clamp(1.5rem,6vw,2rem)] font-semibold leading-tight text-white">
          {pillar.subtitle}
        </h3>
        <p className="mb-4 sm:mb-6 text-[13px] sm:text-[14px] leading-relaxed text-slate-400">
          {pillar.description}
        </p>
        
        <div className="relative mb-4 sm:mb-6 h-[160px] sm:h-[200px] md:h-[240px] w-full overflow-hidden bg-white/[0.03]">
          <Image
            src={pillar.image}
            alt={`${pillar.title} services`}
            fill
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 80vw, 300px"
            className="object-cover"
          />
        </div>
        
        <div className="mt-auto pt-2">
          <a
            href={pillar.url}
            className="group inline-flex items-center gap-1.5 text-white font-medium text-[12px] sm:text-[13px] uppercase tracking-widest hover:underline"
          >
            <span>Read more</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────
   Desktop Accordion — GSAP loaded dynamically so it's
   never downloaded or parsed on mobile devices.
   ──────────────────────────────────────────────────────── */
function DesktopAccordion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const contentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<any>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    cancelledRef.current = false;
    let mm: any;

    // Dynamic import — gsap + ScrollTrigger are only fetched on desktop
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      // Guard against cleanup running before import resolved
      if (cancelledRef.current) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const panels = panelsRef.current.filter(Boolean) as HTMLButtonElement[];
        const contents = contentsRef.current.filter(Boolean) as HTMLDivElement[];

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "bottom-=" + window.innerHeight + " bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTriggerRef.current = timeline.scrollTrigger ?? null;

        gsap.set(panels, { flex: 0.38 });
        gsap.set(panels[0], { flex: 4.8 });
        gsap.set(contents, { opacity: 0, x: 18, pointerEvents: "none" });
        gsap.set(contents[0], { opacity: 1, x: 0, pointerEvents: "auto" });

        panels.forEach((panel, index) => {
          if (index === 0) return;

          timeline
            .to(panels[index - 1], { flex: 0.38, duration: 1, ease: "power2.inOut" }, index - 1)
            .to(contents[index - 1], { opacity: 0, x: 18, pointerEvents: "none", duration: 0.4 }, index - 1)
            .to(panel, { flex: 4.8, duration: 1, ease: "power2.inOut" }, index - 1)
            .to(contents[index], { opacity: 1, x: 0, pointerEvents: "auto", duration: 0.6 }, index - 0.4);
        });
      });
    });

    return () => {
      cancelledRef.current = true;
      scrollTriggerRef.current = null;
      mm?.revert();
    };
  }, []);

  const activateItem = useCallback((id: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const index = pillars.findIndex((p) => p.id === id);
    if (index === -1) return;

    const progress = index / (pillars.length - 1);
    const targetScroll = st.start + (st.end - st.start) * progress;
    
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[500vh] bg-[#fafafa]">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-[#fafafa] pt-16 pb-12 md:pt-28 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.015),transparent_70%)] pointer-events-none" />
        <PillarsHeader />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-row gap-[1px] bg-black/5 w-full h-[500px] lg:h-[600px] border border-black/10 rounded-none overflow-hidden">
        {pillars.map((pillar, index) => (
          <button
            type="button"
            key={pillar.id}
            onClick={() => activateItem(pillar.id)}
            ref={(el) => { panelsRef.current[index] = el; }}
            aria-label={`${pillar.title} pillar`}
            style={{ flex: index === 0 ? 4.8 : 0.38 }}
            className="group relative overflow-hidden bg-black text-left transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0 min-w-[64px]"
          >
            <div className="absolute inset-y-0 left-0 z-20 flex h-full w-16 lg:w-[88px] flex-col items-center justify-between py-7 px-3 bg-black">
              <div className="text-[13px] font-semibold text-white sm:text-[15px]">
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

            <div
              ref={(el) => { contentsRef.current[index] = el; }}
              className="relative h-full pt-10 pl-24 pr-8 lg:pl-[120px] lg:pr-14 lg:py-12"
              style={{
                opacity: index === 0 ? 1 : 0,
                transform: index === 0 ? "translateX(0)" : "translateX(18px)",
                pointerEvents: index === 0 ? "auto" : "none",
              }}
            >
                <div className="relative z-10 flex h-full max-w-[560px] flex-col">
                  <h3 className="max-w-[12ch] text-[clamp(1.2rem,2.9vw,2.35rem)] font-semibold leading-tight text-white sm:max-w-none">
                    {pillar.subtitle}
                  </h3>
                  <p className="mt-5 max-w-[460px] text-[15px] font-medium leading-relaxed text-slate-400 sm:text-base">
                    {pillar.description}
                  </p>

                  <div className="relative mt-6 h-44 w-full max-w-[460px] overflow-hidden bg-white/[0.03] rounded-sm lg:h-72 flex-shrink-0">
                    <Image
                      src={pillar.image}
                      alt={`${pillar.title} services`}
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 90vw, 460px"
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="mt-auto pt-2 pb-2">
                    <a
                      href={pillar.url}
                      className="group inline-flex items-center text-white font-medium text-[14px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:underline"
                    >
                      Read more
                      <span className="inline-block ml-2 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-[5px]">
                        →
                      </span>
                    </a>
                  </div>
                </div>
            </div>
          </button>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileScrollCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let mm: any;
    let cancelled = false;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      if (cancelled) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total horizontal distance to travel
        const xTranslation = -(trackWidth - viewportWidth + 32); 

        gsap.to(track, {
          x: xTranslation,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "bottom-=" + window.innerHeight + " bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[400vh] w-full bg-[#fafafa] md:hidden">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-[#fafafa] pt-16 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.015),transparent_70%)] pointer-events-none" />
        <PillarsHeader />
        
        <div className="relative mt-4 w-full z-10">
          <div 
            ref={trackRef} 
            className="flex flex-row gap-4 items-stretch px-6 w-max"
          >
            {pillars.map((pillar) => (
              <article
                key={pillar.id}
                className="w-[80vw] max-w-[300px] flex-shrink-0 flex flex-col rounded-none border border-white/20 bg-[#0a0a0a] p-5 shadow-xl"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-widest text-white/50">{pillar.number}</span>
                  <span className="text-[10px] font-semibold tracking-widest text-white/50 uppercase">{pillar.title}</span>
                </div>
                
                <h3 className="mb-2 text-[1.25rem] font-semibold leading-tight text-white">
                  {pillar.subtitle}
                </h3>
                <p className="mb-4 text-[13px] leading-relaxed text-slate-400">
                  {pillar.description}
                </p>
                
                <div className="relative mb-4 h-[160px] w-full overflow-hidden bg-white/[0.03] rounded">
                  <Image
                    src={pillar.image}
                    alt={`${pillar.title} services`}
                    fill
                    sizes="(max-width: 768px) 80vw, 300px"
                    className="object-cover"
                  />
                </div>
                
                <div className="mt-auto pt-2">
                  <a
                    href={pillar.url}
                    className="group inline-flex items-center gap-1.5 text-white font-medium text-[12px] uppercase tracking-widest hover:underline"
                  >
                    <span>Read more</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Responsive Pillars
   • Mobile: scroll based horizontal card scroll (GSAP).
   • Desktop: GSAP accordion.
   ──────────────────────────────────────────────────────── */

export function Pillars() {
  return (
    <div className="w-full bg-[#fafafa] relative z-20">
      <section
        id="pillars"
        className="w-full bg-[#fafafa]"
      >
        {/* Mobile View — GSAP vertical to horizontal scroll */}
        <MobileScrollCards />

        {/* Desktop View: Interactive Horizontal Accordion — hidden on mobile via CSS */}
        <div className="hidden md:block">
          <DesktopAccordion />
        </div>
      </section>
    </div>
  );
}
