"use client";

import {
  type AIModel,
  calculateCost,
  formatCurrency,
  formatContextWindow,
  providers,
} from "@/data/models";

interface ModelComparisonProps {
  selectedModels: AIModel[];
  inputTokens: number;
  outputTokens: number;
  requestsPerDay: number;
  useBatch: boolean;
}

export default function ModelComparison({
  selectedModels,
  inputTokens,
  outputTokens,
  requestsPerDay,
  useBatch,
}: ModelComparisonProps) {
  if (selectedModels.length < 2) {
    return null;
  }

  const rows = selectedModels.map((model) => {
    const provider = providers.find((p) => p.id === model.provider);
    const perRequest = calculateCost(model, inputTokens, outputTokens, useBatch);
    return {
      model,
      provider,
      perRequest: perRequest.totalCost,
      daily: perRequest.totalCost * requestsPerDay,
      monthly: perRequest.totalCost * requestsPerDay * 30,
    };
  });

  const cheapest = Math.min(...rows.map((r) => r.monthly));

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Side-by-Side Comparison
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 pr-4 text-gray-500 font-medium">
                Model
              </th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">
                Input $/M
              </th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">
                Output $/M
              </th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">
                Context
              </th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">
                Per Request
              </th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">
                Daily
              </th>
              <th className="text-right py-3 pl-4 text-gray-500 font-medium">
                Monthly
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.model.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: row.provider?.color }}
                    />
                    <span className="font-medium text-gray-900">
                      {row.model.name}
                    </span>
                    {row.monthly === cheapest && (
                      <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
                        Cheapest
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-right py-3 px-4 font-mono text-gray-700">
                  ${row.model.inputPricePerMillion}
                </td>
                <td className="text-right py-3 px-4 font-mono text-gray-700">
                  ${row.model.outputPricePerMillion}
                </td>
                <td className="text-right py-3 px-4 text-gray-600">
                  {formatContextWindow(row.model.contextWindow)}
                </td>
                <td className="text-right py-3 px-4 font-mono text-gray-700">
                  {formatCurrency(row.perRequest)}
                </td>
                <td className="text-right py-3 px-4 font-mono text-gray-700">
                  {formatCurrency(row.daily)}
                </td>
                <td className="text-right py-3 pl-4 font-mono font-semibold text-gray-900">
                  {formatCurrency(row.monthly)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
