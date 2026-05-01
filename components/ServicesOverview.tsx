import Link from "next/link";
import { serviceCategories } from "@/lib/site-data";

const deliveryPoints = [
  "Strategy, graphic design, and implementation in one flow",
  "Clear scope across brand, growth, product, and web",
  "Project-based or ongoing partner support",
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

function SparkIcon() {
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
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    </svg>
  );
}

function CompassIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="m14.8 9.2-2 5.6-5.6 2 2-5.6 5.6-2Z" />
    </svg>
  );
}

function BriefcaseIcon() {
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
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M3 12h18" />
    </svg>
  );
}

function CheckStackIcon() {
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
      <path d="M4 7h10" />
      <path d="M4 12h7" />
      <path d="M4 17h9" />
      <path d="m16 12 2 2 4-4" />
    </svg>
  );
}

export function ServicesOverview() {
  return (
    <section className="pt-10 sm:pt-12 lg:pt-14">
      <div className="max-w-5xl">
        <div className="relative">
          <div className="pointer-events-none absolute -left-8 top-6 h-24 w-24 rounded-full bg-white/6 blur-3xl" />
          <div className="pointer-events-none absolute right-8 top-0 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
          <div className="section-label">Services</div>
          <h1 className="max-w-4xl text-[clamp(3rem,7vw,5.2rem)] font-semibold uppercase leading-[0.92] tracking-[-0.065em] text-white">
            Graphic design, growth, apps, and websites under one roof.
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-slate-400 sm:text-lg">
            UNICX delivers premium digital services for brands that need
            sharper positioning, stronger experiences, and systems that convert
            attention into momentum.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <div className="relative inline-flex">
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10">
                  <ArrowRightIcon />
                </span>
                <span className="relative z-10">Start A Project</span>
              </Link>
            </div>
            <div className="relative inline-flex">
              <a
                href="#service-catalog"
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/10 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-white transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span className="relative z-10">
                  <LayersIcon />
                </span>
                <span className="relative z-10">View Services</span>
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              <div className="md:border-r md:border-white/10 md:pr-8">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  <SparkIcon />
                  Core Areas
                </div>
                <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
                  4
                </div>
                <p className="mt-3 max-w-xs text-[14px] leading-6 text-slate-400">
                  Connected service pillars built to work together.
                </p>
              </div>

              <div className="md:border-r md:border-white/10 md:pr-8">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  <CompassIcon />
                  Coverage
                </div>
                <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
                  End-to-end
                </div>
                <p className="mt-3 max-w-xs text-[14px] leading-6 text-slate-400">
                  From first impression to acquisition and delivery.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  <BriefcaseIcon />
                  Engagement
                </div>
                <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
                  Flexible
                </div>
                <p className="mt-3 max-w-xs text-[14px] leading-6 text-slate-400">
                  Focused projects or ongoing execution support.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-20 lg:mt-24 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <aside className="soft-border rounded-[30px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
            <CheckStackIcon />
            What You Can Expect
          </div>
          <div className="mt-6 space-y-4">
            {deliveryPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4 text-[14px] leading-6 text-slate-200"
              >
                <span className="mt-1 text-slate-500">
                  <ArrowRightIcon />
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </aside>

        <aside className="soft-border rounded-[30px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
              <LayersIcon />
              Service Areas
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Jump to section
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {serviceCategories.map((category, index) => (
              <Link
                key={category.name}
                href={`/services/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    0{index + 1}
                  </div>
                  <div className="mt-2 text-base font-medium text-white">
                    {category.name}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  <span>{category.items.length}</span>
                  <ArrowRightIcon />
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
