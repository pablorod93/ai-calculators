import type { Metadata } from "next";
import ChatGPTCostClient from "./ChatGPTCostClient";

export const metadata: Metadata = {
  title: "ChatGPT Monthly Cost Calculator — Estimate Business Costs",
  description:
    "Estimate your monthly ChatGPT or AI API costs by use case and scale. No token math needed — pick customer support, content generation, code assistant, or other use cases and see costs instantly.",
  alternates: { canonical: "/chatgpt-cost-calculator" },
  openGraph: {
    title: "ChatGPT Monthly Cost Calculator — Estimate Business Costs",
    description:
      "Estimate your monthly ChatGPT or AI API costs by use case and scale. No token math needed — pick customer support, content generation, code assistant, or other use cases and see costs instantly.",
    url: "https://aicalculators.org/chatgpt-cost-calculator",
  },
};

export default function ChatGPTCostCalculatorPage() {
  return <ChatGPTCostClient />;
}
