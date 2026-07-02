"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobSeekerPopup } from "@/components/JobSeekerPopup";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

/* ─── Canonical easing curves (from style guide) ─── */
const ease = {
  ui: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hero: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

/* ─── Shared Icons ─── */
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
      className="mt-0.5 h-4 w-4 shrink-0"
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

/* ─── Data ─── */
const pillars = [
  {
    number: "01",
    title: "Design System",
    description:
      "Creating highly detailed Figma files, responsive layouts, and interactive motion systems that define every touchpoint.",
    tag: "Figma · UI/UX",
  },
  {
    number: "02",
    title: "Core Web Stack",
    description:
      "Writing clean, modular TypeScript, Next.js code, and highly structured animations with Framer Motion and GSAP.",
    tag: "Next.js · TypeScript",
  },
  {
    number: "03",
    title: "App Engineering",
    description:
      "Native iOS/Android, hybrid platforms, and PWAs built to scale for high loads and seamless cross-platform experiences.",
    tag: "React Native · Swift",
  },
  {
    number: "04",
    title: "Data-Backed Growth",
    description:
      "Clean conversion paths, technical SEO, and metrics monitoring to build client confidence and measurable outcomes.",
    tag: "Analytics · SEO",
  },
];

const positions = [
  {
    eyebrow: "Design",
    title: "Lead UI/UX Designer",
    description:
      "Lead visual direction and product interface design. Create high-fidelity design prototypes, layouts, and motion guidelines, while maintaining consistency with our client's brand criteria.",
    requirements: [
      "3+ years of experience designing premium websites/products",
      "Outstanding layout, typography, and visual pacing skills in Figma",
      "Experience preparing clean developer-handoff specifications",
      "An excellent online portfolio illustrating detailed interface work",
    ],
    type: "Full-time · Remote",
  },
  {
    eyebrow: "Engineering",
    title: "Senior Frontend Developer",
    description:
      "Build premium digital interfaces and interactive client-facing websites. Collaborate directly with designers to implement motion frameworks and maintain a scalable UI design system.",
    requirements: [
      "4+ years of professional experience with React & Next.js",
      "Advanced TypeScript skills and CSS-in-JS/Tailwind foundations",
      "Hands-on experience with Framer Motion, GSAP, or WebGL",
      "Deep understanding of core web vitals and speed optimization",
    ],
    type: "Full-time · Remote",
  },
  {
    eyebrow: "Engineering",
    title: "Backend Engineer",
    description:
      "Architect secure APIs, design responsive backend structures, and develop flexible database foundations supporting dynamic user interfaces and complex web solutions.",
    requirements: [
      "3+ years of backend experience (Node.js, Go, or Python)",
      "Solid database design and query optimization (PostgreSQL, Redis)",
      "Experience with serverless architecture and cloud deployments (AWS/GCP)",
      "Strong practices surrounding REST/GraphQL API design and security",
    ],
    type: "Full-time · Remote",
  },
  {
    eyebrow: "AI / ML",
    title: "AI / ML Engineer",
    description:
      "Design, implement, and deploy production-grade machine learning models and LLM integrations. Build intelligent agents, semantic search tools, and workflow automation services.",
    requirements: [
      "2+ years of experience working with LLMs, prompt engineering, and fine-tuning",
      "Proficient in Python, PyTorch, LangChain, or LlamaIndex",
      "Experience with vector databases (Pinecone, pgvector) and embedding pipelines",
      "Familiarity with building API layers to serve real-time model inferences",
    ],
    type: "Full-time · Remote",
  },
  {
    eyebrow: "Creative",
    title: "Graphic Designer",
    description:
      "Define visual identities, social media campaigns, and marketing assets. Turn abstract brand strategies into stunning layouts, custom illustrations, and digital artwork.",
    requirements: [
      "Proficient in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Strong sense of typography, composition, and color theory",
      "Experience creating vectors, brand guidelines, and client presentations",
      "Ability to translate complex tech concepts into clean, accessible visuals",
    ],
    type: "Full-time · Remote",
  },
  {
    eyebrow: "Growth",
    title: "Business Development Associate (BDA)",
    description:
      "Identify new business leads, cultivate client relationships, and drive agency growth. Pitch high-end design and engineering solutions to founders and product teams.",
    requirements: [
      "Excellent written and verbal communication skills",
      "Familiarity with digital agency services, web stack terminology, and design workflows",
      "Experience in B2B outbound outreach, lead generation, and closing deals",
      "Ability to prepare compelling proposals and project scopes",
    ],
    type: "Full-time · Remote",
  },
];

const cultureItems = [
  {
    title: "Collaborative Focus",
    description:
      "We work directly with founders and teams to design, code, and deploy. Our style relies on async-first, clean handoffs, and eliminating unnecessary alignment meetings.",
  },
  {
    title: "Complete Autonomy",
    description:
      "Enjoy flexible schedules, remote freedom, and no micro-management. We trust our developers and designers to own their outcomes and deliver high-standard work.",
  },
  {
    title: "Craftsmanship Evolved",
    description:
      "We dedicate time to visual research, codebase refactoring, and learning modern animation techniques. If you want to refine your digital skills, this is your place.",
  },
  {
    title: "Client-Centric Impact",
    description:
      "We don't build generic corporate frameworks. We design and launch optimized marketing pipelines and tailored web solutions that drive real visual prestige.",
  },
];

const stats = [
  { label: "Projects delivered", value: "150+" },
  { label: "Team members", value: "24" },
  { label: "Service pillars", value: "5" },
  { label: "Client retention", value: "94%" },
];

/* ─── Expandable Position Card ─── */
function PositionCard({
  position,
  index,
  isExpanded,
  onToggle,
}: {
  position: (typeof positions)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: ease.ui }}
      className={`border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.01] ${index === 0 ? "border-t" : ""}`}
    >
      {/* Clickable header row */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-8 text-left sm:py-10 group"
      >
        <div className="flex-1">
          <h3 className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-light tracking-tight text-white transition-all duration-300 group-hover:text-zinc-300 group-hover:underline">
            {position.title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[13px] sm:text-[14px] font-normal tracking-wide text-zinc-500 group-hover:text-zinc-400 transition-colors">
            {position.type}
          </span>
          <svg
            className="h-4 w-4 text-zinc-500 transition-all duration-300 transform origin-center group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </button>

      {/* Expandable details */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: ease.hero }}
        className="overflow-hidden"
      >
        <div className="pb-10 sm:pb-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <p className="max-w-lg text-[14px] leading-7 text-slate-400 sm:text-[15px]">
                {position.description}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white mb-5">
                Requirements
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {position.requirements.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-2.5 text-[13px] leading-6 text-slate-300"
                  >
                    <CheckIcon />
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <JobSeekerPopup defaultPosition={position.title} asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-slate-200"
                  >
                    Apply Now
                    <ArrowRightIcon />
                  </button>
                </JobSeekerPopup>
                <JobSeekerPopup defaultPosition={position.title} asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-1 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 transition hover:text-white"
                  >
                    Ask a Question
                    <ArrowRightIcon />
                  </button>
                </JobSeekerPopup>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */
export function CareersClient() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fafafa]">
      <div className="noise-overlay opacity-30 pointer-events-none" />
      <Navbar />

      <div className="font-sans">

      {/* ═══════════════════════════════════════════════════
         LIGHT-THEMED HERO SECTION
         ═══════════════════════════════════════════════════ */}
      <section className="relative w-full px-6 pt-40 pb-20 sm:px-8 sm:pt-52 sm:pb-28 lg:px-12 lg:pt-60 lg:pb-32 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-6xl">
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: ease.ui }}
              className="text-[clamp(2.5rem,6.8vw,5rem)] font-medium leading-[1.05] tracking-tight text-zinc-950"
            >
              Explore Exciting Opportunities at UNICX Studio
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: ease.ui }}
              className="mt-12 text-[clamp(1.5rem,3.2vw,2.2rem)] font-medium leading-snug tracking-tight text-zinc-900 max-w-5xl"
            >
              We believe in fostering a dynamic and collaborative work environment that empowers our team to create digital excellence.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: ease.ui }}
              className="mt-8 text-[14px] sm:text-[15px] font-normal leading-relaxed text-zinc-500 max-w-2xl"
            >
              Join us on this journey of creativity, growth, and meaningful impact.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         WORKPLACE GALLERY SECTION (Masonry collage)
         ═══════════════════════════════════════════════════ */}
      <section className="relative w-full pb-24 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Asymmetrical masonry grid of workplace images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, ease: ease.ui }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-zinc-200 shadow-sm"
              >
                <img
                  src="/careers/optimized/yibei-geng.webp"
                  alt="Modern collaborative workspace layout"
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-[1.03]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: ease.ui }}
                className="relative aspect-[2/3] w-full overflow-hidden rounded-none bg-zinc-200 shadow-sm"
              >
                <img
                  src="/careers/optimized/alesia-kazantceva.webp"
                  alt="Creative brainstorming session with post-it notes"
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-[1.03]"
                />
              </motion.div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, ease: ease.ui }}
                className="relative aspect-[2/3] w-full overflow-hidden rounded-none bg-zinc-200 shadow-sm"
              >
                <img
                  src="/careers/optimized/ergonofis.webp"
                  alt="Minimalist and ergonomic engineering workstation"
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-[1.03]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: ease.ui }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-zinc-200 shadow-sm"
              >
                <img
                  src="/careers/optimized/alesia-kazantceva-1.webp"
                  alt="Team sync and collaborative whiteboard discussion"
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-[1.03]"
                />
              </motion.div>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, ease: ease.ui }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-zinc-200 shadow-sm"
              >
                <img
                  src="/careers/optimized/luca-bravo.webp"
                  alt="High-standard developer workstation and multi-monitor setup"
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-[1.03]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: ease.ui }}
                className="relative aspect-[2/3] w-full overflow-hidden rounded-none bg-zinc-200 shadow-sm"
              >
                <img
                  src="/careers/optimized/nrd.webp"
                  alt="Focused developer coding on a modern laptop setup"
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-[1.03]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         DARK-THEMED SECTIONS
         ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 bg-black text-white pt-24 md:pt-36">
        {/* Environment - Why Join Us */}
        <section className="relative flex w-full flex-col px-6 pb-2 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl w-full">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              {/* Left — Heading block */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: ease.ui }}
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500"
                >
                  <span className="section-dot" />
                  <span>Environment</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 1, delay: 0.1, ease: ease.ui }}
                  className="mt-6 text-[clamp(2rem,4.5vw,3.8rem)] font-bold uppercase leading-[0.92] tracking-tight text-white"
                >
                  Where Quality Meets Autonomy
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: ease.ui }}
                  className="mt-6 max-w-xl text-[14px] leading-7 text-zinc-400 sm:text-[15px]"
                >
                  We structure our workflows around high visual craftsmanship, clean codebase foundations, and remote-first freedom.
                </motion.p>
              </div>

              {/* Right — Subtle intro */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.85, delay: 0.16, ease: ease.ui }}
                className="max-w-lg text-[15px] leading-8 text-zinc-400 sm:text-base lg:justify-self-end"
              >
                Every pillar of our studio is designed to attract and nurture specialists who care about precision, quality, and the long-term growth of their craft.
              </motion.p>
            </div>

            {/* Pillar Cards */}
            <div className="mt-14 grid grid-cols-1 gap-[1px] overflow-hidden rounded-none border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: ease.ui,
                  }}
                  className="flex flex-col justify-between bg-black p-7 sm:p-8 transition-colors duration-300 hover:bg-white/[0.015]"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-500">
                        {pillar.tag}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-zinc-600">
                        {pillar.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white tracking-[-0.02em]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Subtle bottom accent line */}
                  <div className="mt-8 h-px w-12 bg-white/15" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           CURRENT OPENINGS
           ═══════════════════════════════════════════════════ */}
        <section
          id="positions"
          className="mx-auto max-w-7xl w-full px-6 pt-24 pb-12 sm:px-8 lg:px-12 scroll-mt-28"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, ease: ease.ui }}
              className="flex items-center gap-6"
            >
              <div className="h-12 w-[3px] bg-[#fd5200] rotate-[15deg] transform origin-center shrink-0" />
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-none tracking-tight text-white">
                Current openings
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.85, delay: 0.16, ease: ease.ui }}
              className="max-w-md lg:text-right"
            >
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-zinc-400">
                If you think you might be a good fit for our team, we'd love to hear from you!
              </p>
            </motion.div>
          </div>

          {/* Positions Accordion */}
          <div className="mt-12 pl-0 md:pl-[13%] lg:pl-[16%]">
            {positions.map((position, index) => (
              <PositionCard
                key={position.title}
                position={position}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════
         WHY JOIN UNICX STUDIO SECTION (Light Theme)
         ═══════════════════════════════════════════════════ */}
      <section className="relative w-full py-24 sm:py-32 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: ease.ui }}
            className="text-[clamp(2.5rem,5.5vw,4.2rem)] font-light leading-none tracking-tight text-zinc-950"
          >
            Why Join UNICX Studio?
          </motion.h2>

          {/* Three columns grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-t border-zinc-200/80 pt-16">
            {/* Innovative Work Environment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: ease.ui }}
            >
              <h3 className="text-xl sm:text-2xl font-light text-zinc-950 tracking-tight">Innovative Work Environment</h3>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-zinc-500">
                Immerse yourself in a culture of innovation, where your ideas are not just welcomed but encouraged. UNICX Studio is a place where creativity flourishes.
              </p>
            </motion.div>

            {/* Career Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: ease.ui }}
            >
              <h3 className="text-xl sm:text-2xl font-light text-zinc-950 tracking-tight">Career Growth</h3>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-zinc-500">
                We invest in our team's professional development. From workshops to mentorship programs, we are committed to helping you reach your career goals.
              </p>
            </motion.div>

            {/* Collaborative Team */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3, ease: ease.ui }}
            >
              <h3 className="text-xl sm:text-2xl font-light text-zinc-950 tracking-tight">Collaborative Team</h3>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-zinc-500">
                Join a team that values collaboration. We believe that great ideas come from diverse minds working together towards a common vision.
              </p>
            </motion.div>
          </div>

          {/* Testimonial Quote */}
          <div className="mt-28 md:mt-36 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 items-start border-t border-zinc-200/80 pt-20">
            <div className="flex items-center gap-2 pt-2">
              <span className="section-dot" />
              <span className="text-[14px] font-normal tracking-wide text-zinc-500">
                What Our Team Says
              </span>
            </div>
            <div className="space-y-12 w-full">
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.1, ease: ease.ui }}
                className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-light text-zinc-900 leading-snug tracking-tight"
              >
                "Working at UNICX Studio has been a transformative experience. The collaborative atmosphere and challenging projects have fueled my growth."
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2, ease: ease.ui }}
                className="flex items-end justify-between gap-6 pt-4"
              >
                <div className="space-y-2">
                  <div className="text-2xl font-light text-zinc-950">Abhishek Tripathi</div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                    <span className="section-dot" />
                    <span>Visual Director</span>
                  </div>
                </div>
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-none bg-transparent shrink-0">
                  <img
                    src="/images/optimized/US.3.webp"
                    alt="Abhishek Tripathi"
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Careers CTA (Dark background) ── */}
      <div className="bg-black text-white">
        <section
          id="join-cta"
          className="py-24 sm:py-32 bg-black relative z-10 px-[5vw]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.24, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: ease.ui }}
            className="relative overflow-hidden rounded-none bg-white px-7 py-12 sm:px-12 sm:py-16"
          >
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="section-label mb-4 text-zinc-500 before:!bg-black/20">Careers</div>
                <h2 className="text-4xl font-semibold uppercase tracking-tight text-zinc-950 sm:text-5xl md:text-6xl">
                  Shape the future of digital products.
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-8 text-zinc-600 sm:text-base">
                  We are always looking for passionate designers, developers, and creatives to join our remote-first team. Apply to one of our open roles or send a general application today.
                </p>
              </div>

              <div className="relative inline-flex w-full sm:w-auto">
                <JobSeekerPopup defaultPosition="General Application" asChild>
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-none bg-black px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-white transition hover:bg-zinc-800"
                  >
                    <span className="relative z-10">
                      <ArrowRightIcon />
                    </span>
                    <span className="relative z-10">Apply Now</span>
                  </button>
                </JobSeekerPopup>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      </div>

      <Footer />
    </main>
  );
}
