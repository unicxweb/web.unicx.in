"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pb-12 pt-10">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,1fr))] md:gap-8">
        <div className="max-w-sm text-center md:text-left">
          <div className="text-[13px] font-semibold uppercase tracking-[0.46em] text-white/90">
            UNICX
          </div>
          <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            UniConsultX Solutions Private Limited
          </div>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            Premium digital services across design, marketing, websites, and
            app development.
          </p>
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
            <span>Design</span>
            <span>Marketing</span>
            <span>App Development</span>
            <span>Website Development</span>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">
            Reach Out
          </div>
          <div className="mt-5 flex flex-col gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            <Link href="mailto:hello@unicx.in" className="transition hover:text-white">
              hello@unicx.in
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
              href="https://instagram.com/unicx"
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
              href="https://x.com/unicx"
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
              href="https://pinterest.com/unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.284 1.219.605 2.211 1.375 2.211 1.58 0 2.964-1.646 2.964-4.031 0-2.115-1.511-3.6-3.766-3.6-2.551 0-4.028 1.657-4.028 3.6 0 .894.651 1.892 1.575 2.33.196.094.299.316.299.658 0 .67-.53 1.612-.563 1.943-.054.468-.394.801-.874.801-1.002 0-1.782-1.115-1.782-2.497 0-1.778 1.352-3.486 3.283-3.486 3.026 0 4.444 2.035 4.444 3.83 0 2.42-1.529 4.114-3.54 4.5-.354.062-.714.091-1.074.091-.262 0-.524-.015-.784-.045.524 1.523 2.032 2.64 3.833 2.647 1.701.007 3.226-.626 4.382-1.637 1.155-1.011 1.862-2.379 1.862-3.878 0-5.842-4.613-10.594-10.594-10.594-5.822 0-10.594 4.752-10.594 10.594 0 1.785.445 3.447 1.228 4.826z"/>
              </svg>
              Pinterest
            </a>
            <a
              href="https://facebook.com/unicx"
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
              href="https://linkedin.com/company/unicx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-16 border-t border-white/5 pt-8">
        <div className="flex flex-col gap-6 text-center md:flex-row md:justify-between">
          <p className="text-[11px] text-slate-500">
            © 2026 UNICX. All rights reserved.
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
              <Link href="/sitemap.xml" className="text-[11px] text-slate-500 transition hover:text-white">
                Sitemap
              </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
