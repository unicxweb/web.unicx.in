// Cache-busting trigger comment to force server rebuild: 2026-06-09T17:48
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { ServicesEngagementProcess } from "@/components/ServicesEngagementProcess";
import { ServicesEcosystem } from "@/components/ServicesEcosystem";
import { ServicesExpectations } from "@/components/ServicesExpectations";
import { ServicesFAQ } from "@/components/ServicesFAQ";
import { ServicesWhyUnicx } from "@/components/ServicesWhyUnicx";
import { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Digital Services | Studio UnicX",
  description: "Complete digital services including website development, UI/UX design, branding, SEO, and custom software solutions engineered for high performance.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "Studio UnicX services",
    "web design services",
    "website development",
    "UI/UX design",
    "e-commerce development",
    "custom web applications",
    "professional web design",
    "web development company",
    "technical SEO services"
  ],
  openGraph: {
    title: "Digital Services | Studio UnicX",
    description: "Complete digital services including website development, UI/UX design, branding, SEO, and custom software solutions.",
    url: "https://studio.unicx.in/services",
    type: "website",
    siteName: "Studio UnicX",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Studio UnicX Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Services | Studio UnicX",
    description: "Complete digital services including website development, UI/UX design, branding, SEO, and custom software solutions.",
    images: ["/og-services.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute left-[-8%] top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="noise-overlay" />
      <Navbar />

      <div className="relative z-10 bg-black w-full">
        {/* Render the full screen Client-side 3D Scroll Hero */}
        <ServicesHero />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-2 sm:px-8 lg:px-12">
          <ServicesExpectations />
          <ServicesEcosystem />
          <ServiceCatalog />
          <ServicesEngagementProcess />
          <ServicesWhyUnicx />
          <ServicesFAQ />
        </div>
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
