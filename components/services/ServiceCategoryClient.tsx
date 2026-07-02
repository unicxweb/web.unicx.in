"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { usePageTransition } from "@/components/ui/page-transition";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";
import type { SelectedService } from "./service-types";
import { findShowcaseService, serviceSlug } from "./service-registry";

import dynamic from "next/dynamic";

/* Showcase pages (imported dynamically to prevent server-side Three.js/R3F compilation issues) */
const GraphicDesignShowcasePage = dynamic(
  () => import("./pages/GraphicDesignShowcasePage").then((m) => m.GraphicDesignShowcasePage),
  { ssr: false }
);
const WebsiteDevShowcasePage = dynamic(
  () => import("./pages/WebsiteDevShowcasePage").then((m) => m.WebsiteDevShowcasePage),
  { ssr: false }
);
const AppDevShowcasePage = dynamic(
  () => import("./pages/AppDevShowcasePage").then((m) => m.AppDevShowcasePage),
  { ssr: false }
);
const SoftwareDevShowcasePage = dynamic(
  () => import("./pages/SoftwareDevShowcasePage").then((m) => m.SoftwareDevShowcasePage),
  { ssr: false }
);
const MarketingShowcasePage = dynamic(
  () => import("./pages/MarketingShowcasePage").then((m) => m.MarketingShowcasePage),
  { ssr: false }
);

/* Detail pages */
import { GraphicDesignPage } from "./pages/GraphicDesignPage";
import { WebsiteDevPage } from "./pages/WebsiteDevPage";
import { AppDevPage } from "./pages/AppDevPage";
import { SoftwareDevPage } from "./pages/SoftwareDevPage";
import { MarketingPage } from "./pages/MarketingPage";

interface OverlayData {
  src: string;
  top: number;
  left: number;
  width: number;
  height: number;
  vw: number;
  vh: number;
  targetTop: number;
  targetLeft: number;
  targetWidth: number;
  targetHeight: number;
}

export function ServiceCategoryClient({
  categoryName,
  initialServiceId,
}: {
  categoryName: string;
  initialServiceId?: string;
}) {
  const { isTransitioning } = usePageTransition();
  const initialService = findShowcaseService(categoryName, initialServiceId);
  const [showDetail, setShowDetail] = useState(Boolean(initialService));
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTransition, setMobileTransition] = useState<"idle" | "closing" | "opening">("idle");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  const [overlay, setOverlay] = useState<OverlayData | null>(null);
  const [activeMockupSrc, setActiveMockupSrc] = useState<string | undefined>(initialService?.mockupSrc);
  const [selectedService, setSelectedService] = useState<SelectedService | undefined>(
    initialService
      ? {
          id: initialService.id,
          label: initialService.label,
          descriptor: initialService.descriptor,
          tags: initialService.tags,
          mockupSrc: initialService.mockupSrc,
        }
      : undefined
  );
  const [phase, setPhase] = useState<"expanding" | "shrinking" | "expanded" | null>(null);
  const landingFrameRef = useRef<number | null>(null);

  const handleServiceClick = useCallback(
    (service: CategoryHeroService | Partial<CategoryHeroService>, rect: DOMRect) => {
      if (phase || mobileTransition !== "idle") return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw < 640) {
        document.body.style.overflow = "hidden";
        setMobileTransition("closing");

        setTimeout(() => {
          setSelectedService({
            id: service.id as string,
            label: service.label as string,
            descriptor: service.descriptor as string,
            tags: service.tags as string,
            mockupSrc: service.mockupSrc as string,
          });
          setActiveMockupSrc(service.mockupSrc);
          window.history.pushState(
            null,
            "",
            `/services/${serviceSlug(categoryName)}/${serviceSlug(service.label as string)}/`
          );
          setShowDetail(true);
          window.scrollTo({ top: 0, behavior: "instant" });
          
          setTimeout(() => {
            setMobileTransition("opening");

            setTimeout(() => {
              setMobileTransition("idle");
              document.body.style.overflow = "";
            }, 1200);
          }, 250);
        }, 600);
        return;
      }

      // Fallback target. The real destination is measured from HeroImmersive
      // after it mounts, so the overlay lands exactly on the rendered mockup.
      const targetWidth = Math.min(vw * 0.4, 550);
      const targetHeight = targetWidth * 0.75;

      const containerWidth = Math.min(1280, vw);
      const containerLeft = (vw - containerWidth) / 2;

      const targetLeft = containerLeft + containerWidth - containerWidth * 0.05 - targetWidth;
      const targetTop = vh / 2 - targetHeight / 2;

      setActiveMockupSrc(service.mockupSrc);
      setSelectedService({
        id: service.id as string,
        label: service.label as string,
        descriptor: service.descriptor as string,
        tags: service.tags as string,
        mockupSrc: service.mockupSrc as string,
      });
      window.history.pushState(
        null,
        "",
        `/services/${serviceSlug(categoryName)}/${serviceSlug(service.label as string)}/`
      );
      setOverlay({
        src: service.mockupSrc as string,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        vw,
        vh,
        targetTop,
        targetLeft,
        targetWidth,
        targetHeight,
      });
      setPhase("expanding");
    },
    [categoryName, phase]
  );

  const onExpansionDone = useCallback(() => {
    setShowDetail(true);
    
    // Snap scroll to top while the screen is fully covered by the overlay
    window.scrollTo({ top: 0, behavior: "instant" });

    if (landingFrameRef.current !== null) {
      window.cancelAnimationFrame(landingFrameRef.current);
    }

    let framesTried = 0;
    const tryMeasureMockup = () => {
      framesTried++;
      const landingMockup = document.querySelector<HTMLElement>("[data-detail-mockup]");
      if (landingMockup) {
        const rect = landingMockup.getBoundingClientRect();
        // Ensure mockup has non-zero size and positive offset (fully laid out by browser)
        if (rect.width > 0 && rect.height > 0 && rect.top > 0 && rect.left > 0) {
          setOverlay((current) =>
            current
              ? {
                  ...current,
                  targetTop: rect.top,
                  targetLeft: rect.left,
                  targetWidth: rect.width,
                  targetHeight: rect.height,
                }
              : current
          );
          setPhase("shrinking");
          landingFrameRef.current = null;
          return;
        }
      }

      if (framesTried < 120) {
        landingFrameRef.current = window.requestAnimationFrame(tryMeasureMockup);
      } else {
        // Fallback to center screen if element is not present or hidden (e.g. mobile)
        setPhase("shrinking");
        landingFrameRef.current = null;
      }
    };

    landingFrameRef.current = window.requestAnimationFrame(tryMeasureMockup);
  }, []);

  const onShrinkDone = useCallback(() => {
    setOverlay(null);
    setPhase(null);
  }, []);

  useEffect(() => {
    return () => {
      if (landingFrameRef.current !== null) {
        window.cancelAnimationFrame(landingFrameRef.current);
      }
    };
  }, []);

  // Synchronize dynamic client state on browser back/forward actions
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const segments = path.split("/").filter(Boolean);
      
      if (segments.length === 3 && segments[0] === "services") {
        const srvSlug = segments[2];
        const service = findShowcaseService(categoryName, srvSlug);
        if (service) {
          setSelectedService({
            id: service.id,
            label: service.label,
            descriptor: service.descriptor,
            tags: service.tags,
            mockupSrc: service.mockupSrc,
          });
          setActiveMockupSrc(service.mockupSrc);
          setShowDetail(true);
        } else {
          setShowDetail(false);
          setSelectedService(undefined);
        }
      } else {
        setShowDetail(false);
        setSelectedService(undefined);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [categoryName]);

  const showcaseMap: Record<string, React.ComponentType<{ onServiceClick?: (service: any, rect: DOMRect) => void }>> = {
    "graphic design": GraphicDesignShowcasePage,
    "website development": WebsiteDevShowcasePage,
    "app development": AppDevShowcasePage,
    "software development": SoftwareDevShowcasePage,
    marketing: MarketingShowcasePage,
  };

  const detailMap: Record<string, React.FC<{ 
    activeMockupSrc?: string; 
    hideMockupUntilReady?: boolean; 
    selectedService?: SelectedService;
    onServiceClick?: (service: any, rect: DOMRect) => void;
  }>> = {
    "graphic design": GraphicDesignPage,
    "website development": WebsiteDevPage,
    "app development": AppDevPage,
    "software development": SoftwareDevPage,
    marketing: MarketingPage,
  };

  const Showcase = showcaseMap[categoryName];
  const Detail = detailMap[categoryName];

  if (!Showcase || !Detail) return null;

  if (isMobile) {
    return (
      <>
        <AnimatePresence mode="wait">
          {!showDetail ? (
            <motion.div
              key="showcase-mobile"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Showcase onServiceClick={handleServiceClick as any} />
            </motion.div>
          ) : (
            <motion.div
              key="detail-mobile"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <Detail
                activeMockupSrc={activeMockupSrc}
                hideMockupUntilReady={false}
                selectedService={selectedService}
                onServiceClick={handleServiceClick as any}
              />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Shutter Transition Overlay */}
        {mobileTransition !== "idle" && (
          <div className="fixed inset-0 pointer-events-none z-[250] flex">
            {/* Left Shutter */}
            <motion.div
              className="h-full bg-white border-r border-black/5 shadow-[4px_0_24px_rgba(0,0,0,0.05)]"
              initial={{ width: mobileTransition === "closing" ? "0%" : "50%" }}
              animate={{ width: mobileTransition === "closing" ? "50%" : "0%" }}
              transition={{ 
                duration: mobileTransition === "closing" ? 0.6 : 1.2, 
                ease: mobileTransition === "closing" ? [0.86, 0, 0.07, 1] : [0.16, 1, 0.3, 1] 
              }}
            />
            {/* Right Shutter */}
            <motion.div
              className="h-full bg-white absolute right-0 border-l border-black/5 shadow-[-4px_0_24px_rgba(0,0,0,0.05)]"
              initial={{ width: mobileTransition === "closing" ? "0%" : "50%" }}
              animate={{ width: mobileTransition === "closing" ? "50%" : "0%" }}
              transition={{ 
                duration: mobileTransition === "closing" ? 0.6 : 1.2, 
                ease: mobileTransition === "closing" ? [0.86, 0, 0.07, 1] : [0.16, 1, 0.3, 1] 
              }}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {!showDetail && <Showcase onServiceClick={handleServiceClick as any} />}
      {showDetail && (
        <>
          <Detail
            activeMockupSrc={activeMockupSrc}
            hideMockupUntilReady={overlay !== null || isTransitioning}
            selectedService={selectedService}
            onServiceClick={handleServiceClick as any}
          />
          <Footer />
        </>
      )}

      <AnimatePresence>
        {overlay && phase && (
          <motion.div
            key="transition-overlay"
            className="fixed z-[200] overflow-hidden"
            initial={{
              top: overlay.top,
              left: overlay.left,
              width: overlay.width,
              height: overlay.height,
              borderRadius: 12,
              opacity: 1,
            }}
            animate={
              phase === "expanding" || phase === "expanded"
                ? {
                    top: 0,
                    left: 0,
                    width: overlay.vw,
                    height: overlay.vh,
                    borderRadius: 0,
                    opacity: 1,
                  }
                : phase === "shrinking"
                ? {
                    top: overlay.targetTop,
                    left: overlay.targetLeft,
                    width: overlay.targetWidth,
                    height: overlay.targetHeight,
                    borderRadius: 16,
                    opacity: 1,
                    boxShadow: "0 34px 90px rgba(0,0,0,0.42)",
                  }
                : { opacity: 1, boxShadow: "0 34px 90px rgba(0,0,0,0.42)" }
            }
            transition={
              phase === "expanding"
                ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
                : phase === "shrinking"
                ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0, ease: [0.16, 1, 0.3, 1] }
            }
            onAnimationComplete={() => {
              if (phase === "expanding") onExpansionDone();
              if (phase === "shrinking") onShrinkDone();
            }}
          >
            <Image src={overlay.src} alt="" fill className="object-cover" sizes="100vw" priority />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Shutter Transition Overlay */}
      {isMobile && mobileTransition !== "idle" && (
        <div className="fixed inset-0 pointer-events-none z-[250] flex">
          {/* Left Shutter */}
          <motion.div
            className="h-full bg-white border-r border-black/5 shadow-[4px_0_24px_rgba(0,0,0,0.05)]"
            initial={{ width: mobileTransition === "closing" ? "0%" : "50%" }}
            animate={{ width: mobileTransition === "closing" ? "50%" : "0%" }}
            transition={{ 
              duration: mobileTransition === "closing" ? 0.6 : 1.2, 
              ease: mobileTransition === "closing" ? [0.86, 0, 0.07, 1] : [0.16, 1, 0.3, 1] 
            }}
          />
          {/* Right Shutter */}
          <motion.div
            className="h-full bg-white absolute right-0 border-l border-black/5 shadow-[-4px_0_24px_rgba(0,0,0,0.05)]"
            initial={{ width: mobileTransition === "closing" ? "0%" : "50%" }}
            animate={{ width: mobileTransition === "closing" ? "50%" : "0%" }}
            transition={{ 
              duration: mobileTransition === "closing" ? 0.6 : 1.2, 
              ease: mobileTransition === "closing" ? [0.86, 0, 0.07, 1] : [0.16, 1, 0.3, 1] 
            }}
          />
        </div>
      )}
    </>
  );
}
