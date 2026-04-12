"use client";

import { useState, useCallback } from "react";
import { type AIModel, models } from "@/data/models";
import ModelSelector from "@/components/ModelSelector";
import TokenInput from "@/components/TokenInput";
import CostBreakdown from "@/components/CostBreakdown";
import ModelComparison from "@/components/ModelComparison";
import TokenExplainer from "@/components/TokenExplainer";
import AdBanner from "@/components/AdBanner";

export default function AICostCalculator() {
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([
    models.find((m) => m.id === "gpt-4o")!,
    models.find((m) => m.id === "claude-sonnet-4")!,
  ]);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(100);
  const [useBatch, setUseBatch] = useState(false);

  const toggleModel = useCallback(
    (model: AIModel) => {
      setSelectedModels((prev) => {
        const exists = prev.find((m) => m.id === model.id);
        if (exists) return prev.filter((m) => m.id !== model.id);
        if (prev.length >= 4) return prev;
        return [...prev, model];
      });
    },
    []
  );

  const contextWindow = selectedModels.length === 1 ? selectedModels[0].contextWindow : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Token Cost Calculator
        </h1>
        <p className="text-gray-600">
          Find out how much it costs to use AI models like ChatGPT, Claude, and
          Gemini. Pick your models, set your usage, and see the costs instantly.
        </p>
      </div>

      {/* Token explainer for beginners */}
      <TokenExplainer />

      <AdBanner className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - Model selection */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20">
            <ModelSelector
              selectedModels={selectedModels}
              onToggleModel={toggleModel}
            />
          </div>
        </div>

        {/* Right content - Inputs + Results */}
        <div className="lg:col-span-8 space-y-8">
          {/* Token input */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <TokenInput
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              requestsPerDay={requestsPerDay}
              onInputTokensChange={setInputTokens}
              onOutputTokensChange={setOutputTokens}
              onRequestsPerDayChange={setRequestsPerDay}
              contextWindow={contextWindow}
            />

            {/* Batch toggle */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useBatch}
                  onChange={(e) => setUseBatch(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Apply bulk discount (Batch API)
                  </span>
                  <p className="text-xs text-gray-500">
                    Some providers offer up to 50% off if you don&apos;t need
                    instant responses
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <CostBreakdown
              selectedModels={selectedModels}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              requestsPerDay={requestsPerDay}
              useBatch={useBatch}
            />
          </div>

          <AdBanner className="my-4" />

          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <ModelComparison
              selectedModels={selectedModels}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              requestsPerDay={requestsPerDay}
              useBatch={useBatch}
            />
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
