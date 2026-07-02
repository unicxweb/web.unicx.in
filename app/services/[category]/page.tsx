import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { serviceCategories } from "@/lib/site-data";
import { ServiceCategoryClient } from "@/components/services/ServiceCategoryClient";

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
      title: "Service Not Found | Studio UnicX",
      description: "The requested service category could not be found.",
    };
  }

  const categoryUrl = `https://studio.unicx.in/services/${resolvedParams.category.toLowerCase()}`;

  return {
    title: `${category.name} Services | Professional ${category.name} Solutions | Studio UnicX`,
    description: category.description,
    alternates: {
      canonical: `/services/${resolvedParams.category.toLowerCase()}`,
    },
    keywords: [
      `${category.name.toLowerCase()} services`,
      `professional ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} solutions`,
      "business services",
      "digital solutions",
      "Studio UnicX services"
    ],
    openGraph: {
      title: `${category.name} Services | Professional ${category.name} Solutions | Studio UnicX`,
      description: category.description,
      url: categoryUrl,
      type: "website",
      siteName: "Studio UnicX",
      images: [
        {
          url: `/og-${resolvedParams.category.toLowerCase()}.jpg`,
          width: 1200,
          height: 630,
          alt: `Studio UnicX ${category.name} Services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Services | Studio UnicX`,
      description: category.description,
      images: [`/og-${resolvedParams.category.toLowerCase()}.jpg`],
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

  const categoryName = category.name.toLowerCase();

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://studio.unicx.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://studio.unicx.in/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `https://studio.unicx.in/services/${resolvedParams.category.toLowerCase()}`
      }
    ]
  };

  /* ─── Fullscreen service showcases with shared-element transition to detail pages ─── */
  if (
    categoryName === "graphic design" ||
    categoryName === "website development" ||
    categoryName === "app development" ||
    categoryName === "software development" ||
    categoryName === "marketing"
  ) {
    return (
      <main className="relative bg-[#060608] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
        />
        <div className="fixed inset-x-0 top-0 z-[60]">
          <Navbar />
        </div>
        <ServiceCategoryClient categoryName={categoryName} />
      </main>
    );
  }

  /* ─── All other categories: standard layout ─── */
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute left-[-8%] top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="noise-overlay" />
      <Navbar />

      <Footer sticky={false} />
    </main>
  );
}
