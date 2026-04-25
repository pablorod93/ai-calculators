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

function formatCurrencyExact(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function calcMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);
}

interface YearSummary {
  year: number;
  principal: number;
  interest: number;
  endBalance: number;
}

function buildYearlySummary(principal: number, annualRate: number, months: number): YearSummary[] {
  const r = annualRate / 100 / 12;
  const pmt = calcMonthlyPayment(principal, annualRate, months);
  const years: YearSummary[] = [];
  let balance = principal;

  const totalYears = Math.ceil(months / 12);
  for (let y = 0; y < totalYears; y++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    const monthsThisYear = Math.min(12, months - y * 12);
    for (let m = 0; m < monthsThisYear; m++) {
      const interestPayment = balance * r;
      const principalPayment = pmt - interestPayment;
      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
      balance -= principalPayment;
    }
    years.push({
      year: y + 1,
      principal: yearPrincipal,
      interest: yearInterest,
      endBalance: Math.max(0, balance),
    });
  }

  return years;
}

export default function MortgageRefinanceClient() {
  // Current loan
  const [currentBalance, setCurrentBalance] = useState(280000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [currentTermYears, setCurrentTermYears] = useState(25);

  // New loan
  const [newRate, setNewRate] = useState(5.5);
  const [newTermYears, setNewTermYears] = useState(30);
  const [closingCosts, setClosingCosts] = useState(6000);
  const [cashOut, setCashOut] = useState(0);

  // UI state
  const [showBreakeven, setShowBreakeven] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);

  const results = useMemo(() => {
    const currentMonths = currentTermYears * 12;
    const currentPayment = calcMonthlyPayment(currentBalance, currentRate, currentMonths);
    const currentTotalPaid = currentPayment * currentMonths;
    const currentTotalInterest = currentTotalPaid - currentBalance;

    const newLoanAmount = currentBalance + cashOut;
    const newMonths = newTermYears * 12;
    const newPayment = calcMonthlyPayment(newLoanAmount, newRate, newMonths);
    const newTotalPaid = newPayment * newMonths;
    const newTotalInterest = newTotalPaid - newLoanAmount;

    const monthlySavings = currentPayment - newPayment;
    const breakevenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : Infinity;
    const totalInterestSaved = currentTotalInterest - newTotalInterest;
    const netLifetimeSavings = currentTotalPaid - (newTotalPaid + closingCosts);

    const rateDrop = currentRate - newRate;
    const meetsOnePercentRule = rateDrop >= 1.0;

    // Cumulative savings by year for breakeven chart
    const maxYears = Math.max(currentTermYears, newTermYears);
    const cumulativeSavings: { year: number; cumulative: number; net: number }[] = [];
    let cumulative = 0;
    for (let y = 1; y <= maxYears; y++) {
      const monthsThisYear = 12;
      cumulative += monthlySavings * monthsThisYear;
      cumulativeSavings.push({
        year: y,
        cumulative,
        net: cumulative - closingCosts,
      });
    }

    const currentSchedule = buildYearlySummary(currentBalance, currentRate, currentMonths);
    const newSchedule = buildYearlySummary(newLoanAmount, newRate, newMonths);

    return {
      currentPayment,
      currentTotalPaid,
      currentTotalInterest,
      newLoanAmount,
      newPayment,
      newTotalPaid,
      newTotalInterest,
      monthlySavings,
      breakevenMonths,
      totalInterestSaved,
      netLifetimeSavings,
      rateDrop,
      meetsOnePercentRule,
      cumulativeSavings,
      currentSchedule,
      newSchedule,
    };
  }, [currentBalance, currentRate, currentTermYears, newRate, newTermYears, closingCosts, cashOut]);

  const savingsPositive = results.monthlySavings > 0;

  const breakevenLabel =
    results.breakevenMonths === Infinity
      ? "Never"
      : results.breakevenMonths <= 12
        ? `${results.breakevenMonths} month${results.breakevenMonths !== 1 ? "s" : ""}`
        : `${(results.breakevenMonths / 12).toFixed(1)} years`;

  const breakevenColor =
    results.breakevenMonths <= 24
      ? "text-green-700"
      : results.breakevenMonths <= 60
        ? "text-amber-700"
        : "text-red-700";

  const breakevenDotColor =
    results.breakevenMonths <= 24
      ? "bg-green-500"
      : results.breakevenMonths <= 60
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Mortgage Refinance Calculator", href: "/mortgage-refinance-calculator" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mortgage Refinance Calculator
        </h1>
        <p className="text-gray-600">
          Compare your current mortgage with a refinanced loan. See your breakeven
          timeline, monthly savings, and whether refinancing makes sense for you.
        </p>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Current Loan
            </h3>

            {/* Current Balance */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Remaining Balance</label>
                <span className="text-sm font-mono text-gray-600">{formatCurrency(currentBalance)}</span>
              </div>
              <input type="range" min={10000} max={2000000} step={5000} value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <input type="number" value={currentBalance}
                onChange={(e) => setCurrentBalance(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            {/* Current Rate */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Current Interest Rate</label>
                <span className="text-sm font-mono text-gray-600">{currentRate.toFixed(1)}%</span>
              </div>
              <input type="range" min={0} max={15} step={0.1} value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
            </div>

            {/* Current Remaining Term */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Remaining Term</label>
                <span className="text-sm font-mono text-gray-600">{currentTermYears} years</span>
              </div>
              <input type="range" min={1} max={30} step={1} value={currentTermYears}
                onChange={(e) => setCurrentTermYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>

            {/* Current Monthly Payment (read-only) */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Current Monthly Payment</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatCurrencyExact(results.currentPayment)}
              </div>
            </div>

            <hr className="border-gray-200" />

            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              New Loan
            </h3>

            {/* New Rate */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">New Interest Rate</label>
                <span className="text-sm font-mono text-gray-600">{newRate.toFixed(1)}%</span>
              </div>
              <input type="range" min={0} max={15} step={0.1} value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
            </div>

            {/* New Term */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">New Loan Term</label>
              <div className="flex gap-2">
                {[10, 15, 20, 25, 30].map((term) => (
                  <button key={term} onClick={() => setNewTermYears(term)}
                    className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                      newTermYears === term
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-blue-300"
                    }`}>
                    {term} yr
                  </button>
                ))}
              </div>
            </div>

            {/* Closing Costs */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Closing Costs</label>
                <span className="text-sm font-mono text-gray-600">{formatCurrency(closingCosts)}</span>
              </div>
              <input type="range" min={0} max={20000} step={500} value={closingCosts}
                onChange={(e) => setClosingCosts(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
              <input type="number" value={closingCosts}
                onChange={(e) => setClosingCosts(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              {currentBalance > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {((closingCosts / currentBalance) * 100).toFixed(1)}% of loan balance
                </p>
              )}
            </div>

            {/* Cash-Out */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Cash-Out Amount</label>
                <span className="text-sm font-mono text-gray-600">{formatCurrency(cashOut)}</span>
              </div>
              <input type="range" min={0} max={100000} step={1000} value={cashOut}
                onChange={(e) => setCashOut(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
              {cashOut > 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  New loan amount: {formatCurrency(results.newLoanAmount)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero: Monthly Savings */}
          <div className={`rounded-xl p-6 text-white ${
            savingsPositive
              ? "bg-gradient-to-br from-green-600 to-green-700"
              : "bg-gradient-to-br from-red-600 to-red-700"
          }`}>
            <div className={`text-sm mb-1 ${savingsPositive ? "text-green-200" : "text-red-200"}`}>
              {savingsPositive ? "Your Estimated Monthly Savings" : "Monthly Payment Increase"}
            </div>
            <div className="text-4xl font-bold">
              {formatCurrencyExact(Math.abs(results.monthlySavings))}
            </div>
            <div className={`text-sm mt-1 ${savingsPositive ? "text-green-200" : "text-red-200"}`}>
              per month &middot; refinancing from {currentRate.toFixed(1)}% to {newRate.toFixed(1)}%
            </div>
          </div>

          {/* Refinance Decision Scorecard */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Should You Refinance?
            </h3>
            <div className="space-y-4">
              {/* 1% Rule */}
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                  results.meetsOnePercentRule ? "bg-green-500" : "bg-red-500"
                }`} />
                <div>
                  <div className="text-sm font-medium text-gray-900">The 1% Rule</div>
                  <div className="text-sm text-gray-600">
                    Your rate drops {results.rateDrop.toFixed(1)} percentage points &mdash;{" "}
                    {results.meetsOnePercentRule
                      ? "meets the 1% threshold"
                      : "below the 1% threshold"}
                  </div>
                </div>
              </div>

              {/* Breakeven */}
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${breakevenDotColor}`} />
                <div>
                  <div className="text-sm font-medium text-gray-900">Breakeven Period</div>
                  <div className={`text-sm ${breakevenColor}`}>
                    {results.breakevenMonths === Infinity
                      ? "No monthly savings to recoup closing costs"
                      : `You\u2019ll recoup closing costs in ${breakevenLabel}`}
                  </div>
                </div>
              </div>

              {/* Net Savings */}
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                  results.netLifetimeSavings > 0 ? "bg-green-500" : "bg-red-500"
                }`} />
                <div>
                  <div className="text-sm font-medium text-gray-900">Net Lifetime Savings</div>
                  <div className="text-sm text-gray-600">
                    {results.netLifetimeSavings > 0
                      ? `You\u2019ll save ${formatCurrency(results.netLifetimeSavings)} over the life of the loan (after closing costs)`
                      : `Refinancing costs ${formatCurrency(Math.abs(results.netLifetimeSavings))} more over the life of the loan`}
                  </div>
                </div>
              </div>

              {/* Term Impact */}
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                  newTermYears <= currentTermYears ? "bg-green-500" : "bg-amber-500"
                }`} />
                <div>
                  <div className="text-sm font-medium text-gray-900">Term Impact</div>
                  <div className="text-sm text-gray-600">
                    {newTermYears === currentTermYears
                      ? "Same loan term"
                      : newTermYears > currentTermYears
                        ? `Extends your loan by ${newTermYears - currentTermYears} years \u2014 lower payments but more total interest`
                        : `Shortens your loan by ${currentTermYears - newTermYears} years \u2014 higher payments but less total interest`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Loan Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 text-gray-500 font-medium">Metric</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Current Loan</th>
                    <th className="text-right py-2 pl-3 text-gray-500 font-medium">New Loan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-3 pr-3 text-gray-700">Monthly Payment</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900">
                      {formatCurrencyExact(results.currentPayment)}
                    </td>
                    <td className={`text-right py-3 pl-3 font-mono font-semibold ${
                      savingsPositive ? "text-green-700" : "text-red-700"
                    }`}>
                      {formatCurrencyExact(results.newPayment)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-3 pr-3 text-gray-700">Interest Rate</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900">{currentRate.toFixed(1)}%</td>
                    <td className={`text-right py-3 pl-3 font-mono font-semibold ${
                      newRate < currentRate ? "text-green-700" : "text-red-700"
                    }`}>
                      {newRate.toFixed(1)}%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-3 pr-3 text-gray-700">Remaining Term</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900">{currentTermYears} years</td>
                    <td className="text-right py-3 pl-3 font-mono text-gray-900">{newTermYears} years</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-3 pr-3 text-gray-700">Loan Balance</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900">{formatCurrency(currentBalance)}</td>
                    <td className="text-right py-3 pl-3 font-mono text-gray-900">
                      {formatCurrency(results.newLoanAmount)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-3 pr-3 text-gray-700">Total Interest</td>
                    <td className="text-right py-3 px-3 font-mono text-red-600">
                      {formatCurrency(results.currentTotalInterest)}
                    </td>
                    <td className={`text-right py-3 pl-3 font-mono font-semibold ${
                      results.newTotalInterest < results.currentTotalInterest ? "text-green-700" : "text-red-700"
                    }`}>
                      {formatCurrency(results.newTotalInterest)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 text-gray-700">Total Cost</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900">
                      {formatCurrency(results.currentTotalPaid)}
                    </td>
                    <td className={`text-right py-3 pl-3 font-mono font-semibold ${
                      results.netLifetimeSavings > 0 ? "text-green-700" : "text-red-700"
                    }`}>
                      {formatCurrency(results.newTotalPaid + closingCosts)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Grid */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Refinance Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-3 ${savingsPositive ? "bg-green-50" : "bg-red-50"}`}>
                <div className={`text-xs mb-1 ${savingsPositive ? "text-green-500" : "text-red-500"}`}>
                  Monthly Savings
                </div>
                <div className={`text-lg font-semibold ${savingsPositive ? "text-green-700" : "text-red-700"}`}>
                  {savingsPositive ? "" : "-"}{formatCurrencyExact(Math.abs(results.monthlySavings))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Breakeven Point</div>
                <div className={`text-lg font-semibold ${breakevenColor}`}>{breakevenLabel}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Interest Saved</div>
                <div className={`text-lg font-semibold ${results.totalInterestSaved > 0 ? "text-green-700" : "text-red-700"}`}>
                  {formatCurrency(results.totalInterestSaved)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Closing Costs</div>
                <div className="text-lg font-semibold text-gray-900">{formatCurrency(closingCosts)}</div>
              </div>
            </div>
          </div>

          <AdBanner className="my-4" />

          {/* Breakeven Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <button
              onClick={() => setShowBreakeven(!showBreakeven)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Breakeven Timeline
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showBreakeven ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showBreakeven && (
              <div className="mt-4 overflow-x-auto max-h-96 overflow-y-auto">
                {!savingsPositive ? (
                  <p className="text-sm text-gray-500">
                    No monthly savings to chart &mdash; the new loan has a higher payment.
                  </p>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-3 text-gray-500 font-medium">Year</th>
                        <th className="text-right py-2 px-3 text-gray-500 font-medium">Cumulative Savings</th>
                        <th className="text-right py-2 px-3 text-gray-500 font-medium">Net (After Costs)</th>
                        <th className="text-right py-2 pl-3 text-gray-500 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.cumulativeSavings.map((row) => (
                        <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 pr-3 font-medium text-gray-900">Year {row.year}</td>
                          <td className="text-right py-2 px-3 font-mono text-green-700">
                            {formatCurrency(row.cumulative)}
                          </td>
                          <td className={`text-right py-2 px-3 font-mono ${row.net >= 0 ? "text-green-700" : "text-red-600"}`}>
                            {formatCurrency(row.net)}
                          </td>
                          <td className="text-right py-2 pl-3">
                            {row.net >= 0 ? (
                              <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                                Ahead
                              </span>
                            ) : (
                              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                Behind
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Amortization Comparison */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Amortization Comparison
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showAmortization ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showAmortization && (
              <div className="mt-4 space-y-6">
                {/* Current Loan Schedule */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Loan</h4>
                  <div className="overflow-x-auto max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-3 text-gray-500 font-medium">Year</th>
                          <th className="text-right py-2 px-3 text-gray-500 font-medium">Principal</th>
                          <th className="text-right py-2 px-3 text-gray-500 font-medium">Interest</th>
                          <th className="text-right py-2 pl-3 text-gray-500 font-medium">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.currentSchedule.map((row) => (
                          <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-2 pr-3 font-medium text-gray-900">Year {row.year}</td>
                            <td className="text-right py-2 px-3 font-mono text-green-700">{formatCurrency(row.principal)}</td>
                            <td className="text-right py-2 px-3 font-mono text-red-600">{formatCurrency(row.interest)}</td>
                            <td className="text-right py-2 pl-3 font-mono text-gray-900">{formatCurrency(row.endBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* New Loan Schedule */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">New Loan</h4>
                  <div className="overflow-x-auto max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-3 text-gray-500 font-medium">Year</th>
                          <th className="text-right py-2 px-3 text-gray-500 font-medium">Principal</th>
                          <th className="text-right py-2 px-3 text-gray-500 font-medium">Interest</th>
                          <th className="text-right py-2 pl-3 text-gray-500 font-medium">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.newSchedule.map((row) => (
                          <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-2 pr-3 font-medium text-gray-900">Year {row.year}</td>
                            <td className="text-right py-2 px-3 font-mono text-green-700">{formatCurrency(row.principal)}</td>
                            <td className="text-right py-2 px-3 font-mono text-red-600">{formatCurrency(row.interest)}</td>
                            <td className="text-right py-2 pl-3 font-mono text-gray-900">{formatCurrency(row.endBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
            <p><strong>Monthly savings</strong> = current monthly payment − new monthly payment (both calculated using the standard amortization formula with your respective rates and remaining terms).</p>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs overflow-x-auto">Breakeven months = Closing costs ÷ Monthly savings</pre>
            <p>If your breakeven is under 36 months and you plan to stay in the home, refinancing almost always makes sense. Over 60 months, run the numbers carefully.</p>
            <p><strong>Total interest comparison</strong> is calculated by summing all future interest payments on both the current loan (remaining term) and the proposed refinanced loan. This accounts for term extensions — refinancing into a new 30-year loan when you have 20 years left will show a higher total cost even if the monthly payment drops.</p>
          </div>
        </details>
        <FAQSection faqs={[
          { question: "What is the breakeven point for refinancing?", answer: "The breakeven point is when your cumulative monthly savings equal your closing costs. For example, if refinancing costs $4,000 and saves you $200/month, you break even in 20 months. This calculator shows your exact breakeven timeline based on your inputs." },
          { question: "Is the 1% rule for refinancing still valid?", answer: "The traditional rule says refinancing makes sense if you can lower your rate by at least 1%. While still a useful starting point, a more precise approach is to calculate your actual breakeven period and compare it to how long you plan to stay in the home. Even a 0.5% reduction can make sense if closing costs are low." },
          { question: "Does refinancing restart my loan term?", answer: "Yes — if you refinance a 30-year mortgage after 10 years into a new 30-year loan, you extend your total loan period. This lowers monthly payments but increases total interest paid. Refinancing into a shorter term (like 15 years) avoids this and saves more on total interest." },
          { question: "What closing costs should I expect when refinancing?", answer: "Typical refinancing closing costs are 2%–5% of the loan amount, covering origination fees, appraisal, title insurance, and prepaid taxes/insurance. On a $300,000 loan that's $6,000–$15,000. Some lenders offer 'no-closing-cost' refinancing where fees are rolled into the rate." },
          { question: "When does it NOT make sense to refinance?", answer: "Refinancing may not be worth it if: you plan to move before the breakeven period, you're far into your loan (mostly paying principal anyway), closing costs are very high, or you'd extend your term significantly. This calculator helps you evaluate your specific scenario." },
          { question: "How does cash-out refinancing work?", answer: "Cash-out refinancing replaces your mortgage with a larger loan and you receive the difference in cash. For example, if your home is worth $400,000 and you owe $200,000, you could refinance for $280,000 and receive $80,000 cash. This increases your loan balance and monthly payments." },
        ]} />
        <RelatedCalculators items={[
          { title: "Mortgage Calculator", href: "/mortgage-calculator", description: "Calculate your current or new mortgage payment including taxes and insurance." },
          { title: "Loan Amortization Calculator", href: "/loan-amortization-calculator", description: "See how extra payments could eliminate your loan faster." },
          { title: "ROI Calculator", href: "/roi-calculator", description: "Calculate the return on any financial decision." },
        ]} />
      </div>
    </div>
  );
}
