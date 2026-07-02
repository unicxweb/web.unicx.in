import React from "react";
import { HeroImmersive } from "@/components/services/blocks/HeroImmersive";
import { HorizontalScrollCarousel } from "@/components/services/blocks/HorizontalScrollCarousel";
import { BentoEcosystem } from "@/components/services/blocks/BentoEcosystem";
import { SoftwareSystemVisualizer } from "@/components/services/blocks/SoftwareSystemVisualizer";
import { DesignPrinciples } from "@/components/services/blocks/DesignPrinciples";
import { ImpactMetrics } from "@/components/services/blocks/ImpactMetrics";
import { BeforeAfter } from "@/components/services/blocks/BeforeAfter";
import { ExecutionModel } from "@/components/services/blocks/ExecutionModel";
import { TechStack } from "@/components/services/blocks/TechStack";
import { CTA } from "@/components/CTA";
import type { SelectedService } from "@/components/services/service-types";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export function SoftwareDevPage({
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
        label="Software Development"
        title="Business systems engineered for efficiency, scalability, and operational control."
        description="We build enterprise-grade software infrastructure, connecting your data, workflows, and operations into a single cohesive ecosystem."
        activeMockupSrc={activeMockupSrc}
        hideMockupUntilReady={hideMockupUntilReady}
        selectedService={selectedService}
      />

      <HorizontalScrollCarousel categorySlug="software-development"
        indexLabel="02 / Capabilities"
        onServiceClick={onServiceClick}
        title="Software Development Ecosystem"
        cards={[
          { id: "crm-erp", title: "CRM & ERP Solutions", url: "/images/optimized/kobu-agency-1.webp" },
          { id: "custom-software", title: "Custom Software", url: "/images/optimized/clay-banks.webp" },
          { id: "saas", title: "SaaS Applications", url: "/images/optimized/rolf-van-root.webp" },
          { id: "enterprise", title: "Enterprise Solutions", url: "/images/optimized/lightsaber-collection.webp" },
        ]}
      />

      <BentoEcosystem
        indexLabel="03 / Solutions"
        serviceId={selectedService?.id}
        title="Business Systems We Build"
        cards={[
          {
            title: "CRM & ERP Systems",
            description: "Custom resource planning and customer relationship managers that map exactly to your business model.",
            colSpan: 1,
            visual: <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          },
          {
            title: "SaaS Platforms",
            description: "Multi-tenant cloud applications built with subscription billing and complex role-based access.",
            colSpan: 1,
            visual: <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          },
          {
            title: "Internal Tools & Automation",
            description: "Custom dashboards and workflow automation systems that eliminate manual data entry and save thousands of hours.",
            colSpan: 2,
          }
        ]}
      />

      <DesignPrinciples
        indexLabel="04 / Philosophy"
        title="Architecture Principles"
        subtitle="We build business operating systems, not just custom software. Here is our engineering philosophy."
        principles={[
          { title: "Security by design", description: "Data protection and compliance aren't afterthoughts; they are baked into the core architecture." },
          { title: "Scalability from day one", description: "Microservices and database schemas built to handle your growth over the next decade." },
          { title: "Integration-first mindset", description: "Software must talk to your existing tools. We engineer robust API layers." },
          { title: "Automation over manual effort", description: "If a human is doing a repetitive task, the software should be doing it instead." },
        ]}
      />

      <SoftwareSystemVisualizer indexLabel="05 / Architecture" title="The Operational Ecosystem" />

      <ImpactMetrics
        title="Operational Impact"
        indexLabel="06 / Impact"
        metrics={[
          { value: "Scale", label: "Workflow Efficiency", color: "#f8fafc" },
          { value: "Control", label: "Data Centralization", color: "#818cf8" },
          { value: "Speed", label: "Automated Processes", color: "#f472b6" },
          { value: "Secure", label: "Enterprise Security", color: "#34d399" },
        ]}
      />

      {(() => {
        const defaultItems = [
          { before: "Fragmented data across 10 spreadsheets", after: "A single, centralized source of truth" },
          { before: "Manual data entry & human error", after: "Automated workflows & high accuracy" },
          { before: "Off-the-shelf tools that don't quite fit", after: "Software mapped exactly to your business operations" },
          { before: "Siloed departments", after: "Connected teams with real-time visibility" },
        ];

        const serviceSpecificItems: Record<string, { before: string; after: string }[]> = {
          "crm-erp": [
            { before: "Sales pipelines and operations split across 10 spreadsheets", after: "Fully unified custom CRM console matching custom sales funnels" },
            { before: "Manual inventory audits prone to typing mistakes", after: "Real-time automated ERP counting loops across multiple warehouses" },
            { before: "Fragmented customer data causing communication drops", after: "Single source of truth with 360-degree timeline visibility" },
            { before: "No automated invoicing and payment links", after: "Integrated Stripe/Quickbooks automated billing cycles" }
          ],
          "custom-software": [
            { before: "Adapting team processes to rigid off-the-shelf software limits", after: "Bespoke software engineered around your company's operational blueprint" },
            { before: "Double-handling data entries between third-party systems", after: "Seamless custom API bridges syncing data on every database event" },
            { before: "Slow legacy systems running on-premise servers", after: "Serverless cloud architecture scaling resources instantly on demand" },
            { before: "No operational transparency and log tracking", after: "Detailed audit logs and granular system permissions dashboard" }
          ],
          saas: [
            { before: "Clunky manual subscription and tenant separation", after: "Highly secure, multi-tenant database partitioning" },
            { before: "Basic payment gateways prone to churn and failed cards", after: "Stripe Billing/Customer Portal integration with dunning automations" },
            { before: "Monolithic code causing updates to break other services", after: "Microservices architecture utilizing Docker and Kubernetes" },
            { before: "No user-role separation and workspace support", after: "Fully flexible workspace structures with custom admin control panels" }
          ],
          enterprise: [
            { before: "Unregulated database structures causing data leaks", after: "ISO-compliant data encryption, SOC2 controls, and network firewalls" },
            { before: "Siloed communication between legacy local databases", after: "Modern data warehouse sync pipelines (Snowflake/Redshift)" },
            { before: "Manual cloud deployment steps causing developer mistakes", after: "Fully automated CI/CD pipelines with automated security scans" },
            { before: "Zero performance dashboards for management oversight", after: "Custom real-time analytical dashboards mapping KPIs instantly" }
          ]
        };

        const activeId = selectedService?.id?.toLowerCase() || "";
        const items = serviceSpecificItems[activeId] || defaultItems;
        const title = selectedService?.label 
          ? `Legacy vs UNICX ${selectedService.label}` 
          : "Legacy vs UNICX Custom Software";

        return <BeforeAfter title={title} items={items} selectedServiceId={activeId} indexLabel="07 / Evolution" />;
      })()}

      <ExecutionModel
        title="Development Framework"
        indexLabel="08 / Execution"
        steps={[
          { name: "Discovery", description: "Mapping out your exact operational workflows and identifying bottlenecks." },
          { name: "System Design", description: "Architecting the database schema, API contracts, and integration points." },
          { name: "UI/UX Architecture", description: "Designing intuitive interfaces that reduce employee training time and errors." },
          { name: "Development", description: "Iterative agile sprints with continuous integration and deployment (CI/CD)." },
          { name: "Testing & Deployment", description: "Rigorous security scanning and zero-downtime deployment into production." },
        ]}
        images={[
          "/images/optimized/shunya-koide.webp",
          "/images/optimized/evgeniy-surzhan.webp",
          "/images/optimized/genadi-georgiev.webp",
          "/images/optimized/tai-bui-2.webp",
          "/images/optimized/fotis-fotopoulos.webp",
        ]}
      />

      <TechStack
        title="Technology Stack"
        indexLabel="09 / Technologies"
        stack={[
          { name: "AWS", iconUrl: "https://api.iconify.design/logos:aws.svg" },
          { name: "Google Cloud", iconUrl: "https://cdn.simpleicons.org/googlecloud/4285F4" },
          { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
          { name: "Python", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
          { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
          { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
          { name: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/2496ED" },
          { name: "Kubernetes", iconUrl: "https://cdn.simpleicons.org/kubernetes/326CE5" }
        ]}
      />

      <CTA />
    </div>
  );
}
