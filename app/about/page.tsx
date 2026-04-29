import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AboutFAQ } from "@/components/AboutFAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { AboutProcess } from "@/components/AboutProcess";
import { companyPrinciples } from "@/lib/site-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About UNICX | Professional Web Design & Development Company",
  description: "Learn about UNICX - a professional web design and development company focused on creating premium digital systems. Our team delivers clarity, restraint, and measurable results.",
  keywords: [
    "about UNICX",
    "web design company",
    "web development team",
    "digital agency",
    "professional web services",
    "web design experts",
    "UNICX team",
    "digital solutions company"
  ],
  openGraph: {
    title: "About UNICX | Professional Web Design & Development Company",
    description: "Learn about UNICX - a professional web design and development company focused on creating premium digital systems.",
    url: "https://web.unicx.in/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About UNICX Web Design Company",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute left-[-8%] top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="noise-overlay" />
      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-4 sm:px-8 md:pt-6 lg:px-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <PageIntro
          eyebrow="About"
          title="A digital partner built around clarity, restraint, and results."
          description="UNICX is a multidisciplinary digital business brand focused on turning fragmented online presence into a cohesive growth system across design, marketing, websites, and apps."
          ctaLabel="View Services"
          ctaHref="/services"
        />

        <section className="pt-24 sm:pt-32">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <article className="soft-border rounded-[30px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:p-10">
              <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">
                Who We Are
              </div>
              <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                We build premium digital systems that make brands feel more intentional.
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-8 text-slate-400">
                The goal is not just to make things look better. It is to make
                every touchpoint work harder, feel clearer, and support long-term
                business growth without unnecessary complexity.
              </p>
            </article>

            <article className="soft-border rounded-[30px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:p-10">
              <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">
                Principles
              </div>
              <div className="mt-6 space-y-4">
                {companyPrinciples.map((principle) => (
                  <div
                    key={principle}
                    className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4 text-[13px] font-medium tracking-[-0.02em] text-slate-200"
                  >
                    {principle}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <AboutProcess />

        <AboutFAQ />

        <Footer />
      </div>
    </main>
  );
}
