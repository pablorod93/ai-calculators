"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtExact(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function BusinessAcquisitionClient() {
  // Business details
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [annualRevenue, setAnnualRevenue] = useState(400000);
  const [annualNetIncome, setAnnualNetIncome] = useState(100000);
  const [ownerSalary, setOwnerSalary] = useState(60000);

  // Loan details
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [interestRate, setInterestRate] = useState(10.5);
  const [loanTermYears, setLoanTermYears] = useState(10);
  const [sbaGuaranteeFee, setSbaGuaranteeFee] = useState(3.0);

  // Additional costs
  const [closingCosts, setClosingCosts] = useState(15000);
  const [workingCapital, setWorkingCapital] = useState(25000);

  const results = useMemo(() => {
    const downPayment = purchasePrice * (downPaymentPct / 100);
    const loanAmount = purchasePrice - downPayment;
    const guaranteeFee = loanAmount * (sbaGuaranteeFee / 100);
    const totalLoanWithFees = loanAmount + guaranteeFee;

    // Monthly payment calculation
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = totalLoanWithFees / totalPayments;
    } else {
      monthlyPayment =
        (totalLoanWithFees * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const annualDebtService = monthlyPayment * 12;
    const totalLoanCost = monthlyPayment * totalPayments;
    const totalInterestPaid = totalLoanCost - totalLoanWithFees;

    // Cash flow analysis
    // SDE (Seller's Discretionary Earnings) = Net Income + Owner Salary
    const sde = annualNetIncome + ownerSalary;
    const cashFlowAfterDebt = sde - annualDebtService;
    const monthlyCashFlow = cashFlowAfterDebt / 12;

    // DSCR (Debt Service Coverage Ratio) - banks want > 1.25
    const dscr = annualDebtService > 0 ? sde / annualDebtService : 0;

    // Valuation multiples
    const revenueMultiple = annualRevenue > 0 ? purchasePrice / annualRevenue : 0;
    const sdeMultiple = sde > 0 ? purchasePrice / sde : 0;

    // Total cash needed at closing
    const totalCashNeeded = downPayment + closingCosts + workingCapital;

    // ROI after loan payoff (annual)
    const annualROIAfterPayoff = totalCashNeeded > 0 ? (sde / totalCashNeeded) * 100 : 0;

    // Breakeven months (when cumulative cash flow covers total cash invested)
    const breakevenMonths =
      monthlyCashFlow > 0
        ? Math.ceil(totalCashNeeded / monthlyCashFlow)
        : Infinity;

    return {
      downPayment,
      loanAmount,
      guaranteeFee,
      totalLoanWithFees,
      monthlyPayment,
      annualDebtService,
      totalLoanCost,
      totalInterestPaid,
      sde,
      cashFlowAfterDebt,
      monthlyCashFlow,
      dscr,
      revenueMultiple,
      sdeMultiple,
      totalCashNeeded,
      annualROIAfterPayoff,
      breakevenMonths,
    };
  }, [purchasePrice, annualRevenue, annualNetIncome, ownerSalary, downPaymentPct, interestRate, loanTermYears, sbaGuaranteeFee, closingCosts, workingCapital]);

  const dscrStatus =
    results.dscr >= 1.25
      ? { label: "Strong", color: "text-green-700", bg: "bg-green-50" }
      : results.dscr >= 1.0
      ? { label: "Marginal", color: "text-amber-700", bg: "bg-amber-50" }
      : { label: "Risky", color: "text-red-700", bg: "bg-red-50" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Business Acquisition Calculator
        </h1>
        <p className="text-gray-600">
          Plan your business purchase with SBA loan financing. See monthly
          payments, cash flow impact, and whether the deal makes financial sense.
        </p>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Business Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Business Details
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Annual Revenue</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Annual Net Income (before owner salary)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={annualNetIncome}
                  onChange={(e) => setAnnualNetIncome(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Owner&apos;s Salary (included in expenses)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={ownerSalary}
                  onChange={(e) => setOwnerSalary(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <p className="text-xs text-gray-400 mt-1">SDE = Net Income + Owner Salary = {fmt(annualNetIncome + ownerSalary)}</p>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              SBA Loan Details
            </h3>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Down Payment</label>
                <span className="text-sm font-mono text-gray-600">{downPaymentPct}% ({fmt(purchasePrice * downPaymentPct / 100)})</span>
              </div>
              <input type="range" min={5} max={50} step={1} value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <p className="text-xs text-gray-400 mt-1">SBA 7(a) loans typically require 10-20% down</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Interest Rate (APR)</label>
                <span className="text-sm font-mono text-gray-600">{interestRate}%</span>
              </div>
              <input type="range" min={5} max={15} step={0.25} value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
              <p className="text-xs text-gray-400 mt-1">SBA rates: Prime + 2.25-2.75% (currently ~10-11%)</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Loan Term</label>
              <div className="flex gap-2">
                {[7, 10, 15, 20, 25].map((term) => (
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

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">SBA Guarantee Fee</label>
                <span className="text-sm font-mono text-gray-600">{sbaGuaranteeFee}% ({fmt(results.guaranteeFee)})</span>
              </div>
              <input type="range" min={0} max={5} step={0.25} value={sbaGuaranteeFee}
                onChange={(e) => setSbaGuaranteeFee(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            </div>
          </div>

          {/* Additional Costs */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Additional Costs
            </h3>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Closing Costs (legal, due diligence)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={closingCosts}
                  onChange={(e) => setClosingCosts(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Working Capital Reserve</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={workingCapital}
                  onChange={(e) => setWorkingCapital(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Payment Hero */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
            <div className="text-sm text-blue-200 mb-1">Monthly Loan Payment</div>
            <div className="text-4xl font-bold">{fmtExact(results.monthlyPayment)}</div>
            <div className="text-blue-200 text-sm mt-2">
              Total cash needed at closing: {fmt(results.totalCashNeeded)}
            </div>
          </div>

          {/* DSCR Card */}
          <div className={`${dscrStatus.bg} border border-gray-200 rounded-xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Debt Service Coverage Ratio (DSCR)
                </h3>
                <p className="text-xs text-gray-500">Banks typically require 1.25x or higher for approval</p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${dscrStatus.color}`}>
                  {results.dscr.toFixed(2)}x
                </div>
                <div className={`text-sm font-medium ${dscrStatus.color}`}>
                  {dscrStatus.label}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Deal Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Loan Amount</div>
                <div className="text-lg font-semibold">{fmt(results.totalLoanWithFees)}</div>
                <div className="text-xs text-gray-400">incl. {fmt(results.guaranteeFee)} SBA fee</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Total Interest Paid</div>
                <div className="text-lg font-semibold text-red-700">{fmt(results.totalInterestPaid)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Annual Debt Service</div>
                <div className="text-lg font-semibold">{fmt(results.annualDebtService)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">SDE (Earnings)</div>
                <div className="text-lg font-semibold text-green-700">{fmt(results.sde)}</div>
              </div>
            </div>
          </div>

          <AdBanner className="my-4" />

          {/* Cash Flow Analysis */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Cash Flow Analysis
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-3 ${results.cashFlowAfterDebt >= 0 ? "bg-green-50" : "bg-red-50"}`}>
                <div className={`text-xs ${results.cashFlowAfterDebt >= 0 ? "text-green-600" : "text-red-600"} mb-1`}>
                  Annual Cash Flow (after debt)
                </div>
                <div className={`text-lg font-semibold ${results.cashFlowAfterDebt >= 0 ? "text-green-700" : "text-red-700"}`}>
                  {fmt(results.cashFlowAfterDebt)}
                </div>
              </div>
              <div className={`rounded-lg p-3 ${results.monthlyCashFlow >= 0 ? "bg-green-50" : "bg-red-50"}`}>
                <div className={`text-xs ${results.monthlyCashFlow >= 0 ? "text-green-600" : "text-red-600"} mb-1`}>
                  Monthly Cash Flow
                </div>
                <div className={`text-lg font-semibold ${results.monthlyCashFlow >= 0 ? "text-green-700" : "text-red-700"}`}>
                  {fmtExact(results.monthlyCashFlow)}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-xs text-blue-600 mb-1">Breakeven (payback period)</div>
                <div className="text-lg font-semibold text-blue-700">
                  {results.breakevenMonths === Infinity
                    ? "Never"
                    : `${Math.ceil(results.breakevenMonths / 12)} years (${results.breakevenMonths} mo)`}
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-xs text-purple-600 mb-1">Cash-on-Cash ROI</div>
                <div className="text-lg font-semibold text-purple-700">
                  {results.annualROIAfterPayoff.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Valuation Metrics */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Valuation Check
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Revenue Multiple</div>
                <div className="text-lg font-semibold">{results.revenueMultiple.toFixed(2)}x</div>
                <div className="text-xs text-gray-400">Typical: 0.5-2.0x for small businesses</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">SDE Multiple</div>
                <div className="text-lg font-semibold">{results.sdeMultiple.toFixed(2)}x</div>
                <div className="text-xs text-gray-400">Typical: 2-4x for small businesses</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
