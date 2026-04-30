import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceDetail } from "@/components/ServiceDetail";
import { serviceCategories } from "@/lib/site-data";

export async function generateStaticParams(): Promise<{ category: string; service: string }[]> {
  const params: { category: string; service: string }[] = [];
  
  serviceCategories.forEach((category) => {
    const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
    
    category.items.forEach((service) => {
      const serviceSlug = service.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
      params.push({
        category: categorySlug,
        service: serviceSlug,
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }) {
  const resolvedParams = await params;
  const category = serviceCategories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.category.toLowerCase()
  );

  if (!category) {
    return {
      title: "Service Not Found | UNICX",
      description: "The requested service could not be found.",
    };
  }

  const service = category.items.find(
    (item) => item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') === resolvedParams.service.toLowerCase()
  );

  if (!service) {
    return {
      title: "Service Not Found | UNICX",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service} | ${category.name} Services | UNICX`,
    description: `Professional ${service} services by UNICX. ${category.description}`,
    keywords: [
      `${service.toLowerCase()} services`,
      `professional ${service.toLowerCase()}`,
      `${category.name.toLowerCase()} services`,
      "business services",
      "digital solutions",
      "UNICX services"
    ],
    openGraph: {
      title: `${service} | ${category.name} Services | UNICX`,
      description: `Professional ${service} services by UNICX. ${category.description}`,
      url: `https://web.unicx.in/services/${resolvedParams.category}/${resolvedParams.service}`,
      images: [
        {
          url: `/og-${resolvedParams.service}.jpg`,
          width: 1200,
          height: 630,
          alt: `UNICX ${service} Services`,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
  const resolvedParams = await params;
  const category = serviceCategories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.category.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const service = category.items.find(
    (item) => item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') === resolvedParams.service.toLowerCase()
  );

  if (!service) {
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
            { label: category.name, href: `/services/${resolvedParams.category}` },
            { label: service }
          ]} 
        />
        <ServiceDetail service={service} category={category} />
        <Footer />
      </div>
    </main>
  );
}
