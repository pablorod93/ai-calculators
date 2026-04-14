"use client";

import { useState, useMemo } from "react";
import {
  fineTuningModels,
  fineTuningProviders,
  estimateTrainingTokens,
  estimateTrainingCost,
  estimateInferenceCost,
  formatFineTuningCurrency,
} from "@/data/fine-tuning-models";
import AdBanner from "@/components/AdBanner";
import FAQSection from "@/components/FAQSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";

const faqs = [
  {
    question: "How much does it cost to fine-tune GPT-4o?",
    answer:
      "GPT-4o fine-tuning costs $25/M training tokens. For a typical dataset of 1,000 examples (500 tokens each, 3 epochs), that's about $37.50. Inference costs increase to $3.75/$15 per million input/output tokens.",
  },
  {
    question: "What is LoRA fine-tuning and is it cheaper?",
    answer:
      "LoRA (Low-Rank Adaptation) updates only a small subset of model parameters instead of all weights. It's 60-70% cheaper than full fine-tuning and supported by Together AI, Fireworks, and Google. Quality is comparable for most use cases.",
  },
  {
    question: "How many examples do I need for fine-tuning?",
    answer:
      "OpenAI requires a minimum of 10 examples but recommends 50-100 for noticeable improvement. For production quality, 500-1,000 high-quality examples across 3 epochs is a good starting point.",
  },
  {
    question: "Is fine-tuning or prompt engineering cheaper?",
    answer:
      "Prompt engineering is free upfront, but fine-tuning can reduce inference costs by enabling shorter prompts and using smaller models. Fine-tuning becomes more cost-effective at higher volumes (1,000+ requests/day).",
  },
];

export default function AIFineTuningCalculatorClient() {
  const [examples, setExamples] = useState(1000);
  const [avgTokensPerExample, setAvgTokensPerExample] = useState(500);
  const [epochs, setEpochs] = useState(3);
  const [useLoRA, setUseLoRA] = useState(false);

  const [inferenceInputTokens, setInferenceInputTokens] = useState(500);
  const [inferenceOutputTokens, setInferenceOutputTokens] = useState(300);
  const [requestsPerDay, setRequestsPerDay] = useState(100);
  const [ownershipMonths, setOwnershipMonths] = useState(6);

  const trainingTokens = useMemo(
    () => estimateTrainingTokens(examples, avgTokensPerExample, epochs),
    [examples, avgTokensPerExample, epochs]
  );

  const results = useMemo(() => {
    return fineTuningModels
      .map((model) => {
        const provider = fineTuningProviders.find(
          (p) => p.id === model.provider
        )!;
        const trainingCost = estimateTrainingCost(model, trainingTokens, useLoRA);
        const inference = estimateInferenceCost(
          model,
          inferenceInputTokens,
          inferenceOutputTokens,
          requestsPerDay
        );
        const totalCostOfOwnership =
          trainingCost + inference.monthly * ownershipMonths;

        return {
          model,
          provider,
          trainingCost,
          inference,
          totalCostOfOwnership,
          loRAAvailable: model.supportsLoRA,
          effectiveLoRA: useLoRA && model.supportsLoRA,
        };
      })
      .sort((a, b) => a.totalCostOfOwnership - b.totalCostOfOwnership);
  }, [
    trainingTokens,
    useLoRA,
    inferenceInputTokens,
    inferenceOutputTokens,
    requestsPerDay,
    ownershipMonths,
  ]);

  const cheapest = results[0];
  const cheapestTraining = [...results].sort(
    (a, b) => a.trainingCost - b.trainingCost
  )[0];
  const cheapestInference = [...results].sort(
    (a, b) => a.inference.monthly - b.inference.monthly
  )[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AI Fine-Tuning Cost Calculator",
          url: "https://aicalculators.org/ai-fine-tuning-calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Estimate fine-tuning costs for GPT-4o, Llama, Mistral, and more. Compare LoRA vs full fine-tuning.",
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "AI Fine-Tuning Calculator", href: "/ai-fine-tuning-calculator" },
        ]}
      />
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Fine-Tuning Cost Calculator
        </h1>
        <p className="text-gray-600">
          Estimate fine-tuning costs across OpenAI, Google, and open-source
          models. Compare training costs, LoRA vs full fine-tuning, and total
          cost of ownership.
        </p>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - Configuration */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20 space-y-6">
            {/* Training Configuration */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Training Data
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Training Examples: {examples.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100000}
                    step={100}
                    value={examples}
                    onChange={(e) => setExamples(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Number of training examples"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>10</span>
                    <span>100K</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Avg Tokens per Example: {avgTokensPerExample.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={4000}
                    step={50}
                    value={avgTokensPerExample}
                    onChange={(e) =>
                      setAvgTokensPerExample(Number(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Average tokens per example"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>50</span>
                    <span>4,000</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Epochs: {epochs}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={epochs}
                    onChange={(e) => setEpochs(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    aria-label="Number of training epochs"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useLoRA}
                      onChange={(e) => setUseLoRA(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Use LoRA (Low-Rank Adaptation)
                      </span>
                      <p className="text-xs text-gray-500">
                        60-70% cheaper training. Not all providers support it.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">
                    Total training tokens
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {(trainingTokens / 1_000_000).toFixed(1)}M tokens
                  </div>
                </div>
              </div>
            </div>

            {/* Inference Configuration */}
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Post-Training Inference
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Input Tokens per Request: {inferenceInputTokens.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={10000}
                    step={50}
                    value={inferenceInputTokens}
                    onChange={(e) =>
                      setInferenceInputTokens(Number(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    aria-label="Input tokens per request"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Output Tokens per Request: {inferenceOutputTokens.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={4000}
                    step={50}
                    value={inferenceOutputTokens}
                    onChange={(e) =>
                      setInferenceOutputTokens(Number(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    aria-label="Output tokens per request"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Requests per Day: {requestsPerDay.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10000}
                    step={10}
                    value={requestsPerDay}
                    onChange={(e) =>
                      setRequestsPerDay(Number(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    aria-label="Requests per day"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>10,000</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Ownership Period: {ownershipMonths} months
                  </label>
                  <div className="flex gap-2">
                    {[1, 3, 6, 12].map((m) => (
                      <button
                        key={m}
                        onClick={() => setOwnershipMonths(m)}
                        className={`flex-1 px-2 py-1.5 rounded-lg text-sm border transition-colors ${
                          ownershipMonths === m
                            ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                            : "border-gray-200 hover:border-blue-300 text-gray-700"
                        }`}
                      >
                        {m}mo
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right content - Results */}
        <div className="lg:col-span-7 space-y-8">
          {/* Hero: Best total cost */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="text-sm text-purple-200 mb-1">
              Lowest Total Cost of Ownership ({ownershipMonths}mo)
            </div>
            <div className="text-2xl font-bold mb-1">
              {cheapest.model.name}
              <span className="text-purple-200 text-base font-normal ml-2">
                by {cheapest.provider.name}
              </span>
            </div>
            <div className="text-4xl font-bold mt-2">
              {formatFineTuningCurrency(cheapest.totalCostOfOwnership)}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-purple-200">Training (one-time)</div>
                <div className="text-lg font-semibold">
                  {formatFineTuningCurrency(cheapest.trainingCost)}
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-200">Inference/month</div>
                <div className="text-lg font-semibold">
                  {formatFineTuningCurrency(cheapest.inference.monthly)}
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-200">Per request</div>
                <div className="text-lg font-semibold">
                  {formatFineTuningCurrency(cheapest.inference.perRequest)}
                </div>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">
                Cheapest Training
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {cheapestTraining.model.name}
              </div>
              <div className="text-xs text-green-600">
                {formatFineTuningCurrency(cheapestTraining.trainingCost)}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">
                Cheapest Inference
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {cheapestInference.model.name}
              </div>
              <div className="text-xs text-blue-600">
                {formatFineTuningCurrency(cheapestInference.inference.monthly)}
                /mo
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Training Tokens</div>
              <div className="text-lg font-semibold text-gray-900">
                {(trainingTokens / 1_000_000).toFixed(1)}M
              </div>
              <div className="text-xs text-purple-600">
                {examples.toLocaleString()} examples × {epochs} epochs
              </div>
            </div>
          </div>

          {/* Full comparison table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Cost Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-3 text-gray-500 font-medium">
                      Model
                    </th>
                    <th className="text-right py-3 px-3 text-gray-500 font-medium">
                      Training
                    </th>
                    <th className="text-right py-3 px-3 text-gray-500 font-medium">
                      Inference/mo
                    </th>
                    <th className="text-right py-3 pl-3 text-gray-500 font-medium">
                      Total ({ownershipMonths}mo)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr
                      key={r.model.id}
                      className={`border-b border-gray-100 ${i === 0 ? "bg-green-50" : ""}`}
                    >
                      <td className="py-3 pr-3">
                        <div className="font-medium text-gray-900">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: r.provider.color }}
                          />
                          {r.model.name}
                          {i === 0 && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                              Best Value
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 ml-4">
                          {r.provider.name}
                          {r.effectiveLoRA && (
                            <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                              LoRA
                            </span>
                          )}
                          {useLoRA && !r.loRAAvailable && (
                            <span className="ml-1 text-gray-400">
                              (no LoRA)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-700">
                        {formatFineTuningCurrency(r.trainingCost)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-700">
                        {formatFineTuningCurrency(r.inference.monthly)}
                      </td>
                      <td className="py-3 pl-3 text-right font-mono font-semibold text-gray-900">
                        {formatFineTuningCurrency(r.totalCostOfOwnership)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <AdBanner className="my-4" />

          {/* Cost breakdown chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Total Cost Breakdown ({ownershipMonths}-Month Ownership)
            </h2>
            <div className="space-y-4">
              {results.map((r) => {
                const maxTCO = results[results.length - 1].totalCostOfOwnership;
                const trainingPct = maxTCO > 0
                  ? (r.trainingCost / maxTCO) * 100
                  : 0;
                const inferencePct = maxTCO > 0
                  ? ((r.inference.monthly * ownershipMonths) / maxTCO) * 100
                  : 0;

                return (
                  <div key={r.model.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">
                        {r.model.name}
                      </span>
                      <span className="font-mono text-gray-600">
                        {formatFineTuningCurrency(r.totalCostOfOwnership)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 flex overflow-hidden">
                      <div
                        className="h-3 bg-purple-500"
                        style={{ width: `${Math.max(trainingPct, 0.5)}%` }}
                        title={`Training: ${formatFineTuningCurrency(r.trainingCost)}`}
                      />
                      <div
                        className="h-3 bg-green-500"
                        style={{ width: `${Math.max(inferencePct, 0.5)}%` }}
                        title={`Inference: ${formatFineTuningCurrency(r.inference.monthly * ownershipMonths)}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-purple-500 rounded-sm" />
                Training (one-time)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-green-500 rounded-sm" />
                Inference ({ownershipMonths} months)
              </div>
            </div>
          </div>

          {/* Model notes */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Model Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((r) => (
                <div key={r.model.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: r.provider.color }}
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      {r.model.name}
                    </span>
                    {r.model.supportsLoRA && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                        LoRA
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{r.model.notes}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    Min examples: {r.model.minExamples} | Context:{" "}
                    {r.model.contextWindow >= 1048576
                      ? `${(r.model.contextWindow / 1048576).toFixed(0)}M`
                      : `${(r.model.contextWindow / 1000).toFixed(0)}K`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-8">
        <FAQSection faqs={faqs} />
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
