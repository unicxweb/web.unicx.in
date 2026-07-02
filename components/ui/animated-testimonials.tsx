"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (!autoplay) {
      return;
    }

    const interval = setInterval(handleNext, 5000);

    return () => clearInterval(interval);
  }, [autoplay, active]);

  return (
    <div className="mx-auto max-w-sm px-4 py-2 md:py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-4 md:gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-52 md:h-80 w-full max-w-[280px] md:max-w-none mx-auto">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getRotateY(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotateY(index),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRotateY(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-2 md:py-4">
          <div className="min-h-[140px] md:min-h-[220px] sm:min-h-[180px]">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold text-white">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-slate-500">
                {testimonials[active].designation}
              </p>
              <motion.p className="mt-3 md:mt-8 text-[15px] md:text-lg text-slate-300">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>

          <div className="flex gap-4 pt-3 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-slate-800"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:rotate-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-slate-800"
              aria-label="Next testimonial"
            >
              <svg
                className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:-rotate-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRotateY(index: number) {
  const rotations = [-8, 5, -3, 9, -6, 4];
  return rotations[index % rotations.length];
}
