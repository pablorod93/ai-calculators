import type { Metadata } from "next";
import ROICalculatorClient from "./ROICalculatorClient";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "Calculate return on investment for any project, campaign, or business decision. See ROI percentage, net profit, annualized returns, and breakeven timeline.",
  alternates: { canonical: "/roi-calculator" },
  openGraph: {
    title: "Free ROI Calculator — Return on Investment",
    description:
      "Calculate ROI percentage, net profit, annualized returns, and payback period. Compare multiple investment scenarios.",
    url: "https://aicalculators.org/roi-calculator",
  },
};

export default function ROICalculatorPage() {
  return <ROICalculatorClient />;
}
