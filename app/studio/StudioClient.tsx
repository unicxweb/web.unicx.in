"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

// Custom hook to detect desktop viewports
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isDesktop;
}

const ease = {
  ui: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hero: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

// ─────────────────────────────────────────────────────────────
//  Final Studio Hero Layout (Editorial Style - Light Theme)
// ─────────────────────────────────────────────────────────────

export function StudioClient() {
  const isDesktop = useIsDesktop();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });

  const heroOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <div ref={heroRef} className="relative h-auto lg:h-[200vh] bg-[#fafafa]">
        {/* Noise overlay matching Careers page */}
        <div className="noise-overlay opacity-30 pointer-events-none absolute inset-0" />
        
        {/* Subtle orange ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.02),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

        <motion.div
          style={isDesktop ? { opacity: heroOpacity, scale: heroScale } : {}}
          className="relative lg:sticky top-0 h-auto lg:h-screen w-full bg-[#fafafa] lg:overflow-hidden"
        >
          <div className="relative w-full min-h-screen lg:h-full flex flex-col overflow-hidden px-6 sm:px-8 lg:px-16 pt-24 sm:pt-32 pb-8">
            {/* Giant left-aligned headline */}
            <motion.h1
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.05, ease: ease.hero }}
              className="mt-[18vh] sm:mt-auto text-[clamp(2.85rem,11vw,13rem)] font-light leading-[0.88] tracking-tight text-zinc-950 uppercase"
            >
              Clarity<br />
              <span className="text-zinc-950/20">Results</span>
            </motion.h1>

            {/* Bottom: left rule + right descriptor */}
            <div className="mb-12 sm:mb-14 mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: ease.hero }}
                style={{ transformOrigin: "left" }}
                className="h-px w-12 sm:w-full sm:flex-1 bg-zinc-950/10"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: ease.ui }}
                className="max-w-[28ch] text-left sm:text-right text-xs sm:text-sm font-light leading-relaxed text-zinc-500"
              >
                Studio UnicX is a multidisciplinary digital partner.<br />
                Premium growth, by design.
              </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute bottom-6 sm:bottom-8 right-6 sm:right-auto sm:left-8 lg:left-16 flex items-center gap-3"
            >
              <div className="h-px w-10 bg-zinc-950/20" />
              <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-zinc-500">Scroll</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* FLOW ART STORY SCROLL — this is the standalone GSAP-powered scroll experience */}
      <FlowArt aria-label="Studio Unicx Story">
        <FlowSection aria-label="Who we are" style={{ backgroundColor: '#fd5200', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — Who we are</p>
          <hr className="my-[2vw] border-none border-t border-black opacity-100" />
          <div>
            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
              Create<br />Without<br />Limits
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-black opacity-100" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-black/80">
            We believe every brand deserves a platform that puts clarity first. No algorithms, no noise — just pure intent and the people who drive it.
          </p>
        </FlowSection>

        <FlowSection aria-label="The mission" style={{ backgroundColor: '#000', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — The mission</p>
          <hr className="my-[2vw] border-none border-t border-white/60" />
          <div>
            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
              Clarity<br />First<br />Always
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/60" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-slate-300">
            A digital studio built for growth, by experts. We&apos;re rewriting the rules of how premium brands get seen, scaled, and valued.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/60" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Discovery</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-slate-400">
                Human-curated strategies that put real eyes on your product. No automated noise deciding your fate.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Systems</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-slate-400">
                Find seamless workflows and cohesive ecosystems that push your operational efficiency forward.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Value</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-slate-400">
                Uncompromising quality. Measurable ROI. You keep the growth you earn. Always.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="How it works" style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">03 — How it works</p>
          <hr className="my-[2vw] border-none border-t border-black/60" />
          <div>
            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
              Show<br />Up.<br />Stand<br />Out.
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/60" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-black/80">
            Three steps. Zero complexity. Your digital transformation starts moving the moment we engage.
          </p>
          <hr className="my-[2vw] border-none border-t border-black/60" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">01 — Audit</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/70">
                We strip away the clutter. Understanding where you are is the only way to build where you are going.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">02 — Architecture</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/70">
                Match with world-class engineers, designers, and marketers actively shaping your new reality.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">03 — Launch</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/70">
                Track engagement, manage metrics, and scale your brand — all supported by our systems.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="The vision" style={{ backgroundColor: '#1A3DE8', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">04 — The vision</p>
          <hr className="my-[2vw] border-none border-t border-white/50" />
          <div>
            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
              Future<br />Of<br />Digital
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/50" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-white/90">
            We&apos;re not just building a product. We&apos;re building a premium standard.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/50" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Open access</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/70">
                No gatekeeping. If you want to scale beautifully, you belong here.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Global reach</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/70">
                Your platform optimized for flawless performance across the globe from day one.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Client-first</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/70">
                Every line of code and pixel we push starts with the creator.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="Join us" style={{ backgroundColor: '#000', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">05 — Join us</p>
          <hr className="my-[2vw] border-none border-t border-white/40" />
          <div>
            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
              Ready<br />To<br />Begin?
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/40" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-slate-300">
            Take control of your brand&apos;s trajectory. Partner with us and let&apos;s shape the future of your digital presence together.
          </p>
        </FlowSection>
      </FlowArt>

      {/* Footer */}
      <Footer sticky={true} />
    </>
  );
}
