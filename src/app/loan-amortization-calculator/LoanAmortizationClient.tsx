"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";
import ShareButton from "@/components/ShareButton";
import { trackEvent } from "@/lib/analytics";
import { downloadCsv } from "@/lib/csv-export";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n);
}

function fmtExact(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(n);
}

interface MonthRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  balance: number;
}

export default function LoanAmortizationClient() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermMonths, setLoanTermMonths] = useState(60);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState(0);
  const [showMonthly, setShowMonthly] = useState(false);

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;

    let basePayment: number;
    if (monthlyRate === 0) {
      basePayment = loanAmount / loanTermMonths;
    } else {
      basePayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    }

    // Standard schedule (no extra payments)
    const standardSchedule: MonthRow[] = [];
    let stdBalance = loanAmount;
    let stdTotalInterest = 0;
    for (let m = 1; m <= loanTermMonths && stdBalance > 0; m++) {
      const interest = stdBalance * monthlyRate;
      const principal = Math.min(basePayment - interest, stdBalance);
      stdBalance -= principal;
      stdTotalInterest += interest;
      standardSchedule.push({
        month: m, payment: basePayment, principal, interest,
        extraPayment: 0, balance: Math.max(0, stdBalance),
      });
    }

    // Schedule with extra payments
    const extraSchedule: MonthRow[] = [];
    let extBalance = loanAmount;
    let extTotalInterest = 0;
    for (let m = 1; m <= loanTermMonths && extBalance > 0.01; m++) {
      const interest = extBalance * monthlyRate;
      const basePrincipal = basePayment - interest;
      const extra = Math.min(extraMonthlyPayment, extBalance - basePrincipal);
      const totalPrincipal = Math.min(basePrincipal + extra, extBalance);
      extBalance -= totalPrincipal;
      extTotalInterest += interest;
      extraSchedule.push({
        month: m,
        payment: basePayment + Math.min(extra, extraMonthlyPayment),
        principal: basePrincipal,
        interest,
        extraPayment: Math.min(extra, extraMonthlyPayment),
        balance: Math.max(0, extBalance),
      });
    }

    const interestSaved = stdTotalInterest - extTotalInterest;
    const monthsSaved = standardSchedule.length - extraSchedule.length;

    return {
      basePayment,
      standardSchedule,
      extraSchedule,
      standardTotalInterest: stdTotalInterest,
      extraTotalInterest: extTotalInterest,
      standardTotalCost: loanAmount + stdTotalInterest,
      extraTotalCost: loanAmount + extTotalInterest,
      interestSaved,
      monthsSaved,
      actualSchedule: extraMonthlyPayment > 0 ? extraSchedule : standardSchedule,
    };
  }, [loanAmount, interestRate, loanTermMonths, extraMonthlyPayment]);

  // Yearly summary from actual schedule
  const yearlySummary = useMemo(() => {
    const schedule = results.actualSchedule;
    const years: { year: number; principal: number; interest: number; extra: number; endBalance: number }[] = [];
    const totalYears = Math.ceil(schedule.length / 12);
    for (let y = 0; y < totalYears; y++) {
      const slice = schedule.slice(y * 12, (y + 1) * 12);
      years.push({
        year: y + 1,
        principal: slice.reduce((s, r) => s + r.principal, 0),
        interest: slice.reduce((s, r) => s + r.interest, 0),
        extra: slice.reduce((s, r) => s + r.extraPayment, 0),
        endBalance: slice[slice.length - 1]?.balance ?? 0,
      });
    }
    return years;
  }, [results.actualSchedule]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Loan Amortization Calculator", href: "/loan-amortization-calculator" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Loan Amortization Calculator
        </h1>
        <p className="text-gray-600">
          See exactly how your loan payments break down between principal and
          interest. Explore how extra payments can save you money and shorten
          your loan.
        </p>
        <div className="mt-3"><ShareButton /></div>
      </div>

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Loan Details
            </h3>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                <span className="text-sm font-mono text-gray-600">{fmt(loanAmount)}</span>
              </div>
              <input type="range" min={1000} max={1000000} step={1000} value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <input type="number" value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(1, Number(e.target.value)))}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                <span className="text-sm font-mono text-gray-600">{interestRate}%</span>
              </div>
              <input type="range" min={0} max={30} step={0.1} value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Loan Term</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "2 years", months: 24 },
                  { label: "3 years", months: 36 },
                  { label: "5 years", months: 60 },
                  { label: "7 years", months: 84 },
                  { label: "10 years", months: 120 },
                  { label: "15 years", months: 180 },
                ].map((opt) => (
                  <button key={opt.months} onClick={() => setLoanTermMonths(opt.months)}
                    className={`py-2 text-xs rounded-lg border transition-all ${
                      loanTermMonths === opt.months
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-blue-300"
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <input type="number" value={loanTermMonths}
                  onChange={(e) => setLoanTermMonths(Math.max(1, Number(e.target.value)))}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                <span className="text-sm text-gray-500">months</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Extra Monthly Payment</label>
                <span className="text-sm font-mono text-gray-600">{fmt(extraMonthlyPayment)}</span>
              </div>
              <input type="range" min={0} max={2000} step={25} value={extraMonthlyPayment}
                onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
              <input type="number" value={extraMonthlyPayment}
                onChange={(e) => setExtraMonthlyPayment(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
              <p className="text-xs text-gray-400 mt-1">
                See how paying extra each month saves you money
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Payment Hero */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="text-sm text-blue-200 mb-1">Monthly Payment</div>
            <div className="text-4xl font-bold">
              {fmtExact(results.basePayment)}
              {extraMonthlyPayment > 0 && (
                <span className="text-lg text-blue-200 ml-2">
                  + {fmt(extraMonthlyPayment)} extra
                </span>
              )}
            </div>
          </div>

          {/* Savings from extra payments */}
          {extraMonthlyPayment > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-green-800 mb-3">
                Extra Payment Savings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-green-600 mb-1">Interest Saved</div>
                  <div className="text-xl font-bold text-green-700">{fmt(results.interestSaved)}</div>
                </div>
                <div>
                  <div className="text-xs text-green-600 mb-1">Time Saved</div>
                  <div className="text-xl font-bold text-green-700">
                    {results.monthsSaved} months ({(results.monthsSaved / 12).toFixed(1)} years)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loan Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Loan Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Total Principal</div>
                <div className="text-lg font-semibold">{fmt(loanAmount)}</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-xs text-red-500 mb-1">Total Interest</div>
                <div className="text-lg font-semibold text-red-700">
                  {fmt(extraMonthlyPayment > 0 ? results.extraTotalInterest : results.standardTotalInterest)}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-xs text-blue-500 mb-1">Total Cost of Loan</div>
                <div className="text-lg font-semibold text-blue-700">
                  {fmt(extraMonthlyPayment > 0 ? results.extraTotalCost : results.standardTotalCost)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Payoff Time</div>
                <div className="text-lg font-semibold">
                  {results.actualSchedule.length} months ({(results.actualSchedule.length / 12).toFixed(1)} yr)
                </div>
              </div>
            </div>

            {/* Principal vs Interest bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Principal</span>
                <span>Interest</span>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500"
                  style={{
                    width: `${(loanAmount / (extraMonthlyPayment > 0 ? results.extraTotalCost : results.standardTotalCost)) * 100}%`,
                  }}
                />
                <div className="bg-red-400 flex-1" />
              </div>
            </div>
          </div>

          <AdBanner className="my-4" />

          {/* Amortization Schedule */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Amortization Schedule
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    trackEvent("csv_downloaded", { calculator: "loan_amortization" });
                    downloadCsv(
                      "loan-amortization.csv",
                      ["Month", "Payment", "Principal", "Interest", "Extra Payment", "Balance"],
                      results.actualSchedule.map((row) => [row.month, row.payment.toFixed(2), row.principal.toFixed(2), row.interest.toFixed(2), row.extra.toFixed(2), row.endBalance.toFixed(2)])
                    );
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Download CSV
                </button>
                <button
                  onClick={() => setShowMonthly(!showMonthly)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showMonthly ? "Show Yearly" : "Show Monthly"}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 text-gray-500 font-medium">
                      {showMonthly ? "Month" : "Year"}
                    </th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Principal</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Interest</th>
                    {extraMonthlyPayment > 0 && (
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Extra</th>
                    )}
                    <th className="text-right py-2 pl-3 text-gray-500 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {showMonthly
                    ? results.actualSchedule.map((row) => (
                        <tr key={row.month} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 pr-3 text-gray-900">{row.month}</td>
                          <td className="text-right py-2 px-3 font-mono text-blue-700">{fmtExact(row.principal)}</td>
                          <td className="text-right py-2 px-3 font-mono text-red-600">{fmtExact(row.interest)}</td>
                          {extraMonthlyPayment > 0 && (
                            <td className="text-right py-2 px-3 font-mono text-green-700">{fmtExact(row.extraPayment)}</td>
                          )}
                          <td className="text-right py-2 pl-3 font-mono font-semibold text-gray-900">{fmtExact(row.balance)}</td>
                        </tr>
                      ))
                    : yearlySummary.map((row) => (
                        <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 pr-3 font-medium text-gray-900">Year {row.year}</td>
                          <td className="text-right py-2 px-3 font-mono text-blue-700">{fmt(row.principal)}</td>
                          <td className="text-right py-2 px-3 font-mono text-red-600">{fmt(row.interest)}</td>
                          {extraMonthlyPayment > 0 && (
                            <td className="text-right py-2 px-3 font-mono text-green-700">{fmt(row.extra)}</td>
                          )}
                          <td className="text-right py-2 pl-3 font-mono font-semibold text-gray-900">{fmt(row.endBalance)}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
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
            <p><strong>Monthly payment formula:</strong></p>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs overflow-x-auto">M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]</pre>
            <p>Where <strong>P</strong> = loan amount, <strong>r</strong> = monthly rate (annual ÷ 12), <strong>n</strong> = total payments.</p>
            <p><strong>Each month&apos;s breakdown:</strong> Interest = remaining balance × monthly rate. Principal = payment − interest. This is why early payments are mostly interest — the balance is highest, so interest charges are highest.</p>
            <p><strong>Extra payments</strong> reduce the balance directly, which lowers next month&apos;s interest charge. This accelerates the principal paydown compounding — each dollar of extra payment saves more than one dollar of future interest.</p>
            <p><strong>Payoff date with extra payments</strong> is recalculated month-by-month: once the remaining balance drops below the regular payment amount, the final payment is just that remaining balance plus one month of interest.</p>
          </div>
        </details>
        <FAQSection faqs={[
          { question: "What is loan amortization?", answer: "Amortization is the process of spreading loan payments over time. Each payment covers both interest and principal. Early payments are mostly interest; later payments are mostly principal. An amortization schedule shows the exact breakdown for every payment over the life of your loan." },
          { question: "Why do I pay more interest at the start of my loan?", answer: "Because interest is calculated on the remaining balance. Early on, your balance is highest, so more of each payment goes to interest. As you pay down principal, the balance drops and interest charges shrink. This is why the first years of a mortgage feel like you're barely making a dent." },
          { question: "How do extra payments reduce my loan term?", answer: "Extra principal payments reduce your balance faster, which means less interest accumulates each month, and more of subsequent payments go to principal. Even $100–$200 extra per month can cut years off a 30-year mortgage. Use this calculator's extra payment field to see the exact savings for your loan." },
          { question: "What happens if I make biweekly payments?", answer: "Making half-payments every two weeks results in 26 half-payments per year — equivalent to 13 full monthly payments instead of 12. That one extra payment per year can shave 4–6 years off a 30-year mortgage and save tens of thousands in interest." },
          { question: "What's the difference between a fixed and variable rate loan?", answer: "A fixed-rate loan has the same interest rate for the entire term — your monthly payment never changes. A variable-rate loan has a rate that adjusts periodically based on market rates, meaning your payment can go up or down. This calculator models fixed-rate loans." },
        ]} />
        <RelatedCalculators items={[
          { title: "Mortgage Calculator", href: "/mortgage-calculator", description: "Calculate your full monthly mortgage payment including taxes and insurance." },
          { title: "Mortgage Refinance Calculator", href: "/mortgage-refinance-calculator", description: "See if refinancing to a lower rate makes sense." },
          { title: "Compound Interest Calculator", href: "/compound-interest-calculator", description: "See how money grows when you save instead of borrow." },
        ]} />
      </div>
    </div>
  );
}
