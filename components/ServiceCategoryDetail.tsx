import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { CTA } from "@/components/CTA";

type ServiceCategoryDetailProps = {
  category: {
    name: string;
    description: string;
    imageLabel: string;
    imageSrc: string;
    items: string[];
  };
};

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
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ClockIcon() {
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
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function TargetIcon() {
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
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ServiceCategoryDetail({ category }: ServiceCategoryDetailProps) {
  const getProcessSteps = () => {
    switch (category.name.toLowerCase()) {
      case "design":
        return [
          "Discovery & Research",
          "Wireframing & Prototyping", 
          "Visual Design & Branding",
          "Testing & Iteration",
          "Final Delivery & Handoff"
        ];
      case "marketing":
        return [
          "Market Research & Analysis",
          "Strategy Development",
          "Campaign Planning & Setup",
          "Execution & Monitoring",
          "Optimization & Reporting"
        ];
      case "development":
        return [
          "Requirements Gathering",
          "Architecture Design",
          "Development & Testing",
          "Deployment & Launch",
          "Maintenance & Support"
        ];
      case "website development":
        return [
          "Planning & Architecture",
          "Design & Development",
          "Content Integration",
          "Testing & QA",
          "Launch & Optimization"
        ];
      default:
        return [
          "Initial Consultation",
          "Planning & Strategy",
          "Development & Execution",
          "Review & Refinement",
          "Delivery & Launch"
        ];
    }
  };

  const getBenefits = () => {
    switch (category.name.toLowerCase()) {
      case "design":
        return [
          "Improved user experience and satisfaction",
          "Stronger brand recognition and trust",
          "Higher conversion rates and engagement",
          "Consistent visual identity across platforms"
        ];
      case "marketing":
        return [
          "Increased organic and paid traffic",
          "Better lead quality and conversion rates",
          "Improved brand visibility and authority",
          "Measurable ROI and performance insights"
        ];
      case "development":
        return [
          "Custom solutions tailored to your needs",
          "Scalable and maintainable codebase",
          "Cross-platform compatibility",
          "Optimized performance and user experience"
        ];
      case "website development":
        return [
          "Professional online presence",
          "Mobile-responsive design",
          "Fast loading and SEO optimized",
          "Easy content management and updates"
        ];
      default:
        return [
          "Professional quality and execution",
          "Customized solutions for your business",
          "Ongoing support and maintenance",
          "Measurable results and ROI"
        ];
    }
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-12 lg:pt-14">
        <div className="max-w-5xl">
          <div className="section-label">{category.name}</div>
          <h1 className="max-w-4xl text-[clamp(3rem,7vw,5.2rem)] font-semibold uppercase leading-[0.92] tracking-[-0.065em] text-white">
            Professional {category.name} Solutions
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-slate-400 sm:text-lg">
            {category.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 transition hover:shadow-[0_0_36px_rgba(255,255,255,0.12)]"
            >
              <ArrowRightIcon />
              Start Your Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-white transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <div className="section-label">Our Approach</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
            Strategic {category.name} That Drives Results
          </h2>
          <p className="mt-6 text-[15px] leading-8 text-slate-400">
            We combine industry expertise with cutting-edge techniques to deliver {category.name.toLowerCase()} solutions that not only meet your immediate needs but also support long-term growth and scalability.
          </p>
        </div>
        <div>
          <MediaFrame
            src={category.imageSrc}
            alt={category.name}
            label={category.imageLabel}
            aspectClassName="aspect-[16/10]"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <div className="section-label">Services</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          What We Offer
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((item) => (
            <Link
              key={item}
              href={`/services/${category.name.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')}`}
              className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4 text-[13px] font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <span className="text-slate-500">
                <CheckIcon />
              </span>
              <span>{item}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section>
        <div className="section-label">Process</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          How We Work
        </h2>
        <div className="mt-8 space-y-4">
          {getProcessSteps().map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-4 rounded-[18px] border border-white/10 bg-white/[0.03] px-6 py-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[11px] font-semibold text-white">
                {index + 1}
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon />
                <span className="text-[14px] font-medium text-slate-200">{step}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <div className="section-label">Benefits</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Why Choose Our {category.name} Services
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {getBenefits().map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <span className="mt-1 text-slate-500">
                <TargetIcon />
              </span>
              <span className="text-[14px] leading-6 text-slate-200">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
