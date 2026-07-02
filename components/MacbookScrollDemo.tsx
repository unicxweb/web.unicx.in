"use client";
import React, { useEffect, useState, useRef } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import DiaTextReveal from "@/components/ui/dia-text-reveal";
import { ContactPopup } from "@/components/ContactPopup";
import { GooeyInput } from "@/components/ui/gooey-input";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { SpinningText } from "@/components/ui/spinning-text";
import { cn } from "@/lib/utils";

const SPLINE_SCENE_URL = "/scene.splinecode";

const sectionContent = {
  default: {
    headline: "We make digital products.",
    subtext: "Strategy, design, and development aligned into one focused experience."
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

function MobileHero() {
  const [activeSection, setActiveSection] = useState<"default" | "think" | "design" | "develop">("default");
  const [currentTime, setCurrentTime] = useState("");
  
  // Lazy load Spline to optimize page load speeds
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [showSpline, setShowSpline] = useState(false);
  const [inView, setInView] = useState(true);
  const { scrollY } = useScroll();
  const tabScale = useTransform(scrollY, [0, 150], [1, 0.85]);
  const tabOpacity = useTransform(scrollY, [0, 150], [1, 0.6]);

  const containerRef = useRef<HTMLDivElement>(null);

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
    const sections: Array<"default" | "think" | "design" | "develop"> = ["default", "think", "design", "develop"];
    const currentIndex = sections.indexOf(activeSection);
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sections.length;
      setActiveSection(sections[nextIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSection]);

  useEffect(() => {
    // Wait 1.5s after mount to import heavy Spline runtime, keeping initial load fast
    const timer = setTimeout(() => {
      import("@splinetool/react-spline").then((mod) => {
        setSplineComponent(() => mod.default);
        setTimeout(() => setShowSpline(true), 300);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.02 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const headline = sectionContent[activeSection].headline;
  const subtext = sectionContent[activeSection].subtext;

  return (
    <div ref={containerRef} className="relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-white px-6 pt-16 pb-8 font-sans text-black antialiased">
      <style>{`
        @keyframes hero-shift {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .bg-gradient-mesh {
          background: 
          	radial-gradient(circle at 20% 30%, rgba(120, 80, 255, 0.15) 0%, transparent 50%),
          	radial-gradient(circle at 80% 70%, rgba(0, 200, 255, 0.12) 0%, transparent 50%),
          	radial-gradient(circle at 50% 50%, rgba(255, 100, 200, 0.08) 0%, transparent 60%);
          filter: blur(40px);
          animation: hero-shift 15s ease-in-out infinite alternate;
        }
        @keyframes char-reveal {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-char-reveal {
          animation: char-reveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Top Bar matching MacOS controls */}
      <div className="absolute inset-x-0 top-0 z-20 px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="text-[10px] tracking-[0.08rem] text-black/70 font-medium">
          {currentTime}
        </div>
      </div>

      {/* Background CSS mesh gradient */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none overflow-hidden">
        <div className="bg-gradient-mesh w-[140%] h-[140%] absolute -top-[20%] -left-[20%]" />
      </div>

      {/* Dynamic Spline 3D Scene (lazy loaded, active only in viewport) */}
      {SplineComponent && inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showSpline ? 0.45 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="h-[120%] w-[120%]"
          >
            <SplineComponent scene={SPLINE_SCENE_URL} className="h-full w-full" />
          </motion.div>
        </motion.div>
      )}

      {/* Eyebrow */}
      <h1 className="sr-only">Studio UnicX</h1>
      <p className="sr-only">Creative Digital Agency for Web Development, UI/UX Design & Branding</p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mb-2 text-[10px] font-semibold uppercase tracking-[0.24rem] text-black w-full max-w-sm mx-auto"
      >
        Studio UnicX
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 w-full max-w-sm mx-auto mt-6">

        {/* Headline */}
        <div className="min-h-[70px] mb-2">
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-left font-normal text-black leading-[1.15]"
              style={{
                fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
                fontSize: "1.85rem",
                letterSpacing: "-1.2px",
                fontWeight: "400",
              }}
            >
              {headline}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Subtext */}
        <div className="min-h-[60px] mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-sm leading-relaxed tracking-[0.03rem] text-black/70"
            >
              <DiaTextReveal
                text={subtext}
                className="text-sm leading-relaxed tracking-[0.03rem]"
                colors={["#8B5CF6", "#06B6D4", "#000000"]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 mb-2"
        >
          <ContactPopup>
            <span className="inline-flex items-center gap-2 rounded-none border-[0.5px] border-black bg-black px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-xl active:scale-[0.98] cursor-pointer">
              Be the next
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </ContactPopup>
        </motion.div>

        {/* Mobile Navigation / Section Switcher */}
        <motion.div 
          style={{ scale: tabScale, opacity: tabOpacity }}
          className="flex items-center justify-between w-full mt-14 bg-neutral-100/90 backdrop-blur-md border border-neutral-200/50 rounded-full p-1.5 shadow-sm origin-center"
        >
          {(["think", "design", "develop"] as const).map((section) => {
            const isActive = activeSection === section || (activeSection === "default" && section === "think");
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn(
                  "flex-1 text-center py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.16rem] transition-all duration-300",
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-black/50 hover:text-black/80"
                )}
              >
                {section}
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export function MacbookScrollDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [targetWidth, setTargetWidth] = useState<number | string>("fit-content");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      setTargetWidth(textRef.current.scrollWidth);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  // Fade out slowly over the first 25% of the scroll with spring smoothing
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [1, 0]),
    { stiffness: 300, damping: 45, mass: 0.8, bounce: 0 }
  );

  return (
    <>
      <div className="block md:hidden">
        <MobileHero />
      </div>
      <div ref={ref} className="hidden md:block w-full overflow-hidden bg-[#fd5200] relative">
        <motion.div style={{ opacity }} className="sticky top-[85vh] z-[100] flex justify-end px-8 md:px-16 pointer-events-none w-full h-0">
          <div className="relative flex items-center justify-center mix-blend-difference text-white">
            <SpinningText
              radius={4.5}
              className="font-bold tracking-[0.15em] text-xs uppercase"
              duration={10}
            >
              scroll down • studio unicx • 
            </SpinningText>
            <svg className="w-4 h-4 absolute opacity-70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>

        <MacbookScroll
          title={
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex space-x-1 my-6">
                <motion.div
                  className={cn("pb-2", !isTypingComplete && "overflow-hidden")}
                  initial={{ width: 0 }}
                  whileInView={{ width: targetWidth }}
                  viewport={{ once: true }}
                  transition={{ duration: 3.5, ease: "linear", delay: 3.5 }}
                  onAnimationComplete={() => setIsTypingComplete(true)}
                >
                  <div
                    ref={textRef}
                    className="text-3xl text-neutral-900 font-extrabold tracking-tight"
                    style={{ whiteSpace: "nowrap", display: "inline-block" }}
                  >
                    {!isTypingComplete ? (
                      <span>Obsessive attention to detail.</span>
                    ) : (
                      <Text3DFlip
                        className="flex-nowrap inline-flex cursor-default"
                        rotateDirection="top"
                        staggerDuration={0.03}
                        transition={{ type: "spring", damping: 25, stiffness: 160 }}
                      >
                        Obsessive attention to detail.
                      </Text3DFlip>
                    )}
                  </div>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="block rounded-sm w-[4px] h-8 bg-neutral-900"
                ></motion.span>
              </div>
            </div>
          }
          badge={
            <a href="/" className="block">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg border border-neutral-200/50 -rotate-12 transform transition-all duration-300 hover:rotate-0 hover:scale-110 active:scale-95">
                <img
                  src="/images/optimized/US.3.webp"
                  alt="UniCX Logo"
                  className="h-6 w-6 object-contain"
                />
              </div>
            </a>
          }
          showGradient={false}
        >
          <OlderHeroScreenContent isMobile={isMobile} />
        </MacbookScroll>
      </div>
    </>
  );
}

export const OlderHeroScreenContent = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [activeSection, setActiveSection] = useState<"default" | "think" | "design" | "develop">("default");
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load Spline for desktop layout inside Macbook mock
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [showSpline, setShowSpline] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.02 });
    observer.observe(el);
    return () => observer.disconnect();
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

  // Automatically cycle sections so it remains dynamic and alive inside the laptop screen
  useEffect(() => {
    const sections: Array<"default" | "think" | "design" | "develop"> = ["default", "think", "design", "develop"];
    const currentIndex = sections.indexOf(activeSection);
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sections.length;
      setActiveSection(sections[nextIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSection]);

  useEffect(() => {
    if (isMobile) return;

    // Load Spline after a 1.5s delay to keep the initial load smooth
    const timer = setTimeout(() => {
      import("@splinetool/react-spline").then((mod) => {
        setSplineComponent(() => mod.default);
        setTimeout(() => setShowSpline(true), 300);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [isMobile]);

  const headline = sectionContent[activeSection].headline;
  const subtext = sectionContent[activeSection].subtext;

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden bg-white rounded-md relative">
      <div className="w-[1024px] h-[768px] scale-50 origin-top-left relative overflow-hidden bg-white select-none flex flex-col justify-between p-8 font-sans text-black antialiased">
      {/* macOS Controls bar */}
      <div className="absolute inset-x-0 top-0 z-10 px-8 pt-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex min-w-0 items-center gap-4 pr-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="min-w-0 text-[10px] tracking-[0.24rem] text-black font-semibold uppercase">
              Digital Product Company.
            </div>
          </div>

          <nav className="flex items-center justify-center gap-8">
            {["think", "design", "develop"].map((section) => (
              <button
                key={section}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSection(section as any);
                }}
                className={`text-[10px] uppercase tracking-[0.22rem] transition-colors ${activeSection === section
                  ? "text-black font-semibold"
                  : "text-black hover:text-neutral-500"
                  }`}
              >
                {section}.
              </button>
            ))}
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

      {/* Spline Canvas in Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-full w-full overflow-hidden bg-white">
          <div
            ref={splineWrapperRef}
            className="h-full w-full pointer-events-none"
          >
            {SplineComponent && inView && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: showSpline ? 1 : 0,
                  y: [0, -20, 0], 
                  rotate: [0, 2, 0] 
                }}
                transition={{ 
                  opacity: { duration: 1.2 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="h-full w-full"
              >
                <SplineComponent
                  scene={SPLINE_SCENE_URL}
                  className="h-full w-full"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Foreground Text Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-start px-20">
        <div className="max-w-2xl text-left">
          <h1 className="sr-only">Studio UnicX</h1>
          <p className="sr-only">Creative Digital Agency for Web Development, UI/UX Design & Branding</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24rem] text-neutral-500 mb-4">
            Studio UnicX
          </p>
          <h2
            className="text-left font-normal text-black"
            style={{
              fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
              fontSize: "2.8rem",
              letterSpacing: "-2px",
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
          </h2>

          <motion.div
            key={activeSection}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-lg text-sm leading-7 tracking-[0.03rem] text-black/60"
          >
            <DiaTextReveal
              text={subtext}
              className="text-sm leading-7 tracking-[0.03rem]"
              colors={["#8B5CF6", "#06B6D4", "#000000"]}
            />
          </motion.div>
        </div>
      </div>

      {/* CTA Button Overlay */}
      <div className="absolute bottom-32 right-8 z-10">
        <ContactPopup>
          <span className="inline-flex items-center gap-2 rounded-none border-[0.5px] border-black bg-black px-6 py-3 text-[12px] tracking-[0.2rem] text-white transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out hover:bg-white hover:text-black hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)] active:translate-y-px cursor-pointer">
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
    </div>
    </div>
  );
};
