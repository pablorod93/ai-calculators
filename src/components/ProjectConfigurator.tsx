"use client";

import { type ProjectTemplate } from "@/data/projects";

interface ProjectConfiguratorProps {
  template: ProjectTemplate;
  values: Record<string, number>;
  onChange: (paramId: string, value: number) => void;
}

function formatValue(value: number, unit: string): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M ${unit}`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K ${unit}`;
  return `${value} ${unit}`;
}

export default function ProjectConfigurator({
  template,
  values,
  onChange,
}: ProjectConfiguratorProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Configure your {template.name.toLowerCase()}
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Adjust the settings to match your expected usage.
      </p>

      <div className="space-y-6">
        {template.params.map((param) => {
          const value = values[param.id] ?? param.defaultValue;
          return (
            <div key={param.id}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {param.label}
                  </label>
                  <p className="text-xs text-gray-400">{param.description}</p>
                </div>
                <span className="text-sm font-mono font-semibold text-gray-700 ml-4 whitespace-nowrap">
                  {formatValue(value, param.unit)}
                </span>
              </div>
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={value}
                onChange={(e) => onChange(param.id, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatValue(param.min, param.unit)}</span>
                <span>{formatValue(param.max, param.unit)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
