"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type Tab = {
  title: string;
  value: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  activeValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
};

function moveSelectedTabToTop(tabs: Tab[], value: string) {
  const nextTabs = [...tabs];
  const selectedIndex = nextTabs.findIndex((tab) => tab.value === value);

  if (selectedIndex <= 0) {
    return nextTabs;
  }

  const [selectedTab] = nextTabs.splice(selectedIndex, 1);
  return [selectedTab, ...nextTabs];
}

export function Tabs({
  tabs: propTabs,
  activeValue,
  onValueChange,
  className,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: TabsProps) {
  const [active, setActive] = React.useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = React.useState<Tab[]>(propTabs);
  const [hovering, setHovering] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const nextActive =
      propTabs.find((tab) => tab.value === activeValue) ?? propTabs[0];

    if (!nextActive) {
      return;
    }

    setActive(nextActive);
    setTabs((currentTabs) => moveSelectedTabToTop(currentTabs, nextActive.value));
  }, [activeValue, propTabs]);

  const selectTab = (tab: Tab) => {
    setActive(tab);
    setTabs((currentTabs) => moveSelectedTabToTop(currentTabs, tab.value));
    onValueChange?.(tab.value);
  };

  const handlePrev = () => {
    const currentIndex = propTabs.findIndex((t) => t.value === active.value);
    const prevIndex = (currentIndex - 1 + propTabs.length) % propTabs.length;
    const prevTab = propTabs[prevIndex];
    if (prevTab) selectTab(prevTab);
  };

  const handleNext = () => {
    const currentIndex = propTabs.findIndex((t) => t.value === active.value);
    const nextIndex = (currentIndex + 1) % propTabs.length;
    const nextTab = propTabs[nextIndex];
    if (nextTab) selectTab(nextTab);
  };

  return (
    <div className={cn("relative flex h-full w-full flex-col", className)}>
      {!isMobile && (
        <div
          className={cn(
            "relative z-40 flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible",
            containerClassName
          )}
        >
          {propTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => selectTab(tab)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn(
                "relative rounded-none px-4 py-2 text-sm font-medium text-white transition-colors hover:text-white",
                tabClassName
              )}
            >
              {active.value === tab.value ? (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 rounded-none bg-white",
                    activeTabClassName
                  )}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-20 block whitespace-nowrap",
                  active.value === tab.value ? "text-black" : "text-slate-400"
                )}
              >
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      )}

      {isMobile ? (
        <div className={cn("w-full mt-2", contentClassName)}>
          {active.content}
        </div>
      ) : (
        <FadeInDiv
          tabs={tabs}
          active={active}
          hovering={hovering}
          className={cn("mt-32", contentClassName)}
        />
      )}

      {isMobile && (
        <div className="flex items-center justify-between w-full px-4 py-2 bg-white border border-black/10 rounded-none mt-2 max-w-sm mx-auto shadow-md shadow-black/5">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-none border border-black/10 text-black transition hover:bg-black/5 active:scale-95 cursor-pointer outline-none"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-sm font-semibold tracking-wide text-black uppercase font-mono">
            {active.title}
          </span>
          
          <button
            type="button"
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-none border border-black/10 text-black transition hover:bg-black/5 active:scale-95 cursor-pointer outline-none"
            aria-label="Next category"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function FadeInDiv({
  tabs,
  active,
  hovering,
  className,
}: {
  tabs: Tab[];
  active: Tab;
  hovering: boolean;
  className?: string;
}) {
  const isActive = (tab: Tab) => tab.value === active.value;

  return (
    <div className="relative h-full w-full">
      {tabs.map((tab, index) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          layout="position"
          style={{ zIndex: tabs.length - index }}
          animate={{
            scale: 1 - index * 0.08,
            top: hovering ? index * -50 : 0,
            opacity: index < 3 ? 1 - index * 0.12 : 0,
            y: isActive(tab) ? [0, 36, 0] : 0,
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 260,
              damping: 30,
              mass: 0.9,
            },
            top: {
              type: "spring",
              stiffness: 260,
              damping: 30,
              mass: 0.9,
            },
            opacity: { duration: 0.25, ease: "easeOut" },
            y: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
          }}
          className={cn(
            "absolute left-0 top-0 h-full w-full",
            className
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
}
