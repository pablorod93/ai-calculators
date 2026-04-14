interface HeroCardProps {
  subtitle: string;
  title: string;
  titleSuffix?: string;
  mainValue: string;
  mainValueSuffix?: string;
  stats?: { label: string; value: string }[];
  gradient?: string;
}

export default function HeroCard({
  subtitle,
  title,
  titleSuffix,
  mainValue,
  mainValueSuffix,
  stats,
  gradient = "from-blue-600 to-blue-700",
}: HeroCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white`}
    >
      <div className="text-sm text-white/70 mb-1">{subtitle}</div>
      <div className="text-2xl font-bold mb-1">
        {title}
        {titleSuffix && (
          <span className="text-white/70 text-base font-normal ml-2">
            {titleSuffix}
          </span>
        )}
      </div>
      <div className="text-4xl font-bold mt-2">
        {mainValue}
        {mainValueSuffix && (
          <span className="text-lg text-white/70 font-normal">
            {" "}
            {mainValueSuffix}
          </span>
        )}
      </div>
      {stats && stats.length > 0 && (
        <div
          className={`mt-4 grid grid-cols-${Math.min(stats.length, 4)} gap-4`}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-xs text-white/70">{stat.label}</div>
              <div className="text-lg font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
