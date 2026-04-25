"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import ShareButton from "@/components/ShareButton";

const industries = [
  { id: "service", label: "Service Business", sdeMin: 2.0, sdeMax: 3.5, ebitdaMin: 3.0, ebitdaMax: 5.0, revenueMin: 0.5, revenueMax: 1.2 },
  { id: "online", label: "Online / SaaS", sdeMin: 3.0, sdeMax: 6.0, ebitdaMin: 4.0, ebitdaMax: 8.0, revenueMin: 1.0, revenueMax: 3.0 },
  { id: "retail", label: "Retail / Restaurant", sdeMin: 1.5, sdeMax: 2.5, ebitdaMin: 2.5, ebitdaMax: 4.0, revenueMin: 0.3, revenueMax: 0.7 },
  { id: "manufacturing", label: "Manufacturing", sdeMin: 2.5, sdeMax: 4.0, ebitdaMin: 3.5, ebitdaMax: 6.0, revenueMin: 0.4, revenueMax: 0.8 },
  { id: "healthcare", label: "Healthcare / Dental", sdeMin: 3.0, sdeMax: 5.0, ebitdaMin: 4.0, ebitdaMax: 7.0, revenueMin: 0.8, revenueMax: 1.5 },
  { id: "construction", label: "Construction / Trades", sdeMin: 2.0, sdeMax: 3.5, ebitdaMin: 3.0, ebitdaMax: 5.0, revenueMin: 0.3, revenueMax: 0.6 },
];

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function midpoint(min: number, max: number): number {
  return Math.round(((min + max) / 2) * 100) / 100;
}

interface TooltipProps {
  text: string;
}

function Tooltip({ text }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative inline-flex ml-1">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center hover:bg-gray-300 focus:outline-none"
        aria-label="More info"
      >
        ?
      </button>
      {visible && (
        <span className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </span>
      )}
    </span>
  );
}

const faqs = [
  {
    question: "What is SDE and why is it used to value small businesses?",
    answer:
      "SDE stands for Seller's Discretionary Earnings — it's the business's net profit plus the owner's total compensation (salary, benefits, perks). Because small business owners often mix personal and business expenses, SDE normalizes earnings to show what a new owner would actually take home. It's the most common valuation metric for businesses under $5M in value because it captures the true economic benefit of ownership.",
  },
  {
    question: "What's the difference between SDE and EBITDA valuation?",
    answer:
      "SDE adds back the owner's full compensation on top of net profit, making it ideal for owner-operated businesses where one person runs the show. EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is used for larger businesses or those with management teams in place — it does not add back the owner's salary. EBITDA multiples are typically higher, but the base number is lower, so results can converge. For businesses generating under $1M in owner earnings, SDE is usually the right lens.",
  },
  {
    question: "What factors increase a business's multiple?",
    answer:
      "Several factors push a business toward the higher end of its multiple range: recurring or contracted revenue (subscriptions, maintenance contracts), a strong management team that doesn't depend on the owner, diversified customer base (no single customer over 20% of revenue), proprietary systems or IP, consistent 3-year growth trend, clean books with minimal add-backs, and operation in a growing industry. Conversely, owner-dependent businesses, customer concentration, declining revenue, or messy financials compress multiples.",
  },
  {
    question: "Is revenue-based valuation accurate for small businesses?",
    answer:
      "Revenue multiples are the least reliable for small businesses because profitability varies enormously. A business doing $1M revenue at a 5% margin is very different from one at a 30% margin. Revenue multiples are most useful for high-growth SaaS or subscription businesses where current profitability is secondary to future recurring revenue. For most main-street businesses, SDE or EBITDA multiples are more accurate. Use revenue as a cross-check, not a primary method.",
  },
  {
    question: "How do I get a formal business valuation?",
    answer:
      "A formal valuation (a Business Valuation Report) is performed by a Certified Business Appraiser (CBA) or Certified Valuation Analyst (CVA). These are required for SBA loans, estate planning, divorce proceedings, and partnership disputes. Expect to pay $3,000–$10,000+ depending on business complexity. For selling a business, most business brokers will provide a free Broker Opinion of Value (BOV) using methods similar to this calculator. For a quick gut-check, use this tool — but for any legal or financing purpose, engage a credentialed appraiser.",
  },
];

const relatedCalculators = [
  {
    title: "Business Acquisition Calculator",
    href: "/business-acquisition-calculator",
    description: "Calculate SBA loan payments and DSCR for buying this business.",
  },
  {
    title: "ROI Calculator",
    href: "/roi-calculator",
    description: "Calculate the ROI of buying vs building a business.",
  },
  {
    title: "Loan Amortization Calculator",
    href: "/loan-amortization-calculator",
    description: "Model the financing payments for an acquisition.",
  },
];

export default function BusinessValuationClient() {
  const [industryId, setIndustryId] = useState("service");
  const [annualRevenue, setAnnualRevenue] = useState(500000);
  const [netProfit, setNetProfit] = useState(100000);
  const [ownerCompensation, setOwnerCompensation] = useState(80000);
  const [ebitda, setEbitda] = useState(150000);

  const industry = industries.find((i) => i.id === industryId) ?? industries[0];

  // Multiple sliders — stored as x100 for integer range inputs
  const [sdeMultiplier, setSdeMultiplier] = useState(() => midpoint(industry.sdeMin, industry.sdeMax));
  const [ebitdaMultiplier, setEbitdaMultiplier] = useState(() => midpoint(industry.ebitdaMin, industry.ebitdaMax));
  const [revenueMultiplier, setRevenueMultiplier] = useState(() => midpoint(industry.revenueMin, industry.revenueMax));

  function selectIndustry(id: string) {
    const ind = industries.find((i) => i.id === id) ?? industries[0];
    setIndustryId(id);
    setSdeMultiplier(midpoint(ind.sdeMin, ind.sdeMax));
    setEbitdaMultiplier(midpoint(ind.ebitdaMin, ind.ebitdaMax));
    setRevenueMultiplier(midpoint(ind.revenueMin, ind.revenueMax));
  }

  const results = useMemo(() => {
    const sde = netProfit + ownerCompensation;

    const sdeValLow = sde * industry.sdeMin;
    const sdeValHigh = sde * industry.sdeMax;
    const sdeValPoint = sde * sdeMultiplier;

    const ebitdaValLow = ebitda * industry.ebitdaMin;
    const ebitdaValHigh = ebitda * industry.ebitdaMax;
    const ebitdaValPoint = ebitda * ebitdaMultiplier;

    const revValLow = annualRevenue * industry.revenueMin;
    const revValHigh = annualRevenue * industry.revenueMax;
    const revValPoint = annualRevenue * revenueMultiplier;

    const overallLow = Math.min(sdeValLow, ebitdaValLow, revValLow);
    const overallHigh = Math.max(sdeValHigh, ebitdaValHigh, revValHigh);

    const methods = [
      { name: "SDE", low: sdeValLow, high: sdeValHigh, point: sdeValPoint },
      { name: "EBITDA", low: ebitdaValLow, high: ebitdaValHigh, point: ebitdaValPoint },
      { name: "Revenue", low: revValLow, high: revValHigh, point: revValPoint },
    ];

    const highestMethod = methods.reduce((a, b) => (b.high > a.high ? b : a));
    const lowestMethod = methods.reduce((a, b) => (b.low < a.low ? b : a));

    return {
      sde,
      sdeValLow,
      sdeValHigh,
      sdeValPoint,
      ebitdaValLow,
      ebitdaValHigh,
      ebitdaValPoint,
      revValLow,
      revValHigh,
      revValPoint,
      overallLow,
      overallHigh,
      highestMethod: highestMethod.name,
      lowestMethod: lowestMethod.name,
    };
  }, [netProfit, ownerCompensation, ebitda, annualRevenue, industry, sdeMultiplier, ebitdaMultiplier, revenueMultiplier]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Business Valuation Calculator", href: "/business-valuation-calculator" },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Business Valuation Calculator
        </h1>
        <p className="text-gray-600">
          Estimate what your small business is worth using three industry-standard
          valuation methods: SDE multiples, EBITDA multiples, and revenue multiples.
        </p>
        <div className="mt-3">
          <ShareButton />
        </div>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Industry selector */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Industry
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => selectIndustry(ind.id)}
                  className={`px-3 py-2.5 text-sm rounded-lg border text-left transition-all leading-tight ${
                    industryId === ind.id
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                      : "border-gray-200 text-gray-600 hover:border-blue-300"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          {/* Business Financials */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Business Financials
            </h3>

            {/* Annual Revenue */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Annual Revenue</label>
                <span className="text-sm font-mono text-gray-600">{fmt(annualRevenue)}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={5000000}
                step={10000}
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Net Profit */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Annual Net Profit{" "}
                <span className="text-gray-400 font-normal">(before owner compensation)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={netProfit}
                  onChange={(e) => setNetProfit(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Owner Compensation */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Owner&apos;s Annual Compensation
                <Tooltip text="Include salary, benefits, and any personal expenses run through the business. This is added to net profit to calculate SDE." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={ownerCompensation}
                  onChange={(e) => setOwnerCompensation(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                SDE = Net Profit + Owner Compensation ={" "}
                <span className="font-semibold text-gray-600">{fmt(results.sde)}</span>
              </p>
            </div>

            {/* EBITDA */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Annual EBITDA{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
                <Tooltip text="Earnings Before Interest, Taxes, Depreciation & Amortization. Used for the EBITDA multiple method. If you're unsure, leave it at the default or ask your accountant." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={ebitda}
                  onChange={(e) => setEbitda(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Multiple adjusters */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Custom Multiple Adjusters
            </h3>
            <p className="text-xs text-gray-500 -mt-1">
              Drag to set your expected multiple within the {industry.label} range.
            </p>

            {/* SDE multiple */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">SDE Multiple</label>
                <span className="text-sm font-mono text-gray-600">{sdeMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={industry.sdeMin * 10}
                max={industry.sdeMax * 10}
                step={1}
                value={Math.round(sdeMultiplier * 10)}
                onChange={(e) => setSdeMultiplier(Number(e.target.value) / 10)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>{industry.sdeMin}x low</span>
                <span>{industry.sdeMax}x high</span>
              </div>
            </div>

            {/* EBITDA multiple */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">EBITDA Multiple</label>
                <span className="text-sm font-mono text-gray-600">{ebitdaMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={industry.ebitdaMin * 10}
                max={industry.ebitdaMax * 10}
                step={1}
                value={Math.round(ebitdaMultiplier * 10)}
                onChange={(e) => setEbitdaMultiplier(Number(e.target.value) / 10)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>{industry.ebitdaMin}x low</span>
                <span>{industry.ebitdaMax}x high</span>
              </div>
            </div>

            {/* Revenue multiple */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Revenue Multiple</label>
                <span className="text-sm font-mono text-gray-600">{revenueMultiplier.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={Math.round(industry.revenueMin * 100)}
                max={Math.round(industry.revenueMax * 100)}
                step={1}
                value={Math.round(revenueMultiplier * 100)}
                onChange={(e) => setRevenueMultiplier(Number(e.target.value) / 100)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>{industry.revenueMin}x low</span>
                <span>{industry.revenueMax}x high</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Overall valuation hero */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="text-sm text-indigo-200 mb-1">Estimated Business Value (all methods)</div>
            <div className="text-4xl font-bold tracking-tight">
              {fmt(results.overallLow)} – {fmt(results.overallHigh)}
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-indigo-100 text-sm">
              <span>
                <span className="font-semibold text-white">Highest method:</span>{" "}
                {results.highestMethod} ({results.highestMethod === "SDE"
                  ? `${fmt(results.sdeValLow)}–${fmt(results.sdeValHigh)}`
                  : results.highestMethod === "EBITDA"
                  ? `${fmt(results.ebitdaValLow)}–${fmt(results.ebitdaValHigh)}`
                  : `${fmt(results.revValLow)}–${fmt(results.revValHigh)}`})
              </span>
              <span>
                <span className="font-semibold text-white">Lowest method:</span>{" "}
                {results.lowestMethod} ({results.lowestMethod === "SDE"
                  ? `${fmt(results.sdeValLow)}–${fmt(results.sdeValHigh)}`
                  : results.lowestMethod === "EBITDA"
                  ? `${fmt(results.ebitdaValLow)}–${fmt(results.ebitdaValHigh)}`
                  : `${fmt(results.revValLow)}–${fmt(results.revValHigh)}`})
              </span>
            </div>
          </div>

          {/* Method cards */}
          {/* SDE */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  SDE Multiple Method
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Best for owner-operated businesses under $5M in earnings
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                {industry.sdeMin}x – {industry.sdeMax}x
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Low ({industry.sdeMin}x)</div>
                <div className="text-base font-semibold text-gray-800">{fmt(results.sdeValLow)}</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-3 text-center border border-indigo-200">
                <div className="text-xs text-indigo-600 mb-1">At {sdeMultiplier.toFixed(1)}x</div>
                <div className="text-base font-semibold text-indigo-700">{fmt(results.sdeValPoint)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">High ({industry.sdeMax}x)</div>
                <div className="text-base font-semibold text-gray-800">{fmt(results.sdeValHigh)}</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              SDE = {fmt(results.sde)} (Net Profit {fmt(netProfit)} + Owner Compensation {fmt(ownerCompensation)})
            </p>
          </div>

          {/* EBITDA */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  EBITDA Multiple Method
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Best for businesses with management in place or over $1M EBITDA
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                {industry.ebitdaMin}x – {industry.ebitdaMax}x
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Low ({industry.ebitdaMin}x)</div>
                <div className="text-base font-semibold text-gray-800">{fmt(results.ebitdaValLow)}</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-200">
                <div className="text-xs text-emerald-600 mb-1">At {ebitdaMultiplier.toFixed(1)}x</div>
                <div className="text-base font-semibold text-emerald-700">{fmt(results.ebitdaValPoint)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">High ({industry.ebitdaMax}x)</div>
                <div className="text-base font-semibold text-gray-800">{fmt(results.ebitdaValHigh)}</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              EBITDA = {fmt(ebitda)}
            </p>
          </div>

          {/* Revenue */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Revenue Multiple Method
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Cross-check only — less accurate for most small businesses
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-amber-50 text-amber-700 rounded-full">
                {industry.revenueMin}x – {industry.revenueMax}x
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Low ({industry.revenueMin}x)</div>
                <div className="text-base font-semibold text-gray-800">{fmt(results.revValLow)}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
                <div className="text-xs text-amber-600 mb-1">At {revenueMultiplier.toFixed(2)}x</div>
                <div className="text-base font-semibold text-amber-700">{fmt(results.revValPoint)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">High ({industry.revenueMax}x)</div>
                <div className="text-base font-semibold text-gray-800">{fmt(results.revValHigh)}</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Annual Revenue = {fmt(annualRevenue)}
            </p>
          </div>

          <AdBanner className="my-4" />

          {/* Method comparison summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Method Comparison at Your Custom Multiples
            </h3>
            <div className="space-y-3">
              {[
                { label: "SDE", point: results.sdeValPoint, color: "bg-indigo-500", textColor: "text-indigo-700" },
                { label: "EBITDA", point: results.ebitdaValPoint, color: "bg-emerald-500", textColor: "text-emerald-700" },
                { label: "Revenue", point: results.revValPoint, color: "bg-amber-400", textColor: "text-amber-700" },
              ].map(({ label, point, color, textColor }) => {
                const maxPoint = Math.max(results.sdeValPoint, results.ebitdaValPoint, results.revValPoint);
                const barWidth = maxPoint > 0 ? (point / maxPoint) * 100 : 0;
                return (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{label}</span>
                      <span className={`font-semibold ${textColor}`}>{fmt(point)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`${color} h-2.5 rounded-full transition-all duration-300`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />

      <div className="mt-10 space-y-8">
        <details className="border border-gray-200 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              How This Calculator Works
            </h2>
            <svg
              className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-5 pb-5 pt-2 text-sm text-gray-600 space-y-3">
            <p>
              <strong>SDE (Seller&apos;s Discretionary Earnings)</strong> = Net Profit + Owner&apos;s Total
              Compensation. This is the primary metric used to value owner-operated small businesses because
              it captures the true economic benefit available to a new owner.
            </p>
            <p>
              <strong>SDE Valuation</strong> = SDE × industry multiple. Industry multiples range from
              1.5–2.5× for low-margin businesses (retail, restaurants) up to 3–6× for sticky, recurring-revenue
              models (SaaS, subscription services).
            </p>
            <p>
              <strong>EBITDA Valuation</strong> = EBITDA × industry multiple. EBITDA does not add back
              owner compensation, making it appropriate for businesses with a management layer in place.
              EBITDA multiples are higher than SDE multiples to compensate for the lower base.
            </p>
            <p>
              <strong>Revenue Valuation</strong> = Annual Revenue × industry multiple. This is a rough
              cross-check — it ignores profitability entirely and should never be the sole basis for a
              purchase price.
            </p>
            <p>
              The <strong>overall range</strong> spans from the lowest low estimate across all three methods
              to the highest high estimate. Most deals close somewhere in the middle of this range based on
              negotiation, due diligence findings, and deal structure.
            </p>
          </div>
        </details>

        <FAQSection faqs={faqs} />
        <RelatedCalculators items={relatedCalculators} />
      </div>
    </div>
  );
}
