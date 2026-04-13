"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

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

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function MortgageCalculatorClient() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [showAmortization, setShowAmortization] = useState(false);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPaymentPct / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    let monthlyPrincipalInterest: number;
    if (monthlyRate === 0) {
      monthlyPrincipalInterest = loanAmount / totalPayments;
    } else {
      monthlyPrincipalInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = homeInsurance / 12;

    // PMI if down payment < 20%
    const monthlyPMI = downPaymentPct < 20 ? (loanAmount * 0.005) / 12 : 0;

    const totalMonthly =
      monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPMI;
    const totalPaid = monthlyPrincipalInterest * totalPayments;
    const totalInterest = totalPaid - loanAmount;

    // Amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= totalPayments; m++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPrincipalInterest - interestPayment;
      balance -= principalPayment;
      schedule.push({
        month: m,
        payment: monthlyPrincipalInterest,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    return {
      downPayment,
      loanAmount,
      monthlyPrincipalInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthly,
      totalPaid,
      totalInterest,
      schedule,
    };
  }, [homePrice, downPaymentPct, interestRate, loanTermYears, propertyTaxRate, homeInsurance]);

  // Pie chart data for monthly payment breakdown
  const pieParts = [
    { label: "Principal & Interest", amount: results.monthlyPrincipalInterest, color: "#3b82f6" },
    { label: "Property Tax", amount: results.monthlyTax, color: "#8b5cf6" },
    { label: "Home Insurance", amount: results.monthlyInsurance, color: "#f59e0b" },
    ...(results.monthlyPMI > 0
      ? [{ label: "PMI", amount: results.monthlyPMI, color: "#ef4444" }]
      : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mortgage Calculator
        </h1>
        <p className="text-gray-600">
          Calculate your monthly mortgage payment including principal, interest,
          taxes, insurance, and PMI. See the full amortization schedule.
        </p>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Loan Details
            </h3>

            {/* Home Price */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Home Price</label>
                <span className="text-sm font-mono text-gray-600">{formatCurrency(homePrice)}</span>
              </div>
              <input type="range" min={50000} max={2000000} step={5000} value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <input type="number" value={homePrice}
                onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Down Payment</label>
                <span className="text-sm font-mono text-gray-600">
                  {downPaymentPct}% ({formatCurrency(homePrice * downPaymentPct / 100)})
                </span>
              </div>
              <input type="range" min={0} max={100} step={1} value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              {downPaymentPct < 20 && (
                <p className="text-xs text-amber-600 mt-1">
                  Below 20% requires Private Mortgage Insurance (PMI)
                </p>
              )}
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                <span className="text-sm font-mono text-gray-600">{interestRate}%</span>
              </div>
              <input type="range" min={0} max={15} step={0.1} value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
            </div>

            {/* Loan Term */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Loan Term</label>
              <div className="flex gap-2">
                {[10, 15, 20, 25, 30].map((term) => (
                  <button key={term} onClick={() => setLoanTermYears(term)}
                    className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                      loanTermYears === term
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-blue-300"
                    }`}>
                    {term} yr
                  </button>
                ))}
              </div>
            </div>

            {/* Property Tax */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Property Tax Rate</label>
                <span className="text-sm font-mono text-gray-600">
                  {propertyTaxRate}% ({formatCurrency(homePrice * propertyTaxRate / 100)}/yr)
                </span>
              </div>
              <input type="range" min={0} max={4} step={0.1} value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            </div>

            {/* Home Insurance */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Home Insurance</label>
                <span className="text-sm font-mono text-gray-600">{formatCurrency(homeInsurance)}/yr</span>
              </div>
              <input type="range" min={0} max={5000} step={100} value={homeInsurance}
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Payment Hero */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="text-sm text-blue-200 mb-1">Your Estimated Monthly Payment</div>
            <div className="text-4xl font-bold">{formatCurrencyExact(results.totalMonthly)}</div>
            <div className="text-blue-200 text-sm mt-1">per month</div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Monthly Payment Breakdown
            </h3>
            <div className="space-y-3">
              {pieParts.map((part) => (
                <div key={part.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: part.color }} />
                    <span className="text-sm text-gray-700">{part.label}</span>
                  </div>
                  <span className="text-sm font-mono font-semibold text-gray-900">
                    {formatCurrencyExact(part.amount)}
                  </span>
                </div>
              ))}
              {/* Visual bar */}
              <div className="flex h-3 rounded-full overflow-hidden mt-2">
                {pieParts.map((part) => (
                  <div
                    key={part.label}
                    style={{
                      width: `${(part.amount / results.totalMonthly) * 100}%`,
                      backgroundColor: part.color,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Loan Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Loan Amount</div>
                <div className="text-lg font-semibold">{formatCurrency(results.loanAmount)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Down Payment</div>
                <div className="text-lg font-semibold">{formatCurrency(results.downPayment)}</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-xs text-red-500 mb-1">Total Interest Paid</div>
                <div className="text-lg font-semibold text-red-700">{formatCurrency(results.totalInterest)}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-xs text-blue-500 mb-1">Total Cost of Loan</div>
                <div className="text-lg font-semibold text-blue-700">{formatCurrency(results.totalPaid)}</div>
              </div>
            </div>
          </div>

          <AdBanner className="my-4" />

          {/* Amortization Schedule */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Amortization Schedule
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showAmortization ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showAmortization && (
              <div className="mt-4 overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-3 text-gray-500 font-medium">Year</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Payment</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Principal</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Interest</th>
                      <th className="text-right py-2 pl-3 text-gray-500 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Show yearly summaries */}
                    {Array.from({ length: loanTermYears }, (_, y) => {
                      const yearRows = results.schedule.slice(y * 12, (y + 1) * 12);
                      const yearPrincipal = yearRows.reduce((s, r) => s + r.principal, 0);
                      const yearInterest = yearRows.reduce((s, r) => s + r.interest, 0);
                      const yearPayment = yearRows.reduce((s, r) => s + r.payment, 0);
                      const endBalance = yearRows[yearRows.length - 1]?.balance ?? 0;
                      return (
                        <tr key={y} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 pr-3 font-medium text-gray-900">Year {y + 1}</td>
                          <td className="text-right py-2 px-3 font-mono text-gray-600">{formatCurrency(yearPayment)}</td>
                          <td className="text-right py-2 px-3 font-mono text-green-700">{formatCurrency(yearPrincipal)}</td>
                          <td className="text-right py-2 px-3 font-mono text-red-600">{formatCurrency(yearInterest)}</td>
                          <td className="text-right py-2 pl-3 font-mono text-gray-900">{formatCurrency(endBalance)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
