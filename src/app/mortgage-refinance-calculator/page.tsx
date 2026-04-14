import type { Metadata } from "next";
import MortgageRefinanceClient from "./MortgageRefinanceClient";

export const metadata: Metadata = {
  title: "Mortgage Refinance Calculator",
  description:
    "Should you refinance your mortgage? Calculate your breakeven point, monthly savings, and total interest saved. See the 1% rule, side-by-side loan comparison, and amortization schedules.",
  alternates: { canonical: "/mortgage-refinance-calculator" },
  openGraph: {
    title: "Free Mortgage Refinance Calculator — Breakeven & Savings Analysis",
    description:
      "Find out if refinancing makes sense. Compare your current loan vs a new one, see your breakeven timeline, and get a clear refinance-or-wait recommendation.",
    url: "https://aicalculators.org/mortgage-refinance-calculator",
  },
};

export default function MortgageRefinanceCalculatorPage() {
  return <MortgageRefinanceClient />;
}
