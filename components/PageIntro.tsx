import Link from "next/link";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: PageIntroProps) {
  return (
    <section className="pt-10 sm:pt-12 lg:pt-14">
      <div className="max-w-4xl">
        <div className="section-label">{eyebrow}</div>
        <h1 className="max-w-4xl text-[clamp(3rem,8vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.07em] text-white">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-[15px] leading-8 text-slate-400 sm:text-lg">
          {description}
        </p>
        {ctaLabel && ctaHref ? (
          <div className="mt-10">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 transition hover:shadow-[0_0_36px_rgba(255,255,255,0.12)]"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
