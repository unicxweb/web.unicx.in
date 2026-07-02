"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType<{ className?: string }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Discovery",
    date: "01",
    content: "Understanding goals, requirements, timelines, and execution priorities.",
    category: "Scope",
    icon: CompassIcon,
    relatedIds: [2],
    status: "completed",
    energy: 92,
  },
  {
    id: 2,
    title: "Strategy",
    date: "02",
    content: "Defining systems, delivery structure, user flows, and implementation scope.",
    category: "Planning",
    icon: RouteIcon,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 86,
  },
  {
    id: 3,
    title: "Build",
    date: "03",
    content: "Building scalable digital experiences across design, software, web, and mobile.",
    category: "Delivery",
    icon: GridIcon,
    relatedIds: [2, 4],
    status: "pending",
    energy: 78,
  },
  {
    id: 4,
    title: "Optimize",
    date: "04",
    content: "Deployment, refinement, monitoring, and long-term performance improvements.",
    category: "Launch",
    icon: SignalIcon,
    relatedIds: [3],
    status: "pending",
    energy: 72,
  },
];

const engagementVisuals: Record<
  number,
  {
    image: string;
    label: string;
    title: string;
    description: string;
  }
> = {
  1: {
    image:
      "/images/optimized/discovery.webp",
    label: "Discovery",
    title: "Start with the right questions.",
    description:
      "Goals, constraints, stakeholders, and priorities are made clear before execution starts.",
  },
  2: {
    image:
      "/images/optimized/Strategy.webp",
    label: "Strategy",
    title: "Turn clarity into a delivery plan.",
    description:
      "Scope, structure, user flows, and milestones are shaped into a practical roadmap.",
  },
  3: {
    image:
      "/images/optimized/Strategy%202.webp",
    label: "Build",
    title: "Move from plan to polished output.",
    description:
      "Design, software, web, and mobile work moves through focused execution cycles.",
  },
  4: {
    image:
      "/images/optimized/discovery%202.webp",
    label: "Optimize",
    title: "Refine what is already live.",
    description:
      "Launch data, performance signals, and feedback guide the next layer of improvement.",
  },
};

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="m14.8 9.2-2 5.6-5.6 2 2-5.6 5.6-2Z" />
    </svg>
  );
}

function RouteIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 6h5a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h11" />
      <path d="M5 3v6" />
      <path d="M19 19v3" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

function SignalIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 4-4 3 3 5-7" />
    </svg>
  );
}

function getStatusStyles(status: TimelineItem["status"]): string {
  switch (status) {
    case "completed":
      return "border-white bg-white text-black";
    case "in-progress":
      return "border-white/70 bg-white/15 text-white";
    case "pending":
      return "border-white/25 bg-black/40 text-white/70";
    default:
      return "border-white/25 bg-black/40 text-white/70";
  }
}

function getStatusLabel(status: TimelineItem["status"]): string {
  switch (status) {
    case "completed":
      return "Complete";
    case "in-progress":
      return "In progress";
    case "pending":
      return "Pending";
    default:
      return "Pending";
  }
}

function RadialOrbitalTimeline({
  timelineData,
  onActiveNodeChange,
}: {
  timelineData: TimelineItem[];
  onActiveNodeChange?: (id: number) => void;
}) {
  const orbitItems = timelineData;
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(-90);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [orbitRadius, setOrbitRadius] = useState(200);
  const [centerOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const syncRadius = () => {
      setIsMobile(window.innerWidth < 768);
      const bounds = containerRef.current?.getBoundingClientRect();

      if (!bounds) {
        setOrbitRadius(window.innerWidth < 640 ? 125 : 170);
        return;
      }

      setOrbitRadius(
        Math.max(115, Math.min(175, Math.min(bounds.width, bounds.height) * 0.32))
      );
    };

    syncRadius();
    window.addEventListener("resize", syncRadius);
    return () => window.removeEventListener("resize", syncRadius);
  }, []);

  useEffect(() => {
    if (!autoRotate) {
      return;
    }

    let lastTime = performance.now();
    let frameId: number;

    const tick = (time: number) => {
      if (time - lastTime >= 50) {
        setRotationAngle((prev) => (prev + 0.22) % 360);
        lastTime = time;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [autoRotate]);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) {
      return false;
    }

    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) {
      return;
    }

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = orbitRadius * Math.cos(radian) + centerOffset.x;
    const y = orbitRadius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current || event.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    const newState: Record<number, boolean> = {};
    const nextExpanded = !expandedItems[id];

    timelineData.forEach((item) => {
      newState[item.id] = item.id === id ? nextExpanded : false;
    });

    setExpandedItems(newState);

    if (nextExpanded) {
      const newPulseEffect: Record<number, boolean> = {};
      getRelatedItems(id).forEach((relatedId) => {
        newPulseEffect[relatedId] = true;
      });
      setActiveNodeId(id);
      setAutoRotate(false);
      setPulseEffect(newPulseEffect);
      centerViewOnNode(id);
      onActiveNodeChange?.(id);
    } else {
      setActiveNodeId(null);
      setAutoRotate(true);
      setPulseEffect({});
    }
  };

  const renderDetailsContent = (item: TimelineItem) => {
    return (
      <>
        <div className="pb-2">
          <div className="flex items-center justify-between">
            <span className={`border px-2 py-1 text-[10px] ${getStatusStyles(item.status)}`}>
              {getStatusLabel(item.status)}
            </span>
            <span className="font-mono text-xs text-white/50">{item.date}</span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-white">
            {item.category}
          </h3>
        </div>

        <div className="text-xs text-white/80">
          <p>{item.content}</p>

          <div className="mt-3 border-t border-white/10 pt-2.5">
            <div className="mb-1 flex items-center justify-between text-[10px]">
              <span className="flex items-center">
                <ZapIcon className="mr-1 h-2.5 w-2.5" />
                Energy Level
              </span>
              <span className="font-mono">{item.energy}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${item.energy}%` }}
              />
            </div>
          </div>

          {item.relatedIds.length > 0 && (
            <div className="mt-3 border-t border-white/10 pt-2.5">
              <div className="mb-1.5 flex items-center">
                <LinkIcon className="mr-1 h-2.5 w-2.5 text-white/70" />
                <h4 className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  Connected Nodes
                </h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {item.relatedIds.map((relatedId) => {
                  const relatedItem = timelineData.find((timelineItem) => timelineItem.id === relatedId);

                  return (
                    <Button
                      key={relatedId}
                      variant="outline"
                      size="sm"
                      className="h-5 rounded-none border-white/20 bg-transparent px-1.5 py-0 text-[10px] text-white/80 transition-all hover:bg-white/10 hover:text-white"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleItem(relatedId);
                      }}
                    >
                      {relatedItem?.title}
                      <ArrowRightIcon className="ml-1 h-1.5 w-1.5 text-white/60" />
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      className="flex h-full min-h-[460px] w-full flex-col items-center justify-center overflow-hidden bg-black sm:min-h-[520px] lg:min-h-[560px]"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse">
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-white opacity-70" />
            <div className="absolute h-24 w-24 animate-ping rounded-full border border-white opacity-50 [animation-delay:0.5s]" />
            <div className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          <div
            className="absolute rounded-full border border-white"
            style={{
              height: orbitRadius * 2,
              width: orbitRadius * 2,
            }}
          />

          {orbitItems.map((item, index) => {
            const position = calculateNodePosition(index, orbitItems.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(element) => {
                  nodeRefs.current[item.id] = element;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={[
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isExpanded
                      ? "scale-150 border-white bg-white text-black shadow-lg shadow-white/30"
                      : isRelated
                      ? "animate-pulse border-white bg-white/50 text-black"
                      : "border-white bg-black text-white",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div
                  className={[
                    "absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300",
                    isExpanded ? "scale-125 text-white" : "text-white/70",
                  ].join(" ")}
                >
                  {item.title}
                </div>

                {!isMobile && isExpanded && (
                  <div className="absolute left-1/2 top-20 w-64 -translate-x-1/2 overflow-visible border border-white/30 bg-black/90 p-4 shadow-xl shadow-white/10 backdrop-blur-lg z-[300]">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                    {renderDetailsContent(item)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isMobile && activeNodeId && (() => {
          const item = timelineData.find((i) => i.id === activeNodeId);
          if (!item) return null;
          return (
            <div className="absolute bottom-4 left-4 right-4 z-50 border border-white/30 bg-black/95 p-4 shadow-xl shadow-white/10 backdrop-blur-lg rounded-none">
              {renderDetailsContent(item)}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export function ServicesEngagementProcess() {
  const [activeVisualId, setActiveVisualId] = useState(1);
  const activeVisual = engagementVisuals[activeVisualId];

  return (
    <section className="pt-20 sm:pt-28 lg:pt-36 2xl:pt-40">
      <ScrollReveal
        className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end"
        amount={0.24}
      >
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500">
            <span className="section-dot" />
            <span>How Engagement Works</span>
          </div>
          <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            How engagement works
          </h2>
        </div>
        <p className="max-w-xl text-[15px] leading-8 text-slate-400 sm:text-base lg:justify-self-end">
          A structured delivery process focused on clarity, execution, and
          scalability.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.08} distance={34} amount={0.12}>
      <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:items-stretch">
        <div className="relative h-[460px] sm:h-[520px] lg:h-[560px] overflow-hidden rounded-none border border-white/30 bg-white/[0.02]">
          <img
            key={activeVisual.image}
            src={activeVisual.image}
            alt={`${activeVisual.label} engagement step`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <div className="max-w-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45">
                {activeVisual.label}
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                {activeVisual.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/58">
                {activeVisual.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[460px] sm:h-[520px] lg:h-[560px] items-center justify-center overflow-hidden rounded-none border border-white/30 bg-white/[0.015]">
          <RadialOrbitalTimeline
            timelineData={timelineData}
            onActiveNodeChange={setActiveVisualId}
          />
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
