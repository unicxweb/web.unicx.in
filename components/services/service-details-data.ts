import React from "react";

export interface BentoCardData {
  number?: string;
  title: string;
  description?: string;
  colSpan?: 1 | 2;
  rotates?: string[];
  rotateLabel?: string;
  glowColor?: string; // 'blue' | 'indigo' | 'purple' | 'emerald' | 'fuchsia' | 'rose'
}

export interface ServiceDetailData {
  header: {
    prefix: string;
    rotates: string[];
    suffix: string;
  };
  bentoTitle: string;
  bentoCards: BentoCardData[];
}

export const serviceDetailsData: Record<string, ServiceDetailData> = {
  // ─── GRAPHIC DESIGN ──────────────────────────────────────────
  "uiux-design": {
    header: {
      prefix: "We craft digital experience architectures built to",
      rotates: ["provoke engagement", "clarify complex logic", "establish market authority"],
      suffix: "with absolute precision."
    },
    bentoTitle: "UI/UX Architecture",
    bentoCards: [
      {
        number: "01",
        title: "Behavioral Path Auditing",
        description: "Mapping user corridors and cognitive friction points to structure intuitive navigation before starting visual design.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "02",
        title: "Tokenized Design Systems",
        description: "High-fidelity UI kits constructed with strict auto-layout, nested component properties, and documented design tokens.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "03",
        title: "Tactile Prototyping",
        description: "Interactive, high-fidelity flows that test responsive behaviors, micro-animations, and edge cases prior to engineering handoff.",
        colSpan: 2,
        rotates: ["Micro-animations", "Dynamic States", "Responsive Rules", "Handoff Tokens"],
        rotateLabel: "Engineering for:"
      }
    ]
  },
  "logo-design": {
    header: {
      prefix: "We define brand identity systems built to",
      rotates: ["project market power", "command industry focus", "endure market shifts"],
      suffix: "across any canvas."
    },
    bentoTitle: "Brand Identity Pillars",
    bentoCards: [
      {
        number: "01",
        title: "Strategic Niche Mapping",
        description: "Evaluating visual signatures in your industry to carve out a distinctive, high-trust graphic niche.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "02",
        title: "Responsive Mark Systems",
        description: "Identity marks optimized for vector scale, rendering cleanly from 16px digital favicons to physical installations.",
        colSpan: 1,
        glowColor: "fuchsia"
      },
      {
        number: "03",
        title: "Design Guidelines & Standards",
        description: "Comprehensive operational brand standards detailing typographic hierarchy, grid systems, and visual margins.",
        colSpan: 2,
        rotates: ["Dynamic Wordmarks", "Graphic Devices", "Color Systems", "Brand Books"],
        rotateLabel: "Deliverables:"
      }
    ]
  },
  "marketing-creatives": {
    header: {
      prefix: "We engineer marketing assets optimized to",
      rotates: ["command attention", "clarify value props", "accelerate customer action"],
      suffix: "across digital networks."
    },
    bentoTitle: "Creative Performance Assets",
    bentoCards: [
      {
        number: "01",
        title: "Performance Asset Matrix",
        description: "Multi-aspect creative files tailored to convert audiences across LinkedIn, Meta, and modern search channels.",
        colSpan: 1,
        glowColor: "rose"
      },
      {
        number: "02",
        title: "Information Hierarchy Systems",
        description: "Structuring user layout patterns that deliver clear value propositions in under two seconds of visual interaction.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "03",
        title: "Operational Asset Templates",
        description: "Highly structured, dynamic templates that enable marketing teams to produce cohesive campaign content quickly.",
        colSpan: 2,
        rotates: ["Campaign Templates", "Pitch Systems", "Editorial Layouts", "Display Banners"],
        rotateLabel: "Asset Classes:"
      }
    ]
  },
  "illustration": {
    header: {
      prefix: "We paint custom brand illustrations designed to",
      rotates: ["visualize abstract concepts", "humanize products", "establish aesthetic distinction"],
      suffix: "in crowded spaces."
    },
    bentoTitle: "Illustration & Art Direction",
    bentoCards: [
      {
        number: "01",
        title: "Bespoke Art Assets",
        description: "Bespoke visual narratives developed to explain complex features in ways stock imagery cannot achieve.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "Character Ecosystems",
        description: "Designing memorable brand characters that increase visual affinity and build a recognizable product personality.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "03",
        title: "Style & Composition Rules",
        description: "Documenting illustration parameters, color rules, and perspectives to maintain consistency across illustrators.",
        colSpan: 2,
        rotates: ["Product Spot Art", "Scenic Hero Displays", "Merchandise Layouts", "Editorial Graphics"],
        rotateLabel: "Creative Formats:"
      }
    ]
  },
  "motion-and-video": {
    header: {
      prefix: "We direct motion graphics designed to",
      rotates: ["clarify complex tech", "provoke viewer action", "tell premium stories"],
      suffix: "through movement."
    },
    bentoTitle: "Motion Architecture",
    bentoCards: [
      {
        number: "01",
        title: "Explainer Motion Graphics",
        description: "Translating database flows and software mechanics into smooth, intuitive motion sequences.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "02",
        title: "Interaction & Easing Design",
        description: "Configuring micro-animations, physical transitions, and easing curves to make applications feel organic.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "03",
        title: "Short-Format Campaigns",
        description: "High-impact video assets engineered to convey value and capture interest within the first few frames.",
        colSpan: 2,
        rotates: ["Interactive Lottie", "Video Explainers", "Product Promos", "Identity Animations"],
        rotateLabel: "Deliverables:"
      }
    ]
  },

  // ─── WEBSITE DEVELOPMENT ─────────────────────────────────────
  "business-websites": {
    header: {
      prefix: "We construct marketing platforms designed to",
      rotates: ["project market authority", "generate high-value pipeline", "articulate brand narrative"],
      suffix: "with sub-second speeds."
    },
    bentoTitle: "Marketing Infrastructure",
    bentoCards: [
      {
        number: "01",
        title: "Conversion Architecture",
        description: "Intent-driven user corridors engineered to guide B2B decision-makers to high-value actions without friction.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "Composable CMS Platforms",
        description: "Integrating modern headless systems to grant marketing teams editing freedom without compromising code integrity.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "03",
        title: "Static Edge Generation",
        description: "Edge-rendered, highly optimized codebases that deliver near-zero layout shift and instantaneous load times globally.",
        colSpan: 2,
        rotates: ["Next.js Framework", "Static Edge Routing", "Headless CMS Connectors", "Structured Analytics"],
        rotateLabel: "Core Stack:"
      }
    ]
  },
  "ecommerce-websites": {
    header: {
      prefix: "We engineer commerce platforms built to",
      rotates: ["increase transaction value", "reduce checkout friction", "handle flash traffic"],
      suffix: "with absolute reliability."
    },
    bentoTitle: "Commerce Infrastructures",
    bentoCards: [
      {
        number: "01",
        title: "Checkout Funnel Design",
        description: "Streamlined express pathways, dynamic cart drawers, and secure integrations tuned to maximize checkout completion.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "02",
        title: "Enterprise Inventory Bridges",
        description: "Connecting product databases and logistics management systems directly with frontend store presentation.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "03",
        title: "Global Transaction Systems",
        description: "Implementing Stripe systems that process international currencies, localize tax compliance, and protect payment channels.",
        colSpan: 2,
        rotates: ["Upsell Cart Architecture", "Catalog Sync Engines", "Global Merchant Configs", "Multi-Currency Routing"],
        rotateLabel: "Components:"
      }
    ]
  },
  "landing-pages": {
    header: {
      prefix: "We build performance landing pages designed to",
      rotates: ["capture campaign pipeline", "maximize ad spend", "convert cold audiences"],
      suffix: "immediately."
    },
    bentoTitle: "Performance Landing Pages",
    bentoCards: [
      {
        number: "01",
        title: "Single-Focus Interface Logic",
        description: "Removing general navigation patterns to keep cold visitor attention centered on your primary call-to-action.",
        colSpan: 1,
        glowColor: "rose"
      },
      {
        number: "02",
        title: "Frictionless Forms",
        description: "Integrating smart autocomplete structures and verified inputs to reduce signup steps and drop-off.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "03",
        title: "Edge-Redirect Testing",
        description: "Utilizing Vercel edge handlers to split-test layout variants without client-side scripts or layout flashes.",
        colSpan: 2,
        rotates: ["Vercel Edge Splits", "Conversion Tracking", "CRM Automation Hooks", "Zero Layout Shifting"],
        rotateLabel: "Technology:"
      }
    ]
  },
  "custom-web-solutions": {
    header: {
      prefix: "We architect secure web portals engineered to",
      rotates: ["unify internal systems", "automate manual operations", "secure corporate data"],
      suffix: "dependably."
    },
    bentoTitle: "Custom Portal Architecture",
    bentoCards: [
      {
        number: "01",
        title: "Role-Based Access Control",
        description: "Enforcing absolute security credentials with JSON Web Tokens to protect server data interfaces.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "High-Performance Dashboards",
        description: "Bespoke tables designed with server-side filters, exports, and instant search queries for business operations.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "03",
        title: "Scalable API Ecosystems",
        description: "Structuring REST and GraphQL architectures capable of handling concurrent queries and database transactions.",
        colSpan: 2,
        rotates: ["JWT Access Control", "GraphQL API Layers", "Real-Time Sockets", "Automated Document Services"],
        rotateLabel: "Integrations:"
      }
    ]
  },
  "performance-and-seo": {
    header: {
      prefix: "We optimize product codebases designed to",
      rotates: ["rank in search engines", "accelerate bot crawl speed", "eliminate visual layout shift"],
      suffix: "globally."
    },
    bentoTitle: "Core Web Vitals & Technical SEO",
    bentoCards: [
      {
        number: "01",
        title: "Semantic HTML Architecture",
        description: "Structuring clean tags and elements to help search engines read page sections without confusion.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "02",
        title: "Structured JSON-LD Schema",
        description: "Injecting structured markup schemas to help search platforms display rich, eye-catching snippet cards.",
        colSpan: 1,
        glowColor: "fuchsia"
      },
      {
        number: "03",
        title: "Bundle & Asset Minimization",
        description: "Compiling code, lazy-loading media files, and modernizing assets to ensure maximum Google PageSpeed index ratings.",
        colSpan: 2,
        rotates: ["JSON-LD Schema Setup", "Static CDN Routing", "Critical Path CSS", "Perfect Lighthouse Ratings"],
        rotateLabel: "Pillars:"
      }
    ]
  },

  // ─── APP DEVELOPMENT ─────────────────────────────────────────
  "android-apps": {
    header: {
      prefix: "We compile native Android applications engineered to",
      rotates: ["render at smooth 120Hz", "scale to millions", "optimize system resources"],
      suffix: "on every device."
    },
    bentoTitle: "Android Engineering",
    bentoCards: [
      {
        number: "01",
        title: "Material Design 3 Systems",
        description: "Implementing Material Design rules for adaptive layouts, natural transitions, and built-in system accessibility.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "02",
        title: "Store Pipeline Engineering",
        description: "Configuring App Bundle compiles, beta testing tracks, and app store configurations for seamless deployment.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "03",
        title: "Local Datastore Sync",
        description: "Structuring Room database caching to provide offline utility, automatically syncing changes upon connection.",
        colSpan: 2,
        rotates: ["Kotlin (Jetpack Compose)", "Room Caching", "WorkManager Tasks", "Secure Biometrics"],
        rotateLabel: "Android Stack:"
      }
    ]
  },
  "ios-apps": {
    header: {
      prefix: "We build native iOS applications designed to",
      rotates: ["feel highly premium", "utilize native hardware", "guarantee absolute privacy"],
      suffix: "flawlessly."
    },
    bentoTitle: "iOS Engineering",
    bentoCards: [
      {
        number: "01",
        title: "Human Interface Alignment",
        description: "Integrating Apple layouts with Widgets, Dynamic Islands, physical haptics, and native sheets.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "App Store Submission",
        description: "Structuring sandbox checkouts, provisioning profiles, and privacy manifests to ensure swift store approval.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "03",
        title: "Secure Enclave Systems",
        description: "Connecting to Secure Enclave hardware to process biometric credentials and encrypt local client data.",
        colSpan: 2,
        rotates: ["SwiftUI Architecture", "CoreData Cache Layer", "Secure Enclave Crypto", "TestFlight Beta Pipelines"],
        rotateLabel: "iOS Stack:"
      }
    ]
  },
  "hybrid-apps": {
    header: {
      prefix: "We construct cross-platform apps designed to",
      rotates: ["share single codebases", "deploy instant OTA patches", "maximize product velocity"],
      suffix: "rapidly."
    },
    bentoTitle: "Cross-Platform Frameworks",
    bentoCards: [
      {
        number: "01",
        title: "Unified Code Architecture",
        description: "Deploying fully-featured mobile products to Apple and Google stores from one clean React Native codebase.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "02",
        title: "Over-The-Air Patching",
        description: "Pushing critical interface modifications directly to client apps, bypassing lengthy store review cycles.",
        colSpan: 1,
        glowColor: "fuchsia"
      },
      {
        number: "03",
        title: "Native Device Bridges",
        description: "Developing custom hardware wrappers in Obj-C and Java to access device cameras, bluetooth, and gps sensors.",
        colSpan: 2,
        rotates: ["React Native (TypeScript)", "Flutter (Dart)", "Expo OTA Updates", "Hardware Bridges"],
        rotateLabel: "Hybrid Stack:"
      }
    ]
  },
  "progressive-web-apps": {
    header: {
      prefix: "We compile progressive web apps designed to",
      rotates: ["function offline", "send system push alerts", "bypass app store gates"],
      suffix: "seamlessly."
    },
    bentoTitle: "Progressive Web Engineering",
    bentoCards: [
      {
        number: "01",
        title: "Network Service Workers",
        description: "Caching page requests locally so client applications load instantly even without an internet connection.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "System Push Services",
        description: "Configuring server alert systems that deliver push notifications directly to user desktops and home screens.",
        colSpan: 1,
        glowColor: "rose"
      },
      {
        number: "03",
        title: "Direct Install Manifests",
        description: "Configuring application metadata files so browsers let clients install the PWA with a single tap.",
        colSpan: 2,
        rotates: ["Service Worker Cache", "Web Manifest Protocols", "Push Notification APIs", "IndexedDB Storage"],
        rotateLabel: "PWA Engine:"
      }
    ]
  },
  "product-prototypes": {
    header: {
      prefix: "We design product prototypes built to",
      rotates: ["validate visual ideas", "secure capital investment", "test interactive patterns"],
      suffix: "rapidly."
    },
    bentoTitle: "Prototyping Frameworks",
    bentoCards: [
      {
        number: "01",
        title: "MVP Concept Definition",
        description: "Isolating essential product mechanics to evaluate client responses before committing engineering capital.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "02",
        title: "High-Fidelity Wireframes",
        description: "Designing interface flows (dashboard states, onboarding sequences) to show layout intent.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "03",
        title: "Interactive Client Demos",
        description: "Linking design files into clickable prototypes that validate user interfaces with live user testing.",
        colSpan: 2,
        rotates: ["Figma Clickable Flows", "Interactive Mockups", "Feature Set Mapping", "User Feedback Loops"],
        rotateLabel: "Deliverables:"
      }
    ]
  },

  // ─── SOFTWARE DEVELOPMENT ───────────────────────────────────
  "crm-and-erp-solutions": {
    header: {
      prefix: "We code ERP & CRM solutions engineered to",
      rotates: ["unify internal teams", "automate order pipelines", "centralize analytics dashboards"],
      suffix: "dependably."
    },
    bentoTitle: "Operations Architecture",
    bentoCards: [
      {
        number: "01",
        title: "Relational Data Models",
        description: "Designing database structures that accurately represent logistics, orders, and company workflow rules.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "Real-Time Telemetry Panels",
        description: "Dynamic reporting interfaces with real-time query updates, presenting status changes immediately.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "03",
        title: "Background Document Builders",
        description: "Configuring microservices to auto-generate invoices, reports, and delivery files on background queues.",
        colSpan: 2,
        rotates: ["SQL/NoSQL Databases", "PDF Generation Engines", "Data Visualizations", "Secure CSV Output"],
        rotateLabel: "Modules:"
      }
    ]
  },
  "custom-software": {
    header: {
      prefix: "We write custom software architectures designed to",
      rotates: ["consolidate data silos", "automate manual entries", "replace legacy systems"],
      suffix: "securely."
    },
    bentoTitle: "Bespoke Architectures",
    bentoCards: [
      {
        number: "01",
        title: "Workflow Audit Discovery",
        description: "Analyzing staff manual operations to code a custom system that cuts operational runtime.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "02",
        title: "Flexible Third-Party Hooks",
        description: "Connecting custom code to Stripe, accounting platforms, or shipping APIs with secure API links.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "03",
        title: "Legacy Data Migrations",
        description: "Writing scripts to safely transfer data records from Excel sheets into secure relational servers.",
        colSpan: 2,
        rotates: ["Data Migration Scripts", "Bespoke API Connectors", "Custom Admin Interfaces", "Activity Log Audit"],
        rotateLabel: "Capabilities:"
      }
    ]
  },
  "saas-applications": {
    header: {
      prefix: "We engineer cloud SaaS systems designed to",
      rotates: ["handle subscription tiers", "isolate customer data", "scale server workloads"],
      suffix: "flawlessly."
    },
    bentoTitle: "SaaS Infrastructures",
    bentoCards: [
      {
        number: "01",
        title: "Stripe Billing Integrations",
        description: "Setting up monthly plans, seat-based options, metered billing APIs, and credit-card updates.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "02",
        title: "Multi-Tenant Isolation",
        description: "Enforcing absolute separation of user databases to guarantee maximum enterprise security.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "03",
        title: "Seat Management Admin",
        description: "Clean management layouts allowing customers to invite colleagues and assign roles.",
        colSpan: 2,
        rotates: ["Stripe Recurring API", "Granular JWT Roles", "Tenant DB Isolation", "Invite & Seat Panels"],
        rotateLabel: "Built with:"
      }
    ]
  },
  "enterprise-solutions": {
    header: {
      prefix: "We construct enterprise solutions engineered to",
      rotates: ["guarantee zero downtime", "isolate critical servers", "support SSO workflows"],
      suffix: "dependably."
    },
    bentoTitle: "Enterprise Systems",
    bentoCards: [
      {
        number: "01",
        title: "SAML SSO Okta Connections",
        description: "Integrating Single Sign-On configurations to centralize access through corporate directories.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "Immutable Action Trails",
        description: "Deploying secure, append-only system logs that record all administrative actions for auditing.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "03",
        title: "High-Availability Clusters",
        description: "Docker microservices deployed across multiple server zones with automatic load balancing.",
        colSpan: 2,
        rotates: ["SAML SSO (Okta/AD)", "Read-Only Audit Trail", "Multi-Region Docker", "Auto-Scaling Setup"],
        rotateLabel: "Enterprise Ready:"
      }
    ]
  },
  "desktop-applications": {
    header: {
      prefix: "We write desktop applications engineered to",
      rotates: ["leverage GPU graphics", "manage local files", "run offline securely"],
      suffix: "flawlessly."
    },
    bentoTitle: "Desktop Software",
    bentoCards: [
      {
        number: "01",
        title: "Native Directory Integrations",
        description: "Accessing local system file structures and background tasks directly.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "02",
        title: "Cross-Platform Setup",
        description: "Deploying identical client code into Windows `.exe` and macOS `.app` runtimes cleanly.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "03",
        title: "Automatic Background Updates",
        description: "Setting up updater scripts to check, download, and apply client updates on restart.",
        colSpan: 2,
        rotates: ["Electron Framework", "Native File Explorer", "Auto-Updater Engine", "Multi-OS Compiling"],
        rotateLabel: "Desktop Stack:"
      }
    ]
  },

  // ─── MARKETING ───────────────────────────────────────────────
  "on-page-seo": {
    header: {
      prefix: "We optimize interface layouts designed to",
      rotates: ["claim target rankings", "enhance readability", "lift organic click rates"],
      suffix: "organically."
    },
    bentoTitle: "On-Page Optimization",
    bentoCards: [
      {
        number: "01",
        title: "Semantic Content Flow",
        description: "Structuring page elements, headers, and structural keywords to match search queries.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "Internal Link Frameworks",
        description: "Establishing structural links to distribute page authority to your highest-converting services.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "03",
        title: "Snippet & Metadata Tuning",
        description: "Writing meta titles, tags, and descriptions engineered to attract user clicks on search pages.",
        colSpan: 2,
        rotates: ["Meta Tag Audits", "Heading Hierarchy", "Anchor Distribution", "SERP Click CTR Lift"],
        rotateLabel: "Actions:"
      }
    ]
  },
  "technical-seo": {
    header: {
      prefix: "We optimize backend code architectures built to",
      rotates: ["accelerate Google crawls", "fix indexation errors", "implement rich structures"],
      suffix: "expertly."
    },
    bentoTitle: "Technical SEO Pillars",
    bentoCards: [
      {
        number: "01",
        title: "Crawl Path Optimizations",
        description: "Minimizing redirect chains and managing parameter links to direct search bots efficiently.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "02",
        title: "Rich JSON-LD Code Schema",
        description: "Deploying structured schema markup to claim visual rich snippets in search corridors.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "03",
        title: "Performance & Rendering speeds",
        description: "Removing render-blocking scripts and setting up edge caching to achieve high core web vital metrics.",
        colSpan: 2,
        rotates: ["Schema Markup Setup", "Redirect Chain Audits", "Page Speed Optimizations", "XML Sitemap Routing"],
        rotateLabel: "Pillars:"
      }
    ]
  },
  "social-media-marketing": {
    header: {
      prefix: "We execute brand social channels designed to",
      rotates: ["grow target reach", "build visual authority", "attract organic leads"],
      suffix: "authentically."
    },
    bentoTitle: "Social Media Strategy",
    bentoCards: [
      {
        number: "01",
        title: "Channel Content Planners",
        description: "Structuring content themes, posts, and visual layouts across LinkedIn, Instagram, and X.",
        colSpan: 1,
        glowColor: "rose"
      },
      {
        number: "02",
        title: "Asset Brand Guidelines",
        description: "Designing graphic templates for quotes, sliders, and thumbnails to maintain aesthetic style.",
        colSpan: 1,
        glowColor: "indigo"
      },
      {
        number: "03",
        title: "Organic Interaction Strategy",
        description: "Partnering with brand accounts and responding to industry developments to grow community presence.",
        colSpan: 2,
        rotates: ["Platform Content Calendars", "Quote Slide Templates", "Trend Hijack Tracking", "Analytics Engagement Reports"],
        rotateLabel: "Deliverables:"
      }
    ]
  },
  "paid-advertising": {
    header: {
      prefix: "We run performance advertising built to",
      rotates: ["lower customer CAC", "maximize ROAS metrics", "scale lead generation"],
      suffix: "profitably."
    },
    bentoTitle: "Paid Ad Optimizations",
    bentoCards: [
      {
        number: "01",
        title: "Target Audience Segments",
        description: "Setting up Custom Audiences, Lookalikes, and retargeting tracks based on product interaction data.",
        colSpan: 1,
        glowColor: "emerald"
      },
      {
        number: "02",
        title: "Creative A/B Experiments",
        description: "Testing visual scripts, static graphics, and value hooks to find optimal CPC ad options.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "03",
        title: "Tracking Conversions API",
        description: "Configuring server-to-server Conversions API and tags to capture conversion metrics accurately.",
        colSpan: 2,
        rotates: ["Meta conversions API", "Retargeting Ad Loops", "Audience Segment Mapping", "ROAS Aggregation Charts"],
        rotateLabel: "Framework:"
      }
    ]
  },
  "analytics-and-reporting": {
    header: {
      prefix: "We deploy analytics dashboards designed to",
      rotates: ["measure lead ROI", "reveal user dropouts", "attribute channel sources"],
      suffix: "transparently."
    },
    bentoTitle: "Data & Intelligence",
    bentoCards: [
      {
        number: "01",
        title: "Interaction Funnel Auditing",
        description: "Measuring drop-off rates through checkouts or register panels to isolate design bottlenecks.",
        colSpan: 1,
        glowColor: "blue"
      },
      {
        number: "02",
        title: "Centralized Data Portals",
        description: "Consolidating GA4 metrics, payment endpoints, and ad performance into unified, readable dashboards.",
        colSpan: 1,
        glowColor: "purple"
      },
      {
        number: "03",
        title: "Attribution Link Logic",
        description: "Structuring tracking URLs (UTMs) to correctly assign signups to social, paid, or search platforms.",
        colSpan: 2,
        rotates: ["Looker Studio Dashboards", "GA4 Conversions Setup", "Drop-off Funnel Analysis", "Channel Attribution Charts"],
        rotateLabel: "Modules:"
      }
    ]
  }
};

// ─── ALIAS KEY MAPPINGS FOR ROUTING & SHOWCASE SYNC ───────────
serviceDetailsData["ui-ux"] = serviceDetailsData["uiux-design"];
serviceDetailsData["logo"] = serviceDetailsData["logo-design"];
serviceDetailsData["marketing"] = serviceDetailsData["marketing-creatives"];
serviceDetailsData["motion"] = serviceDetailsData["motion-and-video"];

serviceDetailsData["business"] = serviceDetailsData["business-websites"];
serviceDetailsData["ecommerce"] = serviceDetailsData["ecommerce-websites"];
serviceDetailsData["landing"] = serviceDetailsData["landing-pages"];
serviceDetailsData["platform"] = serviceDetailsData["custom-web-solutions"];
serviceDetailsData["seo"] = serviceDetailsData["performance-and-seo"];

serviceDetailsData["android"] = serviceDetailsData["android-apps"];
serviceDetailsData["ios"] = serviceDetailsData["ios-apps"];
serviceDetailsData["hybrid"] = serviceDetailsData["hybrid-apps"];
serviceDetailsData["pwa"] = serviceDetailsData["progressive-web-apps"];
serviceDetailsData["product-design"] = serviceDetailsData["product-prototypes"];

serviceDetailsData["crm-erp"] = serviceDetailsData["crm-and-erp-solutions"];
serviceDetailsData["saas"] = serviceDetailsData["saas-applications"];
serviceDetailsData["enterprise"] = serviceDetailsData["enterprise-solutions"];
serviceDetailsData["desktop"] = serviceDetailsData["desktop-applications"];

serviceDetailsData["social"] = serviceDetailsData["social-media-marketing"];
serviceDetailsData["paid-ads"] = serviceDetailsData["paid-advertising"];
serviceDetailsData["analytics"] = serviceDetailsData["analytics-and-reporting"];
