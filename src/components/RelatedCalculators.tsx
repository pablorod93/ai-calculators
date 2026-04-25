import Link from "next/link";

interface RelatedCalculator {
  title: string;
  href: string;
  description: string;
}

interface RelatedCalculatorsProps {
  items: RelatedCalculator[];
}

export default function RelatedCalculators({ items }: RelatedCalculatorsProps) {
  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Related Calculators
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="block p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
              {calc.title}
            </div>
            <div className="text-xs text-gray-500">{calc.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
