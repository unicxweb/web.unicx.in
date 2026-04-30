"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { MediaFrame } from "@/components/MediaFrame";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function CareersClient() {
  const code = `const developer = {
  skills: ['React', 'TypeScript'],
  passion: 'building',
  ready: true
};`;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <div className="noise-overlay" />
      <Navbar />

      {/* Hero Section - Refined for Careers */}
      <section
        className="relative -mx-6 grid min-h-[calc(100svh-6rem)] items-center gap-8 bg-black px-6 pt-8 pb-6 sm:-mx-8 sm:px-8 sm:pt-12 sm:pb-8 md:min-h-[calc(100svh-7rem)] md:gap-8 md:pt-10 md:pb-6 lg:-mx-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-12 lg:px-12 lg:pt-16 lg:pb-10 overflow-hidden"
      >
        {/* Large Background Watermark */}
        <div 
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '-2%',
            left: '-2%',
            fontSize: '200px',
            fontWeight: 'bold',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            zIndex: 0,
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: '1',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            color: 'transparent'
          }}
        >
          CAREERS
        </div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md lg:max-w-lg order-1 lg:order-2 lg:z-10 hidden lg:block"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 blur-3xl" />
            
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
              style={{
                perspective: '1200px'
              }}
            >
              <div 
                className="relative w-full h-96 lg:left-[15%] md:left-[10%] sm:left-[5%] left-[0%] lg:h-96 md:h-80 sm:h-72 h-64"
                style={{
                  transform: 'rotateY(-3deg) rotateX(1deg) translateX(20px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Graphic Design Card */}
                <motion.div 
                  className="absolute top-0 left-0 lg:w-72 lg:h-48 md:w-56 md:h-40 sm:w-48 sm:h-32 w-40 h-28 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-0 saturate-[180%] p-4 lg:p-4 md:p-3 sm:p-2 p-2"
                  style={{
                    transform: 'translateZ(0px) translateX(350px) translateY(10px) rotateY(-5deg) rotateX(2deg)',
                    backfaceVisibility: 'hidden',
                    border: '1px solid transparent',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backgroundClip: 'padding-box',
                    zIndex: 20
                  }}
                  animate={{ 
                    scale: 1,
                    rotateY: -5,
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeOut",
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }
                  }}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[12px] font-bold text-white tracking-wide">Graphic Design</div>
                      <div className="text-[8px] text-slate-500 uppercase tracking-wider mt-0.5">Visual Creative</div>
                    </div>
                    <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">Design Stack</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-white/90">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                        <span>Brand Identity</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-white/90">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                        <span>Typography</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-white/90">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        <span>Digital Assets</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-1">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                  </div>
                </motion.div>

                {/* Digital Marketing Card */}
                <motion.div 
                  className="absolute top-8 right-0 lg:w-64 lg:h-40 md:w-52 md:h-32 sm:w-44 sm:h-28 w-36 h-24 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-0 saturate-[180%] p-4 lg:p-4 md:p-3 sm:p-2 p-2"
                  style={{
                    transform: 'translateZ(40px) translateX(370px) translateY(-20px) rotateY(3deg) rotateX(-1deg)',
                    backfaceVisibility: 'hidden',
                    border: '1px solid transparent',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backgroundClip: 'padding-box',
                    zIndex: 25
                  }}
                  animate={{ 
                    scale: 1,
                    rotateY: 3,
                    y: [0, -12, 0]
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeOut",
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[12px] font-bold text-white tracking-wide">Digital Marketing</div>
                      <div className="text-[8px] text-slate-500 uppercase tracking-wider mt-0.5">Growth Engine</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-bold text-green-400">+120%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">Performance</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 rounded p-1.5 border border-white/5">
                        <div className="text-[8px] text-slate-400 uppercase">ROAS</div>
                        <div className="text-[10px] font-bold text-green-400">4.5x</div>
                      </div>
                      <div className="bg-black/30 rounded p-1.5 border border-white/5">
                        <div className="text-[8px] text-slate-400 uppercase">Reach</div>
                        <div className="text-[10px] font-bold text-blue-400">+120%</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 text-[7px] bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">SEO</span>
                    <span className="px-1.5 py-0.5 text-[7px] bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Meta</span>
                    <span className="px-1.5 py-0.5 text-[7px] bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">Google</span>
                  </div>
                </motion.div>

                {/* Web Development Card */}
                <motion.div 
                  className="absolute bottom-0 left-12 lg:w-56 lg:h-64 md:w-48 md:h-52 sm:w-40 sm:h-44 w-32 h-36 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-0 saturate-[180%] p-4 lg:p-4 md:p-3 sm:p-2 p-2"
                  style={{
                    transform: 'translateZ(20px) translateX(370px) translateY(-30px) rotateY(2deg) rotateX(3deg)',
                    backfaceVisibility: 'hidden',
                    border: '1px solid transparent',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backgroundClip: 'padding-box',
                    zIndex: 30
                  }}
                  animate={{ 
                    scale: 1,
                    rotateY: 2,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeOut",
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[12px] font-bold text-white tracking-wide">Web Development</div>
                      <div className="text-[8px] text-slate-500 uppercase tracking-wider mt-0.5">Code & Deploy</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-[8px] text-green-400 font-medium">Live</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">Code</div>
                    <div className="bg-black/40 rounded p-1.5 border border-white/5 font-mono">
                      <div className="text-[8px] text-slate-300">
                        <span className="text-blue-400">const</span> <span className="text-yellow-300">build</span> = () {'{'}
                      </div>
                      <div className="text-[8px] text-slate-300 ml-2 mt-0.5">
                        <span className="text-blue-400">return</span> <span className="text-green-400">success</span>;
                      </div>
                      <div className="text-[8px] text-slate-300">
                        {'}'};
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex flex-wrap gap-1">
                      <span className="px-1 py-0.5 text-[7px] bg-gray-800 text-gray-300 rounded border border-gray-600">Next.js</span>
                      <span className="px-1 py-0.5 text-[7px] bg-blue-900/50 text-blue-300 rounded border border-blue-700">TS</span>
                      <span className="px-1 py-0.5 text-[7px] bg-cyan-900/50 text-cyan-300 rounded border border-cyan-700">Tailwind</span>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/10 rounded px-1.5 py-0.5 border border-green-500/20">
                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                      <span className="text-[8px] text-green-400 font-medium">Build Success</span>
                    </div>
                  </div>
                </motion.div>

                {/* App Development Card */}
                <motion.div 
                  className="absolute bottom-4 right-8 lg:w-56 lg:h-40 md:w-48 md:h-32 sm:w-40 sm:h-28 w-32 h-24 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-0 saturate-[180%] p-4 lg:p-4 md:p-3 sm:p-2 p-2"
                  style={{
                    transform: 'translateZ(60px) translateX(350px) translateY(-10px) rotateY(-3deg) rotateX(-2deg)',
                    backfaceVisibility: 'hidden',
                    border: '1px solid transparent',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backgroundClip: 'padding-box',
                    zIndex: 35
                  }}
                  animate={{ 
                    scale: 1,
                    rotateY: -3,
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeOut",
                    y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                  }}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-[11px] font-bold text-white tracking-wide">App Development</div>
                      <div className="text-[7px] text-slate-500 uppercase tracking-wider mt-0.5">Mobile Solutions</div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[8px] text-slate-400 uppercase tracking-wider font-medium">Platforms</div>
                    <div className="bg-black/40 rounded p-1.5 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex gap-0.5">
                          <div className="w-2 h-1.5 bg-blue-500 rounded-sm"></div>
                          <div className="w-2 h-1.5 bg-gray-600 rounded-sm"></div>
                          <div className="w-2 h-1.5 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-[7px] text-yellow-400 font-bold">4.9/5</span>
                      </div>
                      <div className="text-[7px] text-slate-400">App Store Rating</div>
                    </div>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-0.5">
                    <span className="px-0.5 py-0.5 text-[6px] bg-gray-800 text-gray-300 rounded border border-gray-600">iOS</span>
                    <span className="px-0.5 py-0.5 text-[6px] bg-green-900/50 text-green-300 rounded border border-green-700">Android</span>
                    <span className="px-0.5 py-0.5 text-[6px] bg-purple-900/50 text-purple-300 rounded border border-purple-700">Hybrid</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        {/* Mobile Service Cards Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto">
          {[
            {
              title: "Graphic Design",
              icon: "palette",
              color: "purple",
              items: ["Brand Identity", "Typography", "Digital Assets"]
            },
            {
              title: "Digital Marketing",
              icon: "chart",
              color: "blue", 
              items: ["ROAS: 4.5x", "Reach: +120%", "SEO & Ads"]
            },
            {
              title: "Web Development",
              icon: "code",
              color: "green",
              items: ["Next.js", "TypeScript", "Build Success"]
            },
            {
              title: "App Development", 
              icon: "mobile",
              color: "cyan",
              items: ["iOS & Android", "4.9/5 Rating", "Hybrid Apps"]
            }
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-xl border border-white/20 bg-black/40 backdrop-blur-0 p-4 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[11px] font-bold text-white tracking-wide">{service.title}</div>
                  <div className="text-[7px] text-slate-500 uppercase tracking-wider mt-0.5">
                    {service.title === 'Graphic Design' && 'Visual Creative'}
                    {service.title === 'Digital Marketing' && 'Growth Engine'}
                    {service.title === 'Web Development' && 'Code & Deploy'}
                    {service.title === 'App Development' && 'Mobile Solutions'}
                  </div>
                </div>
                <div className={`w-3 h-3 bg-gradient-to-br from-${service.color}-500 to-${service.color}-400 rounded-full`}></div>
              </div>
              <div className="space-y-2">
                <div className="text-[8px] text-slate-400 uppercase tracking-wider font-medium">Features</div>
                <div className="space-y-1.5">
                  {service.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-white/90">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-${service.color}-400 to-${service.color}-500 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl lg:max-w-2xl order-1 lg:order-2 lg:text-right"
        >
          <div className="section-label">Careers</div>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
            Shape What's Next in Digital.
          </h1>
          <p className="mt-6 text-[15px] leading-7 text-slate-400 sm:text-[17px] sm:leading-8">
            Join a team of creators, innovators, and problem-solvers building exceptional digital experiences. 
            We're looking for passionate talent ready to make their mark.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:justify-end">
            <Link
              href="#positions"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <ArrowRightIcon />
              Explore Opportunities
            </Link>
            <Link
              href="#culture"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400 transition hover:text-white"
            >
              Our Culture
              <ArrowRightIcon />
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-2 pt-4 sm:px-8 md:pt-6 lg:px-12">

        {/* Create, collaborate, and go live - Service Pillars */}
        <section className="pt-24 sm:pt-32 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-6">
              Create, collaborate, and go live
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive service pillars help you build, launch, and scale your digital presence with confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-12">
            {[
              {
                title: "Design",
                description: "UI/UX, infographics, web design, and brand graphics.",
                preview: "Figma Interface",
                color: "purple"
              },
              {
                title: "Marketing", 
                description: "SEO, paid ads, and social campaigns built to convert.",
                preview: "Analytics Dashboard",
                color: "blue"
              },
              {
                title: "App Development",
                description: "Android, iOS, and hybrid apps built for scale.",
                preview: "Mobile Interface",
                color: "green"
              },
              {
                title: "Website Development",
                description: "Static, dynamic, and ecommerce solutions.",
                preview: "Web Platform",
                color: "orange"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ 
                  y: -8,
                  borderColor: service.color === 'purple' ? '#9333ea' : 
                               service.color === 'blue' ? '#3b82f6' :
                               service.color === 'green' ? '#10b981' : '#f97316',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                className="group bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl"
              >
                {/* Typography Section */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold italic text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group"
                  >
                    Learn More
                    <svg 
                      className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Interactive Preview */}
                <div className="relative">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      {/* Window Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="ml-auto text-xs text-gray-500 font-medium">
                          {service.preview}
                        </div>
                      </div>
                      
                      {/* Content Preview */}
                      <div className="space-y-2">
                        {service.title === "Design" && (
                          <>
                            <div className="h-2 bg-purple-200 rounded w-3/4"></div>
                            <div className="h-2 bg-purple-100 rounded w-1/2"></div>
                            <div className="flex gap-2 mt-3">
                              <div className="w-8 h-8 bg-purple-300 rounded"></div>
                              <div className="w-8 h-8 bg-purple-200 rounded"></div>
                              <div className="w-8 h-8 bg-purple-100 rounded"></div>
                            </div>
                          </>
                        )}
                        {service.title === "Marketing" && (
                          <>
                            <div className="grid grid-cols-3 gap-1">
                              <div className="h-8 bg-blue-200 rounded"></div>
                              <div className="h-12 bg-blue-300 rounded"></div>
                              <div className="h-6 bg-blue-100 rounded"></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                              <span>Mon</span>
                              <span>Sun</span>
                            </div>
                          </>
                        )}
                        {service.title === "App Development" && (
                          <>
                            <div className="bg-gray-100 rounded-lg p-2">
                              <div className="flex gap-1 mb-2">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              </div>
                              <div className="space-y-1">
                                <div className="h-1 bg-green-300 rounded w-full"></div>
                                <div className="h-1 bg-green-200 rounded w-3/4"></div>
                                <div className="h-1 bg-green-100 rounded w-1/2"></div>
                              </div>
                            </div>
                          </>
                        )}
                        {service.title === "Website Development" && (
                          <>
                            <div className="space-y-1">
                              <div className="h-2 bg-orange-200 rounded"></div>
                              <div className="h-2 bg-orange-100 rounded w-5/6"></div>
                              <div className="h-2 bg-orange-50 rounded w-4/6"></div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <div className="px-2 py-1 bg-orange-100 rounded text-xs">Home</div>
                              <div className="px-2 py-1 bg-orange-50 rounded text-xs">About</div>
                              <div className="px-2 py-1 bg-orange-50 rounded text-xs">Contact</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions - Inspired by Capabilities.tsx */}
        <section id="positions" className="pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end"
          >
            <div className="max-w-xl">
              <div className="section-label">Open Positions</div>
              <h2 className="max-w-[24rem] text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
                Join our talented team.
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-[15px] leading-8 text-slate-400 sm:text-[17px]">
                We're looking for passionate individuals who want to make an impact 
                and grow with us in a collaborative, remote-first environment.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition hover:text-slate-300"
                >
                  Don't see a fit? Reach out
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 border-t border-white/10">
            {[
              {
                eyebrow: "Engineering",
                title: "Senior Frontend Developer",
                description: "Lead our web development projects and mentor junior developers while building exceptional user experiences with React and Next.js.",
                requirements: [
                  "5+ years of experience with React and modern JavaScript",
                  "Strong Next.js and TypeScript skills",
                  "Experience with responsive design and CSS frameworks",
                  "Knowledge of web performance optimization"
                ],
                type: "Full-time | Remote"
              },
              {
                eyebrow: "Design",
                title: "UI/UX Designer",
                description: "Create beautiful, user-friendly interfaces for our clients' websites and work closely with developers to bring designs to life.",
                requirements: [
                  "3+ years of UI/UX design experience",
                  "Proficiency in Figma, Adobe XD, or similar tools",
                  "Strong understanding of web design principles",
                  "Portfolio of previous web design projects"
                ],
                type: "Full-time | Remote"
              },
              {
                eyebrow: "Engineering",
                title: "Full Stack Developer",
                description: "Handle both frontend and backend development for our web applications and e-commerce solutions with modern tech stack.",
                requirements: [
                  "4+ years of full stack development experience",
                  "Strong React/Next.js and Node.js skills",
                  "Experience with databases and APIs",
                  "Knowledge of cloud platforms and deployment"
                ],
                type: "Full-time | Remote"
              }
            ].map((position, index) => (
              <motion.article
                key={position.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-white/10 py-10 sm:py-12"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] lg:items-start">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {position.eyebrow}
                    </div>
                    <h3 className="mt-4 max-w-md text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {position.title}
                    </h3>
                    <p className="mt-2 text-slate-500 text-sm">
                      {position.type}
                    </p>
                  </div>

                  <div>
                    <p className="max-w-2xl text-[15px] leading-7 text-slate-400">
                      {position.description}
                    </p>
                    <div className="mt-7">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Requirements:</h4>
                        <div className="space-y-2">
                          {position.requirements.map((req) => (
                            <div
                              key={req}
                              className="flex items-start gap-2 text-[13px] font-medium leading-6 text-slate-200"
                            >
                              <span className="text-slate-500 mt-0.5">
                                <CheckIcon />
                              </span>
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link
                          href="/contact"
                          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Culture Section - Grid Layout */}
        <section className="pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <div className="section-label mb-7">Culture</div>
            <h2 className="max-w-[24rem] mx-auto text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
              How We Work Together
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-[15px] leading-8 text-slate-400 sm:text-[17px]">
              Our culture is built on collaboration, trust, and the shared passion for creating exceptional digital experiences.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {[
              {
                title: "Collaborative Environment",
                description: "We believe in teamwork and open communication. Our team works closely together to solve challenges and share knowledge, creating an environment where everyone can thrive."
              },
              {
                title: "Work-Life Balance",
                description: "We understand the importance of balance between work and personal life. Flexible schedules and remote work options help our team maintain productivity while enjoying life."
              },
              {
                title: "Continuous Learning",
                description: "Technology evolves constantly, and so do we. We provide learning resources, training opportunities, and time for professional development."
              },
              {
                title: "Impact-Driven Work",
                description: "Every project we work on makes a real difference for our clients. See your skills translate into beautiful, functional websites that help businesses grow."
              }
            ].map((culture, index) => (
              <motion.div
                key={culture.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="panel soft-border p-8"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">{culture.title}</h3>
                <p className="text-[15px] leading-7 text-slate-400">
                  {culture.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <CTA />
        <Footer />
      </div>
    </main>
  );
}
