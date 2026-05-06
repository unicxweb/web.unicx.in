"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { serviceCategories } from "@/lib/site-data";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      if (categoryTimeoutRef.current) {
        clearTimeout(categoryTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 px-6 pt-6 sm:px-8 lg:px-12"
    >
      <nav
        className={cn(
          "mx-auto w-full max-w-7xl rounded-lg border px-5 py-3 transition-all duration-500 sm:px-7",
          isScrolled
            ? "border-white/20 bg-black"
            : "border-white/0 bg-transparent"
        )}
      >
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-[13px] font-semibold uppercase tracking-[0.46em] text-white/90 transition hover:text-white"
          >
            studio.unicx
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              item.label === "Services" ? (
                <div
                  key={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                    setIsServicesDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setIsServicesDropdownOpen(false);
                      setActiveCategory(null);
                    }, 150);
                  }}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.25rem] text-white transition-colors hover:text-gray-400"
                    )}
                  >
                    {item.label}
                    <svg
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        isServicesDropdownOpen && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isServicesDropdownOpen ? 1 : 0,
                      y: isServicesDropdownOpen ? 0 : -8,
                      scale: isServicesDropdownOpen ? 1 : 0.95,
                      pointerEvents: isServicesDropdownOpen ? "auto" : "none",
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.15 },
                      scale: { duration: 0.2 }
                    }}
                    className="absolute top-full left-0 mt-7 w-80 rounded-lg border border-white/20 bg-black"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) {
                        clearTimeout(dropdownTimeoutRef.current);
                        dropdownTimeoutRef.current = null;
                      }
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setIsServicesDropdownOpen(false);
                        setActiveCategory(null);
                      }, 150);
                    }}
                  >
                    <div className="p-3">
                      <Link
                        href="/services"
                        className="block rounded-lg px-4 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300 transition-all duration-200 hover:bg-white/[0.08] hover:text-white hover:translate-x-1"
                      >
                        All Services
                      </Link>
                      <div className="my-2 border-t border-white/10" />
                      {serviceCategories.map((category) => {
                        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <div
                            key={category.name}
                            className="relative"
                            onMouseEnter={() => {
                            if (categoryTimeoutRef.current) {
                              clearTimeout(categoryTimeoutRef.current);
                              categoryTimeoutRef.current = null;
                            }
                            setActiveCategory(category.name);
                          }}
                          onMouseLeave={() => {
                            categoryTimeoutRef.current = setTimeout(() => {
                              setActiveCategory(null);
                            }, 150);
                          }}
                          >
                            <div className="flex items-center justify-between rounded-lg px-4 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300 transition-all duration-200 hover:bg-white/[0.08] hover:text-white hover:translate-x-1">
                              <span>{category.name}</span>
                              <svg
                                className="h-3 w-3 text-slate-400 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>

                            <motion.div
                              initial={false}
                              animate={{
                                opacity: activeCategory === category.name ? 1 : 0,
                                x: activeCategory === category.name ? 0 : -8,
                                scale: activeCategory === category.name ? 1 : 0.95,
                                pointerEvents: activeCategory === category.name ? "auto" : "none",
                              }}
                              transition={{ 
                                duration: 0.18, 
                                ease: [0.25, 0.46, 0.45, 0.94],
                                opacity: { duration: 0.12 },
                                scale: { duration: 0.18 }
                              }}
                              className="absolute top-0 left-full w-64 rounded-lg border border-white/20 bg-black"
                              onMouseEnter={() => {
                                if (categoryTimeoutRef.current) {
                                  clearTimeout(categoryTimeoutRef.current);
                                  categoryTimeoutRef.current = null;
                                }
                              }}
                              onMouseLeave={() => {
                                categoryTimeoutRef.current = setTimeout(() => {
                                  setActiveCategory(null);
                                }, 150);
                              }}
                            >
                              <div className="p-3">
                                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                                  {category.name}
                                </div>
                                {category.items.map((service) => {
                                  const serviceSlug = service.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
                                  return (
                                    <Link
                                      key={service}
                                      href={`/services/${categorySlug}/${serviceSlug}`}
                                      className="block rounded-lg px-3 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-300 transition-all duration-200 hover:bg-white/[0.08] hover:text-white hover:translate-x-1"
                                    >
                                      {service}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.25rem] text-white transition-colors hover:text-gray-400"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-slate-200"
            >
              Free Consultation
            </Link>

            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              <a
                href="https://x.com/studio.unicx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-all duration-300 ease-out hover:text-white hover:scale-125 hover:rotate-6 active:scale-110"
                aria-label="X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/studio.unicx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-all duration-300 ease-out hover:text-white hover:scale-125 hover:-rotate-6 active:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/studio.unicx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-all duration-300 ease-out hover:text-white hover:scale-125 hover:rotate-12 active:scale-110"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-black text-white/85 transition hover:border-white/35 hover:bg-white/[0.025] md:hidden"
          >
            <span className="relative h-3.5 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-4 bg-current transition-all duration-300",
                  isMenuOpen && "top-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[6px] h-px w-4 bg-current transition-all duration-300",
                  isMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-px w-4 bg-current transition-all duration-300",
                  isMenuOpen && "top-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
            marginTop: isMenuOpen ? 20 : 0,
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden md:hidden"
        >
          <div className="border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                item.label === "Services" ? (
                  <div key={item.href} className="space-y-2">
                    <Link
                      href="/services"
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "text-[10px] font-medium uppercase tracking-[0.36em] transition hover:text-white",
                        pathname === "/services" ? "text-white" : "text-slate-300"
                      )}
                    >
                      {item.label}
                    </Link>
                    <div className="ml-4 space-y-1">
                      {serviceCategories.map((category) => {
                        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <Link
                            key={category.name}
                            href={`/services/${categorySlug}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-[9px] font-medium uppercase tracking-[0.3em] text-slate-400 transition hover:text-white"
                          >
                            {category.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.36em] transition hover:text-white",
                      pathname === item.href ? "text-white" : "text-slate-300"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-slate-200"
              >
                Start Project
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
