import type { Metadata } from "next";
import BusinessAcquisitionClient from "./BusinessAcquisitionClient";

export const metadata: Metadata = {
  title: "Business Acquisition Calculator",
  description:
    "Estimate the cost of buying a business with an SBA loan. Calculate monthly payments, cash flow impact, DSCR, and total cost of ownership.",
  alternates: { canonical: "/business-acquisition-calculator" },
  openGraph: {
    title: "Business Acquisition & SBA Loan Calculator",
    description:
      "Plan your business purchase: SBA loan payments, cash flow analysis, debt service coverage, and breakeven timeline.",
    url: "https://aicalculators.org/business-acquisition-calculator",
  },
};

export default function BusinessAcquisitionPage() {
  return <BusinessAcquisitionClient />;
}
