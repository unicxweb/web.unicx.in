import { Metadata } from "next";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | Studio UnicX",
  description: "Terms of service for Studio UnicX - Legal terms governing our digital agency services, website usage, and client relationships.",
  alternates: {
    canonical: "/terms",
  },
  keywords: [
    "terms of service",
    "Studio UnicX terms",
    "user agreement",
    "legal terms",
    "project agreement"
  ],
  openGraph: {
    title: "Terms of Service | Studio UnicX",
    description: "Terms of service for Studio UnicX - Legal terms governing our services and client relationships.",
    url: "https://studio.unicx.in/terms",
    type: "website",
    siteName: "Studio UnicX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Studio UnicX Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Studio UnicX",
    description: "Terms of service for Studio UnicX - Legal terms governing our services and client relationships.",
    images: ["/og-image.jpg"],
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
