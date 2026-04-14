"use client";

import { useState, useMemo } from "react";
import {
  imageModels,
  imageProviders,
  standardSizes,
  standardQualities,
  getPrice,
  formatImageCurrency,
} from "@/data/image-models";
import AdBanner from "@/components/AdBanner";
import FAQSection from "@/components/FAQSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";

const faqs = [
  {
    question: "Which AI image generator is the cheapest?",
    answer:
      "SDXL 1.0 at $0.002/image and Flux Schnell at $0.003/image are the cheapest options. They're ideal for high-volume use cases and prototyping.",
  },
  {
    question: "How much does DALL-E 3 cost per image?",
    answer:
      "DALL-E 3 costs $0.04/image for standard quality 1024x1024, $0.08 for HD 1024x1024, and up to $0.12 for HD at larger sizes (1792x1024).",
  },
  {
    question: "Is Midjourney cheaper than DALL-E?",
    answer:
      "Midjourney's Standard plan (~$30/month for ~900 images) works out to about $0.033/image, which is slightly cheaper than DALL-E 3's $0.04/image for standard quality.",
  },
  {
    question: "What affects AI image generation cost?",
    answer:
      "Three main factors: the model you choose (100x price range), image resolution (larger = more expensive), and quality level (HD typically costs 2x standard).",
  },
];

type Period = "day" | "week" | "month";

export default function AIImageCalculatorClient() {
  const [imagesPerPeriod, setImagesPerPeriod] = useState(100);
  const [period, setPeriod] = useState<Period>("day");
  const [selectedSize, setSelectedSize] = useState("1024x1024");
  const [selectedQuality, setSelectedQuality] = useState("standard");

  const imagesPerDay = useMemo(() => {
    if (period === "day") return imagesPerPeriod;
    if (period === "week") return imagesPerPeriod / 7;
    return imagesPerPeriod / 30;
  }, [imagesPerPeriod, period]);

  const results = useMemo(() => {
    return imageModels
      .map((model) => {
        const pricePerImage = getPrice(model, selectedSize, selectedQuality);
        if (pricePerImage === null) return null;

        const dailyCost = pricePerImage * imagesPerDay;
        const monthlyCost = dailyCost * 30;
        const yearlyCost = dailyCost * 365;

        return {
          model,
          provider: imageProviders.find((p) => p.id === model.provider)!,
          pricePerImage,
          dailyCost,
          monthlyCost,
          yearlyCost,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a!.pricePerImage - b!.pricePerImage) as NonNullable<
      ReturnType<typeof computeResult>
    >[];

    function computeResult(model: (typeof imageModels)[0]) {
      const pricePerImage = getPrice(model, selectedSize, selectedQuality);
      if (pricePerImage === null) return null;
      const dailyCost = pricePerImage * imagesPerDay;
      return {
        model,
        provider: imageProviders.find((p) => p.id === model.provider)!,
        pricePerImage,
        dailyCost,
        monthlyCost: dailyCost * 30,
        yearlyCost: dailyCost * 365,
      };
    }
  }, [selectedSize, selectedQuality, imagesPerDay]);

  const cheapest = results[0] ?? null;
  const mostExpensive = results[results.length - 1] ?? null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AI Image Generation Cost Calculator",
          url: "https://aicalculators.org/ai-image-calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Compare AI image generation costs across DALL-E, Stable Diffusion, Flux, Midjourney, and more.",
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "AI Image Cost Calculator", href: "/ai-image-calculator" },
        ]}
      />
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Image Generation Cost Calculator
        </h1>
        <p className="text-gray-600">
          Compare costs for AI image generation across DALL-E, Stable Diffusion,
          Flux, Midjourney, and more. Pick your settings and see costs instantly.
        </p>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - Configuration */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20 space-y-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Configuration
            </h2>

            {/* Volume */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Number of Images
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  value={imagesPerPeriod}
                  onChange={(e) =>
                    setImagesPerPeriod(Math.max(1, Number(e.target.value)))
                  }
                  min={1}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm text-gray-500">per</span>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as Period)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
              <input
                type="range"
                min={1}
                max={10000}
                step={period === "day" ? 10 : period === "week" ? 50 : 100}
                value={imagesPerPeriod}
                onChange={(e) => setImagesPerPeriod(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Number of images"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Image Size */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Image Size
              </label>
              <div className="space-y-2">
                {standardSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors ${
                      selectedSize === size.id
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-200 hover:border-blue-300 text-gray-700"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Quality
              </label>
              <div className="flex gap-2">
                {standardQualities.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuality(q.id)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm border transition-colors ${
                      selectedQuality === q.id
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-200 hover:border-blue-300 text-gray-700"
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Effective daily volume */}
            <div className="pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Effective daily volume
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {Math.round(imagesPerDay).toLocaleString()} images/day
              </div>
            </div>
          </div>
        </div>

        {/* Right content - Results */}
        <div className="lg:col-span-8 space-y-8">
          {results.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <p className="text-gray-500">
                No models support the selected size and quality combination.
              </p>
            </div>
          ) : (
            <>
              {/* Hero: cheapest option */}
              {cheapest && (
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                  <div className="text-sm text-blue-200 mb-1">
                    Most Affordable Option
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {cheapest.model.name}
                    <span className="text-blue-200 text-base font-normal ml-2">
                      by {cheapest.provider.name}
                    </span>
                  </div>
                  <div className="text-4xl font-bold mt-2">
                    {formatImageCurrency(cheapest.pricePerImage)}
                    <span className="text-lg text-blue-200 font-normal">
                      {" "}
                      / image
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-blue-200">Daily</div>
                      <div className="text-lg font-semibold">
                        {formatImageCurrency(cheapest.dailyCost)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">Monthly</div>
                      <div className="text-lg font-semibold">
                        {formatImageCurrency(cheapest.monthlyCost)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">Yearly</div>
                      <div className="text-lg font-semibold">
                        {formatImageCurrency(cheapest.yearlyCost)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Cheapest</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {cheapest?.model.name}
                  </div>
                  <div className="text-xs text-green-600">
                    {cheapest
                      ? formatImageCurrency(cheapest.pricePerImage)
                      : "—"}
                    /img
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Most Expensive
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {mostExpensive?.model.name}
                  </div>
                  <div className="text-xs text-red-600">
                    {mostExpensive
                      ? formatImageCurrency(mostExpensive.pricePerImage)
                      : "—"}
                    /img
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Models</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {results.length}
                  </div>
                  <div className="text-xs text-blue-600">available</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Price Spread
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {cheapest && mostExpensive
                      ? `${Math.round(mostExpensive.pricePerImage / cheapest.pricePerImage)}x`
                      : "—"}
                  </div>
                  <div className="text-xs text-purple-600">
                    cheapest to priciest
                  </div>
                </div>
              </div>

              {/* Comparison table */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                  Price Comparison
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 pr-4 text-gray-500 font-medium">
                          Model
                        </th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">
                          Provider
                        </th>
                        <th className="text-right py-3 px-4 text-gray-500 font-medium">
                          Per Image
                        </th>
                        <th className="text-right py-3 px-4 text-gray-500 font-medium">
                          Daily
                        </th>
                        <th className="text-right py-3 px-4 text-gray-500 font-medium">
                          Monthly
                        </th>
                        <th className="text-right py-3 pl-4 text-gray-500 font-medium">
                          Yearly
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <tr
                          key={r.model.id}
                          className={`border-b border-gray-100 ${i === 0 ? "bg-green-50" : ""}`}
                        >
                          <td className="py-3 pr-4">
                            <div className="font-medium text-gray-900">
                              {r.model.name}
                              {i === 0 && (
                                <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                  Best Value
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className="inline-block w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: r.provider.color }}
                            />
                            <span className="text-gray-600">
                              {r.provider.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-gray-900">
                            {formatImageCurrency(r.pricePerImage)}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-gray-700">
                            {formatImageCurrency(r.dailyCost)}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-gray-700">
                            {formatImageCurrency(r.monthlyCost)}
                          </td>
                          <td className="py-3 pl-4 text-right font-mono text-gray-700">
                            {formatImageCurrency(r.yearlyCost)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <AdBanner className="my-4" />

              {/* Visual cost bar chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                  Monthly Cost Comparison
                </h2>
                <div className="space-y-3">
                  {results.map((r) => {
                    const maxCost = mostExpensive?.monthlyCost ?? 1;
                    const widthPct = Math.max(
                      (r.monthlyCost / maxCost) * 100,
                      2
                    );
                    return (
                      <div key={r.model.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">
                            {r.model.name}
                          </span>
                          <span className="font-mono text-gray-600">
                            {formatImageCurrency(r.monthlyCost)}/mo
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${widthPct}%`,
                              backgroundColor: r.provider.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Model notes */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                  Model Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((r) => (
                    <div
                      key={r.model.id}
                      className="bg-gray-50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: r.provider.color }}
                        />
                        <span className="text-sm font-semibold text-gray-900">
                          {r.model.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{r.model.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
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
