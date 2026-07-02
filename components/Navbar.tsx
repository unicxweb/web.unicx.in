"use client";

import Image from "next/image";
import { TransitionLink as Link } from "@/components/ui/page-transition";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { serviceCategories } from "@/lib/site-data";
import { SocialDock } from "@/components/SocialIcons";
import { ContactPopup } from "@/components/ContactPopup";
import { MarqueeCTA } from "@/components/MarqueeCTA";
import { CurvedNavbar, defaultNavItems } from "@/components/ui/curved-menu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const fullscreenServicePaths = serviceCategories.map(
  (category) => `/services/${category.name.toLowerCase().replace(/\s+/g, "-")}`
);

function isFullscreenServicePath(pathname: string | null) {
  const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";
  return fullscreenServicePaths.includes(normalizedPath);
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);



  const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";
  const isSpecialPage = 
    normalizedPath === "/services" ||
    normalizedPath === "/careers" || 
    normalizedPath === "/contact" || 
    normalizedPath === "/sitemap" ||
    normalizedPath === "/studio";

  useEffect(() => {
    const onScroll = () => {
      if (isFullscreenServicePath(pathname)) {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 18);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (isFullscreenServicePath(pathname)) {
      setIsScrolled(true);
    }
  }, [pathname]);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full pt-3 sm:pt-4 flex justify-center transition-all duration-300",
        (isSpecialPage && !isScrolled) && "bg-black border-b border-white/10"
      )}
    >
      <nav
        className={cn(
          "relative z-50 mx-auto transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          (isScrolled && !isMenuOpen)
            ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-7xl rounded-lg border border-white/10 bg-black/85 backdrop-blur-md px-5 py-3 sm:px-7 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            : "w-full max-w-full rounded-none border border-transparent bg-transparent px-6 py-4 sm:px-8 lg:px-12"
        )}
      >
        <div className="flex items-center justify-between gap-6 w-full">
          {/* Column 1: Logo on the Left */}
          <div className="flex flex-1 items-center justify-start">
            <Link
              href="/"
              data-navbar-logo
              className={cn(
                "relative block h-9 w-24 shrink-0 transition-all duration-300 hover:opacity-85",
                isMenuOpen && "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
              )}
              aria-label="Studio UnicX home"
            >
              <Image
                src="/images/optimized/SU10.webp"
                alt="Studio UnicX"
                fill
                priority
                sizes="96px"
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* Column 2: Nav Links Centered in Middle */}
          <div className="hidden items-center gap-8 md:flex justify-center z-50 md:absolute md:left-1/2 md:-translate-x-1/2 md:transform">
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
                      "flex items-center gap-1 whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.22rem] text-white transition-colors hover:text-gray-400"
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
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-7 w-80 rounded-lg transition-all duration-300",
                      isScrolled
                        ? "bg-black/85 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                        : "bg-black border border-white/20"
                    )}
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
                          <Link
                            key={category.name}
                            href={`/services/${categorySlug}`}
                            className="block rounded-lg px-4 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300 transition-all duration-200 hover:bg-white/[0.08] hover:text-white hover:translate-x-1"
                          >
                            {category.name}
                          </Link>
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
                      "font-sans text-[10px] uppercase tracking-[0.22rem] text-white transition-colors hover:text-gray-400"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Column 3: Actions on the Right */}
            <div className="flex flex-1 items-center justify-end gap-8">
              <div className="hidden items-center gap-8 md:flex">
                <ContactPopup>
                  <MarqueeCTA />
                </ContactPopup>

                <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                  <SocialDock />
                </div>
              </div>

              <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((open) => !open)}
                className="relative z-50 inline-flex h-10 w-10 items-center justify-end transition-all duration-300 md:hidden"
              >
            <div className="relative w-5 h-4 flex flex-col justify-between items-start">
              <span
                className={cn(
                  "block h-[2.5px] rounded-full transition-all duration-300 bg-[#FF6A00]",
                  isMenuOpen
                    ? "rotate-45 translate-y-[7px] w-5"
                    : "w-5"
                )}
              />
              <span
                className={cn(
                  "block h-[2.5px] rounded-full transition-all duration-300 bg-[#FF9F00]",
                  isMenuOpen
                    ? "opacity-0 w-5"
                    : "w-[13px]"
                )}
              />
              <span
                className={cn(
                  "block h-[2.5px] rounded-full transition-all duration-300 bg-[#FFC400]",
                  isMenuOpen
                    ? "-rotate-45 -translate-y-[7px] w-5"
                    : "w-[8px]"
                )}
              />
            </div>
          </button>
        </div>
      </div>
      </nav>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <CurvedNavbar
            setIsActive={setIsMenuOpen}
            navItems={defaultNavItems}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
