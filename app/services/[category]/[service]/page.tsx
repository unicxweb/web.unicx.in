import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ServiceCategoryClient } from "@/components/services/ServiceCategoryClient";
import { serviceCategories } from "@/lib/site-data";

const serviceRouteSlugs: Record<string, string[]> = {
  "graphic-design": ["uiux-design", "logo-design", "marketing-creatives", "illustration", "motion-and-video"],
  "website-development": [
    "business-websites",
    "ecommerce-websites",
    "landing-pages",
    "custom-web-solutions",
    "performance-and-seo",
  ],
  "app-development": ["android-apps", "ios-apps", "hybrid-apps", "progressive-web-apps", "product-prototypes"],
  "software-development": [
    "crm-and-erp-solutions",
    "custom-software",
    "saas-applications",
    "enterprise-solutions",
  ],
  marketing: ["on-page-seo", "technical-seo", "social-media-marketing", "paid-advertising", "analytics-and-reporting"],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-");
}

export async function generateStaticParams(): Promise<{ category: string; service: string }[]> {
  const params: { category: string; service: string }[] = [];

  serviceCategories.forEach((category) => {
    const categorySlug = slugify(category.name);
    const services = new Set([
      ...category.items.map((service) => slugify(service)),
      ...(serviceRouteSlugs[categorySlug] ?? []),
    ]);

    services.forEach((service) => {
      params.push({ category: categorySlug, service });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const resolvedParams = await params;
  const category = serviceCategories.find(
    (cat) => slugify(cat.name) === resolvedParams.category.toLowerCase()
  );

  if (!category) {
    return {
      title: "Service Not Found | Studio UnicX",
      description: "The requested service could not be found.",
    };
  }

  const serviceTitle = resolvedParams.service
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const serviceUrl = `https://studio.unicx.in/services/${resolvedParams.category}/${resolvedParams.service}`;

  return {
    title: `${serviceTitle} | ${category.name} Services | Studio UnicX`,
    description: `Professional ${serviceTitle} services by Studio UnicX. ${category.description}`,
    alternates: {
      canonical: `/services/${resolvedParams.category}/${resolvedParams.service}`,
    },
    openGraph: {
      title: `${serviceTitle} | ${category.name} Services | Studio UnicX`,
      description: `Professional ${serviceTitle} services by Studio UnicX. ${category.description}`,
      url: serviceUrl,
      type: "website",
      siteName: "Studio UnicX",
      images: [
        {
          url: `/og-${resolvedParams.category}.jpg`,
          width: 1200,
          height: 630,
          alt: `Studio UnicX ${serviceTitle} Services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${serviceTitle} | Studio UnicX`,
      description: `Professional ${serviceTitle} services by Studio UnicX. ${category.description}`,
      images: [`/og-${resolvedParams.category}.jpg`],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const resolvedParams = await params;
  const category = serviceCategories.find(
    (cat) => slugify(cat.name) === resolvedParams.category.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const allowedServices = new Set([
    ...category.items.map((service) => slugify(service)),
    ...(serviceRouteSlugs[resolvedParams.category] ?? []),
  ]);

  if (!allowedServices.has(resolvedParams.service.toLowerCase())) {
    notFound();
  }

  const serviceTitle = resolvedParams.service
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Schema: BreadcrumbList
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
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": serviceTitle,
        "item": `https://studio.unicx.in/services/${resolvedParams.category}/${resolvedParams.service}`
      }
    ]
  };

  // Schema: Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceTitle,
    "description": `Professional ${serviceTitle} services by Studio UnicX. ${category.description}`,
    "provider": {
      "@type": "Organization",
      "name": "Studio UnicX",
      "url": "https://studio.unicx.in",
      "logo": "https://studio.unicx.in/logo.png"
    }
  };

  return (
    <main className="relative bg-[#060608] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="fixed inset-x-0 top-0 z-[60]">
        <Navbar />
      </div>
      <ServiceCategoryClient
        categoryName={category.name.toLowerCase()}
        initialServiceId={resolvedParams.service}
      />
    </main>
  );
}
