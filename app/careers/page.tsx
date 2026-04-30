import { Metadata } from "next";
import { CareersClient } from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | Join UNICX Web Design Team",
  description: "Build your career with UNICX Web Design. We're looking for talented web developers, designers, and digital professionals to join our growing team.",
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
    title: "Careers | Join UNICX Web Design Team",
    description: "Build your career with UNICX Web Design. We're looking for talented web developers, designers, and digital professionals to join our growing team.",
    url: "https://web.unicx.in/careers",
    images: [
      {
        url: "/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at UNICX Web Design",
      },
    ],
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
