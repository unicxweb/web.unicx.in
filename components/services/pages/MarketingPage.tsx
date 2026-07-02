import React from "react";
import { HeroImmersive } from "@/components/services/blocks/HeroImmersive";
import { HorizontalScrollCarousel } from "@/components/services/blocks/HorizontalScrollCarousel";
import { BentoEcosystem } from "@/components/services/blocks/BentoEcosystem";
import { DesignPrinciples } from "@/components/services/blocks/DesignPrinciples";
import { MarketingFunnelVisualizer } from "@/components/services/blocks/MarketingFunnelVisualizer";
import { ImpactMetrics } from "@/components/services/blocks/ImpactMetrics";
import { BeforeAfter } from "@/components/services/blocks/BeforeAfter";
import { ExecutionModel } from "@/components/services/blocks/ExecutionModel";
import { TechStack } from "@/components/services/blocks/TechStack";
import { CTA } from "@/components/CTA";
import type { SelectedService } from "@/components/services/service-types";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export function MarketingPage({
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
        label="Marketing"
        title="Visibility. Demand. Conversion. Growth."
        description="Built as a connected system, not isolated campaigns. We engineer growth infrastructure that acquires, converts, and retains high-value customers."
        activeMockupSrc={activeMockupSrc}
        hideMockupUntilReady={hideMockupUntilReady}
        selectedService={selectedService}
      />

      <HorizontalScrollCarousel categorySlug="marketing"
        indexLabel="02 / Capabilities"
        onServiceClick={onServiceClick}
        title="Marketing Ecosystem"
        cards={[
          { id: "on-page-seo", title: "On-Page SEO", url: "/images/optimized/afif-ramdhasuma.webp" },
          { id: "technical-seo", title: "Technical SEO", url: "/images/optimized/zbra-marketing.webp" },
          { id: "social", title: "Social Media Marketing", url: "/images/optimized/igor-omilaev.webp" },
          { id: "paid-ads", title: "Paid Advertising", url: "/images/optimized/rumman-amin.webp" },
          { id: "analytics", title: "Analytics & Reporting", url: "/images/optimized/1981-digital.webp" },
        ]}
      />

      <BentoEcosystem
        indexLabel="03 / Solutions"
        serviceId={selectedService?.id}
        title="Growth Channels"
        cards={[
          {
            title: "Organic Search (SEO)",
            description: "Technical, On-Page, and Off-Page architectures that capture high-intent traffic.",
            colSpan: 1,
            visual: <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          },
          {
            title: "Paid Acquisition",
            description: "Data-driven Meta, Google, and LinkedIn campaigns optimized for ROAS, not just clicks.",
            colSpan: 1,
            visual: <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" />
          },
          {
            title: "Content Marketing",
            description: "High-value editorial content that builds authority and nurtures prospects over time.",
            colSpan: 1,
          },
          {
            title: "Retention & Reactivation",
            description: "Lifecycle email marketing, SMS flows, and retargeting loops to maximize lifetime value.",
            colSpan: 1,
          }
        ]}
      />

      <DesignPrinciples
        title="Growth Principles"
        subtitle="Marketing is not magic; it's math and psychology. Here is our strategic approach."
        principles={[
          { title: "Systems over random acts of marketing", description: "Traffic is useless without a conversion mechanism. We build end-to-end funnels." },
          { title: "Data over opinions", description: "Every decision is backed by analytics, heatmaps, and clear attribution modeling." },
          { title: "LTV over cheap clicks", description: "We focus on acquiring high-value customers that stay, rather than vanity metrics." },
          { title: "Continuous optimization over 'set and forget'", description: "Campaigns decay. We constantly test creatives, copy, and audience segments to maintain ROAS." },
        ]}
      />

      <MarketingFunnelVisualizer title="The Optimization Loop" />

      <ImpactMetrics
        title="Measurement & Intelligence"
        indexLabel="06 / Impact"
        metrics={[
          { value: "CAC", label: "Acquisition Cost", color: "#f8fafc" },
          { value: "ROAS", label: "Return on Ad Spend", color: "#818cf8" },
          { value: "LTV", label: "Lifetime Value", color: "#f472b6" },
          { value: "CVR", label: "Conversion Rate", color: "#34d399" },
        ]}
      />

      {(() => {
        const defaultItems = [
          { before: "Buying clicks with no clear ROI tracking", after: "Clear attribution and measured Return on Ad Spend" },
          { before: "Traffic bounces without converting", after: "Optimized funnels capturing leads and sales" },
          { before: "Guessing what creatives work", after: "Data-driven A/B testing framework" },
          { before: "Customers buy once and leave", after: "Automated retention loops driving lifetime value" },
        ];

        const serviceSpecificItems: Record<string, { before: string; after: string }[]> = {
          "on-page-seo": [
            { before: "Low-quality thin content failing to rank in Google search", after: "High-authority topic hubs answering user search intent precisely" },
            { before: "Outdated metadata causing low click-through rates (CTR)", after: "High-conversion title tags and descriptive search snippets" },
            { before: "Confusing website hierarchy diluting keyword authority", after: "Clean internal linking structures distributing pagerank correctly" },
            { before: "High exit rates due to lack of descriptive content flows", after: "Engaging reading viewports prompting users to click CTAs" }
          ],
          "technical-seo": [
            { before: "Search engines failing to index or discover deep pages", after: "100% crawl budget optimization and structured sitemaps" },
            { before: "Slow page load times dropping mobile organic traffic", after: "Optimized Core Web Vitals resulting in search ranking lifts" },
            { before: "Duplicate content issues and missing canonical tags", after: "Rigorous URL structure audits and programmatic redirects" },
            { before: "Missing schema markup limiting rich search snippet listings", after: "Rich JSON-LD schemas displaying reviews and FAQs directly in search" }
          ],
          social: [
            { before: "Irregular random posts failing to build community", after: "Native platform content systems driving brand authority and engagement" },
            { before: "Vanity metrics like followers with zero site traffic", after: "Qualified lead generation funnels linked from social bios" },
            { before: "Low reach due to standard stock photos and corporate text", after: "High-contrast scroll-stopping ad creatives and short-form videos" },
            { before: "Disconnected channels using inconsistent brand tones", after: "Unified visual design language across all social platforms" }
          ],
          "paid-ads": [
            { before: "Wasting budget buying blind clicks with low attribution", after: "Highly targeted custom intent audiences and clear ROAS tracing" },
            { before: "Ad fatigue causing client acquisition costs to surge", after: "Weekly creative A/B testing loops refreshing ad collateral" },
            { before: "Sending paid traffic directly to homepages", after: "Frictionless, high-conversion landing pages matching search queries" },
            { before: "Losing interested visitors due to missing retargeting paths", after: "Segmented email and cookie retargeting loops capturing warm leads" }
          ],
          analytics: [
            { before: "Guessing campaign performance using inaccurate analytics data", after: "Fully verified GA4 configurations tracking custom user events" },
            { before: "No clear visibility on conversion attribution paths", after: "Advanced multi-touch attribution reports tracing traffic paths" },
            { before: "Unreadable data tables hidden in complex consoles", after: "Elegant, customized Looker Studio executive reports" },
            { before: "Siloed advertising dashboards that block strategic pivots", after: "Unified tracking systems pulling data from Meta, Google, and CRMs" }
          ]
        };

        const activeId = selectedService?.id?.toLowerCase() || "";
        const items = serviceSpecificItems[activeId] || defaultItems;
        const title = selectedService?.label 
          ? `Legacy vs UNICX ${selectedService.label}` 
          : "Legacy vs UNICX Growth Systems";

        return <BeforeAfter title={title} items={items} selectedServiceId={activeId} indexLabel="07 / Evolution" />;
      })()}

      <ExecutionModel
        title="Campaign Execution"
        indexLabel="08 / Execution"
        steps={[
          { name: "Research & Audit", description: "Analyzing current performance, competitive gaps, and audience behavior." },
          { name: "Strategic Planning", description: "Defining budgets, channel selection, and core messaging pillars." },
          { name: "Asset Creation", description: "Designing ad creatives, writing copy, and building landing pages." },
          { name: "Launch & Measurement", description: "Deploying campaigns with proper tracking and attribution models." },
          { name: "Optimization", description: "Reallocating budget to top-performing segments and testing new creatives." }
        ]}
        images={[
          "/images/optimized/harshit-suryawanshi.webp",
          "/images/optimized/alvaro-reyes.webp",
          "/images/optimized/milad-fakurian.webp",
          "/images/optimized/sharad-bhat.webp",
          "/images/optimized/austin-distel.webp",
        ]}
      />

      <TechStack
        title="Marketing Stack"
        indexLabel="09 / Technologies"
        stack={[
          { name: "Google Analytics", iconUrl: "https://cdn.simpleicons.org/googleanalytics/E37400" },
          { name: "Meta Ads", iconUrl: "https://cdn.simpleicons.org/meta/0668E1" },
          { name: "Google Ads", iconUrl: "https://cdn.simpleicons.org/googleads/4285F4" },
          { name: "SEMrush", iconUrl: "https://cdn.simpleicons.org/semrush/FF642D" },
          { name: "HubSpot", iconUrl: "https://cdn.simpleicons.org/hubspot/FF7A59" },
          { name: "Klaviyo", iconUrl: "https://www.google.com/s2/favicons?domain=klaviyo.com&sz=128" },
          { name: "Ahrefs", iconUrl: "https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128" }
        ]}
      />

      <CTA />
    </div>
  );
}
