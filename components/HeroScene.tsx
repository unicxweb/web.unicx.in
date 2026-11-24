"use client";

import Spline from "@splinetool/react-spline";

const SPLINE_SCENE_URL = "/scene.splinecode";

type HeroSceneProps = {
  progress: number;
  active: boolean;
};

export function HeroScene({ progress, active }: HeroSceneProps) {
  const translateY = progress * -10;
  const rotateY = -6 + progress * 12;
  const rotateX = 3 - progress * 4;
  const scale = 1 + progress * 0.04;

  return (
    <div
      className="h-full w-full"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 200ms ease-out",
      }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <Spline
          scene={SPLINE_SCENE_URL}
          className="pointer-events-none h-full w-full"
        />
      </div>
    </div>
  );
}
