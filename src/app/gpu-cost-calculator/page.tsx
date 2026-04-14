import type { Metadata } from "next";
import GPUCostCalculatorClient from "./GPUCostCalculatorClient";

export const metadata: Metadata = {
  title: "GPU Cost Calculator",
  description:
    "Compare GPU rental and cloud computing costs across AWS, GCP, Azure, Lambda Labs, Vast.ai, and more. See hourly, monthly, and annual costs for H100, A100, and L40S GPUs.",
  alternates: { canonical: "/gpu-cost-calculator" },
  openGraph: {
    title: "GPU Cost Calculator — Compare Cloud & Rental Pricing",
    description:
      "Compare GPU costs across 7+ providers. H100, A100, L40S, RTX 4090. Cloud vs on-premise break-even analysis.",
    url: "https://aicalculators.org/gpu-cost-calculator",
  },
};

export default function GPUCostCalculatorPage() {
  return <GPUCostCalculatorClient />;
}
