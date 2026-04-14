import Link from "next/link";
import JsonLd from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `https://aicalculators.org${item.href}`,
    })),
  };

  return (
    <div className="mb-6">
      <JsonLd data={jsonLdData} />
      <nav className="text-sm text-gray-500">
        {items.map((item, i) => (
          <span key={item.href}>
            {i > 0 && <span className="mx-2">/</span>}
            {i === items.length - 1 ? (
              <span className="text-gray-900">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-gray-700">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
