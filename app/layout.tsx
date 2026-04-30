import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { CookieProvider } from "@/lib/cookie-context";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "UNICX Web Design | Professional Website Development Services",
    template: "%s | UNICX Web Design"
  },
  description:
    "UNICX offers professional web design and development services. We create custom, responsive websites that drive business growth. Expert web developers delivering quality solutions.",
  keywords: [
    "web design",
    "website development",
    "custom web design",
    "professional web development",
    "responsive web design",
    "e-commerce websites",
    "web design services",
    "website development company"
  ],
  authors: [{ name: "UNICX" }],
  creator: "UNICX",
  publisher: "UNICX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://web.unicx.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://web.unicx.in",
    siteName: "UNICX Web Design",
    title: "UNICX Web Design | Professional Website Development Services",
    description: "UNICX offers professional web design and development services. We create custom, responsive websites that drive business growth.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UNICX Web Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UNICX Web Design | Professional Website Development Services",
    description: "UNICX offers professional web design and development services. We create custom, responsive websites that drive business growth.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} bg-ink text-foreground antialiased`} suppressHydrationWarning>
        <CookieProvider>
          <GoogleAnalytics />
          {children}
        </CookieProvider>
      </body>
    </html>
  );
}
