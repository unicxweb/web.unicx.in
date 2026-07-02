import { Metadata } from "next";
import { CareersClient } from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | Join Studio UnicX Team",
  description: "Build your career with Studio UnicX. We're looking for talented web developers, designers, and digital professionals to join our growing team.",
  alternates: {
    canonical: "/careers",
  },
  keywords: [
    "web design careers",
    "web development jobs",
    "frontend developer jobs",
    "backend developer jobs",
    "UI/UX designer careers",
    "web design employment",
    "tech careers",
    "digital agency jobs"
  ],
  openGraph: {
    title: "Careers | Join Studio UnicX Team",
    description: "Build your career with Studio UnicX. We're looking for talented web developers, designers, and digital professionals to join our growing team.",
    url: "https://studio.unicx.in/careers",
    type: "website",
    siteName: "Studio UnicX",
    images: [
      {
        url: "/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Studio UnicX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Join Studio UnicX Team",
    description: "Build your career with Studio UnicX. We're looking for talented web developers, designers, and digital professionals to join our growing team.",
    images: ["/og-careers.jpg"],
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
