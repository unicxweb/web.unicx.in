import React from "react";
import { HeroImmersive } from "@/components/services/blocks/HeroImmersive";
import { HorizontalScrollCarousel } from "@/components/services/blocks/HorizontalScrollCarousel";
import { BentoEcosystem } from "@/components/services/blocks/BentoEcosystem";
import { DesignPrinciples } from "@/components/services/blocks/DesignPrinciples";
import { BrandPipeline } from "@/components/services/blocks/BrandPipeline";
import { ImpactMetrics } from "@/components/services/blocks/ImpactMetrics";
import { BeforeAfter } from "@/components/services/blocks/BeforeAfter";
import { ExecutionModel } from "@/components/services/blocks/ExecutionModel";
import { TechStack } from "@/components/services/blocks/TechStack";
import { CTA } from "@/components/CTA";
import type { SelectedService } from "@/components/services/service-types";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export function GraphicDesignPage({
  activeMockupSrc,
  hideMockupUntilReady,
  selectedService,
  onServiceClick,
}: {
  activeMockupSrc?: string;
  hideMockupUntilReady?: boolean;
  selectedService?: SelectedService;
  onServiceClick?: (service: any, rect: DOMRect) => void;
}) {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <HeroImmersive
        label="Graphic Design"
        title="We build design systems that define brands and build trust."
        description="We craft refined digital experiences and visual systems for brands that need every touchpoint to feel precise, premium, and unmistakably their own."
        activeMockupSrc={activeMockupSrc}
        hideMockupUntilReady={hideMockupUntilReady}
        selectedService={selectedService}
      />

      <HorizontalScrollCarousel categorySlug="graphic-design"
        indexLabel="02 / Capabilities"
        onServiceClick={onServiceClick}
        title="Graphic Design Ecosystem"
        cards={[
          { id: "ui-ux", title: "UI/UX Design", url: "/images/optimized/faizur-rehman-pHPzdEHN6Os-unsplash.webp" },
          { id: "logo", title: "Logo Design", url: "/images/optimized/ajay-gorecha.webp" },
          { id: "marketing", title: "Marketing Creatives", url: "/images/optimized/usama-akram.webp" },
          { id: "illustration", title: "Illustration", url: "/images/optimized/balazs-ketyi-aaCuRsb7aUc-unsplash.webp" },
          { id: "motion", title: "Motion & Video", url: "/images/optimized/daan-geurts.webp" },
        ]}
      />

      <BentoEcosystem
        indexLabel="03 / Solutions"
        serviceId={selectedService?.id}
        title="Visual Systems We Build"
        cards={[
          {
            title: "UI/UX Design",
            description: "Designing intuitive digital interfaces for products that feel effortless from the first interaction.",
            colSpan: 1,
            visual: <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          },
          {
            title: "Brand Identity",
            description: "Building cohesive identity systems for brands that need to feel distinctive and ready to scale.",
            colSpan: 1,
            visual: <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          },
          {
            title: "Motion & Interaction",
            description: "Kinetic visual systems that make brand stories feel alive, memorable, and impossible to ignore.",
            colSpan: 2,
          }
        ]}
      />

      <DesignPrinciples
        indexLabel="04 / Philosophy"
        title="Design Philosophy"
        subtitle="Good design is obvious. Great design is transparent."
        principles={[
          { title: "Clarity over clutter", description: "We strip away the unnecessary so your core message and product shine." },
          { title: "Premium execution at every layer", description: "From typography to micro-interactions, we obsess over the details." },
          { title: "Design for scale", description: "We build robust design systems that grow with your company." },
          { title: "Form follows function", description: "Aesthetics must always serve usability and conversion." },
        ]}
      />

      <BrandPipeline indexLabel="05 / Pipeline" title="The Brand Ecosystem" />

      <ImpactMetrics
        title="Design Impact"
        indexLabel="06 / Impact"
        metrics={[
          { value: "3x", label: "Average Conversion Lift", color: "#34d399" },
          { value: "40%", label: "Bounce Rate Reduction", color: "#818cf8" },
          { value: "2.5x", label: "Increase in Session Duration", color: "#f472b6" },
          { value: "95%", label: "Client Satisfaction", color: "#f8fafc" },
        ]}
      />

      {(() => {
        const defaultItems = [
          { before: "Fragmented branding confusing customers", after: "Cohesive visual system that builds instant trust" },
          { before: "Generic templates hiding your value proposition", after: "Bespoke identity that commands premium pricing" },
          { before: "High bounce rates due to poor visual hierarchy", after: "Clear, intuitive layouts that guide users to convert" },
          { before: "Inconsistent assets across marketing channels", after: "Unified design language across all touchpoints" },
        ];

        const serviceSpecificItems: Record<string, { before: string; after: string }[]> = {
          "ui-ux": [
            { before: "Confusing user journeys causing user drop-offs", after: "Clean, intuitive user flows matching natural behaviors" },
            { before: "Visually cluttered interfaces hiding main actions", after: "High-contrast focal points and strict typographic hierarchy" },
            { before: "Standard designs lacking distinct brand personality", after: "Bespoke digital design systems optimized for high engagement" },
            { before: "Developer friction building complex animations", after: "Production-ready Figma files with detailed style guides and tokens" }
          ],
          logo: [
            { before: "Generic clip-art style logos easily forgotten", after: "Memorable custom vector marks communicating brand essence" },
            { before: "Broken logo scaling on small digital touchpoints", after: "Responsive logo systems optimized for favicons to large billboards" },
            { before: "Incoherent brand identity across different products", after: "Robust visual brand books outlining exact rules and shapes" },
            { before: "Colors and styling failing to reflect premium status", after: "Sophisticated editorial color palettes setting brand tone" }
          ],
          marketing: [
            { before: "Ad creatives getting ignored during fast mobile scroll", after: "Scroll-stopping high-fidelity graphics designed for clickability" },
            { before: "Inconsistent visual assets on Facebook and Google ads", after: "Unified design systems scaling creatives across all ad networks" },
            { before: "Unclear calls to action and cluttered banners", after: "Clean layouts with bold key benefits and clear button spots" },
            { before: "Slow asset turnaround times delaying campaign starts", after: "Streamlined design templates optimized for quick adjustments" }
          ],
          illustration: [
            { before: "Generic stock illustrations used by 100 other sites", after: "Bespoke custom illustrated worlds unique to your brand" },
            { before: "Flat, uninspiring corporate graphics", after: "Rich textured artwork adding premium depth and narrative" },
            { before: "Inconsistent illustration styles on different pages", after: "Comprehensive system guidelines for shapes, colors, and line widths" },
            { before: "Illustrations scaling poorly and blurring on mobile displays", after: "Clean SVG vector files optimized for razor-sharp rendering" }
          ],
          motion: [
            { before: "Static text pages failing to hold visitor focus", after: "Dynamic kinetic typography and interface animations" },
            { before: "Amateur video edits devaluing brand status", after: "Polished, cinema-grade transitions and visual effects" },
            { before: "Confusing product flow walkthroughs", after: "Simplified UI motion explainers making features clear" },
            { before: "Slow video loading times stalling page rendering", after: "Lightweight Lottie/web-optimized JSON animations" }
          ]
        };

        const activeId = selectedService?.id?.toLowerCase() || "";
        const items = serviceSpecificItems[activeId] || defaultItems;
        const title = selectedService?.label 
          ? `Legacy vs UNICX ${selectedService.label}` 
          : "Legacy vs UNICX Professional Design";

        return <BeforeAfter title={title} items={items} selectedServiceId={activeId} indexLabel="07 / Evolution" />;
      })()}

      <ExecutionModel
        title="Design Methodology"
        indexLabel="08 / Execution"
        steps={[
          { name: "Discovery & Strategy", description: "Deep dive into your brand's core values, target audience, and market positioning." },
          { name: "Concept Generation", description: "Exploring multiple visual directions to find the perfect resonance." },
          { name: "System Development", description: "Building the comprehensive design system, from typography to motion curves." },
          { name: "Refinement & Polish", description: "Iterating based on feedback to ensure every pixel serves a purpose." },
          { name: "Delivery & Guidelines", description: "Handing over final assets alongside strict usage guidelines for consistency." },
        ]}
        images={[
          "/images/optimized/hudson-hintze.webp",
          "/images/optimized/girl-with-red-hat.webp",
          "/images/optimized/ben-tofan.webp",
          "/images/optimized/jon-tyson.webp",
          "/images/optimized/nick-adams.webp",
        ]}
      />

      <TechStack
        title="Design Stack"
        indexLabel="09 / Technologies"
        stack={[
          { name: "Figma", iconUrl: "https://api.iconify.design/logos/figma.svg" },
          { name: "Adobe Illustrator", iconUrl: "https://api.iconify.design/logos/adobe-illustrator.svg" },
          { name: "Adobe Photoshop", iconUrl: "https://api.iconify.design/logos/adobe-photoshop.svg" },
          { name: "After Effects", iconUrl: "https://api.iconify.design/logos/adobe-after-effects.svg" },
          { name: "Spline", iconUrl: "https://www.google.com/s2/favicons?domain=spline.design&sz=128" },
          { name: "Webflow", iconUrl: "https://api.iconify.design/logos/webflow.svg" }
        ]}
      />

      <CTA />
    </div>
  );
}
