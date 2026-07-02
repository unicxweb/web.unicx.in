"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  pauseOnHover?: boolean;
};

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  ...props
}: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "flex w-max min-w-full gap-4 [animation:marquee_var(--duration,24s)_linear_infinite]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
