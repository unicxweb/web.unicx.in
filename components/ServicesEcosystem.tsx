"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ServicesEcosystem() {
  const scrollCatalogTabsIntoView = () => {
    const tabsElement = document.getElementById("service-catalog-tabs");

    if (!tabsElement) {
      return;
    }

    const desiredTop =
      window.innerWidth >= 1536
        ? 228
        : window.innerWidth >= 1280
          ? 210
          : window.innerWidth >= 1024
            ? 180
            : window.innerWidth >= 640
              ? 160
              : 112;
    const targetTop =
      window.scrollY + tabsElement.getBoundingClientRect().top - desiredTop;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  };

  const handleCatalogJump = (
    event: React.MouseEvent<HTMLDivElement>,
    href: string
  ) => {
    event.preventDefault();
    window.history.replaceState(null, "", href);
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollCatalogTabsIntoView);
    });
  };

  return (
    <section id="service-ecosystem" className="pt-20 sm:pt-28 lg:pt-36 2xl:pt-40 flex flex-col">
      <ScrollReveal amount={0.24}>
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-2 flex items-center gap-2">
              <span className="section-dot" />
              <span>Capabilities</span>
            </div>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              Service ecosystem
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-8 text-slate-400 sm:text-base lg:justify-self-end">
            Five connected service areas mapped as a single capability system,
            aligned with the same structured delivery rhythm clients can expect.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <ScrollReveal className="rounded-none lg:col-span-3 overflow-hidden" amount={0.1}>
          <BentoCard
            eyebrow="Creative"
            title="Graphic Design"
            description="UI/UX, branding, motion, and presentation systems."
            graphic={
              <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png)] bg-cover bg-center" />
            }
            className="w-full h-full"
            onClick={(e) => handleCatalogJump(e, "#service-1")}
          />
        </ScrollReveal>

        <ScrollReveal className="rounded-none lg:col-span-3 overflow-hidden" amount={0.1} delay={0.06}>
          <BentoCard
            eyebrow="Web"
            title="Website Development"
            description="Ecommerce, landing pages, and custom systems."
            graphic={
              <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png)] bg-cover bg-center" />
            }
            className="w-full h-full"
            onClick={(e) => handleCatalogJump(e, "#service-2")}
          />
        </ScrollReveal>

        <ScrollReveal className="rounded-none lg:col-span-2 overflow-hidden" amount={0.1} delay={0.12}>
          <BentoCard
            eyebrow="Mobile"
            title="App Development"
            description="Android, iOS, hybrid, and PWA product experiences."
            graphic={
              <div className="absolute inset-0 -top-10 lg:-top-20 lg:-left-60 bg-[url(https://framerusercontent.com/images/gR21e8Wh6l3pU6CciDrqt8wjHM.png)] bg-center lg:bg-left bg-no-repeat bg-contain bg-black" />
            }
            className="w-full h-full"
            onClick={(e) => handleCatalogJump(e, "#service-3")}
          />
        </ScrollReveal>

        <ScrollReveal className="rounded-none lg:col-span-2 overflow-hidden" amount={0.1} delay={0.18}>
          <BentoCard
            eyebrow="Enterprise"
            title="Software Development"
            description="CRM, ERP, and SaaS systems for structured operations."
            graphic={
              <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/PTO3RQ3S65zfZRFEGZGpiOom6aQ.png)] bg-cover bg-center" />
            }
            className="w-full h-full"
            onClick={(e) => handleCatalogJump(e, "#service-4")}
          />
        </ScrollReveal>

        <ScrollReveal className="rounded-none lg:col-span-2 overflow-hidden" amount={0.1} delay={0.24}>
          <BentoCard
            eyebrow="Growth"
            title="Marketing"
            description="SEO, paid ads, and social media growth systems."
            graphic={
              <div className="absolute inset-0 -top-20 lg:-top-44 lg:-left-60 bg-[url(https://framerusercontent.com/images/h496iPSwtSnGZwpJyErl6cLWdtE.png)] bg-center lg:bg-left bg-no-repeat bg-contain" />
            }
            className="w-full h-full"
            onClick={(e) => handleCatalogJump(e, "#service-5")}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function FUIBentoGridDark() {
  return <ServicesEcosystem />;
}

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
  onClick,
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <motion.div
      initial="idle"
      data-dark={dark ? "true" : undefined}
      onClick={onClick}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-none transition-all duration-300",
        "bg-black dark:bg-transparent transform-gpu dark:[border:1px_solid_rgba(255,255,255,.3)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] bg-black shadow-sm ring-1 ring-white/30",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/30"
      )}
    >
      <div className="relative h-[18rem] lg:h-[29rem] shrink-0 overflow-hidden">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%] opacity-25" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%] opacity-25 " />
        )}
      </div>
      <div className="relative p-6 lg:p-10 z-20 isolate mt-[-70px] lg:mt-[-110px] h-[12rem] lg:h-[14rem] backdrop-blur-xl bg-black/55 border-t border-white/30 text-white flex flex-col justify-end">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-400">{eyebrow}</p>
        <h3 className="mt-1.5 text-xl lg:text-2xl font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-[600px] text-xs lg:text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
