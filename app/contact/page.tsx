import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ContactFAQ } from "@/components/ContactFAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Metadata } from "next";

const contactPaths = [
  {
    label: "Email",
    value: "hello@unicx.in",
    href: "mailto:hello@unicx.in",
    note: "Best for project briefs, scope notes, and references.",
  },
  {
    label: "Focus",
    value: "Design, marketing, apps, and websites",
    note: "We work across brand systems, growth, product, and launch work.",
  },
  {
    label: "Engagement",
    value: "Project-based work or ongoing support",
    note: "Good fit for teams that need delivery, not just recommendations.",
  },
];

const projectInputs = [
  "What your business does and who it serves",
  "What you need help with right now",
  "Any launch timing, deadline, or internal constraint",
  "Relevant links, references, or existing materials",
];

const nextSteps = [
  "We review your brief and map the clearest next move.",
  "If the fit is right, we align on scope, priorities, and pace.",
  "Then we move into a focused delivery plan with momentum.",
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

export const metadata: Metadata = {
  title: "Contact UNICX | Get Started with Web Design & Development Services",
  description: "Contact UNICX for professional web design and development services. Start your project with our expert team. Email hello@unicx.in or use our contact form for quick response.",
  keywords: [
    "contact UNICX",
    "web design contact",
    "website development inquiry",
    "get web design quote",
    "contact web developers",
    "start web project",
    "UNICX contact information",
    "web design consultation"
  ],
  openGraph: {
    title: "Contact UNICX | Get Started with Web Design & Development Services",
    description: "Contact UNICX for professional web design and development services. Start your project with our expert team.",
    url: "https://web.unicx.in/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact UNICX Web Design",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <div className="noise-overlay" />
      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-2 pt-10 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <section className="border-b border-white/10 pb-14 pt-24 sm:pb-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-end">
            <div className="max-w-4xl">
              <div className="section-label">Contact</div>
              <h1 className="max-w-4xl text-[clamp(2.7rem,6vw,5.3rem)] font-semibold uppercase leading-[0.94] tracking-[-0.05em] text-white">
                Start with the project, not the pitch.
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-400 sm:text-[17px] sm:leading-8">
                Share what you are building, what is stuck, or where you want
                to grow next. We will help turn that into a clear next step
                across design, marketing, apps, or websites.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="mailto:hello@unicx.in"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  <ArrowRightIcon />
                  hello@unicx.in
                </Link>
                <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-slate-500">
                  Usually the fastest way to get started
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {contactPaths.map((item) => (
                <div key={item.label} className="border-l border-white/10 pl-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">
                    {item.label}
                  </div>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="mt-3 inline-block text-[18px] font-medium tracking-[-0.02em] text-white transition hover:text-slate-300"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <div className="mt-3 text-[16px] font-medium tracking-[-0.02em] text-white">
                      {item.value}
                    </div>
                  )}
                  <p className="mt-2 max-w-sm text-[14px] leading-6 text-slate-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-24 sm:pt-32 pb-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="space-y-12">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                  What to include
                </div>
                <div className="mt-6 space-y-4">
                  {projectInputs.map((item, index) => (
                    <div
                      key={item}
                      className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        0{index + 1}
                      </div>
                      <p className="text-[15px] leading-7 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                  What happens next
                </div>
                <div className="mt-6 space-y-5">
                  {nextSteps.map((step, index) => (
                    <div key={step} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        0{index + 1}
                      </div>
                      <p className="max-w-md text-[14px] leading-6 text-slate-300">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 lg:pt-0 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-12">
              <ContactForm />
            </div>
          </div>
        </section>

        <ContactFAQ />

        <Footer />
      </div>
    </main>
  );
}
