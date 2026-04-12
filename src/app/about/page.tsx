import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About AICalculators.org — free, professional-grade calculators for developers, businesses, and everyday decisions.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About AICalculators.org</h1>
      <p className="text-lg text-gray-600 mb-12">
        Free, professional-grade calculators for developers, businesses, and everyday decisions.
        No sign-up. No paywalls. No nonsense.
      </p>

      <div className="space-y-10 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What we do</h2>
          <p>
            AICalculators.org is a collection of free online tools designed to help you make
            faster, more informed decisions. Our first tool — the{" "}
            <Link href="/ai-cost-calculator" className="text-blue-600 hover:underline">
              AI Token Cost Calculator
            </Link>{" "}
            — lets you compare API pricing across 27+ models from OpenAI, Anthropic, Google,
            Meta, Mistral, Cohere, and DeepSeek side by side, so you can pick the right model
            for your budget before you commit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why we built it</h2>
          <p>
            AI API pricing is confusing. Every provider uses different units, different discount
            structures, and different batch policies. We got tired of doing this math in
            spreadsheets and built a tool that does it instantly — for free, for everyone.
          </p>
          <p className="mt-3">
            More calculators are on the way. If there&apos;s a tool you wish existed, we&apos;d love to
            hear about it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our principles</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Free forever</strong> — all tools are free to use, no account required.</li>
            <li><strong>No data collection</strong> — your inputs stay in your browser. We don&apos;t log what you type.</li>
            <li><strong>Transparent</strong> — pricing data is sourced directly from provider documentation and updated regularly.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Pricing accuracy</h2>
          <p>
            We do our best to keep model pricing up to date, but AI providers change their rates
            frequently. Always verify costs against the official provider pricing page before
            making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            Questions, suggestions, or found a pricing error?{" "}
            <a href="mailto:contact@aicalculators.org" className="text-blue-600 hover:underline">
              contact@aicalculators.org
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
