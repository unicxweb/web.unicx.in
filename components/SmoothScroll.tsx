"use client";

import ReactLenis from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,                       // Gives that gliding, expensive lag feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,                   // Intercept mouse wheel
        wheelMultiplier: 0.9,                // Slightly dampen standard wheel speed
        touchMultiplier: 1.5,                // Maintain responsiveness on trackpads
      }}
    >
      {children}
    </ReactLenis>
  );
}
