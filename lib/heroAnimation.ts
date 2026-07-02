"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroAnimationArgs = {
  section: HTMLElement;
  content: HTMLElement;
  glow: HTMLElement;
  setProgress: (value: number) => void;
  reduceMotion?: boolean;
};

export function createHeroAnimation({
  section,
  content,
  glow,
  setProgress,
  reduceMotion = false,
}: HeroAnimationArgs) {
  const ctx = gsap.context(() => {
    gsap.set(content, { opacity: 1, y: 0 });
    gsap.set(glow, { scale: 1, opacity: 0.22 });
    setProgress(0);

    gsap.to(content, {
      opacity: 0,
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "65% top",
        scrub: true,
      },
    });

    if (!reduceMotion) {
      gsap.to(glow, {
        scale: 1.08,
        opacity: 0.14,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: ({ progress }) => {
        setProgress(progress);
      },
    });
  }, section);

  return () => ctx.revert();
}
