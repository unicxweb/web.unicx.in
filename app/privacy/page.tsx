import { Metadata } from "next";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Studio UnicX",
  description: "Privacy policy for Studio UnicX - How we collect, use, and protect your information.",
  alternates: {
    canonical: "/privacy",
  },
  keywords: [
    "privacy policy",
    "Studio UnicX privacy",
    "data protection",
    "cookie settings",
    "cookie policy"
  ],
  openGraph: {
    title: "Privacy Policy | Studio UnicX",
    description: "Privacy policy for Studio UnicX - How we collect, use, and protect your information.",
    url: "https://studio.unicx.in/privacy",
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
    title: "Privacy Policy | Studio UnicX",
    description: "Privacy policy for Studio UnicX - How we collect, use, and protect your information.",
    images: ["/og-image.jpg"],
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
