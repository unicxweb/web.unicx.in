"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import DiaTextReveal from "@/components/ui/dia-text-reveal";
import { ContactPopup } from "@/components/ContactPopup";
import { GooeyInput } from "@/components/ui/gooey-input";

const SPLINE_SCENE_URL = "/scene.splinecode";

const sectionContent = {
  default: {
    headline: "We make digital products.",
    subtext: "Strategy, design, and development aligned into one focused digital product experience."
  },
  think: {
    headline: "We think strategically.",
    subtext: "Deep research and insights drive our digital product strategy."
  },
  design: {
    headline: "We design beautifully.",
    subtext: "User-centered design that creates meaningful digital experiences."
  },
  develop: {
    headline: "We develop powerfully.",
    subtext: "Robust development that brings your digital vision to life."
  }
};

export function HeroSectionFresh() {
  const [currentTime, setCurrentTime] = useState("");
  const [activeSection, setActiveSection] = useState<"default" | "think" | "design" | "develop">("default");
  
  const headline = sectionContent[activeSection].headline;
  const subtext = sectionContent[activeSection].subtext;
  
  const sectionRef = useRef<HTMLElement>(null);
  const splineWrapperRef = useRef<HTMLDivElement>(null);

  // Track the scroll position relative to the Hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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

  const scaleDimensions = () => {
    return isMobile ? [0.85, 0.95] : [1.05, 1];
  };

  // 3D container scroll effect values
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero section"
      className="relative w-[calc(50vw+50%)] min-h-[calc(100svh-7rem)] select-none"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Scroll Down Indicator (remains static outside the tilted mockup) */}
      <div className="absolute bottom-10 left-[-3.25rem] z-10 hidden origin-left -rotate-90 items-center gap-4 lg:flex">
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] font-medium uppercase tracking-[0.34rem] text-white/85"
        >
          Scroll Down
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: 1.05, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 1.8, delay: 1.05, repeat: Infinity, ease: "easeInOut" },
          }}
          className="flex items-center"
        >
          <span className="relative flex h-7 w-4 rotate-90 items-start justify-center rounded-full border border-white/60">
            <motion.span
              animate={{ y: [3, 10, 3], opacity: [1, 0.45, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-1 block h-1.5 w-1 rounded-full bg-white/85"
            />
          </span>
        </motion.span>
      </div>

      {/* The 3D tilting browser window mockup container */}
      <motion.div
        style={{
          rotateX: rotate,
          scale: scale,
          translateY: translate,
          transformOrigin: "top center",
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="absolute inset-0 rounded-tl-[1.5rem] border border-black/10 bg-white overflow-hidden"
      >
        {/* macOS Controls bar */}
        <div className="absolute inset-x-0 top-0 z-10 px-6 pt-5 sm:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex min-w-0 items-center gap-4 pr-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="min-w-0 text-[10px] tracking-[0.24rem] text-black">
                Digital Product Company.
              </div>
            </div>

            <nav className="flex items-center justify-center gap-5 sm:gap-8">
              <button
                onClick={() => setActiveSection("think")}
                className={`text-[10px] uppercase tracking-[0.22rem] transition-colors ${
                  activeSection === "think" 
                    ? "text-black font-semibold" 
                    : "text-black hover:text-neutral-500"
                }`}
              >
                THINK.
              </button>
              <button
                onClick={() => setActiveSection("design")}
                className={`text-[10px] uppercase tracking-[0.22rem] transition-colors ${
                  activeSection === "design" 
                    ? "text-black font-semibold" 
                    : "text-black hover:text-neutral-500"
                }`}
              >
                DESIGN.
              </button>
              <button
                onClick={() => setActiveSection("develop")}
                className={`text-[10px] uppercase tracking-[0.22rem] transition-colors ${
                  activeSection === "develop" 
                    ? "text-black font-semibold" 
                    : "text-black hover:text-neutral-500"
                }`}
              >
                DEVELOP.
              </button>
            </nav>

            <div className="justify-self-end flex items-center gap-4 pl-4">
              <GooeyInput 
                placeholder="Search..." 
                className="scale-75 origin-right" 
                onSearch={(value) => console.log("Searching for:", value)}
              />
              <div className="text-right text-[10px] tracking-[0.08rem] text-black">
                {currentTime}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with Spline in Background & Title Text Overlaid */}
        <div className="absolute inset-0 z-0 flex items-center justify-start px-10 sm:px-14 lg:px-20">
          
          {/* Spline Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full overflow-hidden rounded-tl-[1.5rem] bg-white">
              <div
                ref={splineWrapperRef}
                className="h-full w-full pointer-events-none"
              >
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-full"
                >
                  <Spline
                    scene={SPLINE_SCENE_URL}
                    className="h-full w-full"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Headline Text overlaying Spline scene */}
          <div className="pointer-events-none relative z-10 max-w-5xl text-left">
            <h1
              className="text-left font-normal text-black lg:whitespace-nowrap"
              style={{
                fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
                fontSize: "clamp(2.8rem, 5.6vw, 5.4rem)",
                letterSpacing: "-3px",
                fontWeight: "400",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              <span className="sr-only">{headline}</span>
              {headline.split("").map((char, index) => (
                <motion.span
                  key={`${activeSection}-${index}`}
                  initial={{ y: -42, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  aria-hidden="true"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <motion.div
              key={activeSection}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl text-sm leading-7 tracking-[0.03rem] text-black/60 sm:text-[15px]"
            >
              <DiaTextReveal
                text={subtext}
                className="text-sm leading-7 tracking-[0.03rem] sm:text-[15px]"
                colors={["#8B5CF6", "#06B6D4", "#000000"]}
              />
            </motion.div>
          </div>
        </div>

        {/* CTA Button Overlay */}
        <div className="absolute bottom-8 right-8 z-10">
          <ContactPopup>
            <span className="inline-flex items-center gap-2 rounded-none border border-black/20 bg-white/88 px-6 py-3 text-[12px] tracking-[0.2rem] text-black transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out hover:border-black hover:bg-black hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)] active:translate-y-px cursor-pointer">
              <span>Be the next</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </ContactPopup>
        </div>
      </motion.div>
    </section>
  );
}
