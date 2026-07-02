"use client";

import { CategoryHero } from "@/components/CategoryHero";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export const SOFTWARE_SERVICES: CategoryHeroService[] = [
  {
    id: "crm-erp",
    label: "CRM & ERP Solutions",
    bgImage: "/images/optimized/graphics-hero.webp",
    headline: "CRM & ERP Solutions",
    descriptor: "Custom CRM and ERP systems that bring teams, data, and workflows into one place.",
    tags: "CRM, ERP, Operations",
    mockupSrc: "/images/optimized/kobu-agency-1.webp",
    mockupPos: "absolute right-[8%] top-[22%] w-[44%] max-w-[730px]",
    mockupClassName: "h-[358px] overflow-hidden rounded-none",
    headlinePos: "absolute left-[32%] bottom-[20%] z-20",
    descriptorPos: "absolute right-[8%] bottom-[8%] z-20 max-w-[360px] text-left text-base font-medium leading-[1.45] text-white/78",
    tagsPos: "absolute left-[28%] top-[29%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/68",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "custom-software",
    label: "Custom Software",
    bgImage: "/images/optimized/adrien-olichon.webp",
    headline: "Custom Software",
    descriptor: "Purpose-built software for workflows that off-the-shelf tools cannot handle well.",
    tags: "Workflow Tools, APIs, Internal Systems",
    mockupSrc: "/images/optimized/clay-banks.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "saas",
    label: "SaaS Applications",
    bgImage: "/images/optimized/boliviainteligente.webp",
    headline: "SaaS Applications",
    descriptor: "Subscription products with clear architecture, user roles, billing, and admin control.",
    tags: "SaaS, Multi-Tenant, Billing",
    mockupSrc: "/images/optimized/rolf-van-root.webp",
    mockupPos: "absolute right-[1.25%] top-[42%] w-[25%] max-w-[480px]",
    headlinePos: "absolute left-[19%] top-[58%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[43%] top-[24%] z-20 max-w-[390px] text-left text-base font-medium leading-[1.45] text-white/82",
    tagsPos: "absolute right-[30%] bottom-[25%] z-20 text-left text-sm font-medium tracking-normal text-white/76",
    overlayClass: "absolute inset-0 bg-black/58",
    mockupClassName: "aspect-square overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
  {
    id: "enterprise",
    label: "Enterprise Solutions",
    bgImage: "/images/optimized/micke-lindstrom.webp",
    headline: "Enterprise Solutions",
    descriptor: "Secure, maintainable software foundations for teams with complex requirements.",
    tags: "Security, Permissions, Integrations",
    mockupSrc: "/images/optimized/lightsaber-collection.webp",
    mockupPos: "absolute left-[17%] top-[42%] w-[31%] max-w-[600px]",
    headlinePos: "absolute right-[8%] top-[61%] z-20 -translate-y-1/2 text-left",
    descriptorPos: "absolute left-[34%] top-[24%] z-20 max-w-[380px] text-left text-base font-medium leading-[1.45] text-white/84",
    tagsPos: "absolute left-[59.4%] bottom-[11%] z-20 text-left text-sm font-medium tracking-normal text-white/78",
    overlayClass: "absolute inset-0 bg-black/55",
    mockupClassName: "h-[460px] overflow-hidden rounded-none shadow-[0_34px_90px_rgba(0,0,0,0.42)]",
    titleSize: "text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem]",
  },
];

export function SoftwareDevShowcasePage({
  onServiceClick,
}: {
  onServiceClick?: (service: CategoryHeroService, rect: DOMRect) => void;
}) {
  return (
    <CategoryHero
      services={SOFTWARE_SERVICES}
      useThreads={true}
      onServiceClick={onServiceClick}
      defaultHeadline={"We write\nsoftware"}
      defaultDescription="Custom software solutions and enterprise applications built for scalability, performance, and business growth."
      defaultMeta="CRM & ERP · SaaS · Enterprise"
    />
  );
}
