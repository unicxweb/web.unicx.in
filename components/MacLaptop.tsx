"use client";

import Spline from "@splinetool/react-spline";

const SPLINE_SCENE_URL = "/scene.splinecode";

export function MacLaptop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_42%,rgba(93,153,255,0.18),transparent_28%),radial-gradient(circle_at_48%_58%,rgba(255,255,255,0.08),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-[8%] top-[10%] scale-[1.08] sm:bottom-[6%] sm:top-[8%] sm:scale-100">
        <Spline scene={SPLINE_SCENE_URL} className="pointer-events-none h-full w-full" />
      </div>
    </div>
  );
}
