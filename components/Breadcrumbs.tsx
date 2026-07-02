"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  maxVisible?: number;
};

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function MoreHorizontalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

export function Breadcrumbs({ items, className = "", maxVisible = 3 }: BreadcrumbsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // If we don't exceed maxVisible, just render normally
  if (items.length <= maxVisible) {
    return (
      <nav
        aria-label="Breadcrumb"
        className={`mb-8 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 ${className}`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-300" : ""}>{item.label}</span>
              )}
              {!isLast ? <ChevronRightIcon /> : null}
            </div>
          );
        })}
      </nav>
    );
  }

  // Calculate items to show and hide
  // Show exactly two items: the very first and the very last. Hide everything in between.
  const startItems = items.slice(0, 1); // First item
  const endItems = items.slice(-1); // Last item
  const hiddenItems = items.slice(1, -1); // Middle items

  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-8 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 ${className}`}
    >
      <AnimatePresence initial={false}>
        {/* Start Items */}
        {startItems.map((item, index) => (
          <motion.div layout key={`start-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            <ChevronRightIcon />
          </motion.div>
        ))}

        {/* Toggle Button */}
        <motion.div layout key="toggle-btn" className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex h-6 w-6 items-center justify-center rounded transition-colors ${
              isExpanded 
                ? "bg-white/[0.08] text-white" 
                : "bg-white/[0.03] text-white/50 hover:bg-white/[0.08] hover:text-white"
            }`}
            aria-label={isExpanded ? "Collapse breadcrumbs" : "Expand breadcrumbs"}
          >
            <MoreHorizontalIcon />
          </button>
          <ChevronRightIcon />
        </motion.div>

        {/* Hidden Items (Inline Expansion) */}
        {isExpanded && (
          hiddenItems.map((item, index) => (
            <motion.div
              layout
              key={`hidden-${index}`}
              initial={{ opacity: 0, width: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, width: "auto", scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, width: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
            >
              {item.href ? (
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              <ChevronRightIcon />
            </motion.div>
          ))
        )}

        {/* End Items */}
        {endItems.map((item, index) => {
          const isLast = index === endItems.length - 1;

          return (
            <motion.div layout key={`end-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-300" : ""}>{item.label}</span>
              )}
              {!isLast ? <ChevronRightIcon /> : null}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </nav>
  );
}
