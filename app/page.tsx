import { HowWeBuild } from "@/components/HowWeBuild";
import { CTA } from "@/components/CTA";
import { ClientTestimonials } from "@/components/ClientTestimonials";
import CookieConsent from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { FoundationStatement } from "@/components/FoundationStatement";
import { HeroMinimal } from "@/components/HeroMinimal";
import { HomeFAQ } from "@/components/HomeFAQ";
import { Navbar } from "@/components/Navbar";
import { Pillars } from "@/components/Pillars";
import { PricingPlans } from "@/components/PricingPlans";
import { SelectedWork } from "@/components/SelectedWork";
import { WhoItsFor } from "@/components/WhoItsFor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Services | Professional Website Development | studio.unicx",
  description: "Transform your business with custom web design services. studio.unicx creates stunning, responsive websites that convert visitors into customers. Expert web development team.",
  keywords: [
    "web design services",
    "professional web development",
    "custom website design",
    "responsive web design",
    "e-commerce development",
    "business website design",
    "web development company"
  ],
  openGraph: {
    title: "Web Design Services | Professional Website Development | studio.unicx",
    description: "Transform your business with custom web design services. studio.unicx creates stunning, responsive websites that convert visitors into customers.",
    url: "https://web.unicx.in",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "studio.unicx Web Design Services",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">

      <div className="noise-overlay" />

      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-2 pt-4 sm:px-8 md:pt-6 lg:px-12">
        <HeroMinimal />
        <WhoItsFor />
        <Pillars />
        <HowWeBuild />
        <SelectedWork />
        <ClientTestimonials />
        <FoundationStatement />
        <PricingPlans />
        <HomeFAQ />
        <CTA />
        <Footer />
      </div>
      <CookieConsent />
    </main>
  );
}
