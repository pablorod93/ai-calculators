"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface NavGroup {
  label: string;
  links: { href: string; label: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: "AI Calculators",
    links: [
      { href: "/ai-cost-calculator", label: "AI Token Costs" },
      { href: "/chatgpt-cost-calculator", label: "ChatGPT Monthly Cost" },
      { href: "/ai-roi-calculator", label: "AI ROI Calculator" },
      { href: "/ai-project-estimator", label: "AI Project Estimator" },
      { href: "/ai-image-calculator", label: "Image Generation" },
      { href: "/ai-fine-tuning-calculator", label: "Fine-Tuning Costs" },
      { href: "/gpu-cost-calculator", label: "GPU Pricing" },
    ],
  },
  {
    label: "Financial",
    links: [
      { href: "/mortgage-calculator", label: "Mortgage" },
      { href: "/mortgage-refinance-calculator", label: "Refinance" },
      { href: "/roi-calculator", label: "ROI" },
      { href: "/business-valuation-calculator", label: "Business Valuation" },
      { href: "/business-acquisition-calculator", label: "Business Acquisition" },
      { href: "/compound-interest-calculator", label: "Compound Interest" },
      { href: "/loan-amortization-calculator", label: "Loan Amortization" },
    ],
  },
];

function DesktopDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-1"
      >
        {group.label}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
          {group.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AICalculators</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            {navGroups.map((group) => (
              <DesktopDropdown key={group.label} group={group} />
            ))}
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <Link
              href="/"
              className="block py-2 text-gray-600 hover:text-gray-900 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {navGroups.map((group) => (
              <div key={group.label} className="mt-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-0 mb-1">
                  {group.label}
                </div>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 pl-3 text-gray-600 hover:text-gray-900 font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/blog"
              className="block py-2 mt-3 text-gray-600 hover:text-gray-900 font-medium border-t border-gray-100 pt-3"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
