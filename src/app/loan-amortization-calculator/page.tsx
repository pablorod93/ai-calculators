import type { Metadata } from "next";
import LoanAmortizationClient from "./LoanAmortizationClient";

export const metadata: Metadata = {
  title: "Loan Amortization Calculator",
  description:
    "Calculate loan payments and see a full amortization schedule. Visualize principal vs. interest over time and see the impact of extra payments.",
  alternates: { canonical: "/loan-amortization-calculator" },
  openGraph: {
    title: "Free Loan Amortization Calculator & Payment Schedule",
    description:
      "Calculate monthly loan payments, see principal vs. interest breakdown, and explore how extra payments save money.",
    url: "https://aicalculators.org/loan-amortization-calculator",
  },
};

export default function LoanAmortizationPage() {
  return <LoanAmortizationClient />;
}
