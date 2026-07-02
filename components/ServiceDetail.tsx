import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { CTA } from "@/components/CTA";

type ServiceDetailProps = {
  service: string;
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

function DollarIcon() {
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
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UsersIcon() {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m22 21-3-3" />
      <circle cx="17" cy="17" r="3" />
    </svg>
  );
}

export function ServiceDetail({ service, category }: ServiceDetailProps) {
  const getServiceDetails = () => {
    const serviceLower = service.toLowerCase();
    
    if (serviceLower.includes('design') || serviceLower.includes('ui') || serviceLower.includes('ux')) {
      return {
        description: `Professional ${service} services that create intuitive, beautiful, and user-centered digital experiences. We combine aesthetic excellence with functional design to deliver solutions that users love and businesses trust.`,
        features: [
          "User research and persona development",
          "Wireframing and prototyping",
          "Visual design and brand consistency",
          "Usability testing and optimization",
          "Design systems and component libraries",
          "Cross-platform compatibility"
        ],
        process: [
          "Discovery & Research",
          "User Analysis & Personas",
          "Wireframing & Information Architecture",
          "Visual Design & Branding",
          "Prototyping & Testing",
          "Implementation & Handoff"
        ],
        benefits: [
          "Improved user satisfaction and engagement",
          "Higher conversion rates and task completion",
          "Reduced development costs and time",
          "Stronger brand recognition and trust",
          "Better accessibility and compliance",
          "Scalable design for future growth"
        ],
        pricing: {
          starting: "$2,500",
          timeframe: "2-8 weeks",
          delivery: "Project-based"
        }
      };
    }
    
    if (serviceLower.includes('seo') || serviceLower.includes('marketing') || serviceLower.includes('ads')) {
      return {
        description: `Comprehensive ${service} strategies that drive measurable growth and increase your online visibility. We combine data-driven insights with creative execution to deliver campaigns that convert and scale.`,
        features: [
          "Comprehensive audit and analysis",
          "Keyword research and strategy",
          "Campaign setup and optimization",
          "Content creation and distribution",
          "Performance tracking and reporting",
          "Continuous optimization and scaling"
        ],
        process: [
          "Market Research & Analysis",
          "Strategy Development",
          "Campaign Planning & Setup",
          "Content Creation & Execution",
          "Monitoring & Optimization",
          "Reporting & Scaling"
        ],
        benefits: [
          "Increased organic and paid traffic",
          "Higher quality leads and conversions",
          "Improved brand visibility and authority",
          "Better ROI on marketing spend",
          "Data-driven decision making",
          "Sustainable long-term growth"
        ],
        pricing: {
          starting: "$1,500",
          timeframe: "Ongoing",
          delivery: "Monthly retainer"
        }
      };
    }
    
    if (serviceLower.includes('app') || serviceLower.includes('android') || serviceLower.includes('ios')) {
      return {
        description: `Custom ${service} development that delivers powerful, scalable, and user-friendly mobile experiences. We build native and hybrid applications that perform flawlessly across all devices and platforms.`,
        features: [
          "Native and cross-platform development",
          "Custom UI/UX design",
          "API integration and backend development",
          "Testing and quality assurance",
          "App store deployment",
          "Maintenance and support"
        ],
        process: [
          "Requirements Gathering",
          "Technical Architecture",
          "UI/UX Design",
          "Development & Testing",
          "Deployment & Launch",
          "Maintenance & Updates"
        ],
        benefits: [
          "Native performance and user experience",
          "Cross-platform compatibility",
          "Scalable and maintainable code",
          "Faster time-to-market",
          "Reduced development costs",
          "Ongoing technical support"
        ],
        pricing: {
          starting: "$5,000",
          timeframe: "8-16 weeks",
          delivery: "Project-based"
        }
      };
    }
    
    // Default for website development and other services
    return {
      description: `Professional ${service} solutions that create powerful online presences and drive business growth. We combine cutting-edge technology with strategic design to deliver websites that perform, convert, and scale.`,
      features: [
        "Custom design and development",
        "Responsive and mobile-first approach",
        "SEO optimization and performance",
        "Content management system integration",
        "E-commerce functionality",
        "Security and maintenance"
      ],
      process: [
        "Planning & Strategy",
        "Design & Prototyping",
        "Development & Integration",
        "Testing & Quality Assurance",
        "Launch & Deployment",
        "Support & Optimization"
      ],
      benefits: [
        "Professional online presence",
        "Mobile-responsive design",
        "Fast loading and SEO optimized",
        "Easy content management",
        "Scalable and secure",
        "Measurable business results"
      ],
      pricing: {
        starting: "$3,000",
        timeframe: "4-12 weeks",
        delivery: "Project-based"
      }
    };
  };

  const details = getServiceDetails();

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-12 lg:pt-14">
        <div className="max-w-5xl">
          <div className="section-label">{category.name}</div>
          <h1 className="max-w-4xl text-[clamp(3rem,7vw,5.2rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-white">
            {service}
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-slate-400 sm:text-lg">
            {details.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-950 transition hover:shadow-[0_0_36px_rgba(255,255,255,0.12)]"
            >
              <ArrowRightIcon />
              Get Started
            </Link>
            <Link
              href={`/services/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-white transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <ArrowRightIcon />
              View {category.name} Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="section-label">Features</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
          What's Included
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {details.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <span className="mt-1 text-slate-500">
                <CheckIcon />
              </span>
              <span className="text-[14px] leading-6 text-slate-200">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section>
        <div className="section-label">Process</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
          How We Work
        </h2>
        <div className="mt-8 space-y-4">
          {details.process.map((step, index) => (
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
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
          Why Choose Our {service} Services
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {details.benefits.map((benefit) => (
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

      {/* Pricing Section */}
      <section>
        <div className="section-label">Investment</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
          Pricing & Timeline
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="soft-border rounded-[30px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
              <DollarIcon />
              Starting From
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              {details.pricing.starting}
            </div>
          </div>
          
          <div className="soft-border rounded-[30px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
              <ClockIcon />
              Timeframe
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              {details.pricing.timeframe}
            </div>
          </div>
          
          <div className="soft-border rounded-[30px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
              <UsersIcon />
              Delivery
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              {details.pricing.delivery}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section>
        <div className="section-label">Related Services</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
          Other {category.name} Services
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.items
            .filter((item) => item !== service)
            .slice(0, 6)
            .map((relatedService) => (
              <Link
                key={relatedService}
                href={`/services/${category.name.toLowerCase().replace(/\s+/g, '-')}/${relatedService.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-').replace(/[^\w\-]/g, '').replace(/-+/g, '-')}`}
                className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4 text-[13px] font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <span className="text-slate-500">
                  <ArrowRightIcon />
                </span>
                <span>{relatedService}</span>
              </Link>
            ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
