import React from "react";
import { HeroImmersive } from "@/components/services/blocks/HeroImmersive";
import { HorizontalScrollCarousel } from "@/components/services/blocks/HorizontalScrollCarousel";
import { BentoEcosystem } from "@/components/services/blocks/BentoEcosystem";
import { DesignPrinciples } from "@/components/services/blocks/DesignPrinciples";
import { ImpactMetrics } from "@/components/services/blocks/ImpactMetrics";
import { BeforeAfter } from "@/components/services/blocks/BeforeAfter";
import { ExecutionModel } from "@/components/services/blocks/ExecutionModel";
import { TechStack } from "@/components/services/blocks/TechStack";
import { ArchitectureVisualizer } from "@/components/services/blocks/ArchitectureVisualizer";
import { CTA } from "@/components/CTA";
import type { SelectedService } from "@/components/services/service-types";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export function WebsiteDevPage({
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
        label="Website Development"
        title="Premium websites engineered for trust, performance, and measurable growth."
        description="We build digital experiences that rank higher, load faster, and convert better. From corporate platforms to high-performance e-commerce."
        activeMockupSrc={activeMockupSrc}
        hideMockupUntilReady={hideMockupUntilReady}
        selectedService={selectedService}
      />

      <HorizontalScrollCarousel categorySlug="website-development"
        indexLabel="02 / Capabilities"
        onServiceClick={onServiceClick}
        title="Website Development Ecosystem"
        cards={[
          { id: "business", title: "Business Websites", url: "/images/optimized/web-dev-bg-business.webp" },
          { id: "ecommerce", title: "Ecommerce Websites", url: "/images/optimized/the-blowup.webp" },
          { id: "landing", title: "Landing Pages", url: "/images/optimized/team-nocoloco.webp" },
          { id: "platform", title: "Custom Web Solutions", url: "/images/optimized/vy-tran.webp" },
          { id: "seo", title: "Performance & SEO", url: "/images/optimized/lukas-muller.webp" },
        ]}
      />

      <BentoEcosystem
        indexLabel="03 / Solutions"
        serviceId={selectedService?.id}
        title="Website Types We Build"
        cards={[
          {
            title: "Business Websites",
            description: "High-trust architectures designed for B2B enterprises and professional services.",
            colSpan: 1,
            visual: <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          },
          {
            title: "Ecommerce Stores",
            description: "High-converting storefronts optimized to maximize average order value.",
            colSpan: 1,
            visual: <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          },
          {
            title: "Custom Platforms",
            description: "Bespoke web applications with custom functionality, portals, and dynamic dashboards.",
            colSpan: 2,
          }
        ]}
      />

      <DesignPrinciples
        indexLabel="04 / Philosophy"
        title="Engineering Principles"
        subtitle="An effective website is more than just code. It is a calculated digital asset."
        principles={[
          { title: "Performance over bloat", description: "Lightning-fast load times using strict performance budgets and modern CDNs." },
          { title: "Conversion over aesthetics", description: "Design serves the business goal. We prioritize clear UX over flashy, confusing layouts." },
          { title: "Scalability over quick fixes", description: "We engineer modular component architectures that grow with your company." },
          { title: "SEO foundational infrastructure", description: "Search visibility is baked into the code, not added as an afterthought." },
        ]}
      />

      <ArchitectureVisualizer indexLabel="05 / Architecture" title="Experience Architecture" />

      <ImpactMetrics
        title="Performance Framework"
        indexLabel="06 / Impact"
        metrics={[
          { value: "100", label: "Lighthouse Score", color: "#34d399" },
          { value: "<1s", label: "Load Time", color: "#f8fafc" },
          { value: "A11y", label: "Accessibility", color: "#60a5fa" },
          { value: "SEO", label: "Technical Setup", color: "#f472b6" },
        ]}
      />

      {(() => {
        const defaultItems = [
          { before: "Slow load times & high bounce rate", after: "Sub-second delivery & high retention" },
          { before: "Generic templates hiding your brand", after: "Bespoke positioning that builds trust" },
          { before: "Poor mobile responsiveness", after: "Fluid, device-agnostic layouts" },
          { before: "Invisible to search engines", after: "Technically optimized for indexing" },
        ];

        const serviceSpecificItems: Record<string, { before: string; after: string }[]> = {
          business: [
            { before: "Outdated template failing to represent brand status", after: "High-contrast editorial custom design mirroring market leadership" },
            { before: "Clunky CMS setups that block marketing updates", after: "Sanity/Contentful headless setup for zero-code team editing" },
            { before: "Missing lead tracking and conversion pathways", after: "Integrated Hubspot/Salesforce lead capturing workflows" },
            { before: "Slow loading speeds causing corporate lead drops", after: "Sub-second serverless static pre-rendering on Edge CDN" }
          ],
          ecommerce: [
            { before: "Multi-page checkout drop-offs losing 70% of carts", after: "Headless Shopify checkout with 1-click Apple/Google Pay loops" },
            { before: "Slow product catalogs failing under heavy ad traffic", after: "Static-site commerce catalog delivering instantaneous page loads" },
            { before: "Poor mobile shopping UI creating shopping friction", after: "Mobile-first tactile navigation engineered for thumb reach" },
            { before: "Broken inventory sync across channels and ERP", after: "Robust background event queues keeping ERP and Shopify in real-time sync" }
          ],
          landing: [
            { before: "Generic landing pages with massive bounce rates", after: "Hyper-focused, single-offer layout maximizing message match" },
            { before: "Blind testing of layout creatives on ads", after: "Integrated Vercel A/B testing infrastructure running live experiments" },
            { before: "Slow load times causing paid click waste", after: "Ultra-lean, code-split Tailwind layouts loading in under 0.4s" },
            { before: "Confusing CTA alignment and layout clutter", after: "Strict visual reading paths directing gaze directly to form fields" }
          ],
          platform: [
            { before: "Legacy custom codebases hard to scale and maintain", after: "Modern modular TypeScript monolith or serverless architecture" },
            { before: "Confusing dashboard flows increasing operational steps", after: "Pristine Apple-style clean layout simplifying workflows to 2 clicks" },
            { before: "Vulnerable systems prone to data breaches and leaks", after: "Ironclad OAuth2 auth, MFA controls, and strict sanitization rules" },
            { before: "Slow queries locking database threads on heavy loads", after: "Highly optimized indexes and memory caching layers (Redis)" }
          ],
          seo: [
            { before: "Failing Lighthouse core web vitals and speed tests", after: "100% green-score Lighthouse metrics with optimized FCP and LCP" },
            { before: "Broken semantic outlines hiding pages from bots", after: "Structured JSON-LD schemas and descriptive HTML5 markup" },
            { before: "Indexation drops due to crawl errors and bad routes", after: "Systematic redirect maps, active sitemaps, and crawl optimization" },
            { before: "Missing accessibility standards risking legal audits", after: "Full WCAG 2.1 compliance with optimized screen reader labels" }
          ]
        };

        const activeId = selectedService?.id?.toLowerCase() || "";
        const items = serviceSpecificItems[activeId] || defaultItems;
        const title = selectedService?.label 
          ? `Legacy vs UNICX ${selectedService.label}` 
          : "Legacy vs UNICX Engineering";

        return <BeforeAfter title={title} items={items} selectedServiceId={activeId} indexLabel="07 / Evolution" />;
      })()}

      <ExecutionModel
        title="Development Workflow"
        indexLabel="08 / Execution"
        steps={[
          { name: "Discovery", description: "Deep dive into your business goals, target audience, and competitive landscape." },
          { name: "Architecture", description: "Information architecture mapping and technical stack selection." },
          { name: "Design", description: "High-fidelity UI design, interaction design, and visual prototyping." },
          { name: "Development", description: "Frontend and backend engineering with rigorous code reviews." },
          { name: "QA & Launch", description: "Cross-browser testing, SEO migration, and seamless deployment." },
        ]}
        images={[
          "/images/optimized/mario-verduzco.webp",
          "/images/optimized/vino-li.webp",
          "/images/optimized/tran-mau-tri-tam-1.webp",
          "/images/optimized/becomes-co.webp",
          "/images/optimized/shutter-speed.webp",
        ]}
      />

      <TechStack
        title="Technology Ecosystem"
        indexLabel="09 / Technologies"
        stack={[
          { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
          { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
          { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
          { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
          { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
          { name: "Vercel", iconUrl: "https://cdn.simpleicons.org/vercel/FFFFFF" },
          { name: "AWS", iconUrl: "https://api.iconify.design/logos:aws.svg" },
          { name: "Google Analytics", iconUrl: "https://cdn.simpleicons.org/googleanalytics/E37400" }
        ]}
      />

      <CTA />
    </div>
  );
}
