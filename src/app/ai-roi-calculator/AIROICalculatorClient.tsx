"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import ShareButton from "@/components/ShareButton";

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function formatMonths(n: number): string {
  if (n <= 0 || !isFinite(n)) return "Never";
  const rounded = Math.ceil(n);
  if (rounded === 1) return "1 month";
  if (rounded < 12) return `${rounded} months`;
  const years = Math.floor(rounded / 12);
  const months = rounded % 12;
  if (months === 0) return years === 1 ? "1 year" : `${years} years`;
  return `${years}y ${months}m`;
}

interface Preset {
  id: string;
  label: string;
  currentMonthlyCost: number;
  aiMonthlyCost: number;
  oneTimeCost: number;
  productivityGainPct: number;
}

const presets: Preset[] = [
  { id: "custom", label: "Custom", currentMonthlyCost: 10000, aiMonthlyCost: 500, oneTimeCost: 5000, productivityGainPct: 40 },
  { id: "customer-support", label: "Customer Support", currentMonthlyCost: 15000, aiMonthlyCost: 800, oneTimeCost: 10000, productivityGainPct: 60 },
  { id: "content-creation", label: "Content Creation", currentMonthlyCost: 8000, aiMonthlyCost: 300, oneTimeCost: 2000, productivityGainPct: 70 },
  { id: "data-entry", label: "Data Entry / Processing", currentMonthlyCost: 12000, aiMonthlyCost: 400, oneTimeCost: 8000, productivityGainPct: 80 },
  { id: "sales-outreach", label: "Sales Outreach", currentMonthlyCost: 20000, aiMonthlyCost: 1000, oneTimeCost: 5000, productivityGainPct: 45 },
  { id: "code-review", label: "Code Review / QA", currentMonthlyCost: 25000, aiMonthlyCost: 1500, oneTimeCost: 15000, productivityGainPct: 35 },
];

export default function AIROICalculatorClient() {
  const [activePreset, setActivePreset] = useState<string>("custom");
  const [currentMonthlyCost, setCurrentMonthlyCost] = useState(10000);
  const [aiMonthlyCost, setAiMonthlyCost] = useState(500);
  const [oneTimeCost, setOneTimeCost] = useState(5000);
  const [productivityGainPct, setProductivityGainPct] = useState(40);

  function applyPreset(preset: Preset) {
    setActivePreset(preset.id);
    setCurrentMonthlyCost(preset.currentMonthlyCost);
    setAiMonthlyCost(preset.aiMonthlyCost);
    setOneTimeCost(preset.oneTimeCost);
    setProductivityGainPct(preset.productivityGainPct);
  }

  const results = useMemo(() => {
    const monthlySavings = currentMonthlyCost * (productivityGainPct / 100);
    const netMonthlySavings = monthlySavings - aiMonthlyCost;
    const paybackMonths = netMonthlySavings > 0 ? oneTimeCost / netMonthlySavings : Infinity;
    const isProfitable = netMonthlySavings > 0;

    const year1Net = netMonthlySavings * 12 - oneTimeCost;
    const year2Net = netMonthlySavings * 24 - oneTimeCost;
    const year3Net = netMonthlySavings * 36 - oneTimeCost;
    const year4Net = netMonthlySavings * 48 - oneTimeCost;
    const year5Net = netMonthlySavings * 60 - oneTimeCost;

    // ROI% based on 5-year horizon: (total net savings / total costs) * 100
    const totalCosts = oneTimeCost + aiMonthlyCost * 60;
    const totalGrossSavings = monthlySavings * 60;
    const roiPct = totalCosts > 0 ? ((totalGrossSavings - totalCosts) / totalCosts) * 100 : 0;

    const yearlyRows = [1, 2, 3, 4, 5].map((year) => {
      const grossSavings = monthlySavings * 12 * year;
      const aiCosts = aiMonthlyCost * 12 * year + oneTimeCost;
      const netSavings = grossSavings - aiCosts;
      const cumulative = netSavings; // same as net at each year horizon
      return { year, grossSavings, aiCosts, netSavings, cumulative };
    });

    return {
      monthlySavings,
      netMonthlySavings,
      paybackMonths,
      isProfitable,
      year1Net,
      year2Net,
      year3Net,
      year4Net,
      year5Net,
      roiPct,
      yearlyRows,
    };
  }, [currentMonthlyCost, aiMonthlyCost, oneTimeCost, productivityGainPct]);

  const paybackDisplay = results.isProfitable
    ? formatMonths(results.paybackMonths)
    : "Never";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "AI ROI Calculator", href: "/ai-roi-calculator" },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI ROI Calculator</h1>
        <p className="text-gray-600">
          Calculate the return on investment for implementing AI in your business. Enter your current
          process costs, AI implementation costs, and expected productivity gains to see payback period,
          monthly savings, and multi-year projections.
        </p>
        <div className="mt-3">
          <ShareButton />
        </div>
      </div>

      <AdBanner className="mb-8" />

      {/* Use Case Presets */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Start with a use case</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium text-center transition-all ${
                activePreset === preset.id
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: inputs left, results right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs — 5 cols */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Current Process Costs
            </h2>

            {/* Current Monthly Cost */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Current Monthly Cost
                </label>
                <span className="text-sm font-mono text-gray-900">
                  {formatCurrency(currentMonthlyCost)}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={200000}
                step={1000}
                value={currentMonthlyCost}
                onChange={(e) => { setCurrentMonthlyCost(Number(e.target.value)); setActivePreset("custom"); }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Current monthly cost"
              />
              <p className="text-xs text-gray-400 mt-1">
                Labor, tools, and overhead for the process being automated
              </p>
              <input
                type="number"
                value={currentMonthlyCost}
                min={0}
                step={500}
                onChange={(e) => { setCurrentMonthlyCost(Math.max(0, Number(e.target.value))); setActivePreset("custom"); }}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                AI Implementation Costs
              </h2>

              {/* AI Monthly Cost */}
              <div className="mb-5">
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    AI Monthly Cost
                  </label>
                  <span className="text-sm font-mono text-gray-900">
                    {formatCurrency(aiMonthlyCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20000}
                  step={100}
                  value={aiMonthlyCost}
                  onChange={(e) => { setAiMonthlyCost(Number(e.target.value)); setActivePreset("custom"); }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  aria-label="AI monthly cost"
                />
                <p className="text-xs text-gray-400 mt-1">
                  API fees, subscriptions, hosting, and ongoing maintenance
                </p>
                <input
                  type="number"
                  value={aiMonthlyCost}
                  min={0}
                  step={50}
                  onChange={(e) => { setAiMonthlyCost(Math.max(0, Number(e.target.value))); setActivePreset("custom"); }}
                  className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              {/* One-Time Cost */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    One-Time Implementation Cost
                  </label>
                  <span className="text-sm font-mono text-gray-900">
                    {formatCurrency(oneTimeCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={1000}
                  value={oneTimeCost}
                  onChange={(e) => { setOneTimeCost(Number(e.target.value)); setActivePreset("custom"); }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  aria-label="One-time implementation cost"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Setup, integration, training, and launch costs (paid once)
                </p>
                <input
                  type="number"
                  value={oneTimeCost}
                  min={0}
                  step={500}
                  onChange={(e) => { setOneTimeCost(Math.max(0, Number(e.target.value))); setActivePreset("custom"); }}
                  className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Expected Gains
              </h2>

              {/* Productivity Gain */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Productivity Gain
                  </label>
                  <span className="text-sm font-mono text-gray-900">
                    {productivityGainPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={productivityGainPct}
                  onChange={(e) => { setProductivityGainPct(Number(e.target.value)); setActivePreset("custom"); }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  aria-label="Productivity gain percentage"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Percentage of current cost eliminated or replaced by AI
                </p>
                <input
                  type="number"
                  value={productivityGainPct}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(e) => { setProductivityGainPct(Math.max(0, Math.min(100, Number(e.target.value)))); setActivePreset("custom"); }}
                  className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results — 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          {/* Hero: Payback Period */}
          <div className={`rounded-xl border p-6 ${results.isProfitable ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${results.isProfitable ? "text-green-600" : "text-red-600"}`}>
              Payback Period
            </div>
            <div className={`text-5xl font-bold mb-1 ${results.isProfitable ? "text-green-700" : "text-red-700"}`}>
              {paybackDisplay}
            </div>
            {results.isProfitable && results.paybackMonths < Infinity && (
              <div className="text-sm text-green-600">
                Break even in {Math.ceil(results.paybackMonths)} months, then pure savings
              </div>
            )}
            {!results.isProfitable && (
              <div className="text-sm text-red-600">
                AI monthly cost exceeds savings — adjust your inputs
              </div>
            )}
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Monthly Gross Savings</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(results.monthlySavings)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {productivityGainPct}% of {formatCurrency(currentMonthlyCost)}/mo
              </div>
            </div>

            <div className={`border rounded-xl p-4 ${results.netMonthlySavings >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <div className="text-xs text-gray-500 mb-1">Net Monthly Savings</div>
              <div className={`text-2xl font-bold ${results.netMonthlySavings >= 0 ? "text-green-700" : "text-red-700"}`}>
                {formatCurrency(results.netMonthlySavings)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                After {formatCurrency(aiMonthlyCost)}/mo AI costs
              </div>
            </div>

            <div className={`border rounded-xl p-4 ${results.year1Net >= 0 ? "bg-white border-gray-200" : "bg-red-50 border-red-200"}`}>
              <div className="text-xs text-gray-500 mb-1">Year 1 Net Savings</div>
              <div className={`text-2xl font-bold ${results.year1Net >= 0 ? "text-gray-900" : "text-red-700"}`}>
                {formatCurrency(results.year1Net)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                After one-time cost
              </div>
            </div>

            <div className={`border rounded-xl p-4 ${results.year5Net >= 0 ? "bg-blue-50 border-blue-200" : "bg-red-50 border-red-200"}`}>
              <div className="text-xs text-gray-500 mb-1">Year 5 Net Savings</div>
              <div className={`text-2xl font-bold ${results.year5Net >= 0 ? "text-blue-700" : "text-red-700"}`}>
                {formatCurrency(results.year5Net)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                5-year ROI: {results.roiPct >= 0 ? "+" : ""}{results.roiPct.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Year-by-Year Table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Year-by-Year Projection
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 text-gray-500 font-medium">Year</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Gross Savings</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">AI Costs</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Net Savings</th>
                    <th className="text-right py-2 pl-3 text-gray-500 font-medium">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyRows.map((row) => {
                    const isPositive = row.netSavings >= 0;
                    const cumulativePositive = row.cumulative >= 0;
                    return (
                      <tr key={row.year} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 pr-3 font-medium text-gray-700">Year {row.year}</td>
                        <td className="text-right py-2 px-3 font-mono text-gray-900">
                          {formatCurrency(row.grossSavings)}
                        </td>
                        <td className="text-right py-2 px-3 font-mono text-gray-500">
                          {formatCurrency(row.aiCosts)}
                        </td>
                        <td className={`text-right py-2 px-3 font-mono font-medium ${isPositive ? "text-green-700" : "text-red-700"}`}>
                          {isPositive ? "+" : ""}{formatCurrency(row.netSavings)}
                        </td>
                        <td className={`text-right py-2 pl-3 font-mono font-semibold ${cumulativePositive ? "text-green-700" : "text-red-700"}`}>
                          {cumulativePositive ? "+" : ""}{formatCurrency(row.cumulative)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              AI Costs include one-time implementation cost ({formatCurrency(oneTimeCost)}) charged in Year 1 and
              recurring monthly AI costs ({formatCurrency(aiMonthlyCost)}/mo).
            </p>
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />

      <div className="mt-10 space-y-8">
        <FAQSection
          faqs={[
            {
              question: "What counts as \"productivity gain\" for AI ROI calculations?",
              answer:
                "Productivity gain measures the percentage of your current process cost that AI can eliminate or replace. This includes reduced headcount hours (e.g., 2 agents replaced by 1 agent + AI), faster throughput (same team handles more volume), and reduced error/rework costs. Be conservative — most teams see 30–70% efficiency gains in high-volume, repetitive tasks. Quality improvements and revenue upside are harder to quantify but are real additional benefits beyond what this calculator captures.",
            },
            {
              question: "What should I include in monthly AI costs?",
              answer:
                "Monthly AI costs should include: (1) API usage fees (e.g., OpenAI, Anthropic, Google — based on token volume), (2) SaaS subscriptions for AI tools (e.g., Cursor, Jasper, Intercom AI), (3) hosting and infrastructure costs if you're running models, and (4) ongoing human oversight or prompt engineering time. Don't include one-time setup costs here — those go in the implementation cost field. A typical small deployment runs $200–$2,000/month; enterprise deployments can reach $10,000+/month.",
            },
            {
              question: "How long does AI implementation typically take to pay off?",
              answer:
                "Payback periods vary widely by use case. Simple automation with off-the-shelf AI tools (chatbots, content AI) typically pays off in 1–6 months. Custom integrations and workflow automation usually take 6–18 months. Complex enterprise implementations can take 1–3 years. The biggest driver is the ratio of one-time implementation cost to net monthly savings. For most SMB use cases with modest setup costs and high-volume processes, 3–9 months is the typical range.",
            },
            {
              question: "What's a realistic productivity gain from AI implementation?",
              answer:
                "Research and practitioner data suggest: Customer support / ticket routing: 40–65% efficiency gain. Content creation / first drafts: 50–80%. Data entry and document processing: 60–90%. Code generation and review: 20–40% (varies by complexity). Sales outreach personalization: 30–50%. These are realistic ranges for teams that actually adopt the tools — not just theoretical maximums. Start conservative (30–40%) when planning, and revise upward once you have real adoption data.",
            },
            {
              question: "How do I calculate ROI if AI improves quality, not just speed?",
              answer:
                "Quality improvements show up in several measurable ways: lower error rates → less rework cost (include in current monthly cost), higher customer satisfaction → lower churn (estimate the revenue value), faster response times → better conversion (estimate lift). To include these, increase your \"current monthly cost\" to reflect the full cost of quality failures today, or separately estimate the revenue upside and add it to your productivity gain percentage. This calculator works best for cost-reduction ROI; for revenue-driven AI, a more custom model is needed.",
            },
          ]}
        />

        <RelatedCalculators
          items={[
            {
              title: "AI Token Cost Calculator",
              href: "/ai-cost-calculator",
              description: "Estimate your monthly AI API costs precisely",
            },
            {
              title: "AI Project Cost Estimator",
              href: "/ai-project-estimator",
              description: "Get a full cost estimate for an AI project",
            },
            {
              title: "ROI Calculator",
              href: "/roi-calculator",
              description: "Calculate ROI for any investment",
            },
          ]}
        />
      </div>
    </div>
  );
}
