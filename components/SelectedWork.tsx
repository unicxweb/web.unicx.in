"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

// Testimonial typewriter component for long text with smooth character writing
// Testimonial typewriter component simplified to smooth block fade-in for performance
function TestimonialTypewriter({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="text-[18px] sm:text-[24px] lg:text-[30px] font-medium leading-tight text-white block"
    >
      {text}
    </motion.span>
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
    backgroundImage: "/images/optimized/BG%20IMAGES%20(2).webp",
    screenshot: "/images/optimized/screenshot-3.webp",
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
    backgroundImage: "/images/optimized/BG%20IMAGES%20(3).webp",
    screenshot: "/images/optimized/screenshot-1.webp",
    description:
      "Designed a premium product narrative and site architecture that aligned trust, clarity, and growth.",
    link: "https://paeg.in/",
  },
  {
    id: 3,
    company: "Studio UnicX",
    logo: "UX",
    testimonial: "The attention to detail and user experience excellence exceeded our expectations completely.",
    author: "Emily Watson",
    authorTitle: "CTO, Studio UnicX",
    authorAvatar: "EW",
    metric: "89% user satisfaction",
    imageLabel: "Studio UnicX",
    imageSrc: "https://unicx.in/",
    backgroundImage: "/images/optimized/BG%20IMAGES.webp",
    screenshot: "/images/optimized/screenshot-2.webp",
    description:
      "Built a scalable design system that reduced development time while improving user satisfaction metrics.",
    link: "https://unicx.in/",
  },
];

interface SelectedWorkProps {
  showTitle?: boolean;
  className?: string;
}

export function SelectedWork({ showTitle = true, className = "" }: SelectedWorkProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

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
    goToSlide((currentIndex - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section id="selected-work" className={`mt-48 mb-12 md:my-24 ${className}`}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between mb-8 md:mb-16"
        >
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500">
              <span className="section-dot" />
              <span>Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold uppercase tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
              Case Studies.
            </h2>
          </div>
          <p className="max-w-lg text-[14px] sm:text-[15px] leading-7 sm:leading-8 text-slate-400">
             See how we turn ideas into high-performance digital products.
          </p>
        </motion.div>
      )}

      <motion.div 
        ref={carouselRef}
        style={{ scale, opacity, y }}
        className="relative overflow-hidden"
      >
        {/* Carousel Container */}
        <div className="relative mx-auto max-w-7xl">
          <div className="relative min-h-[480px] sm:h-[550px] md:h-[500px] lg:h-[550px]">
            <div
              className="absolute inset-0"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Hero Card — stacks vertically on mobile */}
                <div className="group relative h-full overflow-hidden rounded-none border border-white/20 bg-black">
                  
                  <div className="relative flex flex-col md:flex-row h-full">
                    {/* Left Half - Testimonial */}
                    <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-black md:border-r border-b md:border-b-0 border-white/10 relative min-h-[280px] md:min-h-0">
                      <div className="flex h-full flex-col justify-between">
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-4 sm:mb-8">
                            <motion.div 
                              key={`logo-${currentIndex}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-bold text-base sm:text-lg drop-shadow-lg"
                            >
                              {caseStudies[currentIndex].logo}
                            </motion.div>
                          </div>
                          
                          <div className="text-[18px] sm:text-[24px] lg:text-[30px] font-medium leading-tight text-white mb-6 sm:mb-12 backdrop-blur-sm">
                            <TestimonialTypewriter 
                              key={`testimonial-${currentIndex}`}
                              text={`"${caseStudies[currentIndex].testimonial}"`}
                            />
                          </div>
                        </div>
                        
                        <motion.div 
                          key={`author-${currentIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="relative z-10 flex items-center gap-3 mt-auto"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-none bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                            {caseStudies[currentIndex].authorAvatar}
                          </div>
                          <div>
                            <div className="text-white text-[13px] sm:text-[14px] font-medium leading-tight">{caseStudies[currentIndex].author}</div>
                            <div className="text-[#888888] text-[12px] sm:text-[13px] leading-tight">{caseStudies[currentIndex].authorTitle}</div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Read More Link */}
                      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20">
                        <a
                          href={caseStudies[currentIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center text-white font-medium text-[13px] sm:text-[14px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:underline opacity-100"
                        >
                          Read more
                          <span className="inline-block ml-2 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[5px]">
                            →
                          </span>
                        </a>
                      </div>
                    </div>
                    
                    {/* Right Half - Case Study Image Link */}
                    <a
                      href={caseStudies[currentIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-1/2 relative bg-black flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-0 cursor-pointer group/image p-4 sm:p-6 md:p-8"
                    >
                      {/* Background image layer */}
                      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/image:scale-[1.02]">
                        {caseStudies.map((study, index) => (
                          <motion.img
                            key={study.id}
                            src={study.backgroundImage}
                            alt=""
                            loading="eager"
                            decoding="async"
                            initial={false}
                            animate={{
                              opacity: index === currentIndex ? 0.95 : 0,
                              scale: index === currentIndex ? 1 : 1.03,
                            }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                          />
                        ))}
                        <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover/image:bg-black/15" />
                      </div>
                      
                      {/* Premium Browser Window Mockup containing the website screenshot */}
                      <div className="relative z-10 w-[76%] sm:w-[80%] h-[70%] sm:h-[75%] max-h-[220px] sm:max-h-[260px] md:max-h-[280px] lg:max-h-[320px] rounded-none border border-white/15 bg-zinc-950/80 shadow-2xl shadow-black/90 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/image:border-white/25">
                        {/* Browser Header Bar */}
                        <div className="h-6 sm:h-8 border-b border-white/10 bg-zinc-900/90 px-3 sm:px-4 flex items-center justify-between shrink-0">
                          {/* Left: Window Controls */}
                          <div className="flex gap-1.5 sm:gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                          </div>
                          {/* Center: Fake URL Bar */}
                          <div className="h-4 sm:h-5 w-1/2 rounded-none bg-white/[0.04] border border-white/5 flex items-center justify-center text-[8px] sm:text-[10px] text-zinc-500 font-mono select-none">
                            {caseStudies[currentIndex].link.replace('https://', '').replace(/\/$/, '')}
                          </div>
                          {/* Right: Dummy Space */}
                          <div className="w-6 sm:w-8" />
                        </div>
                        {/* Browser Content Area showing Screenshot */}
                        <div className="relative flex-1 bg-zinc-900 overflow-hidden">
                          {caseStudies.map((study, index) => (
                            <motion.img
                              key={`ss-${study.id}`}
                              src={study.screenshot}
                              alt={study.imageLabel}
                              initial={false}
                              animate={{
                                opacity: index === currentIndex ? 1 : 0,
                                y: index === currentIndex ? 0 : 10,
                              }}
                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-500"
                            />
                          ))}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 gap-4">
          {/* Left: Dots and Progress */}
          <div className="flex items-center gap-4 sm:gap-8">
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
            <div className="w-24 sm:w-32 h-1 bg-white/20 rounded-full overflow-hidden">
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
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white transition-all duration-300"
              aria-label="Previous case study"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white transition-all duration-300"
              aria-label="Next case study"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Peripheral Cards Preview with Glassmorphism — hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Previous card preview */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 blur-md">
            <div className="h-[350px] rounded-lg border border-white/20 bg-black" />
          </div>
          
          {/* Next card preview */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 blur-md">
            <div className="h-[350px] rounded-lg border border-white/20 bg-black" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
