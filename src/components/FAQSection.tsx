"use client";

import { useState } from "react";
import JsonLd from "./JsonLd";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <JsonLd data={jsonLdData} />
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="text-sm font-medium text-gray-900">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-2 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === i && (
              <div
                id={`faq-answer-${i}`}
                className="px-4 pb-3 text-sm text-gray-600"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
