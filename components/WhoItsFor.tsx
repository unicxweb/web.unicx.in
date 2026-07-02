"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ContactPopup } from '@/components/ContactPopup';

const pages = [
  {
    leftBgImage: '/images/optimized/WHO%20WE%20PARTNER.webp',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: (
        <>
          WHO<br />WE<br />PARTNER<br />WITH
        </>
      ),
      headingClassName: 'font-bold leading-[0.85] tracking-tight text-right text-white',
      headingStyle: { fontSize: 'clamp(2.5rem, 6.5vw, 9rem)' },
      description: '',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: '/images/optimized/VISIONERY%20STARDUPS.webp',
    leftContent: {
      heading: (
        <>
          VISIONARY<br />STARTUPS
        </>
      ),
      headingClassName: 'font-bold leading-[0.85] tracking-tight text-left text-white',
      headingStyle: { fontSize: 'clamp(2.5rem, 6.5vw, 9rem)' },
      description: 'Founders who need to move fast. We build high-performance MVPs and scalable platforms that secure funding and capture market share.',
    },
    rightContent: null,
  },
  {
    leftBgImage: '/images/optimized/ENTERPRICESE%20(2).webp',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: (
        <>
          ESTABLISHED<br />ENTERPRISES
        </>
      ),
      headingClassName: 'font-bold leading-[0.85] tracking-tight text-right text-white',
      headingStyle: { fontSize: 'clamp(2.5rem, 6.5vw, 9rem)' },
      description: 'Industry leaders ready to evolve. We modernize legacy architectures and design complex enterprise systems that keep you ahead of the curve.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: '/images/optimized/DIGITAL%20RETAILS%20(2).webp',
    leftContent: {
      heading: (
        <>
          DIGITAL<br />RETAILERS
        </>
      ),
      headingClassName: 'font-bold leading-[0.85] tracking-tight text-left text-white',
      headingStyle: { fontSize: 'clamp(2.5rem, 6.5vw, 9rem)' },
      description: 'E-commerce brands focused on growth. From lightning-fast product pages to seamless checkouts, we engineer storefronts that maximize revenue.',
    },
    rightContent: null,
  },
  {
    leftBgImage: '/images/optimized/ARE%20YOU%20NEXT.webp',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: (
        <>
          ARE<br />YOU<br />NEXT?
        </>
      ),
      headingClassName: 'font-bold leading-[0.85] tracking-tight text-right text-white',
      headingStyle: { fontSize: 'clamp(2.5rem, 6.5vw, 9rem)' },
      description: (
        <div className="flex flex-col items-end gap-6 md:gap-8 pointer-events-auto">
          <p>
            If you refuse to settle for average and are ready to build something extraordinary, you belong in the Studio.
          </p>
          <ContactPopup>
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-white/20 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-slate-200 active:scale-[0.98]">
              Start a Project
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </ContactPopup>
        </div>
      ),
    },
  },
];

function DesktopWhoItsFor() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const leftPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentPageRef = useRef(1);

  // We use a responsive GSAP setup for both mobile and desktop.
  // 1. scrub: 0.8 instead of true adds inertia, removing jagginess.
  // 2. transform-gpu forces hardware acceleration on mobile.
  useEffect(() => {
    let ctx: any;
    let cancelled = false;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, stModule]) => {
      if (cancelled) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const frame = frameRef.current;
      if (!section || !frame) return;

      const leftPanels = leftPanelRefs.current.filter(
        (panel): panel is HTMLDivElement => Boolean(panel)
      );
      const rightPanels = rightPanelRefs.current.filter(
        (panel): panel is HTMLDivElement => Boolean(panel)
      );
      if (leftPanels.length !== numOfPages || rightPanels.length !== numOfPages) return;

      ctx = gsap.context(() => {
        const stepCount = numOfPages - 1;

        gsap.set(leftPanels, { yPercent: 102 });
        gsap.set(rightPanels, { yPercent: -102 });
        gsap.set(leftPanels[0], { yPercent: 0 });
        gsap.set(rightPanels[0], { yPercent: 0 });

        const updateCurrentPage = (time: number) => {
          const activeIndex = Math.min(numOfPages - 1, Math.round(time));
          const nextPage = activeIndex + 1;

          if (currentPageRef.current !== nextPage) {
            currentPageRef.current = nextPage;
            setCurrentPage(nextPage);
          }
        };

        const timeline = gsap.timeline({
          defaults: { duration: 1, ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: section,
            start: 'top 0%',
            end: () => `+=${frame.offsetHeight * (stepCount + 1) * 0.75}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5, // Slightly lower scrub time for faster response
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeave: () => {
              gsap.set(leftPanels[numOfPages - 1], { yPercent: 0 });
              gsap.set(rightPanels[numOfPages - 1], { yPercent: 0 });
            },
            onEnterBack: () => {
              gsap.set(leftPanels[numOfPages - 1], { yPercent: 0 });
              gsap.set(rightPanels[numOfPages - 1], { yPercent: 0 });
            },
          },
        });

        timeline.eventCallback("onUpdate", () => {
          updateCurrentPage(timeline.time());
        });

        for (let index = 1; index < numOfPages; index += 1) {
          const position = index - 1;

          timeline
            .to(leftPanels[index - 1], { yPercent: -102, duration: 1, ease: 'power2.inOut' }, position)
            .to(rightPanels[index - 1], { yPercent: 102, duration: 1, ease: 'power2.inOut' }, position)
            .to(leftPanels[index], { yPercent: 0, duration: 1, ease: 'power2.inOut' }, position)
            .to(rightPanels[index], { yPercent: 0, duration: 1, ease: 'power2.inOut' }, position);
        }

        // Add dummy space at the end so the last slide remains fully visible and stationary
        timeline.to({}, { duration: 1 }, numOfPages - 1);
      }, section);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [numOfPages]);

  return (
    <div
      ref={sectionRef}
      className="relative w-screen max-w-full overflow-hidden bg-black"
    >
      <div ref={frameRef} className="relative h-[100svh] w-full overflow-hidden">
        {pages.map((page, i) => {
          const idx = i + 1;
          const isActive = currentPage === idx;

          // Destructure to avoid duplicate key issues in JSX style attribute
          const { fontSize: leftFontSize, ...leftRestStyle } = page.leftContent?.headingStyle || {};
          const { fontSize: rightFontSize, ...rightRestStyle } = page.rightContent?.headingStyle || {};

          return (
            <div key={idx} className="absolute inset-0">
              {/* Left Half Wrapper — top half on mobile, left half on desktop */}
              <div className="absolute top-0 left-0 h-1/2 w-full md:h-full md:w-1/2 overflow-hidden">
                <div
                  ref={(node) => {
                    leftPanelRefs.current[i] = node;
                  }}
                  className="h-full w-full will-change-transform transform-gpu"
                >
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: page.leftBgImage ? `url("${page.leftBgImage}")` : undefined }}
                  >
                    {/* Darken image for contrast if necessary */}
                    {!page.leftContent && page.leftBgImage && (
                      <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
                    )}
                    <div className={cn(
                      "flex h-full flex-col justify-center px-6 py-6 md:px-[6vw] md:py-16 text-white transition-all duration-300 relative z-10",
                      page.leftContent ? "items-start text-left" : "items-center text-center"
                    )}>
                      {page.leftContent && (
                        <>
                          <h2 
                            className={cn("mb-2 md:mb-4 uppercase transition-all duration-500", page.leftContent.headingClassName || "text-2xl", isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}
                            style={{
                              lineHeight: '0.9',
                              fontSize: leftFontSize || 'clamp(2.5rem, 6.5vw, 9rem)',
                              ...leftRestStyle
                            }}
                          >
                            {page.leftContent.heading}
                          </h2>
                          <p className={`mt-2 md:mt-8 max-w-[100%] md:max-w-[85%] text-[clamp(0.9rem,1.5vw,1.25rem)] text-white/90 transition-all delay-75 duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            {page.leftContent.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Right Half Wrapper — bottom half on mobile, right half on desktop */}
              <div className="absolute bottom-0 left-0 md:bottom-auto md:top-0 h-1/2 w-full md:left-1/2 md:h-full md:w-1/2 overflow-hidden pointer-events-auto">
                <div
                  ref={(node) => {
                    rightPanelRefs.current[i] = node;
                  }}
                  className="h-full w-full will-change-transform transform-gpu"
                >
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat pointer-events-auto"
                    style={{ backgroundImage: page.rightBgImage ? `url("${page.rightBgImage}")` : undefined }}
                  >
                    {!page.rightContent && page.rightBgImage && (
                      <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
                    )}
                    <div className={cn(
                       "flex h-full flex-col justify-center px-6 py-6 md:px-[6vw] md:py-16 text-white transition-all duration-300 relative z-10",
                      page.rightContent ? "items-end text-right" : "items-center text-center"
                    )}>
                      {page.rightContent && (
                        <>
                          <h2 
                            className={cn("mb-2 md:mb-4 uppercase transition-all duration-500", page.rightContent.headingClassName || "text-2xl", isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}
                            style={{
                              lineHeight: '0.9',
                              fontSize: rightFontSize || 'clamp(2.5rem, 6.5vw, 9rem)',
                              ...rightRestStyle
                            }}
                          >
                            {page.rightContent.heading}
                          </h2>
                          {typeof page.rightContent.description === 'string' ? (
                            <p className={`mt-2 md:mt-8 max-w-[100%] md:max-w-[85%] text-[clamp(0.9rem,1.5vw,1.25rem)] text-white/90 transition-all delay-75 duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                              {page.rightContent.description}
                            </p>
                          ) : (
                            <div className={`mt-2 md:mt-8 max-w-[100%] md:max-w-[85%] text-[clamp(0.9rem,1.5vw,1.25rem)] text-white/90 transition-all delay-75 duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                              {page.rightContent.description}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WhoItsFor() {
  return <DesktopWhoItsFor />;
}
