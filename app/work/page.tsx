import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { SelectedWork } from "@/components/SelectedWork";
import { WorkFAQ } from "@/components/WorkFAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Portfolio | Case Studies & Projects | Studio UnicX",
  description: "Explore Studio UnicX's web design portfolio featuring successful case studies, custom website projects, and digital solutions. See our work in web development, UI/UX design, and digital transformation.",
  alternates: {
    canonical: "/work",
  },
  keywords: [
    "web design portfolio",
    "website case studies",
    "web development projects",
    "Studio UnicX portfolio",
    "web design examples",
    "website design samples",
    "digital projects",
    "web development showcase",
    "UI/UX portfolio",
    "professional web design work"
  ],
  openGraph: {
    title: "Web Design Portfolio | Case Studies & Projects | Studio UnicX",
    description: "Explore Studio UnicX's web design portfolio featuring successful case studies and custom website projects.",
    url: "https://studio.unicx.in/work",
    type: "website",
    siteName: "Studio UnicX",
    images: [
      {
        url: "/og-work.jpg",
        width: 1200,
        height: 630,
        alt: "Studio UnicX Web Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Portfolio | Case Studies & Projects | Studio UnicX",
    description: "Explore Studio UnicX's web design portfolio featuring successful case studies and custom website projects.",
    images: ["/og-work.jpg"],
  },
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute right-[-10%] top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="noise-overlay" />
      <Navbar />

      <div className="relative z-10 bg-black w-full">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-2 pt-4 sm:px-8 md:pt-6 lg:px-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work" }]} />
          <PageIntro
            eyebrow="Work"
            title="Selected outcomes shaped through strategy and execution."
            description="A closer view into how studio.unicx approaches product clarity, marketing performance, and conversion-focused design systems."
            ctaLabel="Discuss Your Project"
            ctaHref="/contact"
          />
          <SelectedWork />
          <HowItWorks />
          <WorkFAQ />
        </div>
      </div>
      <Footer />
    </main>
  );
}
