"use client";

import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { serviceCategories } from "@/lib/site-data";
import { useState } from "react";

function GridIcon() {
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
      <rect x="4" y="4" width="6" height="6" rx="1.2" />
      <rect x="14" y="4" width="6" height="6" rx="1.2" />
      <rect x="4" y="14" width="6" height="6" rx="1.2" />
      <rect x="14" y="14" width="6" height="6" rx="1.2" />
    </svg>
  );
}

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

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ServiceCatalog() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % serviceCategories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + serviceCategories.length) % serviceCategories.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="service-catalog" className="pt-24 sm:pt-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="section-label">Catalog</div>
          <h2 className="text-4xl font-semibold uppercase tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
            Structured services for every core growth layer.
          </h2>
        </div>
        <p className="max-w-lg text-[15px] leading-8 text-slate-400 sm:text-base">
          Each service area is designed to stand on its own, but the real value
          comes from how the layers work together across brand, product, and
          growth.
        </p>
      </div>

      <div className="mt-16 relative">
        <div className="overflow-hidden" style={{ perspective: "1000px" }}>
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              transformStyle: "preserve-3d"
            }}
          >
            {serviceCategories.map((category, index) => (
              <div
                key={category.name}
                className="w-full flex-shrink-0 px-2"
              >
                <article
                  id={`service-${index + 1}`}
                  className="soft-border relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:p-10 transition-all duration-500 ease-out"
                  style={{
                    height: "650px",
                    transform: `scale(${index === currentIndex ? 1 : 0.95})`,
                    opacity: index === currentIndex ? 1 : 0.6,
                    filter: index === currentIndex ? 'blur(0px)' : 'blur(1px)'
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_34%)]" />
                  <div className="relative grid gap-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:items-center h-full">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                        Service 0{index + 1}
                      </div>
                      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2.4rem]">
                        {category.name}
                      </h3>
                      <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-400">
                        {category.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
                        <GridIcon />
                        {category.items.length} focused offerings
                      </div>
                      <div className="mt-4">
                        <Link
                          href={`/services/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.34em] text-white transition hover:border-white/20 hover:bg-white/[0.06]"
                        >
                          <ArrowRightIcon />
                          Explore {category.name}
                        </Link>
                      </div>
                    </div>

                    <div>
                      <MediaFrame
                        src={category.imageSrc}
                        alt={category.name}
                        label={category.imageLabel}
                        aspectClassName="aspect-[16/10]"
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {category.items.map((item) => (
                        <Link
                          key={item}
                          href={`/services/${category.name.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')}`}
                          className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4 text-[13px] font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.05]"
                        >
                          <span className="text-slate-500">
                            <ArrowRightIcon />
                          </span>
                          <span>{item}</span>
                        </Link>
                      ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:border-white/30 hover:bg-white/20"
          aria-label="Previous service"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:border-white/30 hover:bg-white/20"
          aria-label="Next service"
        >
          <ChevronRightIcon />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {serviceCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition ${
                index === currentIndex 
                  ? "bg-white" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
