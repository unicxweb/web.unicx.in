import { MediaFrame } from "@/components/MediaFrame";
import { serviceCategories } from "@/lib/site-data";

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

export function ServiceCatalog() {
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

      <div className="mt-16 space-y-6">
        {serviceCategories.map((category, index) => (
          <article
            key={category.name}
            id={`service-${index + 1}`}
            className="soft-border relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_34%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:items-center">
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
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4 text-[13px] font-medium text-slate-200"
                  >
                    <span className="text-slate-500">
                      <ArrowRightIcon />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
