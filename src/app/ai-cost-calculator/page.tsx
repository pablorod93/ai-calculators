import type { Metadata } from "next";
import AICostCalculatorClient from "./AICostCalculatorClient";

export const metadata: Metadata = {
  title: "AI Token Cost Calculator",
  description:
    "Calculate and compare AI API costs for GPT-4o, Claude, Gemini, Llama, and 27+ models. Set your token usage and see per-request, daily, monthly, and yearly costs side by side.",
  alternates: { canonical: "/ai-cost-calculator" },
  openGraph: {
    title: "AI Token Cost Calculator — Compare 27+ Models",
    description:
      "Calculate and compare AI API costs for GPT-4o, Claude, Gemini, Llama, and more. Free, no sign-up required.",
    url: "https://aicalculators.org/ai-cost-calculator",
  },
};

export default function AICostCalculatorPage() {
  return <AICostCalculatorClient />;
}
