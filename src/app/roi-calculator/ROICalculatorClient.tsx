"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

interface Scenario {
  id: string;
  name: string;
  initialInvestment: number;
  totalReturn: number;
  timePeriodMonths: number;
}

export default function ROICalculatorClient() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: "1", name: "Investment A", initialInvestment: 10000, totalReturn: 15000, timePeriodMonths: 24 },
  ]);

  const addScenario = () => {
    const id = String(Date.now());
    setScenarios((prev) => [
      ...prev,
      {
        id,
        name: `Investment ${String.fromCharCode(65 + prev.length)}`,
        initialInvestment: 10000,
        totalReturn: 15000,
        timePeriodMonths: 24,
      },
    ]);
  };

  const removeScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  const updateScenario = (id: string, field: keyof Scenario, value: string | number) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const results = useMemo(() => {
    return scenarios.map((s) => {
      const netProfit = s.totalReturn - s.initialInvestment;
      const roiPercent = s.initialInvestment > 0 ? (netProfit / s.initialInvestment) * 100 : 0;
      const years = s.timePeriodMonths / 12;
      const annualizedROI =
        years > 0 && s.initialInvestment > 0
          ? (Math.pow(s.totalReturn / s.initialInvestment, 1 / years) - 1) * 100
          : 0;

      // Breakeven month (simple linear interpolation)
      const monthlyReturn = s.timePeriodMonths > 0 ? s.totalReturn / s.timePeriodMonths : 0;
      const breakevenMonths = monthlyReturn > 0 ? Math.ceil(s.initialInvestment / monthlyReturn) : Infinity;

      return {
        ...s,
        netProfit,
        roiPercent,
        annualizedROI,
        breakevenMonths,
        isProfit: netProfit >= 0,
      };
    });
  }, [scenarios]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "ROI Calculator", href: "/roi-calculator" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ROI Calculator</h1>
        <p className="text-gray-600">
          Calculate the return on investment for any project, campaign, or
          business decision. Compare up to 4 scenarios side by side.
        </p>
      </div>

      <AdBanner className="mb-8" />

      <div className="space-y-6">
        {/* Scenario inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((s, i) => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => updateScenario(s.id, "name", e.target.value)}
                  className="text-lg font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-0 p-0"
                />
                {scenarios.length > 1 && (
                  <button
                    onClick={() => removeScenario(s.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Initial Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input type="number" value={s.initialInvestment}
                      onChange={(e) => updateScenario(s.id, "initialInvestment", Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Total Return (what you get back)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input type="number" value={s.totalReturn}
                      onChange={(e) => updateScenario(s.id, "totalReturn", Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Time Period
                  </label>
                  <div className="flex gap-2">
                    <input type="number" value={s.timePeriodMonths}
                      onChange={(e) => updateScenario(s.id, "timePeriodMonths", Math.max(1, Number(e.target.value)))}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                    <span className="flex items-center text-sm text-gray-500 px-2">months</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    = {(s.timePeriodMonths / 12).toFixed(1)} years
                  </p>
                </div>
              </div>
            </div>
          ))}

          {scenarios.length < 4 && (
            <button
              onClick={addScenario}
              className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-all min-h-[200px]"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm font-medium">Add Scenario to Compare</span>
              </div>
            </button>
          )}
        </div>

        <AdBanner className="my-4" />

        {/* Results */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {results.map((r) => (
              <div key={r.id} className="space-y-3">
                <div className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  {r.name}
                </div>
                <div className={`rounded-lg p-3 ${r.isProfit ? "bg-green-50" : "bg-red-50"}`}>
                  <div className={`text-xs ${r.isProfit ? "text-green-600" : "text-red-600"} mb-1`}>ROI</div>
                  <div className={`text-2xl font-bold ${r.isProfit ? "text-green-700" : "text-red-700"}`}>
                    {r.roiPercent >= 0 ? "+" : ""}{r.roiPercent.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Net Profit/Loss</div>
                  <div className={`text-lg font-semibold ${r.isProfit ? "text-green-700" : "text-red-700"}`}>
                    {formatCurrency(r.netProfit)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Annualized ROI</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {r.annualizedROI.toFixed(1)}%/yr
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Breakeven</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {r.breakevenMonths === Infinity
                      ? "N/A"
                      : r.breakevenMonths > r.timePeriodMonths
                      ? "Never"
                      : `Month ${r.breakevenMonths}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table if multiple */}
          {results.length > 1 && (
            <div className="overflow-x-auto border-t border-gray-200 pt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 text-gray-500 font-medium">Metric</th>
                    {results.map((r) => (
                      <th key={r.id} className="text-right py-2 px-3 text-gray-500 font-medium">
                        {r.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Invested", fn: (r: typeof results[0]) => formatCurrency(r.initialInvestment) },
                    { label: "Returned", fn: (r: typeof results[0]) => formatCurrency(r.totalReturn) },
                    { label: "Net Profit", fn: (r: typeof results[0]) => formatCurrency(r.netProfit) },
                    { label: "ROI %", fn: (r: typeof results[0]) => `${r.roiPercent.toFixed(1)}%` },
                    { label: "Annualized", fn: (r: typeof results[0]) => `${r.annualizedROI.toFixed(1)}%/yr` },
                    { label: "Breakeven", fn: (r: typeof results[0]) => r.breakevenMonths === Infinity ? "N/A" : `Month ${r.breakevenMonths}` },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-gray-50">
                      <td className="py-2 pr-3 text-gray-700 font-medium">{row.label}</td>
                      {results.map((r) => (
                        <td key={r.id} className="text-right py-2 px-3 font-mono text-gray-900">
                          {row.fn(r)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AdBanner className="mt-8" />
      <div className="mt-10 space-y-8">
        <details className="border border-gray-200 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">How This Calculator Works</h2>
            <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <div className="px-5 pb-5 pt-2 text-sm text-gray-600 space-y-3">
            <p><strong>Simple ROI</strong> measures total return as a percentage of the initial investment:</p>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs overflow-x-auto">ROI = (Final Value − Initial Investment) / Initial Investment × 100</pre>
            <p><strong>Annualized ROI</strong> (also called CAGR — Compound Annual Growth Rate) adjusts for time, making investments of different durations comparable:</p>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs overflow-x-auto">Annualized ROI = (Final Value / Initial Investment)^(1 / years) − 1</pre>
            <p>Example: a 50% simple ROI over 5 years = only 8.4% annualized. The same 50% over 1 year = 50% annualized. Always compare using annualized ROI across different time horizons.</p>
            <p><strong>Breakeven</strong> is estimated by linear interpolation: monthly return = total return ÷ months, then breakeven = initial investment ÷ monthly return.</p>
          </div>
        </details>
        <FAQSection faqs={[
          { question: "What is a good ROI percentage?", answer: "A 'good' ROI depends heavily on context. Stock market investments average ~10%/year. Real estate typically returns 8%–12% annually. Business investments vary widely. For comparison purposes, use the annualized ROI this calculator provides, not just the simple percentage, especially for multi-year investments." },
          { question: "What's the difference between simple ROI and annualized ROI?", answer: "Simple ROI = (Net Profit / Cost) × 100. Annualized ROI adjusts for the time period using compound interest math, making investments of different durations comparable. A 50% ROI over 5 years is only about 8.4%/year annualized — very different from 50% in one year." },
          { question: "How do I compare investments with different time horizons?", answer: "Use annualized ROI (also called CAGR — Compound Annual Growth Rate). This calculator shows annualized ROI automatically. You can also compare up to 4 scenarios side by side to find the best investment for your situation." },
          { question: "What's the difference between ROI and IRR?", answer: "ROI is a simple ratio measuring return relative to cost. IRR (Internal Rate of Return) accounts for the timing of cash flows — important when a project has multiple inflows/outflows over time. For simple investments with one upfront cost and one final value, ROI and IRR will give similar results." },
          { question: "Does this calculator account for inflation?", answer: "This calculator shows nominal ROI (before inflation). To get real ROI, subtract the inflation rate from your annualized ROI. For example, a 9% annualized ROI with 3% inflation gives you a real return of about 6%. For long-term investments, real ROI is the more meaningful number." },
        ]} />
        <RelatedCalculators items={[
          { title: "Business Acquisition Calculator", href: "/business-acquisition-calculator", description: "Analyze the ROI and cash flow of buying a business." },
          { title: "Compound Interest Calculator", href: "/compound-interest-calculator", description: "See how your returns compound over time with regular contributions." },
          { title: "Loan Amortization Calculator", href: "/loan-amortization-calculator", description: "Understand the true cost of financing an investment." },
        ]} />
      </div>
    </div>
  );
}
