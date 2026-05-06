"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isTyping };
}

// Typewriter text component
function TypewriterText({ text }: { text: string }) {
  const { displayedText, isTyping } = useTypewriter(text, 30);
  
  return (
    <span>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-0.5 h-6 bg-white ml-1 animate-pulse" />
      )}
    </span>
  );
}

const caseStudies = [
  {
    id: 1,
    company: "Furnext",
    logo: "FN",
    testimonial: "The clarity they brought to our user journey transformed everything. Our conversion rate speaks for itself.",
    author: "Sarah Chen",
    authorTitle: "CEO, Furnext",
    authorAvatar: "SC",
    metric: "+148% qualified leads",
    imageLabel: "Furnext",
    imageSrc: "https://furnext.in/",
    description:
      "Rebuilt the acquisition flow into a sharper, faster system with cleaner messaging and conversion paths.",
    link: "https://furnext.in/",
  },
  {
    id: 2,
    company: "Paeg",
    logo: "PG",
    testimonial: "They understood our vision immediately and built something that feels like it came from within our team.",
    author: "Marcus Rodriguez",
    authorTitle: "Founder, Paeg",
    authorAvatar: "MR",
    metric: "3.2x demo conversion",
    imageLabel: "Paeg",
    imageSrc: "https://paeg.in/",
    description:
      "Designed a premium product narrative and site architecture that aligned trust, clarity, and growth.",
    link: "https://paeg.in/",
  },
  {
    id: 3,
    company: "studio.unicx",
    logo: "UX",
    testimonial: "The attention to detail and user experience excellence exceeded our expectations completely.",
    author: "Emily Watson",
    authorTitle: "CTO, studio.unicx",
    authorAvatar: "EW",
    metric: "89% user satisfaction",
    imageLabel: "studio.unicx",
    imageSrc: "https://unicx.in/",
    description:
      "Built a scalable design system that reduced development time while improving user satisfaction metrics.",
    link: "https://unicx.in/",
  },
];

const PREVIEW_VIEWPORT = {
  width: 1440,
  height: 900,
};

function LiveSitePreview({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateScale = () => {
      const { width, height } = frame.getBoundingClientRect();
      const nextScale = Math.min(
        width / PREVIEW_VIEWPORT.width,
        height / PREVIEW_VIEWPORT.height,
      );

      setScale(nextScale);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(frame);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-white/20 bg-black"
    >
      {src ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              width: PREVIEW_VIEWPORT.width,
              height: PREVIEW_VIEWPORT.height,
              transform: `scale(${scale})`,
              transformOrigin: "center",
              flex: "0 0 auto",
            }}
          >
            <iframe
              src={src}
              className="h-full w-full border-0"
              title={title}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_45%,rgba(255,255,255,0.04))]">
          <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-white/10 bg-white/[0.04]" />
          <div className="absolute inset-x-[12%] bottom-[18%] h-20 rounded-[999px] border border-white/10 bg-white/[0.04]" />
          <div className="absolute inset-x-[18%] bottom-[26%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute inset-x-[22%] top-[56%] h-px bg-white/10" />
          <div className="absolute inset-x-[30%] top-[64%] h-px bg-white/10" />
          <div className="absolute inset-x-[38%] top-[72%] h-px bg-white/10" />
          <div className="absolute bottom-6 left-6 text-[10px] font-medium uppercase tracking-[0.34em] text-slate-500">
            Preview Pending
          </div>
        </div>
      )}

          </div>
  );
}

function LivePreviewStack({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative w-full max-w-xl aspect-[16/10]">
      {caseStudies.map((study, index) => (
        <motion.div
          key={study.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ 
            opacity: index === activeIndex ? 1 : 0,
            x: index === activeIndex ? 0 : (index < activeIndex ? -24 : 24),
            transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }}
          className="absolute inset-0"
          style={{ 
            pointerEvents: index === activeIndex ? 'auto' : 'none',
            zIndex: index === activeIndex ? 10 : 1
          }}
        >
          <LiveSitePreview src={study.imageSrc} title={study.company} />
        </motion.div>
      ))}
    </div>
  );
}

interface SelectedWorkProps {
  showTitle?: boolean;
  className?: string;
}

export function SelectedWork({ showTitle = true, className = "" }: SelectedWorkProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextSlide();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevSlide();
  };

  return (
    <section id="selected-work" className={`pt-24 sm:pt-32 ${className}`}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-16"
        >
          <div className="max-w-3xl">
            <div className="section-label">Selected Work</div>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
              Case Studies.
            </h2>
          </div>
          <p className="max-w-lg text-[15px] leading-8 text-slate-400 sm:text-base">
            See how we turn ideas into high-performance digital products.
          </p>
        </motion.div>
      )}

      <div className="relative overflow-hidden">
        {/* Carousel Container */}
        <div className="relative mx-auto max-w-7xl">
          <div className="relative h-[550px] md:h-[500px] lg:h-[550px]">
            <div
              className="absolute inset-0"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Two-Column Hero Card with Glassmorphism */}
                <div className="group relative h-full overflow-hidden rounded-lg border border-white/20 bg-black">
                  
                  <div className="relative flex h-full">
                    {/* Left Half - Testimonial with Glassmorphism */}
                    <div className="w-1/2 p-12 lg:p-16 flex flex-col justify-between bg-black border-r border-white/10 relative">
                      <div className="flex h-full flex-col justify-between">
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-8">
                            <motion.div 
                              key={`logo-${currentIndex}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-bold text-lg drop-shadow-lg"
                            >
                              {caseStudies[currentIndex].logo}
                            </motion.div>
                          </div>
                          
                          <blockquote className="text-[24px] lg:text-[30px] font-medium leading-tight text-white mb-12 backdrop-blur-sm">
                            <TypewriterText 
                              key={`testimonial-${currentIndex}`}
                              text={`"${caseStudies[currentIndex].testimonial}"`}
                            />
                          </blockquote>
                        </div>
                        
                        <motion.div 
                          key={`author-${currentIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="relative z-10 flex items-center gap-3 mt-auto"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-semibold">
                            {caseStudies[currentIndex].authorAvatar}
                          </div>
                          <div>
                            <div className="text-white text-[14px] font-medium leading-tight">{caseStudies[currentIndex].author}</div>
                            <div className="text-[#888888] text-[13px] leading-tight">{caseStudies[currentIndex].authorTitle}</div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Read More Link */}
                      <div className="absolute bottom-8 right-8 z-20">
                        <a
                          href={caseStudies[currentIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center text-white font-medium text-[14px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:underline opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0"
                        >
                          Read more
                          <span className="inline-block ml-2 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-[5px]">
                            →
                          </span>
                        </a>
                      </div>
                    </div>
                    
                    {/* Right Half - Laptop Screen Preview */}
                    <div className="w-1/2 relative bg-black p-8 lg:p-12 flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      {/* Background zoom layer */}
                      <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]">
                        {/* High-end floating gradient with auto-changing colors */}
                        <div className="absolute inset-0 opacity-40">
                          {/* Floating gradient orbs */}
                          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-600/30 via-purple-600/25 to-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }} />
                          <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-tr from-cyan-600/30 via-blue-600/25 to-teal-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }} />
                          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-bl from-rose-600/30 via-pink-600/25 to-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
                          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-600/25 via-green-600/20 to-teal-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }} />
                          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-tl from-amber-600/25 via-orange-600/20 to-yellow-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '5.5s' }} />
                          
                          {/* Animated color shifts */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-purple-600/10 to-pink-600/15 animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }} />
                          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/15 via-cyan-600/10 to-teal-600/15 animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }} />
                          <div className="absolute inset-0 bg-gradient-to-bl from-rose-600/15 via-fuchsia-600/10 to-pink-600/15 animate-pulse" style={{ animationDelay: '5s', animationDuration: '6s' }} />
                        </div>
                      </div>
                      {/* Stable preview window */}
                      <div className="relative w-full max-w-xl aspect-[16/10] overflow-hidden rounded-lg">
                        <LivePreviewStack activeIndex={currentIndex} />
                      </div>
                    </div>
                  </div>
                                  </div>
            </div>
          </div>

                  </div>

        {/* Progress Indicators */}
        <div className="flex justify-between items-center mt-8">
          {/* Left: Dots and Progress */}
          <div className="flex items-center gap-8">
            {/* Dots */}
            <div className="flex gap-3">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 h-2 bg-white rounded-full"
                      : "w-2 h-2 bg-white/30 rounded-full hover:bg-white/50"
                  }`}
                  aria-label={`Go to case study ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / caseStudies.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
          
          {/* Right: Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Previous case study"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Next case study"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Peripheral Cards Preview with Glassmorphism */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Previous card preview */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 blur-md">
            <div className="h-[350px] rounded-lg border border-white/20 bg-black" />
          </div>
          
          {/* Next card preview */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 blur-md">
            <div className="h-[350px] rounded-lg border border-white/20 bg-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
