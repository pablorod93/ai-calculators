interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatDisplay?: (value: number) => string;
  showNumberInput?: boolean;
  accentColor?: string;
  hint?: string;
  "aria-label"?: string;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatDisplay,
  showNumberInput = false,
  accentColor = "accent-blue-600",
  hint,
  "aria-label": ariaLabel,
}: SliderInputProps) {
  const displayValue = formatDisplay ? formatDisplay(value) : value.toLocaleString("en-US");

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-mono text-gray-900">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${accentColor}`}
        aria-label={ariaLabel ?? label}
      />
      {showNumberInput && (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
          min={min}
          max={max}
          step={step}
          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
