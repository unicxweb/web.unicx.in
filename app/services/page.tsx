import { CTA } from "@/components/CTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { ServicesOverview } from "@/components/ServicesOverview";
import { ServicesFAQ } from "@/components/ServicesFAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Services | Professional Digital Solutions | UNICX",
  description: "Complete web design and development services including UI/UX design, responsive websites, e-commerce solutions, and custom web applications. Professional digital services for business growth.",
  keywords: [
    "web design services",
    "website development",
    "UI/UX design",
    "responsive web design",
    "e-commerce development",
    "custom web applications",
    "professional web design",
    "web development company",
    "business website design",
    "modern web solutions"
  ],
  openGraph: {
    title: "Web Design & Development Services | Professional Digital Solutions | UNICX",
    description: "Complete web design and development services including UI/UX design, responsive websites, e-commerce solutions, and custom web applications.",
    url: "https://web.unicx.in/services",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "UNICX Web Design Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute left-[-8%] top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="noise-overlay" />
      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-2 pt-4 sm:px-8 md:pt-6 lg:px-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <ServicesOverview />
        <ServiceCatalog />
        <ServicesFAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
