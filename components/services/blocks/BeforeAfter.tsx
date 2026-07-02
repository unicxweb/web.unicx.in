"use client";

import React from "react";
import { motion } from "framer-motion";
import { CodeComparison } from "@/components/ui/code-comparison";
import { IndexLabel } from "./IndexLabel";

export type BeforeAfterItem = {
  before: string;
  after: string;
};

interface BeforeAfterProps {
  title: string;
  items: BeforeAfterItem[];
  selectedServiceId?: string;
  indexLabel?: string;
}

export function BeforeAfter({ title, items, selectedServiceId, indexLabel = "05 / Evolution" }: BeforeAfterProps) {
  const activeId = selectedServiceId?.toLowerCase() || "";

  // Complete registry of dynamic sub-service code snippets with premium, ultra-punchy 2-word titles
  const snippetsRegistry: Record<
    string,
    { title: string; before: string; after: string; filename: string; language: string }
  > = {
    // === App Development ===
    ios: {
      title: "SwiftUI Core",
      filename: "ios-rendering.swift",
      language: "swift",
      before: `// Legacy UIKit Manual Render
import UIKit

class LegacyViewController: UIViewController {
    var titleLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Verbose manual frame layout
        titleLabel = UILabel(frame: CGRect(x: 20, y: 100, width: 280, height: 44))
        titleLabel.text = "Hello World"
        view.addSubview(titleLabel)
    }
}`,
      after: `// UNICX SwiftUI Declarative Layout
import SwiftUI

struct ModernView: View {
    @State private var title = "Hello World"
    
    var body: some View {
        Text(title)
            .font(.system(.title, design: .rounded))
            .padding() // Automatic safe-area scaling // [!code highlight]
    }
}`
    },
    android: {
      title: "Compose Core",
      filename: "android-compose.kt",
      language: "kotlin",
      before: `// Legacy XML Inflation
class LegacyActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Boilerplate view mapping
        val title = findViewById<TextView>(R.id.title)
        title.text = "Android Legacy View"
    }
}`,
      after: `// UNICX Declarative Jetpack Compose
@Composable
fun ModernScreen() {
    var title by remember { mutableStateOf("Android Modern View") }
    
    Text(
        text = title,
        style = MaterialTheme.typography.titleLarge // [!code highlight]
    )
}`
    },
    hybrid: {
      title: "Direct Storage",
      filename: "react-native-engine.ts",
      language: "typescript",
      before: `// Legacy Async Storage Bridge
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveSession(token: string) {
  // Heavy JSON serialization over JS-to-Native bridge
  await AsyncStorage.setItem('user_token', token);
}`,
      after: `// UNICX Fast JSI MMKV Engine
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export function saveSession(token: string) {
  // Direct C++ memory bindings for instant write (10x faster)
  storage.set('user_token', token); // [!code highlight]
}`
    },
    pwa: {
      title: "Edge Cache",
      filename: "service-worker.js",
      language: "javascript",
      before: `// Fragile Browser Cache-Control
// Breaks during offline usage or connection drops
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
  );
});`,
      after: `// UNICX Service Worker precaching
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// Statically serving critical shells offline
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({ cacheName: 'media_cache' }) // [!code highlight]
);`
    },
    "product-design": {
      title: "Design Tokens",
      filename: "design-tokens.json",
      language: "json",
      before: `/* Fragile Hardcoded Color Styles */
.card-header {
  color: #1A3DE8;
}
.btn-primary {
  background-color: #1A3DE8;
}`,
      after: `{
  /* UNICX Token-driven design system */
  "color": {
    "brand": {
      "primary": { "value": "{color.blue.600}" },
      "hover": { "value": "{color.blue.700}" } // [!code highlight]
    }
  }
}`
    },

    // === Website Development ===
    business: {
      title: "Edge Rendering",
      filename: "next-isr.ts",
      language: "typescript",
      before: `// Legacy Server Side Page Fetch
import React from 'react';
import axios from 'axios';

export default class WebPage extends React.Component {
  state = { info: null };
  async componentDidMount() {
    // Blocking request causing layout shifts
    const res = await axios.get('/api/info');
    this.setState({ info: res.data });
  }
}`,
      after: `// UNICX Server Components
import { getCompanyDetails } from '@/lib/db';

export default async function ModernPage() {
  // Pre-rendered at build time with 0kb Client JS
  const info = await getCompanyDetails(); // [!code highlight]

  return <InfoView data={info} />;
}`
    },
    ecommerce: {
      title: "Headless Checkout",
      filename: "shopify-cart.ts",
      language: "typescript",
      before: `// Traditional Monolithic Form Submit
// Triggers complete webpage reload
<form action="/cart/add" method="post">
  <input type="hidden" name="id" value="4029" />
  <button type="submit">Add to Cart</button>
</form>`,
      after: `// UNICX Headless Edge Mutation
import { shopifyClient } from '@/lib/shopify';

export async function addToCart(lineId: string) {
  // Sub-second headless checkout state update
  await shopifyClient.mutate({
    cartLinesAdd: { cartId, lines: [{ merchandiseId: lineId }] } // [!code highlight]
  });
}`
    },
    landing: {
      title: "Edge Routing",
      filename: "ab-middleware.ts",
      language: "typescript",
      before: `// Heavy Client Redirect Scripts
// Causes white flashes & cumulative layout shifts
window.onload = function() {
  if (Math.random() > 0.5) {
    window.location.href = '/landing-variant-b';
  }
};`,
      after: `// UNICX Edge Middleware A/B testing
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Instant routing decisions running at cloud edge edge node
  const variant = req.cookies.get('variant')?.value || 'A';
  return NextResponse.rewrite(new URL(\`/landing/\${variant}\`, req.url)); // [!code highlight]
}`
    },
    platform: {
      title: "Schema Security",
      filename: "controller-security.ts",
      language: "typescript",
      before: `// Direct query with unsanitized parameters
app.get('/api/users', async (req, res) => {
  const { id } = req.query;
  const result = await db.query(
    "SELECT * FROM users WHERE id = " + id
  );
  res.json(result);
});`,
      after: `// UNICX Typed API Controllers
import { z } from 'zod';
import { prisma } from '@/lib/db';

const userRequest = z.object({ id: z.string().uuid() });

export async function GET(req: Request) {
  // Sanitized typed schema protection
  const { id } = userRequest.parse(req.query);
  const user = await prisma.user.findUnique({ where: { id } }); // [!code highlight]
  return Response.json(user);
}`
    },
    seo: {
      title: "Semantic Indexing",
      filename: "seo-schema.tsx",
      language: "tsx",
      before: `// Traditional head headers
<head>
  <title>Corporate Home Page</title>
  <meta name="description" content="Welcome to our website" />
</head>`,
      after: `// UNICX Structured Metadata Injection
import { WebSite, WithContext } from 'schema-dts';

export function GoogleSchema() {
  const schemaJson: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UNICX Solutions',
    url: 'https://unicx.in' // [!code highlight]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />;
}`
    },

    // === Software Development ===
    "crm-erp": {
      title: "Event Streams",
      filename: "erp-sync.ts",
      language: "typescript",
      before: `// Heavy hourly server sync scripts
cron.schedule('0 * * * *', async () => {
  const data = await externalSystem.getUpdates();
  // Runs loops locked on system databases
  await db.updateBulk(data);
});`,
      after: `// UNICX Reactive Webhooks
import { handleERPMutation } from '@/lib/erp';

export async function POST(req: Request) {
  const payload = await req.json();
  
  // Real-time asynchronous transaction queueing
  await handleERPMutation(payload.event, payload.data); // [!code highlight]
  return Response.json({ status: 'queued' });
}`
    },
    "custom-software": {
      title: "In-Memory Cache",
      filename: "db-caching.ts",
      language: "typescript",
      before: `// Repeated database fetch calls
async function getUserProfile(userId: string) {
  // Triggers disk lookups on database instances
  return await db.users.findOne({ id: userId });
}`,
      after: `// UNICX Memory Caching layers
import { redis } from '@/lib/redis';

async function getUserProfile(userId: string) {
  // In-memory reading resolving queries in sub-2ms
  const cache = await redis.get(\`user:\${userId}\`);
  if (cache) return JSON.parse(cache);
  
  const user = await db.users.findOne({ id: userId }); // [!code highlight]
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
  return user;
}`
    },
    saas: {
      title: "Row Isolation",
      filename: "tenant-isolation.ts",
      language: "typescript",
      before: `// Application filtering tenant security
async function getTenantData(req) {
  // Highly vulnerable to developer mistakes
  return await db.orders.findMany({
    where: { tenantId: req.headers.tenantId }
  });
}`,
      after: `// UNICX Row Level Database Partitioning
// Security rule configured directly in database layer
/*
CREATE POLICY tenant_isolation_policy ON orders 
USING (tenant_id = current_setting('app.current_tenant'));
*/
async function getTenantData() {
  // Implicitly isolated by DB connections automatically
  return await db.orders.findMany(); // [!code highlight]
}`
    },
    enterprise: {
      title: "Testing Pipelines",
      filename: "cicd-pipeline.yml",
      language: "yaml",
      before: `# Manual developer scripts
deploy:
  run: ssh root@server "cd app && git pull && npm run build"`,
      after: `# UNICX Automated Deploy testing pipelines
name: Automated Integration Check
on: [push]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test --coverage # [!code highlight]`
    },
    desktop: {
      title: "Hardware Bindings",
      filename: "tauri-bridge.ts",
      language: "typescript",
      before: `// Traditional browser hardware block
function readUSBPort() {
  // Standard browsers restrict hardware access for security
  throw new Error("Unavailable in browser tab context");
}`,
      after: `// UNICX Tauri desktop access
import { invoke } from '@tauri-apps/api/core';

async function readUSBPort() {
  // Access system capabilities securely using Tauri
  const portData = await invoke('read_hardware_ports'); // [!code highlight]
  return portData;
}`
    },

    // === Digital Marketing ===
    "on-page-seo": {
      title: "Semantic Hierarchy",
      filename: "seo-tags.tsx",
      language: "tsx",
      before: `// Generic heading styles
<div className="text-xl font-bold">Main Service Area</div>
<div className="text-lg">Sub Service Details</div>`,
      after: `// Clean Semantic HTML structural tags
<h1 className="text-4xl font-bold">Main Service Area</h1> 
<h2 className="text-2xl">Sub Service Details</h2> // [!code highlight]`
    },
    "technical-seo": {
      title: "Asset Loading",
      filename: "layout-vitals.tsx",
      language: "tsx",
      before: `// Layout causing image shifts
<img src="/marketing-banner.png" />
<p>Marketing details text...</p>`,
      after: `// Dynamic Next.js Image Optimization
import Image from 'next/image';

<Image 
  src="/marketing-banner.png" 
  width={800} 
  height={450} 
  alt="Marketing details banner"
  priority={true} // Prevents image layout shift (LCP) // [!code highlight]
/>
<p>Marketing details text...</p>`
    },
    social: {
      title: "Dynamic Metadata",
      filename: "og-card.tsx",
      language: "tsx",
      before: `// Static meta tags
<meta property="og:image" content="/images/default-share.png" />`,
      after: `// Dynamic OG Share generators
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', background: 'black', color: 'white' }}>
        <h1>Dynamic Post: {getPostTitle(request.url)}</h1> // [!code highlight]
      </div>
    ),
    { width: 1200, height: 630 }
  );
}`
    },
    "paid-ads": {
      title: "Server Tracking",
      filename: "facebook-capi.ts",
      language: "typescript",
      before: `// Client side pixel event triggers
// Dropped by 40% of standard ad-blocker plugins
fbq('track', 'Purchase', { value: 99.00, currency: 'USD' });`,
      after: `// UNICX Server to Server Conversions API
import { FacebookAdsApi, ServerEvent, EventRequest } from 'facebook-nodejs-business-sdk';

export async function sendConversionEvent(orderId: string, val: number) {
  const serverEvent = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(Math.floor(Date.now() / 1000))
    .setCustomData({ value: val, currency: 'USD' }); // [!code highlight]

  const req = new EventRequest(pixelId).setEvents([serverEvent]);
  await req.execute();
}`
    },
    analytics: {
      title: "Action Telemetry",
      filename: "ga4-telemetry.ts",
      language: "typescript",
      before: `// Simple trigger setup
window.gtag('event', 'click');`,
      after: `// UNICX Event schema trigger
import { trackingEngine } from '@/lib/telemetry';

export function recordFunnelStage(stage: number, name: string) {
  trackingEngine.logEvent('funnel_progression', {
    stage_index: stage,
    stage_name: name, // [!code highlight]
    session_duration: getSessionTime()
  });
}`
    },

    // === Graphic Design ===
    "ui-ux": {
      title: "Spring Physics",
      filename: "interaction-state.tsx",
      language: "tsx",
      before: `// Static state update causing visual snaps
function Tab({ active }) {
  return (
    <div className={active ? 'bg-indigo-600' : 'bg-transparent'}>
      Tab Text
    </div>
  );
}`,
      after: `// UNICX Framer Motion Shared Layouts
import { motion } from 'framer-motion';

function Tab({ active }) {
  return (
    <div className="relative">
      {active && (
        <motion.div 
          layoutId="active_indicator" // Animates morph cleanly between siblings // [!code highlight]
          className="absolute inset-0 bg-indigo-600 rounded-lg"
        />
      )}
      <span className="relative z-10">Tab Text</span>
    </div>
  );
}`
    },
    logo: {
      title: "Vector Paths",
      filename: "responsive-logo.svg",
      language: "xml",
      before: `<!-- Heavy Rasterized PNG logo -->
<img src="/assets/logo.png" style="width: 100px; height: 100px;" />`,
      after: `<!-- Responsive Handcrafted SVG Vector shapes -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M10,80 Q50,10 90,80" fill="none" stroke="#1A3DE8" strokeWidth="4" />
</svg>`
    },
    marketing: {
      title: "Programmatic Media",
      filename: "ad-canvas.tsx",
      language: "tsx",
      before: `// Standard ad creative image render
<img src="/ads/banner-v1.jpg" />`,
      after: `// UNICX Creative Asset Component
import { motion } from 'framer-motion';

export function DynamicAdCreative() {
  return (
    <div className="relative overflow-hidden w-[300px] h-[250px] bg-black">
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }} // [!code highlight]
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/creative-bg.jpg)' }}
      />
      <h3 className="absolute bottom-4 left-4 text-white">Elevated Designs</h3>
    </div>
  );
}`
    },
    illustration: {
      title: "Bezier Curves",
      filename: "optimized-illustration.svg",
      language: "xml",
      before: `<!-- Excess anchors deforming rendering -->
<svg width="200" height="200">
  <path d="M10,10 C12,12 15,14 18,17 C19,19 22,23 25,27 C28,32 30,35 33,39" />
</svg>`,
      after: `<!-- Simplified Mathematical Bezier curves -->
<svg width="200" height="200">
  <path d="M10,10 Q25,25 33,39" stroke="#fff" strokeWidth="2" /> <!-- [!code highlight] -->
</svg>`
    },
    motion: {
      title: "Lottie Animations",
      filename: "lottie-loader.tsx",
      language: "tsx",
      before: `// Heavy Continuous Loops GIFs
<img src="/loaders/spinning-sphere.gif" />`,
      after: `// Light Lottie Player render
import Lottie from 'lottie-react';
import sphereAnimation from '@/assets/animations/sphere.json';

export function AnimatedLoader() {
  return (
    <Lottie 
      animationData={sphereAnimation} 
      loop={true} // Clean scale dynamic parsing // [!code highlight]
    />
  );
}`
    }
  };

  // Determine snippet to display
  const matchedSnippet = snippetsRegistry[activeId];

  // Default snippets if no sub-service match
  let beforeCode = `// Legacy Architecture Block
import React, { useState } from 'react';

export default function LegacySystem() {
  const [loading, setLoading] = useState(false);
  
  const processData = () => {
    setLoading(true);
    // Unoptimized heavy browser computation
    for(let i = 0; i < 1000000; i++) {
      console.log(i);
    }
    setLoading(false);
  };

  return (
    <button onClick={processData}>
      {loading ? 'Processing...' : 'Run Action'}
    </button>
  );
}`;

  let afterCode = `// UNICX Modern Optimized System
import { useTransition } from 'react';

export function ModernSystem() {
  const [isPending, startTransition] = useTransition();

  const processData = () => {
    // Keeps browser page responsive and smooth
    startTransition(async () => {
      await performHeavyCalculationAsync(); // [!code highlight]
    });
  };

  return (
    <button onClick={processData} disabled={isPending}>
      {isPending ? 'Processing...' : 'Run Action'}
    </button>
  );
}`;

  let filename = "system-optimization.tsx";
  let language = "tsx";
  let activeTitle = title;

  if (matchedSnippet) {
    beforeCode = matchedSnippet.before;
    afterCode = matchedSnippet.after;
    filename = matchedSnippet.filename;
    language = matchedSnippet.language;
    activeTitle = matchedSnippet.title;
  } else {
    // If no exact sub-service, match generic category like before
    const titleLower = title.toLowerCase();
    if (titleLower.includes("website") || titleLower.includes("landing") || titleLower.includes("ecommerce") || titleLower.includes("seo") || titleLower.includes("platform") || titleLower.includes("business")) {
      filename = snippetsRegistry.business.filename;
      beforeCode = snippetsRegistry.business.before;
      afterCode = snippetsRegistry.business.after;
      language = snippetsRegistry.business.language;
      activeTitle = "Web Platforms";
    } else if (titleLower.includes("software") || titleLower.includes("crm") || titleLower.includes("saas") || titleLower.includes("enterprise") || titleLower.includes("desktop")) {
      filename = snippetsRegistry["crm-erp"].filename;
      beforeCode = snippetsRegistry["crm-erp"].before;
      afterCode = snippetsRegistry["crm-erp"].after;
      language = snippetsRegistry["crm-erp"].language;
      activeTitle = "Software Engines";
    } else if (titleLower.includes("marketing") || titleLower.includes("growth") || titleLower.includes("paid") || titleLower.includes("analytics")) {
      filename = snippetsRegistry.analytics.filename;
      beforeCode = snippetsRegistry.analytics.before;
      afterCode = snippetsRegistry.analytics.after;
      language = snippetsRegistry.analytics.language;
      activeTitle = "Growth Telemetry";
    } else if (titleLower.includes("design") || titleLower.includes("ui") || titleLower.includes("logo") || titleLower.includes("illustration") || titleLower.includes("motion")) {
      filename = snippetsRegistry["ui-ux"].filename;
      beforeCode = snippetsRegistry["ui-ux"].before;
      afterCode = snippetsRegistry["ui-ux"].after;
      language = snippetsRegistry["ui-ux"].language;
      activeTitle = "Design Systems";
    } else if (titleLower.includes("app") || titleLower.includes("ios") || titleLower.includes("android") || titleLower.includes("hybrid") || titleLower.includes("pwa")) {
      filename = snippetsRegistry.hybrid.filename;
      beforeCode = snippetsRegistry.hybrid.before;
      afterCode = snippetsRegistry.hybrid.after;
      language = snippetsRegistry.hybrid.language;
      activeTitle = "App Systems";
    }
  }

  return (
    <section className="relative py-32 sm:py-48 bg-black overflow-hidden border-t border-white/5">
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full px-[5vw] relative z-10 flex flex-col">
        {/* Editorial Section Header (styled like capabilities) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
          <div className="lg:col-span-8">
            <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/50 uppercase mb-8 flex items-center gap-2">
              <IndexLabel label={indexLabel} />
            </div>
            <h2 className="text-[clamp(2.1rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white">
              {activeTitle}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-14">
            <p className="text-[clamp(14px,1.1vw,16px)] leading-[1.6] text-zinc-300 font-light tracking-wide max-w-md">
              A detailed side-by-side engineering diff showing legacy implementation paradigms refactored to conform to UNICX performance, modularity, and responsiveness standards.
            </p>
          </div>
        </div>

        {/* Code Comparison Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-6xl mx-auto"
        >
          <CodeComparison
            beforeCode={beforeCode}
            afterCode={afterCode}
            language={language}
            filename={filename}
            darkTheme="github-dark"
          />
        </motion.div>

        {/* Human-Readable Context Lists for Non-Technical Users */}
        {items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-16 max-w-6xl mx-auto w-full">
            {/* Legacy Bottlenecks */}
            <div className="flex flex-col">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-red-400 mb-6 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Legacy Bottlenecks
              </h3>
              <ul className="space-y-4">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    <span className="text-red-500/60 select-none mt-1 font-semibold">—</span>
                    <span>{item.before}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* UNICX Modernized Solutions */}
            <div className="flex flex-col">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                UNICX Modernized Impact
              </h3>
              <ul className="space-y-4">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    <span className="text-emerald-400 select-none mt-1 font-semibold">✓</span>
                    <span>{item.after}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
