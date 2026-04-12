"use client";

import { useCasePresets } from "@/data/models";

interface TokenInputProps {
  inputTokens: number;
  outputTokens: number;
  requestsPerDay: number;
  onInputTokensChange: (val: number) => void;
  onOutputTokensChange: (val: number) => void;
  onRequestsPerDayChange: (val: number) => void;
  contextWindow?: number;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export default function TokenInput({
  inputTokens,
  outputTokens,
  requestsPerDay,
  onInputTokensChange,
  onOutputTokensChange,
  onRequestsPerDayChange,
  contextWindow,
}: TokenInputProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        How much will you use it?
      </h3>

      {/* Presets */}
      <div>
        <label className="text-xs font-medium text-gray-500 mb-1 block">
          Not sure? Pick a common scenario:
        </label>
        <div className="flex flex-wrap gap-2">
          {useCasePresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                const input =
                  preset.inputTokens === 0 && contextWindow
                    ? contextWindow
                    : preset.inputTokens;
                onInputTokensChange(input);
                onOutputTokensChange(preset.outputTokens);
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-full hover:border-blue-300 hover:bg-blue-50 transition-all"
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input tokens */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            What you send to the AI (Input)
          </label>
          <span className="text-sm font-mono text-gray-600">
            {formatNumber(inputTokens)} tokens (~{formatNumber(Math.round(inputTokens * 0.75))} words)
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={200000}
          step={100}
          value={Math.min(inputTokens, 200000)}
          onChange={(e) => onInputTokensChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <input
          type="number"
          value={inputTokens}
          onChange={(e) => onInputTokensChange(Math.max(0, Number(e.target.value)))}
          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Enter exact token count"
        />
      </div>

      {/* Output tokens */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            What the AI sends back (Output)
          </label>
          <span className="text-sm font-mono text-gray-600">
            {formatNumber(outputTokens)} tokens (~{formatNumber(Math.round(outputTokens * 0.75))} words)
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={50000}
          step={100}
          value={Math.min(outputTokens, 50000)}
          onChange={(e) => onOutputTokensChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <input
          type="number"
          value={outputTokens}
          onChange={(e) => onOutputTokensChange(Math.max(0, Number(e.target.value)))}
          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          placeholder="Enter exact token count"
        />
      </div>

      {/* Requests per day */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            How many times per day?
          </label>
          <span className="text-sm font-mono text-gray-600">
            {formatNumber(requestsPerDay)} requests
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={100000}
          step={1}
          value={Math.min(requestsPerDay, 100000)}
          onChange={(e) => onRequestsPerDayChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <input
          type="number"
          value={requestsPerDay}
          onChange={(e) =>
            onRequestsPerDayChange(Math.max(1, Number(e.target.value)))
          }
          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          placeholder="Enter requests per day"
        />
      </div>
    </div>
  );
}
