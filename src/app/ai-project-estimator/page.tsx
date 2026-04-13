import type { Metadata } from "next";
import ProjectEstimatorClient from "./ProjectEstimatorClient";

export const metadata: Metadata = {
  title: "AI Project Cost Estimator",
  description:
    "Estimate total AI costs for your project — chatbots, code assistants, content generation, RAG, and more. No token math required. Compare 27+ models instantly.",
  alternates: { canonical: "/ai-project-estimator" },
  openGraph: {
    title: "AI Project Cost Estimator — How Much Will Your AI Project Cost?",
    description:
      "Pick your project type, set your usage, and see estimated costs across 27+ AI models. Free, no sign-up required.",
    url: "https://aicalculators.org/ai-project-estimator",
  },
};

export default function ProjectEstimatorPage() {
  return <ProjectEstimatorClient />;
}
