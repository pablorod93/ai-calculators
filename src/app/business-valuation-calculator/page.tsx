import type { Metadata } from "next";
import BusinessValuationClient from "./BusinessValuationClient";

export const metadata: Metadata = {
  title: "Business Valuation Calculator — What Is My Business Worth?",
  description:
    "Estimate your small business value using SDE multiples, EBITDA multiples, and revenue multiples. See a valuation range across three industry-standard methods.",
  alternates: { canonical: "/business-valuation-calculator" },
  openGraph: {
    title: "Business Valuation Calculator — What Is My Business Worth?",
    description:
      "Estimate your small business value using SDE multiples, EBITDA multiples, and revenue multiples. See a valuation range across three industry-standard methods.",
    url: "https://aicalculators.org/business-valuation-calculator",
  },
};

export default function BusinessValuationPage() {
  return <BusinessValuationClient />;
}
