"use client";

import { models, providers, type AIModel } from "@/data/models";
import { formatContextWindow } from "@/data/models";

interface ModelSelectorProps {
  selectedModels: AIModel[];
  onToggleModel: (model: AIModel) => void;
  maxSelections?: number;
}

export default function ModelSelector({
  selectedModels,
  onToggleModel,
  maxSelections = 4,
}: ModelSelectorProps) {
  const selectedIds = new Set(selectedModels.map((m) => m.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Select Models
        </h3>
        <span className="text-xs text-gray-500">
          {selectedModels.length}/{maxSelections} selected
        </span>
      </div>

      {providers.map((provider) => {
        const providerModels = models.filter(
          (m) => m.provider === provider.id
        );
        if (providerModels.length === 0) return null;

        return (
          <div key={provider.id}>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: provider.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {provider.name}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-5">
              {providerModels.map((model) => {
                const isSelected = selectedIds.has(model.id);
                const isDisabled =
                  !isSelected && selectedModels.length >= maxSelections;

                return (
                  <button
                    key={model.id}
                    onClick={() => !isDisabled && onToggleModel(model)}
                    disabled={isDisabled}
                    className={`text-left p-3 rounded-lg border text-sm transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : isDisabled
                        ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {model.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex gap-3">
                      <span>
                        In: ${model.inputPricePerMillion}/M
                      </span>
                      <span>
                        Out: ${model.outputPricePerMillion}/M
                      </span>
                      <span>{formatContextWindow(model.contextWindow)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
