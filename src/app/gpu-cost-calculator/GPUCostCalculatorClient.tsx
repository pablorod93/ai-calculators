"use client";

import { useState, useMemo } from "react";
import {
  gpus,
  gpuProviders,
  gpuOfferings,
  calculateOnPremiseMonthlyCost,
  formatGPUCurrency,
} from "@/data/gpu-providers";
import AdBanner from "@/components/AdBanner";
import FAQSection from "@/components/FAQSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedCalculators from "@/components/RelatedCalculators";

const faqs = [
  {
    question: "What is the cheapest way to rent an H100 GPU?",
    answer:
      "CoreWeave ($2.06/hr) and Vast.ai ($2.20/hr) offer the cheapest H100 on-demand pricing. Spot pricing on GCP can go as low as $1.30/hr but comes with interruption risk.",
  },
  {
    question: "Should I rent GPUs or buy them?",
    answer:
      "If you need 24/7 GPU access for 12+ months, buying is usually cheaper. An H100 costs ~$30,000 and breaks even vs the cheapest cloud provider in about 12-18 months. For intermittent or short-term use, renting is more cost-effective.",
  },
  {
    question: "What's the difference between H100 and A100?",
    answer:
      "The H100 (Hopper architecture) offers 2-3x the performance of the A100 (Ampere) for AI workloads. H100 SXM has 989 FP16 TFLOPS vs 312 for A100. However, A100s are significantly cheaper and sufficient for many inference and smaller training tasks.",
  },
  {
    question: "Are spot instances worth the risk for AI training?",
    answer:
      "Yes, for training workloads. Spot instances save 60-70% and training can be checkpointed and resumed if interrupted. They're not recommended for production inference where availability matters.",
  },
];

export default function GPUCostCalculatorClient() {
  const [selectedGPU, setSelectedGPU] = useState("h100-sxm");
  const [numGPUs, setNumGPUs] = useState(1);
  const [hoursPerDay, setHoursPerDay] = useState(24);
  const [useSpot, setUseSpot] = useState(false);
  const [showOnPrem, setShowOnPrem] = useState(true);
  const [electricityCost, setElectricityCost] = useState(0.12);

  const gpu = gpus.find((g) => g.id === selectedGPU)!;

  const cloudResults = useMemo(() => {
    const offerings = gpuOfferings.filter((o) => o.gpuId === selectedGPU);

    return offerings
      .map((offering) => {
        const provider = gpuProviders.find(
          (p) => p.id === offering.providerId
        )!;

        let effectiveRate = offering.pricePerHour;
        if (useSpot && offering.spotAvailable && offering.spotDiscount) {
          effectiveRate *= 1 - offering.spotDiscount / 100;
        }

        const dailyCost = effectiveRate * hoursPerDay * numGPUs;
        const monthlyCost = dailyCost * 30;
        const yearlyCost = dailyCost * 365;

        return {
          offering,
          provider,
          effectiveRate,
          dailyCost,
          monthlyCost,
          yearlyCost,
          isSpot: useSpot && offering.spotAvailable,
        };
      })
      .sort((a, b) => a.effectiveRate - b.effectiveRate);
  }, [selectedGPU, numGPUs, hoursPerDay, useSpot]);

  const onPremCost = useMemo(() => {
    return calculateOnPremiseMonthlyCost(gpu, numGPUs, hoursPerDay, electricityCost);
  }, [gpu, numGPUs, hoursPerDay, electricityCost]);

  const cheapestCloud = cloudResults[0];
  const breakEvenMonths = useMemo(() => {
    if (!cheapestCloud) return null;
    const upfrontCost = gpu.purchasePrice * numGPUs;
    const monthlySavings = cheapestCloud.monthlyCost - onPremCost.totalMonthly;
    if (monthlySavings <= 0) return null;
    return Math.ceil(upfrontCost / monthlySavings);
  }, [cheapestCloud, gpu, numGPUs, onPremCost]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "GPU Cost Calculator",
          url: "https://aicalculators.org/gpu-cost-calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Compare GPU rental costs across AWS, GCP, Azure, Lambda Labs, and more. Cloud vs on-premise analysis.",
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "GPU Cost Calculator", href: "/gpu-cost-calculator" },
        ]}
      />
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          GPU Cost Calculator
        </h1>
        <p className="text-gray-600">
          Compare GPU rental and cloud computing costs across AWS, GCP, Azure,
          Lambda Labs, and more. See cloud vs on-premise break-even analysis.
        </p>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20 space-y-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Configuration
            </h2>

            {/* GPU Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                GPU Model
              </label>
              <div className="space-y-2">
                {gpus.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGPU(g.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors ${
                      selectedGPU === g.id
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-200 hover:border-blue-300 text-gray-700"
                    }`}
                  >
                    <div className="font-medium">{g.name}</div>
                    <div className="text-xs text-gray-500">
                      {g.vram}GB VRAM | {g.fp16Tflops} TFLOPS
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of GPUs */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Number of GPUs: {numGPUs}
              </label>
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={numGPUs}
                onChange={(e) => setNumGPUs(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Number of GPUs"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>8</span>
              </div>
            </div>

            {/* Hours per day */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Hours per Day: {hoursPerDay}
              </label>
              <input
                type="range"
                min={1}
                max={24}
                step={1}
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Hours per day"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1h</span>
                <span>24h</span>
              </div>
            </div>

            {/* Spot toggle */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSpot}
                  onChange={(e) => setUseSpot(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Use spot/preemptible pricing
                  </span>
                  <p className="text-xs text-gray-500">
                    Up to 70% off, but can be interrupted
                  </p>
                </div>
              </label>
            </div>

            {/* On-prem toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnPrem}
                  onChange={(e) => setShowOnPrem(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Compare with on-premise
                  </span>
                  <p className="text-xs text-gray-500">
                    Purchase price amortized over {gpu.lifespanYears} years
                  </p>
                </div>
              </label>
            </div>

            {showOnPrem && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Electricity: ${electricityCost.toFixed(2)}/kWh
                </label>
                <input
                  type="range"
                  min={0.05}
                  max={0.40}
                  step={0.01}
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  aria-label="Electricity cost per kWh"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0.05</span>
                  <span>$0.40</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right content */}
        <div className="lg:col-span-8 space-y-8">
          {/* GPU specs hero */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white">
            <div className="text-sm text-gray-400 mb-1">Selected GPU</div>
            <div className="text-2xl font-bold mb-3">{gpu.name}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-400">VRAM</div>
                <div className="text-lg font-semibold">{gpu.vram} GB</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">FP16 Performance</div>
                <div className="text-lg font-semibold">
                  {gpu.fp16Tflops} TFLOPS
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Architecture</div>
                <div className="text-lg font-semibold">{gpu.architecture}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">TDP</div>
                <div className="text-lg font-semibold">{gpu.powerWatts}W</div>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Cheapest Cloud</div>
              <div className="text-sm font-semibold text-gray-900">
                {cheapestCloud?.provider.name ?? "—"}
              </div>
              <div className="text-xs text-green-600">
                {cheapestCloud
                  ? `${formatGPUCurrency(cheapestCloud.effectiveRate)}/hr`
                  : "—"}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Monthly (cloud)</div>
              <div className="text-lg font-semibold text-gray-900">
                {cheapestCloud
                  ? formatGPUCurrency(cheapestCloud.monthlyCost)
                  : "—"}
              </div>
            </div>
            {showOnPrem && (
              <>
                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Monthly (on-prem)
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatGPUCurrency(onPremCost.totalMonthly)}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Break-even
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {breakEvenMonths ? `${breakEvenMonths} mo` : "N/A"}
                  </div>
                  <div className="text-xs text-purple-600">
                    {breakEvenMonths
                      ? "on-prem cheaper after"
                      : "cloud is cheaper"}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cloud pricing table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Cloud & Rental Pricing — {gpu.name} ×{numGPUs}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-3 text-gray-500 font-medium">
                      Provider
                    </th>
                    <th className="text-left py-3 px-3 text-gray-500 font-medium">
                      Commitment
                    </th>
                    <th className="text-right py-3 px-3 text-gray-500 font-medium">
                      $/hr
                    </th>
                    <th className="text-right py-3 px-3 text-gray-500 font-medium">
                      Daily
                    </th>
                    <th className="text-right py-3 px-3 text-gray-500 font-medium">
                      Monthly
                    </th>
                    <th className="text-right py-3 pl-3 text-gray-500 font-medium">
                      Yearly
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cloudResults.map((r, i) => (
                    <tr
                      key={r.offering.id}
                      className={`border-b border-gray-100 ${i === 0 ? "bg-green-50" : ""}`}
                    >
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: r.provider.color }}
                          />
                          <span className="font-medium text-gray-900">
                            {r.provider.name}
                          </span>
                          {i === 0 && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                              Best
                            </span>
                          )}
                        </div>
                        {r.isSpot && (
                          <span className="ml-4 text-xs text-amber-600">
                            Spot ({r.offering.spotDiscount}% off)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        {r.offering.commitment === "on-demand"
                          ? "On-demand"
                          : r.offering.commitment}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-900">
                        {formatGPUCurrency(r.effectiveRate)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-700">
                        {formatGPUCurrency(r.dailyCost)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-700">
                        {formatGPUCurrency(r.monthlyCost)}
                      </td>
                      <td className="py-3 pl-3 text-right font-mono text-gray-700">
                        {formatGPUCurrency(r.yearlyCost)}
                      </td>
                    </tr>
                  ))}

                  {/* On-premise row */}
                  {showOnPrem && (
                    <tr className="border-t-2 border-gray-300 bg-amber-50">
                      <td className="py-3 pr-3">
                        <div className="font-medium text-gray-900">
                          On-Premise
                        </div>
                        <div className="text-xs text-gray-500 ml-0">
                          ${gpu.purchasePrice.toLocaleString()} × {numGPUs} GPUs
                          upfront
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        Purchase
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-900">
                        —
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-700">
                        {formatGPUCurrency(onPremCost.totalMonthly / 30)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-gray-700">
                        {formatGPUCurrency(onPremCost.totalMonthly)}
                      </td>
                      <td className="py-3 pl-3 text-right font-mono text-gray-700">
                        {formatGPUCurrency(onPremCost.totalMonthly * 12)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <AdBanner className="my-4" />

          {/* Monthly cost bar chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Monthly Cost Comparison
            </h2>
            <div className="space-y-3">
              {cloudResults.map((r) => {
                const maxCost =
                  cloudResults[cloudResults.length - 1]?.monthlyCost ?? 1;
                const onPremMax = showOnPrem ? onPremCost.totalMonthly : 0;
                const max = Math.max(maxCost, onPremMax);
                const widthPct = Math.max((r.monthlyCost / max) * 100, 2);

                return (
                  <div key={r.offering.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">
                        {r.provider.name}
                        {r.offering.commitment !== "on-demand" && (
                          <span className="text-gray-400 text-xs ml-1">
                            ({r.offering.commitment})
                          </span>
                        )}
                        {r.isSpot && (
                          <span className="text-amber-600 text-xs ml-1">
                            (spot)
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-gray-600">
                        {formatGPUCurrency(r.monthlyCost)}/mo
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: r.provider.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {showOnPrem && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      On-Premise
                    </span>
                    <span className="font-mono text-gray-600">
                      {formatGPUCurrency(onPremCost.totalMonthly)}/mo
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-amber-500"
                      style={{
                        width: `${Math.max(
                          (onPremCost.totalMonthly /
                            Math.max(
                              cloudResults[cloudResults.length - 1]
                                ?.monthlyCost ?? 1,
                              onPremCost.totalMonthly
                            )) *
                            100,
                          2
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* On-prem breakdown */}
          {showOnPrem && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                On-Premise Cost Breakdown
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    Hardware (amortized)
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatGPUCurrency(onPremCost.hardwareMonthly)}
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatGPUCurrency(gpu.purchasePrice)} × {numGPUs} over{" "}
                    {gpu.lifespanYears} years
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Electricity</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatGPUCurrency(onPremCost.electricityMonthly)}
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {gpu.powerWatts}W × {numGPUs} GPUs × {hoursPerDay}h/day
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Upfront Cost</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatGPUCurrency(gpu.purchasePrice * numGPUs)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {breakEvenMonths
                      ? `Break-even vs cloud in ${breakEvenMonths} months`
                      : "Cloud is cheaper for this config"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-8">
        <FAQSection faqs={faqs} />
      </div>

      <AdBanner className="mt-8" />
      <RelatedCalculators items={[
        { title: "AI Fine-Tuning Cost Calculator", href: "/ai-fine-tuning-calculator", description: "Estimate fine-tuning costs including GPU time and inference." },
        { title: "AI Token Cost Calculator", href: "/ai-cost-calculator", description: "Compare managed API costs vs. self-hosting on GPU." },
        { title: "AI Project Cost Estimator", href: "/ai-project-estimator", description: "Get a full cost estimate for your AI project." },
      ]} />
    </div>
  );
}
