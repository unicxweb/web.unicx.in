import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceCategoryDetail } from "@/components/ServiceCategoryDetail";
import { serviceCategories } from "@/lib/site-data";

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = serviceCategories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.category.toLowerCase()
  );

  if (!category) {
    return {
      title: "Service Not Found | UNICX",
      description: "The requested service category could not be found.",
    };
  }

  return {
    title: `${category.name} Services | Professional ${category.name} Solutions | UNICX`,
    description: category.description,
    keywords: [
      `${category.name.toLowerCase()} services`,
      `professional ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} solutions`,
      "business services",
      "digital solutions",
      "UNICX services"
    ],
    openGraph: {
      title: `${category.name} Services | Professional ${category.name} Solutions | UNICX`,
      description: category.description,
      url: `https://web.unicx.in/services/${resolvedParams.category.toLowerCase()}`,
      images: [
        {
          url: `/og-${resolvedParams.category.toLowerCase()}.jpg`,
          width: 1200,
          height: 630,
          alt: `UNICX ${category.name} Services`,
        },
      ],
    },
  };
}

export default async function ServiceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = serviceCategories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.category.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute left-[-8%] top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="noise-overlay" />
      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-2 pt-4 sm:px-8 md:pt-6 lg:px-12">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" }, 
            { label: "Services", href: "/services" },
            { label: category.name }
          ]} 
        />
        <ServiceCategoryDetail category={category} />
        <Footer />
      </div>
    </main>
  );
}
