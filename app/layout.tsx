import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { CookieProvider } from "@/lib/cookie-context";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
import Preloader from "@/components/Preloader";
import CookieConsent from "@/components/CookieConsent";
import { PageTransitionProvider } from "@/components/ui/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Import JetBrains Mono for premium monospace typography
const jetbrainsMono = "'JetBrains Mono', 'Consolas', 'Monaco', monospace";

export const metadata: Metadata = {
  title: {
    default: "Studio UnicX | Web Development, UI/UX & Digital Agency",
    template: "%s | Studio UnicX"
  },
  description:
    "Studio UnicX is a creative digital agency specializing in website development, UI/UX design, branding, SEO, and software solutions.",
  keywords: [
    "Studio UnicX",
    "web graphic design",
    "website development",
    "custom web graphic design",
    "professional web development",
    "responsive web graphic design",
    "e-commerce websites",
    "web graphic design services",
    "website development company"
  ],
  authors: [{ name: "Studio UnicX" }],
  creator: "Studio UnicX",
  publisher: "Studio UnicX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://studio.unicx.in'),
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/favicon/android-chrome-512x512.png',
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studio.unicx.in",
    siteName: "Studio UnicX",
    title: "Studio UnicX | Web Development, UI/UX & Digital Agency",
    description: "Studio UnicX is a creative digital agency specializing in website development, UI/UX design, branding, SEO, and software solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Studio UnicX Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio UnicX | Web Development, UI/UX & Digital Agency",
    description: "Studio UnicX is a creative digital agency specializing in website development, UI/UX design, branding, SEO, and software solutions.",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Critical fonts needed for initial paint */}
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        {/* Display fonts deferred to prevent render blocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
              })();
            `
          }}
        />
      </head>
      <body className={`${inter.variable} bg-ink text-foreground antialiased`} suppressHydrationWarning>
        <Preloader />
        <CookieProvider>
          <PageTransitionProvider>
            <GoogleAnalytics />
            {children}
            <CookieConsent />
          </PageTransitionProvider>
        </CookieProvider>
      </body>
    </html>
  );
}
