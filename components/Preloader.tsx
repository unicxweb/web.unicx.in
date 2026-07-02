"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayLeftRef = useRef<HTMLDivElement>(null);
  const overlayRightRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isComplete) return;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.classList.add("preloader-active");
    document.body.style.overflow = "hidden";
    document.body.classList.add("preloader-active");

    // ── Position the logo centered in viewport using fixed coords ──
    const logoW = 160;
    const logoH = 60;
    const startLeft = (window.innerWidth - logoW) / 2;
    const startTop = (window.innerHeight - logoH) / 2;
    const logoEl = logoRef.current;
    const progressWrapperEl = progressWrapperRef.current;

    if (logoEl) {
      gsap.set(logoEl, {
        left: startLeft,
        top: startTop,
        width: logoW,
        height: logoH,
        opacity: 0,
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        // Set initial 3D rotation (flipped 90 degrees back)
        transformPerspective: 1000,
        transformOrigin: `50% 50% -${logoH / 2}px`,
        rotationX: -90,
      });
    }

    if (progressWrapperEl) {
      gsap.set(progressWrapperEl, {
        transformPerspective: 1000,
        transformOrigin: `50% 50% -${logoH / 2}px`,
        rotationX: 0,
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // ── Phase 1: Counter + Progress ──
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 2.0,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(counterObj.val)}`;
          }
        },
      }, 0);

      // Progress bar fill
      tl.to(progressBarRef.current, {
        scaleX: 1,
        duration: 2.0,
        ease: "power2.inOut",
      }, 0);

      // Progress track fade in
      tl.fromTo(progressTrackRef.current,
        { opacity: 0, scaleX: 0.3 },
        { opacity: 1, scaleX: 1, duration: 0.8, ease: "power3.out" },
        0
      );

      // Counter & percent sign fade in
      tl.fromTo(counterRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.05
      );
      tl.fromTo(percentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.15
      );

      // Decorative line
      tl.fromTo(lineRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 1.0, ease: "power3.inOut" },
        0.2
      );

      // ── Phase 2: Switch (3D Cube Rotation to Logo at 100%) ──
      tl.to(progressWrapperEl, {
        rotationX: 90,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, 2.0);

      tl.to(logoEl, {
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }, 2.0);

      // ── Phase 3: Hold — let user appreciate logo ──
      tl.to({}, { duration: 0.5 });

      // ── Phase 5: Logo FLIP travel to navbar ──
      tl.add(() => {
        const navbarLogo = document.querySelector("[data-navbar-logo]");
        if (!navbarLogo || !logoEl) {
          gsap.to(logoEl, {
            opacity: 0,
            scale: 0.85,
            duration: 0.5,
            ease: "power2.in",
          });
          return;
        }

        const targetRect = navbarLogo.getBoundingClientRect();

        gsap.to(logoEl, {
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          duration: 1.0,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.to(logoEl, {
              opacity: 0,
              duration: 0.25,
              ease: "power2.out",
            });
          },
        });
      });

      // ── Phase 6: Overlay reveal (Mobile: Left/Right Split Curtain, Desktop: Bottom-to-Top Sweep) ──
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Split curtain sliding left and right
        tl.to(overlayLeftRef.current, {
          xPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        }, "<0.35");
        tl.to(overlayRightRef.current, {
          xPercent: 100,
          duration: 1.1,
          ease: "power4.inOut",
        }, "<");
      } else {
        // Sweep upwards (both slide up to cover desktop)
        tl.to([overlayLeftRef.current, overlayRightRef.current], {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        }, "<0.35");
      }

      // ── Phase 7: Final cleanup ──
      tl.add(() => {
        document.documentElement.classList.remove("preloader-active");
        document.body.classList.remove("preloader-active");
      }, "<0.6");

      tl.add(() => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        setIsComplete(true);
        window.dispatchEvent(new Event("preloader-complete"));
      }, ">0.1");
    });

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove("preloader-active");
      document.body.style.overflow = "";
      document.body.classList.remove("preloader-active");
    };
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <>
      {/* ── Fixed-position logo ── */}
      <div
        ref={logoRef}
        className="fixed z-[10000] pointer-events-none"
        style={{
          left: 0,
          top: 0,
          width: 160,
          height: 60,
          opacity: 0,
          willChange: "left, top, width, height, opacity",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/optimized/SU10.webp"
            alt="Studio UnicX"
            fill
            priority
            sizes="160px"
            className="object-contain object-left"
          />
        </div>
      </div>

      {/* ── Main preloader container ── */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] overflow-hidden"
      >
        {/* Split Curtains (Left and Right halves) */}
        <div
          ref={overlayLeftRef}
          className="absolute left-0 top-0 bottom-0 w-1/2 bg-black"
          style={{ willChange: "transform" }}
        />
        <div
          ref={overlayRightRef}
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-black"
          style={{ willChange: "transform" }}
        />

        {/* Centered content */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full w-full items-center justify-center pointer-events-none"
        >
          <div ref={progressWrapperRef} className="flex flex-col items-center gap-7">
            {/* Progress bar */}
            <div
              ref={progressTrackRef}
              className="relative w-48 sm:w-56 h-[1px] overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-white/[0.07]" />
              <div
                ref={progressBarRef}
                className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/70 to-white/30"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              />
            </div>

            {/* Counter */}
            <div className="flex items-baseline gap-1 font-mono">
              <span
                ref={counterRef}
                className="text-[clamp(3rem,8vw,5.5rem)] font-extralight tracking-[-0.02em] text-white/90 tabular-nums"
                style={{ fontFeatureSettings: '"tnum"', opacity: 0 }}
              >
                0
              </span>
              <span
                ref={percentRef}
                className="text-white/25 text-lg font-light"
                style={{ opacity: 0 }}
              >
                %
              </span>
            </div>

            {/* Decorative divider */}
            <div
              ref={lineRef}
              className="w-10 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ opacity: 0 }}
            />

            {/* Spacer where logo visually sits (logo is actually fixed-positioned above) */}
            <div className="h-[60px]" aria-hidden="true" />

          </div>
        </div>
      </div>
    </>
  );
}
