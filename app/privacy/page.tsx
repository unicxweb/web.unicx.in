import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms | UNICX",
  description: "UNICX privacy policy and terms & conditions - How we collect, use, and protect your information, and the terms for using our services.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Privacy Policy & Terms</h1>
          <p className="mt-4 text-slate-400">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          {/* Privacy Policy Section */}
          <section className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-white">Privacy Policy</h2>
            
            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">Information We Collect</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                We collect information you provide directly to us, such as when you contact us through our website, 
                email, or other communication channels. This may include your name, email address, phone number, 
                and any other information you choose to provide.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">Cookies and Tracking Technologies</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                When you first visit our site, you'll be presented with a cookie consent banner where you can 
                choose which types of cookies you'd like to accept.
              </p>
              <div className="mb-4 ml-6">
                <h4 className="mb-2 text-lg font-medium text-white">Types of Cookies We Use:</h4>
                <ul className="mb-4 list-disc text-slate-300">
                  <li><strong>Necessary Cookies:</strong> Essential for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for marketing purposes</li>
                </ul>
                <p className="text-slate-300">
                  You can manage your cookie preferences at any time through the cookie settings in the footer 
                  or by clearing your browser cookies.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">How We Use Your Information</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="mb-4 ml-6 list-disc text-slate-300">
                <li>Respond to your inquiries and provide our services</li>
                <li>Improve our website and services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">Data Security</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">Third-Party Services</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Our website may use third-party services that collect, use, and share data according to 
                their own privacy policies. These services include analytics tools and hosting providers.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">Your Rights</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                You have the right to access, update, or delete your personal information. 
                To exercise these rights, please contact us at hello@unicx.in.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">Contact Us</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-slate-300">
                Email: hello@unicx.in<br />
                Website: unicx.in
              </p>
            </section>
          </section>

          {/* Terms & Conditions Section */}
          <section className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-white">Terms & Conditions</h2>
            
            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">1. Acceptance of Terms</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                By accessing and using our website and services, you agree to be bound by these Terms & Conditions 
                and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">2. Services Description</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                UNICX provides web design, development, digital marketing, and consulting services. We work with clients 
                to create custom digital solutions including websites, mobile applications, brand identities, and marketing strategies.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">3. Client Responsibilities</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                As a client, you agree to:
              </p>
              <ul className="mb-4 ml-6 list-disc text-slate-300">
                <li>Provide accurate and complete information for your project</li>
                <li>Respond promptly to requests for feedback and approvals</li>
                <li>Provide necessary content, assets, and access credentials in a timely manner</li>
                <li>Make timely payments as outlined in project agreements</li>
                <li>Ensure that all provided materials do not violate any third-party rights</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">4. Payment Terms</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Payment terms will be outlined in individual project proposals. Generally:
              </p>
              <ul className="mb-4 ml-6 list-disc text-slate-300">
                <li>A deposit is required to begin work</li>
                <li>Progress payments are due at specified milestones</li>
                <li>Final payment is due upon project completion</li>
                <li>Late payments may incur interest charges</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">5. Project Timeline and Delivery</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Project timelines are estimates based on current scope and requirements. Delays may occur due to:
              </p>
              <ul className="mb-4 ml-6 list-disc text-slate-300">
                <li>Client feedback delays or scope changes</li>
                <li>Third-party dependencies or technical challenges</li>
                <li>Force majeure events beyond our control</li>
              </ul>
              <p className="mb-4 text-slate-300 leading-relaxed">
                We will communicate any timeline changes promptly and work with you to adjust project plans accordingly.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">6. Intellectual Property Rights</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Upon full payment, you will own the final deliverables created specifically for your project. 
                However, we reserve the right to:
              </p>
              <ul className="mb-4 ml-6 list-disc text-slate-300">
                <li>Display your project in our portfolio</li>
                <li>Reuse general code, techniques, and tools developed</li>
                <li>Use project insights to improve our services</li>
              </ul>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Third-party assets (stock photos, fonts, plugins) remain subject to their respective licensing terms.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">7. Confidentiality</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Both parties agree to maintain confidentiality of sensitive information shared during the project. 
                This includes business strategies, proprietary information, and any materials marked as confidential.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">8. Limitation of Liability</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Our liability is limited to the amount paid for services. We are not liable for:
              </p>
              <ul className="mb-4 ml-6 list-disc text-slate-300">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits or business opportunities</li>
                <li>Data loss or security breaches beyond our control</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">9. Termination</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                Either party may terminate the agreement with written notice. Termination terms include:
              </p>
              <ul className="mb-4 ml-6 list-disc text-slate-300">
                <li>Payment for work completed up to termination date</li>
                <li>Transfer of completed deliverables upon final payment</li>
                <li>30-day notice period for termination without cause</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">10. Warranty and Support</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                We warrant that our deliverables will be free from defects for 30 days after delivery. 
                Support and maintenance services are available as separate agreements.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">11. Governing Law</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved 
                through good faith negotiation and, if necessary, through binding arbitration.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">12. Changes to Terms</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                We reserve the right to update these terms. Changes will be posted on our website with 
                an updated revision date. Continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="mb-4 text-2xl font-semibold text-white">Contact Information</h3>
              <p className="mb-4 text-slate-300 leading-relaxed">
                For questions about these Terms & Conditions, please contact us:
              </p>
              <p className="text-slate-300">
                Email: hello@unicx.in<br />
                Website: unicx.in
              </p>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
