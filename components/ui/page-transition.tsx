"use client";

import React, { createContext, useContext, useState, useEffect, forwardRef, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: (
    href: string,
    customData?: { src: string; top: number; left: number; width: number; height: number }
  ) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
};

// Curtain variants (Window slider from top, exit continuing downwards)
const curtainVariants: Variants = {
  initial: { y: "-100%" },
  enter: { 
    y: "0%",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const }
  },
  exit: { 
    y: "100%",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const, delay: 0.05 }
  }
};

const logoVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.35, delay: 0.2, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeIn" as const }
  }
};

const glowLineVariants: Variants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isPending, startReactTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const [customTransition, setCustomTransition] = useState<{
    src: string;
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [transitionPhase, setTransitionPhase] = useState<"expanding" | "shrinking" | "expanded" | null>(null);
  const [targetCoords, setTargetCoords] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const startTransition = (
    href: string,
    customData?: { src: string; top: number; left: number; width: number; height: number }
  ) => {
    // Standardize URL paths
    const currentPath = pathname.replace(/\/$/, "");
    const targetPath = href.replace(/\/$/, "");

    // If it's the current page, skip animation
    if (currentPath === targetPath || pathname === href) {
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    if (customData && !isMobile) {
      setCustomTransition(customData);
      setTransitionPhase("expanding");
    } else {
      setCustomTransition(null);
      setTransitionPhase(null);
    }
    setIsTransitioning(true);
    setPendingHref(href);
  };

  useEffect(() => {
    if (customTransition) {
      // Force scroll to top instantly to ensure layout measurement is correct
      window.scrollTo({ top: 0, behavior: "instant" });

      // Set phase to expanded (full screen) instantly on page load
      setTransitionPhase("expanded");

      // Start measuring target
      let framesTried = 0;
      const pollMockup = () => {
        framesTried++;
        const target = document.querySelector<HTMLElement>("[data-detail-mockup]");
        if (target) {
          const rect = target.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.left >= 0) {
            setTargetCoords({
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            });
            setTransitionPhase("shrinking");
            return;
          }
        }

        if (framesTried < 120) {
          requestAnimationFrame(pollMockup);
        } else {
          // Timeout fallback
          setIsTransitioning(false);
          setCustomTransition(null);
          setTargetCoords(null);
          setTransitionPhase(null);
          setPendingHref(null);
        }
      };

      requestAnimationFrame(pollMockup);
    } else {
      setIsTransitioning(false);
      setPendingHref(null);
    }
  }, [pathname]);

  // Intercept all clicks globally to apply transition to any internal link
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Check if standard navigation should be intercepted
      const isModifiedClick = !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
      const isExternal = href.startsWith("http") || href.startsWith("//") || anchor.target === "_blank";
      const isAnchor = href.startsWith("#");
      const isSpecialScheme = href.startsWith("mailto:") || href.startsWith("tel:");
      const isDownload = anchor.hasAttribute("download");

      if (isModifiedClick || isExternal || isAnchor || isSpecialScheme || isDownload) {
        return;
      }

      // Standardize paths to check if it's the current page
      const currentPath = pathname.replace(/\/$/, "");
      const targetPath = href.replace(/\/$/, "");

      if (currentPath === targetPath || pathname === href) {
        return;
      }

      // Intercept and animate
      e.preventDefault();
      startTransition(href);
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [pathname]);

  const handleCurtainsClosed = () => {
    if (pendingHref) {
      startReactTransition(() => {
        router.push(pendingHref);
      });
    }
  };

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
      <AnimatePresence>
        {isTransitioning && !customTransition && (
          <motion.div 
            key="standard-curtain"
            variants={curtainVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === "enter") {
                handleCurtainsClosed();
              }
            }}
            className="fixed inset-0 z-[99999] pointer-events-auto bg-white border-b border-black/[0.04] flex items-center justify-center"
          >
            {/* Centered Logo */}
            <motion.div
              variants={logoVariants}
              className="relative w-20 h-20"
            >
              <Image
                src="/images/optimized/US.3.webp"
                alt="Studio UnicX logo"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </motion.div>

            {/* Glowing bottom edge indicator */}
            <motion.div
              variants={glowLineVariants}
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent shadow-[0_0_15px_#FF6A00]"
            />
          </motion.div>
        )}

        {isTransitioning && customTransition && (
          <motion.div
            key="custom-image-transition"
            className="fixed z-[99999] overflow-hidden bg-black pointer-events-auto"
            initial={{
              top: customTransition.top,
              left: customTransition.left,
              width: customTransition.width,
              height: customTransition.height,
              borderRadius: 0,
            }}
            animate={
              transitionPhase === "expanding" || transitionPhase === "expanded"
                ? {
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                  }
                : transitionPhase === "shrinking" && targetCoords
                ? {
                    top: targetCoords.top,
                    left: targetCoords.left,
                    width: targetCoords.width,
                    height: targetCoords.height,
                    borderRadius: 16,
                    boxShadow: "0 34px 90px rgba(0,0,0,0.42)",
                  }
                : {
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                  }
            }
            transition={
              transitionPhase === "expanding"
                ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                : transitionPhase === "shrinking"
                ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0 }
            }
            onAnimationComplete={() => {
              if (transitionPhase === "expanding") {
                handleCurtainsClosed();
              } else if (transitionPhase === "shrinking") {
                setIsTransitioning(false);
                setCustomTransition(null);
                setTargetCoords(null);
                setTransitionPhase(null);
                setPendingHref(null);
              }
            }}
          >
            <img
              src={customTransition.src}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};

export interface TransitionLinkProps extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, children, ...props }, ref) => {
    const { startTransition } = usePageTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow user custom onClick handler to run
      if (onClick) {
        onClick(e);
      }

      // Check if standard navigation should be intercepted
      const isModifiedClick = !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
      const isExternal = href.startsWith("http") || href.startsWith("//") || props.target === "_blank";
      const isAnchor = href.startsWith("#");
      const isSpecialScheme = href.startsWith("mailto:") || href.startsWith("tel:");

      if (e.defaultPrevented || isModifiedClick || isExternal || isAnchor || isSpecialScheme) {
        return;
      }

      // Intercept and animate
      e.preventDefault();
      startTransition(href);
    };

    return (
      <Link href={href} onClick={handleClick} ref={ref} {...(props as any)}>
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = "TransitionLink";
