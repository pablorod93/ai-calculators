"use client";

import { useState, useMemo, useEffect } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import ShareButton from "@/components/ShareButton";

// ─── Data ────────────────────────────────────────────────────────────────────

const useCases = [
  {
    id: "customer-support",
    label: "Customer Support Bot",
    inputTokens: 800,
    outputTokens: 300,
    description: "Handle customer inquiries, FAQs, ticket responses",
  },
  {
    id: "content-generation",
    label: "Content Generation",
    inputTokens: 500,
    outputTokens: 1500,
    description: "Blog posts, product descriptions, marketing copy",
  },
  {
    id: "code-assistant",
    label: "Code Assistant",
    inputTokens: 1200,
    outputTokens: 800,
    description: "Code completion, debugging, code review",
  },
  {
    id: "email-drafting",
    label: "Email Drafting",
    inputTokens: 400,
    outputTokens: 400,
    description: "Sales emails, replies, newsletters",
  },
  {
    id: "document-summary",
    label: "Document Summarization",
    inputTokens: 3000,
    outputTokens: 500,
    description: "Summarize reports, contracts, research papers",
  },
  {
    id: "data-analysis",
    label: "Data Analysis Assistant",
    inputTokens: 2000,
    outputTokens: 600,
    description: "Interpret data, generate insights, answer data questions",
  },
];

const models = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    inputPricePerM: 2.5,
    outputPricePerM: 10.0,
    color: "#10b981",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    inputPricePerM: 0.15,
    outputPricePerM: 0.6,
    color: "#3b82f6",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    inputPricePerM: 3.0,
    outputPricePerM: 15.0,
    color: "#8b5cf6",
  },
  {
    id: "claude-haiku",
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    inputPricePerM: 0.8,
    outputPricePerM: 4.0,
    color: "#a78bfa",
  },
  {
    id: "gemini-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    inputPricePerM: 0.1,
    outputPricePerM: 0.4,
    color: "#f59e0b",
  },
  {
    id: "gemini-pro",
    name: "Gemini 2.0 Pro",
    provider: "Google",
    inputPricePerM: 1.25,
    outputPricePerM: 10.0,
    color: "#ef4444",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  if (n < 0.01 && n > 0) {
    return `$${n.toFixed(6)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatLargeNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChatGPTCostClient() {
  const [selectedUseCase, setSelectedUseCase] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        new URLSearchParams(window.location.search).get("uc") ?? "customer-support"
      );
    }
    return "customer-support";
  });

  const [requestsPerDay, setRequestsPerDay] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(new URLSearchParams(window.location.search).get("rpd") ?? 100);
    }
    return 100;
  });

  const [daysPerMonth, setDaysPerMonth] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(new URLSearchParams(window.location.search).get("dpm") ?? 22);
    }
    return 22;
  });

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams({
      uc: selectedUseCase,
      rpd: String(requestsPerDay),
      dpm: String(daysPerMonth),
    });
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [selectedUseCase, requestsPerDay, daysPerMonth]);

  const useCase = useMemo(
    () => useCases.find((u) => u.id === selectedUseCase) ?? useCases[0],
    [selectedUseCase]
  );

  const results = useMemo(() => {
    const monthlyRequests = requestsPerDay * daysPerMonth;

    const rows = models
      .map((model) => {
        const costPerRequest =
          (useCase.inputTokens / 1_000_000) * model.inputPricePerM +
          (useCase.outputTokens / 1_000_000) * model.outputPricePerM;
        const monthlyCost = costPerRequest * monthlyRequests;
        const yearlyCost = monthlyCost * 12;
        return { model, costPerRequest, monthlyCost, yearlyCost };
      })
      .sort((a, b) => a.monthlyCost - b.monthlyCost);

    const cheapest = rows[0];
    const mostExpensive = rows[rows.length - 1];

    return { rows, monthlyRequests, cheapest, mostExpensive };
  }, [useCase, requestsPerDay, daysPerMonth]);

  const faqs = [
    {
      question: "How are these costs estimated?",
      answer: `Each use case has preset token estimates based on typical real-world usage. For example, Customer Support Bot assumes an average of ${useCases.find(u => u.id === "customer-support")!.inputTokens} input tokens (context + user message) and ${useCases.find(u => u.id === "customer-support")!.outputTokens} output tokens (bot reply) per request. Content Generation assumes longer outputs (~1,500 tokens) but shorter inputs. These are averages — your actual costs depend on prompt length and response verbosity. Use the AI Token Cost Calculator for precise control over token counts.`,
    },
    {
      question: "Can I reduce costs with prompt caching or batch APIs?",
      answer:
        "Yes — both significantly reduce costs. Prompt caching (available on OpenAI and Anthropic) re-uses repeated context from earlier requests at a ~90% discount on cached input tokens. If your prompts share a long system prompt, caching alone can cut costs by 50–70%. Batch APIs (available on OpenAI and Anthropic) process requests asynchronously with a 50% discount — ideal for nightly runs, bulk content generation, or non-time-sensitive tasks. Combining both strategies can reduce costs by 60–80%.",
    },
    {
      question:
        "What is the difference between GPT-4o and GPT-4o mini for business use?",
      answer:
        "GPT-4o is OpenAI's flagship model with superior reasoning, instruction-following, and complex task performance. GPT-4o mini is 16x cheaper and handles simpler tasks — FAQs, classification, short summaries, email drafts — with very good quality. For most customer support and email use cases, GPT-4o mini is the cost-effective choice. For nuanced analysis, code review, or high-stakes decisions, GPT-4o is worth the premium.",
    },
    {
      question: "How do I get API access to these models?",
      answer:
        "Each provider has its own API platform: OpenAI via platform.openai.com, Anthropic via console.anthropic.com, and Google via ai.google.dev or Vertex AI. All require creating an account and adding a payment method. Usage is billed monthly based on tokens consumed. Most providers offer free trial credits ($5–$300) to get started.",
    },
    {
      question: "Are these prices current?",
      answer:
        "Prices are based on publicly available API pricing as of early 2026. AI pricing changes frequently — providers have cut prices multiple times in the past two years. Always verify current pricing on each provider's official pricing page before budgeting: platform.openai.com/pricing, anthropic.com/pricing, and ai.google.dev/pricing.",
    },
  ];

  const relatedCalculators = [
    {
      title: "AI Token Cost Calculator",
      href: "/ai-cost-calculator",
      description: "Customize token counts for precise cost estimates",
    },
    {
      title: "AI Project Cost Estimator",
      href: "/ai-project-estimator",
      description: "Full cost estimate for an AI project by type",
    },
    {
      title: "AI Fine-Tuning Cost Calculator",
      href: "/ai-fine-tuning-calculator",
      description: "Estimate costs for training a custom model",
    },
  ];

  const maxMonthlyCost = results.rows[results.rows.length - 1]?.monthlyCost ?? 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "ChatGPT Cost Calculator", href: "/chatgpt-cost-calculator" },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ChatGPT Monthly Cost Calculator
        </h1>
        <p className="text-gray-600">
          Estimate your monthly AI API costs by use case and scale. No token
          math needed — pick a use case, set your volume, and compare top models
          side by side.
        </p>
        <div className="mt-3">
          <ShareButton />
        </div>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Inputs ── */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-6 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Configure Your Use Case
            </h3>

            {/* Use case grid */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Use Case
              </label>
              <div className="grid grid-cols-2 gap-2">
                {useCases.map((uc) => (
                  <button
                    key={uc.id}
                    onClick={() => setSelectedUseCase(uc.id)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      selectedUseCase === uc.id
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`text-sm font-semibold leading-tight ${
                        selectedUseCase === uc.id
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {uc.label}
                    </div>
                    <div
                      className={`text-xs mt-0.5 leading-tight ${
                        selectedUseCase === uc.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {uc.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Token preview for selected use case */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                Token assumptions for this use case
              </div>
              <div className="flex gap-6">
                <div>
                  <div className="text-xs text-gray-500">Input / request</div>
                  <div className="text-sm font-mono font-semibold text-gray-900">
                    {useCase.inputTokens.toLocaleString()} tokens
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Output / request</div>
                  <div className="text-sm font-mono font-semibold text-gray-900">
                    {useCase.outputTokens.toLocaleString()} tokens
                  </div>
                </div>
              </div>
            </div>

            {/* Requests per day slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Requests per day
                </label>
                <span className="text-sm font-mono text-gray-600">
                  {formatLargeNumber(requestsPerDay)}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={100000}
                step={1}
                value={requestsPerDay}
                onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>100K</span>
              </div>
              <input
                type="number"
                value={requestsPerDay}
                min={1}
                max={100000}
                onChange={(e) =>
                  setRequestsPerDay(
                    Math.min(100000, Math.max(1, Number(e.target.value)))
                  )
                }
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Days per month slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Working days per month
                </label>
                <span className="text-sm font-mono text-gray-600">
                  {daysPerMonth} days
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={31}
                step={1}
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>31</span>
              </div>
            </div>

            {/* Monthly request summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <div className="text-xs text-blue-600 font-medium mb-0.5">
                Total monthly requests
              </div>
              <div className="text-xl font-bold text-blue-900">
                {formatLargeNumber(results.monthlyRequests)}
              </div>
              <div className="text-xs text-blue-600 mt-0.5">
                {requestsPerDay.toLocaleString()} req/day &times; {daysPerMonth}{" "}
                days
              </div>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero: cheapest option */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
            <div className="text-sm text-emerald-200 mb-1">
              Cheapest option for this use case
            </div>
            <div className="text-3xl font-bold">
              {results.cheapest.model.name}
            </div>
            <div className="text-emerald-200 text-sm mt-0.5">
              by {results.cheapest.model.provider}
            </div>
            <div className="mt-4 flex gap-6">
              <div>
                <div className="text-xs text-emerald-200">Monthly cost</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(results.cheapest.monthlyCost)}
                </div>
              </div>
              <div>
                <div className="text-xs text-emerald-200">Yearly cost</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(results.cheapest.yearlyCost)}
                </div>
              </div>
              <div>
                <div className="text-xs text-emerald-200">Cost / request</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(results.cheapest.costPerRequest)}
                </div>
              </div>
            </div>
          </div>

          {/* Model comparison bar chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Monthly Cost by Model
            </h3>
            <div className="space-y-3">
              {results.rows.map((row, i) => {
                const barWidth =
                  maxMonthlyCost > 0
                    ? Math.max(
                        2,
                        (row.monthlyCost / maxMonthlyCost) * 100
                      )
                    : 2;
                const isCheapest = i === 0;
                return (
                  <div key={row.model.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: row.model.color }}
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {row.model.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({row.model.provider})
                        </span>
                        {isCheapest && (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            Cheapest
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-mono font-semibold text-gray-900">
                        {formatCurrency(row.monthlyCost)}
                        <span className="text-xs font-normal text-gray-400">
                          /mo
                        </span>
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: row.model.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed comparison table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Full Comparison (cheapest first)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 text-gray-500 font-medium">
                      Model
                    </th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">
                      Provider
                    </th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">
                      Cost / req
                    </th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">
                      Monthly
                    </th>
                    <th className="text-right py-2 pl-3 text-gray-500 font-medium">
                      Yearly
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.rows.map((row, i) => {
                    const isCheapest = i === 0;
                    return (
                      <tr
                        key={row.model.id}
                        className={`border-b border-gray-50 ${
                          isCheapest ? "bg-emerald-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: row.model.color }}
                            />
                            <span
                              className={`font-semibold ${
                                isCheapest
                                  ? "text-emerald-800"
                                  : "text-gray-900"
                              }`}
                            >
                              {row.model.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-gray-500">
                          {row.model.provider}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-gray-700">
                          {formatCurrency(row.costPerRequest)}
                        </td>
                        <td
                          className={`py-2.5 px-3 text-right font-mono font-semibold ${
                            isCheapest ? "text-emerald-700" : "text-gray-900"
                          }`}
                        >
                          {formatCurrency(row.monthlyCost)}
                        </td>
                        <td className="py-2.5 pl-3 text-right font-mono text-gray-600">
                          {formatCurrency(row.yearlyCost)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Savings callout */}
            {results.mostExpensive.monthlyCost >
              results.cheapest.monthlyCost && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                <span className="font-semibold">
                  Potential savings by choosing the cheapest model:
                </span>{" "}
                {formatCurrency(
                  results.mostExpensive.monthlyCost -
                    results.cheapest.monthlyCost
                )}
                /month (
                {formatCurrency(
                  (results.mostExpensive.monthlyCost -
                    results.cheapest.monthlyCost) *
                    12
                )}
                /year) compared to {results.mostExpensive.model.name}.
              </div>
            )}
          </div>

          <AdBanner className="my-4" />

          {/* Pricing reference */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              API Pricing Reference (per million tokens)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1.5 pr-3 text-gray-500 font-medium">
                      Model
                    </th>
                    <th className="text-right py-1.5 px-3 text-gray-500 font-medium">
                      Input / 1M
                    </th>
                    <th className="text-right py-1.5 pl-3 text-gray-500 font-medium">
                      Output / 1M
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr
                      key={model.id}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: model.color }}
                          />
                          <span className="font-medium text-gray-800">
                            {model.name}
                          </span>
                          <span className="text-gray-400 text-xs">
                            ({model.provider})
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-gray-700">
                        ${model.inputPricePerM.toFixed(2)}
                      </td>
                      <td className="py-2 pl-3 text-right font-mono text-gray-700">
                        ${model.outputPricePerM.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Prices as of early 2026. Verify at each provider&apos;s pricing
              page before budgeting.
            </p>
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />

      <div className="mt-10 space-y-8">
        <FAQSection faqs={faqs} />
        <RelatedCalculators items={relatedCalculators} />
      </div>
    </div>
  );
}
