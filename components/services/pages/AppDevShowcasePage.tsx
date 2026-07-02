"use client";

import { CategoryHero } from "@/components/CategoryHero";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export const APP_SERVICES: CategoryHeroService[] = [
  {
    id: "android",
    label: "Android Apps",
    bgImage: "/images/optimized/boliviainteligente.webp",
    headline: "Android Apps",
    descriptor: "Native Android experiences designed for speed, reliability, and everyday use.",
    tags: "Kotlin, Native UX, Play Store",
    mockupSrc: "/images/optimized/kelly-sikkema.webp",
    mockupPos: "absolute right-[8%] top-[22%] w-[44%] max-w-[730px]",
    mockupClassName: "h-[358px] overflow-hidden rounded-none",
    headlinePos: "absolute left-[32%] bottom-[20%] z-20",
    descriptorPos: "absolute right-[8%] bottom-[8%] z-20 max-w-[360px] text-left text-base font-medium leading-[1.45] text-white/78",
    tagsPos: "absolute left-[28%] top-[29%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/68",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "ios",
    label: "iOS Apps",
    bgImage: "/images/optimized/tareq-ajalyakin.webp",
    headline: "iOS Apps",
    descriptor: "Polished Apple-native products with clean flows and high-trust interaction patterns.",
    tags: "Swift, Apple HIG, App Store",
    mockupSrc: "/images/optimized/mariia-shalabaieva.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "hybrid",
    label: "Hybrid Apps",
    bgImage: "/images/optimized/micke-lindstrom.webp",
    headline: "Hybrid Apps",
    descriptor: "Shared-code mobile products built to move quickly without losing product quality.",
    tags: "React Native, Flutter, Shared Systems",
    mockupSrc: "/images/optimized/kelly-sikkema-2.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "pwa",
    label: "Progressive Web Apps",
    bgImage: "/images/optimized/adrien-olichon.webp",
    headline: "Progressive Web Apps",
    descriptor: "Installable, fast, resilient app experiences for teams that need reach and speed.",
    tags: "Offline Support, Push, Installable UX",
    mockupSrc: "/images/optimized/coinstash-australia.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "product-design",
    label: "Product Prototypes",
    bgImage: "/images/optimized/joanna-kosinska.webp",
    headline: "Product Prototypes",
    descriptor: "Clickable prototypes and MVP flows that validate the product before heavy build cycles.",
    tags: "MVP, Prototyping, User Flows",
    mockupSrc: "/images/optimized/mayank-girdhar.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
];

export function AppDevShowcasePage({
  onServiceClick,
}: {
  onServiceClick?: (service: CategoryHeroService, rect: DOMRect) => void;
}) {
  return (
    <CategoryHero
      services={APP_SERVICES}
      useLiquidChrome={true}
      onServiceClick={onServiceClick}
      defaultHeadline={"We build\napps"}
      defaultDescription="Mobile-first product development across native and hybrid experiences with strong usability foundations."
      defaultMeta="iOS · Android · Hybrid · PWAs"
    />
  );
}
