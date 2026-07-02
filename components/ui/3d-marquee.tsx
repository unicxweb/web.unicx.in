"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
  variant = "default",
  speed = 1,
}: {
  images: string[];
  className?: string;
  variant?: "default" | "fullscreen";
  speed?: number;
}) => {
  const isFullscreen = variant === "fullscreen";
  const shouldReduceMotion = useReducedMotion();
  const animationSpeed = Math.max(speed, 0.1);

  // Split images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block overflow-hidden",
        isFullscreen
          ? "h-[calc(100vh-112px)] min-h-[560px] w-full rounded-none"
          : "h-[600px] rounded-2xl max-sm:h-100",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div
          className={cn(
            "shrink-0",
            isFullscreen
              ? "size-[1880px] scale-[0.58] sm:scale-[0.76] lg:scale-[0.98] xl:scale-[1.12]"
              : "size-[1720px] scale-50 sm:scale-75 lg:scale-100",
          )}
        >
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className={cn(
              "relative grid size-full origin-top-left grid-cols-4 transform-3d",
              isFullscreen
                ? "right-[42%] top-[520px] gap-6 sm:gap-8"
                : "right-[50%] top-96 gap-8",
            )}
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={
                  shouldReduceMotion || speed <= 0
                    ? { y: 0 }
                    : { y: colIndex % 2 === 0 ? 100 : -100 }
                }
                transition={{
                  duration: (colIndex % 2 === 0 ? 10 : 15) / animationSpeed,
                  repeat: shouldReduceMotion || speed <= 0 ? 0 : Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={shouldReduceMotion ? undefined : { y: -10 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                      width={970}
                      height={700}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px", //-100px if you want to keep the line inside
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      } as React.CSSProperties}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px", //-100px if you want to keep the line inside
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      } as React.CSSProperties}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
