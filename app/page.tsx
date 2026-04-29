import { Capabilities } from "@/components/Capabilities";
import { CaseStudies } from "@/components/CaseStudies";
import { CTA } from "@/components/CTA";
import CookieConsent from "@/components/CookieConsent";
import { EngagementModels } from "@/components/EngagementModels";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HomeFAQ } from "@/components/HomeFAQ";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { Systems } from "@/components/Systems";
import { WhoItsFor } from "@/components/WhoItsFor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Services | Professional Website Development | UNICX",
  description: "Transform your business with custom web design services. UNICX creates stunning, responsive websites that convert visitors into customers. Expert web development team.",
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
    title: "Web Design Services | Professional Website Development | UNICX",
    description: "Transform your business with custom web design services. UNICX creates stunning, responsive websites that convert visitors into customers.",
    url: "https://web.unicx.in",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "UNICX Web Design Services",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">

      <div className="noise-overlay" />

      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-4 sm:px-8 md:pt-6 lg:px-12">
        <Hero />
        <WhoItsFor />
        <Systems />
        <Capabilities />
        <EngagementModels />
        <HowItWorks />
        <HomeFAQ />
        <CaseStudies />
        <CTA />
        <Footer />
      </div>
      <CookieConsent />
    </main>
  );
}
