"use client";

import { CategoryHero } from "@/components/CategoryHero";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export const WEBSITE_SERVICES: CategoryHeroService[] = [
  {
    id: "business",
    label: "Business Websites",
    bgImage: "/images/optimized/web-dev-bg-business.webp",
    headline: "Business Websites",
    descriptor: "High-clarity websites for businesses that need credibility, speed, and conversion.",
    tags: "Corporate Sites, Service Pages, Brand Systems",
    mockupSrc: "/images/optimized/web-dev-business-mockup.webp",
    mockupPos: "absolute right-[8%] top-[22%] w-[44%] max-w-[730px]",
    mockupClassName: "h-[358px] overflow-hidden rounded-none",
    headlinePos: "absolute left-[32%] bottom-[20%] z-20",
    descriptorPos: "absolute right-[8%] bottom-[8%] z-20 max-w-[360px] text-left text-base font-medium leading-[1.45] text-white/78",
    tagsPos: "absolute left-[28%] top-[29%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/68",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "ecommerce",
    label: "Ecommerce Websites",
    bgImage: "/images/optimized/web-dev-bg-ecommerce.webp",
    headline: "Ecommerce Websites",
    descriptor: "Sharp storefronts built around product discovery, checkout clarity, and repeat buying.",
    tags: "Shopify, Custom Commerce, Conversion UX",
    mockupSrc: "/images/optimized/the-blowup.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "landing",
    label: "Landing Pages",
    bgImage: "/images/optimized/web-dev-bg-landing.webp",
    headline: "Landing Pages",
    descriptor: "Focused campaign pages with clear offers, tight messaging, and measurable outcomes.",
    tags: "Lead Gen, Campaign Pages, A/B Testing",
    mockupSrc: "/images/optimized/team-nocoloco.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "platform",
    label: "Custom Web Solutions",
    bgImage: "/images/optimized/web-dev-bg-platform.webp",
    headline: "Custom Web Solutions",
    descriptor: "Dynamic platforms, portals, and dashboards designed for real business workflows.",
    tags: "Dashboards, Portals, Web Apps",
    mockupSrc: "/images/optimized/vy-tran.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "seo",
    label: "Performance & SEO",
    bgImage: "/images/optimized/web-dev-bg-seo.webp",
    headline: "Performance & SEO",
    descriptor: "Technical foundations for fast loading, clean indexing, and long-term visibility.",
    tags: "Core Web Vitals, Technical SEO, Accessibility",
    mockupSrc: "/images/optimized/lukas-muller.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
];

export function WebsiteDevShowcasePage({
  onServiceClick,
}: {
  onServiceClick?: (service: CategoryHeroService, rect: DOMRect) => void;
}) {
  return (
    <CategoryHero
      services={WEBSITE_SERVICES}
      usePrismaticBurst={true}
      onServiceClick={onServiceClick}
      defaultHeadline={"We build\nwebsites"}
      defaultDescription="We build digital experiences that rank higher, load faster, and convert better. From corporate platforms to high-performance e-commerce."
      defaultMeta="Corporate Sites · Ecommerce · Custom Web Solutions"
    />
  );
}
