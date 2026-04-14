import type { Metadata } from "next";
import AIFineTuningCalculatorClient from "./AIFineTuningCalculatorClient";

export const metadata: Metadata = {
  title: "AI Fine-Tuning Cost Calculator",
  description:
    "Estimate AI model fine-tuning costs for GPT-4o, Llama 3, Mistral, and more. Compare training costs, LoRA vs full fine-tuning, and total cost of ownership.",
  alternates: { canonical: "/ai-fine-tuning-calculator" },
  openGraph: {
    title: "AI Fine-Tuning Cost Calculator — Compare Training Costs",
    description:
      "Estimate fine-tuning costs across OpenAI, Google, Together AI, and open-source models. Compare LoRA vs full fine-tuning.",
    url: "https://aicalculators.org/ai-fine-tuning-calculator",
  },
};

export default function AIFineTuningCalculatorPage() {
  return <AIFineTuningCalculatorClient />;
}
