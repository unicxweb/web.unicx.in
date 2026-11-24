"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createHeroAnimation } from "@/lib/heroAnimation";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null },
);

export function HeroMinimal() {
  const [currentTime, setCurrentTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneActive, setSceneActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      setCurrentTime(`${displayHours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);

    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const loadScene = () => setSceneReady(true);
    const frame = window.requestAnimationFrame(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadScene, { timeout: 700 });
      } else {
        timeoutId = globalThis.setTimeout(loadScene, 120);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if ("cancelIdleCallback" in window && idleId !== null) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setSceneReady(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const glow = glowRef.current;
    if (!section || !content || !glow) return;

    return createHeroAnimation({
      section,
      content,
      glow,
      setProgress,
      reduceMotion: isMobile,
    });
  }, [isMobile]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneActive(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[88vh] min-h-[680px] w-screen overflow-hidden border border-white/12 bg-black"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.11), transparent 34%)",
        }}
      />

      <div className="absolute inset-0 z-0">
        {!isMobile && sceneReady ? (
          <HeroScene progress={progress} active={sceneActive} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-[28%] w-[50%] max-w-[420px] rounded-[18px] border border-white/12 bg-[#141414]" />
          </div>
        )}
      </div>

      <div className="absolute top-6 left-6 z-20">
        <div className="text-white text-[10px] tracking-[0.28rem] font-mono">
          Digital Product Company.
        </div>
      </div>

      <nav className="absolute top-6 left-1/2 z-20 flex -translate-x-1/2 transform items-center gap-8">
        <Link href="#think" className="text-white text-[11px] uppercase tracking-[0.25rem] font-mono hover:text-gray-400 transition-colors">
          THINK.
        </Link>
        <Link href="#design" className="text-white text-[11px] uppercase tracking-[0.25rem] font-mono hover:text-gray-400 transition-colors">
          DESIGN.
        </Link>
        <Link href="#develop" className="text-white text-[11px] uppercase tracking-[0.25rem] font-mono hover:text-gray-400 transition-colors">
          DEVELOP.
        </Link>
      </nav>

      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <h1
          className="text-center font-normal text-white"
          style={{
            fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
            fontSize: "clamp(2.8rem, 6vw, 5.6rem)",
            letterSpacing: "-3px",
            fontWeight: "400",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          We make digital products.
        </h1>
      </div>

      <div className="absolute bottom-8 left-8 z-20 flex flex-col">
        <div className="text-[#666] text-[10px] font-mono uppercase leading-[1.8]">
          ARTIFICIAL INTELLIGENCE
        </div>
        <div className="text-[#666] text-[10px] font-mono uppercase leading-[1.8]">
          E-COMMERCE
        </div>
        <div className="text-[#666] text-[10px] font-mono uppercase leading-[1.8]">
          MOBILE APPS
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border-[0.5px] border-[rgba(255,255,255,0.2)] px-6 py-3 font-mono text-[12px] tracking-widest text-white transition-all duration-[0.3s] ease-in-out hover:bg-white hover:text-black"
        >
          Be the next {"->"}
        </Link>
      </div>

      <div className="absolute right-[40px] top-[40px] z-20">
        <div className="text-[14px] font-mono tracking-wider text-white">
          {currentTime}
        </div>
      </div>
    </section>
  );
}
