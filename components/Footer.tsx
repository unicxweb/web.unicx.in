"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pb-2 pt-10">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,1fr))] md:gap-12">
        <div className="max-w-sm text-center md:text-left">
          <div className="text-[13px] font-semibold uppercase tracking-[0.46em] text-white/90">
            studio.unicx
          </div>
          <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            UniConsultX Solutions Private Limited
          </div>
          <div className="mt-6 relative">
            <p className="text-[15px] leading-7 text-white/90 font-light tracking-wide relative inline-block">
              Transforming ideas into exceptional digital experiences through design, marketing, and development excellence.
              <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></span>
            </p>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">
            Navigation
          </div>
          <div className="mt-5 flex flex-col gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="/work" className="transition hover:text-white">
              Work
            </Link>
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/careers" className="transition hover:text-white">
              Careers
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">
            Core Services
          </div>
          <div className="mt-5 flex flex-col gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            <Link href="/services/graphic-design" className="transition hover:text-white">
              Graphic Design
            </Link>
            <Link href="/services/website-development" className="transition hover:text-white">
              Website Development
            </Link>
            <Link href="/services/app-development" className="transition hover:text-white">
              App Development
            </Link>
            <Link href="/services/software-development" className="transition hover:text-white">
              Software Development
            </Link>
            <Link href="/services/marketing" className="transition hover:text-white">
              Marketing
            </Link>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">
            Reach Out
          </div>
          <div className="mt-5 flex flex-col gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            <Link href="mailto:hello@studio.unicx.in" className="transition hover:text-white">
              hello@studio.unicx.in
            </Link>
            <span>Digital Growth Partner</span>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">
            Social
          </div>
          <div className="mt-5 flex flex-col gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            <a
              href="https://instagram.com/studio.unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://x.com/studio.unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </a>
            <a
              href="https://pinterest.com/studio.unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              Pinterest
            </a>
            <a
              href="https://facebook.com/studio.unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a
              href="https://linkedin.com/company/studio.unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/studio.unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-16 border-t border-white/40 p-6">
        <div className="flex flex-col gap-6 text-center md:flex-row md:justify-between">
          <p className="text-[11px] text-slate-500">
            © 2026 studio.unicx. All rights reserved.
          </p>
          <div className="flex flex-col gap-2 text-center md:flex-row md:gap-4">
              <Link href="/privacy" className="text-[11px] text-slate-500 transition hover:text-white">
                Privacy Policy
              </Link>
              <span className="hidden text-[11px] text-slate-600 md:inline">•</span>
              <Link href="/terms" className="text-[11px] text-slate-500 transition hover:text-white">
                Terms of Service
              </Link>
              <span className="hidden text-[11px] text-slate-600 md:inline">•</span>
              <button 
                onClick={() => {
                  // Clear cookie consent to show banner again
                  localStorage.removeItem("cookie-consent");
                  window.location.reload();
                }}
                className="text-[11px] text-slate-500 transition hover:text-white"
              >
                Cookie Settings
              </button>
              <span className="hidden text-[11px] text-slate-600 md:inline">•</span>
              <Link href="/sitemap" className="text-[11px] text-slate-500 transition hover:text-white">
                Sitemap
              </Link>
              <span className="hidden text-[11px] text-slate-600 md:inline">•</span>
              <Link href="/404" className="text-[11px] text-slate-500 transition hover:text-white">
                404 Page
              </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
