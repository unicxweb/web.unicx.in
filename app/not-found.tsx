import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-x-clip bg-black px-6">
      <div className="noise-overlay" />
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Not Found" }]}
            className="justify-center"
          />
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.36em] text-slate-500">
          Not Found
        </div>
        <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold uppercase leading-[0.94] tracking-[-0.05em] text-white">
          This page is not available.
        </h1>
        <p className="mt-6 text-[15px] leading-7 text-slate-400 sm:text-[17px] sm:leading-8">
          The link may be outdated, or the page may have moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
