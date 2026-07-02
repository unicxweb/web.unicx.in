import { Metadata } from "next";
import { SitemapClient } from "./SitemapClient";

export const metadata: Metadata = {
  title: "Sitemap | Complete Site Structure | Studio UnicX",
  description: "Complete site structure and navigation overview of Studio UnicX website. Discover our core pages, studio mission, careers, and design & engineering service offerings.",
  alternates: {
    canonical: "/sitemap",
  },
  keywords: ["sitemap", "site structure", "navigation", "Studio UnicX"],
  openGraph: {
    title: "Sitemap | Complete Site Structure | Studio UnicX",
    description: "Complete site structure and navigation overview of Studio UnicX website.",
    url: "https://studio.unicx.in/sitemap",
    type: "website",
    siteName: "Studio UnicX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitemap | Complete Site Structure | Studio UnicX",
    description: "Complete site structure and navigation overview of Studio UnicX website.",
  },
};

export default function SitemapPage() {
  return <SitemapClient />;
}
