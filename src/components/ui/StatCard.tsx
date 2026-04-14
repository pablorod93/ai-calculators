interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  variant?: "default" | "blue" | "green" | "red" | "purple" | "amber";
}

const variantStyles: Record<NonNullable<StatCardProps["variant"]>, string> = {
  default: "bg-gray-50",
  blue: "bg-blue-50",
  green: "bg-green-50",
  red: "bg-red-50",
  purple: "bg-purple-50",
  amber: "bg-amber-50",
};

const sublabelColors: Record<NonNullable<StatCardProps["variant"]>, string> = {
  default: "text-gray-500",
  blue: "text-blue-600",
  green: "text-green-600",
  red: "text-red-600",
  purple: "text-purple-600",
  amber: "text-amber-600",
};

export default function StatCard({
  label,
  value,
  sublabel,
  variant = "default",
}: StatCardProps) {
  return (
    <div className={`${variantStyles[variant]} rounded-lg p-3`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
      {sublabel && (
        <div className={`text-xs ${sublabelColors[variant]}`}>{sublabel}</div>
      )}
    </div>
  );
}
