"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ContactPopup } from "@/components/ContactPopup";
import dynamic from "next/dynamic";
const Ballpit = dynamic(() => import("@/components/Ballpit"), { ssr: false });
const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });
const Threads = dynamic(() => import("@/components/Threads"), { ssr: false });
const LiquidChrome = dynamic(() => import("@/components/LiquidChrome"), { ssr: false });
const Waves = dynamic(() => import("@/components/Waves"), { ssr: false });
const PrismaticBurst = dynamic(() => import("@/components/PrismaticBurst"), { ssr: false });
const GradientBlinds = dynamic(() => import("@/components/GradientBlinds"), { ssr: false });

/* ─── Types ─────────────────────────────────────────────────── */
type CubicBezier = [number, number, number, number];
const ease: CubicBezier = [0.16, 1, 0.3, 1];

export interface CategoryHeroService {
  id: string;
  label: string;
  bgImage: string;
  headline: string;
  descriptor: string;
  tags: string;
  mockupSrc: string;
  /** Tailwind classes for the floating mockup wrapper */
  mockupPos: string;
  /** Tailwind classes for the large headline position */
  headlinePos: string;
  descriptorPos?: string;
  tagsPos?: string;
  overlayClass?: string;
  mockupClassName?: string;
  backgroundClassName?: string;
  titleSize?: string;
}

interface CategoryHeroProps {
  services?: CategoryHeroService[];
  defaultHeadline?: string;
  defaultDescription?: string;
  defaultMeta?: string;
  brandLabel?: string;
  defaultBgImage?: string;
  defaultBackgroundClassName?: string;
  defaultOverlayClass?: string;
  defaultHeadlinePos?: string;
  defaultDescriptionPos?: string;
  defaultTitleSize?: string;
}

const showcaseMenuItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/* ─── Data ───────────────────────────────────────────────────── */
export const GRAPHIC_SERVICES: CategoryHeroService[] = [
  {
    id: "ui-ux",
    label: "UI/UX Design",
    bgImage: "/images/optimized/boliviainteligente.webp",
    headline: "UI/UX Design",
    descriptor: "Designing intuitive digital interfaces for products that feel effortless from the first interaction.",
    tags: "UX Research, Product Design, Engineering",
    mockupSrc: "/images/optimized/faizur-rehman-pHPzdEHN6Os-unsplash.webp",
    mockupPos: "absolute right-[8%] top-[22%] w-[44%] max-w-[730px]",
    mockupClassName: "h-[358px] overflow-hidden rounded-none",
    headlinePos: "absolute left-[32%] bottom-[20%] z-20",
    descriptorPos: "absolute right-[8%] bottom-[8%] z-20 max-w-[360px] text-left text-base font-medium leading-[1.45] text-white/78",
    tagsPos: "absolute left-[28%] top-[29%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/68",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "logo",
    label: "Logo Design",
    bgImage: "/images/optimized/tri-d.webp",
    headline: "Logo Design",
    descriptor: "Creating memorable marks and identity systems that make brands instantly recognizable.",
    tags: "Logomark, Wordmark, Brand Strategy",
    mockupSrc: "/images/optimized/ajay-gorecha.webp",
    mockupPos: "absolute right-[8%] top-[18%] w-[44%] max-w-[730px]",
    mockupClassName: "h-[358px] overflow-hidden rounded-none",
    headlinePos: "absolute left-[32%] bottom-[20%] z-20",
    descriptorPos: "absolute right-[8%] bottom-[8%] z-20 max-w-[360px] text-left text-base font-medium leading-[1.45] text-white/78",
    tagsPos: "absolute left-[28%] top-[29%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/68",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "marketing",
    label: "Marketing Creatives",
    bgImage: "/images/optimized/tri-d.webp",
    headline: "Marketing Creatives",
    descriptor: "Campaign creatives engineered to stop the scroll and start the sale.",
    tags: "Campaigns, Social Ads, Creative Direction",
    mockupSrc: "/images/optimized/usama-akram.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "illustration",
    label: "Illustration",
    bgImage: "/images/optimized/joanna-kosinska.webp",
    headline: "Illustration",
    descriptor: "Creating distinctive illustrated worlds that make brand stories feel rich, ownable, and deeply memorable.",
    tags: "Digital Art, Editorial Illustration, Character Design",
    mockupSrc: "/images/optimized/balazs-ketyi-aaCuRsb7aUc-unsplash.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "motion",
    label: "Motion & Video",
    bgImage: "/images/optimized/adrien-olichon.webp",
    headline: "Motion & Video",
    descriptor: "Creating kinetic visual systems that make brand stories feel alive, memorable, and impossible to ignore.",
    tags: "Animation, Motion Design, Visual Effects",
    mockupSrc: "/images/optimized/daan-geurts.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
];

/* ─── Static Pill ────────────────────────────────────────────── */
function ServicePill({
  service,
  isSelected,
  onEnter,
  onClick,
  isFocused,
  isDisabled,
}: {
  service: CategoryHeroService;
  isSelected: boolean;
  onEnter: () => void;
  onClick: () => void;
  isFocused: boolean;
  isDisabled: boolean;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={isSelected}
      disabled={isDisabled}
      data-themed="border-color,background-color"
      className={`
        Button_Button__qQTgU CaseStudies_itemList__itemButton__9sm2h
        relative z-30 select-none cursor-pointer
        flex items-center justify-center
        w-fit h-[32px] m-0
        rounded-none border-[1.5px]
        appearance-none outline-none pointer-events-auto
        antialiased
        backdrop-blur-[14px]
        will-change-[border-color,background-color]
        disabled:pointer-events-none disabled:cursor-default
      `}
      style={{
        fontFamily: "'Basis Grotesque Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontWeight: 350,
        lineHeight: 2,
      }}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onClick}
      animate={{
        backgroundColor: isSelected 
          ? 'rgba(255, 255, 255, 0.0)' // Active pill is unfilled inside!
          : 'hsla(0, 0%, 73%, 0.2)',   // Inactive pill is filled
        
        borderColor: isSelected 
          ? 'rgba(255, 255, 255, 0.8)' // Brighter active white border
          : 'rgba(255, 255, 255, 0.0)', // transparent border
        
        color: '#ffffff',
          
        paddingLeft: '16px',
        paddingRight: '16px', 
      }}
      whileHover={!isSelected ? {
        backgroundColor: 'rgba(255, 255, 255, 0.0)', // Non-fill inside on hover
        color: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.8)', // Brighter hover white border
        paddingRight: '16px',
      } : {}}
      whileTap={!isSelected ? {
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        scale: 0.97
      } : { scale: 0.97 }}
      transition={{
        type: 'tween',
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth easeOutExpo variant
        duration: 0.25
      }}
    >
      <span 
        data-themed="color" 
        className="Button_label__YUlJz text-[16px] tracking-[-0.01em] text-center normal-case"
      >
        {service.label}
      </span>
    </motion.button>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ShowcaseTopNav({ isFocused }: { isFocused: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLabel, setTimeLabel] = useState("IST");

  useEffect(() => {
    const updateTime = () => {
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());

      setTimeLabel(`IST ${formattedTime}`);
    };

    updateTime();
    const interval = window.setInterval(updateTime, 30000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 px-6 pt-4 sm:px-8 lg:px-12">
      <div className="relative flex items-center justify-between">
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`pointer-events-auto rounded-full px-4 py-2 text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition ${
            isFocused ? "bg-white/10 text-white hover:bg-white/[0.16]" : "bg-black/10 text-black hover:bg-black/[0.16]"
          }`}
          style={{ fontFamily: "'Inter','Plus Jakarta Sans',sans-serif" }}
        >
          Menu
        </button>

        <Link
          href="/"
          className={`pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold tracking-[-0.02em] transition hover:opacity-75 ${
            isFocused ? "text-white" : "text-black"
          }`}
          style={{ fontFamily: "'Inter','Plus Jakarta Sans',sans-serif" }}
          aria-label="studio.unicx home"
        >
          UNICX
        </Link>

        <div className={`pointer-events-auto flex items-center gap-4 ${isFocused ? "text-white" : "text-black"}`}>
          <span
            className={`hidden text-[10px] font-bold uppercase tracking-[0.08em] sm:block ${
              isFocused ? "text-white/90" : "text-black/75"
            }`}
            style={{ fontFamily: "'Inter','Plus Jakarta Sans',sans-serif" }}
          >
            {timeLabel}
          </span>
          <ContactPopup>
            <button
              type="button"
              aria-label="Open contact form"
              className={`flex h-7 w-7 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition ${
                isFocused ? "bg-white/10 text-white hover:bg-white/[0.18]" : "bg-black/10 text-black hover:bg-black/[0.18]"
              }`}
            >
              <MailIcon />
            </button>
          </ContactPopup>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="showcase-menu"
              className="pointer-events-auto absolute left-0 top-12 w-60 overflow-hidden rounded-2xl border border-white/15 bg-black/[0.82] p-2 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22, ease }}
            >
              {showcaseMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/72 transition hover:bg-white/10 hover:text-white"
                  style={{ fontFamily: "'Inter','Plus Jakarta Sans',sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CategoryHero({
  services = GRAPHIC_SERVICES,
  defaultHeadline = "We make\ninterfaces",
  defaultDescription = "We craft refined digital experiences and visual systems for brands that need every touchpoint to feel precise, premium, and unmistakably their own.",
  defaultMeta = "Strategy · Design · Digital Systems",
  brandLabel = "· UNICX Studio",
  defaultBgImage = "/images/optimized/graphics-hero.webp",
  defaultBackgroundClassName = "object-cover scale-105 object-center",
  defaultOverlayClass = "absolute inset-0 bg-[#030306]/48",
  defaultHeadlinePos = "absolute inset-x-0 bottom-[19%] z-20 flex justify-center text-center",
  defaultDescriptionPos = "absolute left-[45%] top-[24%] xs:left-[50%] xs:max-w-[200px] z-20 max-w-[180px] text-left text-xs sm:text-sm font-medium leading-[1.38] text-white/86 sm:left-[59.5%] sm:top-[31.5%] sm:max-w-[330px]",
  defaultTitleSize = "text-5xl md:text-6xl lg:text-7xl xl:text-[5.35rem]",
  hideBackground = false,
  useBallpit = false,
  useBeams = false,
  useThreads = false,
  useLiquidChrome = false,
  useWaves = false,
  usePrismaticBurst = false,
  useGradientBlinds = false,
  onServiceClick,
}: CategoryHeroProps & {
  hideBackground?: boolean;
  useBallpit?: boolean;
  useBeams?: boolean;
  useThreads?: boolean;
  useLiquidChrome?: boolean;
  useWaves?: boolean;
  usePrismaticBurst?: boolean;
  useGradientBlinds?: boolean;
  onServiceClick?: (service: CategoryHeroService, rect: DOMRect) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* ── Previous-service tracking for seamless crossfade ── */
  const [prevDisplayId, setPrevDisplayId] = useState<string | null>(null);
  const prevDisplayIdRef = useRef<string | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickFrameRef = useRef<number | null>(null);

  const setHoveredService = (serviceId: string) => {
    if (window.innerWidth < 640) return;

    if (hoverClearTimer.current) {
      clearTimeout(hoverClearTimer.current);
      hoverClearTimer.current = null;
    }

    setHoveredId(serviceId);
  };

  const clearHoveredService = () => {
    if (window.innerWidth < 640) return;

    if (hoverClearTimer.current) {
      clearTimeout(hoverClearTimer.current);
    }

    hoverClearTimer.current = setTimeout(() => {
      setHoveredId(null);
      hoverClearTimer.current = null;
    }, 140); // 140ms debounce — tighter for premium responsiveness
  };

  const startServiceTransition = (svc: CategoryHeroService) => {
    if (isTransitioning || !onServiceClick) return;

    if (window.innerWidth < 640) {
      setIsTransitioning(true);
      onServiceClick(svc, new DOMRect());
      return;
    }

    setActiveId(svc.id);
    setHoveredId(svc.id);
    setIsTransitioning(true);

    if (clickFrameRef.current !== null) {
      window.cancelAnimationFrame(clickFrameRef.current);
    }

    clickFrameRef.current = window.requestAnimationFrame(() => {
      clickFrameRef.current = window.requestAnimationFrame(() => {
        const el = containerRef.current?.querySelector<HTMLElement>(`[data-mockup-id="${svc.id}"]`);

        if (!el) {
          setIsTransitioning(false);
          return;
        }

        onServiceClick(svc, el.getBoundingClientRect());
        clickFrameRef.current = null;
      });
    });
  };

  // Which service to actually show visuals for
  const displayId = hoveredId ?? activeId;

  const isFocused = hoveredId !== null || activeId !== null;

  /* ── Track previous displayId for seamless pill-to-pill crossfade ── */
  useEffect(() => {
    const prev = prevDisplayIdRef.current;
    // Only track when going from one service to another (pill-to-pill)
    if (displayId && prev && displayId !== prev) {
      setPrevDisplayId(prev);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      // Clear previous after crossfade completes
      fadeTimerRef.current = setTimeout(() => {
        setPrevDisplayId(null);
        fadeTimerRef.current = null;
      }, 580); // slightly longer than the 0.55s transition
    } else if (!displayId) {
      // Leaving all pills — clear immediately
      setPrevDisplayId(null);
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    }
    prevDisplayIdRef.current = displayId;
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [displayId]);

  useEffect(() => {
    return () => {
      if (clickFrameRef.current !== null) {
        window.cancelAnimationFrame(clickFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    services.forEach((service) => {
      [service.bgImage, service.mockupSrc].forEach((src) => {
        const image = new window.Image();
        image.src = src;
      });
    });
  }, [services]);

  return (
    <section
      ref={containerRef}
      className={`relative h-screen w-screen overflow-hidden bg-black font-sans`}
      id="graphic-design-hero"
      data-active-service={displayId ?? "ambient"}
    >
      {/* ── Premium Fluid Mesh Gradient ── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0514]"
        animate={{ opacity: isFocused ? 0 : 1 }}
        transition={{ duration: 0.55, ease }}
      >
        <div className="absolute inset-0 mix-blend-color-dodge opacity-[0.6]">
          <motion.div
            animate={{
              transform: [
                "translate(0%, 0%) scale(1)",
                "translate(-5%, 8%) scale(1.05)",
                "translate(8%, -5%) scale(0.95)",
                "translate(0%, 0%) scale(1)",
              ],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[30%] -left-[10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_#4d3dff_0%,_transparent_45%)] blur-[90px]"
          />
          <motion.div
            animate={{
              transform: [
                "translate(0%, 0%) scale(1)",
                "translate(10%, -10%) scale(1.1)",
                "translate(-10%, 10%) scale(0.9)",
                "translate(0%, 0%) scale(1)",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] left-[20%] w-[110%] h-[110%] bg-[radial-gradient(ellipse_at_center,_#8B5CF6_0%,_transparent_50%)] blur-[100px]"
          />
          <motion.div
            animate={{
              transform: [
                "translate(0%, 0%) scale(1)",
                "translate(-8%, -8%) scale(0.95)",
                "translate(5%, 15%) scale(1.05)",
                "translate(0%, 0%) scale(1)",
              ],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -left-[20%] w-[130%] h-[130%] bg-[radial-gradient(ellipse_at_center,_#A855F7_0%,_transparent_55%)] blur-[110px]"
          />
        </div>
        {/* Premium Film Grain Noise Overlay */}
        <div 
          className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-[0.25]" 
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </motion.div>

      {/* ── Ballpit background (replaces image background) ── */}
      {useBallpit && (
        <motion.div
          className="absolute inset-0 pointer-events-none will-change-[opacity]"
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <Ballpit
            count={50}
            gravity={0.005}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
            colors={[0x4d3dff, 0x8b5cf6, 0xa855f7]}
          />
        </motion.div>
      )}

      {/* ── Beams background (replaces image background) ── */}
      {useBeams && (
        <motion.div
          className="absolute inset-0 pointer-events-none will-change-[opacity]"
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </motion.div>
      )}

      {/* ── Threads background (replaces image background) ── */}
      {useThreads && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none will-change-[opacity]"
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <Threads
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
        </motion.div>
      )}

      {/* ── LiquidChrome background (replaces image background) ── */}
      {useLiquidChrome && (
        <motion.div
          className="absolute inset-0 pointer-events-none will-change-[opacity]"
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <LiquidChrome
            baseColor={[0.1, 0.1, 0.1]}
            speed={0.24}
            interactive={true}
          />
        </motion.div>
      )}

      {/* ── Waves background (replaces image background) ── */}
      {useWaves && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none will-change-[opacity]"
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <Waves
            lineColor="#ffffff"
            backgroundColor="black"
            waveSpeedX={0.0125}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </motion.div>
      )}

      {/* ── PrismaticBurst background (replaces image background) ── */}
      {usePrismaticBurst && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none will-change-[opacity]"
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <PrismaticBurst
            animationType="rotate3d"
            intensity={2}
            speed={0.5}
            distort={0}
            paused={isFocused}
            offset={{ x: 0, y: 0 }}
            hoverDampness={0.25}
            rayCount={0}
            mixBlendMode="none"
            colors={['#ff007a', '#4d3dff', '#ffffff']}
            color0="#A855F7"
            color1="#7C3AED"
            color2="#6366F1"
          />
        </motion.div>
      )}

      {/* ── GradientBlinds background (replaces image background) ── */}
      {useGradientBlinds && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none will-change-[opacity]"
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={0}
            noise={0.3}
            blindCount={16}
            blindMinWidth={60}
            mouseDampening={0.15}
            mirrorGradient={false}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
            paused={isFocused}
          />
        </motion.div>
      )}

      {/* ── Default static white background (fades out when focused) ── */}
      {!hideBackground && !useBallpit && !useBeams && !useThreads && !useLiquidChrome && !useWaves && !usePrismaticBurst && !useGradientBlinds && (
        <motion.div
            animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 0.55, ease }}
          style={{ transform: "translateZ(0)", zIndex: !isFocused ? 2 : 1 }}
        >
          <Image
            src={defaultBgImage}
            alt=""
            fill
            className={defaultBackgroundClassName}
            sizes="100vw"
            priority
          />
          <div className={defaultOverlayClass} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.44)_72%,rgba(0,0,0,0.82)_100%)]" />
        </motion.div>
      )}

      {/* ── Per-service full-bleed background (seamless crossfade) ── */}
      {!hideBackground && services.map((svc) => {
        const isActive = isFocused && displayId === svc.id;
        const isExiting = isFocused && prevDisplayId === svc.id && displayId !== svc.id;

        return (
          <motion.div
            key={svc.id + "-bg"}
            className="absolute inset-0 will-change-[opacity]"
            initial={false}
            animate={{ opacity: (isActive || isExiting) ? 1 : 0 }}
            transition={{ duration: isExiting ? 0 : 0.55, ease }}
            style={{
              transform: "translateZ(0)",
              zIndex: isActive ? 4 : isExiting ? 3 : 1,
            }}
            aria-hidden={!isActive && !isExiting}
          >
            <Image
              src={svc.bgImage}
              alt=""
              fill
              className={svc.backgroundClassName ?? "object-cover"}
              sizes="100vw"
            />
            {/* Darkening overlay so text stays readable */}
            <div className={svc.overlayClass ?? "absolute inset-0 bg-[#060608]/50"} />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.50)_100%)]" />
          </motion.div>
        );
      })}

      {/* ── Persistent overlays ── */}
      {/* Top border line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ═══ UI LAYER ════════════════════════════════════════════ */}

      {/* ── Left sidebar pills ── */}
      <motion.div
        className="absolute left-5 top-[35%] sm:top-[44%] z-30 flex -translate-y-1/2 flex-col items-start gap-2 lg:left-8 transform-gpu will-change-transform"
        onMouseLeave={clearHoveredService}
        animate={isTransitioning ? { opacity: 0, x: -20, scale: 0.95 } : { opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.35, ease }}
      >
        {services.map((svc) => (
          <div key={svc.id} className="py-0.5 block group relative z-30">
            <ServicePill
              service={svc}
              isSelected={displayId === svc.id}
              onEnter={() => setHoveredService(svc.id)}
              onClick={() => {
                startServiceTransition(svc);
              }}
              isFocused={isFocused}
              isDisabled={isTransitioning}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Top-right description (default) ── */}
      <motion.p
        className={`${defaultDescriptionPos} pointer-events-none will-change-[opacity,transform] transform-gpu`}
        style={{ 
          fontFamily: "'Inter',sans-serif",
          zIndex: !isFocused ? 20 : 1,
          transform: "translateZ(0)"
        }}
        initial={false}
        animate={{
          opacity: !isFocused ? 1 : 0,
          y: !isFocused ? 0 : -14,
          visibility: !isFocused ? "visible" : "hidden"
        }}
        transition={{ duration: 0.5, ease }}
      >
        {defaultDescription}
      </motion.p>

      {/* ── Descriptor stack (seamless crossfade) ── */}
      {!hideBackground && services.map((svc) => {
        const isActive = isFocused && displayId === svc.id;
        const isExiting = isFocused && prevDisplayId === svc.id && displayId !== svc.id;
        return (
          <motion.p
            key={svc.id + "-desc"}
            className={`${svc.descriptorPos ?? "absolute left-1/2 top-[4.5rem] z-20 -translate-x-[10%] max-w-xs text-sm leading-relaxed text-white/60"} pointer-events-none will-change-[opacity,transform] transform-gpu`}
            style={{ 
              zIndex: isActive ? 22 : isExiting ? 21 : 1,
              transform: "translateZ(0)"
            }}
            initial={false}
            animate={{
              opacity: isTransitioning ? 0 : (isActive ? 1 : isExiting ? 0 : 0),
              y: isTransitioning ? -20 : (isActive ? 0 : isExiting ? -10 : 20),
              scale: isTransitioning ? 0.95 : 1,
              visibility: (isActive || isExiting) ? "visible" : "hidden"
            }}
            transition={{ duration: isTransitioning ? 0.3 : (isExiting ? 0.35 : 0.55), ease }}
          >
            {svc.descriptor}
          </motion.p>
        );
      })}

      {/* ── Mockup stack (seamless crossfade) ── */}
      {!hideBackground && services.map((svc) => {
        const isActive = isFocused && displayId === svc.id;
        const isExiting = isFocused && prevDisplayId === svc.id && displayId !== svc.id;
        return (
          <motion.div
            key={svc.id + "-mockup"}
            data-mockup-id={svc.id}
            className={`${svc.mockupPos} ${svc.mockupClassName ?? "overflow-hidden rounded-none"} pointer-events-none transform-gpu will-change-[opacity,transform]`}
            style={{ 
              zIndex: isActive ? 14 : isExiting ? 13 : 1,
              transform: "translateZ(0)"
            }}
            initial={false}
            animate={{
              opacity: isActive ? 1 : isExiting ? 0 : 0,
              y: isActive ? 0 : isExiting ? -12 : 22,
              scale: isActive ? 1 : isExiting ? 0.98 : 0.97
            }}
            transition={{ duration: isExiting ? 0.35 : 0.55, ease, delay: isActive ? 0.04 : 0 }}
          >
            {/* Ambient glow */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
            <Image
              src={svc.mockupSrc}
              alt=""
              width={560}
              height={420}
              className="h-full w-full rounded-none object-cover drop-shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        );
      })}

      {/* ── Large headline: default state (bottom-right) ── */}
      <motion.div
        className={`${defaultHeadlinePos} pointer-events-none will-change-[opacity,transform] transform-gpu`}
        style={{ 
          zIndex: !isFocused ? 20 : 1,
          transform: "translateZ(0)"
        }}
        initial={false}
        animate={{
          opacity: !isFocused ? 1 : 0,
          y: !isFocused ? 0 : -16,
          visibility: !isFocused ? "visible" : "hidden"
        }}
        transition={{ duration: 0.5, ease }}
      >
        <h1
          className={`mx-auto flex max-w-[980px] flex-col items-start text-left font-light leading-[0.92] tracking-tight text-white ${defaultTitleSize}`}
        >
          {defaultHeadline.split("\n").map((line, index) => (
            <span key={line} className={index === 1 ? "ml-[2.15em]" : ""}>
              {line}
            </span>
          ))}
        </h1>
      </motion.div>

      {/* ── Headline stack (seamless crossfade) ── */}
      {!hideBackground && services.map((svc) => {
        const isActive = isFocused && displayId === svc.id;
        const isExiting = isFocused && prevDisplayId === svc.id && displayId !== svc.id;
        return (
          <motion.div
            key={svc.id + "-headline"}
            className={`${svc.headlinePos} pointer-events-none transform-gpu will-change-[opacity,transform]`}
            style={{ 
              zIndex: isActive ? 22 : isExiting ? 21 : 1,
              transform: "translateZ(0)"
            }}
            initial={false}
            animate={{
              opacity: isTransitioning ? 0 : (isActive ? 1 : isExiting ? 0 : 0),
              y: isTransitioning ? -20 : (isActive ? 0 : isExiting ? -12 : 20),
              scale: isTransitioning ? 0.95 : 1,
              visibility: (isActive || isExiting) ? "visible" : "hidden"
            }}
            transition={{ duration: isTransitioning ? 0.3 : (isExiting ? 0.35 : 0.55), ease, delay: isTransitioning ? 0 : (isActive ? 0.07 : 0) }}
          >
            <h1
              className={`whitespace-pre-line font-light leading-[0.92] tracking-tight text-white ${svc.titleSize ?? "text-6xl md:text-7xl lg:text-8xl xl:text-[6rem]"}`}
            >
              {svc.headline}
            </h1>
          </motion.div>
        );
      })}

      {/* ── Tags stack (seamless crossfade) ── */}
      {!hideBackground && services.map((svc) => {
        const isActive = isFocused && displayId === svc.id;
        const isExiting = isFocused && prevDisplayId === svc.id && displayId !== svc.id;
        return (
          <motion.p
            key={svc.id + "-tags"}
            className={`${svc.tagsPos ?? "absolute bottom-12 right-12 z-20 text-right text-[11px] tracking-[0.18em] text-white/35 lg:bottom-16 lg:right-14"} pointer-events-none will-change-[opacity,transform] transform-gpu`}
            style={{ 
              zIndex: isActive ? 22 : isExiting ? 21 : 1,
              transform: "translateZ(0)"
            }}
            initial={false}
            animate={{
              opacity: isTransitioning ? 0 : (isActive ? 1 : isExiting ? 0 : 0),
              y: isTransitioning ? -15 : (isActive ? 0 : isExiting ? -8 : 15),
              scale: isTransitioning ? 0.95 : 1,
              visibility: (isActive || isExiting) ? "visible" : "hidden"
            }}
            transition={{ duration: isTransitioning ? 0.3 : (isExiting ? 0.35 : 0.55), ease, delay: isTransitioning ? 0 : (isActive ? 0.10 : 0) }}
          >
            {svc.tags}
          </motion.p>
        );
      })}

      {/* ── Bottom-left branding ── */}
      <div className="absolute bottom-12 left-5 z-20 lg:bottom-16 lg:left-8">
        <div className="relative h-8 w-24">
          <Image
            src="/images/optimized/US.3.webp"
            alt="UNICX Studio"
            fill
            priority
            sizes="96px"
            className={`object-contain transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : isFocused ? "opacity-40" : "opacity-55"
            }`}
          />
        </div>
      </div>

    </section>
  );
}
