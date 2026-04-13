import type { Metadata } from "next";
import CompoundInterestClient from "./CompoundInterestClient";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description:
    "Calculate compound interest with regular contributions. See how your savings grow over time with adjustable rates, contribution frequency, and inflation adjustment.",
  alternates: { canonical: "/compound-interest-calculator" },
  openGraph: {
    title: "Free Compound Interest & Retirement Calculator",
    description:
      "See how your money grows with compound interest. Adjust contributions, interest rates, and time horizons. Plan for retirement.",
    url: "https://aicalculators.org/compound-interest-calculator",
  },
};

export default function CompoundInterestPage() {
  return <CompoundInterestClient />;
}
