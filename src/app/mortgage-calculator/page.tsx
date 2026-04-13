import type { Metadata } from "next";
import MortgageCalculatorClient from "./MortgageCalculatorClient";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description:
    "Calculate your monthly mortgage payment, total interest, and see a full amortization breakdown. Includes property tax, insurance, and PMI estimates.",
  alternates: { canonical: "/mortgage-calculator" },
  openGraph: {
    title: "Free Mortgage Calculator — Monthly Payment & Amortization",
    description:
      "Calculate your monthly mortgage payment with taxes, insurance, and PMI. See total interest paid over the life of your loan.",
    url: "https://aicalculators.org/mortgage-calculator",
  },
};

export default function MortgageCalculatorPage() {
  return <MortgageCalculatorClient />;
}
