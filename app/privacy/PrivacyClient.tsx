"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ease = {
  ui: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hero: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const policySections = [
  {
    number: "01",
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as when you contact us through our website, email, or other communication channels. This may include your name, email address, phone number, and any other project-related information you choose to provide.",
  },
  {
    number: "02",
    title: "Cookies and Tracking",
    content: "We use cookies and similar tracking technologies to enhance your experience on our website. When you first visit our site, you'll be presented with a cookie consent banner where you can choose which types of cookies you'd like to accept.",
    sublist: [
      { label: "Necessary Cookies", desc: "Essential for the website to function properly." },
      { label: "Analytics Cookies", desc: "Help us understand how visitors interact with our website." },
      { label: "Marketing Cookies", desc: "Used to track visitors across websites for marketing purposes." }
    ]
  },
  {
    number: "03",
    title: "How We Use Your Information",
    content: "We use the information we collect to respond to your inquiries, deliver our digital products and web design services, improve our site usability, manage cookie preferences, and comply with any regulatory or legal obligations.",
  },
  {
    number: "04",
    title: "Data Security",
    content: "We implement rigorous technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data privacy is core to how we construct our systems.",
  },
  {
    number: "05",
    title: "Third-Party Services",
    content: "Our website may use third-party services (like analytics tools and hosting providers) that collect, use, and share data according to their own privacy policies. We do not control these third parties' tracking systems.",
  },
  {
    number: "06",
    title: "Your Rights & Contact",
    content: "You have the right to access, update, or delete your personal information at any time. To exercise these rights or if you have any questions regarding this policy, feel free to reach out to our team directly.",
    link: {
      label: "hello@unicx.in",
      href: "mailto:hello@unicx.in"
    }
  }
];

export function PrivacyClient() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fafafa]">
      <div className="noise-overlay opacity-30 pointer-events-none" />
      <Navbar />

      <div className="font-sans">
        {/* ─── Hero Section (Light Theme) ─── */}
        <section className="relative w-full px-6 pt-40 pb-20 sm:px-8 sm:pt-52 sm:pb-28 lg:px-12 lg:pt-60 lg:pb-32 bg-[#fafafa]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: ease.ui }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="section-dot" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Legal
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.05, ease: ease.hero }}
                  className="text-[clamp(2.5rem,6.8vw,5.3rem)] font-light leading-[0.94] tracking-tight text-zinc-950"
                >
                  Privacy Policy
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: ease.ui }}
                  className="mt-6 max-w-2xl text-[15px] leading-7 text-zinc-500 sm:text-[17px] sm:leading-8"
                >
                  We believe in complete transparency. This policy outlines how Studio UnicX collects, uses, and safeguards your data when you interact with our website and digital services.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: ease.ui }}
                className="border-l border-zinc-200/80 pl-6 lg:justify-self-end"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-400">
                  Last Updated
                </div>
                <div className="mt-2 text-[20px] font-light tracking-tight text-zinc-950">
                  June 2026
                </div>
                <p className="mt-2 max-w-xs text-[13px] leading-5 text-zinc-400">
                  Replaces all previous policy iterations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Content Section (Dark Theme) ─── */}
        <section className="relative z-10 bg-black text-white py-24 sm:py-32 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-4xl space-y-16">
              {policySections.map((section, index) => (
                <motion.div
                  key={section.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease: ease.ui }}
                  className="grid grid-cols-1 gap-6 md:grid-cols-[80px_1fr] border-t border-white/10 pt-10 first:border-t-0 first:pt-0"
                >
                  <div className="text-[12px] font-mono tracking-widest text-[#fd5200]/80">
                    {section.number}
                  </div>
                  <div>
                    <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-light tracking-tight text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-[15px] leading-7 text-slate-300 font-light max-w-3xl">
                      {section.content}
                    </p>

                    {section.sublist && (
                      <div className="mt-8 space-y-4 max-w-2xl border-l border-white/10 pl-6">
                        {section.sublist.map((item) => (
                          <div key={item.label}>
                            <h4 className="text-[13px] font-medium text-white tracking-wide">
                              {item.label}
                            </h4>
                            <p className="text-[13px] leading-5 text-slate-400 font-light mt-1">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.link && (
                      <div className="mt-6">
                        <Link
                          href={section.link.href}
                          className="inline-flex items-center gap-2 border-b border-[#fd5200] pb-0.5 text-[14px] font-medium text-white transition hover:text-[#fd5200]"
                        >
                          {section.link.label}
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 transition-transform duration-300 transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14" />
                            <path d="m13 5 7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
