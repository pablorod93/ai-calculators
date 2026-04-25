"use client";

import { useState, useCallback } from "react";
import { type AIModel, models } from "@/data/models";
import ModelSelector from "@/components/ModelSelector";
import TokenInput from "@/components/TokenInput";
import CostBreakdown from "@/components/CostBreakdown";
import ModelComparison from "@/components/ModelComparison";
import TokenExplainer from "@/components/TokenExplainer";
import AdBanner from "@/components/AdBanner";
import FAQSection from "@/components/FAQSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedCalculators from "@/components/RelatedCalculators";

const faqs = [
  {
    question: "What is an AI token and how is it counted?",
    answer:
      "A token is a chunk of text that AI models process. In English, 1 token is roughly 4 characters or 3/4 of a word. A 500-word email is about 675 tokens. Both input (your prompt) and output (the response) are counted separately.",
  },
  {
    question: "Why do output tokens cost more than input tokens?",
    answer:
      "Output tokens cost 2-5x more because generating new text requires running the model one token at a time (sequential processing), while input tokens can be processed in parallel. More computation per token means higher cost.",
  },
  {
    question: "What is the cheapest AI model for production use?",
    answer:
      "GPT-4o mini ($0.15/M input), Gemini 2.0 Flash ($0.10/M input), and GPT-4.1 nano ($0.10/M input) are the most affordable options that still deliver good quality for most tasks.",
  },
  {
    question: "How do batch APIs reduce AI costs?",
    answer:
      "Batch APIs process requests asynchronously (typically within 24 hours) instead of in real-time. This lets providers optimize compute usage, passing savings of up to 50% to you. Ideal for non-time-sensitive tasks.",
  },
  {
    question: "How many tokens does a typical chatbot conversation use?",
    answer:
      "A typical chatbot turn uses about 500 input tokens and 300 output tokens. A full conversation of 10 messages might use 5,000-8,000 total tokens, costing $0.003-$0.06 depending on the model.",
  },
];

export default function AICostCalculator() {
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([
    models.find((m) => m.id === "gpt-4o")!,
    models.find((m) => m.id === "claude-sonnet-4")!,
  ]);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(100);
  const [useBatch, setUseBatch] = useState(false);

  const toggleModel = useCallback(
    (model: AIModel) => {
      setSelectedModels((prev) => {
        const exists = prev.find((m) => m.id === model.id);
        if (exists) return prev.filter((m) => m.id !== model.id);
        if (prev.length >= 4) return prev;
        return [...prev, model];
      });
    },
    []
  );

  const contextWindow = selectedModels.length === 1 ? selectedModels[0].contextWindow : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AI Token Cost Calculator",
          url: "https://aicalculators.org/ai-cost-calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate and compare AI API costs for GPT-4o, Claude, Gemini, Llama, and 27+ models.",
          featureList:
            "Compare 27+ AI models, batch pricing, daily/monthly/yearly projections",
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "AI Token Cost Calculator", href: "/ai-cost-calculator" },
        ]}
      />
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Token Cost Calculator
        </h1>
        <p className="text-gray-600">
          Find out how much it costs to use AI models like ChatGPT, Claude, and
          Gemini. Pick your models, set your usage, and see the costs instantly.
        </p>
      </div>

      {/* Token explainer for beginners */}
      <TokenExplainer />

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - Model selection */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20">
            <ModelSelector
              selectedModels={selectedModels}
              onToggleModel={toggleModel}
            />
          </div>
        </div>

        {/* Right content - Inputs + Results */}
        <div className="lg:col-span-8 space-y-8">
          {/* Token input */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <TokenInput
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              requestsPerDay={requestsPerDay}
              onInputTokensChange={setInputTokens}
              onOutputTokensChange={setOutputTokens}
              onRequestsPerDayChange={setRequestsPerDay}
              contextWindow={contextWindow}
            />

            {/* Batch toggle */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useBatch}
                  onChange={(e) => setUseBatch(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Apply bulk discount (Batch API)
                  </span>
                  <p className="text-xs text-gray-500">
                    Some providers offer up to 50% off if you don&apos;t need
                    instant responses
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <CostBreakdown
              selectedModels={selectedModels}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              requestsPerDay={requestsPerDay}
              useBatch={useBatch}
            />
          </div>

          <AdBanner className="my-4" />

          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <ModelComparison
              selectedModels={selectedModels}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              requestsPerDay={requestsPerDay}
              useBatch={useBatch}
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-8">
        <FAQSection faqs={faqs} />
      </div>

      <AdBanner className="mt-8" />
      <RelatedCalculators items={[
        { title: "AI Project Cost Estimator", href: "/ai-project-estimator", description: "Estimate costs by project type without doing token math." },
        { title: "GPU Cost Calculator", href: "/gpu-cost-calculator", description: "Compare cloud GPU rental costs across AWS, GCP, and more." },
        { title: "AI Fine-Tuning Cost Calculator", href: "/ai-fine-tuning-calculator", description: "Estimate fine-tuning costs for GPT-4o, Llama, and Mistral." },
      ]} />
    </div>
  );
}
