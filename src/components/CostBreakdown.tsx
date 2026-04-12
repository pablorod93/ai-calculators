"use client";

import { type AIModel, calculateCost, formatCurrency, providers } from "@/data/models";

interface CostBreakdownProps {
  selectedModels: AIModel[];
  inputTokens: number;
  outputTokens: number;
  requestsPerDay: number;
  useBatch: boolean;
}

export default function CostBreakdown({
  selectedModels,
  inputTokens,
  outputTokens,
  requestsPerDay,
  useBatch,
}: CostBreakdownProps) {
  if (selectedModels.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 border border-dashed border-gray-300 rounded-xl">
        Select at least one model to see cost breakdown
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Cost Breakdown
      </h3>

      <div className="space-y-3">
        {selectedModels.map((model) => {
          const provider = providers.find((p) => p.id === model.provider);
          const perRequest = calculateCost(model, inputTokens, outputTokens, useBatch);
          const daily = {
            inputCost: perRequest.inputCost * requestsPerDay,
            outputCost: perRequest.outputCost * requestsPerDay,
            totalCost: perRequest.totalCost * requestsPerDay,
          };
          const monthly = {
            totalCost: daily.totalCost * 30,
          };
          const yearly = {
            totalCost: daily.totalCost * 365,
          };

          return (
            <div
              key={model.id}
              className="p-4 border border-gray-200 rounded-xl bg-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: provider?.color }}
                />
                <span className="font-semibold text-gray-900">
                  {model.name}
                </span>
                {useBatch && model.batchDiscount && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    {model.batchDiscount}% batch discount
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Per Request</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(perRequest.totalCost)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    In: {formatCurrency(perRequest.inputCost)} / Out:{" "}
                    {formatCurrency(perRequest.outputCost)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Daily</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(daily.totalCost)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {requestsPerDay.toLocaleString()} requests
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-blue-600 mb-1">Monthly</div>
                  <div className="text-lg font-semibold text-blue-700">
                    {formatCurrency(monthly.totalCost)}
                  </div>
                  <div className="text-xs text-blue-400 mt-1">30 days</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-xs text-purple-600 mb-1">Yearly</div>
                  <div className="text-lg font-semibold text-purple-700">
                    {formatCurrency(yearly.totalCost)}
                  </div>
                  <div className="text-xs text-purple-400 mt-1">365 days</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
