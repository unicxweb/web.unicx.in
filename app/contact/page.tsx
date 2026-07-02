import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Studio UnicX | Get Started with Web Design & Development Services",
  description: "Contact Studio UnicX for professional web design and development services. Start your project with our expert team.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "contact Studio UnicX",
    "web design contact",
    "web development consultation",
    "hire web developers",
    "digital project inquiry",
    "start web project"
  ],
  openGraph: {
    title: "Contact Studio UnicX | Get Started with Web Design & Development Services",
    description: "Contact Studio UnicX for professional web design and development services. Start your project with our expert team.",
    url: "https://studio.unicx.in/contact",
    type: "website",
    siteName: "Studio UnicX",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Studio UnicX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Studio UnicX | Get Started with Web Design & Development Services",
    description: "Contact Studio UnicX for professional web design and development services. Start your project with our expert team.",
    images: ["/og-contact.jpg"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
