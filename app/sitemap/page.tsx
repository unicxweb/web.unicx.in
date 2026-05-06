import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { serviceCategories } from "@/lib/site-data";
import Link from "next/link";

export const metadata = {
  title: "Sitemap | studio.unicx",
  description: "Complete site structure and navigation overview of studio.unicx website",
  keywords: ["sitemap", "site structure", "navigation", "studio.unicx"],
};

export default function SitemapPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute left-[-8%] top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="noise-overlay" />
      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-4 sm:px-8 md:pt-6 lg:px-12">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" }, 
            { label: "Sitemap" }
          ]} 
        />

        <div className="mt-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Sitemap
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Complete overview of our website structure and navigation
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Main Pages Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Main Pages</h2>
              <div className="space-y-3">
                <SitemapLink href="/" title="Home" description="Homepage and main landing page" />
                <SitemapLink href="/services" title="Services" description="Overview of all our services" />
                <SitemapLink href="/work" title="Work" description="Portfolio and case studies" />
                <SitemapLink href="/about" title="About" description="Learn about our company and team" />
                <SitemapLink href="/contact" title="Contact" description="Get in touch with us" />
              </div>
            </div>

            {/* Legal Pages Section */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Legal & Policies</h2>
              <div className="space-y-3">
                <SitemapLink href="/privacy" title="Privacy Policy" description="How we handle your data" />
                <SitemapLink href="/terms" title="Terms of Service" description="Terms and conditions" />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Services</h2>
              <div className="space-y-6">
                {serviceCategories.map((category) => {
                  const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div key={category.name} className="border-l-2 border-white/20 pl-4">
                      <Link 
                        href={`/services/${categorySlug}`}
                        className="block hover:text-white transition-colors"
                      >
                        <h3 className="text-lg font-medium text-white mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3">{category.description}</p>
                      </Link>
                      <div className="space-y-2">
                        {category.items.map((service) => {
                          const serviceSlug = service.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
                          return (
                            <Link
                              key={service}
                              href={`/services/${categorySlug}/${serviceSlug}`}
                              className="block text-sm text-slate-300 hover:text-white transition-colors pl-4 py-1"
                            >
                              {service}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <Footer />
      </div>
    </main>
  );
}

function SitemapLink({ href, title, description }: { 
  href: string; 
  title: string; 
  description: string;
}) {
  return (
    <Link 
      href={href}
      className="block p-4 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
        <svg className="w-5 h-5 text-slate-500 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
