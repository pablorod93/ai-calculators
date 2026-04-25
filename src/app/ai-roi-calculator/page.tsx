import type { Metadata } from "next";
import AIROICalculatorClient from "./AIROICalculatorClient";

export const metadata: Metadata = {
  title: "AI ROI Calculator — Calculate the Return on AI Implementation",
  description:
    "Calculate the ROI and payback period for implementing AI in your business. Input current costs, AI costs, and expected productivity gains to see monthly savings and breakeven timeline.",
  alternates: { canonical: "/ai-roi-calculator" },
  openGraph: {
    title: "AI ROI Calculator — Calculate the Return on AI Implementation",
    description:
      "Calculate the ROI and payback period for implementing AI in your business. Input current costs, AI costs, and expected productivity gains to see monthly savings and breakeven timeline.",
    url: "https://aicalculators.org/ai-roi-calculator",
  },
};

export default function AIROICalculatorPage() {
  return <AIROICalculatorClient />;
}
