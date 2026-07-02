"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Layers, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { serviceCategories } from "@/lib/site-data";

const ease = {
  ui: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hero: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

type SitemapEntry = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  links: {
    title: string;
    description?: string;
    href: string;
  }[];
  theme: "light" | "dark";
};

export function SitemapClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Construct sitemap entries dynamically
  const entries: SitemapEntry[] = [
    {
      id: "core-pages",
      icon: Compass,
      title: "Core Pages",
      subtitle: "Main website navigation channels",
      theme: "light",
      links: [
        { title: "Home", description: "Studio digital presence and homepage", href: "/" },
        { title: "Services", description: "Comprehensive listing of all service areas", href: "/services" },
        { title: "Studio", description: "UNICX Studio team mission, background, and vision", href: "/studio" },
        { title: "Careers", description: "Job listings, culture values, and recruitment details", href: "/careers" },
        { title: "Contact", description: "Get in touch for consultations and project planning", href: "/contact" },
      ],
    },
    // Map service categories dynamically
    ...serviceCategories.map((category) => {
      const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");
      return {
        id: `service-${categorySlug}`,
        icon: Layers,
        title: category.name,
        subtitle: category.description,
        theme: "dark" as const,
        links: [
          {
            title: `Overview: ${category.name}`,
            description: `Learn more about our ${category.name} deliverables`,
            href: `/services/${categorySlug}`,
          },
          ...category.items.map((service) => {
            const serviceSlug = service
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/\s+/g, "-")
              .replace(/[^\w\-]/g, "")
              .replace(/-+/g, "-");
            return {
              title: service,
              href: `/services/${categorySlug}/${serviceSlug}`,
            };
          }),
        ],
      };
    }),
    {
      id: "legal-pages",
      icon: ShieldCheck,
      title: "Legal & Policies",
      subtitle: "Terms and privacy policies",
      theme: "light",
      links: [
        { title: "Sitemap", description: "Complete visual structure and link directories", href: "/sitemap" },
        { title: "Privacy Policy", description: "Data security, cookies, and privacy standards", href: "/privacy" },
        { title: "Terms of Service", description: "Terms and service guidelines for clients", href: "/terms" },
      ],
    },
  ];

  const setItemRef = (el: HTMLElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) {
        setActiveIndex(bestIndex);
      }
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  // Ensure first entry is active initially
  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fafafa]">
      <div className="noise-overlay opacity-30 pointer-events-none" />
      <Navbar />

      <div className="font-sans">
        {/* ═══════════════════════════════════════════════════
           LIGHT-THEMED HERO SECTION
           ═══════════════════════════════════════════════════ */}
        <section className="relative w-full px-6 pt-40 pb-16 sm:px-8 sm:pt-52 sm:pb-20 lg:px-12 lg:pt-60 lg:pb-24 bg-[#fafafa]">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: ease.ui }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="section-dot" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Navigation
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.05, ease: ease.hero }}
                className="max-w-4xl text-[clamp(2.7rem,6vw,5.3rem)] font-light leading-[0.94] tracking-tight text-zinc-950"
              >
                Complete site structure.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1, ease: ease.ui }}
                className="mt-6 max-w-2xl text-[15px] leading-7 text-zinc-500 sm:text-[17px] sm:leading-8"
              >
                Explore the complete structure of our website. Browse through our main navigation
                channels, core studio pages, and details about our specialized design and engineering service categories.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           TIMELINE ROADMAP SECTIONS
           ═══════════════════════════════════════════════════ */}
        <div className="w-full">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const isDark = entry.theme === "dark";

            return (
              <section
                key={entry.id}
                ref={(el) => setItemRef(el, index)}
                className={`relative py-24 sm:py-32 border-t transition-colors duration-500 ${
                  isDark
                    ? "bg-black text-white border-white/10"
                    : "bg-[#fafafa] text-zinc-950 border-zinc-200/80"
                }`}
              >
                {/* Sentinel placed near top-ish part to measure proximity */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute top-1/4 left-0 h-10 w-10 opacity-0 pointer-events-none"
                />

                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                  <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    {/* Left Sticky Column */}
                    <motion.div
                      initial={{ opacity: 0, x: -25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: ease.ui }}
                      className="lg:sticky lg:top-[120px] h-fit self-start"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2.5 rounded-none border shrink-0 transition-colors duration-300 ${
                            isActive
                              ? "bg-[#fd5200] text-white border-[#fd5200]"
                              : isDark
                              ? "bg-white/5 text-zinc-400 border-white/10"
                              : "bg-black/5 text-zinc-500 border-zinc-200"
                          }`}
                        >
                          <entry.icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-2">
                          <h2
                            className={`text-2xl sm:text-3xl font-light tracking-tight transition-colors duration-300 ${
                              isActive ? (isDark ? "text-white" : "text-zinc-950") : "text-zinc-400"
                            }`}
                          >
                            {entry.title}
                          </h2>
                          <p
                            className={`text-sm max-w-sm leading-relaxed transition-colors duration-300 ${
                              isDark ? "text-zinc-500" : "text-zinc-400"
                            }`}
                          >
                            {entry.subtitle}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Expandable Links Column */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.05 }}
                        transition={{ duration: 0.5 }}
                        className={`space-y-4 border-l pl-6 ${isDark ? "border-white/10" : "border-zinc-200"}`}
                      >
                        <AnimatePresence initial={true}>
                          {entry.links.map((link, linkIndex) => (
                            <motion.div
                              key={link.title}
                              initial={{ opacity: 0, y: 25, scale: 0.98 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1 }}
                              viewport={{ once: false, amount: 0.1 }}
                              transition={{
                                duration: 0.5,
                                delay: linkIndex * 0.05,
                                ease: ease.ui,
                              }}
                            >
                              <Link
                                href={link.href}
                                className={`block p-4 border rounded-none transition-all duration-300 group ${
                                  isDark
                                    ? "border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.02]"
                                    : "border-zinc-200/60 bg-white/40 hover:border-zinc-300 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-6">
                                  <div>
                                    <h3
                                      className={`font-normal text-md sm:text-lg group-hover:underline transition-colors ${
                                        isDark ? "text-white" : "text-zinc-950"
                                      }`}
                                    >
                                      {link.title}
                                    </h3>
                                    {link.description && (
                                      <p
                                        className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                                          isDark ? "text-zinc-500" : "text-zinc-400"
                                        }`}
                                      >
                                        {link.description}
                                      </p>
                                    )}
                                  </div>
                                  <ArrowUpRight
                                    className={`h-4 w-4 shrink-0 transition-all duration-300 transform group-hover:rotate-45 group-hover:text-[#fd5200] ${
                                      isDark ? "text-zinc-600" : "text-zinc-400"
                                    }`}
                                  />
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Footer sticky={false} />
    </main>
  );
}
