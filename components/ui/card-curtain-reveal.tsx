"use client";

import * as React from "react";
import { HTMLMotionProps, Variants, motion } from "framer-motion";

import { cn } from "@/lib/utils";

const curtainVariants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: {
      duration: 0.92,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

interface CardCurtainRevealContextValue {
  isMouseIn: boolean;
  toggle?: () => void;
}

const CardCurtainRevealContext = React.createContext<
  CardCurtainRevealContextValue | undefined
>(undefined);

function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext);

  if (!context) {
    throw new Error(
      "useCardCurtainRevealContext must be used within a CardCurtainReveal component"
    );
  }

  return context;
}

const CardCurtainReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      children,
      className,
      onBlur,
      onFocus,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      ...props
    },
    ref
  ) => {
  const [isMouseIn, setIsMouseIn] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const toggle = React.useCallback(() => {
    setIsMouseIn((current) => !current);
  }, []);

  const handlePointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerEnter?.(event);

      if (event.pointerType !== "touch" && !isMobile) {
        setIsMouseIn(true);
      }
    },
    [onPointerEnter, isMobile]
  );
  const handlePointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event);

      if (event.pointerType !== "touch" && !isMobile) {
        setIsMouseIn(false);
      }
    },
    [onPointerLeave, isMobile]
  );
  const handlePointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerUp?.(event);
    },
    [onPointerUp]
  );
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (isMobile || isTouch) {
        setIsMouseIn((current) => !current);
      }
    },
    [isMobile]
  );
  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(event);
      if (!isMobile) {
        setIsMouseIn(true);
      }
    },
    [onFocus, isMobile]
  );
  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.(event);
      if (!isMobile) {
        setIsMouseIn(false);
      }
    },
    [onBlur, isMobile]
  );

  return (
    <CardCurtainRevealContext.Provider value={{ isMouseIn, toggle }}>
      <div
        ref={ref}
        className={cn("group relative flex flex-col gap-2 overflow-hidden", className)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  );
  }
);
CardCurtainReveal.displayName = "CardCurtainReveal";

const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter";

const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 p-6", className)} {...props} />;
});
CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

const CardCurtainRevealTitle = React.forwardRef<
  HTMLHeadingElement,
  HTMLMotionProps<"h2">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();

  return (
    <motion.h2
      ref={ref}
      className={className}
      animate={isMouseIn ? { opacity: 1, y: 0 } : { opacity: 1, y: 150 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    />
  );
});
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

const CardCurtain = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isMouseIn } = useCardCurtainRevealContext();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 size-full mix-blend-difference",
          className
        )}
        variants={curtainVariants}
        animate={isMouseIn ? "visible" : "hidden"}
        {...props}
      />
    );
  }
);
CardCurtain.displayName = "CardCurtain";

const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription";

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtainRevealTitle,
  CardCurtain,
  useCardCurtainRevealContext,
};
