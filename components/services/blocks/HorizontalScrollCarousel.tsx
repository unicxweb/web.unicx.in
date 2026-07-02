"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";
import { findShowcaseService } from "../service-registry";
import { IndexLabel } from "./IndexLabel";

export interface CarouselCardType {
  id: string | number;
  title: string;
  url: string;
}

interface HorizontalScrollCarouselProps {
  title?: string;
  cards: CarouselCardType[];
  categorySlug?: string;
  onServiceClick?: (service: any, rect: DOMRect) => void;
  indexLabel?: string;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export const HorizontalScrollCarousel = ({ title, cards, categorySlug, onServiceClick, indexLabel }: HorizontalScrollCarouselProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-79%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {title && (() => {
          const firstPart = title.split(" ").slice(0, -1).join(" ");
          const secondPart = title.split(" ").slice(-1)[0];
          return (
            <div className="absolute top-[10vh] lg:top-[12vh] left-[5vw] z-50 max-w-[90vw]">
              {indexLabel && (
                <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/40 uppercase mb-8 flex items-center gap-2">
                  <IndexLabel label={indexLabel} />
                </div>
              )}
              <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] flex flex-col">
                <span 
                  style={{ 
                    WebkitTextStroke: "2px rgba(255,255,255,0.6)",
                    color: "transparent"
                  }}
                  className="font-bold text-white"
                >
                  {firstPart}
                </span>
                <span className="font-bold text-white">
                  {secondPart}
                </span>
              </h2>
            </div>
          );
        })()}

        {/* Solid black left margin boundary panel that cards scroll under */}
        <div className="absolute left-0 top-0 bottom-0 w-[5vw] bg-black z-40 pointer-events-none" />

        <div className="w-full flex items-center relative z-30">
          <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-4 lg:pl-[calc(100vw-707px)] lg:pr-[30vw] pt-[22vh] lg:pt-[44vh]">
            {cards.map((card, idx) => {
              return (
                <Card 
                  card={card} 
                  index={idx}
                  key={card.id} 
                  categorySlug={categorySlug} 
                  onServiceClick={onServiceClick}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ 
  card, 
  index,
  categorySlug,
  onServiceClick
}: { 
  card: CarouselCardType; 
  index: number;
  categorySlug?: string;
  onServiceClick?: (service: any, rect: DOMRect) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const fullService = categorySlug ? findShowcaseService(categorySlug, card.id.toString()) : undefined;
  const imageUrl = fullService?.mockupSrc || card.url;
  const formattedIndex = String(index + 1).padStart(2, "0");

  const handleClick = (e: React.MouseEvent) => {
    if (onServiceClick && categorySlug && cardRef.current) {
      e.preventDefault();
      const rect = cardRef.current.getBoundingClientRect();
      
      if (fullService) {
        onServiceClick(fullService, rect);
      } else {
        onServiceClick({
          id: card.id.toString(),
          label: card.title,
          mockupSrc: imageUrl,
        }, rect);
      }
    }
  };

  const content = (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col shrink-0 cursor-pointer overflow-hidden",
        "h-[110vw] w-[82vw] md:h-[450px] md:w-[450px]",
        "rounded-[3px] border border-white/[0.08] md:rounded-none md:border-none",
        "shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:shadow-none",
        "transition-all duration-500 ease-out hover:border-white/20"
      )}
    >
      {/* Zoomable Background Image */}
      <div
        style={{
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
      />

      {/* MOBILE ONLY: Vignette and bottom-aligned metadata */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent block md:hidden" />
      <div className="relative z-20 p-6 flex flex-col justify-end w-full h-full block md:hidden">
        <span className="font-mono text-xs text-white/40 tracking-[0.2em] mb-3 block">
          {formattedIndex}
        </span>
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-xl font-bold uppercase tracking-tight text-white leading-tight">
            {card.title}
          </h3>
          <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-white/40">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* DESKTOP ONLY: Original centered text with backdrop-blur overlay on hover */}
      <div className="absolute inset-0 z-10 hidden md:grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-6 md:p-8 text-2xl sm:text-3xl md:text-5xl font-black uppercase text-white backdrop-blur-lg text-center">
          {card.title}
        </p>
      </div>
    </div>
  );

  if (categorySlug && !onServiceClick) {
    return (
      <Link href={`/services/${categorySlug}/${slugify(card.title)}`}>
        {content}
      </Link>
    );
  }

  return <div onClick={handleClick}>{content}</div>;
};
