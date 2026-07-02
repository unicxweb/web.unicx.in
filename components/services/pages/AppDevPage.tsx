import React from "react";
import { HeroImmersive } from "@/components/services/blocks/HeroImmersive";
import { HorizontalScrollCarousel } from "@/components/services/blocks/HorizontalScrollCarousel";
import { BentoEcosystem } from "@/components/services/blocks/BentoEcosystem";
import { AppDeviceVisualizer } from "@/components/services/blocks/AppDeviceVisualizer";
import { DesignPrinciples } from "@/components/services/blocks/DesignPrinciples";
import { ImpactMetrics } from "@/components/services/blocks/ImpactMetrics";
import { BeforeAfter } from "@/components/services/blocks/BeforeAfter";
import { ExecutionModel } from "@/components/services/blocks/ExecutionModel";
import { TechStack } from "@/components/services/blocks/TechStack";
import { CTA } from "@/components/CTA";
import type { SelectedService } from "@/components/services/service-types";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export function AppDevPage({
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
        label="App Development"
        title="Mobile experiences built for engagement, retention, and growth."
        description="We build native and cross-platform mobile products that people actually want to use. We don't just write code; we design connected business systems."
        activeMockupSrc={activeMockupSrc}
        hideMockupUntilReady={hideMockupUntilReady}
        selectedService={selectedService}
      />

      <HorizontalScrollCarousel categorySlug="app-development"
        indexLabel="02 / Capabilities"
        onServiceClick={onServiceClick}
        title="App Development Ecosystem"
        cards={[
          { id: "android", title: "Android Apps", url: "/images/optimized/kelly-sikkema.webp" },
          { id: "ios", title: "iOS Apps", url: "/images/optimized/mariia-shalabaieva.webp" },
          { id: "hybrid", title: "Hybrid Apps", url: "/images/optimized/kelly-sikkema-2.webp" },
          { id: "pwa", title: "Progressive Web Apps", url: "/images/optimized/coinstash-australia.webp" },
          { id: "product-design", title: "Product Prototypes", url: "/images/optimized/mayank-girdhar.webp" },
        ]}
      />

      <BentoEcosystem
        indexLabel="03 / Solutions"
        serviceId={selectedService?.id}
        title="Product Experiences We Build"
        cards={[
          {
            title: "Customer Apps",
            description: "Direct-to-consumer mobile applications focused on onboarding, retention, and seamless UX.",
            colSpan: 1,
            visual: <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
          },
          {
            title: "Business Apps",
            description: "B2B tools designed to streamline operations, data collection, and field service management.",
            colSpan: 1,
            visual: <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          },
          {
            title: "Ecommerce & SaaS Apps",
            description: "High-performance digital storefronts and subscription platforms with native payment integrations.",
            colSpan: 2,
          }
        ]}
      />

      <DesignPrinciples
        indexLabel="04 / Philosophy"
        title="Product Principles"
        subtitle="We build digital products people actually use. This is our philosophy."
        principles={[
          { title: "Retention over downloads", description: "Acquisition is useless if users churn on day one. We design for habit loops." },
          { title: "Native feel over hacks", description: "Whether Swift, Kotlin, or React Native, it must feel buttery smooth and platform-native." },
          { title: "Engagement over features", description: "Less but better. We cut bloated features to focus on core user value." },
          { title: "Business systems over screens", description: "An app is just the front-end of a complex backend, analytics, and CRM ecosystem." },
        ]}
      />

      <AppDeviceVisualizer indexLabel="05 / Architecture" title="The Mobile Ecosystem" />

      <ImpactMetrics
        title="App Success Metrics"
        indexLabel="06 / Impact"
        metrics={[
          { value: "Adopt", label: "User Adoption", color: "#f8fafc" },
          { value: "Retain", label: "Retention Rate", color: "#818cf8" },
          { value: "Engage", label: "Session Time", color: "#f472b6" },
          { value: "Scale", label: "Active Engagement", color: "#34d399" },
        ]}
      />

      {(() => {
        const defaultItems = [
          { before: "High churn rate & uninstalls", after: "Strong daily active usage (DAU)" },
          { before: "Sluggish, generic hybrid feel", after: "Buttery smooth, native interactions" },
          { before: "Disconnected from backend data", after: "Real-time sync with CRM & analytics" },
          { before: "Confusing onboarding flow", after: "Frictionless time-to-value" },
        ];

        const serviceSpecificItems: Record<string, { before: string; after: string }[]> = {
          ios: [
            { before: "Violating Apple HIG rules leading to rejection", after: "100% compliant Swift flows ready for App Store approval" },
            { before: "Laggy frame rendering on ProMotion displays", after: "Silky smooth native performance locked at 120Hz" },
            { before: "Poor battery utilization and leaks", after: "Highly optimized memory and thread handling" },
            { before: "Outdated design lacking premium iOS feel", after: "Modern Apple-grade minimalist visual language" },
          ],
          android: [
            { before: "Layout breaks across diverse Android screens", after: "Flexible UI tested across 100+ OEM screen sizes" },
            { before: "Bloated APK file size leading to download drops", after: "Optimized app bundle size using modern compiler assets" },
            { before: "Missing Android-native UI patterns", after: "Clean Material Design layout that feels natural on Android" },
            { before: "Poor memory management causing background crashes", after: "Robust lifecycle and background task optimization" },
          ],
          hybrid: [
            { before: "Two codebases to maintain with different features", after: "Single unified codebase using React Native or Flutter" },
            { before: "Slow startup and heavy bridge latency", after: "Engineered JSI bridge links for native-speed rendering" },
            { before: "Inconsistent UI between iOS and Android", after: "Polished multi-platform UI with pixel-perfect uniformity" },
            { before: "Fragile integration with device native sensors", after: "Direct hardware hook integrations for cameras and GPS" },
          ],
          pwa: [
            { before: "High friction App Store download requirements", after: "Instant installable web app via a single link share" },
            { before: "No offline access or broken caches on reload", after: "Service workers offline support & robust caching strategies" },
            { before: "No way to re-engage users outside the site", after: "Secure push notifications directly to user home screens" },
            { before: "Mobile browsers hiding desktop layout elements", after: "Fluid, lightweight, responsive application interface" },
          ],
          "product-design": [
            { before: "Spending $100K+ coding a product before validation", after: "Clickable prototype to test with real users in weeks" },
            { before: "Unclear user flows and confusing product scope", after: "Rigorous high-fidelity UX maps and MVP definitions" },
            { before: "Investor pitches using text slides and static mockups", after: "Dynamic interactive demo that proves product viability" },
            { before: "Endless scope creep stalling development", after: "Highly defined visual blueprint preventing redundant builds" },
          ]
        };

        const activeId = selectedService?.id?.toLowerCase() || "";
        const items = serviceSpecificItems[activeId] || defaultItems;
        const title = selectedService?.label 
          ? `Legacy vs UNICX ${selectedService.label}` 
          : "Legacy vs UNICX Architecture";

        return <BeforeAfter title={title} items={items} selectedServiceId={activeId} indexLabel="07 / Evolution" />;
      })()}

      <ExecutionModel
        title="Development Lifecycle"
        indexLabel="08 / Execution"
        steps={[
          { name: "Research & Strategy", description: "Defining core features for MVP vs V1 vs V2 based on user needs." },
          { name: "Wireframes & Prototyping", description: "Interactive device mockups to test usability before writing code." },
          { name: "UI/UX Design", description: "High-fidelity interface design adhering to Apple HIG and Google Material guidelines." },
          { name: "Development", description: "Frontend UI integration with scalable, secure backend APIs." },
          { name: "Testing", description: "Rigorous QA across multiple devices, screen sizes, and OS versions." },
          { name: "App Store Launch", description: "Navigating Apple/Google review processes and ASO (App Store Optimization)." },
        ]}
        images={[
          "/images/optimized/martin-adams.webp",
          "/images/optimized/faizur-rehman.webp",
          "/images/optimized/vince-picipo.webp",
          "/images/optimized/tai-bui.webp",
          "/images/optimized/sajad-nori.webp",
          "/images/optimized/tran-mau-tri-tam.webp",
        ]}
      />

      <TechStack
        title="Technology Ecosystem"
        indexLabel="09 / Technologies"
        stack={[
          { name: "Flutter", iconUrl: "https://cdn.simpleicons.org/flutter/02569B" },
          { name: "React Native", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
          { name: "Android", iconUrl: "https://cdn.simpleicons.org/android/3DDC84" },
          { name: "Apple", iconUrl: "https://cdn.simpleicons.org/apple/FFFFFF" },
          { name: "Firebase", iconUrl: "https://cdn.simpleicons.org/firebase/FFCA28" },
          { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
          { name: "Google Cloud", iconUrl: "https://cdn.simpleicons.org/googlecloud/4285F4" }
        ]}
      />

      <CTA />
    </div>
  );
}
