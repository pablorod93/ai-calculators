import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AICalculators.org — how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: April 12, 2025</p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Overview</h2>
          <p>
            AICalculators.org (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website at
            aicalculators.org. This Privacy Policy explains what information we collect when you visit
            our site, how we use it, and your rights regarding that information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
          <p>We do not require you to create an account or provide personal information to use our calculators.</p>
          <p className="mt-3">We may collect the following automatically:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Referring URL</li>
            <li>General geographic location (country/city level, via IP address)</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>
          <p className="mt-3">
            This data is collected in aggregate through analytics tools and is not linked to any
            personally identifiable information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookies</h2>
          <p>
            Our site may use cookies and similar tracking technologies for analytics and advertising
            purposes. These include:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Google Analytics</strong> — tracks usage patterns to help us improve the site.
              You can opt out via{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s opt-out tool
              </a>.
            </li>
            <li>
              <strong>Google AdSense</strong> — may serve personalised ads based on your browsing
              history. You can manage ad personalisation at{" "}
              <a
                href="https://adssettings.google.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                adssettings.google.com
              </a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Understand how visitors use our tools so we can improve them</li>
            <li>Monitor site performance and fix technical issues</li>
            <li>Display relevant advertising to support the free service</li>
          </ul>
          <p className="mt-3">We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
          <p>We use the following third-party services that have their own privacy policies:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Analytics
              </a>
            </li>
            <li>
              <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google AdSense
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
          <p>
            We do not store personal data on our servers. Analytics data retained by Google is subject
            to Google&apos;s own retention policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request deletion of your data</li>
            <li>Opt out of analytics and advertising cookies</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, contact us at the email below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The &quot;Last updated&quot; date at the top of this
            page will reflect any changes. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:contact@aicalculators.org" className="text-blue-600 hover:underline">
              contact@aicalculators.org
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
