import Link from "next/link";

const calculators = [
  {
    title: "AI Token Cost Calculator",
    description:
      "Estimate API costs for OpenAI, Anthropic, Google, and more. Compare pricing across 30+ models.",
    href: "/ai-cost-calculator",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
    available: true,
  },
  {
    title: "Mortgage Calculator",
    description:
      "Calculate monthly payments, interest rates, and total cost over the life of your loan.",
    href: "#",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    available: false,
  },
  {
    title: "ROI Calculator",
    description:
      "Calculate return on investment for your projects, marketing campaigns, or business decisions.",
    href: "#",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
    available: false,
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Free Online Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional-grade calculators for developers, businesses, and
          everyday decisions. No sign-up required.
        </p>
      </div>

      {/* Calculator grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => (
          <div key={calc.title} className="relative">
            {calc.available ? (
              <Link
                href={calc.href}
                className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="text-blue-600 mb-4 group-hover:text-blue-700 transition-colors">
                  {calc.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {calc.title}
                </h2>
                <p className="text-gray-600 text-sm">{calc.description}</p>
                <span className="inline-block mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                  Open Calculator →
                </span>
              </Link>
            ) : (
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl opacity-60">
                <div className="text-gray-400 mb-4">{calc.icon}</div>
                <h2 className="text-lg font-semibold text-gray-500 mb-2">
                  {calc.title}
                </h2>
                <p className="text-gray-400 text-sm">{calc.description}</p>
                <span className="inline-block mt-4 text-gray-400 text-sm font-medium">
                  Coming Soon
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
