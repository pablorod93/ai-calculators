"use client";

import Link from "next/link";
import {
  models,
  providers,
  calculateCost,
  formatCurrency,
  type AIModel,
} from "@/data/models";

interface ProjectCostResultsProps {
  inputTokensPerRequest: number;
  outputTokensPerRequest: number;
  requestsPerDay: number;
  explanation: string;
}

export default function ProjectCostResults({
  inputTokensPerRequest,
  outputTokensPerRequest,
  requestsPerDay,
  explanation,
}: ProjectCostResultsProps) {
  const totalInputPerDay = inputTokensPerRequest * requestsPerDay;
  const totalOutputPerDay = outputTokensPerRequest * requestsPerDay;
  const totalTokensPerDay = totalInputPerDay + totalOutputPerDay;

  // Calculate costs for all models and sort by monthly cost
  const modelCosts = models
    .map((model) => {
      const provider = providers.find((p) => p.id === model.provider);
      const perRequest = calculateCost(
        model,
        inputTokensPerRequest,
        outputTokensPerRequest
      );
      const daily = perRequest.totalCost * requestsPerDay;
      const monthly = daily * 30;
      return { model, provider, perRequest: perRequest.totalCost, daily, monthly };
    })
    .sort((a, b) => a.monthly - b.monthly);

  const cheapestMonthly = modelCosts[0]?.monthly ?? 0;

  // Link to token calculator with pre-filled values
  const calcLink = `/ai-cost-calculator?input=${inputTokensPerRequest}&output=${outputTokensPerRequest}&rpd=${requestsPerDay}`;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Estimated Usage & Costs
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-xs text-blue-600 font-medium mb-1">
              Tokens per Request
            </div>
            <div className="text-lg font-bold text-blue-800">
              {(inputTokensPerRequest + outputTokensPerRequest).toLocaleString()}
            </div>
            <div className="text-xs text-blue-500 mt-1">
              {inputTokensPerRequest.toLocaleString()} in / {outputTokensPerRequest.toLocaleString()} out
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="text-xs text-purple-600 font-medium mb-1">
              Requests per Day
            </div>
            <div className="text-lg font-bold text-purple-800">
              {requestsPerDay.toLocaleString()}
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-xs text-green-600 font-medium mb-1">
              Total Tokens / Day
            </div>
            <div className="text-lg font-bold text-green-800">
              {totalTokensPerDay >= 1000000
                ? `${(totalTokensPerDay / 1000000).toFixed(1)}M`
                : `${(totalTokensPerDay / 1000).toFixed(0)}K`}
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="text-xs text-amber-600 font-medium mb-1">
              Cheapest Monthly
            </div>
            <div className="text-lg font-bold text-amber-800">
              {formatCurrency(cheapestMonthly)}
            </div>
            <div className="text-xs text-amber-500 mt-1">
              {modelCosts[0]?.model.name}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600">
          <span className="font-medium text-gray-700">How we calculated this: </span>
          {explanation}
        </div>
      </div>

      {/* Full model comparison table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Cost by Model (cheapest first)
          </h4>
          <Link
            href={calcLink}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Fine-tune in Token Calculator →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">
                  Model
                </th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">
                  Per Request
                </th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">
                  Daily
                </th>
                <th className="text-right py-2 pl-3 text-gray-500 font-medium">
                  Monthly
                </th>
              </tr>
            </thead>
            <tbody>
              {modelCosts.map((row, i) => (
                <tr
                  key={row.model.id}
                  className={`border-b border-gray-50 ${
                    i < 3 ? "bg-green-50/30" : ""
                  }`}
                >
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: row.provider?.color }}
                      />
                      <span
                        className={`${
                          i < 3 ? "font-semibold" : ""
                        } text-gray-900`}
                      >
                        {row.model.name}
                      </span>
                      {i === 0 && (
                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                          Best value
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono text-gray-600">
                    {formatCurrency(row.perRequest)}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono text-gray-600">
                    {formatCurrency(row.daily)}
                  </td>
                  <td
                    className={`text-right py-2.5 pl-3 font-mono ${
                      i < 3 ? "font-semibold text-green-700" : "text-gray-900"
                    }`}
                  >
                    {formatCurrency(row.monthly)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
