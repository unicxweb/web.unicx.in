"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const systems = [
  {
    title: "Graphic Design",
    description:
      "UI/UX, infographics, web design, mobile app design, logo systems, and brand graphics.",
    items: ["UI/UX", "Brand", "Web", "Mobile"],
    href: "/services/graphic-design",
  },
  {
    title: "Marketing",
    description:
      "SEO, paid ads, social campaigns, and channel strategy built to convert attention into demand.",
    items: ["SEO", "Paid Ads", "Social", "Strategy"],
    href: "/services/marketing",
  },
  {
    title: "App Development",
    description:
      "Android, iOS, hybrid apps, and PWAs shaped around usability, performance, and scale.",
    items: ["Android", "iOS", "Hybrid", "PWA"],
    href: "/services/app-development",
  },
  {
    title: "Website Development",
    description:
      "Static sites, dynamic builds, ecommerce platforms, landing pages, and custom web solutions.",
    items: ["Static", "Dynamic", "Ecommerce", "Custom"],
    href: "/services/website-development",
  },
];

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

function LayersIcon() {
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
      <path d="m12 3 9 4.5-9 4.5L3 7.5 12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </svg>
  );
}

export function Systems() {
  return (
    <section id="services" className="pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end"
      >
        <div className="max-w-xl">
          <div className="section-label">Services</div>
          <h2 className="max-w-[25rem] text-[clamp(2.15rem,4.6vw,3.8rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white">
            Four service pillars. One connected digital partner.
          </h2>
        </div>

        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-[15px] leading-8 text-slate-400 sm:text-[17px]">
            From brand identity and growth marketing to apps and websites,
            UNICX brings strategy, execution, and polish into one clear delivery
            model.
          </p>
          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition hover:text-slate-300"
            >
              <LayersIcon />
              Explore all services
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {systems.map((system, index) => (
          <motion.article
            key={system.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group"
          >
            <div className="soft-border relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)] transition hover:border-white/20 hover:bg-white/[0.05]">
              <Link href={system.href} className="flex flex-col">
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      0{index + 1}
                    </div>
                    <span className="text-slate-500 transition group-hover:text-slate-300">
                      <ArrowRightIcon />
                    </span>
                  </div>

                  <h3 className="mt-6 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                    {system.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-400">
                    {system.description}
                  </p>
                  
                  <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {system.items.map((item) => (
                      <div key={item} className="rounded-full border border-white/20 bg-white/[0.03] px-1 py-2 text-[11px] font-medium text-white text-center min-w-0">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
