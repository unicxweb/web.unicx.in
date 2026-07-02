"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  UserGroupIcon,
  Message01Icon,
  Folder02Icon,
  Add01Icon,
  CircleArrowUpRight02Icon,
  Search01Icon,
  BarChartIcon,
  Tick01Icon,
  Settings02Icon,
  InformationCircleIcon,
  DatabaseIcon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface TabConfig {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  header: string;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardSquare01Icon,
    header: "Project Overview",
    description: "Daily summary of your team performance.",
  },
  {
    id: "management",
    label: "Management",
    icon: UserGroupIcon,
    header: "Team Management",
    description: "Manage roles and user permissions.",
    badge: "10",
  },
  {
    id: "threads",
    label: "Threads",
    icon: Message01Icon,
    header: "Communications",
    description: "High-priority team discussions.",
    badge: "12",
  },
  {
    id: "resources",
    label: "Resources",
    icon: Folder02Icon,
    header: "System Assets",
    description: "Shared documentation and media logs.",
  },
];

const BentoCard = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((currentTab) => {
        const currentIndex = TABS.findIndex((tab) => tab.id === currentTab.id);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const content = useMemo(() => {
    switch (activeTab.id) {
      case "dashboard":
        return <OverviewDashboard />;
      case "management":
        return <ManagementDashboard />;
      case "threads":
        return <ThreadsDashboard />;
      case "resources":
        return <ResourcesDashboard />;
      default:
        return null;
    }
  }, [activeTab.id]);

  return (
    <div className="flex items-center justify-center w-full antialiased">
      <div className="group relative w-full max-w-xl overflow-hidden rounded-none border border-white/10 bg-[#fd5200] shadow-2xl shadow-orange-500/10">
        <div className="p-4 sm:p-6 space-y-1.5 z-10 relative">
          <h2 className="text-xs text-orange-100/80 uppercase tracking-widest">
            Project Dashboard
          </h2>
          <p className="text-lg sm:text-2xl text-white font-medium leading-snug max-w-[480px]">
            High-performance analytics and team collaboration tools in one place.
          </p>
        </div>

        <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden rounded-t-lg">
          <div className="absolute top-20 left-12 sm:left-20 w-full h-full bg-white/5 rounded-3xl border border-white/40 opacity-80" />

          <div className="absolute top-12 left-16 sm:left-28 w-[calc(100%-16px)] sm:w-[calc(100%-28px)] h-[calc(100%-12px)] bg-[#0a0a0a] rounded-tl-3xl shadow-xl flex flex-col overflow-hidden ring-1 ring-white/10">
            <div className="px-5 py-4 rounded-tl-3xl border-b border-white/10 flex items-center relative">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="text-xs text-white/20 uppercase tracking-widest">
                  Workspace
                </span>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-12 sm:w-36 border-r border-white/10 p-1 sm:p-2 flex flex-col gap-1 pt-6 bg-white/[0.02] items-center sm:items-stretch">
                <LayoutGroup>
                  {TABS.map((tab) => {
                    const isActive = activeTab.id === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "relative flex items-center justify-center sm:justify-start gap-1.5 p-2 rounded-xl text-xs transition-colors cursor-pointer w-full",
                          isActive ? "text-white" : "text-white/30 hover:text-white/60"
                        )}
                      >
                        <HugeiconsIcon icon={Icon} size={14} className="z-20 shrink-0 relative" />
                        <span className="hidden sm:inline-block truncate z-20 relative font-medium">{tab.label}</span>
                        {tab.badge && (
                          <span
                            className={cn(
                              "hidden sm:inline-block ml-auto text-[8px] leading-none py-0.5 px-1 rounded-md tabular-nums transition-all z-20 relative",
                              isActive
                                ? "bg-white/10 text-white border border-white/20"
                                : "bg-white/5 text-white/30 border border-transparent"
                            )}
                          >
                            {tab.badge}
                          </span>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-pill"
                            className="absolute left-0 w-[2px] h-4 rounded-full bg-white z-30"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="backgroundIndicator"
                            className="absolute inset-0 rounded-lg bg-white/5 border border-white/10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </LayoutGroup>
              </div>

              {/* Main content */}
              <div className="flex-1 bg-[#0a0a0a] p-5 pt-6 flex flex-col gap-4 overflow-hidden relative">
                <header className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-semibold text-white/50 tracking-tight line-clamp-1 uppercase">
                    {activeTab.header}
                  </h3>
                  <p className="text-[10px] text-white/30 font-normal leading-tight line-clamp-1">
                    {activeTab.description}
                  </p>
                </header>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1"
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoCard;

const OverviewDashboard = () => (
  <div className="flex flex-col gap-3 h-full">
    <div className="relative p-3.5 rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-medium text-white/30">Team Performance</span>
          <HugeiconsIcon icon={CircleArrowUpRight02Icon} size={12} className="text-white/50" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xl font-medium tracking-tight text-white">94.2%</span>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "94.2%" }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
        <span className="text-[9px] text-white/30">Score for Search & Delivery campaigns</span>
      </div>
      <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12">
        <HugeiconsIcon icon={BarChartIcon} size={64} />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-white">1,070</span>
          <span className="text-[8px] text-white/30 uppercase font-medium">Keywords</span>
        </div>
        <HugeiconsIcon icon={Search01Icon} size={14} className="opacity-20 text-white" />
      </div>
      <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-white">2.3M</span>
          <span className="text-[8px] text-white/30 uppercase font-medium">Credits</span>
        </div>
        <HugeiconsIcon icon={InformationCircleIcon} size={14} className="opacity-20 text-white" />
      </div>
    </div>
  </div>
);

const ManagementDashboard = () => (
  <div className="flex flex-col h-full">
    <div className="rounded-xl border border-white/10 overflow-hidden flex flex-col h-full bg-white/[0.02]">
      <div className="bg-white/5 px-3 py-2 border-b border-white/10 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-white/30 uppercase tracking-wider">Active Users</span>
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10">
          <HugeiconsIcon icon={Search01Icon} size={10} className="text-white/20" />
          <span className="text-[8px] text-white/30 font-medium">Search</span>
        </div>
      </div>
      <div className="p-1 flex flex-col gap-0.5">
        {[
          { name: "Anthony Dionne", role: "Pending admin approval", status: "Waitlist", color: "bg-amber-400" },
          { name: "Nick Yahodin", role: "Dealership group admin", status: "Active", color: "bg-emerald-400" },
          { name: "Mujeeb Aimaq", role: "Dealership group user", status: "Active", color: "bg-emerald-400" },
        ].map((user, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center relative">
              <HugeiconsIcon icon={UserIcon} size={10} className="text-white/40" />
              <div className={cn("absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0a0a0a]", user.color)} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[10px] font-medium text-white truncate">{user.name}</span>
              <span className="text-[8px] text-white/30 truncate">{user.role}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <HugeiconsIcon icon={Settings02Icon} size={12} className="text-white/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ThreadsDashboard = () => (
  <div className="flex flex-col gap-3 h-full">
    <div className="grid grid-cols-2 gap-3">
      {[
        { title: "Create a Page", desc: "Build your project base.", icon: Folder02Icon },
        { title: "Create a Task", desc: "Organize with team.", icon: Tick01Icon },
      ].map((card, i) => (
        <div key={i} className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col gap-3 relative overflow-hidden group">
          <div className="flex flex-col gap-1 z-10">
            <span className="text-[12px] font-medium text-white leading-tight">{card.title}</span>
            <span className="text-[9px] text-white/30 leading-tight">{card.desc}</span>
          </div>
          <button className="w-fit flex items-center gap-1.5 px-2 py-1 rounded-md bg-white text-black text-[8px] font-semibold transition-transform active:scale-95 z-10">
            <HugeiconsIcon icon={Add01Icon} size={8} strokeWidth={3} />
            Create
          </button>
        </div>
      ))}
    </div>

    <div className="mt-auto p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-1 px-1.5 rounded-md bg-white/5 border border-white/10">
          <HugeiconsIcon icon={InformationCircleIcon} size={10} className="text-white/30" />
        </div>
        <span className="text-[9px] text-white/30 font-medium">Pin a new item</span>
      </div>
      <HugeiconsIcon icon={Add01Icon} size={12} className="text-white/20" />
    </div>
  </div>
);

const ResourcesDashboard = () => (
  <div className="flex flex-col gap-3 h-full overflow-hidden">
    <div className="flex-1 rounded-xl border border-white/10 flex flex-col bg-white/[0.02] overflow-hidden">
      <div className="bg-white/5 px-3 py-2 border-b border-white/10 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-white/30 uppercase tracking-wider">Archives & Logs</span>
        <HugeiconsIcon icon={DatabaseIcon} size={12} className="text-white/20" />
      </div>
      <div className="flex-1 p-1 overflow-y-auto">
        {[
          { file: "design_spec_v2.pdf", size: "2.4 MB", type: "PDF", icon: Mail01Icon },
          { file: "q4_performance.xls", size: "1.1 MB", type: "XLS", icon: BarChartIcon },
          { file: "branding_assets.zip", size: "48 MB", type: "ZIP", icon: Folder02Icon },
          { file: "system_logs.json", size: "4 KB", type: "JSON", icon: Folder02Icon },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white transition-colors">
              <HugeiconsIcon icon={item.icon} size={12} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[10px] font-medium text-white truncate">{item.file}</span>
              <span className="text-[8px] text-white/30 tabular-nums uppercase">{item.size} • {item.type}</span>
            </div>
            <HugeiconsIcon icon={CircleArrowUpRight02Icon} size={10} className="text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
