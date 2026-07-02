import { HowWeBuild } from "@/components/HowWeBuild";
import { CTA } from "@/components/CTA";
import { ClientTestimonials } from "@/components/ClientTestimonials";
import { Footer } from "@/components/Footer";
import { FoundationStatement } from "@/components/FoundationStatement";
import { MacbookScrollDemo } from "@/components/MacbookScrollDemo";
import { HomeFAQ } from "@/components/HomeFAQ";
import { Navbar } from "@/components/Navbar";
import { Pillars } from "@/components/Pillars";
import { PricingPlans } from "@/components/PricingPlans";
import { SelectedWork } from "@/components/SelectedWork";
import { WhoItsFor } from "@/components/WhoItsFor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio UnicX | Web Development, UI/UX & Digital Agency",
  description: "Studio UnicX is a creative digital agency specializing in website development, UI/UX design, branding, SEO, and software solutions.",
  alternates: {
    canonical: "/",
  },
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
    url: "https://studio.unicx.in",
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
    <main className="relative min-h-screen overflow-x-clip bg-black font-sans">

      <div className="noise-overlay" />

      <Navbar />

      <div className="relative z-10 bg-black">
        <MacbookScrollDemo />

        <WhoItsFor />

        {/* Section 1: Pillars (Light Theme) */}
        <Pillars />

        {/* Section 2: Process & Case Studies (Dark Theme) */}
        <div className="relative z-30 -mt-[100vh] bg-black text-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-8 lg:px-12">
            <HowWeBuild />
            <SelectedWork />
          </div>
        </div>

        {/* Section 2.5: Testimonials (Sticky Dark Theme) */}
        <div className="relative h-[200vh] bg-black text-white z-20">
          <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-black">
            <div className="mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-8 lg:px-12">
              <ClientTestimonials />
            </div>
          </div>
        </div>

        {/* Section 3: Foundation (Light Theme) */}
        <div className="relative z-30 -mt-[100vh] bg-[#fafafa] pb-px md:pb-0">
          {/* Subtle warm glow matching Studio/Careers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.015),transparent_70%)] pointer-events-none" />
          <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-8 lg:px-12 text-black">
            <FoundationStatement />
          </div>
        </div>

        {/* Section 3.5: Pricing (Sticky Light Theme) */}
        <div className="relative h-[200vh] bg-[#fafafa] text-black z-20">
          <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-[#fafafa]">
            {/* Subtle warm glow matching Studio/Careers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.015),transparent_70%)] pointer-events-none" />
            <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-8 lg:px-12">
              <PricingPlans />
            </div>
          </div>
        </div>

        {/* Section 4: FAQ (Dark Theme) */}
        <div className="relative z-30 -mt-[100vh] bg-black text-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-8 lg:px-12">
            <HomeFAQ />
          </div>
        </div>

        <CTA />
      </div>
      <Footer />
    </main>
  );
}
