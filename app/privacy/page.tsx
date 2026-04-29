import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UNICX",
  description: "UNICX privacy policy - How we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-slate-400">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Information We Collect</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We collect information you provide directly to us, such as when you contact us through our website, 
              email, or other communication channels. This may include your name, email address, phone number, 
              and any other information you choose to provide.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Cookies and Tracking Technologies</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              When you first visit our site, you'll be presented with a cookie consent banner where you can 
              choose which types of cookies you'd like to accept.
            </p>
            <div className="mb-4 ml-6">
              <h3 className="mb-2 text-lg font-medium text-white">Types of Cookies We Use:</h3>
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
            <h2 className="mb-4 text-2xl font-semibold text-white">How We Use Your Information</h2>
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
            <h2 className="mb-4 text-2xl font-semibold text-white">Data Security</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Third-Party Services</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              Our website may use third-party services that collect, use, and share data according to 
              their own privacy policies. These services include analytics tools and hosting providers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Your Rights</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              You have the right to access, update, or delete your personal information. 
              To exercise these rights, please contact us at hello@unicx.in.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Contact Us</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
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
