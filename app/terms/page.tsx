import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | UNICX",
  description: "UNICX terms of service - Legal terms governing our services and website usage.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-slate-400">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              By accessing and using UNICX's website and services, you accept and agree to be bound 
              by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">2. Services</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              UNICX provides digital services including but not limited to web design, app development, 
              marketing services, and digital consulting. All services are subject to the terms outlined 
              in individual project agreements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">3. Client Responsibilities</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              Clients agree to:
            </p>
            <ul className="mb-4 ml-6 list-disc text-slate-300">
              <li>Provide accurate and timely information required for project completion</li>
              <li>Respond promptly to project communications</li>
              <li>Make timely payments as outlined in project agreements</li>
              <li>Review and provide feedback on deliverables within agreed timeframes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">4. Payment Terms</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              Payment terms are outlined in individual project agreements. Generally, projects require 
              a 50% deposit to begin work, with the remainder due upon project completion. All payments 
              are non-refundable once work has commenced.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">5. Intellectual Property</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              Upon full payment, clients receive ownership of the final deliverables. UNICX retains 
              the right to display completed work in our portfolio and marketing materials unless 
              specifically agreed otherwise in writing.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">6. Limitation of Liability</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              UNICX shall not be liable for any indirect, incidental, special, or consequential 
              damages resulting from the use or inability to use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">7. Termination</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              Either party may terminate the agreement with written notice. UNICX reserves the right 
              to terminate services for non-payment or breach of terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">8. Governing Law</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of India, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">9. Contact Information</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              For questions about these Terms of Service, please contact:
            </p>
            <p className="text-slate-300">
              Email: hello@unicx.in<br />
              Website: unicx.in
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
