export default function StructuredData() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "UNICX Web Design",
    "description": "Professional web design and development services. We create custom, responsive websites that drive business growth.",
    "url": "https://web.unicx.in",
    "logo": "https://web.unicx.in/logo.png",
    "image": "https://web.unicx.in/og-image.jpg",
    "sameAs": [
      "https://twitter.com/unicx",
      "https://linkedin.com/company/unicx",
      "https://facebook.com/unicx"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "email": "hello@unicx.in",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "Your City",
      "addressRegion": "Your State"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "XX.XXXX",
      "longitude": "XX.XXXX"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00"
    ],
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "nameOfPart": "Web Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Design",
            "description": "Custom web design services with modern UI/UX"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "Professional website development using latest technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "E-commerce Development",
            "description": "Complete e-commerce solutions for online businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Responsive Design",
            "description": "Mobile-friendly responsive web design"
          }
        }
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": [
      "Web Design",
      "Website Development", 
      "E-commerce Development",
      "Responsive Design",
      "UI/UX Design"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UNICX Web Design",
    "url": "https://web.unicx.in",
    "description": "Professional web design and development services",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://web.unicx.in/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
