"use client";

import * as React from "react";
import { useMeasure } from "@uidotdev/usehooks";
import { VariantProps, cva } from "class-variance-authority";
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

const processCardVariants = cva("flex border backdrop-blur-lg", {
  variants: {
    variant: {
      indigo:
        "flex border text-white border-white/10 bg-[#1A3DE8]",
      light: "shadow",
    },
    size: {
      sm: "min-w-[85%] max-w-[85%] md:min-w-[25%] md:max-w-[25%]",
      md: "min-w-[90%] max-w-[90%] md:min-w-[50%] md:max-w-[50%]",
      lg: "min-w-[90%] max-w-[90%] md:min-w-[75%] md:max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "indigo",
    size: "md",
  },
});

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

interface ProcessCardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof processCardVariants> {
  itemsLength: number;
  index: number;
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    );
  }
  return context;
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
    {...props}
  />
));
ContainerSticky.displayName = "ContainerSticky";

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
ProcessCardTitle.displayName = "ProcessCardTitle";

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-8 p-6", className)}
    {...props}
  />
));
ProcessCardBody.displayName = "ProcessCardBody";

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext();
  const scrollRangeEnd = 0.82;
  const start = (index / itemsLength) * scrollRangeEnd;
  const end = start + (1 / itemsLength) * scrollRangeEnd;
  
  const [innerWidth, setInnerWidth] = React.useState(1200);

  React.useEffect(() => {
    setInnerWidth(window.innerWidth);
    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const [ref, { width }] = useMeasure();

  const x = useTransform(scrollYProgress, (value) => {
    const w = width ?? 0;
    const isMobileLayout = innerWidth < 768;
    
    // On mobile: 100% overlap. On desktop: original partial overlap with 64px tabs.
    const targetVal = isMobileLayout 
      ? -((w + 16) * index) 
      : -(w * index) + 64 * index;
    
    if (value <= start) return innerWidth;
    if (value >= end) return targetVal;
    
    const pct = (value - start) / (end - start);
    return innerWidth + (targetVal - innerWidth) * pct;
  });
  
  return (
    <motion.div
      ref={ref}
      style={{
        flexShrink: 0,
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  );
};
ProcessCard.displayName = "ProcessCard";
