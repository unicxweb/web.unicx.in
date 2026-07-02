import { Metadata } from "next";
import { StudioClient } from "./StudioClient";

export const metadata: Metadata = {
  title: "About Studio UnicX | Professional Web Design & Development Company",
  description: "Learn about Studio UnicX - a professional web design and development company focused on creating premium digital systems. Our team delivers clarity, restraint, and measurable results.",
  alternates: {
    canonical: "/studio",
  },
  keywords: [
    "About Studio UnicX",
    "web design company",
    "web development team",
    "digital agency",
    "professional web services",
    "web design experts",
    "Studio UnicX team",
    "digital solutions company"
  ],
  openGraph: {
    title: "About Studio UnicX | Professional Web Design & Development Company",
    description: "Learn about Studio UnicX - a professional web design and development company focused on creating premium digital systems.",
    url: "https://studio.unicx.in/studio",
    type: "website",
    siteName: "Studio UnicX",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Studio UnicX Web Design Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Studio UnicX | Professional Web Design & Development Company",
    description: "Learn about Studio UnicX - a professional web design and development company focused on creating premium digital systems.",
    images: ["/og-about.jpg"],
  },
};

export default function AboutPage() {
  return <StudioClient />;
}

