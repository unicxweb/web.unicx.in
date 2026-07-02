"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, LayoutGroup } from "framer-motion";
import { serviceDetailsData } from "@/components/services/service-details-data";
import { IndexLabel } from "./IndexLabel";

export type BentoCard = {
  number?: string;
  title: string;
  description?: string;
  colSpan?: 1 | 2;
  visual?: React.ReactNode;
  rotates?: string[];
  rotateLabel?: string;
  glowColor?: string;
};

interface BentoEcosystemProps {
  title: string;
  cards?: BentoCard[];
  serviceId?: string; // If provided, loads custom details dynamically
  indexLabel?: string;
}

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

// ─── PREMIUM PHOTOGRAPHY MAPPING FOR CATEGORIES ─────────────────
const categoryImages: Record<string, string[]> = {
  "ui-ux": [
    "/images/optimized/fachrizal-maulana.webp",
    "/images/optimized/balazs-ketyi.webp",
    "/images/optimized/joel-rohland.webp"
  ],
  "logo": [
    "/images/optimized/tai-jyun-chang.webp",
    "/images/optimized/merakist.webp",
    "/images/optimized/felirbe.webp"
  ],
  "marketing": [
    "/images/optimized/growtika-4.webp",
    "/images/optimized/alpridephoto.webp",
    "/images/optimized/daria-nepriakhina.webp"
  ],
  "illustration": [
    "/images/optimized/mona-miller.webp",
    "/images/optimized/enchanted-tools.webp",
    "/images/optimized/mike-castro-demaria.webp"
  ],
  "motion": [
    "/images/optimized/public-domain-vectors.webp",
    "/images/optimized/round-icons.webp",
    "/images/optimized/public-domain-vectors-2.webp"
  ],
  "business": [
    "/images/optimized/tim-russmann.webp",
    "/images/optimized/growtika-3.webp",
    "/images/optimized/oscar-mackey.webp"
  ],
  "ecommerce": [
    "/images/optimized/ze-vieira.webp",
    "/images/optimized/shubham-dhage.webp",
    "/images/optimized/jonas-leupe.webp"
  ],
  "landing": [
    "/images/optimized/mastars.webp",
    "/images/optimized/melinda-gimpel.webp",
    "/images/optimized/xavier-cee.webp"
  ],
  "platform": [
    "/images/optimized/towfiqu-barbhuiya.webp",
    "/images/optimized/stephen-dawson.webp",
    "/images/optimized/growtika-7.webp"
  ],
  "seo": [
    "/images/optimized/kobu-agency.webp",
    "/images/optimized/google-deepmind.webp",
    "/images/optimized/jakub-zerdzicki.webp"
  ],
  "ios": [
    "/images/optimized/taopaodao.webp",
    "/images/optimized/alexey-demidov.webp",
    "/images/optimized/david-goldman.webp"
  ],
  "android": [
    "/images/optimized/ricardo-gomez-angel.webp",
    "/images/optimized/growtika-5.webp",
    "/images/optimized/growtika-2.webp"
  ],
  "hybrid": [
    "/images/optimized/growtika.webp",
    "/images/optimized/michael-petrila.webp",
    "/images/optimized/jason-mavrommatis.webp"
  ],
  "pwa": [
    "/images/optimized/kevin-grieve.webp",
    "/images/optimized/erik-mclean.webp",
    "/images/optimized/zulfugar-karimov.webp"
  ],
  "product-design": [
    "/images/optimized/annie-v.webp",
    "/images/optimized/kelly-sikkema-3.webp",
    "/images/optimized/egor-komarov.webp"
  ],
  "crm-erp": [
    "/images/optimized/nick-brunner (1).webp",
    "/images/optimized/wesley-tingey.webp",
    "/images/optimized/daniel-mccullough.webp"
  ],
  "custom-software": [
    "/images/optimized/growtika-8.webp",
    "/images/optimized/a-rahmat-mn.webp",
    "/images/optimized/shubham-dhage-zuhrrsjeyem-unsplash-1-.webp"
  ],
  "saas": [
    "/images/optimized/igor-lolatto (1).webp",
    "/images/optimized/maxime (1).webp",
    "/images/optimized/nathan-jeon.webp"
  ],
  "enterprise": [
    "/images/optimized/mike-winkler.webp",
    "/images/optimized/sunil-chandra-sharma.webp",
    "/images/optimized/brecht-corbeel.webp"
  ],
  "on-page-seo": [
    "/images/optimized/jason-leung.webp",
    "/images/optimized/shubham-dhage-2.webp",
    "/images/optimized/markus-spiske.webp"
  ],
  "technical-seo": [
    "/images/optimized/shubham-dhage-3.webp",
    "/images/optimized/daniil-komov.webp",
    "/images/optimized/parisa-pourtaherian.webp"
  ],
  "social": [
    "/images/optimized/lilartsy.webp",
    "/images/optimized/hank-paul.webp",
    "/images/optimized/logan-voss.webp"
  ],
  "paid-ads": [
    "/images/optimized/omar-lopez-rincon.webp",
    "/images/optimized/hi-estudio.webp",
    "/images/optimized/sasun-bughdaryan.webp"
  ],
  "analytics": [
    "/images/optimized/rombo.webp",
    "/images/optimized/growtika-6.webp",
    "/images/optimized/kedibone-isaac-makhumisane.webp"
  ],
  "uiux-design": [
    "https://images.unsplash.com/photo-1581291518655-9523c932dedf?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80"
  ],
  "logo-design": [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
  ],
  "business-websites": [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80"
  ],
  "ecommerce-websites": [
    "https://images.unsplash.com/photo-1472851294608-062f824d296e?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=1200&auto=format&fit=crop&q=80"
  ],
  "landing-pages": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80"
  ]
};

const defaultImages = [
  "https://images.unsplash.com/photo-1755441172753-ac9b90dcd930?w=900&auto=format&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1667423711653-1ffb899172bc?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=1200&auto=format&fit=crop&q=80"
];

export function BentoEcosystem({ title, cards: fallbackCards = [], serviceId, indexLabel }: BentoEcosystemProps) {
  // If serviceId is provided and exists in registry, load data dynamically
  const dynamicData = serviceId ? serviceDetailsData[serviceId] : null;

  const sectionTitle = dynamicData ? dynamicData.bentoTitle : title;
  const cardsToRender = dynamicData ? (dynamicData.bentoCards as BentoCard[]) : fallbackCards;

  // Resolve matching image gallery
  const images = (serviceId && categoryImages[serviceId]) ? categoryImages[serviceId] : defaultImages;

  // Map BentoCards to GalleryItems
  const items: GalleryItem[] = cardsToRender.map((card, i) => ({
    id: card.number || String(i),
    title: card.title,
    subtitle: card.description || "",
    image: images[i] || defaultImages[i] || defaultImages[0],
    color: card.glowColor || "#84cc16"
  }));

  const galleryId = "fluid-gallery";

  return (
    <section className="pt-48 pb-24 sm:pt-64 sm:pb-32 bg-black relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />

      <div className="w-full px-[5vw] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Right Column: Editorial Context (Appears first, aligned right) */}
          <div className="lg:col-span-6 lg:order-2">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/50 uppercase mb-8 flex items-center gap-2">
                  <IndexLabel label={indexLabel || "03 / Solutions"} />
                </div>
                
                <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white">
                  {sectionTitle}
                </h2>
                
                <p className="mt-8 text-[clamp(14px,1.1vw,16px)] leading-[1.6] text-zinc-300 font-light tracking-wide max-w-xs">
                  Bespoke architectures engineered without compromise. We construct high-fidelity components and systems built to endure.
                </p>
              </div>

              {/* Dynamic Capability Reel Index (Structural baseline anchor) */}
              <ul className="mt-16 space-y-4 border-t border-white/10 pt-10">
                {items.map((it, idx) => (
                  <li key={it.id} className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors duration-300">
                    <span>{it.title}</span>
                    <span className="text-white/30">
                      —— <span className="text-orange-400 font-semibold">[ 0{idx + 1} ]</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Left Column: Fluid Bento Grid (Offset downwards, aligned left) */}
          <div className="lg:col-span-6 lg:order-1 lg:mt-[50vh] w-full">
            <FluidExpandingGrid items={items} id={galleryId} className="py-0 px-0" />
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── USER'S RAW FLUID EXPANDING GRID (WITHOUT MODIFICATIONS) ─────────
const ITEMS: GalleryItem[] = [
  {
    id: "grassy",
    title: "Highlands",
    subtitle: "Golden fields under the giant",
    image:
      "https://images.unsplash.com/photo-1755441172753-ac9b90dcd930?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D",
    color: "#84cc16",
  },
  {
    id: "misty",
    title: "Crimson",
    subtitle: "A scarlet flame in the mountains",
    image:
      "https://plus.unsplash.com/premium_photo-1667423711653-1ffb899172bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjZ8fHxlbnwwfHx8fHw%3D",
    color: "#10b981",
  },
  {
    id: "desert",
    title: "Deep Sea",
    subtitle: "Floating gracefully in the abyss",
    image:
      "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mjd8fHxlbnwwfHx8fHw%3D",
    color: "#0369a1",
  },
];

interface FluidExpandingGridProps {
  items?: GalleryItem[];
  className?: string;
  id?: string;
}

export function FluidExpandingGrid({
  items = ITEMS,
  className,
  id = "fluid-gallery",
}: FluidExpandingGridProps) {
  const [layout, setLayout] = useState(() => {
    const ids = items.map((item) => item.id);
    return {
      row1: ids.slice(0, 2),
      row2: ids.slice(2, Math.min(items.length, 4)),
    };
  });

  const handleExpand = (id: string) => {
    const inRow1 = layout.row1.includes(id);
    const inRow2 = layout.row2.includes(id);

    if (
      (inRow1 && layout.row1.length === 1) ||
      (inRow2 && layout.row2.length === 1)
    )
      return;

    if (inRow1) {
      const neighbor = layout.row1.find((i) => i !== id)!;
      setLayout({
        row1: [id],
        row2: [neighbor, ...layout.row2.filter((i) => i !== neighbor)].slice(
          0,
          2
        ),
      });
    } else {
      const neighbor = layout.row2.find((i) => i !== id)!;
      setLayout({
        row1: [neighbor, ...layout.row1.filter((i) => i !== neighbor)].slice(
          0,
          2
        ),
        row2: [id],
      });
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full overflow-hidden py-12 not-prose",
        className
      )}
    >
      <div className="w-full">
        <LayoutGroup id={id}>
          <motion.div
            layout
            className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-[340px] sm:h-[540px]"
          >
            {items.map((item) => {
              const isRow1 = layout.row1.includes(item.id);
              const rowArr = isRow1 ? layout.row1 : layout.row2;
              const isSelected = rowArr.length === 1 && rowArr[0] === item.id;

              const gridRow = isRow1 ? 1 : 2;
              let gridColumn = "";
              if (isSelected) {
                gridColumn = "1 / span 2";
              } else {
                if (isRow1) {
                  gridColumn = layout.row1.indexOf(item.id) === 0 ? "1" : "2";
                } else {
                  gridColumn = layout.row2.indexOf(item.id) === 0 ? "1" : "2";
                }
              }

              return (
                <motion.div
                  key={item.id}
                  layoutId={`${id}-${item.id}`}
                  onClick={() => handleExpand(item.id)}
                  style={{ gridRow, gridColumn } as any}
                  className={cn(
                    "relative cursor-pointer group w-full h-full rounded-none",
                    isSelected ? "z-30" : "z-10"
                  )}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 100,
                      damping: 25,
                    },
                  }}
                >
                  <motion.div
                    layoutId={`${id}-${item.id}-mask-wrapper`}
                    className="absolute inset-0 overflow-hidden bg-zinc-100"
                    style={{ borderRadius: 0 }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out",
                        isSelected
                          ? "object-[center_35%]"
                          : "object-[center_50%]"
                      )}
                    />
                    <motion.div
                      layoutId={`${id}-${item.id}-mask`}
                      className={cn(
                        "absolute inset-0 transition-colors duration-700",
                        isSelected ? "bg-black/0" : "bg-black/20"
                      )}
                    />
                  </motion.div>

                  <motion.div
                    layout="position"
                    className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white z-10 select-none"
                  >
                    <motion.div layout="position" className="overflow-hidden">
                      <motion.h3
                        layout="position"
                        className="text-lg sm:text-3xl font-medium mb-1 tracking-tight"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        layout="position"
                        className={cn(
                          "text-xs sm:text-sm text-white/80 font-normal transition-all duration-300",
                          isSelected ? "whitespace-normal" : "truncate"
                        )}
                      >
                        {item.subtitle}
                      </motion.p>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    layoutId={`${id}-${item.id}-overlay`}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      borderRadius: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                    }}
                  />
                  <motion.div
                    layoutId={`${id}-${item.id}-border`}
                    className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors duration-500 pointer-events-none"
                    style={{ borderRadius: 0 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

export default FluidExpandingGrid;
