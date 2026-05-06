import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "₹49,999",
    note: "per project",
    cta: "Get Started",
    href: "/contact",
    icon: "arrow",
    features: [
      "Single pillar focus",
      "Up to three months",
      "Standard support",
    ],
  },
  {
    name: "Professional",
    price: "₹1,29,999",
    note: "per project",
    cta: "Get Started",
    href: "/contact",
    icon: "user",
    features: [
      "Two to three pillars",
      "Four to six months",
      "Priority support",
      "Post-launch optimization",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "tailored pricing",
    cta: "Contact Us",
    href: "/contact",
    icon: "briefcase",
    features: [
      "All five pillars",
      "Ongoing development",
      "Dedicated team",
      "24/7 support",
      "Scalability planning",
    ],
  },
];

function PlanIcon({ icon }: { icon: string }) {
  const commonProps = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-7 w-7",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "1.8",
  };

  if (icon === "user") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c1.2-4 12.8-4 14 0" />
      </svg>
    );
  }

  if (icon === "briefcase") {
    return (
      <svg {...commonProps}>
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function PricingPlans() {
  return (
    <section id="pricing" className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="section-label justify-center">
          Plans
        </div>
        <h2 className="text-[clamp(2.25rem,5vw,4.35rem)] font-semibold uppercase leading-[0.92] tracking-[-0.07em] text-white">
          Simple pricing
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[14px] leading-7 text-slate-400 sm:text-[15px]">
          Choose the engagement model that fits your scope, timeline, and level of support.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="group flex min-h-[560px] flex-col rounded-lg border border-white/20 bg-black p-8 transition duration-300 hover:border-white/35 hover:bg-white/[0.025] hover:shadow-[0_18px_60px_rgba(255,255,255,0.045)]"
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-lg font-semibold text-white">
                {plan.name}
              </h3>
              <div className="text-white">
                <PlanIcon icon={plan.icon} />
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[clamp(2.6rem,5vw,4.15rem)] font-semibold leading-none tracking-[-0.08em] text-white">
                {plan.price}
              </div>
              <p className="mt-3 text-[13px] text-slate-500">
                {plan.note}
              </p>
            </div>

            <div className="my-8 h-px bg-white/20" />

            <div>
              <div className="mb-5 text-[12px] text-slate-400">
                Includes:
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[13px] leading-6 text-slate-300"
                  >
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.href}
              className="mt-auto inline-flex w-full items-center justify-center bg-white px-5 py-3 text-[12px] font-semibold text-black transition group-hover:bg-slate-200"
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
