"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DiaTextRevealProps {
  text: string;
  className?: string;
  colors?: string[];
}

export default function DiaTextReveal({
  text,
  className,
  colors = ["#A97CF8", "#F38CB8", "#FDCC92"],
}: DiaTextRevealProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative inline-block bg-transparent text-left",
        className,
      )}
    >
      <span
        className="inline-block bg-clip-text text-transparent animate-gradient"
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
          backgroundSize: "200% 100%",
          animation: "gradient 8s ease infinite",
        }}
      >
        {text}
      </span>
    </div>
  );
}
