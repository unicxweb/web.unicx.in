"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    question: "What web graphic design services do you offer?",
    answer: "We offer comprehensive web graphic design services including UI/UX design, responsive web design, e-commerce website development, custom web applications, landing pages, and website redesign. Our team creates visually stunning, user-friendly websites that drive business growth."
  },
  {
    question: "How long does a typical web graphic design project take?",
    answer: "Project timelines vary based on complexity. A standard business website typically takes 4-8 weeks, while e-commerce platforms may require 8-12 weeks. Custom web applications can take 3-6 months. We provide detailed timelines during our initial consultation."
  },
  {
    question: "Do you provide ongoing website maintenance and support?",
    answer: "Yes, we offer comprehensive website maintenance packages including security updates, performance optimization, content updates, and technical support. We ensure your website remains secure, fast, and up-to-date with the latest web standards."
  },
  {
    question: "What technologies do you use for web development?",
    answer: "We work with modern web technologies including React, Next.js, Node.js, TypeScript, and various CMS platforms like WordPress and Shopify. We choose the best technology stack based on your specific business requirements and scalability needs."
  },
  {
    question: "Do you create mobile-responsive websites?",
    answer: "Absolutely! All our websites are fully responsive and optimized for all devices - desktops, tablets, and mobile phones. We ensure your website provides an excellent user experience across all screen sizes and devices."
  },
  {
    question: "Can you help with SEO for my website?",
    answer: "Yes, we implement SEO best practices during development including proper meta tags, structured data, fast loading speeds, and mobile optimization. We also offer ongoing SEO services to improve your search engine rankings and organic traffic."
  },
  {
    question: "What is your web graphic design process?",
    answer: "Our process includes: 1) Discovery and strategy, 2) Wireframing and design, 3) Development and testing, 4) Launch and deployment, 5) Training and support. We maintain clear communication throughout the project and involve you at each stage."
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes, we work with startups, small businesses, and large enterprises. We scale our services to meet your specific needs and budget, ensuring you get the best value for your investment in web design and development."
  }
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 5v14"
        className="transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <path d="M5 12h14" />
    </svg>
  );
}

export function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-20 sm:pt-28 lg:pt-36 2xl:pt-40">
      <ScrollReveal className="text-left" amount={0.24}>
        <div className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-slate-500">
          <span className="section-dot" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="max-w-3xl text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold uppercase leading-[0.98] tracking-[-0.02em] text-white">
          Everything you need to know about our web graphic design services
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-400 sm:text-[17px] sm:leading-8">
          Get answers to common questions about our web graphic design and development process, 
          technologies, and how we can help your business grow online.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-8 sm:mt-14 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-start">
        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-white/30 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-5 sm:py-6 text-left transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[17px] font-medium leading-7 text-white sm:text-[19px]">
                    {faq.question}
                  </h3>
                  <span className="flex items-start justify-start pt-1 text-slate-500">
                    <span className="inline-flex">
                      <PlusIcon open={openIndex === index} />
                    </span>
                  </span>
                </div>
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-5 sm:pb-6 pr-4 sm:pr-10">
                  <p className="text-[15px] leading-7 text-slate-400 sm:text-[16px]">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.08} distance={28} amount={0.18}>
          <div className="relative mx-auto w-full max-w-[28rem] overflow-hidden rounded-lg border border-white/30 bg-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.22)] lg:sticky lg:top-28 lg:mr-0">
            <div className="h-[20rem] sm:h-[26rem] lg:h-[32rem]">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&h=1100&fit=crop&q=80"
                alt="UNICX consultation and project support"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45">
                Support
              </div>
              <h3 className="mt-3 max-w-sm text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-white">
                Answers before the work begins.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/58">
                Clear scope, timelines, tools, and support expectations from
                the first conversation.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
