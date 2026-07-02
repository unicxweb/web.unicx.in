"use client";

import { CategoryHero } from "@/components/CategoryHero";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export const MARKETING_SERVICES: CategoryHeroService[] = [
  {
    id: "on-page-seo",
    label: "On-Page SEO",
    bgImage: "/images/optimized/joanna-kosinska.webp",
    headline: "On-Page SEO",
    descriptor: "Content structure, metadata, and page quality tuned for visibility and conversion.",
    tags: "Content SEO, Metadata, Internal Linking",
    mockupSrc: "/images/optimized/afif-ramdhasuma.webp",
    mockupPos: "absolute right-[8%] top-[22%] w-[44%] max-w-[730px]",
    mockupClassName: "h-[358px] overflow-hidden rounded-none",
    headlinePos: "absolute left-[32%] bottom-[20%] z-20",
    descriptorPos: "absolute right-[8%] bottom-[8%] z-20 max-w-[360px] text-left text-base font-medium leading-[1.45] text-white/78",
    tagsPos: "absolute left-[28%] top-[29%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/68",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "technical-seo",
    label: "Technical SEO",
    bgImage: "/images/optimized/adrien-olichon.webp",
    headline: "Technical SEO",
    descriptor: "Crawlability, speed, schema, and site health improvements for durable search growth.",
    tags: "Schema, Indexing, Core Web Vitals",
    mockupSrc: "/images/optimized/zbra-marketing.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "social",
    label: "Social Media Marketing",
    bgImage: "/images/optimized/tri-d.webp",
    headline: "Social Media Marketing",
    descriptor: "Platform-native content systems that build recognition, trust, and qualified demand.",
    tags: "Instagram, LinkedIn, Content Systems",
    mockupSrc: "/images/optimized/igor-omilaev.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "paid-ads",
    label: "Paid Advertising",
    bgImage: "/images/optimized/tareq-ajalyakin.webp",
    headline: "Paid Advertising",
    descriptor: "Paid campaigns built with creative testing, clean funnels, and measurable acquisition.",
    tags: "Google Ads, Meta Ads, Retargeting",
    mockupSrc: "/images/optimized/rumman-amin.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "analytics",
    label: "Analytics & Reporting",
    bgImage: "/images/optimized/micke-lindstrom.webp",
    headline: "Analytics & Reporting",
    descriptor: "Dashboards and reporting loops that turn campaign activity into clearer decisions.",
    tags: "GA4, Dashboards, Attribution",
    mockupSrc: "/images/optimized/1981-digital.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
];

export function MarketingShowcasePage({
  onServiceClick,
}: {
  onServiceClick?: (service: CategoryHeroService, rect: DOMRect) => void;
}) {
  return (
    <CategoryHero
      services={MARKETING_SERVICES}
      useGradientBlinds={true}
      onServiceClick={onServiceClick}
      defaultHeadline={"We drive\ngrowth"}
      defaultDescription="Organic and paid growth execution designed to increase visibility, demand, and conversion quality."
      defaultMeta="SEO · Paid Advertising · Social Media"
    />
  );
}
