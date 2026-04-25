"use client";

import { useState, useMemo, useEffect } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import ShareButton from "@/components/ShareButton";
import { trackEvent } from "@/lib/analytics";

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

interface YearData {
  year: number;
  startBalance: number;
  contributions: number;
  interestEarned: number;
  endBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export default function CompoundInterestClient() {
  const [principal, setPrincipal] = useState(() => Number(typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("p") ?? 10000 : 10000));
  const [monthlyContribution, setMonthlyContribution] = useState(() => Number(typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("mc") ?? 500 : 500));
  const [annualRate, setAnnualRate] = useState(() => Number(typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("r") ?? 7 : 7));
  const [years, setYears] = useState(() => Number(typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("y") ?? 30 : 30));
  const [compoundingFrequency, setCompoundingFrequency] = useState(() => Number(typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("cf") ?? 12 : 12));
  const [inflationRate, setInflationRate] = useState(() => Number(typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("inf") ?? 3 : 3));
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({ p: String(principal), mc: String(monthlyContribution), r: String(annualRate), y: String(years), cf: String(compoundingFrequency), inf: String(inflationRate) });
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [principal, monthlyContribution, annualRate, years, compoundingFrequency, inflationRate]);

  const results = useMemo(() => {
    const schedule: YearData[] = [];
    let balance = principal;
    let totalContributions = principal;
    let totalInterest = 0;
    const periodicRate = annualRate / 100 / compoundingFrequency;
    const periodsPerYear = compoundingFrequency;

    for (let y = 1; y <= years; y++) {
      const startBalance = balance;
      let yearContributions = 0;
      let yearInterest = 0;

      for (let p = 0; p < periodsPerYear; p++) {
        // Add contribution at start of each period (simplified to monthly)
        const monthsPerPeriod = 12 / periodsPerYear;
        const periodContribution = monthlyContribution * monthsPerPeriod;
        balance += periodContribution;
        yearContributions += periodContribution;

        // Apply interest
        const interest = balance * periodicRate;
        balance += interest;
        yearInterest += interest;
      }

      totalContributions += yearContributions;
      totalInterest += yearInterest;

      schedule.push({
        year: y,
        startBalance,
        contributions: yearContributions,
        interestEarned: yearInterest,
        endBalance: balance,
        totalContributions,
        totalInterest,
      });
    }

    // Inflation-adjusted value
    const nominalFinal = balance;
    const realFinal = nominalFinal / Math.pow(1 + inflationRate / 100, years);

    // Calculate without contributions for comparison
    const withoutContributions = principal * Math.pow(1 + annualRate / 100, years);

    // Total contributed (not counting interest)
    const totalDeposited = principal + monthlyContribution * 12 * years;

    return {
      schedule,
      nominalFinal,
      realFinal,
      totalContributions: totalDeposited,
      totalInterest: nominalFinal - totalDeposited,
      withoutContributions,
      interestPercentage: totalDeposited > 0 ? ((nominalFinal - totalDeposited) / nominalFinal) * 100 : 0,
    };
  }, [principal, monthlyContribution, annualRate, years, compoundingFrequency, inflationRate]);

  // Bar chart data (simplified visual)
  const maxBalance = results.nominalFinal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compound Interest Calculator", href: "/compound-interest-calculator" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Compound Interest Calculator
        </h1>
        <p className="text-gray-600">
          See how your savings and investments grow over time with compound
          interest and regular contributions. Adjust for inflation to see real
          purchasing power.
        </p>
        <div className="mt-3">
          <ShareButton />
        </div>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Your Investment
            </h3>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Starting Amount</label>
                <span className="text-sm font-mono text-gray-600">{fmt(principal)}</span>
              </div>
              <input type="range" min={0} max={500000} step={1000} value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <input type="number" value={principal}
                onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Monthly Contribution</label>
                <span className="text-sm font-mono text-gray-600">{fmt(monthlyContribution)}/mo</span>
              </div>
              <input type="range" min={0} max={10000} step={50} value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
              <input type="number" value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Annual Interest Rate</label>
                <span className="text-sm font-mono text-gray-600">{annualRate}%</span>
              </div>
              <input type="range" min={0} max={20} step={0.1} value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
              <p className="text-xs text-gray-400 mt-1">S&P 500 historical average: ~10% (7% after inflation)</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Time Period</label>
                <span className="text-sm font-mono text-gray-600">{years} years</span>
              </div>
              <input type="range" min={1} max={50} step={1} value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Compounding Frequency</label>
              <div className="flex gap-2">
                {[
                  { label: "Daily", value: 365 },
                  { label: "Monthly", value: 12 },
                  { label: "Quarterly", value: 4 },
                  { label: "Yearly", value: 1 },
                ].map((opt) => (
                  <button key={opt.value} onClick={() => setCompoundingFrequency(opt.value)}
                    className={`flex-1 py-2 text-xs rounded-lg border transition-all ${
                      compoundingFrequency === opt.value
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-blue-300"
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Expected Inflation Rate</label>
                <span className="text-sm font-mono text-gray-600">{inflationRate}%</span>
              </div>
              <input type="range" min={0} max={10} step={0.1} value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Final Value Hero */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white">
            <div className="text-sm text-green-200 mb-1">Your Investment Will Grow To</div>
            <div className="text-4xl font-bold">{fmt(results.nominalFinal)}</div>
            <div className="text-green-200 text-sm mt-2">
              In today&apos;s dollars: {fmt(results.realFinal)} (adjusted for {inflationRate}% inflation)
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-blue-600 mb-1">Total Deposited</div>
              <div className="text-xl font-bold text-blue-800">{fmt(results.totalContributions)}</div>
              <div className="text-xs text-blue-500 mt-1">{(100 - results.interestPercentage).toFixed(0)}% of final</div>
            </div>
            <div className="bg-green-50 border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-green-600 mb-1">Interest Earned</div>
              <div className="text-xl font-bold text-green-800">{fmt(results.totalInterest)}</div>
              <div className="text-xs text-green-500 mt-1">{results.interestPercentage.toFixed(0)}% of final</div>
            </div>
          </div>

          {/* Visual bar showing contributions vs interest */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Growth Over Time
            </h3>
            <div className="space-y-2">
              {results.schedule
                .filter((_, i) => {
                  // Show every year if <= 15, otherwise every 5
                  if (years <= 15) return true;
                  return (i + 1) % 5 === 0 || i === 0 || i === years - 1;
                })
                .map((row) => {
                  const contribWidth = maxBalance > 0 ? (row.totalContributions / maxBalance) * 100 : 0;
                  const interestWidth = maxBalance > 0 ? (row.totalInterest / maxBalance) * 100 : 0;
                  return (
                    <div key={row.year} className="flex items-center gap-3">
                      <div className="w-16 text-xs text-gray-500 text-right shrink-0">
                        Year {row.year}
                      </div>
                      <div className="flex-1 flex h-6 rounded-full overflow-hidden bg-gray-100">
                        <div
                          className="bg-blue-500 transition-all"
                          style={{ width: `${contribWidth}%` }}
                          title={`Contributions: ${fmt(row.totalContributions)}`}
                        />
                        <div
                          className="bg-green-500 transition-all"
                          style={{ width: `${interestWidth}%` }}
                          title={`Interest: ${fmt(row.totalInterest)}`}
                        />
                      </div>
                      <div className="w-24 text-xs font-mono text-gray-700 text-right shrink-0">
                        {fmt(row.endBalance)}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500" /> Contributions
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500" /> Interest
              </div>
            </div>
          </div>

          <AdBanner className="my-4" />

          {/* Detailed table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <button
              onClick={() => setShowTable(!showTable)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Year-by-Year Breakdown
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showTable ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showTable && (
              <div className="mt-4 overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-3 text-gray-500 font-medium">Year</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Contributions</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Interest</th>
                      <th className="text-right py-2 pl-3 text-gray-500 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map((row) => (
                      <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 pr-3 text-gray-900">Year {row.year}</td>
                        <td className="text-right py-2 px-3 font-mono text-blue-700">{fmt(row.contributions)}</td>
                        <td className="text-right py-2 px-3 font-mono text-green-700">{fmt(row.interestEarned)}</td>
                        <td className="text-right py-2 pl-3 font-mono font-semibold text-gray-900">{fmt(row.endBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
            <p><strong>Compound interest formula</strong> (without contributions):</p>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs overflow-x-auto">A = P × (1 + r/n)^(n×t)</pre>
            <p>Where <strong>P</strong> = principal, <strong>r</strong> = annual interest rate, <strong>n</strong> = compounding periods per year, <strong>t</strong> = years.</p>
            <p><strong>With regular contributions</strong>, each contribution is treated as its own compound interest series and summed. For monthly contributions C:</p>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs overflow-x-auto">A = P×(1+r/n)^(nt) + C×[(1+r/n)^(nt) − 1] / (r/n)</pre>
            <p><strong>Inflation adjustment:</strong> the real value is calculated by deflating the nominal balance by the inflation rate each year: Real Value = Nominal Balance / (1 + inflation)^t.</p>
          </div>
        </details>
        <FAQSection faqs={[
          { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which only earns on the principal), compound interest causes your money to grow exponentially. Einstein reportedly called it the 'eighth wonder of the world.'" },
          { question: "How does compounding frequency affect growth?", answer: "More frequent compounding = more growth. $10,000 at 8% for 10 years: annual compounding → $21,589; monthly compounding → $22,196; daily compounding → $22,253. The difference grows larger with higher rates and longer time horizons. Most savings accounts and investments compound monthly or daily." },
          { question: "What is the Rule of 72?", answer: "The Rule of 72 is a shortcut to estimate how long it takes to double your money. Divide 72 by your annual interest rate: at 6%/year, your money doubles in about 12 years (72 ÷ 6 = 12); at 9%, in 8 years. It's a quick mental math check — use this calculator for exact figures." },
          { question: "How do regular contributions affect compound growth?", answer: "Regular contributions dramatically accelerate growth. Adding $500/month to $10,000 at 7% for 20 years grows to ~$280,000 — versus just ~$40,000 with no contributions. The earlier you start contributing, the more powerful the compounding effect. This calculator models both the initial principal and regular additions." },
          { question: "What's the difference between APY and APR?", answer: "APR (Annual Percentage Rate) is the stated interest rate. APY (Annual Percentage Yield) accounts for compounding frequency and reflects what you actually earn. A 6% APR compounded monthly gives an APY of about 6.17%. When comparing savings accounts, always compare APY — it's the true return." },
          { question: "How does inflation reduce real returns?", answer: "Inflation erodes purchasing power. If you earn 7%/year but inflation is 3%, your real return is about 4%. Enable the inflation adjustment in this calculator to see both the nominal (before inflation) and real (after inflation) value of your savings over time." },
        ]} />
        <RelatedCalculators items={[
          { title: "ROI Calculator", href: "/roi-calculator", description: "Compare the ROI of different investment options." },
          { title: "Loan Amortization Calculator", href: "/loan-amortization-calculator", description: "See how debt costs you in interest over time." },
          { title: "Mortgage Calculator", href: "/mortgage-calculator", description: "Calculate how a mortgage fits into your financial plan." },
        ]} />
      </div>
    </div>
  );
}
