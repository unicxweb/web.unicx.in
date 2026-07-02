"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Laptop, Smartphone, Cpu, LineChart, Compass, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, type Tab } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import StackedArticleCards from "@/components/ui/stacked-article-cards";
import { serviceCategories } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { usePageTransition } from "@/components/ui/page-transition";

const toCategorySlug = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const toServiceSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "")
    .replace(/-+/g, "-");

const serviceImageSources: Record<string, string> = {
  // Graphic Design
  "UI/UX Design": "/images/optimized/faizur-rehman-pHPzdEHN6Os-unsplash.webp",
  "Logo Design": "/images/optimized/ajay-gorecha.webp",
  "Marketing Creatives": "/images/optimized/usama-akram.webp",
  "Illustration": "/images/optimized/balazs-ketyi-aaCuRsb7aUc-unsplash.webp",
  "Motion & Video": "/images/optimized/daan-geurts.webp",

  // Website Development
  "Business Websites": "/images/optimized/web-dev-business-mockup.webp",
  "Ecommerce Websites": "/images/optimized/the-blowup.webp",
  "Landing Pages": "/images/optimized/team-nocoloco.webp",
  "Custom Web Solutions": "/images/optimized/vy-tran.webp",
  "Performance & SEO": "/images/optimized/lukas-muller.webp",

  // App Development
  "Android Apps": "/images/optimized/kelly-sikkema.webp",
  "iOS Apps": "/images/optimized/mariia-shalabaieva.webp",
  "Hybrid Apps": "/images/optimized/kelly-sikkema-2.webp",
  "Progressive Web Apps": "/images/optimized/coinstash-australia.webp",
  "Product Prototypes": "/images/optimized/mayank-girdhar-2x9XhQmegeU-unsplash%20(1).webp",

  // Software Development
  "CRM & ERP Solutions": "/images/optimized/kobu-agency-1.webp",
  "Custom Software": "/images/optimized/clay-banks.webp",
  "SaaS Applications": "/images/optimized/rolf-van-root.webp",
  "Enterprise Solutions": "/images/optimized/lightsaber-collection.webp",

  // Marketing
  "On-Page SEO": "/images/optimized/afif-ramdhasuma.webp",
  "Technical SEO": "/images/optimized/zbra-marketing.webp",
  "Social Media Marketing": "/images/optimized/igor-omilaev.webp",
  "Paid Advertising": "/images/optimized/rumman-amin.webp",
  "Analytics & Reporting": "/images/optimized/1981-digital.webp",
};

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number, rect?: DOMRect) => void;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content in marquee (mobile only)
   * @default 4
   */
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title = "Browse my library",
  archiveButton = {
    text: "View gallery",
    href: "/services"
  },
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const defaultImages: NonNullable<PortfolioGalleryProps["images"]> = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      alt: "SaaS Dashboard Design",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      alt: "Web Development",
    },
    {
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "E-Commerce Platform",
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      alt: "Mobile App Design",
    },
    {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      alt: "Brand Identity",
    },
    {
      src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
      alt: "Marketing Campaign",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
      alt: "Product Photography",
    },
    {
      src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80",
      alt: "Packaging Design",
    },
    {
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "Tech Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      alt: "Future Vision",
    },
  ];
  const images = customImages || defaultImages;

  return (
    <section
      aria-label={title}
      className={`relative min-h-0 md:min-h-screen py-4 md:py-20 px-2 md:px-4 ${className}`}
      id="archives"
    >
      <div className="max-w-7xl mx-auto bg-white backdrop-blur-sm rounded-none border border-black/15 overflow-hidden">
        {/* Header Section */}
        <div className="relative z-10 text-center pt-6 pb-2 px-4 md:pt-16 md:pb-8 md:px-8 flex flex-col justify-center items-center h-20 md:h-auto gap-3 md:gap-5">
          <div className="flex flex-col items-center justify-center gap-1.5 w-full">
            <h2 className="text-xl md:text-6xl font-bold text-black text-balance">{title}</h2>
            <Link
              href={archiveButton.href}
              className="inline-flex md:hidden items-center gap-1.5 rounded-none border border-black/15 bg-black px-3 py-0.5 text-[10px] font-semibold text-white transition-colors hover:bg-zinc-800 active:scale-95"
            >
              <span>View</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>

          <Link
            href={archiveButton.href}
            className="hidden md:inline-flex items-center gap-2 rounded-none border border-black/10 bg-black px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-900 group mb-6"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        {/* Desktop 3D overlapping layout - hidden on mobile */}
        <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
            {images.map((image, index) => {
              // Calculate stagger height - peak in middle, descending to edges
              const totalImages = images.length;
              const middle = Math.floor(totalImages / 2);
              const distanceFromMiddle = Math.abs(index - middle);
              const staggerOffset = maxHeight - distanceFromMiddle * 20;

              const zIndex = totalImages - index;

              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

              // When hovering: hovered card moves to consistent top position, others move to baseline
              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset;

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: zIndex,
                  }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2, // Much faster hover animation
                    delay: index * 0.05, // Faster entrance stagger
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    onImageClick?.(index, rect);
                  }}
                >
                  <div
                    className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-none border border-black/10 overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover object-left-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3.5 left-3.5 z-20">
                      <span className="font-mono text-xs uppercase tracking-[0.12em] text-white bg-zinc-950/90 px-3 py-1.5 rounded-none border border-white/15">
                        {image.title || image.alt}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile responsive vertically stacked card deck layout */}
        <div className="block md:hidden px-4 pb-2">
          <StackedArticleCards
            items={images.map((img, idx) => ({
              title: img.title || img.alt,
              subTitle: "Professional custom solution designed to stand on its own, optimized for brand growth and ultimate user experience.",
              img: img.src,
              onClick: (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onImageClick?.(idx, rect);
              },
            }))}
          />
        </div>
      </div>
    </section>
  );
}

export function ServiceCatalog() {
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const [activeValue, setActiveValue] = useState("service-1");

  useEffect(() => {
    const syncHashToTab = () => {
      const match = window.location.hash.match(/^#service-(\d)$/);
      if (!match) {
        return;
      }

      const nextIndex = Number(match[1]) - 1;
      if (nextIndex >= 0 && nextIndex < serviceCategories.length) {
        setActiveValue(`service-${nextIndex + 1}`);
      }
    };

    syncHashToTab();
    window.addEventListener("hashchange", syncHashToTab);

    return () => window.removeEventListener("hashchange", syncHashToTab);
  }, []);

  const tabs = useMemo<Tab[]>(
    () =>
      serviceCategories.map((category, index) => ({
        title: category.name,
        value: `service-${index + 1}`,
        content: (
          <PortfolioGallery
            title={category.name}
            archiveButton={{
              text: `View ${category.name}`,
              href: `/services/${toCategorySlug(category.name)}`,
            }}
            images={category.items.map((item) => ({
              src: serviceImageSources[item] || "/placeholder.svg",
              alt: item,
              title: item,
            }))}
            onImageClick={(imageIndex, rect) => {
              const service = category.items[imageIndex];

              if (!service) {
                return;
              }

              const targetUrl = `/services/${toCategorySlug(category.name)}/${toServiceSlug(service)}`;

              if (rect) {
                startTransition(targetUrl, {
                  src: serviceImageSources[service] || "/placeholder.svg",
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                });
              } else {
                startTransition(targetUrl);
              }
            }}
          />
        ),
      })),
    [startTransition]
  );

  return (
    <section
      id="service-catalog"
      className="scroll-mt-28 pt-20 sm:scroll-mt-32 sm:pt-28 lg:scroll-mt-36 lg:pt-36 2xl:pt-40"
    >
      <ScrollReveal
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        amount={0.24}
      >
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500">
            <span className="section-dot" />
            <span>Catalog</span>
          </div>
          <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            Structured services for every core growth layer.
          </h2>
        </div>
        <p className="max-w-lg text-[15px] leading-8 text-slate-400 sm:text-base">
          Each service area is designed to stand on its own, but the real value
          comes from how the layers work together across brand, product, and
          growth.
        </p>
      </ScrollReveal>

      <div
        id="service-catalog-tabs"
        className="relative mx-auto mt-6 md:mt-12 flex h-auto md:h-[calc(100vh+5rem)] md:min-h-[48rem] w-full max-w-7xl flex-col items-start justify-start [perspective:1000px] sm:mt-14 lg:mt-16"
      >
        <ScrollReveal
          delay={0.1}
          distance={34}
          amount={0.14}
          className="h-full w-full"
        >
          <Tabs
            tabs={tabs}
            activeValue={activeValue}
            onValueChange={(value) => {
              setActiveValue(value);
              window.history.replaceState(null, "", `#${value}`);
            }}
            contentClassName="mt-[2.8125rem] sm:mt-[3.375rem]"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}


