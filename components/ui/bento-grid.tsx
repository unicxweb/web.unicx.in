"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type BentoGridProps = React.HTMLAttributes<HTMLDivElement>;

type BentoCardProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  name: string;
  description: string;
  href: string;
  cta: string;
  className?: string;
  background: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
};

export function BentoGrid({ className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[18rem] grid-cols-1 gap-4 lg:grid-cols-3 lg:auto-rows-[10rem]",
        className
      )}
      {...props}
    />
  );
}

export function BentoCard({
  name,
  description,
  href,
  cta,
  className,
  background,
  Icon,
  ...props
}: BentoCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-lg",
        "border border-gray-950/[.1] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]",
        "transition-all duration-300 ease-out hover:shadow-[0_22px_58px_rgba(0,0,0,0.16)]",
        className
      )}
      {...props}
    >
      {background}

      <div className="pointer-events-none z-10 mt-auto flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 ease-out group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-neutral-700">{name}</h3>
        <p className="max-w-lg text-base text-neutral-500">{description}</p>
      </div>

      <div className="absolute bottom-0 z-20 flex w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <span className="pointer-events-none text-sm font-medium text-neutral-700">
          {cta}
        </span>
        <span className="ml-2 text-sm text-neutral-700">-&gt;</span>
      </div>
    </a>
  );
}
